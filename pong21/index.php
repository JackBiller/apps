<!DOCTYPE html>
<html>
<head>
	<title>Console Pong 21</title>
	<meta charset="utf-8">
	<meta name="format-detection" content="telephone=no" />
    <meta name="msapplication-tap-highlight" content="no" />
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width" />
    <!-- This is a wide open CSP declaration. To lock this down for production, see below. -->
    <meta http-equiv="Content-Security-Policy" content="default-src * 'unsafe-inline'; style-src 'self' 'unsafe-inline'; media-src *" />
	<script type="text/javascript" src="js/jQuery.js"></script>

	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="css/estilo.css">
	<link rel="stylesheet" type="text/css" href="css/font-awesome/css/font-awesome.min.css">      

	<!-- Scrips padrão -->
	<script type="text/javascript" src="js/config/element.js"></script>
	<script type="text/javascript" src="js/config/funcoes.js"></script>
	<script type="text/javascript" src="js/config/menu.js"></script>
	<script type="text/javascript" src="js/config/formulario.js"></script>
	<script type="text/javascript" src="js/scripts.js"></script>
	<script type="text/javascript" src="js/valorPorExtenco.js"></script>
	<script type="text/javascript" src="js/bootstrap.js"></script>

	<script type="text/javascript" src="js/bootbox.js"></script>
	<script type="text/javascript" src="js/masked2.js"></script>
	<script type="text/javascript" src="js/masked.js"></script>
	<script type="text/javascript" src="js/toast.js"></script>
	<script type="text/javascript" src="js/maskmoney.js"></script>
	<script type="text/javascript" src="js/moment.js"></script>

	<!-- Biblioteca dataList usando Jquery  -->
	<link href="lb/jquery-flexdatalist/jquery.flexdatalist.min.css" rel="stylesheet" type="text/css">
	<script src="lb/jquery-flexdatalist/jquery.flexdatalist.min.js"></script>

	<script src="js/jquery.maskMoney.min.js" type="text/javascript"></script>

	<link rel="stylesheet" type="text/css" href="css/toast.css">

	<meta charset="utf-8">
</head>
<body>
	<center>
		<h1 class="titulo">CONSOLE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PONG&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;21</h1>

		<div id="telaJogoAtual" class="col-xs-12">
			<div class="col-xs-5 text-center">
				<img src="img/iconAvatar.png" width="50%">
				<br>
				<h2>
					<b>Nome: </b>
					<span id="nomeJogador">Jack Biller</span>
				</h2>
				<h1 style="font-size: 60px"><b><span id="placarVlr1">5</span></b></h1>
			</div>
			<div class="col-xs-2">
				<img src="img/vs.png" width="80%">
				<br><br><br><br>
				<div id="historioPartidaAtual">
					<table class="table" style="font-size: 20px;">
						<tr>
							<td>4</td>
							<td>-</td>
							<td>2</td>
						</tr>
						<tr>
							<td>4</td>
							<td>-</td>
							<td>3</td>
						</tr>
						<tr>
							<td>5</td>
							<td>-</td>
							<td>3</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="col-xs-5 text-center">
				<img src="img/iconAvatar.png" width="50%">
				<br>
				<h2>
					<b>Nome: </b>
					<span id="nomeJogador">Fulando</span>
				</h2>
				<h1 style="font-size: 60px"><b><span id="placarVlr1">3</span></b></h1>
			</div>
		</div>

	</center>
</body>


<style type="text/css">
@font-face {
	font-family: font_titulo2;
	src: url(font/Space_Comics.ttf);
}

.titulo{
	font-family: font_titulo2;
}
</style>
</html>
