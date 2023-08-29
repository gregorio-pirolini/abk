-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 20, 2023 at 01:32 PM
-- Server version: 11.0.2-MariaDB
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `abk`
--

-- --------------------------------------------------------

--
-- Table structure for table `definition`
--

CREATE TABLE `definition` (
  `definition_id` int(11) NOT NULL,
  `definition_text` text NOT NULL,
  `img` varchar(100) DEFAULT NULL,
  `link` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `definition_short_name`
--

CREATE TABLE `definition_short_name` (
  `definition_id` int(11) NOT NULL,
  `short_name_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `definition_subject`
--

CREATE TABLE `definition_subject` (
  `definition_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `definition_theme`
--

CREATE TABLE `definition_theme` (
  `definition_id` int(11) NOT NULL,
  `theme_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `long_name`
--

CREATE TABLE `long_name` (
  `long_name_id` int(11) NOT NULL,
  `long_name_text` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `short_name`
--

CREATE TABLE `short_name` (
  `short_name_id` int(11) NOT NULL,
  `short_name_text` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `short_name_long_name`
--

CREATE TABLE `short_name_long_name` (
  `short_name_id` int(11) NOT NULL,
  `long_name_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `subject_id` int(11) NOT NULL,
  `subject_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `theme`
--

CREATE TABLE `theme` (
  `theme_id` int(11) NOT NULL,
  `theme_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `definition`
--
ALTER TABLE `definition`
  ADD PRIMARY KEY (`definition_id`);

--
-- Indexes for table `definition_short_name`
--
ALTER TABLE `definition_short_name`
  ADD PRIMARY KEY (`definition_id`,`short_name_id`),
  ADD KEY `short_name_id` (`short_name_id`);

--
-- Indexes for table `definition_subject`
--
ALTER TABLE `definition_subject`
  ADD PRIMARY KEY (`definition_id`,`subject_id`),
  ADD KEY `subject_id` (`subject_id`);

--
-- Indexes for table `definition_theme`
--
ALTER TABLE `definition_theme`
  ADD PRIMARY KEY (`definition_id`,`theme_id`),
  ADD KEY `theme_id` (`theme_id`);

--
-- Indexes for table `long_name`
--
ALTER TABLE `long_name`
  ADD PRIMARY KEY (`long_name_id`);

--
-- Indexes for table `short_name`
--
ALTER TABLE `short_name`
  ADD PRIMARY KEY (`short_name_id`);

--
-- Indexes for table `short_name_long_name`
--
ALTER TABLE `short_name_long_name`
  ADD PRIMARY KEY (`short_name_id`,`long_name_id`),
  ADD KEY `long_name_id` (`long_name_id`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`subject_id`);

--
-- Indexes for table `theme`
--
ALTER TABLE `theme`
  ADD PRIMARY KEY (`theme_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `definition`
--
ALTER TABLE `definition`
  MODIFY `definition_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=330;

--
-- AUTO_INCREMENT for table `long_name`
--
ALTER TABLE `long_name`
  MODIFY `long_name_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=369;

--
-- AUTO_INCREMENT for table `short_name`
--
ALTER TABLE `short_name`
  MODIFY `short_name_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=376;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `subject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `theme`
--
ALTER TABLE `theme`
  MODIFY `theme_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `definition_short_name`
--
ALTER TABLE `definition_short_name`
  ADD CONSTRAINT `definition_short_name_ibfk_1` FOREIGN KEY (`definition_id`) REFERENCES `definition` (`definition_id`),
  ADD CONSTRAINT `definition_short_name_ibfk_2` FOREIGN KEY (`short_name_id`) REFERENCES `short_name` (`short_name_id`);

--
-- Constraints for table `definition_subject`
--
ALTER TABLE `definition_subject`
  ADD CONSTRAINT `definition_subject_ibfk_1` FOREIGN KEY (`definition_id`) REFERENCES `definition` (`definition_id`),
  ADD CONSTRAINT `definition_subject_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`);

--
-- Constraints for table `definition_theme`
--
ALTER TABLE `definition_theme`
  ADD CONSTRAINT `definition_theme_ibfk_1` FOREIGN KEY (`definition_id`) REFERENCES `definition` (`definition_id`),
  ADD CONSTRAINT `definition_theme_ibfk_2` FOREIGN KEY (`theme_id`) REFERENCES `theme` (`theme_id`);

--
-- Constraints for table `short_name_long_name`
--
ALTER TABLE `short_name_long_name`
  ADD CONSTRAINT `short_name_long_name_ibfk_1` FOREIGN KEY (`short_name_id`) REFERENCES `short_name` (`short_name_id`),
  ADD CONSTRAINT `short_name_long_name_ibfk_2` FOREIGN KEY (`long_name_id`) REFERENCES `long_name` (`long_name_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
