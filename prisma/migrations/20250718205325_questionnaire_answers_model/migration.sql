/*
  Warnings:

  - You are about to drop the column `userId` on the `LikertRating` table. All the data in the column will be lost.
  - Added the required column `sessionId` to the `LikertRating` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "QuestionnaireAnswers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" TEXT NOT NULL,
    "layoutRank1" TEXT NOT NULL,
    "layoutRank2" TEXT NOT NULL,
    "layoutRank3" TEXT NOT NULL,
    "reasoning" TEXT NOT NULL,
    "prosCons" TEXT NOT NULL,
    "remarks" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LikertRating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" TEXT NOT NULL,
    "layout" TEXT NOT NULL,
    "adjective" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_LikertRating" ("adjective", "createdAt", "id", "layout", "value") SELECT "adjective", "createdAt", "id", "layout", "value" FROM "LikertRating";
DROP TABLE "LikertRating";
ALTER TABLE "new_LikertRating" RENAME TO "LikertRating";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
