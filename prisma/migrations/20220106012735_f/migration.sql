-- CreateTable
CREATE TABLE "User" (
    "userAccountId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "public_key" TEXT NOT NULL,
    "x25519_public_key" TEXT NOT NULL,
    "signature" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Topic" (
    "topic_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "topicId" TEXT NOT NULL,
    "userAccountId" TEXT,
    "topic_name" TEXT NOT NULL,
    "date_created" TEXT NOT NULL,
    CONSTRAINT "Topic_userAccountId_fkey" FOREIGN KEY ("userAccountId") REFERENCES "User" ("userAccountId") ON DELETE SET NULL ON UPDATE CASCADE
);
