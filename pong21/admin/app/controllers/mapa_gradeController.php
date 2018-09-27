
<?php

session_start();


if($_POST['grade'] == 'historico_jogo-jogos'){
	$_SESSION['historico_jogo-jogos'] = $_POST['id'];
}


if(!empty($_POST['zerarGrades'])){ 
	$_SESSION['historico_jogo-jogos'] = 0;
}

?>