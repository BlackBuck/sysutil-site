import "server-only";
import { systemchecks, type systemcheck_type_insert } from "./schema";
import { db } from ".";

export const QUERIES = {
    insertcheck: async function(systemCheck: systemcheck_type_insert) {
        await db.insert(systemchecks).values(systemCheck).$returningId();
        
    }
}