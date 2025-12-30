import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const event = req.headers.get("X-GitHub-Event");
    console.log(`Received GitHub webhook event: ${event}`);
    if(event === "ping") {
        return NextResponse.json({message: "pong"}, {status: 200});
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
