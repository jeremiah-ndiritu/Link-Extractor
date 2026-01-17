import { openDB } from "idb";

const DB_NAME = "link-extractor-db";
const DB_VERSION = 1;
const STORE_NAME = "urls";

export const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: "id" });
    }
  },
});
// Clear all stored data
export async function clearDB() {
  const db = await dbPromise;
  await db.clear("urls");
}

// Save URLs
export async function saveUrls(urls) {
  const db = await dbPromise;
  await db.put(STORE_NAME, {
    id: "stored-urls",
    data: urls,
    savedAt: Date.now(),
  });
}

// Load URLs
export async function loadUrls() {
  const db = await dbPromise;
  const result = await db.get(STORE_NAME, "stored-urls");
  return result?.data || [];
}

// Save clicked URLs
export async function saveClicked(clicked) {
  const db = await dbPromise;
  await db.put(STORE_NAME, {
    id: "clicked-urls",
    data: clicked,
  });
}

// Load clicked URLs
export async function loadClicked() {
  const db = await dbPromise;
  const result = await db.get(STORE_NAME, "clicked-urls");
  return result?.data || [];
}
// Generic save state
