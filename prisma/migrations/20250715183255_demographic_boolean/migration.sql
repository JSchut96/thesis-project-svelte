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
    "demographicsGiven" BOOLEAN NOT NULL DEFAULT false,
    "age" INTEGER,
    "gender" TEXT,
    "nationality" TEXT,
    "netflixExperience" TEXT,
    "disneyExperience" TEXT,
    "hoursPerWeek" INTEGER
);
INSERT INTO "new_Participant" ("age", "consentGiven", "consentTimestamp", "createdAt", "disneyExperience", "extractedGenres", "gender", "hoursPerWeek", "id", "moviePages", "nationality", "netflixExperience", "preferenceMovies", "started") SELECT "age", "consentGiven", "consentTimestamp", "createdAt", "disneyExperience", "extractedGenres", "gender", "hoursPerWeek", "id", "moviePages", "nationality", "netflixExperience", "preferenceMovies", "started" FROM "Participant";
DROP TABLE "Participant";
ALTER TABLE "new_Participant" RENAME TO "Participant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
