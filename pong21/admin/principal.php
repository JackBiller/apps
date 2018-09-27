
<?php 

session_start();

if (!empty($_SESSION['nome']) && $_SESSION['nome'] != "") {
	$nomeUser = $_SESSION['nome'];
} else {
	header("Location: index.php");
}

$editar = 0;
if (!empty($_SESSION['editar'])) $editar = $_SESSION['editar'];



/*************************************************************************************
/** SESSÃO GRADES *
/************************************************************************************/

$historico_jogo_jogos = "0";
if(!empty($_SESSION['historico_jogo-jogos'])) {
	$historico_jogo_jogos = $_SESSION['historico_jogo-jogos'];
}
	


include "app/classe/conexao.php";
$conn = new Conexao();
$pdo = $conn->Connect(); 

$sql = "SELECT area_nivel_acesso
		FROM nivel_acesso
		WHERE id_nivel_acesso = (
			SELECT nivel_acesso_id FROM usuario WHERE id_usuario = ".$_SESSION['login']."
		);";
$verifica = $pdo->query($sql);

foreach ($verifica as $dados) $minha_area_nivel_acesso = explode("+", $dados[0]);


$acess_jogadores = false;
if(in_array('jogadores', $minha_area_nivel_acesso)) $acess_jogadores = true;

$acess_jogo_atual = false;
if(in_array('jogo_atual', $minha_area_nivel_acesso)) $acess_jogo_atual = true;

$acess_jogos = false;
if(in_array('jogos', $minha_area_nivel_acesso)) $acess_jogos = true;

$acess_historico_jogo_jogos = "0";
if(in_array('historico_jogo-jogos', $minha_area_nivel_acesso)) $acess_historico_jogo_jogos = "1";

$acess_upload = false;
if(in_array('upload', $minha_area_nivel_acesso)) $acess_upload = true;

$acess_mapa = false;
if(in_array('mapa', $minha_area_nivel_acesso)) $acess_mapa = true;

$acess_mov = false;
if(in_array('mov', $minha_area_nivel_acesso)) $acess_mov = true;

$acess_pdf = false;
if(in_array('pdf', $minha_area_nivel_acesso)) $acess_pdf = true;

$acess_notif = false;
if(in_array('notif', $minha_area_nivel_acesso)) $acess_notif = true;

$acess_usuario = false;
if(in_array('usuario', $minha_area_nivel_acesso)) $acess_usuario = true;

?>
<!DOCTYPE html>
<html>
<head>
	<title>Pong 21</title>
	<link rel='shortcut icon' href='app/img/clave_sol.png' />
	<?php include "app/componetes/bibliotecasHead.php"; ?>
	<?php include "app/componetes/biblioteca.php"; ?>
