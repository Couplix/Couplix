-- AddForeignKey
ALTER TABLE `Recommendation` ADD CONSTRAINT `Recommendation_originId_fkey` FOREIGN KEY (`originId`) REFERENCES `Netflix`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recommendation` ADD CONSTRAINT `Recommendation_recommendId_fkey` FOREIGN KEY (`recommendId`) REFERENCES `Netflix`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
