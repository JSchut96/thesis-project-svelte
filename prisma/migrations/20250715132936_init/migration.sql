/*
  Warnings:

  - Added the required column `age` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `disneyExperience` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hoursPerWeek` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `netflixExperience` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Participant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "consentGiven" BOOLEAN NOT NULL,
    "consentTimestamp" DATETIME NOT NULL,
    "extractedGenres" JSONB NOT NULL,
    "preferenceMovies" JSONB NOT NULL,
    "moviePages" JSONB NOT NULL,
    "started" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "netflixExperience" TEXT NOT NULL,
    "disneyExperience" TEXT NOT NULL,
    "hoursPerWeek" INTEGER NOT NULL
);
INSERT INTO "new_Participant" ("consentGiven", "consentTimestamp", "createdAt", "extractedGenres", "id", "moviePages", "preferenceMovies", "started") SELECT "consentGiven", "consentTimestamp", "createdAt", "extractedGenres", "id", "moviePages", "preferenceMovies", "started" FROM "Participant";
DROP TABLE "Participant";
ALTER TABLE "new_Participant" RENAME TO "Participant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
