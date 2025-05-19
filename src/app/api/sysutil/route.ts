import { NextResponse, type NextRequest } from "next/server";
import { db } from "~/server/db";
import { systemchecks } from "~/server/db/schema"

export async function POST(req: NextRequest) {
  const {
    timestamp,
    os_name,
    hostname,
    disk_encryption,
    os_update_status,
    antivirus_info,
    inactivity_sleep_settings,
  } = await req.json();

  const result = await db.insert(systemchecks).values([timestamp, os_name, hostname, disk_encryption, os_update_status, antivirus_info, inactivity_sleep_settings]);

  return NextResponse.json({ success: true, result: result });
}
