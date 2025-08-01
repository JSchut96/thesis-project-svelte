/*
  Warnings:

  - You are about to alter the column `endTime` on the `GridMeasurements` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.
  - You are about to alter the column `startTime` on the `GridMeasurements` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GridMeasurements" (
    "sessionId" TEXT NOT NULL PRIMARY KEY,
    "firstMovie" TEXT,
    "hoveredMovies" JSONB,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER,
    "totalTime" INTEGER
);
INSERT INTO "new_GridMeasurements" ("endTime", "firstMovie", "hoveredMovies", "sessionId", "startTime", "totalTime") SELECT "endTime", "firstMovie", "hoveredMovies", "sessionId", "startTime", "totalTime" FROM "GridMeasurements";
DROP TABLE "GridMeasurements";
ALTER TABLE "new_GridMeasurements" RENAME TO "GridMeasurements";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
