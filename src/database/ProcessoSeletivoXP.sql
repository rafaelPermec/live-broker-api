DROP DATABASE IF EXISTS `ProcessoSeletivoXP`;

CREATE DATABASE `ProcessoSeletivoXP`;

CREATE TABLE `ProcessoSeletivoXP`.`Cliente`(
    `IdCliente` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Nome` VARCHAR(50) NOT NULL,
    `Email` VARCHAR(50) NOT NULL,
    `Senha` VARCHAR(50) NOT NULL,
    `IdCarteira` INT,
    `IdPortfolio` INT  
) engine = InnoDB;

CREATE TABLE `ProcessoSeletivoXP`.`Trade`(
    `IdTrade` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `TipoOperacao` ENUM('Venda', 'Compra') NOT NULL,
    `IdAtivos` INT NOT NULL,
    `QtdeAtivos` INT NOT NULL,
    `ValorOperacao` DECIMAL(13, 2) NOT NULL,
    `IdCarteira` INT NOT NULL,
    `IdPortfolio` INT NOT NULL
) engine = InnoDB;

CREATE TABLE `ProcessoSeletivoXP`.`Corretora`(
    `IdCorretora` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `IdAtivos` INT NOT NULL,
    `SiglaAtivos` VARCHAR(6) NOT NULL,
    `QtdeAtivosCorretora` INT NOT NULL
) engine = InnoDB;

CREATE TABLE `ProcessoSeletivoXP`.`Carteira`(
    `IdCarteira` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `IdCliente` INT NOT NULL,
    `Saldo` DECIMAL(13, 2) NOT NULL
) engine = InnoDB;

CREATE TABLE `ProcessoSeletivoXP`.`Financeiro`(
    `IdFinanceiro` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `TipoOperacao` ENUM('Saque', 'Deposito') NOT NULL,
    `IdCarteira` INT NOT NULL,
    `Valor` DECIMAL(13, 2) NOT NULL
) engine = InnoDB;

CREATE TABLE `ProcessoSeletivoXP`.`Portfolio`(
    `IdPortfolio` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `IdCliente` INT NOT NULL,
    `IdAtivos` INT NOT NULL,
    `SiglaAtivos` VARCHAR(6) NOT NULL,
    `QtdeAtivos` INT NOT NULL
) engine = InnoDB;

ALTER TABLE `ProcessoSeletivoXP`.`Carteira`
  ADD CONSTRAINT FK_CarteiraCliente
  FOREIGN KEY(`IdCliente`) REFERENCES `ProcessoSeletivoXP`.`Cliente`(`IdCliente`);
ALTER TABLE `ProcessoSeletivoXP`.`Portfolio` 
  ADD CONSTRAINT FK_Portfoliocliente
  FOREIGN KEY(`IdCliente`) REFERENCES `ProcessoSeletivoXP`.`Cliente`(`IdCliente`);
ALTER TABLE `ProcessoSeletivoXP`.`Cliente` 
  ADD CONSTRAINT FK_ClienteCarteira
  FOREIGN KEY(`IdCarteira`) REFERENCES `ProcessoSeletivoXP`.`Carteira`(`IdCarteira`);
ALTER TABLE `ProcessoSeletivoXP`.`Trade` 
  ADD CONSTRAINT FK_TradeCarteira
  FOREIGN KEY(`IdCarteira`) REFERENCES `ProcessoSeletivoXP`.`Carteira`(`IdCarteira`);
ALTER TABLE `ProcessoSeletivoXP`.`Trade` 
  ADD CONSTRAINT FK_TradePortfolio
  FOREIGN KEY(`IdPortfolio`) REFERENCES `ProcessoSeletivoXP`.`Portfolio`(`IdPortfolio`);
ALTER TABLE `ProcessoSeletivoXP`.`Financeiro` 
  ADD CONSTRAINT FK_FinanceiroCarteira
  FOREIGN KEY(`IdCarteira`) REFERENCES `ProcessoSeletivoXP`.`Carteira`(`IdCarteira`);
ALTER TABLE `ProcessoSeletivoXP`.`Cliente` 
  ADD CONSTRAINT FK_ClientePortfolio
  FOREIGN KEY(`IdPortfolio`) REFERENCES `ProcessoSeletivoXP`.`Portfolio`(`IdPortfolio`);

INSERT INTO `ProcessoSeletivoXP`.`Cliente`( Nome, Email, Senha)
VALUES 
('Philip K. Dick', 'ovelha@sonhando.com', 'BladeRunner'), ('William Gibson', 'monalisa@overdrive.com', 'sallywithclaws'),
('Issac Asimov', 'i@robot.com', 'naoGosteiDoWillSmith'), ('Uncle Bob', 'pattern@onetwothree.com', 'feedbackIfMyCodeClean'),
('Anthony Boudain', 'midnight@shift.com', 'cozinhaConfidencial'),

INSERT INTO `ProcessoSeletivoXP`.`Corretora`( IdAtivos, SiglaAtivos, QtdeAtivosCorretora)
VALUES 
  (252, 'CORR4', 182),(49, 'APTI4', 35),(295, 'CTNM4', 855),(354, 'EEEL4', 410),(256, 'CPFP4', 440),(133, 'BMTO4', 757),
(268, 'CREM4', 480),(144, 'BPAN4', 643),(482, 'IDVL4', 2267),(115, 'BIDI4', 3041),(246, 'CNFB4', 599),(230, 'CGRA4', 278),(163, 'BRIV4', 649),
(461, 'GRNL4', 47),(383, 'ENGI4', 690),(445, 'GETI4', 1446),(313, 'DAYC4', 809),(87, 'BBDC4', 176),(101, 'BELG4', 170),(15, 'AESL4', 19),
(436, 'GAFP4', 5005),(423, 'FIGE4', 301),(417, 'FFTL4', 206),(309, 'CZRS4', 249),(99, 'BEES4', 53),(495, 'ILLS4', 1001),(406, 'EUCA4', 814),
(139, 'BOBR4', 123);

INSERT INTO `ProcessoSeletivoXP`.`Carteira`( IdCliente, Saldo )
VALUES 
(1, 6498.80), (2, 10534.66), (3, 7777.77), (5, 12345.67), (4, 1200.00);

INSERT INTO `ProcessoSeletivoXP`.`Portfolio`( IdCliente, IdAtivos, SiglaAtivos, QtdeAtivos)
VALUES 
(1, 423, 'FIGE4', 47), (1, 406, 'EUCA4', 94), (1, 436, 'GAFP4', 489), 
(2, 252, 'CORR4', 41), (2, 101, 'BELG4', 546), (2, 139, 'BOBR4', 45), (2, 115, 'DAYC4', 616),
(3, 445, 'GETI4', 98), (3, 295, 'CTNM4', 46), (3, 406, 'EUCA4', 74), (3, 423, 'FIGE4', 484), (3, 436, 'GAFP4', 849),
(4, 49, 'APTI4', 615), (4, 15, 'AESL4', 164), (4, 417, 'FFTL4', 321),
(5, 482, 'IDVL4', 156), (5, 230, 'CGRA4', 96), (5, 461, 'GRNL4', 156), (5, 445, 'GETI4', 48), (5, 423, 'FIGE4', 4489),

INSERT INTO `ProcessoSeletivoXP`.`Cliente`(IdCarteira, IdPortfolio)
VALUES (1, 3), (2, 4), (3, 1), (5, 2), (4, 5);

INSERT INTO `ProcessoSeletivoXP`.`Trade`( TipoOperacao, IdAtivos, QtdeAtivos, ValorOperacao, IdCarteira, IdPortfolio)
VALUES 
()



INSERT INTO `ProcessoSeletivoXP`.`Financeiro`( TipoOperacao, IdCarteira, Valor)
VALUES 
()
