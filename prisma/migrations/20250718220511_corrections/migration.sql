/*
  Warnings:

  - The primary key for the `CarouselMeasurements` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `GridMeasurements` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `HoneycombMeasurements` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[sessionId]` on the table `QuestionnaireAnswers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `CarouselMeasurements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `GridMeasurements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `HoneycombMeasurements` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CarouselMeasurements" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" TEXT NOT NULL,
    "firstMovie" TEXT,
    "hoveredMovies" JSONB,
    "startTime" BIGINT NOT NULL,
    "endTime" BIGINT,
    "totalTime" INTEGER
);
INSERT INTO "new_CarouselMeasurements" ("endTime", "firstMovie", "hoveredMovies", "sessionId", "startTime", "totalTime") SELECT "endTime", "firstMovie", "hoveredMovies", "sessionId", "startTime", "totalTime" FROM "CarouselMeasurements";
DROP TABLE "CarouselMeasurements";
ALTER TABLE "new_CarouselMeasurements" RENAME TO "CarouselMeasurements";
CREATE UNIQUE INDEX "CarouselMeasurements_sessionId_key" ON "CarouselMeasurements"("sessionId");
CREATE TABLE "new_GridMeasurements" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" TEXT NOT NULL,
    "firstMovie" TEXT,
    "hoveredMovies" JSONB,
    "startTime" BIGINT NOT NULL,
    "endTime" BIGINT,
    "totalTime" INTEGER
);
INSERT INTO "new_GridMeasurements" ("endTime", "firstMovie", "hoveredMovies", "sessionId", "startTime", "totalTime") SELECT "endTime", "firstMovie", "hoveredMovies", "sessionId", "startTime", "totalTime" FROM "GridMeasurements";
DROP TABLE "GridMeasurements";
ALTER TABLE "new_GridMeasurements" RENAME TO "GridMeasurements";
CREATE UNIQUE INDEX "GridMeasurements_sessionId_key" ON "GridMeasurements"("sessionId");
CREATE TABLE "new_HoneycombMeasurements" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" TEXT NOT NULL,
    "firstMovie" TEXT,
    "hoveredMovies" JSONB,
    "startTime" BIGINT NOT NULL,
    "endTime" BIGINT,
    "totalTime" INTEGER
);
INSERT INTO "new_HoneycombMeasurements" ("endTime", "firstMovie", "hoveredMovies", "sessionId", "startTime", "totalTime") SELECT "endTime", "firstMovie", "hoveredMovies", "sessionId", "startTime", "totalTime" FROM "HoneycombMeasurements";
DROP TABLE "HoneycombMeasurements";
ALTER TABLE "new_HoneycombMeasurements" RENAME TO "HoneycombMeasurements";
CREATE UNIQUE INDEX "HoneycombMeasurements_sessionId_key" ON "HoneycombMeasurements"("sessionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "QuestionnaireAnswers_sessionId_key" ON "QuestionnaireAnswers"("sessionId");
