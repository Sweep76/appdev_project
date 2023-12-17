-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 17, 2023 at 05:35 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `plantdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_ID` int(11) NOT NULL,
  `admin_name` varchar(40) NOT NULL,
  `email` varchar(50) NOT NULL,
  `admin_pass` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_ID`, `admin_name`, `email`, `admin_pass`) VALUES
(1, 'admin', 'admin@gmail.com', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `taskID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `taskName` varchar(50) NOT NULL,
  `taskDate` date NOT NULL,
  `task_Desc` varchar(255) NOT NULL,
  `customerName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`taskID`, `userID`, `taskName`, `taskDate`, `task_Desc`, `customerName`) VALUES
(1, 1, 'BPI Bank Delivery', '2023-12-20', 'deliver short bondpaper 50pcs in Liloan City', 'Janice'),
(2, 1, 'Delivery Ink Cartridge', '2023-12-28', 'Client lives in Talisay', 'Jonathan'),
(3, 2, 'BDO payment', '2023-12-20', 'Deliver EPSON printer before 7:30am', 'Ronald'),
(4, 2, 'School Supply', '2024-01-03', '70 boxes of paper clips, 10 folders, and 5 pens', 'Raven'),
(5, 2, 'FRONTIER BUSINESS', '2023-12-31', '20 pcs of whiteboard marker. meeting place in rusty building in osmena boulevard at 5pm', 'Jeremiah'),
(6, 2, 'Kiki Delivery', '2023-12-15', 'Description 1', 'Francis'),
(7, 2, 'Siomai Centre', '2023-12-19', 'Description 2', 'Charles'),
(8, 3, 'Abolarium Bldg.', '2023-11-04', 'Description 3', 'Patrick'),
(9, 4, 'WTO', '2023-10-31', 'Description 4', 'David'),
(10, 3, 'USC event', '2023-08-12', 'Description 5', 'Godwin'),
(11, 3, 'Jollibee', '2023-04-12', 'Description 6', 'Bobby'),
(12, 2, 'Library Frontier', '2024-06-24', 'Description 7', 'Christian'),
(13, 2, 'Meeting Conference', '2024-05-15', 'Description 8', 'Gomez'),
(14, 1, 'SM BDO', '2022-08-22', 'Description 9', 'Kenneth'),
(15, 3, 'CS 3104', '2023-12-19', 'Meet at LRC for 30 pens', 'Francis'),
(16, 4, 'Siomai Centre', '2023-12-19', 'Description 12', 'Charles'),
(17, 2, 'Abolarium Bldg.', '2023-11-04', 'Description 13', 'Patrick'),
(18, 2, 'WTO', '2023-10-31', 'Description 14', 'David'),
(19, 2, 'USC event', '2023-08-12', 'Description 15', 'Godwin');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`) VALUES
(1, 'user1@gmail.com', 'user1', 'user1'),
(2, 'user2@gmail.com', 'user2', 'user2'),
(3, 'user3@gmail.com', 'user3', 'user3'),
(4, 'user4@gmail.com', 'user4', 'user4'),
(5, 'user5@gmail.com', 'user5', 'user5'),
(6, 'admin@gmail.com', 'admin', 'admin'),
(7, 'mary@gmail.com', 'mary1', 'mary1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_ID`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`taskID`),
  ADD KEY `Test` (`userID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `taskID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `Test` FOREIGN KEY (`userID`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
