-- CreateTable
CREATE TABLE `Netflix` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `director` TEXT NOT NULL,
    `cast` TEXT NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `release_year` VARCHAR(191) NOT NULL,
    `rating` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `listed_in` TEXT NOT NULL,
    `description` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `netflixId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StarRating` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `star` INTEGER NOT NULL,
    `netflixId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_netflixId_fkey` FOREIGN KEY (`netflixId`) REFERENCES `Netflix`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StarRating` ADD CONSTRAINT `StarRating_netflixId_fkey` FOREIGN KEY (`netflixId`) REFERENCES `Netflix`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
