-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gazdă: 127.0.0.1
-- Timp de generare: iun. 13, 2023 la 05:06 PM
-- Versiune server: 10.4.27-MariaDB
-- Versiune PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Bază de date: `project`
--

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `info_users`
--

CREATE TABLE `info_users` (
  `id_user` varchar(13) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `entire_name` text DEFAULT NULL,
  `gender` text DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `country` text DEFAULT NULL,
  `high_school` text DEFAULT NULL,
  `about_me` text DEFAULT NULL,
  `display_birthdate` tinyint(1) DEFAULT NULL,
  `display_highschool` tinyint(1) DEFAULT NULL,
  `display_gender` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `info_users`
--

INSERT INTO `info_users` (`id_user`, `entire_name`, `gender`, `birth_date`, `country`, `high_school`, `about_me`, `display_birthdate`, `display_highschool`, `display_gender`) VALUES
('648885400d7f5', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `prof_questions`
--

CREATE TABLE `prof_questions` (
  `id` int(11) NOT NULL,
  `text` text NOT NULL,
  `tags` text DEFAULT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `users`
--

CREATE TABLE `users` (
  `user_id` varchar(13) NOT NULL,
  `username` varchar(25) NOT NULL,
  `email` varchar(320) NOT NULL,
  `role` varchar(9) NOT NULL,
  `password` char(60) NOT NULL,
  `creation_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Eliminarea datelor din tabel `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `role`, `password`, `creation_date`) VALUES
('648885400d7f5', 'Abcdef1_', 'a@a.a', 'student', '$2y$10$wEkH3Wpp4kJ8nTUkxNFrAOHLbbtWi7p2F.SSI1.O6RMlvtss7y2M6', '2023-06-13');

--
-- Indexuri pentru tabele eliminate
--

--
-- Indexuri pentru tabele `info_users`
--
ALTER TABLE `info_users`
  ADD PRIMARY KEY (`id_user`);

--
-- Indexuri pentru tabele `prof_questions`
--
ALTER TABLE `prof_questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexuri pentru tabele `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `users_unique_username` (`username`),
  ADD UNIQUE KEY `users_unique_email` (`email`);

--
-- AUTO_INCREMENT pentru tabele eliminate
--

--
-- AUTO_INCREMENT pentru tabele `prof_questions`
--
ALTER TABLE `prof_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constrângeri pentru tabele eliminate
--

--
-- Constrângeri pentru tabele `info_users`
--
ALTER TABLE `info_users`
  ADD CONSTRAINT `constraint_id` FOREIGN KEY (`id_user`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
