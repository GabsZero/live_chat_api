/*
  Warnings:

  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "nickname" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserContacts" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "contact_id" TEXT NOT NULL,

    CONSTRAINT "UserContacts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserContacts" ADD CONSTRAINT "UserContacts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserContacts" ADD CONSTRAINT "UserContacts_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
