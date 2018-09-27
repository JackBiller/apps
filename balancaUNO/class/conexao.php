
<?php
class Conexao {
	private static $conexao = null;
	
	function __construct() {

		$db_host = "localhost";
		$db_nome = "balanca";
		$db_usuario = "root";
		$db_senha = "";
		$db_driver = "mysql";
		
		try{
			# Atribui o objeto PDO à variável $conexao.
			self::$conexao = new PDO("$db_driver:host=$db_host; dbname=$db_nome", $db_usuario, $db_senha, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
			# Garante que o PDO lance exceções durante erros.
			self::$conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		}
		catch (PDOException $e){
			# Então não carrega nada mais da página.
			echo 'ERROR: ' . $e->getMessage();
		}
	}
	private function __clone() {}

	private function __wakeup() {}
	
	public static function Connect() {
		if(!isset(self::$conexao)) {
			new Conexao();
		}
		return self::$conexao;
	}
}












function toJson($variavel){
    $resultado = $variavel;
         if(gettype($variavel) == 'object') $resultado = objectEmJson($variavel);
    else if(gettype($variavel) == 'array' ) $resultado = arrayEmJson($variavel);

    return $resultado;
}


function objectEmJson($objeto){
    $class_vars = get_class_vars(get_class($objeto));
    $arrayObjeto = [];

    foreach ($class_vars as $name => $value) {
        array_push($arrayObjeto, $name , $objeto->get($name));
    }

    $verifica = true;
    $primeiro = true;
    $stringArray = "";
    $preStringArray = "";
    $oldValue = "teste";
    foreach ($arrayObjeto as $key => $value) {
        if ($verifica) {
            $preStringArray = $primeiro ? "{\"".$value."\":" : ",\"".$value."\":";
            $verifica = false;
        } else {
            switch (gettype($value)) {
                case 'string':
                    $stringArray .= $preStringArray."\"".$value."\"";
                    break;
                case 'integer':
                    $stringArray .= $preStringArray.$value;
                    break;
                case 'double':
                    $stringArray .= $preStringArray.$value;
                    break; 
                case 'floute':
                    $stringArray .= $preStringArray.$value;
                    break;
                case 'boolean':
                    $stringArray .= $value ? $preStringArray."1" : $preStringArray."0";
                    break;
                case 'object':
                    $stringArray .= $preStringArray.objectEmJson($value);
                    break;
                case 'array':
                    $stringArray .= $preStringArray.arrayEmJson($value);
                    break;
                case 'NULL':
                    /* $stringArray .= $preStringArray.arrayEmJson($value); */
                    break;
                default:
                    $stringArray .= $preStringArray."\"".$value."\"";
                    break;
            }
            if (gettype($value) != 'NULL') $primeiro = false;
            $verifica = true;
        }
    }
    return $stringArray."}";
}



function arrayEmJson($array){
    $stringArray = "[";
    $primeiro = true;

    foreach ($array as $key => $value) {
        switch (gettype($value)) {
            case 'string':
                $stringArray .= $primeiro ? "{\"".$key."\": \"".$value."\"}" : ",{\"".$key."\": \"".$value."\"}";
                break;
            case 'interger':
                $stringArray .= $primeiro ? "{".$key.": ".$value."}" : ",{".$key.": ".$value."}";
                break;
            case 'double':
                $stringArray .= $primeiro ? "{".$key.": ".$value."}" : ",{".$key.": ".$value."}";
                break; 
            case 'floute':
                $stringArray .= $primeiro ? "{".$key.": ".$value."}" : ",{".$key.": ".$value."}";
                break;
            case 'boolean':
                $value = $value ? "1" : "0";
                $stringArray .= $primeiro ? "{".$key.": ".$value."}" : ",{".$key.": ".$value."}";
                break;
            case 'object':
                $stringArray .= $primeiro ? objectEmJson($value) : ",".objectEmJson($value);
                break;
            case 'array':
                $stringArray .= $primeiro ? arrayEmJson($value) : ",".arrayEmJson($value);
                break;
            default:
                $stringArray .= "\"".$value."\"";
                break;
        }
        $primeiro = false;
    }
    return $stringArray."]";
}


/* 
function chegouNaMina($resposta){
    $resultado = "não, porque o não você ja tem antes mesmo de chegar kkkkk";
    if($resposta == "sim") $resultado = "feliz, fode ai que ta tudo certo kkkkkkkkkkkkkkkkkk";
    else if($resposta == "talves" ) $resultado = "freidzone, se si fudeu haahahahahahh";
    esle $resultado = "Vida que segue e ja era ;)";
    return $resultado;
}
*/


?>