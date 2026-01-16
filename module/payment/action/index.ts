"use server";

import { auth } from "@/lib/auth";
import { getRemainingLimits, updateUserTier } from "../lib/subscription";
import { headers } from "next/headers";
import { polarClient } from "@/module/payment/config/polar";
import prisma from "@/lib/db";

export interface subscriptionDate {
  user: {
    id: string;
    name: string;
    email: string;
    subscriptionTier: string;
    subscriptionStatus: string | null;
    polarCustomerId: string | null;
    polarSubscriptionId: string | null;
  } | null;
  limits: {
    tier: "FREE" | "PRO";
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
  } | null;
}
