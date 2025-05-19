import { int, singlestoreTable, singlestoreTableCreator, json, text, datetime } from 'drizzle-orm/singlestore-core';


export const createTable = singlestoreTableCreator(
  (name) => `sysutil_${name}`
)

export const systemchecks = singlestoreTable('system_checks', {
  id: int().primaryKey(),
  timestamp: datetime("timestamp").notNull(), 
  os_type: text("os_type"), 
  hostname: text("hostname"), 
  disk_encryption: text("disk_encryption"), 
  os_update_status: text("os_update_status"), 
  antivirus_info: json().$type<{presence: string; details: string}>(), 
  inactivity_sleep_settings: json().$type<{compliance_status: string; configured_minutes: number}>()
});

export type systemcheck_type_insert = typeof systemchecks.$inferInsert
export type systemcheck_type_select = typeof systemchecks.$inferSelect
