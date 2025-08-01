-- CreateTable
CREATE TABLE "GridMeasurements" (
    "sessionId" TEXT NOT NULL PRIMARY KEY,
    "firstMovie" TEXT,
    "hoveredMovies" JSONB,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME,
    "totalTime" INTEGER
);
