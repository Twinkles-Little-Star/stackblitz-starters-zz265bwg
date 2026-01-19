import { NextResponse } from "next/server";
// import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing text field." },
        { status: 400 }
      );
    }

    // OPTIONAL: Save to Supabase
    // const supabase = createClient(
    //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
    //   process.env.SUPABASE_SERVICE_ROLE_KEY!
    // );

    // const { error } = await supabase
    //   .from("snapshots")
    //   .insert({ text });

    // if (error) {
    //   console.error("Supabase insert error:", error);
    //   return NextResponse.json(
    //     { error: "Failed to save Snapshot." },
    //     { status: 500 }
    //   );
    // }

    return NextResponse.json({
      message: "Snapshot received successfully.",
      received: text,
    });
  } catch (err) {
    console.error("Snapshot API error:", err);
    return NextResponse.json(
      { error: "Server error processing Snapshot." },
      { status: 500 }
    );
  }
}