import { Redirect, router, type Href } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";

import { colors } from "@/core/theme/colors";
import { spacing } from "@/core/theme/spacing";
import { analyzeWardrobeImagesBatchMock } from "@/features/wardrobe/api/wardrobe-import.api";
import { WardrobeImportDraftCard } from "@/features/wardrobe/components/WardrobeImportDraftCard";
import { useInitializeWardrobeImportDrafts } from "@/features/wardrobe/hooks/useInitializeWardrobeImportDrafts";
import {
  addWardrobeItem,
  addWardrobeItems,
} from "@/features/wardrobe/store/wardrobe.slice";
import {
  approveAllImportDrafts,
  approveImportDraft,
  rejectImportDraft,
  setImportDrafts,
} from "@/features/wardrobe/store/wardrobeImport.slice";
import { AppButton } from "@/shared/components/ui/AppButton";
import { AppCard } from "@/shared/components/ui/AppCard";
import { AppHeader } from "@/shared/components/ui/AppHeader";
import { AppScrollScreen } from "@/shared/components/ui/AppScrollScreen";
import { AppText } from "@/shared/components/ui/AppText";
import { EmptyStateCard } from "@/shared/components/ui/EmptyStateCard";
import { SummaryStatCard } from "@/shared/components/ui/SummaryStatCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function WardrobeImportScreen() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const drafts = useAppSelector((state) => state.wardrobeImport.drafts);
  const isInitialized = useAppSelector(
    (state) => state.wardrobeImport.isInitialized,
  );
  const totalDetected = useAppSelector(
    (state) => state.wardrobeImport.totalDetected,
  );
  const approvedCount = useAppSelector(
    (state) => state.wardrobeImport.approvedCount,
  );
  const rejectedCount = useAppSelector(
    (state) => state.wardrobeImport.rejectedCount,
  );
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useInitializeWardrobeImportDrafts();

  const remainingCount = drafts.length;
  const reviewedCount = approvedCount + rejectedCount;
  const progressMessage =
    totalDetected > 0
      ? `You have reviewed ${reviewedCount} of ${totalDetected} detected drafts.`
      : "No drafts have been detected yet.";
  const remainingMessage =
    remainingCount > 0
      ? `You still have ${remainingCount} draft${remainingCount > 1 ? "s" : ""} left to review.`
      : "All detected drafts have been processed.";
  const resultMessage =
    totalDetected > 0
      ? `${approvedCount} approved · ${rejectedCount} rejected`
      : "No review results yet.";
  const handleBack = () => {
    router.back();
  };

  const handleOpenWardrobe = () => {
    router.replace("/wardrobe");
  };

  const handleResetImportQueue = async () => {
    setFeedbackMessage("");

    const nextDrafts = await analyzeWardrobeImagesBatchMock();
    dispatch(setImportDrafts(nextDrafts));
  };

  const handleReviewDraft = (draftId: string) => {
    const selectedDraft = drafts.find((draft) => draft.id === draftId);

    if (!selectedDraft) {
      return;
    }

    router.push({
      pathname: "/wardrobe-ai-review",
      params: {
        draftId: selectedDraft.id,
        imageUri: selectedDraft.imageUri,
        predictedName: selectedDraft.predictedName,
        predictedCategory: selectedDraft.predictedCategory,
        predictedColor: selectedDraft.predictedColor,
        predictedBrand: selectedDraft.predictedBrand,
        confidence: selectedDraft.confidence.toString(),
      },
    });
  };

  const handleApproveDraft = (draftId: string) => {
    const selectedDraft = drafts.find((draft) => draft.id === draftId);

    if (!selectedDraft) {
      return;
    }

    dispatch(
      addWardrobeItem({
        id: Date.now().toString(),
        name: selectedDraft.predictedName,
        category: selectedDraft.predictedCategory,
        color: selectedDraft.predictedColor,
        imageUrl: selectedDraft.imageUri,
        brand: selectedDraft.predictedBrand,
        source: "ai",
      }),
    );

    dispatch(approveImportDraft(draftId));
    setFeedbackMessage(
      `"${selectedDraft.predictedName}" was approved and added to your wardrobe.`,
    );
  };

  const handleRejectDraft = (draftId: string) => {
    const selectedDraft = drafts.find((draft) => draft.id === draftId);

    if (!selectedDraft) {
      return;
    }

    dispatch(rejectImportDraft(draftId));
    setFeedbackMessage(
      `"${selectedDraft.predictedName}" was rejected and removed from the queue.`,
    );
  };

  const handleSaveAllDrafts = () => {
    if (!drafts.length) {
      return;
    }

    Alert.alert(
      "Save all drafts",
      `Are you sure you want to save all ${drafts.length} detected drafts to your wardrobe?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Save All",
          onPress: () => {
            const draftCount = drafts.length;

            const wardrobeItems = drafts.map((draft, index) => ({
              id: `${Date.now()}-${index}`,
              name: draft.predictedName,
              category: draft.predictedCategory,
              color: draft.predictedColor,
              imageUrl: draft.imageUri,
              brand: draft.predictedBrand,
              source: "ai" as const,
            }));

            dispatch(addWardrobeItems(wardrobeItems));
            dispatch(approveAllImportDrafts());

            setFeedbackMessage(
              `${draftCount} wardrobe item${draftCount > 1 ? "s were" : " was"} added successfully.`,
            );
          },
        },
      ],
    );
  };

  if (!isAuthenticated) {
    return <Redirect href={"/login" as Href} />;
  }

  return (
    <AppScrollScreen>
      <View style={{ gap: spacing.xl }}>
        <AppHeader
          title="Import Wardrobe Photos"
          subtitle="Review AI-detected wardrobe drafts before adding them to your wardrobe."
          actionLabel="Back"
          onPressAction={handleBack}
          actionVariant="back"
        />

        {isInitialized && (
          <>
            <View style={{ gap: spacing.md }}>
              <View style={{ flexDirection: "row", gap: spacing.md }}>
                <SummaryStatCard label="Detected" value={totalDetected} />
                <SummaryStatCard label="Approved" value={approvedCount} />
              </View>

              <View style={{ flexDirection: "row", gap: spacing.md }}>
                <SummaryStatCard label="Rejected" value={rejectedCount} />
                <SummaryStatCard label="Remaining" value={remainingCount} />
              </View>
            </View>

            <AppCard>
              <AppText variant="body">Import progress</AppText>
              <AppText variant="caption">{progressMessage}</AppText>
              <AppText variant="caption">{remainingMessage}</AppText>
              <AppText variant="caption">{resultMessage}</AppText>
            </AppCard>

            <View style={{ gap: spacing.md }}>
              <AppButton
                title="Save All Drafts"
                onPress={handleSaveAllDrafts}
              />
              <AppButton
                title="Reset Import Queue"
                onPress={handleResetImportQueue}
                variant="secondary"
              />
            </View>
          </>
        )}

        {!!feedbackMessage && (
          <AppCard
            style={{
              backgroundColor: colors.surfaceMuted,
            }}
          >
            <AppText variant="caption" color={colors.success}>
              {feedbackMessage}
            </AppText>
          </AppCard>
        )}

        {!isInitialized && (
          <AppText variant="caption">Analyzing wardrobe photos...</AppText>
        )}

        {!!isInitialized && !drafts.length && (
          <View style={{ gap: spacing.md }}>
            <EmptyStateCard
              title="No drafts left to review"
              description="All detected wardrobe drafts have been processed. You can open the wardrobe or start a fresh import."
              actionLabel="Open Wardrobe"
              onPressAction={handleOpenWardrobe}
            />

            <AppButton
              title="Reset Import Queue"
              onPress={handleResetImportQueue}
              variant="secondary"
            />
          </View>
        )}

        {!!drafts.length && (
          <View style={{ gap: spacing.sm }}>
            <View style={{ gap: spacing.xs }}>
              <AppText variant="body">Detected drafts</AppText>
              <AppText variant="caption">
                Review each detected item, approve it, reject it, or open it for
                a closer edit.
              </AppText>
            </View>

            <View style={{ gap: spacing.md }}>
              {drafts.map((draft) => (
                <WardrobeImportDraftCard
                  key={draft.id}
                  draft={draft}
                  onReview={() => handleReviewDraft(draft.id)}
                  onApprove={() => handleApproveDraft(draft.id)}
                  onReject={() => handleRejectDraft(draft.id)}
                />
              ))}
            </View>
          </View>
        )}
      </View>
    </AppScrollScreen>
  );
}
