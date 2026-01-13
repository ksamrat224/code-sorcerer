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

export async function canConnectRepository(userId: string): Promise<boolean> {
  const tier = await getUserTier(userId);

  if (tier === "PRO") {
    return true; // Unlimited for pro users
  }

  const usage = await getUserUsage(userId);
  const limit = TIER_LIMITS.FREE.repositories;

  return usage.repositoryCount < limit;
}


export async function canCreateReview(
  userId: string,
  repositoryId: string
): Promise<boolean> {
  const tier = await getUserTier(userId);

  if (tier === "PRO") {
    return true; // Unlimited for pro users
  }

  const usage = await getUserUsage(userId);
  const reviewCounts = usage.reviewCounts as Record<string, number>;
  const currentCount = reviewCounts[repositoryId] || 0;
  const limit = TIER_LIMITS.FREE.reviewsPerRepo;

  return currentCount < limit;
}

/**
 * Increment repository count for user
 */
export async function incrementRepositoryCount(userId: string): Promise<void> {
    await prisma.userUsage.upsert({
        where: { userId },
        create: {
            userId,
            repositoryCount: 1,
            reviewCounts: {},
        },
        update: {
            repositoryCount: {
                increment: 1,
            },
        },
    });
}
