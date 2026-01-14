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
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "cebdb051-8154-4e01-8bfd-6a0b17620bdf",
              slug: "code-sorcerer", // Custom slug for easy reference in Checkout URL, e.g. /checkout/code-sorcerer
            },
          ],
          successUrl: process.env.POLAR_SUCCESS_URL,
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
          onSubscriptionActive: async () => {},
          onSubscriptionCanceled: async () => {},
          onSubscriptionRevoked: async () => {},
          onOrderPaid: async () => {},
          onCustomerCreated: async () => {},
        }),
      ],
    }),
  ],
});
