-- CreateTable
CREATE TABLE `Embedding` (
    `netflixId` INTEGER NOT NULL,
    `embedding` TEXT NOT NULL,

    PRIMARY KEY (`netflixId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Embedding` ADD CONSTRAINT `Embedding_netflixId_fkey` FOREIGN KEY (`netflixId`) REFERENCES `Netflix`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
