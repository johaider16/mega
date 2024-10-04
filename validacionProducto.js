let campoProducto=document.getElementById("codProducto"); //obtener del DOM el input que captura el Codigo Producto

let focusoutProducto=true;

campoProducto.addEventListener("focusout",function validar(){ //validar() se ejecuta cuando el input que captura el 
                                                                //Codigo Producto pierde el foco

    comprobarExistenciaProducto();

},false);

async function comprobarExistenciaProducto(){ 
    let valorCampoProducto=campoProducto.value; //obtener el texto que se introdujo en el input que captura el Codigo 
                                                    //Producto

    if(focusoutProducto==true){ //si la pérdida del foco la hizo el usuario ( no focus() ) ejecuta este bloque if
        if(valorCampoProducto==""){
            alert("Diga el codigo del producto"); //mostrar alert si está nulo el campo Codigo Producto
            focusoutProducto=false; //convertir a false para que a la próxima, no entre a esta validación
            campoProducto.focus(); //volver a activar el foco del campo Codigo Producto
        }else{

            let respuesta=await fetch("http://127.0.0.1:5000/existenciaProducto/"+valorCampoProducto);
            //comunicacion con el recurso 'existenciaProducto', enviando como parametro el texto que hay en el input Codigo Producto

            let existe=await respuesta.json(); //Convertir respuesta a formato JSON
        
            if(existe["estado"]=="no existe"){ //Si la respuesta del recurso (convertido a JSON) trae 'no existe' en la 
                                                    //clave 'estado' ejecutar este bloque

                alert("El codigo del producto no existe")

                document.getElementById("campoDescripcion").value=""; //vaciar descripcion

                document.getElementById("campoPrecio").value=""; //vaciar precio

                focusoutProducto=false; //convertir a false para que a la próxima, no entre a esta validación
                
                campoProducto.focus(); //volver a activar el foco del campo Codigo Producto
            }else{

                //Al estar acá es porque la validación pasó: No hay nulidad y el id producto existe

                document.getElementById("campoDescripcion").value=existe["descripcion"];
                //asignar valor al campo descripcion, a base de los datos convertidos del JSON

                document.getElementById("campoPrecio").value=existe["precio"];
                //asignar valor al campo precio, a base de los datos convertidos del JSON

            }

        }
    }else{
        focusoutProducto=true;
    }
    
}