</head>
<body ng-app="myApp">
	<?php include "app/componetes/cabecario.php"; ?>
	<div id="wrapper">

		<?php include "app/componetes/menu.php"; ?>

			<!-- .page-content -->
			<div class="page-content sidebar-page right-sidebar-page clearfix">
				<!-- .page-content-wrapper -->
				<div class="page-content-wrapper">
					<div class="page-content-inner">
						<!-- .page-content-inner -->
						<div id="page-header" class="clearfix">
							<div class="page-header">
								<h2>Pong 21</h2>
								<span class="txt">Bem Vindo a este projeto!</span>
							</div>
							<div class="header-stats">
							</div>
						</div>

						<div class="row">
							<!-- Start .row -->
							<div class="col-lg-12 col-md-12">
								<!-- col-lg-12 start here -->
								<div class="row">
									<!-- Start .row -->
									<div class="col-lg-12 col-md-12 col-sm-12">
										<!-- col-lg-12 start here -->
										<div class="panel panel-default plain toggle panelClose panelRefresh">
											<!-- Start .panel -->
											<div class="panel-heading">
												<!--h4 class="panel-title">
													<i class="l-basic-target"></i> 
													<span id='tituloView'>Home</span>
												</h4-->
											</div>
											<div class="panel-body">
												<div class="row">
													<!-- Start .row -->
													<div class="col-md-12">

														<input type="hidden" id="editar" value="<?php echo $editar; ?>">
														<input type="hidden" name="grade" id="el_jogos-historico_jogo" data-p="jogos" data-g="historico_jogo" value="<?php echo $historico_jogo_jogos; ?>">
														<input type="hidden" id='n_acs_historico_jogo_jogos' value='<?php echo $acess_historico_jogo_jogos; ?>'>
														<input type="hidden" id="usuario" value="<?php echo $_SESSION['login']; ?>">
														<div ng-view class="col-md-12">

													</div>
												</div>
												<!-- End .row -->
											</div>
										</div>
										<!-- End .panel -->
									</div>
									<!-- col-lg-12 end here -->
								</div>
							</div>
						</div>
						<!-- End .row -->
					</div>
					<!-- / .page-content-inner -->
				</div>
				<!-- / page-content-wrapper -->
			</div>
			<!-- / page-content -->
		</div>
		<!-- / #wrapper -->

	
	<!-- Modal upload de Imagem -->
	<div class="modal fade" id="modalImagem" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" id="fecharModalIpBottun" data-dismiss="modal">
						&times;
					</button>
					<h4 class="modal-title">Upload de Arquivo: <span id='descricaoTipoUpload'></span></h4>
				</div>
				<div class="modal-body">
					<img src="app/img/padraoUp.png" id="imgemViewsUpload" height="100px">
					<form action="uploard.php" id="formulario_imgem" method="POST" enctype="multipart/form-data">
						<input type="file" class="form-control" name="arquivo" id="imagemInputModalImagem">
						<!--input type="hidden" name="pasta" value=""-->
						<input type="hidden" name="tipo" id='tipoUploadValor' value="img">
						<input type="hidden" name="paginaLogar" id="paginaLogarModalImagem">
						<button type="submit" class="btn btn-default" id="btn_uploadImagem" disabled>
							<i class="fa fa-upload" aria-hidden="true"></i>&nbsp;&nbsp;Uploard
						</button>
						<span id="erroExtencaoArqMoldaImagem" style="color:red;"></span>
					</form>
					<br>
					<div class="input-group">
						<input type="text" class="form-control" placeholder="Pesquisar..." aria-describedby="basic-addon2" onkeyup="chamarImgUp(this.value);">
						<span class="input-group-addon" id="basic-addon2">
							<i class="fa fa-search" aria-hidden="true"></i>
						</span>
					</div>
					<br>
					<div id="viewImagensUpadas"></div>
					<br>
					<input type="hidden" id="campoSelecionadoModalImagemUp">
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">
						<i class="fa fa-times" aria-hidden="true"></i>&nbsp;&nbsp;Fechar
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- fim Modal upload de Imagem -->

	<style type="text/css">
		.divImg{
			background-color: #eee;
			border-style: solid;
			display: block;
		}
	</style>

	<script type="text/javascript">
		function chamarImgUp(filtro){
			$("#viewImagensUpadas").html("Carregando...");
			var tipo = $("#tipoUploadValor").val();
			$.ajax({
				url:'app/controllers/funcoesController.php',
				type: 'POST',
				dataType: 'text',
				data: {
					'listarArquivo': true,
					'filtro': filtro,
					'tipo': tipo,
					'operacao': true
				}
			}).done( function(data){
				$("#viewImagensUpadas").html(data);
			});
		}

		// $("#modalImagem").on('shown.bs.modal',function(){  });

		function selecionarArquivo(arquivo){
			var campoSerdefinido = $("#campoSelecionadoModalImagemUp").val();
			document.getElementById(campoSerdefinido).value = arquivo;
			$("#modalImagem").modal("hide");
		}

		$("#imagemInputModalImagem").on("change", function(){
			var tipo = $("#tipoUploadValor").val();
			var arquivo = '';
			var files = !!this.files ? this.files : [];
			if (!files.length || !window.FileReader) return;

			if(tipo == 'img'){
				if (/^image/.test( files[0].type)){
					var reader = new FileReader();
					reader.readAsDataURL(files[0]);

					reader.onload = function(){
						$("#imgemViewsUpload").attr('src', this.result);
						document.getElementById("btn_uploadImagem").disabled = false;
						$("#erroExtencaoArqMoldaImagem").html("");
					}
				} else {
					$("#imgemViewsUpload").attr('src', "app/img/padraoUp.png");
					document.getElementById("btn_uploadImagem").disabled = true;
					$("#erroExtencaoArqMoldaImagem").html("Arquivo inválido!");
				}
			}
			else {
				arquivo = files[0].type.split("/");
				if (tipo == arquivo[0]){
					var reader = new FileReader();
					reader.readAsDataURL(files[0]);

					reader.onload = function(){
						document.getElementById("btn_uploadImagem").disabled = false;
						$("#erroExtencaoArqMoldaImagem").html("");
					}
				} else {
					document.getElementById("btn_uploadImagem").disabled = true;
					$("#erroExtencaoArqMoldaImagem").html("Arquivo inválido!");
				}
			}
		});

		function chamarModalImagem(campoId, pagina, tipo){
			console.log(campoId);
			$('#modalImagem').modal('show');
			chamarImgUp("");
			$("#imgemViewsUpload").attr('src', "app/img/padraoUp.png");
			$("#imagemInputModalImagem").val("");
			document.getElementById("btn_uploadImagem").disabled = true;
			$('#campoSelecionadoModalImagemUp').val(campoId);
			$("#paginaLogarModalImagem").val(pagina);
			$("#tipoUploadValor").val(tipo);
					if(tipo == 'img') $('#descricaoTipoUpload').html('Imagem');
			else 	if(tipo == 'video') $('#descricaoTipoUpload').html('Vídeo');
			else 	if(tipo == 'audio') $('#descricaoTipoUpload').html('Áudio');
			else 	if(tipo == 'text') $('#descricaoTipoUpload').html('Arquivo de Texto');
		}
	</script>


	<?php include "app/componetes/bibliotecasFooter.php"; ?>
</body>
</html>