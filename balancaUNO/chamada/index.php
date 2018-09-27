<!DOCTYPE html>
<html>
<head>
	<script>
		/* IP do Web Service */
		var hostWebService = "192.168.0.105";

		/* IP das Imagens do servidor */
		var hostServeImage = "192.168.0.105";

		var portaWebService = ":8080";
		var portaImgService = "80";
		var caminhoWebService = "/LanchesCDI/webresources/";
		var urlWebService = "http://"+hostWebService+portaWebService+caminhoWebService;
		var parametrosWebService = "?tagmode=any&jsoncallback=?";
		var listagem = false;

		var vendedor = 0;
		var filialGearl = 0;
		var sequencia = 0;
		var documentoGeral = "";

	</script>

	<meta charset="utf-8" />
	<link rel='shortcut icon' href="../img/icon.png" />
	<meta name="format-detection" content="telephone=no" />
	<meta name="msapplication-tap-highlight" content="no" />
	<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width" />
	<!-- This is a wide open CSP declaration. To lock this down for production, see below. -->
	<meta http-equiv="Content-Security-Policy" content="default-src * 'unsafe-inline'; style-src 'self' 'unsafe-inline'; media-src *" />

	<title>Lanches CDI</title>

	<script type="text/javascript" src="../js/jQuery.js"></script>

	<link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="../css/estilo.css">
	<link rel="stylesheet" type="text/css" href="../css/font-awesome/css/font-awesome.min.css">      

	
	<!-- Scrips padrão -->
	<script type="text/javascript" src="../js/scripts.js"></script>
	<script type="text/javascript" src="../js/valorPorExtenco.js"></script>
	<script type="text/javascript" src="../js/bootstrap.js"></script>

	<script type="text/javascript" src="../js/bootbox.js"></script>
	<script type="text/javascript" src="../js/masked2.js"></script>
	<script type="text/javascript" src="../js/masked.js"></script>
	<script type="text/javascript" src="../js/toast.js"></script>
	<script type="text/javascript" src="../js/maskmoney.js"></script>
	<script type="text/javascript" src="../js/moment.js"></script>

	<!-- Biblioteca dataList usando Jquery  -->
	<link href="../lb/jquery-flexdatalist/jquery.flexdatalist.min.css" rel="stylesheet" type="text/css">
	<script src="../lb/jquery-flexdatalist/jquery.flexdatalist.min.js"></script>

	<script src="../js/jquery.maskMoney.min.js" type="text/javascript"></script>

	<link rel="stylesheet" type="text/css" href="../css/toast.css">

	<link rel="stylesheet" type="text/css" href="estilo.css">
</head>
<body>



<div class="col-xs-12" style="border-bottom-style: solid;height: 15%;">
	<div class="col-xs-2 text-center" style="margin-top: 15px;padding-bottom: 6px; height: 15%;">
		<img src="../img/Logo.png" width="80%">
	</div>

	<div class="col-xs-12 text-center">
		<div class="col-xs-8">
			<h1 style="font-family: font_titulo;font-size: 65px;margin-bottom: 0px;margin-top: 25px;">
				Magrão Lanches
				 <!-- CDI -->
			</h1>
		</div>
		<div class="col-xs-2" style="margin-top: 15px;">
			<canvas id="relogio" width="80%" height="70" style="background-color: #333;border-radius: 5px;"></canvas>
		</div>
	</div>
	
	<br><br><br><br>
	<!-- <br> -->
</div>


<div class="ultimasChamadas" style="width: 57%;">
	<div id="chamadasPendentes" style="margin-top: 15px;margin-left: 15px;"></div>
	<!-- <div class="col-xs-3 estiloCamposSenha" style="height: 20%;background-color: lightblue;">
		<h1>Pedio: 003857</h1>
		<h2>Nome: Jack Biller</h2>
	</div>
	<div class="col-xs-3 estiloCamposSenha" style="height: 20%;background-color: lightgreen;">
		<h1>Pedido: 003858</h1>
		<h2>Nome: Fulando Teste</h2>
	</div> -->
</div>

<style type="text/css">
	.ultimasChamadas{
		min-height: 85%;
		height:auto !important;
		height:85%;
		position: absolute;
	}
</style>

<div class=" ultimasChamadas" style="margin-left: 60%;width: 40%;border-left-style: solid;">
	<center>
		<h1>Últimas Chamanda</h1>
	</center>
	
	<div id="ultimasChamadas"></div>
	<!-- <h2>Pedido: 003857 <br> Nome: Jack Biller</h2><hr> -->
</div>
<!-- <div style="display: none;" id="oldPedidos"></div> -->


<audio controls id="dim_dom" style="display: none;">
	<source src="dim dom.mp3" type="audio/mpeg">
	Your browser does not support the audio element.
</audio>

</body>


<script type="text/javascript">
	var oldPedidos = "<div class='text-center'><br><h3>Nenhum resultado encontrado!</h3></div>qwe";
	var dim_dom = document.getElementById("dim_dom");

