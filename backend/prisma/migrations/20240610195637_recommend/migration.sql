-- CreateTable
CREATE TABLE `Recommendation` (
    `originId` INTEGER NOT NULL,
    `recommendId` INTEGER NOT NULL,
    `similarity` DOUBLE NOT NULL,

    PRIMARY KEY (`originId`, `recommendId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
