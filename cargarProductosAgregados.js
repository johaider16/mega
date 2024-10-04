window.addEventListener("load",function cargarProductos(){ //ejecutar esta función interna, cuando la ventana se cargue
    
    //Al la ventana cargarse, ejecuta la función 'mostrarProductosAgregador()'
    mostrarProductosAgregados();

},false);

let tabla=document.getElementById("productosAgregados"); //Obtener del DOM la referencia del elemento con id        
                                                        //"productosAgregador"; el cual equivale a una <table>

async function mostrarProductosAgregados(){

    //Función encargada de poblar y llenar la tabla con todos los productos que han sido agregados

    let respuesta=await fetch("http://127.0.0.1:5000/productosAgregados"); //comunicación con el recurso   
                                                                            //'productosAgregados'

    let todosLosProductos=await respuesta.json();//convertir la respuesta del recurso, a un formato válido de lectura:JSON

    let productos=todosLosProductos["productos"]; //Acceder al valor de la clave "productos", que guarda una matriz con 
                                                    // los resultados de la DB con los productos agg


    let registrosTabla="<tr><th># Pedido</th><th>Producto</th><th>Cantidad</th></tr>"; //inicializar los encabezados que 
                                                                                        //serán actualizados en la <table>

    for(let datos of productos){ //recorrer la matrix y obtener cada valor de cada sub-lista, y agregarla a la estructura 
                                    //de la tabla (<tr><td>)

        registrosTabla+="<tr><td>"+datos[0]+"</td><td>"+datos[1]+"</td><td>"+datos[2]+"</td></tr>"
        //acumular las filas y columnas con sus valores; para luego ser agregados al interior de la <table>
    }

    tabla.innerHTML=registrosTabla; //Sobreescribir contenido de elemento 'tabla' (<table>) y asignarle la acumulación de 
                                        //la estructura de las tablas <tr><td>

}

//función llamada cuando la factura se genera correctamente; con el objetivo de agregar el nuevo producto a la cola de la tabla
async function mostrarNuevoProductoAgregado(){
    let respuesta=await fetch("http://127.0.0.1:5000/mostrarNuevoProducto");

    let datos=await respuesta.json();

    let ultimaFactura=datos["ultimoFactura"]; //recupera el valor de la clave "ultimaFactura" devuelta por el recurso solicitado.

    tabla.innerHTML+="<tr><td>"+ultimaFactura[0][0]+"</td><td>"+ultimaFactura[0][1]+"</td><td>"+ultimaFactura[0][2]+"</td><tr>"; 
    //acumular contenido de 'tabla' (<table>) y agregarle una nueva fila con varias columnas de los valores devueltos por el recurso (matriz)

}