function listarPedido(){
	/*var carregando = "<div class='text-center'>";
	carregando += "<br><br><br><h4>Carregando&nbsp;&nbsp;&nbsp;<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i></h4>";
	carregando += "</div>";

	$("#chamadasPendentes").html(carregando);
	$("#ultimasChamadas").html(carregando);*/

	$.ajax({
		url:'operacoesTela.php',
		type: 'POST',
		dataType: 'text',
		data: { 'listarPedidosPendente': true }
	}).done( function(data){
		$("#chamadasPendentes").html(data);
	});

	$.ajax({
		url:'operacoesTela.php',
		type: 'POST',
		dataType: 'text',
		data: { 'listarPedidoChamado': true }
	}).done( function(data){
		if (oldPedidos != data && oldPedidos.length <= data.length) {
			oldPedidos = data;
			/* console.log("Tocar Dim Dom"); */
			stopDim_dom();
			playDim_dom();
		}
		else if (oldPedidos != data) {
			oldPedidos = data;
			/* console.log("Não tocar nada"); */
		}
		$("#ultimasChamadas").html(data);
	});
}


function chamarPedido(){ listarPedido(); setInterval( function () { listarPedido(); }, 5000); }
chamarPedido();


function playDim_dom()	{ 	dim_dom.play(); 	}
function stopDim_dom()	{ 	dim_dom.load(); 	}
function pauseDim_dom()	{ 	dim_dom.pause(); 	}





if (navigator.appName != "Microsoft Internet Explorer")
	document.captureEvents(Event.KEYDOWN);
	document.onkeydown = NetscapeKeyDown;
	function NetscapeKeyDown(key){
		KeyDown(key.which);
	}
if (window.event) { KeyDown(window.event.keyCode); }
function KeyDown(whichkey){
	/* console.log(whichkey); */


	/* quando presionado a tecla enter */
	if (whichkey == 13) {
		listarPedido();
	}


	/* Quando presionado a tecla esc */
	if (whichkey == 27){

	}

	/*if (whichkey == 38) Rotate();
	if (whichkey == 39) Right();
	if (whichkey == 40) Down();

	if (whichkey == 50) Down();
	if (whichkey == 52) Left();
	if (whichkey == 53) Down();
	if (whichkey == 54) Right();
	if (whichkey == 56) Rotate();

	if (whichkey == 65458) Down();
	if (whichkey == 65460) Left();
	if (whichkey == 65461) Down();
	if (whichkey == 65462) Right();
	if (whichkey == 65464) Rotate();*/
}

</script>

</html>
<!-- 
	amarelo     #f0ad4e
	verde       #5cb85c
	azul        #428bca
	azul claro  #5bc0de
	vermelho    #d9534f
 -->



<!-- Scripts relogio -->
<script type="text/javascript">
	document.getElementById("relogio").style.paddingLeft = (document.getElementById("relogio").width / 6) +"px";
	/* document.getElementById("relogio").style.marginLeft = "-" + (document.getElementById("relogio").width / 5) +"px";
	document.getElementById("relogio").style.marginRight = (document.getElementById("relogio").width) +"px";
	document.getElementById("relogio").style.paddingRigth = "-" + document.getElementById("relogio").width +"px"; */
	var canvas = document.getElementById("relogio");
	var ctx = canvas.getContext("2d");
	var radius = canvas.height / 2;
	ctx.translate(radius, radius);
	radius = radius * 0.90;
	setInterval( function () { drawClock(); }, 1000);

	function drawClock(){
		drawFace(ctx, radius);
		drawNumber(ctx, radius);
		drawTime(ctx, radius);
	}



	function drawTime(ctx, radius){
		var now = new Date();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		/* hour */
		hour = hour % 12;
		hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
		drawHand(ctx, hour, radius * 0.5, radius * 0.07);
		/* minute */
		minute = (minute * Math.PI / 30) + (second * Math.PI / (30*60));
		drawHand(ctx, minute, radius * 0.8, radius * 0.07);
		/* second */
		second = (second * Math.PI / 30);
		drawHand(ctx, second, radius * 0.9, radius * 0.02);
	}


	function drawHand(ctx, pos, length, width){
		ctx.beginPath();
		ctx.lineWidth = width;
		ctx.lineCap = "round";
		ctx.moveTo(0,0);
		ctx.rotate(pos);
		ctx.lineTo(0, -length);
		ctx.stroke();
		ctx.rotate(-pos);
	}


	function drawNumber(ctx, radius){
		var ang;
		var num;
		ctx.font = radius * 0.35 + "px arial";
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
		for(num = 1; num < 13; num++){
			ang = num * Math.PI / 6;
			ctx.rotate(ang);
			ctx.translate(0, -radius * 0.85);
			ctx.rotate(-ang);
			ctx.fillText(num.toString(), 0, 0);
			ctx.rotate(ang);
			ctx.translate(0, radius * 0.85);
			ctx.rotate(-ang);
		}
	}


	function drawFace(ctx, radius){
		var grad;

		ctx.beginPath();
		ctx.arc(0, 0, radius, 0, 2 * Math.PI);
		ctx.fillStyle = "white";
		ctx.fill();

		grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
		grad.addColorStop(0, '#333');
		grad.addColorStop(0.5, 'white');
		grad.addColorStop(1, '#333');
		ctx.strokeStyle = grad;
		ctx.lineWidth = radius*0.1;
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
		ctx.fillStyle = "#333";
		ctx.fill();
	}
</script>