import { db } from "~/server/db"; // path to your db file
import { systemchecks } from "~/server/db/schema";
import { type NextRequest, NextResponse } from "next/server";
import type { systemcheck_type_insert } from "~/server/db/schema";
import type { SystemCheckInput } from "~/types/systemCheck";


export async function POST(req: NextRequest) : Promise<NextResponse> {
  try {
    // eslint-disable-next-line
    const body: SystemCheckInput = await req.json();

    const data: systemcheck_type_insert = {
      timestamp: new Date(body.timestamp),
      os_type: body.os_type,
      hostname: body.hostname,
      disk_encryption: body.disk_encryption,
      os_update_status: body.os_update_status,
      antivirus_info: {
        presence: body.antivirus_info?.presence,
        details: body.antivirus_info?.details,
      },
      inactivity_sleep_settings: {
        compliance_status: body.inactivity_sleep_settings?.compliance_status,
        configured_minutes: body.inactivity_sleep_settings?.configured_minutes,
      }
    };

    await db.insert(systemchecks).values(data);

    return NextResponse.json({ success: true });
  }
  // eslint-disable-next-line 
  catch (error: any) {
    console.error("Insert error:", error);
    return NextResponse.json(
      // eslint-disable-next-line
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = await db.select().from(systemchecks).orderBy(systemchecks.timestamp);
    return NextResponse.json(data);
  } 
  // eslint-disable-next-line 
  catch (error: any) {
    // eslint-disable-next-line
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}