/*
  Warnings:

  - You are about to alter the column `endTime` on the `CarouselMeasurements` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `startTime` on the `CarouselMeasurements` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `endTime` on the `GridMeasurements` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `startTime` on the `GridMeasurements` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `endTime` on the `HoneycombMeasurements` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `startTime` on the `HoneycombMeasurements` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CarouselMeasurements" (
    "sessionId" TEXT NOT NULL PRIMARY KEY,
    "firstMovie" TEXT,
    "hoveredMovies" JSONB,
    "startTime" BIGINT NOT NULL,
    "endTime" BIGINT,
    "totalTime" INTEGER
);
INSERT INTO "new_CarouselMeasurements" ("endTime", "firstMovie", "hoveredMovies", "sessionId", "startTime", "totalTime") SELECT "endTime", "firstMovie", "hoveredMovies", "sessionId", "startTime", "totalTime" FROM "CarouselMeasurements";
DROP TABLE "CarouselMeasurements";
ALTER TABLE "new_CarouselMeasurements" RENAME TO "CarouselMeasurements";
CREATE TABLE "new_GridMeasurements" (
    "sessionId" TEXT NOT NULL PRIMARY KEY,
    "firstMovie" TEXT,
    "hoveredMovies" JSONB,
    "startTime" BIGINT NOT NULL,
    "endTime" BIGINT,
    "totalTime" INTEGER
);
INSERT INTO "new_GridMeasurements" ("endTime", "firstMovie", "hoveredMovies", "sessionId", "startTime", "totalTime") SELECT "endTime", "firstMovie", "hoveredMovies", "sessionId", "startTime", "totalTime" FROM "GridMeasurements";
DROP TABLE "GridMeasurements";
ALTER TABLE "new_GridMeasurements" RENAME TO "GridMeasurements";
CREATE TABLE "new_HoneycombMeasurements" (
    "sessionId" TEXT NOT NULL PRIMARY KEY,
    "firstMovie" TEXT,
    "hoveredMovies" JSONB,
    "startTime" BIGINT NOT NULL,
    "endTime" BIGINT,
    "totalTime" INTEGER
);
INSERT INTO "new_HoneycombMeasurements" ("endTime", "firstMovie", "hoveredMovies", "sessionId", "startTime", "totalTime") SELECT "endTime", "firstMovie", "hoveredMovies", "sessionId", "startTime", "totalTime" FROM "HoneycombMeasurements";
DROP TABLE "HoneycombMeasurements";
ALTER TABLE "new_HoneycombMeasurements" RENAME TO "HoneycombMeasurements";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
