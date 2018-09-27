<?php 
session_start();
$nomeProjeto = "Pong 21";
$corFundoDivLogin = "#bae1b5";
$imgFundo = "app/img/fundo-slideshow-home.jpg";

?>

<!DOCTYPE html>
<html>
<head>
	<title><?php echo $nomeProjeto;?> : Login</title>
	<meta charset="utf-8">
	<link rel='shortcut icon' href="app/img/clave_sol.png" />
	<?php include "app/componetes/biblioteca.php"; ?>
</head>
<body>
	<center>
		<form action="app/controllers/login.php" method="POST">
			<div class="divLogin">
				<div class="subMenuLogin">
					<h1>Projeto: <?php echo $nomeProjeto; ?></h1>
					<!-- <h2>Tela de Login</h2> -->
					<span style="font-size: 100px;"><i class="fa fa-user-circle" aria-hidden="true"></i></span>
					<br>
					<label><b>Usuário</b></label>
					<br>
					<input type="text" accesskey="i" name="login" id="login" class="form-control" required>
					<br><br>
					<label><b>Senha</b></label>
					<br>
					<input type="password" name="senha" class="form-control" align="center" required>
					<br><br>
					<button type="submit" class="btn btn-block btn-primary">Entrar</button><br><br>
				</div>
				<div class="rodapeDiv">
					<b>Developer: Jack Biller</b>
				</div>
			</div>
		</form>
	</center>
</body>
<style type="text/css">
	body{
		<?php if ($imgFundo != "") { ?>
			background-image: url("<?php echo $imgFundo; ?>");	
		<?php } ?>

		background-size: 100% auto;
		background-repeat: no-repeat;
	}
	.divLogin{
		margin-top: 4%;
		width: 40%;
		box-shadow: 10px 10px 5px #ccc;
		border-radius: 10px;
		background-color: <?php echo $corFundoDivLogin; ?>;
		opacity: 0.92;
		padding-top: 15px;
		padding-bottom: 25px;
	}
	.subMenuLogin{
		width: 75%;
	}
	.subMenuLogin label{
		font-size: 25px;
	}
	.subMenuLogin input{
		font-size: 25px;
		text-align: center;

	}
	.rodapeDiv{
		text-align: right;
		padding-right: 15px;
		padding-top: 10px;
	}
</style>
<script type="text/javascript">
	document.getElementById("login").focus();
</script>
</html>
<?php

if (!empty($_SESSION['loginInvalido']) && $_SESSION['loginInvalido']) {
	$_SESSION['loginInvalido'] = false;
?>

	<script type="text/javascript">
		alert("Login Invalido");
		document.getElementById("msmErroLogin").innerHTML = "Login Inválido";
	</script>
<?php
	}
?>
