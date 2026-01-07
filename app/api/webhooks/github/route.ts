import { reviewPullRequest } from "@/module/ai/actions";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const event = req.headers.get("X-GitHub-Event");
    console.log(`Received GitHub webhook event: ${event}`);
    if (event === "ping") {
      return NextResponse.json({ message: "pong" }, { status: 200 });
    }
    if (event == "pull_request") {
      const action = body.action;
      const repo = body.repository.full_name;
      const prNumber = body.number;
      const [owner, repoName] = repo.split("/");
      if (action === "opened" || action === "synchronize") {
        reviewPullRequest(owner, repoName, prNumber)
          .then(() => console.log(`Reviewed PR #${prNumber} in ${repo}`))
          .catch((err) =>
            console.error(`Error reviewing PR #${prNumber} in ${repo}:`, err)
          );
      }
    }
    //todo:handle later
    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch (error) {
    console.error("Error processing GitHub webhook:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
