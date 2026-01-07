"use server";

import prisma from "@/lib/db";

export async function reviewPullRequest(
  owner: string,
  repo: string,
  prNumber: number
) {
  const repository = await prisma.repository.findFirst({
    where: {
      owner,
      name: repo,
    },
    include: {
      user: {
        include: {
          accounts: {
            where: {
              providerId: "github",
            },
          },
        },
      },
    },
  });
  if (!repository) {
    throw new Error(
      `Repository ${owner}/${repo} not found in the database.Please reconnect the repository.`
    );
  }
  const githubAccount = repository.user.accounts[0];
  if (!githubAccount.accessToken) {
    throw new Error("No GitHub access token found for repository owner");
  }
  const token = githubAccount.accessToken;
}
