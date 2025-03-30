/*
  Warnings:

  - You are about to drop the `jwt_access_tokens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `jwt_refresh_tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "jwt_access_tokens";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "jwt_refresh_tokens";
PRAGMA foreign_keys=on;
