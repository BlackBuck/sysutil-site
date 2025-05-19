import { NextResponse, type NextRequest } from "next/server";
import { db } from "~/server/db";
import { systemchecks, type systemcheck_type_insert } from "~/server/db/schema"

export async function POST(req: NextRequest) {

  // eslint-disable-next-line
  const insert_value: systemcheck_type_insert = await req.json();
  // eslint-disable-next-line
  const result = await db.insert(systemchecks).values(insert_value);

  return NextResponse.json({ success: true, result: result });
}
