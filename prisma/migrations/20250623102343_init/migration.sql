-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "consentGiven" BOOLEAN NOT NULL,
    "consentTimestamp" DATETIME NOT NULL,
    "extractedGenres" JSONB NOT NULL,
    "preferenceMovies" JSONB NOT NULL,
    "moviePages" JSONB NOT NULL,
    "started" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
