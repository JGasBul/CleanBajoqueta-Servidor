-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.24-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para bbdd_cleanbajoqueta
CREATE DATABASE IF NOT EXISTS `bbdd_cleanbajoqueta` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `bbdd_cleanbajoqueta`;

-- Volcando estructura para tabla bbdd_cleanbajoqueta.contaminante
CREATE TABLE IF NOT EXISTS `contaminante` (
  `idContaminante` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idContaminante`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla bbdd_cleanbajoqueta.contaminante: ~3 rows (aproximadamente)
DELETE FROM `contaminante`;
/*!40000 ALTER TABLE `contaminante` DISABLE KEYS */;
INSERT INTO `contaminante` (`idContaminante`, `nombre`) VALUES
	(4, 'Ozono'),
	(5, 'Ozofasdfsasdfno'),
	(6, '3545345345');
/*!40000 ALTER TABLE `contaminante` ENABLE KEYS */;

-- Volcando estructura para tabla bbdd_cleanbajoqueta.medicion
CREATE TABLE IF NOT EXISTS `medicion` (
  `idMedicion` int(11) NOT NULL AUTO_INCREMENT,
  `idContaminante` int(11) DEFAULT NULL,
  `instante` TIMESTAMP NULL DEFAULT NULL,
  `valor` float DEFAULT NULL,
  `latitud` float DEFAULT 0,
  `longitud` float DEFAULT 0,
  `temperatura` float DEFAULT NULL,
  PRIMARY KEY (`idMedicion`),
  KEY `medicion_contaminante` (`idContaminante`),
  CONSTRAINT `medicion_contaminante` FOREIGN KEY (`idContaminante`) REFERENCES `contaminante` (`idContaminante`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla bbdd_cleanbajoqueta.medicion: ~21 rows (aproximadamente)
DELETE FROM `medicion`;
/*!40000 ALTER TABLE `medicion` DISABLE KEYS */;
INSERT INTO `medicion` (`idMedicion`, `idContaminante`, `instante`, `valor`, `latitud`, `longitud`, `temperatura`) VALUES
	(22, 4, '24/08/2023', 123, 4, 3, 20),
	(23, 4, '24/08/2023', 123, 4, 3, 20),
	(24, 4, '24/08/2023', 123, 4, 3, 20),
	(25, 4, '24/08/2023', 123, 4, 3, 20),
	(26, 4, '24/08/2023', 123, 4, 3, 20),
	(27, 4, '24/08/2023', 123, 4, 3, 20),
	(28, 4, '24/08/2023', 123, 4, 3, 20),
	(29, 4, '24/08/2023', 123, 4, 3, 20),
	(30, 4, '24/08/2023', 123, 4, 3, 20),
	(31, 4, '24/08/2023', 123, 4, 3, 20),
	(32, 4, '24/08/2023', 123, 4, 3, 20),
	(33, 4, '24/08/2023', 123, 4, 3, 20),
	(34, 4, '24/08/2023', 123, 4, 3, 20),
	(35, 4, '24/08/2023', 123, 4, 3, 20),
	(36, 4, '24/08/2023', 123, 4, 3, 20),
	(37, 4, '24/08/2023', 123, 4, 3, 20),
	(38, 4, '24/08/2023', 123, 4, 3, 20),
	(39, 4, '24/08/2023', 123, 4, 3, 20),
	(40, 4, '24/08/2023', 123, 4, 3, 20),
	(41, 4, '24/08/2023', 123, 4, 3, 20),
	(42, 4, '24/08/2023', 123, 4, 3, 20);
/*!40000 ALTER TABLE `medicion` ENABLE KEYS */;

-- Volcando estructura para tabla bbdd_cleanbajoqueta.sonda
CREATE TABLE IF NOT EXISTS `sonda` (
  `idSonda` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idSonda`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla bbdd_cleanbajoqueta.sonda: ~1 rows (aproximadamente)
DELETE FROM `sonda`;
/*!40000 ALTER TABLE `sonda` DISABLE KEYS */;
INSERT INTO `sonda` (`idSonda`) VALUES
	(1);
/*!40000 ALTER TABLE `sonda` ENABLE KEYS */;

-- Volcando estructura para tabla bbdd_cleanbajoqueta.sondamedicion
CREATE TABLE IF NOT EXISTS `sondamedicion` (
  `idSonda` int(11) NOT NULL,
  `idMedicion` int(11) NOT NULL,
  PRIMARY KEY (`idSonda`,`idMedicion`) USING BTREE,
  KEY `medicion_sonda` (`idMedicion`),
  CONSTRAINT `medicion_sonda` FOREIGN KEY (`idMedicion`) REFERENCES `medicion` (`idMedicion`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sonda_medicion` FOREIGN KEY (`idSonda`) REFERENCES `sonda` (`idSonda`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla bbdd_cleanbajoqueta.sondamedicion: ~16 rows (aproximadamente)
DELETE FROM `sondamedicion`;
/*!40000 ALTER TABLE `sondamedicion` DISABLE KEYS */;
INSERT INTO `sondamedicion` (`idSonda`, `idMedicion`) VALUES
	(1, 27),
	(1, 28),
	(1, 29),
	(1, 30),
	(1, 31),
	(1, 32),
	(1, 33),
	(1, 34),
	(1, 35),
	(1, 36),
	(1, 37),
	(1, 38),
	(1, 39),
	(1, 40),
	(1, 41),
	(1, 42);
/*!40000 ALTER TABLE `sondamedicion` ENABLE KEYS */;

-- Volcando estructura para tabla bbdd_cleanbajoqueta.telefono
CREATE TABLE IF NOT EXISTS `telefono` (
  `email` varchar(50) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  PRIMARY KEY (`email`,`telefono`),
  CONSTRAINT `usuario_telefono` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla bbdd_cleanbajoqueta.telefono: ~1 rows (aproximadamente)
DELETE FROM `telefono`;
/*!40000 ALTER TABLE `telefono` DISABLE KEYS */;
INSERT INTO `telefono` (`email`, `telefono`) VALUES
	('testMediciones@email.com', '123456789');
/*!40000 ALTER TABLE `telefono` ENABLE KEYS */;

-- Volcando estructura para tabla bbdd_cleanbajoqueta.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `email` varchar(50) NOT NULL,
  `contraseña` varchar(50) NOT NULL,
  `nombreApellido` varchar(50) NOT NULL DEFAULT 'John Doe',
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla bbdd_cleanbajoqueta.usuario: ~1 rows (aproximadamente)
DELETE FROM `usuario`;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`email`, `contraseña`, `nombreApellido`) VALUES
	('testMediciones@email.com', 'esternocleidomastoideo', 'Jhon Doe');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

-- Volcando estructura para tabla bbdd_cleanbajoqueta.usuariomedicion
CREATE TABLE IF NOT EXISTS `usuariomedicion` (
  `email` varchar(50) NOT NULL,
  `idMedicion` int(11) NOT NULL,
  PRIMARY KEY (`email`,`idMedicion`),
  KEY `medicion_usuario` (`idMedicion`),
  CONSTRAINT `medicion_usuario` FOREIGN KEY (`idMedicion`) REFERENCES `medicion` (`idMedicion`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usuario_medicion` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla bbdd_cleanbajoqueta.usuariomedicion: ~12 rows (aproximadamente)
DELETE FROM `usuariomedicion`;
/*!40000 ALTER TABLE `usuariomedicion` DISABLE KEYS */;
INSERT INTO `usuariomedicion` (`email`, `idMedicion`) VALUES
	('testMediciones@email.com', 31),
	('testMediciones@email.com', 32),
	('testMediciones@email.com', 33),
	('testMediciones@email.com', 34),
	('testMediciones@email.com', 35),
	('testMediciones@email.com', 36),
	('testMediciones@email.com', 37),
	('testMediciones@email.com', 38),
	('testMediciones@email.com', 39),
	('testMediciones@email.com', 40),
	('testMediciones@email.com', 41),
	('testMediciones@email.com', 42);
/*!40000 ALTER TABLE `usuariomedicion` ENABLE KEYS */;

-- Volcando estructura para tabla bbdd_cleanbajoqueta.usuariosonda
CREATE TABLE IF NOT EXISTS `usuariosonda` (
  `email` varchar(50) NOT NULL,
  `idSonda` int(11) NOT NULL,
  PRIMARY KEY (`email`,`idSonda`),
  KEY `sonda` (`idSonda`),
  CONSTRAINT `sonda` FOREIGN KEY (`idSonda`) REFERENCES `sonda` (`idSonda`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usuario` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla bbdd_cleanbajoqueta.usuariosonda: ~1 rows (aproximadamente)
DELETE FROM `usuariosonda`;
/*!40000 ALTER TABLE `usuariosonda` DISABLE KEYS */;
INSERT INTO `usuariosonda` (`email`, `idSonda`) VALUES
	('testMediciones@email.com', 1);
/*!40000 ALTER TABLE `usuariosonda` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
