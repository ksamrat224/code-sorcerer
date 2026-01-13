"use server";

import prisma from "@/lib/db";

export type SubscriptionTier = "FREE" | "PRO";
export type SubscriptionStatus = "ACTIVE" | "CANCELLED" | "EXPPIRED";

export interface UserLimits {
  tier: SubscriptionTier;
  repositories: {
    current: number;
    limit: number | null;
    canAdd: boolean;
  };
  reviews: {
    [repositoryId: string]: {
      current: number;
      limit: number | null;
      canAdd: boolean;
    };
  };
}

const TIER_LIMITS = {
  FREE: {
    repositories: 5,
    reviewsPerRepo: 5,
  },
  PRO: {
    repositories: null,
    reviewsPerRepo: null,
  },
} as const;

export async function getUserTier(userId: string): Promise<SubscriptionTier> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { subscriptionTier: true },
  });

  return (user?.subscriptionTier as SubscriptionTier) || "FREE";
}
async function getUserUsage(userId: string) {
  let usage = await prisma.userUsage.findUnique({
    where: { userId },
  });

  if (!usage) {
    usage = await prisma.userUsage.create({
      data: {
        userId,
        repositoryCount: 0,
        reviewCounts: {},
      },
    });
  }

  return usage;
}
