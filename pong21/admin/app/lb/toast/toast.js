/*!
 * TOAST
 *
 * @version 1.0.0
 *
 * @author Inspyre Web Systems
 * @author Denis Carvalho Silva
 */

// TOAST - TOAST SIMPLES PARA MENSAGENS
/* 
 * USO HTML: <button onClick="toast.info(string message)">texto do botão</button>
 * USO JS: toast.info(string message)
 * 
 * Outras Opções de cores:
 * 
 * toast-info(string)
 * toast-success(string)
 * toast-danger(string)
 * toast-primary(string)
 * toast-warning(string)
 * toast-alert(string)
 * 
 */

toast = {
        info: function (message) {
            $('div.toast').each(function(){ $(this).remove(); });
            $('body').append(toast.body(message, 'info'));
            toast.show($('.toast').width());
        },
        success: function (message) {
            $('div.toast').each(function(){ $(this).remove(); });
            $('body').append(toast.body(message, 'success'));
            toast.show($('.toast').width());
        },
        danger: function (message) {
            $('div.toast').each(function(){ $(this).remove(); });
            $('body').append(toast.body(message, 'danger'));
            toast.show($('.toast').width());
        },
        primary: function (message) {
            $('div.toast').each(function(){ $(this).remove(); });
            $('body').append(toast.body(message, 'primary'));
            toast.show($('.toast').width());
        },
        warning: function (message) {
            $('div.toast').each(function(){ $(this).remove(); });
            $('body').append(toast.body(message, 'warning'));
            toast.show($('.toast').width());
        },
        alert: function (message) {
            $('div.toast').each(function(){ $(this).remove(); });
            $('body').append(toast.body(message, 'alert'));
            toast.show($('.toast').width());
        },
        show: function ( w ){
            $('.toast').animate({"right":"-14px"}, "slow").delay(3000).animate({"right":"-"+(w-40)+"px"}, "slow").delay(1500).fadeOut();
        },
        hide: function ( _el ) {
            $(_el).hide();
        },
        body: function (message, style){
            var html  = '<div class="animate toast toast-'+style+'" onClick="toast.hide(this)" onmouseover="toast.hide(this)">';
                html += '   <div class="content-toast">';
                html += '       <span class="bol_target"></span>';
                html += '       <p class="message-tost">'+message+'</p>';
                html += '   </div>';
                html += '   <span class="bar_target"></span>';
                html += '</div>';
            return html;
        }
    };