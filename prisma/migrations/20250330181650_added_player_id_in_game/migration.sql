/*
  Warnings:

  - You are about to alter the column `winner_id` on the `games` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to drop the column `san` on the `moves` table. All the data in the column will be lost.
  - Added the required column `player_id` to the `moves` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_games" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "white_id" INTEGER NOT NULL,
    "black_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'WAITING',
    "winner_id" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "games_white_id_fkey" FOREIGN KEY ("white_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "games_black_id_fkey" FOREIGN KEY ("black_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_games" ("black_id", "created_at", "id", "status", "white_id", "winner_id") SELECT "black_id", "created_at", "id", "status", "white_id", "winner_id" FROM "games";
DROP TABLE "games";
ALTER TABLE "new_games" RENAME TO "games";
CREATE TABLE "new_moves" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "game_id" TEXT NOT NULL,
    "player_id" INTEGER NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "moves_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "moves_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_moves" ("created_at", "from", "game_id", "id", "to") SELECT "created_at", "from", "game_id", "id", "to" FROM "moves";
DROP TABLE "moves";
ALTER TABLE "new_moves" RENAME TO "moves";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
