-- CreateTable
CREATE TABLE "CarouselMeasurements" (
    "sessionId" TEXT NOT NULL PRIMARY KEY,
    "firstMovie" TEXT,
    "hoveredMovies" JSONB,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER,
    "totalTime" INTEGER
);

-- CreateTable
CREATE TABLE "HoneycombMeasurements" (
    "sessionId" TEXT NOT NULL PRIMARY KEY,
    "firstMovie" TEXT,
    "hoveredMovies" JSONB,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER,
    "totalTime" INTEGER
);
