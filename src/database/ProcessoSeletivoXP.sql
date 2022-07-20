DROP DATABASE IF EXISTS `ProcessoSeletivoXP`;

CREATE DATABASE `ProcessoSeletivoXP`;

CREATE TABLE `ProcessoSeletivoXP`.`Cliente`(
    `IdCliente` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Nome` VARCHAR(50) NOT NULL,
    `Email` VARCHAR(50) NOT NULL,
    `Senha` VARCHAR(50) NOT NULL,
    `IdCarteira` INT NOT NULL
    `IdPortfolio` INT NOT NULL,
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
    `SiglaAtivos` VARCHAR(50) NOT NULL,
    `QtdeAtivosCorretora` INT NOT NULL
) engine = InnoDB;

CREATE TABLE `ProcessoSeletivoXP`.`Carteira`(
    `IdCarteira` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `IdCliente` INT NOT NULL,
    `Saldo` DECIMAL(13, 2) NOT NULL,
    `SaldoTotalAtivos` DECIMAL(13, 2) NOT NULL
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

INSERT INTO `ProcessoSeletivoXP`.`Corretora`( IdAtivos, QtdeAtivosCorretora)
VALUES 
()

INSERT INTO `ProcessoSeletivoXP`.`Corretora`( IdAtivos, QtdeAtivosCorretora)
VALUES 
()

INSERT INTO `ProcessoSeletivoXP`.`Corretora`( IdAtivos, QtdeAtivosCorretora)
VALUES 
()

INSERT INTO `ProcessoSeletivoXP`.`Corretora`( IdAtivos, QtdeAtivosCorretora)
VALUES 
()

INSERT INTO `ProcessoSeletivoXP`.`Corretora`( IdAtivos, QtdeAtivosCorretora)
VALUES 
()

INSERT INTO `ProcessoSeletivoXP`.`Corretora`( IdAtivos, QtdeAtivosCorretora)
VALUES 
()