/*
  Warnings:

  - You are about to drop the column `demographicsGiven` on the `Participant` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Participant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" TEXT NOT NULL,
    "consentGiven" BOOLEAN NOT NULL,
    "consentTimestamp" DATETIME NOT NULL,
    "layoutOrder" JSONB,
    "layoutIndex" INTEGER NOT NULL DEFAULT 0,
    "extractedGenres" JSONB NOT NULL,
    "preferenceMovies" JSONB NOT NULL,
    "moviePages" JSONB NOT NULL,
    "started" BOOLEAN NOT NULL DEFAULT false,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "age" INTEGER,
    "gender" TEXT,
    "nationality" TEXT,
    "netflixExperience" TEXT,
    "disneyExperience" TEXT,
    "hoursPerWeek" INTEGER
);
INSERT INTO "new_Participant" ("age", "consentGiven", "consentTimestamp", "disneyExperience", "extractedGenres", "gender", "hoursPerWeek", "id", "layoutIndex", "layoutOrder", "moviePages", "nationality", "netflixExperience", "preferenceMovies", "sessionId", "started") SELECT "age", "consentGiven", "consentTimestamp", "disneyExperience", "extractedGenres", "gender", "hoursPerWeek", "id", "layoutIndex", "layoutOrder", "moviePages", "nationality", "netflixExperience", "preferenceMovies", "sessionId", "started" FROM "Participant";
DROP TABLE "Participant";
ALTER TABLE "new_Participant" RENAME TO "Participant";
CREATE UNIQUE INDEX "Participant_sessionId_key" ON "Participant"("sessionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
