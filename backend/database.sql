SET foreign_key_checks = 0;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE IF NOT EXISTS `Users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(80) NOT NULL,
  `email` VARCHAR(300) NOT NULL,
  `hashedPassword` VARCHAR(255) NOT NULL,
  `is_admin` TINYINT NULL,
  `avatar` TEXT,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `Genres`;
CREATE TABLE IF NOT EXIcdSTS `Genres` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `genre_name` VARCHAR(255) NOT NULL
)ENGINE = InnoDB;

DROP TABLE IF EXISTS `Themes`;
CREATE TABLE IF NOT EXISTS `Themes` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `theme_name` VARCHAR(255) NOT NULL
)ENGINE = InnoDB;

DROP TABLE IF EXISTS `Manhwa`;
CREATE TABLE IF NOT EXISTS `Manhwa` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `synopsis` TEXT,
    `author_name` VARCHAR(255),
    `cover_image` TEXT,
    `theme_id` INT NOT NULL,
    `genre_id` INT NOT NULL,
    FOREIGN KEY (`theme_id`) REFERENCES Themes(`id`),
    FOREIGN KEY (`genre_id`) REFERENCES Genres(`id`)
    )
    ENGINE = InnoDB;

DROP TABLE IF EXISTS `Chapters`;
CREATE TABLE IF NOT EXISTS `Chapters` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `chapter` TEXT,
    `manhwa_id` INT NOT NULL,
    `views` INT DEFAULT 0,
    FOREIGN KEY (`manhwa_id`) REFERENCES Manhwa(`id`)
)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `UserLibrary`;
CREATE TABLE IF NOT EXISTS `UserLibrary` (
`user_id` INT NOT NULL,
`manwha_id` INT NOT NULL,
FOREIGN KEY (`user_id`) REFERENCES Users(`id`),
FOREIGN KEY (`manwha_id`) REFERENCES Manhwa(`id`),
PRIMARY KEY (`user_id`, `manwha_id`)
)ENGINE = InnoDB;

DROP TABLE IF EXISTS `Comments`;
CREATE TABLE IF NOT EXISTS `Comments` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`comment` VARCHAR(500) NOT NULL,
`user_id` INT NOT NULL,
`chapter_id` INT NOT NULL,
FOREIGN KEY (`user_id`) REFERENCES Users(`id`),
FOREIGN KEY (`chapter_id`) REFERENCES Chapters(`id`)
)ENGINE = InnoDB;

DROP TABLE IF EXISTS `Likes`;
CREATE TABLE IF NOT EXISTS `Likes`(
    `user_id` INT NOT NULL,
    `chapter_id` INT NOT NULL,
    `number_of_likes` INT,
    FOREIGN KEY (`user_id`) REFERENCES Users(`id`),
    FOREIGN KEY (`chapter_id`) REFERENCES Chapters(`id`),
    PRIMARY KEY (`user_id`,`chapter_id`)
)ENGINE = InnoDB;

 
