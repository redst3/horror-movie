-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "favoriteMoviesIds" INTEGER[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
