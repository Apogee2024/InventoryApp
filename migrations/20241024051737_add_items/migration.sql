-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "intPartNum" TEXT,
    "intName" TEXT NOT NULL,
    "reOrder" INTEGER,
    "vendor" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "sloc" TEXT,
    "QrCode" TEXT,
    "Label" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);
