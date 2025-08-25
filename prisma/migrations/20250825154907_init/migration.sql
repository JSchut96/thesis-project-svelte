-- CreateTable
CREATE TABLE "Participant" (
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
    "streamingExperience" INTEGER,
    "hoursPerWeek" INTEGER,
    "colorBlindness" TEXT,
    "inputDevice" TEXT
);

-- CreateTable
CREATE TABLE "GridMeasurements" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" TEXT NOT NULL,
    "firstMovie" TEXT,
    "chosenMovie" TEXT,
    "watchlist" JSONB,
    "hoveredMovies" JSONB,
    "startTime" BIGINT NOT NULL,
    "endTime" BIGINT,
    "totalTime" INTEGER
);

-- CreateTable
CREATE TABLE "CarouselMeasurements" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" TEXT NOT NULL,
    "firstMovie" TEXT,
    "chosenMovie" TEXT,
    "watchlist" JSONB,
    "hoveredMovies" JSONB,
    "startTime" BIGINT NOT NULL,
    "endTime" BIGINT,
    "totalTime" INTEGER
);

-- CreateTable
CREATE TABLE "HoneycombMeasurements" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" TEXT NOT NULL,
    "firstMovie" TEXT,
    "chosenMovie" TEXT,
    "watchlist" JSONB,
    "hoveredMovies" JSONB,
    "startTime" BIGINT NOT NULL,
    "endTime" BIGINT,
    "totalTime" INTEGER
);

-- CreateTable
CREATE TABLE "LikertRating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" TEXT NOT NULL,
    "layout" TEXT NOT NULL,
    "adjective" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

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

-- CreateIndex
CREATE UNIQUE INDEX "Participant_sessionId_key" ON "Participant"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "GridMeasurements_sessionId_key" ON "GridMeasurements"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "CarouselMeasurements_sessionId_key" ON "CarouselMeasurements"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "HoneycombMeasurements_sessionId_key" ON "HoneycombMeasurements"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionnaireAnswers_sessionId_key" ON "QuestionnaireAnswers"("sessionId");
