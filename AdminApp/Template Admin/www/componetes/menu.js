

var caminhoRequisicao = "http://cdiinfo.com.br/aplicacoes_web/";

/* var caminhoServer = "http://192.168.100.15:8088/Araguaia/controllers/" ; */
/* var caminhoRequisicao = "http://cdiinfo.com.br/aplicacoes_web/orcamento/controllers/"; */
var caminhoServer = "http://cdiinfo.com.br/aplicacoes_web/orcamento/controllers/";
/* caminhoServer = caminhoRequisicao; */

function setarMenuCabecario(){
	var caminhoImagemLogada = prefixoCaminho+"dist/img/iconAvatar.png";

	/* caminhoImagemLogada = "http://cdiinfo.com.br/aplicacoes_web/logo/ARAGUAIA_COMERCIAL_DE_FERRO_E_ACO_LTDA/3.jpg"; */

	try{
		var empresa_nomeImagem = empresa_Global.RAZAOSOCIAL.replace(/\./gi, "");
		empresa_nomeImagem = empresa_nomeImagem.replace(/ /gi, "_");
		caminhoImagemLogada = "http://cdiinfo.com.br/aplicacoes_web/logo/"
						+ empresa_nomeImagem + "/" + usuario_Global.filial + ".jpg";
						/* ARAGUAIA COMERCIAL DE FERRO E ACO LTDA */
						/* ARAGUAIA_COMERCIAL_DE_FERRO_E_ACO_LTDA */
	}catch(error){
		alert("Erro ao tentar setar caminho da imagem:  " + error);
		/* console.error("Erro ao tentar setar caminho da imagem:  " + error); */
	}

	var conteudoGeral = "<header class=\"main-header\">"
					+ 	"<!-- Logo -->"
					+ 	"<a href=\"#\" class=\"logo\">"
					+ 		"<!-- mini logo for sidebar mini 50x50 pixels -->"
					+ 		"<span class=\"logo-mini\">"
					+ 			"<img src=\"" + prefixoCaminho + "dist/img/LogoSk.png\" width=\"80%\">"
					/* + 			"<!-- <b>CDI</b> -->" */
					+ 		"</span>"
					+ 		"<!-- logo for regular state and mobile devices -->"
					+ 		"<span class=\"logo-lg\" id='setarNomeEmpresa'>"
					+ 			"<b>Admin</b>CDI"
					/* + 			"<!-- <img src=\"dist/img/LogotipoCDI_2.jpg\" width=\"80%\"> -->" */
					/* + 			"<!-- <b>Admin</b>LTE -->" */
					+ 		"</span>"
					+ 	"</a>"
					+ 	"<!-- Header Navbar: style can be found in header.less -->"
					+ 	"<nav class=\"navbar navbar-static-top\">"
					+ 		"<!-- Sidebar toggle button-->"
					+ 		"<a href=\"#\" class=\"sidebar-toggle\" data-toggle=\"push-menu\" role=\"button\">"
					+ 			"<span class=\"sr-only\">Toggle navigation</span>"
					+ 		"</a>"

					+ 		"<div class=\"navbar-custom-menu\">"
					+ 			"<ul class=\"nav navbar-nav\">"

					+ 				"<!-- User Account: style can be found in dropdown.less -->"
					+ 				"<li class=\"dropdown user user-menu\">"
					+ 					"<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">"
					+ 						"<img src=\""+caminhoImagemLogada+"\" class=\"user-image\" alt=\"User Image\">"
					+ 						"<span class=\"hidden-xs\" id='usuarioLogado'>Jack Biller</span>"
					+ 					"</a>"
					+ 					"<ul class=\"dropdown-menu\">"
					+ 						"<!-- User image -->"
					+ 						"<li class=\"user-header\">"
					+ 							"<img src=\""+caminhoImagemLogada+"\" class=\"img-circle\" alt=\"User Image\">"
					+ 							"<p id='especificaoesUsuario'>"
					+ 								"Jack Biller - Adiministrador"
					+ 								"<small>CDI Informatica e Contabilidade</small>"
					+ 							"</p>"
					+ 							"<!-- <p>"
					+ 								"Alexander Pierce - Web Developer"
					+ 								"<small>Member since Nov. 2012</small>"
					+ 							"</p> -->"
					+ 						"</li>"
					+ 						"<!-- Menu Body -->"
					+ 						"<li class=\"user-body\">"
					+ 							"<!-- <div class=\"row\">"
					+ 								"<div class=\"col-xs-4 text-center\">"
					+ 									"<a href=\"#\">Followers</a>"
					+ 								"</div>"
					+ 								"<div class=\"col-xs-4 text-center\">"
					+ 									"<a href=\"#\">Sales</a>"
					+ 								"</div>"
					+ 								"<div class=\"col-xs-4 text-center\">"
					+ 									"<a href=\"#\">Friends</a>"
					+ 								"</div>"
					+ 							"</div> -->"
					+ 							"<!-- /.row -->"
					+ 						"</li>"
					+ 						"<!-- Menu Footer-->"
					+ 						"<li class=\"user-footer\">"
					+ 							"<div class=\"pull-left\">"
					+ 								"<!-- <a href=\"#\" class=\"btn btn-default btn-flat\">Perfil</a> -->"
					+ 							"</div>"
					+ 							"<div class=\"pull-right\">"
					+ 								"<a href=\"#\" class=\"btn btn-default btn-flat\" onclick='logof()'>Sair</a>"
					+ 							"</div>"
					+ 						"</li>"
					+ 					"</ul>"
					+ 				"</li>"
					+ 				"<!-- Control Sidebar Toggle Button -->"
					+ 				"<li>"
					+ 					"<!-- <a href=\"#\" data-toggle=\"control-sidebar\"><i class=\"fa fa-gears\"></i></a> -->"
					/* + 					"<a href=\"#\" data-toggle=\"control-sidebar\"><i class=\"fa fa-gears\"></i></a>" */
					+ 				"</li>"
					+ 			"</ul>"
					+ 		"</div>"
					+ 	"</nav>"
					+ "</header>"


					+ "<!-- Left side column. contains the logo and sidebar -->"
					+ "<aside class=\"main-sidebar\">"
					+ 	"<!-- sidebar: style can be found in sidebar.less -->"
					+ 	"<section class=\"sidebar\">"
					+ 		"<!-- Sidebar user panel -->"
					+ 		"<div class=\"user-panel\">"
					+ 			"<div class=\"pull-left image\">"
					+ 				"<img src=\""+caminhoImagemLogada+"\" class=\"img-circle\" alt=\"User Image\">"
					+ 			"</div>"
					+ 			"<div class=\"pull-left info\">"
					+ 				"<p id=\"usuarioLogado2\">Adiministrador</p>"
					+ 				"<!-- <a href=\"#\"><i class=\"fa fa-circle text-success\"></i> Online</a> -->"
					+ 			"</div>"
					+ 		"</div>"
					+ 		"<!-- search form -->"
					+ 		"<!-- <form action=\"#\" method=\"get\" class=\"sidebar-form\">"
					+ 			"<div class=\"input-group\">"
					+ 				"<input type=\"text\" name=\"q\" class=\"form-control\" placeholder=\"Search...\">"
					+ 				"<span class=\"input-group-btn\">"
					+ 							"<button type=\"submit\" name=\"search\" id=\"search-btn\" class=\"btn btn-flat\"><i class=\"fa fa-search\"></i>"
					+ 							"</button>"
					+ 						"</span>"
					+ 			"</div>"
					+ 		"</form> -->"
					+ 		"<!-- /.search form -->"
					+ 		"<!-- sidebar menu: : style can be found in sidebar.less -->"
					+ 		"<ul class=\"sidebar-menu\" data-widget=\"tree\">"
					+ 			"<li class=\"header\"><b>Menu Principal</b></li>"
					+ 			"<li class=\"treeview\"><!-- active -->"




					/*************************************************************************************************/
					/* Links Pagina Principal */
					+ 				"<a href=\"#\">"
					+ 					"<i class=\"fa fa-star-o\"></i> <span>Inicio</span>"
					+ 					"<span class=\"pull-right-container\">"
					+ 						"<i class=\"fa fa-angle-left pull-right\"></i>"
					+ 					"</span>"
					+ 				"</a>"

					+ 				"<ul class=\"treeview-menu\">"
					+ 					"<li>"


					/* Link para pagina principal */
					+ 						"<a href=\"" + prefixoCaminho + "principal.html\">"
					+ 							"<i class=\"fa fa-circle-o\"></i>Pagina Principal"
					+ 						"</a>"


					+ 				"</ul>"
					/*************************************************************************************************/






					/*************************************************************************************************/
					/* Links Orçamentos */
					+ 				"<a href=\"#\">"
					+ 					"<i class=\"fa fa-list\"></i> <span>Orçamento</span>"
					+ 					"<span class=\"pull-right-container\">"
					+ 						"<i class=\"fa fa-angle-left pull-right\"></i>"
					+ 					"</span>"
					+ 				"</a>"

					+ 				"<ul class=\"treeview-menu\">"
					+ 					"<li>"


					/* Link para listar Orçamento */
					+ 						"<a href=\"" + prefixoCaminho + "view/orcamento/index.html\">"
					+ 							"<i class=\"fa fa-circle-o\"></i>Listar Orcamentos"
					+ 						"</a>"


					+ 					"</li>"
					+ 					"<li>"


					/* Link para adicionar Orçamento */
					+ 						"<a href=\"" + prefixoCaminho + "view/orcamento/adicionar.html\">"
					+ 							"<i class=\"fa fa-circle-o\"></i>Adicionar Orcamento</a>"
					+ 						"</a>"


					+ 					"</li>"
					/* + 					"<!-- <li><a href=\"index2.html\"><i class=\"fa fa-circle-o\"></i> Dashboard v2</a></li> -->" */
					+ 				"</ul>"
					/*************************************************************************************************/






					/*************************************************************************************************/
					/* Links Consulta */
					+ 				"<a href=\"#\">"
					+ 					"<i class=\"fa fa-search\"></i> <span>Consultar</span>"
					+ 					"<span class=\"pull-right-container\">"
					+ 						"<i class=\"fa fa-angle-left pull-right\"></i>"
					+ 					"</span>"
					+ 				"</a>"

					+ 				"<ul class=\"treeview-menu\">"
					+ 					"<li>"


					/* Link para consulta Produtos */
					+ 						"<a href=\"" + prefixoCaminho + "view/consulta/produto.html\">"
					+							"<i class=\"fa fa-circle-o\"></i>Produtos"
					+ 						"</a>"


					+ 					"</li>"
					+ 				"</ul>"
					/*************************************************************************************************/





					/*************************************************************************************************/
					/* Links Download */
					/* + 				"<a href=\"#\">" */
					/* + 					"<!-- <i class=\"fa fa-dashboard\"></i> -->" */
					/* + 					"<i class=\"fa fa-android\"></i> <span>Android</span>" */
					/* + 					"<i class=\"fa fa-download\"></i> <span>Android</span>" */
					/* + 					"<span class=\"pull-right-container\">" */
					/* + 						"<i class=\"fa fa-angle-left pull-right\"></i>" */
					/* + 					"</span>" */
					/* + 				"</a>" */

					/* + 				"<ul class=\"treeview-menu\">" */
					/* + 					"<!-- <li class=\"active\"><a href=\"index.html\"></li> -->" */
					/* + 					"<li>" */


					/* Link para download do App */
					/* + 						"<a href=\"view/app/\"><i class=\"fa fa-circle-o\"></i>Baixe o App</a>" */


					/* + 					"</li>" */
					/* + 				"</ul>" */
					/*************************************************************************************************/



					

					+ 			"</li>"
					+ 		"</ul>"
					+ 	"</section>"
					+ 	"<!-- /.sidebar -->"
					+ "</aside>"

	
	conteudoGeral += document.getElementById("conteudoGeral").innerHTML;
	document.getElementById("conteudoGeral").innerHTML = conteudoGeral;
}
setarMenuCabecario();





