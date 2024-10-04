-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: megacomercial
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `asesor`
--

DROP TABLE IF EXISTS `asesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asesor` (
  `id_asesor` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_asesor` varchar(60) NOT NULL,
  PRIMARY KEY (`id_asesor`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asesor`
--

LOCK TABLES `asesor` WRITE;
/*!40000 ALTER TABLE `asesor` DISABLE KEYS */;
INSERT INTO `asesor` VALUES (1,'Gustavo Pulgarin'),(2,'Santiago Quintana'),(3,'Aura Bermudez');
/*!40000 ALTER TABLE `asesor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_cliente` varchar(60) NOT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Juan Esteban Ruiz'),(2,'Sebastian Mesa'),(3,'Yeison Rafael'),(4,'Diego Montoya'),(5,'Oswaldo Bueno'),(6,'Noralba Moncayo'),(7,'Wainer Loaiza'),(8,'Esneider Castañeda'),(9,'Valeria Nuñez'),(10,'Ana Maria Galeano');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura`
--

DROP TABLE IF EXISTS `factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `factura` (
  `id_factura` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) NOT NULL,
  `id_asesor` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad_de_producto` int(11) NOT NULL,
  `forma_de_pago` varchar(13) NOT NULL,
  PRIMARY KEY (`id_factura`),
  KEY `factura_cliente` (`id_cliente`),
  KEY `factura_producto` (`id_producto`),
  KEY `factura_asesor` (`id_asesor`),
  CONSTRAINT `factura_asesor` FOREIGN KEY (`id_asesor`) REFERENCES `asesor` (`id_asesor`),
  CONSTRAINT `factura_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `factura_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura`
--

LOCK TABLES `factura` WRITE;
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
INSERT INTO `factura` VALUES (1,2,2,2,2,'Efectivo'),(2,10,2,2,1,'Efectivo'),(3,7,2,11,2,'Efectivo'),(4,2,1,15,3,'Transferencia'),(5,7,2,15,3,'Efectivo'),(6,2,3,15,4,'Transferencia'),(7,7,3,4,2,'QR'),(8,7,3,15,2,'QR'),(9,10,2,4,5,'Efectivo');
/*!40000 ALTER TABLE `factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_producto` varchar(40) NOT NULL,
  `descripcion_producto` text NOT NULL,
  `precio_unitario_producto` double NOT NULL,
  PRIMARY KEY (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Camiseta Básica Blanca','Camiseta de algodón 100% en color blanco.',13),(2,'Pantalón Vaquero Clásico','Vaquero clásico azul con corte recto.',35),(3,'Sudadera con Capucha Negra','Sudadera negra con capucha y bolsillo delantero.',26),(4,'Falda Lápiz Negra','Falda lápiz en color negro, ideal para oficina.',20),(5,'Camisa de Vestir Azul','Camisa de vestir azul claro de manga larga.',30),(6,'Vestido Floral','Vestido con estampado floral y corte en A.',40),(7,'Chaqueta de Cuero','Chaqueta de cuero sintético negro.',60),(8,'Pantalones Deportivos Grises','Pantalones deportivos grises con cordón ajustable.',23),(9,'Blusa de Encaje','Blusa de encaje blanco con detalles delicados.',25),(10,'Shorts de Mezclilla','Shorts de mezclilla azul claro, desgastados.',18),(11,'Jersey de Lana','Jersey de lana gris, ideal para el invierno.',33),(12,'Camiseta Estampada','Camiseta blanca con estampado divertido.',15),(13,'Pantalón Chino Beige','Pantalón chino en color beige con bolsillos laterales.',28),(14,'Vestido de Noche Negro','Vestido de noche largo en color negro.',50),(15,'Chaleco de Punto','Chaleco de punto en color marrón.',22);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-09 17:18:38
