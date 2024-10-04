document.getElementById("FormularioFactura").addEventListener("submit",function validar(event){ //ejecutar esta función 
                                                                            //cuando el usuario envía el formulario

    event.preventDefault(); //evitar que el formulario se envie y además, evitar que se refresque la pagina

    let inputs=document.getElementsByTagName("input"); //obtener todos las referencias de los elementos input

    let nulidad=false; //iniciar nulida en falso

    for(let input of inputs){ //recorrer cada input traidos del DOM
        if(input.value==""){ //ejecutar este bloque si hay nulidad en algún input
            alert("Rellene todos los campos"); //saltar esta alerta
            nulidad=true; //convertir a verdadero la nulidad
            break; //romper ciclo, para evitar una pérdida innecesaria de recursos y ejecución
        }
    }

    if(nulidad==false){ //si es falso, fue porque nunca encontró inputs vacios

        validarCodigos(); //llamar  a esta función

    }


},false);

async function validarCodigos(){ 

    //funcion llamada si nunca hubo nulidad en los inputs

    let respuestaCliente=await fetch("http://127.0.0.1:5000/existenciaCliente/"+campoCliente.value);
    //comunicar con el recurso 'existenciaCliente', cuyo parametro es el valor de la variable  campoCliente

    let existenciaCliente=await respuestaCliente.text(); //converit a texto
    
    let respuestaAsesor=await fetch("http://127.0.0.1:5000/existenciaAsesor/"+campoAsesor.value);
    //otra solicitud

    let existenciaAsesor=await respuestaAsesor.text(); //convertir a texto la respuesta

    if(existenciaCliente=="no existe" || existenciaAsesor=="no existe"){
        //con que alguna respuesta sea 'no existe' no se agrega la factura
        alert("Código(s) no existe");
    }else{
        // insertar la factura. Llamando a 'agregarNuevaFactura', definida en 'generacionFactura.js'
        agregarNuevaFactura();
    }


}