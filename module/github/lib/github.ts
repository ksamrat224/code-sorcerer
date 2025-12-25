import { Octokit } from "octokit";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { headers } from "next/headers";

/**
 * Getting the github access token of the logged in user
 *
 *
 */

export const getGithubToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("User is not authrorized");
  }
  const account = await prisma.account.findFirst({
    where: {
      userId: session.user.id,
      providerId: "github",
    },
  });
  if (!account?.accessToken) {
    throw new Error("GitHub account not linked");
  }
  return account.accessToken;
};
