
<?php 	
session_start();

		if (!empty($_SESSION['statusUp'])) { 
			if($_SESSION['statusUp'] == 1)  { ?>
				<h1>Upload feito com Sucesso!</h1>
<?php 		} else { ?>
				<h1>Falha ao tentar fezer Upload!</h1>
<?php 		}
		} ?>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:history.go(-1)"> VOLTAR </a>
