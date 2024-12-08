/*
  Warnings:

  - You are about to drop the `places` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "places" DROP CONSTRAINT "places_author_id_fkey";

-- DropTable
DROP TABLE "places";
