/*
  Warnings:

  - The primary key for the `Participant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Participant` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Participant` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The required column `sessionId` was added to the `Participant` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Participant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" TEXT NOT NULL,
    "consentGiven" BOOLEAN NOT NULL,
    "consentTimestamp" DATETIME NOT NULL,
    "extractedGenres" JSONB NOT NULL,
    "preferenceMovies" JSONB NOT NULL,
    "moviePages" JSONB NOT NULL,
    "started" BOOLEAN NOT NULL DEFAULT false,
    "demographicsGiven" BOOLEAN NOT NULL DEFAULT false,
    "age" INTEGER,
    "gender" TEXT,
    "nationality" TEXT,
    "netflixExperience" TEXT,
    "disneyExperience" TEXT,
    "hoursPerWeek" INTEGER
);
INSERT INTO "new_Participant" ("age", "consentGiven", "consentTimestamp", "demographicsGiven", "disneyExperience", "extractedGenres", "gender", "hoursPerWeek", "id", "moviePages", "nationality", "netflixExperience", "preferenceMovies", "started") SELECT "age", "consentGiven", "consentTimestamp", "demographicsGiven", "disneyExperience", "extractedGenres", "gender", "hoursPerWeek", "id", "moviePages", "nationality", "netflixExperience", "preferenceMovies", "started" FROM "Participant";
DROP TABLE "Participant";
ALTER TABLE "new_Participant" RENAME TO "Participant";
CREATE UNIQUE INDEX "Participant_sessionId_key" ON "Participant"("sessionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
