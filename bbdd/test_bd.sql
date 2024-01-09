-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.11-MariaDB - mariadb.org binary distribution
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
	(5, 'co');
/*!40000 ALTER TABLE `contaminante` ENABLE KEYS */;

-- Volcando estructura para tabla bbdd_cleanbajoqueta.medicion
CREATE TABLE IF NOT EXISTS `medicion` (
  `idMedicion` int(11) NOT NULL AUTO_INCREMENT,
  `idContaminante` int(11) DEFAULT NULL,
  `instante` timestamp NULL DEFAULT NULL,
  `valor` float DEFAULT NULL,
  `latitud` float DEFAULT 0,
  `longitud` float DEFAULT 0,
  `temperatura` float DEFAULT NULL,
  PRIMARY KEY (`idMedicion`),
  KEY `medicion_contaminante` (`idContaminante`),
  CONSTRAINT `medicion_contaminante` FOREIGN KEY (`idContaminante`) REFERENCES `contaminante` (`idContaminante`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=601 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla bbdd_cleanbajoqueta.medicion: ~0 rows (aproximadamente)
DELETE FROM `medicion`;
/*!40000 ALTER TABLE `medicion` DISABLE KEYS */;
/*!40000 ALTER TABLE `medicion` ENABLE KEYS */;

-- Volcando estructura para tabla bbdd_cleanbajoqueta.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `idRol` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `funcion` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idRol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla bbdd_cleanbajoqueta.roles: ~2 rows (aproximadamente)
DELETE FROM `roles`;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` (`idRol`, `nombre`, `funcion`) VALUES
	(1, 'admin', 'Administrador de la app y la web'),
	(2, 'user', 'Usuario registrado medio');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

-- Volcando estructura para tabla bbdd_cleanbajoqueta.sonda
CREATE TABLE IF NOT EXISTS `sonda` (
  `idSonda` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idSonda`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

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

-- Volcando datos para la tabla bbdd_cleanbajoqueta.sondamedicion: ~0 rows (aproximadamente)
DELETE FROM `sondamedicion`;
/*!40000 ALTER TABLE `sondamedicion` DISABLE KEYS */;
/*!40000 ALTER TABLE `sondamedicion` ENABLE KEYS */;

-- Volcando estructura para tabla bbdd_cleanbajoqueta.telefono
CREATE TABLE IF NOT EXISTS `telefono` (
  `email` varchar(50) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  PRIMARY KEY (`email`,`telefono`),
  CONSTRAINT `usuario_telefono` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla bbdd_cleanbajoqueta.telefono: ~3 rows (aproximadamente)
DELETE FROM `telefono`;
/*!40000 ALTER TABLE `telefono` DISABLE KEYS */;
INSERT INTO `telefono` (`email`, `telefono`) VALUES
	('testMediciones@email.com', '123456789');
/*!40000 ALTER TABLE `telefono` ENABLE KEYS */;

-- Volcando estructura para tabla bbdd_cleanbajoqueta.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `email` varchar(50) NOT NULL,
  `contraseña` varchar(50) NOT NULL,
  `rol` int(11) NOT NULL DEFAULT 2,
  `nombreApellido` varchar(50) NOT NULL DEFAULT 'John Doe',
  `imagen` longblob NULL,
  `verificado` enum('0','1') NOT NULL DEFAULT '0',
  `token` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`email`),
  KEY `usuario_rol` (`rol`),
  CONSTRAINT `usuario_rol` FOREIGN KEY (`rol`) REFERENCES `roles` (`idRol`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla bbdd_cleanbajoqueta.usuario: ~3 rows (aproximadamente)
DELETE FROM `usuario`;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`email`, `contraseña`, `rol`, `nombreApellido`, `imagen`, `verificado`, `token`) VALUES
	('testMediciones@email.com', 'esternocleidomastoideo', 1, 'Jhon Doe', _binary 0x2f396a2f34414151536b5a4a5267414241514141415141424141442f3277434541416b4742784953456855514542495644525550454138584652635644785550465259584678555746685559474255594853676747426f6c48525556495445684a536b744c6934754678387a4f444d744e7967744c69734243676f4b42515546446755464469735a45786b724b7973724b7973724b7973724b7973724b7973724b7973724b7973724b7973724b7973724b7973724b7973724b7973724b7973724b7973724b7973724b7973724b2f2f4141424549414f454134514d4249674143455145444551482f7841415a41414541417745424141414141414141414141414141414141514d454167662f7841417645414142415155494167454541674d424141414141414141415246525958487741674d6851594768736345783451525367704878496b4953457a4c522f38514146414542414141414141414141414141414141414141414141502f454142515241514141414141414141414141414141414141414141442f3267414d41774541416845444551412f4150626357783249775a4463594d675469324f7744467364694d6f646a426b4363577836416339455a513748485a505051446e4f5248475578786c4d6e6e4f51446e4d6a6a49635a4264383341547a6d52786b567266575a733848432f496835413063356b55686d572b57544350384162616635676747716c46495a66397176384570664c2b5941615837683233736f532f656e6737532b53546649466a392f51647437434c343239682b2f6f412f66304862657737623248372b6744392f516474374474765966763641503339423233734f3239682b2f6f412f66304862423277667542312f4b414f5034784148574c5937455961626a4454636e46736467484f7848485934334a35324163394563646a6a636e6e59427a6e4935565552495a544f4c7939524d45784b4656565636675732723933354b577173533278635a72735857624c4d457765426e733343794c4575457a56726443336a49633567634a64493778354a2f7752795177354f754d69615830427a2f41494935493463484b33566c336e78374f3654324b5830425574776b6d65546931634c6c69335130556e7355766f4448696b43327a6676785a344c315431374b626477374c7a36417473326b5878715337623259385556786664337a38472b596757763339423233734f3239682b2f6f42532b6737623248626578532b67464c3644747659647437464c3641362f6c41484838596744726e596a6a635961626b3837414f64694f4e787875547a734135324d393765354a344639655a4a344f6271376249434c75375654525973496c596e534a684449633567547a6d52786b4f4d687a6d42504f5a484752467130694a444a356d7433717241445461746f6e6c63637a6a2f645a2f486a417a4144542f414c302f506e416c4c3148794d6f413230766f556e737a33643878474c697a77573262314667397563674f3658304b54324b53457853786b42467179337a72364d3935644d78386f74596d6d6b684d55735a415a3771395a67766854513762325a3736365a696e68646863336a4d46384b426f706651705059704954464c4751436c39436b39696b684d55766f4472463645484f446c4148584f784844737877374d6e6c2b51446e597176726245596d5a32716f6951334d747056565971424e31596170715245307951357357574a54576e584f77446e59635a446763674f6379465645527552504752563869316c6d766b436d33616172564f514141414141414141414c37693879576f46314a435a6a525759754e694c376a494253786b4b53457853516d4b574d67464c47526d7672746d4f536d6d6b684d69306a6534794171754c65564b58556b4a6d525556466b61624670714e2f4948564c4751704954464a4359705979416e4636413577637049453876794934646d4f485a6a6c3446507962575835492b50597a58517158465a7161374e6c6d435a5a676463764934634f48446c34446c34344844687938427a6d5a7235635a476e68786b76504b7a41354141414141414141414141313358684e6f47513158502f504d514f36574d6853516d4b53457853786b41705979464a4359704954464c475146562f596269377a45342b506178592f6b304c2b6f544d6c717978574f413130735a436b684d69797255526678416d6c69424f4c30427a673553514a35666b5658362f786333497334646d55664a58786d427a38657a6a4930384f4b766a706733793153336c344538764934634f48446c34446c3434634f48446c34446c377a4a6565566d613659347933796679584d44674141414141414141414144586470676b73494751326f6e754d67464c4751704954464a43597059794155735a436b684d556b4a696c6a494253786b556649732b464c36534579752f544357344566485842554c6153457a503864636444525378416e4636413577637049453634764d742b754c734454706f5a62372f70632f48414639796d435a524f2b48484e3334535359646e644e36416a6c3434634b594b623041706f706a68544852464e66414254586d572b58467871706a6a4a652b566d4279414141414141414141414a737269624b5342694e744c45425378464a41556b4253784155735a436b674b53417059674b574a46744d4e465a416d6b674b57494753365846445853514d6c6a796b304e644c454363667151455966536f4161366d572b38726c2b6a56706f5a72394d582b414e46333453535939453661646e46797638557a683264363639414b62304b5a324b5a324b623041707234436d4f694b593649707234414b6138707637764e50773475706a6854586759676433746c69754f41414141414141416457456172414f376d37626a6b6d356f7151715171594370696b674b6b4b6d417059696b674b6b4b6d41715971517152467063466b756f47537835536147797047533654464a6d757067546a3953416a443656414458556f2b536e6a49763030374b2f6b4a67396d59456647584232506b743030374d2f77416531697a793030613639414e646568544f78544f785458774155313842544852464d644555313841464e6641557877706a6f696d76417276374c5561374e356d4e744d635a4c327978574163674141414142663841487335306b536d796d4f70735247594a2b77465446534653465441564d56495649564d42557855685568557746544f4c35634b774f366b55664a74654570514f62684d5a4961616b552f47545064786455774a2b346766614147757651564961646a54547361363941592f43795532497636374b506b57632f4453666a3273764665414c74646568544852476d6e59707234414b612b41706a6f696d4f694b612b41436d76674b59345578305254587741553138444e662b586544545448524d74367256584d446741414141424e6a796b304e6c534d614b6245576e674b6d4b6b4b6b4b6d4171597151715171594370697043704370674b6d5a4c647071744c372b30784750324b726979315a41614c466c694d7053616b4b6b4b6d4250334544375141313136476d6e59303037477576514557374c555a755a4d555752733030374b722b786e355a6d3843797861626a7630545448524d3131654d6968703131664142545877464d6445557830537133664f786942625458774f62563469662b4f4d317132712b546b437933664b734f564b77414141414141416433643471524f4142717333714c4473377152694f724e7055384161366d4b6b55324c392f364c6b576e674b6d46576e437047652b7647344a2b774f4c6470716d6d37734d5373437134735a306b532b70674b6d4b6b4b6b4b6d412b3444375141313136476d6e59303037477576514458586f6161646a545473613639415a3736375a696d4b43367657594c69686f3030374d3937644d785446414f626434716e414141414141414141414141414141414141413673573154776367433238766d6f784d48784975727473686458625a476c4570344370697043704370674b6d4b6b4b6b4b6d412b3444375141313136476d6e59303037477576514458586f6161646a545473613639414e646568706f3649303037464e6641436d387558667370564e445a54485249745745587a2b514d594c62567775574d4d796f414141414141414141414141425a5975565741465a6464334c2f7742544c6246326956344f716d4171597151715171594370697043704370674b6d4b6b4b6b4b6d412b34452f615141313136476d67303047756f4458586f6161646a545473613639414b62304b593649303037464e364155313842544852464d644555313841464e664168624c664b614f4a706a6f696d7641715734544a57484333437a4e464d644555313447566274584566344b35667761365934564d44482f69726c2f42306c32726a56556855774d79584b794c45754834767959573149564d434c4e6c453866736d7043704370674b6d4b6b4b6b4b6d4171597151715171594370697043704370674b6d4b6b4b6b4b6d412b34452f615142312f6251342f72714142332f4147304f5036366741643536484753544141367a57527a6b6b7951424f61794f636b6d53414a7a57527a6b6b7951424f61794979535941453572496a4a4a674154395569485441416e367045665341412b6f665341412b6f665341412b6f6e365341412b6f6e365a454143304141662f32513d3d, '1', NULL);
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

-- Volcando datos para la tabla bbdd_cleanbajoqueta.usuariomedicion: ~0 rows (aproximadamente)
DELETE FROM `usuariomedicion`;
/*!40000 ALTER TABLE `usuariomedicion` DISABLE KEYS */;
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

-- Volcando datos para la tabla bbdd_cleanbajoqueta.usuariosonda: ~0 rows (aproximadamente)
DELETE FROM `usuariosonda`;
/*!40000 ALTER TABLE `usuariosonda` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuariosonda` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
