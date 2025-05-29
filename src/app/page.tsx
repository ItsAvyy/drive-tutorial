import { db } from "~/server/db";
import DriveContents from "./drive-contents";
import { filesTable, foldersTable } from "~/server/db/schema";

export default async function GoogleDriveClone() {
  const folders = await db.select().from(foldersTable);
  const files = await db.select().from(filesTable);

  return <DriveContents folders={folders} files={files} />;
}
