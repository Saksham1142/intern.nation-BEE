-- AlterTable
ALTER TABLE "User" ADD COLUMN     "collegeName" TEXT,
ALTER COLUMN "collegeDepartment" DROP NOT NULL,
ALTER COLUMN "studentId" DROP NOT NULL;
