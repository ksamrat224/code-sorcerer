import prisma from "@/lib/db";
import { inngest } from "../../inngest/client";
import { getRepoFileContents } from "@/module/github/lib/github";

export const indexRepo = inngest.createFunction(
  { id: "index-repo" },
  { event: "repository.connected" },
  async ({ event, step }) => {
    const { owner, repo, userId } = event.data;
    //will fetch files from the repo
    const files = await step.run("fetch-files", async () => {
      const account = await prisma.account.findFirst({
        where: {
          userId: userId,
          providerId: "github",
        },
      });
      if (!account?.accessToken) {
        throw new Error("No github access token found");
      }

      return await getRepoFileContents(account.accessToken, owner, repo);
    });
    await step.run("index-codebase", async () => {
      //await indexCodebase
    });
  }
);
