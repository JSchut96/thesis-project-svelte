/*
  Warnings:

  - Added the required column `layoutOrder` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Participant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" TEXT NOT NULL,
    "consentGiven" BOOLEAN NOT NULL,
    "consentTimestamp" DATETIME NOT NULL,
    "layoutOrder" JSONB NOT NULL,
    "layoutIndex" INTEGER NOT NULL DEFAULT 0,
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
INSERT INTO "new_Participant" ("age", "consentGiven", "consentTimestamp", "demographicsGiven", "disneyExperience", "extractedGenres", "gender", "hoursPerWeek", "id", "moviePages", "nationality", "netflixExperience", "preferenceMovies", "sessionId", "started") SELECT "age", "consentGiven", "consentTimestamp", "demographicsGiven", "disneyExperience", "extractedGenres", "gender", "hoursPerWeek", "id", "moviePages", "nationality", "netflixExperience", "preferenceMovies", "sessionId", "started" FROM "Participant";
DROP TABLE "Participant";
ALTER TABLE "new_Participant" RENAME TO "Participant";
CREATE UNIQUE INDEX "Participant_sessionId_key" ON "Participant"("sessionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
