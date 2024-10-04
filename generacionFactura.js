//obtener referencia de todos los inputs del formulario

let campoCliente=document.getElementById("codCliente");

let campoAsesor=document.getElementById("codAsesor");


let campoCantidad=document.getElementById("cantidad");

let campoFormaPago=document.getElementById("formaPago");

async function agregarNuevaFactura(){ //método llamado luego de la validación OK del envío del formulario

    let respuesta=await fetch("http://127.0.0.1:5000/insertarFactura", { method:"POST" , headers:{'Content-Type': 'application/json'} , 
        body: JSON.stringify( {"codigoCliente":campoCliente.value, "codigoAsesor":campoAsesor.value, 
            "codigoProducto":campoProducto.value, "cantidad":campoCantidad.value, "formaPago":campoFormaPago.value} ) });
    //Enviar solicitud con datos en su cuerpo, los cuales corresponden al valor de cada input. Hay referencias de inputs declaradas desde otros <script> diferente a esta


    let insercion = await respuesta.text(); //convertir la respuesta de la solicitud a texto

    if(insercion=="insertado"){ //si la respuesta devuelve "insertado", todo salió bien y se genera la factura
        generarFactura();
    }
    

}

async function generarFactura(){

    //Esta función se llama si la factura de insertó correctamente

    let respuesta = await fetch("http://127.0.0.1:5000/factura"); //solicitud al recurso 'factura'

    let datosFactura= await respuesta.json() //convertir la respuesta a formato JSON

    let factura=document.getElementById("Factura"); //obtener del DOM la referencia del elemento 'Factura' ( <section> )

    factura.innerHTML="<h2># Factura: "+datosFactura["id_factura"]+"</h2> <h2>Nombre Cliente: "+datosFactura["nombre_cliente"]+"</h2> <h2>Nombre Producto: "+datosFactura["nombre_producto"]+"</h2> <h2>Cantidad: "+datosFactura["cantidad"]+"</h2> <h2>Total: "+datosFactura["total"]+"$</h2>";
    //Sobreescribir contenido del <section> Factura, por esta estructura; mostrando los datos de factura con los valores traidos en la respuesta del recurso


    let inputs=document.getElementsByClassName("campoForm"); //obtener todos los inputs con class="campoForm"

    for(let input of inputs){ //recorrer cada input coincidente con class="campoForm" y vaciarlo
        input.value=""; //vaciar el input especifico
    }
    
    mostrarNuevoProductoAgregado(); //Método definido en 'cargarProductosAgregados.js' para agregar a la cola el nuevo producto agregado en base a esta factura

}