

<aside id="sidebar" class="page-sidebar hidden-md hidden-sm hidden-xs">
	<!-- Start .sidebar-inner -->
	<div class="sidebar-inner">
		<!-- Start .sidebar-scrollarea -->
		<div class="sidebar-scrollarea">
			<!--  .sidebar-panel -->
			<div class="sidebar-panel">
			    <h5 class="sidebar-panel-title">Perfil</h5>
			</div>
			<!-- / .sidebar-panel -->
			<div class="user-info clearfix">
				<div class='row fluit-container'>
					<div class='col-md-4'>
						<img src="app/img/avatars/iconAvatar.png" widht='100%' alt="avatar">
					</div>
					<div class='col-md-8 text-left'>
						<a href='#' class="name">
							<span id='nomeLogado'><?php echo $nomeUser; ?></span>
						</a>

						<center>
							<button type="button" class="btn btn-default btn-xs text-right" onclick='deslogar()'>
								<i class="fa fa-sign-out"></i>&nbsp;Sair
							</button>
						</center>
					</div>
				</div>
			</div>
			<!--  .sidebar-panel -->
			<div class="sidebar-panel">
			    <h5 class="sidebar-panel-title">Navigation</h5>
			</div>
			<!-- / .sidebar-panel -->
			<!-- .side-nav -->
			<div class="side-nav">
				<ul class="nav">
					<li>
						<a href="principal.php#!home">
							<i class="glyphicon glyphicon-home"></i>
							&nbsp;<span class="txt">Home</span>
						</a>
					</li>
					<li>
						<a href="#">
							<i class="fa fa-user-circle" aria-hidden="true"></i>
							&nbsp;<span class="txt">Perfil</span>
						</a>
						<ul class="sub">
							<li>
								<a href="principal.php#!perfil_editar"><span class="txt">Editar Perfil</span></a>
							</li>
							<li>
								<a href="principal.php#!perfil_trocar_senha"><span class="txt">Trocar Senha</span></a>
							</li>
						</ul>
					</li>
					<li>
						<a href="#">
							<i class="fa fa-list" aria-hidden="true"></i>
							&nbsp;<span class="txt">Cadastro</span>
						</a>
						<ul class="sub">
							<?php if($acess_jogadores) { ?>
							<li>
								<a href="principal.php#!jogadores"><span class="txt">Jogadores</span></a>
							</li>
							<?php } ?>
							<?php if($acess_jogo_atual) { ?>
							<li>
								<a href="principal.php#!jogo_atual"><span class="txt">Jogo Atual</span></a>
							</li>
							<?php } ?>
							<?php if($acess_jogos) { ?>
							<li>
								<a href="principal.php#!jogos"><span class="txt">Jogos</span></a>
							</li>
							<?php } ?>
						</ul>
					</li>
					<?php if($acess_pdf){ ?>
					<li>
						<a href="#">
							<i class='fa fa-file-pdf-o' aria-hidden="true"></i>
							&nbsp;<span class="txt">Relatório</span>
						</a>
						<ul class="sub">
							<li>
								<a href="principal.php#!pdf_lista"><span class="txt">Cadastro / Emissão</span></a>
							</li>
							<!--li>
								<a href="principal.php#!pdf_emiti"><span class="txt">Personalizado</span></a>
							</li-->
						</ul>
					</li>
					<?php } ?>
					<?php if($acess_notif){ ?>
					<li>
						<a href="#">
							<i class='fa fa-bell' aria-hidden="true"></i>
							&nbsp;<span class="txt">Notificação <span class="badge">4</span></span>
						</a>
						<ul class="sub">
							<li>
								<a href="principal.php#!pdf_lista"><span class="txt">Atuais</span></a>
							</li>
							<li>
								<a href="principal.php#!pdf_lista"><span class="txt">Salvas</span></a>
							</li>
							<li>
								<a href="principal.php#!pdf_lista"><span class="txt">Pendentes</span></a>
							</li>
							<li>
								<a href="principal.php#!notif_lista_config"><span class="txt">Configuração</span></a>
							</li>
						</ul>
					</li>
					<?php } ?>
					<?php if($acess_upload) { ?>
					<li>
						<a href="#">
							<i class='glyphicon glyphicon-upload'></i>
							&nbsp;<span class="txt">Upload</span>
						</a>
						<ul class="sub">
							<li>
								<a href="principal.php#!upload_imagem"><span class="txt">Imagem</span></a>
							</li>
							<li>
								<a href="principal.php#!upload_video"><span class="txt">Vídeo</span></a>
							</li>
							<li>
								<a href="principal.php#!upload_audio"><span class="txt">Áudio</span></a>
							</li>
							<li>
								<a href="principal.php#!upload_texto"><span class="txt">Texto</span></a>
							</li>
						</ul>
					</li>
					<?php } ?>
					<?php if($acess_mov) { ?>
					<li>
						<a href="#">
							<i class='fa fa-folder-open' aria-hidden="true"></i>
							&nbsp;<span class="txt">Arquivo</span>
						</a>
						<ul class="sub">
							<li>
								<a href="principal.php#!mov_img"><span class="txt">Movimentação Imagem</span></a>
							</li>
						</ul>
					</li>
					<?php } ?>
					<?php if($acess_mapa) { ?>
					<li>
						<a href="#">
							<i class='fa fa-map-signs' aria-hidden="true"></i>
							&nbsp;<span class="txt">Maps</span>
						</a>
						<ul class="sub">
							<li>
								<a href="principal.php#!maps_Lat_Lng"><span class="txt">Latitude/Longitude</span></a>
							</li>
						</ul>
					</li>
					<?php } ?>
					<?php if($acess_usuario) { ?>
					<li>
						<a href="#">
							<i class='fa fa-user-plus' aria-hidden="true"></i>
							&nbsp;<span class="txt">Acesso</span>
						</a>
						<ul class="sub">
							<li>
								<a href="principal.php#!usuario_lista"><span class="txt">Usuário</span></a>
							</li>
							<li>
								<a href="principal.php#!usuario_nivel_acesso"><span class="txt">Nível de Acesso</span></a>
							</li>
						</ul>
					</li>
					<?php } ?>
				</ul>
			</div>
		</div>
		<!-- End .sidebar-scrollarea -->
	</div>
	<!-- End .sidebar-inner -->
</aside>
<!-- / page-sidebar -->
<!-- Start #right-sidebar -->
