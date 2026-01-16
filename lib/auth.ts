import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db";
import {
  polar,
  checkout,
  portal,
  usage,
  webhooks,
} from "@polar-sh/better-auth";
import { polarClient } from "@/module/payment/config/polar";
import {
  SubscriptionTier,
  updatePolarCustomerId,
  updateUserTier,
} from "@/module/payment/lib/subscription";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      scope: ["repo"],
    },
  },
  trustedOrigins: [
    "http://localhost:3000",
    "https://eventfully-nonempathic-nikolai.ngrok-free.dev",
  ],
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "91a6749e-35d4-4fe2-ae51-c3d7510ebe05",
              slug: "samrat", // Custom slug for easy reference in Checkout URL, e.g. /checkout/code-sorcerer
            },
          ],
          successUrl:
            process.env.POLAR_SUCCESS_URL ||
            "/dashboard/subscription?success=true",
          authenticatedUsersOnly: true,
        }),
        portal({
          returnUrl:
            process.env.NEXT_PUBLIC_APP_URL ||
            "http://localhost:3000/dashboard ",
        }),
        usage(),
        webhooks({
          secret: process.env.POLAR_WEBHOOK_SECRET!,

          onSubscriptionActive: async (payload) => {
            const customerId = payload.data.customerId;

            const user = await prisma.user.findUnique({
              where: { polarCustomerId: customerId },
            });

            if (user) {
              await updateUserTier(user.id, "PRO", "ACTIVE", payload.data.id);
            }
          },

          onSubscriptionCanceled: async (payload) => {
            const customerId = payload.data.customerId;

            const user = await prisma.user.findUnique({
              where: { polarCustomerId: customerId },
            });

            if (user) {
              await updateUserTier(
                user.id,
                user.subscriptionTier as SubscriptionTier,
                "CANCELLED"
              );
            }
          },
          onSubscriptionRevoked: async (payload) => {
            const customerId = payload.data.customerId;

            const user = await prisma.user.findUnique({
              where: { polarCustomerId: customerId },
            });

            if (user) {
              await updateUserTier(user.id, "FREE", "EXPIRED");
            }
          },
          onOrderPaid: async () => {},
          onCustomerCreated: async (payload) => {
            const user = await prisma.user.findUnique({
              where: {
                email: payload.data.email,
              },
            });
            if (user) {
              await updatePolarCustomerId(user.id, payload.data.id);
            }
          },
        }),
      ],
    }),
  ],
});
