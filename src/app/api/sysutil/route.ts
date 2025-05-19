import { NextRequest } from "next/server";
// import { db } from "~/server/db";

export async function POST(req: NextRequest) {
  const data = await req.json();

  console.log(data)
}
