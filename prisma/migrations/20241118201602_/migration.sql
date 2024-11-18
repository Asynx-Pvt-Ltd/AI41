-- CreateTable
CREATE TABLE "newsKeyword" (
    "id" SERIAL NOT NULL,
    "keyword" TEXT NOT NULL,
    "keywordUrl" TEXT NOT NULL,

    CONSTRAINT "newsKeyword_pkey" PRIMARY KEY ("id")
);