function logof(){
	if(confirm("Deseja sair do Sistema?")){
		localStorage.removeItem("usuario_Global");
		window.location.assign(prefixoCaminho + "index.html");
	}
}






/*

<header class="main-header">
	<!-- Logo -->
	<a href="index2.html" class="logo">
		<!-- mini logo for sidebar mini 50x50 pixels -->
		<span class="logo-mini">
			<img src="dist/img/LogoSk.png" width="80%">
			<!-- <b>CDI</b> -->
		</span>
		<!-- logo for regular state and mobile devices -->
		<span class="logo-lg">
			<b>Admin</b>CDI
			<!-- <img src="dist/img/LogotipoCDI_2.jpg" width="80%"> -->
			<!-- <b>Admin</b>LTE -->
		</span>
	</a>
	<!-- Header Navbar: style can be found in header.less -->
	<nav class="navbar navbar-static-top">
		<!-- Sidebar toggle button-->
		<a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
			<span class="sr-only">Toggle navigation</span>
		</a>

		<div class="navbar-custom-menu">
			<ul class="nav navbar-nav">

				<!-- User Account: style can be found in dropdown.less -->
				<li class="dropdown user user-menu">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<img src="dist/img/iconAvatar.png" class="user-image" alt="User Image">
						<span class="hidden-xs" id='usuarioLogado'>Jack Biller</span>
					</a>
					<ul class="dropdown-menu">
						<!-- User image -->
						<li class="user-header">
							<img src="dist/img/iconAvatar.png" class="img-circle" alt="User Image">
							<p id='especificaoesUsuario'>
								Jack Biller - Adiministrador
								<small>CDI Informatica e Contabilidade</small>
							</p>
							<!-- <p>
								Alexander Pierce - Web Developer
								<small>Member since Nov. 2012</small>
							</p> -->
						</li>
						<!-- Menu Body -->
						<li class="user-body">
							<!-- <div class="row">
								<div class="col-xs-4 text-center">
									<a href="#">Followers</a>
								</div>
								<div class="col-xs-4 text-center">
									<a href="#">Sales</a>
								</div>
								<div class="col-xs-4 text-center">
									<a href="#">Friends</a>
								</div>
							</div> -->
							<!-- /.row -->
						</li>
						<!-- Menu Footer-->
						<li class="user-footer">
							<div class="pull-left">
								<!-- <a href="#" class="btn btn-default btn-flat">Perfil</a> -->
							</div>
							<div class="pull-right">
								<a href="#" class="btn btn-default btn-flat">Sair</a>
							</div>
						</li>
					</ul>
				</li>
				<!-- Control Sidebar Toggle Button -->
				<li>
					<!-- <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a> -->
				</li>
			</ul>
		</div>
	</nav>
</header>


<!-- Left side column. contains the logo and sidebar -->
<aside class="main-sidebar">
	<!-- sidebar: style can be found in sidebar.less -->
	<section class="sidebar">
		<!-- Sidebar user panel -->
		<div class="user-panel">
			<div class="pull-left image">
				<img src="dist/img/iconAvatar.png" class="img-circle" alt="User Image">
			</div>
			<div class="pull-left info">
				<p id="usuarioLogado2">Adiministrador</p>
				<!-- <a href="#"><i class="fa fa-circle text-success"></i> Online</a> -->
			</div>
		</div>
		<!-- search form -->
		<!-- <form action="#" method="get" class="sidebar-form">
			<div class="input-group">
				<input type="text" name="q" class="form-control" placeholder="Search...">
				<span class="input-group-btn">
							<button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
							</button>
						</span>
			</div>
		</form> -->
		<!-- /.search form -->
		<!-- sidebar menu: : style can be found in sidebar.less -->
		<ul class="sidebar-menu" data-widget="tree">
			<li class="header"><b>Menu Principal</b></li>
			<li class="treeview"><!-- active -->
				<a href="#">
					<!-- <i class="fa fa-dashboard"></i> -->
					<i class="fa fa-list"></i> <span>Orçamento</span>
					<span class="pull-right-container">
						<i class="fa fa-angle-left pull-right"></i>
					</span>
				</a>
				<ul class="treeview-menu">
					<!-- <li class="active"><a href="index.html"></li> -->
					<li>
						<a href="#"><i class="fa fa-circle-o"></i>Listar Orcamentos</a>
					</li>
					<li>
						<a href="#"><i class="fa fa-circle-o"></i>Adicionar Orcamento</a></a>
					</li>
					<!-- <li><a href="index2.html"><i class="fa fa-circle-o"></i> Dashboard v2</a></li> -->
				</ul>
			</li>
		</ul>
	</section>
	<!-- /.sidebar -->
</aside>



*/