-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 22-Fev-2018 às 14:49
-- Versão do servidor: 10.1.13-MariaDB
-- PHP Version: 7.0.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pong_21`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `historico_jogo`
--

CREATE TABLE `historico_jogo` (
  `id_historico_jogo` int(11) NOT NULL,
  `sequencia_historico_jogo` int(11) NOT NULL,
  `placar_historico_jogo` varchar(200) NOT NULL,
  `jogos_id` int(11) NOT NULL,
  `data_atualizacao_historico_jogo` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_historico_jogo` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `historico_jogo`
--

INSERT INTO `historico_jogo` (`id_historico_jogo`, `sequencia_historico_jogo`, `placar_historico_jogo`, `jogos_id`, `data_atualizacao_historico_jogo`, `usuario_id`, `bool_ativo_historico_jogo`) VALUES
(1, 1, '1-0', 1, '2018-02-22 10:10:45', 1, 1),
(2, 2, '2-0', 1, '2018-02-22 10:10:52', 1, 1),
(3, 3, '2-1', 1, '2018-02-22 10:11:04', 1, 1),
(4, 4, '2-2', 1, '2018-02-22 10:11:19', 1, 1),
(5, 5, '2-3', 1, '2018-02-22 10:11:34', 1, 1),
(6, 6, '3-3', 1, '2018-02-22 10:11:40', 1, 1),
(7, 7, '4-3', 1, '2018-02-22 10:11:47', 1, 1),
(8, 8, '5-3', 1, '2018-02-22 10:11:52', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `jogadores`
--

CREATE TABLE `jogadores` (
  `id_jogadores` int(11) NOT NULL,
  `nome_jogadores` varchar(200) NOT NULL,
  `foto_jogadores` varchar(200) DEFAULT NULL,
  `telefone_jogadores` varchar(200) NOT NULL,
  `data_atualizacao_jogadores` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_jogadores` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `jogadores`
--

INSERT INTO `jogadores` (`id_jogadores`, `nome_jogadores`, `foto_jogadores`, `telefone_jogadores`, `data_atualizacao_jogadores`, `usuario_id`, `bool_ativo_jogadores`) VALUES
(1, 'Jack Biller da Silva Prado', '', '35 99723-1080', '2018-02-22 10:09:55', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `jogos`
--

CREATE TABLE `jogos` (
  `id_jogos` int(11) NOT NULL,
  `descricao_jogos` varchar(200) NOT NULL,
  `jogador_1_jogos` int(11) NOT NULL,
  `jogador_2_jogos` int(11) NOT NULL,
  `resultado_jogos` varchar(200) NOT NULL,
  `data_atualizacao_jogos` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_jogos` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `jogos`
--

INSERT INTO `jogos` (`id_jogos`, `descricao_jogos`, `jogador_1_jogos`, `jogador_2_jogos`, `resultado_jogos`, `data_atualizacao_jogos`, `usuario_id`, `bool_ativo_jogos`) VALUES
(1, 'teset', 1, 2, '5-3', '2018-02-22 10:10:30', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `jogo_atual`
--

CREATE TABLE `jogo_atual` (
  `id_jogo_atual` int(11) NOT NULL,
  `resultado_jogo_atual` enum('jog_1','jog_2') NOT NULL,
  `data_atualizacao_jogo_atual` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_jogo_atual` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `jogo_atual`
--

INSERT INTO `jogo_atual` (`id_jogo_atual`, `resultado_jogo_atual`, `data_atualizacao_jogo_atual`, `usuario_id`, `bool_ativo_jogo_atual`) VALUES
(1, 'jog_2', '2018-02-22 10:15:31', 1, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `nivel_acesso`
--

CREATE TABLE `nivel_acesso` (
  `id_nivel_acesso` int(11) NOT NULL,
  `descricao_nivel_acesso` varchar(200) NOT NULL,
  `area_nivel_acesso` text NOT NULL,
  `data_atualizacao_nivel_acesso` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_nivel_acesso` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `nivel_acesso`
--

INSERT INTO `nivel_acesso` (`id_nivel_acesso`, `descricao_nivel_acesso`, `area_nivel_acesso`, `data_atualizacao_nivel_acesso`, `usuario_id`, `bool_ativo_nivel_acesso`) VALUES
(1, 'Nivel Administrador', 'jogadores+jogo_atual+jogos+historico_jogo-jogos+upload+mapa+mov+pdf+notif+usuario', '2018-02-22 10:05:09', 1, 1),
(2, 'Nível 2', 'jogadores+jogo_atual+jogos+historico_jogo-jogos+upload+mov+pdf+notif+usuario', '2018-02-22 10:20:39', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `notificacoes`
--

CREATE TABLE `notificacoes` (
  `id_notificacoes` int(11) NOT NULL,
  `descricao_notificacoes` text NOT NULL,
  `usuario_atuador_notificacoes` varchar(200) NOT NULL,
  `usuaio_requerente_notificacoes` varchar(200) NOT NULL,
  `tipo_alteracao_notificacoes` enum('i','u','d') NOT NULL,
  `notificacoes_config_id` int(200) NOT NULL,
  `bool_view_notificacoes` int(1) NOT NULL,
  `data_atualizacao_notificacoes` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `bool_ativo_notificacoes` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `notificacoes_config`
--

CREATE TABLE `notificacoes_config` (
  `id_notificacoes_config` int(11) NOT NULL,
  `area_notificacoes_config` varchar(200) NOT NULL,
  `tipo_alteracao_notificacoes_config` enum('insert','update','delete') NOT NULL,
  `data_atualizacao_notificacoes_config` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_notificacoes_config` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `notificacoes_pendentes`
--

CREATE TABLE `notificacoes_pendentes` (
  `id_notificacoes_pendentes` int(11) NOT NULL,
  `descricao_notificacoes_pendentes` text NOT NULL,
  `usuario_atuador_notificacoes_pendentes` varchar(200) NOT NULL,
  `usuaio_requerente_notificacoes_pendentes` varchar(200) NOT NULL,
  `tipo_alteracao_notificacoes_pendentes` enum('i','u','d') NOT NULL,
  `notificacoes_config_id` int(200) NOT NULL,
  `data_atualizacao_notificacoes_pendentes` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `bool_ativo_notificacoes_pendentes` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `notificacoes_salvas`
--

CREATE TABLE `notificacoes_salvas` (
  `id_notificacoes_salvas` int(11) NOT NULL,
  `descricao_notificacoes_salvas` text NOT NULL,
  `usuario_atuador_notificacoes_salvas` varchar(200) NOT NULL,
  `usuaio_requerente_notificacoes_salvas` varchar(200) NOT NULL,
  `tipo_alteracao_notificacoes_config` varchar(50) NOT NULL,
  `notificacoes_config_id` int(200) NOT NULL,
  `data_atualizacao_notificacoes_salvas` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `bool_ativo_notificacoes_salvas` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `relatorios`
--

CREATE TABLE `relatorios` (
  `id_relatorios` int(11) NOT NULL,
  `descricao_relatorios` varchar(200) NOT NULL,
  `tabela_relatorios` varchar(200) NOT NULL,
  `colunas_relatorios` text NOT NULL,
  `colunas_estrangeiras_relatorios` text NOT NULL,
  `colunas_filtro_relatorios` text,
  `bool_filtro_ativo_relatorios` int(1) NOT NULL DEFAULT '1',
  `data_atualizacao_relatorios` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_emitir_relatorios` int(1) NOT NULL DEFAULT '0',
  `bool_ativo_relatorios` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `relatorio_tabela`
--

CREATE TABLE `relatorio_tabela` (
  `id_relatorio_tabela` int(11) NOT NULL,
  `descricao_relatorio_tabela` varchar(200) NOT NULL,
  `data_atualizacao_relatorio_tabela` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `bool_ativo_relatorio_tabela` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `relatorio_tabela`
--

INSERT INTO `relatorio_tabela` (`id_relatorio_tabela`, `descricao_relatorio_tabela`, `data_atualizacao_relatorio_tabela`, `bool_ativo_relatorio_tabela`) VALUES
(1, 'historico_jogo', '2018-02-22 10:05:25', 1),
(2, 'jogadores', '2018-02-22 10:05:25', 1),
(3, 'jogo_atual', '2018-02-22 10:05:25', 1),
(4, 'jogos', '2018-02-22 10:05:25', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `upload_arq`
--

CREATE TABLE `upload_arq` (
  `id_upload_arq` int(11) NOT NULL,
  `descricao_upload_arq` varchar(100) NOT NULL,
  `tipo_upload_arq` varchar(100) NOT NULL,
  `data_atualizacaoupload_arq` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `bool_ativo_upload_arq` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nome_usuario` varchar(200) DEFAULT NULL,
  `login_usuario` char(3) DEFAULT NULL,
  `senha_usuario` varchar(100) DEFAULT NULL,
  `nivel_acesso_id` int(11) NOT NULL DEFAULT '1',
  `bool_ativo_usuario` int(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nome_usuario`, `login_usuario`, `senha_usuario`, `nivel_acesso_id`, `bool_ativo_usuario`) VALUES
(1, 'ADMINISTRADOR', 'ADM', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 1, 1),
(2, 'SITE', 'SIT', '*C737C0A2F678ACBE092353610475CC003320E65E', 1, 1),
(3, 'CONSOLE', 'CON', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 2, 1),
(4, 'APLICAÇÃO', 'APL', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 2, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `historico_jogo`
--
ALTER TABLE `historico_jogo`
  ADD PRIMARY KEY (`id_historico_jogo`),
  ADD KEY `fk_historico_jogo<>usuario` (`usuario_id`),
  ADD KEY `fk_historico_jogo<>jogos` (`jogos_id`);

--
-- Indexes for table `jogadores`
--
ALTER TABLE `jogadores`
  ADD PRIMARY KEY (`id_jogadores`),
  ADD KEY `fk_jogadores<>usuario` (`usuario_id`);

--
-- Indexes for table `jogos`
--
ALTER TABLE `jogos`
  ADD PRIMARY KEY (`id_jogos`),
  ADD KEY `fk_jogos<>usuario` (`usuario_id`);

--
-- Indexes for table `jogo_atual`
--
ALTER TABLE `jogo_atual`
  ADD PRIMARY KEY (`id_jogo_atual`),
  ADD KEY `fk_jogo_atual<>usuario` (`usuario_id`);

--
-- Indexes for table `nivel_acesso`
--
ALTER TABLE `nivel_acesso`
  ADD PRIMARY KEY (`id_nivel_acesso`),
  ADD KEY `fk_nivel_acesso<>usuario` (`usuario_id`);

--
-- Indexes for table `notificacoes`
--
ALTER TABLE `notificacoes`
  ADD PRIMARY KEY (`id_notificacoes`),
  ADD KEY `fk_notificacoes<>notificacoes_config` (`notificacoes_config_id`);

--
-- Indexes for table `notificacoes_config`
--
ALTER TABLE `notificacoes_config`
  ADD PRIMARY KEY (`id_notificacoes_config`),
  ADD KEY `fk_notificacoes_config<>usuario` (`usuario_id`);

--
-- Indexes for table `notificacoes_pendentes`
--
ALTER TABLE `notificacoes_pendentes`
  ADD PRIMARY KEY (`id_notificacoes_pendentes`),
  ADD KEY `fk_notificacoes_pendentes<>notificacoes_config` (`notificacoes_config_id`);

--
-- Indexes for table `notificacoes_salvas`
--
ALTER TABLE `notificacoes_salvas`
  ADD PRIMARY KEY (`id_notificacoes_salvas`),
  ADD KEY `fk_notificacoes_salvas<>notificacoes_config` (`notificacoes_config_id`);

--
-- Indexes for table `relatorios`
--
ALTER TABLE `relatorios`
  ADD PRIMARY KEY (`id_relatorios`);

--
-- Indexes for table `relatorio_tabela`
--
ALTER TABLE `relatorio_tabela`
  ADD PRIMARY KEY (`id_relatorio_tabela`);

--
-- Indexes for table `upload_arq`
--
ALTER TABLE `upload_arq`
  ADD PRIMARY KEY (`id_upload_arq`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `Login` (`login_usuario`),
  ADD KEY `fk_usuario<>nivel_acesso` (`nivel_acesso_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `historico_jogo`
--
ALTER TABLE `historico_jogo`
  MODIFY `id_historico_jogo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `jogadores`
--
ALTER TABLE `jogadores`
  MODIFY `id_jogadores` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `jogos`
--
ALTER TABLE `jogos`
  MODIFY `id_jogos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `jogo_atual`
--
ALTER TABLE `jogo_atual`
  MODIFY `id_jogo_atual` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `nivel_acesso`
--
ALTER TABLE `nivel_acesso`
  MODIFY `id_nivel_acesso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `notificacoes`
--
ALTER TABLE `notificacoes`
  MODIFY `id_notificacoes` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `notificacoes_config`
--
ALTER TABLE `notificacoes_config`
  MODIFY `id_notificacoes_config` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `notificacoes_pendentes`
--
ALTER TABLE `notificacoes_pendentes`
  MODIFY `id_notificacoes_pendentes` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `notificacoes_salvas`
--
ALTER TABLE `notificacoes_salvas`
  MODIFY `id_notificacoes_salvas` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `relatorios`
--
ALTER TABLE `relatorios`
  MODIFY `id_relatorios` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `relatorio_tabela`
--
ALTER TABLE `relatorio_tabela`
  MODIFY `id_relatorio_tabela` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `upload_arq`
--
ALTER TABLE `upload_arq`
  MODIFY `id_upload_arq` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `historico_jogo`
--
ALTER TABLE `historico_jogo`
  ADD CONSTRAINT `fk_historico_jogo<>jogos` FOREIGN KEY (`jogos_id`) REFERENCES `jogos` (`id_jogos`),
  ADD CONSTRAINT `fk_historico_jogo<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `jogadores`
--
ALTER TABLE `jogadores`
  ADD CONSTRAINT `fk_jogadores<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `jogos`
--
ALTER TABLE `jogos`
  ADD CONSTRAINT `fk_jogos<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `jogo_atual`
--
ALTER TABLE `jogo_atual`
  ADD CONSTRAINT `fk_jogo_atual<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `nivel_acesso`
--
ALTER TABLE `nivel_acesso`
  ADD CONSTRAINT `fk_nivel_acesso<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `notificacoes`
--
ALTER TABLE `notificacoes`
  ADD CONSTRAINT `fk_notificacoes<>notificacoes_config` FOREIGN KEY (`notificacoes_config_id`) REFERENCES `notificacoes_config` (`id_notificacoes_config`);

--
-- Limitadores para a tabela `notificacoes_config`
--
ALTER TABLE `notificacoes_config`
  ADD CONSTRAINT `fk_notificacoes_config<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `notificacoes_pendentes`
--
ALTER TABLE `notificacoes_pendentes`
  ADD CONSTRAINT `fk_notificacoes_pendentes<>notificacoes_config` FOREIGN KEY (`notificacoes_config_id`) REFERENCES `notificacoes_config` (`id_notificacoes_config`);

--
-- Limitadores para a tabela `notificacoes_salvas`
--
ALTER TABLE `notificacoes_salvas`
  ADD CONSTRAINT `fk_notificacoes_salvas<>notificacoes_config` FOREIGN KEY (`notificacoes_config_id`) REFERENCES `notificacoes_config` (`id_notificacoes_config`);

--
-- Limitadores para a tabela `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuario<>nivel_acesso` FOREIGN KEY (`nivel_acesso_id`) REFERENCES `nivel_acesso` (`id_nivel_acesso`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
