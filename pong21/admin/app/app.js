
var app = angular.module('myApp',['ngRoute']);

app.config(function($routeProvider)
{
	$routeProvider

	.when('/home', {
		templateUrl : 'app/views/home.htm',
	})




	/*************************************************************************************************************/
	/* Tabelas da Aplicação */
	/*************************************************************************************************************/
	// Tabela: jogadores
	.when('/jogadores', {
		templateUrl : 'app/views/jogadores.htm',
	})
	.when('/adicionar_jogadores', {
		templateUrl : 'app/views/adicionar_jogadores.htm',
	})
	.when('/editar_jogadores', {
		templateUrl : 'app/views/editar_jogadores.htm',
	})

	
	// Tabela: jogo_atual
	.when('/jogo_atual', {
		templateUrl : 'app/views/jogo_atual.htm',
	})
	.when('/adicionar_jogo_atual', {
		templateUrl : 'app/views/adicionar_jogo_atual.htm',
	})
	.when('/editar_jogo_atual', {
		templateUrl : 'app/views/editar_jogo_atual.htm',
	})

	
	// Tabela: jogos
	.when('/jogos', {
		templateUrl : 'app/views/jogos.htm',
	})
	.when('/adicionar_jogos', {
		templateUrl : 'app/views/adicionar_jogos.htm',
	})
	.when('/editar_jogos', {
		templateUrl : 'app/views/editar_jogos.htm',
	})

	




	/*************************************************************************************************************/
	/* Perfil */
	/*************************************************************************************************************/
	.when('/perfil_editar', {
		templateUrl : 'app/views/perfil_editar.htm',
	})

	.when('/perfil_trocar_senha', {
		templateUrl : 'app/views/perfil_trocar_senha.htm',
	})





	/*************************************************************************************************************/
	/* Usuario */
	/*************************************************************************************************************/
	.when('/usuario_lista', {
		templateUrl : 'app/views/usuario_lista.htm',
	})

	.when('/usuario_adiciona', {
		templateUrl : 'app/views/usuario_adiciona.htm',
	})

	.when('/usuario_edita', {
		templateUrl : 'app/views/usuario_edita.htm',
	})

	.when('/usuario_nivel_acesso', {
		templateUrl : 'app/views/usuario_nivel_acesso.htm',
	})

	.when('/usuario_nivel_acesso_adicionar', {
		templateUrl : 'app/views/usuario_nivel_acesso_adicionar.htm',
	})

	.when('/usuario_nivel_acesso_editar', {
		templateUrl : 'app/views/usuario_nivel_acesso_editar.htm',
	})

	.when('/acesso_bloqueado', {
		templateUrl : 'app/views/acesso_bloqueado.htm',
	})





	/*************************************************************************************************************/
	/* Upload */
	/*************************************************************************************************************/
	// Resultado do Upload
	.when('/upload_result', {
		templateUrl : 'app/views/upload_result.php',
	})

	// Upload de Imagem	
	.when('/upload_imagem', {
		templateUrl : 'app/views/upload_imagem.htm',
	})

	.when('/upload_imagem_view', {
		templateUrl : 'app/views/upload_imagem_view.htm',
	})


	// Upload de Video
	.when('/upload_video', {
		templateUrl : 'app/views/upload_video.htm',
	})

	.when('/upload_video_view', {
		templateUrl : 'app/views/upload_video_view.htm',
	})


	// Upload de Audio
	.when('/upload_audio', {
		templateUrl : 'app/views/upload_audio.htm',
	})

	.when('/upload_audio_view', {
		templateUrl : 'app/views/upload_audio_view.htm',
	})


	// Upload de Arquivo de Texto
	.when('/upload_texto', {
		templateUrl : 'app/views/upload_texto.htm',
	})

	.when('/upload_texto_view', {
		templateUrl : 'app/views/upload_texto_view.htm',
	})





	
	/*************************************************************************************************************/
	/* Maps */
	/*************************************************************************************************************/
	// Consultar Latitude e Longitude
	.when('/maps_Lat_Lng', {
		templateUrl : 'app/views/maps_Lat_Lng.htm',
	})





	/*************************************************************************************************************/
	/* Arquivos */
	/*************************************************************************************************************/
	// Movimentação de Arquivo (Imagem)
	.when('/mov_img', {
		templateUrl : 'app/views/mov_img.htm',
	})





	/*************************************************************************************************************/
	/* Relatórios */
	/*************************************************************************************************************/
	// Crud Relatório
	.when('/pdf_emiti', {
		templateUrl : 'app/views/pdf_emiti.htm',
	})

	.when('/pdf_lista', {
		templateUrl : 'app/views/pdf_lista.htm',
	})

	.when('/pdf_adiciona', {
		templateUrl : 'app/views/pdf_adiciona.htm',
	})

	.when('/pdf_edita', {
		templateUrl : 'app/views/pdf_edita.htm',
	})





	/*************************************************************************************************************/
	/* Notificações */
	/*************************************************************************************************************/
	.when('/notif_lista', {
		templateUrl : 'app/views/notif_lista.htm',
	})

	.when('/notif_lista_config', {
		templateUrl : 'app/views/notif_lista_config.htm',
	})

	.when('/notif_adicionar_notificacoes', {
		templateUrl : 'app/views/notif_adicionar_notificacoes.htm',
	})

	.when('/notif_editar_notificacoes', {
		templateUrl : 'app/views/notif_editar_notificacoes.htm',
	})





	/*************************************************************************************************************/
	/* Grades */
	/*************************************************************************************************************/


	// Grades: historico_jogo-jogos
	.when('/grade_historico_jogo-jogos', {
		templateUrl : 'app/views/grade_historico_jogo-jogos.htm',
	})
	.when('/adicionar_grade_historico_jogo-jogos', {
		templateUrl : 'app/views/adicionar_grade_historico_jogo-jogos.htm',
	})
	.when('/editar_grade_historico_jogo-jogos', {
		templateUrl : 'app/views/editar_grade_historico_jogo-jogos.htm',
	})





	.otherwise ({ redirectTo: '/home' });
});
