#importar dependencias
from flask import Flask, request, jsonify,render_template,send_file
import MySQLdb
from flask_cors import CORS

app = Flask(__name__)  #crear app web

CORS(app) #configurarla con CORS, para admitir solicitud y respuesta de diferentes origenes


@app.route("/")
def index():
    path = "index.html"

    return send_file(path)

@app.route("/existenciaCliente/<idCliente>")
def existenciaCliente(idCliente):
    id=int(idCliente) #obtener el id cliente, en los parametros

    conexion=MySQLdb.connect("localhost","root","1038384392","megacomercial") #conexion a DB

    cursor=conexion.cursor()  #crear cursor para hacer consultas

    ejecucionSentencia=cursor.execute(f"SELECT * FROM cliente WHERE id_cliente={id}") #ejecutarla

    if(ejecucionSentencia==1): #si la longitud del resultado de ejecutar la sentencia anterior es 1, ejecuta este bloque
        return "existe" #este recurso retorna este texto
    else:
        return "no existe" #puede retornar este otro, si no haya coincidencias luego de la consulta
    

@app.route("/existenciaAsesor/<idAsesor>")
def existenciaAsesor(idAsesor):
    id=int(idAsesor) #obtener el id asesor, en los parametros

    conexion=MySQLdb.connect("localhost","root","1038384392","megacomercial") #conexion a DB

    cursor=conexion.cursor()  #crear cursor para hacer consultas

    ejecucionSentencia=cursor.execute(f"SELECT * FROM asesor WHERE id_asesor={id}") #se ejecuta esta sentencia

    if(ejecucionSentencia==1):#si la longitud del resultado de ejecutar la sentencia anterior es 1, ejecuta este bloque
        return "existe"
    else:
        return "no existe" #puede retornar este otro, si no haya coincidencias luego de la consulta


@app.route("/existenciaProducto/<idProducto>")
def existenciaProducto(idProducto):
    id=int(idProducto) #obtener id del producto desde los parametros

    conexion=MySQLdb.connect("localhost","root","1038384392","megacomercial") #conexion a DB

    cursor=conexion.cursor()  #cursor para hacer consultas

    ejecucionSentencia=cursor.execute(f"SELECT descripcion_producto, precio_unitario_producto FROM producto WHERE id_producto={id}") #ejecutar esta sentencia

    if(ejecucionSentencia==0): #si no hay coincidencias (==0) devuelve este JSOn con el estado:no existe
        return jsonify( {"estado":"no existe"} ) #retorno de esta respuesta, si no existe el producto

    #si pasó acá fue porque si hubo coincidencia del producto

    datos=cursor.fetchall() #convertir a tupla los registros devueltos por MySQL

    descripcion=datos[0][0] #desempaquetar la tupla y obtener el valor en posicion 0:0 y guardarlo en la descripcion

    precio=datos[0][1] #desempaqutar la tupla y obtener el valor en posicion 0:1 y guardalos en la variable precio

    return jsonify( {"estado":"existe", "descripcion":descripcion, "precio":precio} ) 
    #retornar respuesta del recurso convertida a JSON

    
@app.route("/insertarFactura", methods=['POST']) 
def insertarFactura():
    
    datos=request.get_json() #obtener el cuerpo (body)
    
    #obtener los valores de todas las claves entrantantes en el cuerpo de la solicitud

    codCliente=datos.get("codigoCliente")
    codAsesor=datos.get("codigoAsesor")
    codProducto=datos.get("codigoProducto")
    cantidad=datos.get("cantidad")
    formaPago=datos.get("formaPago") #Efectivo

    conexion=MySQLdb.connect("localhost","root","1038384392","megacomercial") #conexion a DB

    cursor=conexion.cursor() #crear cursor

    cursor.execute(f"INSERT INTO factura(id_factura, id_cliente, id_asesor, id_producto, cantidad_de_producto, forma_de_pago) VALUES (0,{codCliente}, {codAsesor}, {codProducto}, {cantidad}, '{formaPago}')")
    #insercion a tabla factura, con los valores obtenidor del cuerpo de la solicitud

    conexion.commit()   #activar ejecución de actualizacion a la base de datos (UPDATE, INSERT, DELETE)

    return "insertado" #devolucion de este recurso
    


@app.route("/factura")
def mostrarFactura():

    conexion=MySQLdb.connect("localhost","root","1038384392","megacomercial") #conexion a DB

    cursor=conexion.cursor() #cursor

    cursor.execute("SELECT id_factura, nombre_cliente, nombre_producto, cantidad_de_producto, (cantidad_de_producto*precio_unitario_producto)as total FROM factura inner join cliente on factura.id_cliente=cliente.id_cliente inner join producto on producto.id_producto=factura.id_producto ORDER BY id_factura DESC LIMIT 1")
    #ejecutar consulta a la base de datos



    datosFactura=cursor.fetchall() #obtener los registros de la consulta; devuelve la tupla

    # Desempaquetar los datos de la tupla

    id_factura=datosFactura[0][0]
    nombre_cliente=datosFactura[0][1]
    nombre_producto=datosFactura[0][2]
    cantidad=datosFactura[0][3]
    total=datosFactura[0][4]

    return jsonify( {"id_factura":id_factura, "nombre_cliente":nombre_cliente, "nombre_producto":nombre_producto, "cantidad":cantidad, "total":total} )  #devolver JSON con todos los datos de la factura



@app.route("/productosAgregados")
def productosAgregados():
    conexion=MySQLdb.connect("localhost","root","1038384392","megacomercial") #conexion DB

    cursor=conexion.cursor() #cursor para consultas

    ejecucionSentencia=cursor.execute("select id_factura, nombre_producto, cantidad_de_producto from factura inner join producto on factura.id_producto=producto.id_producto")
    #ejecutar esta consulta

    datos=cursor.fetchall() #generar tupla de salida de la consulta

    return jsonify({"productos":datos}) #devolucion de este JSON, por este recurso


@app.route("/mostrarNuevoProducto")
def nuevoProducto():
    conexion=MySQLdb.connect("localhost","root","1038384392","megacomercial") #conexion DB

    cursor=conexion.cursor() #creacion cursor

    cursor.execute("SELECT id_factura, nombre_producto, cantidad_de_producto FROM factura inner join producto on producto.id_producto=factura.id_producto ORDER BY id_factura DESC LIMIT 1") #ejecucion sentencia

    datosFactura=cursor.fetchall() #generar tupla de salida de la consulta

    return jsonify( {"ultimoFactura":datosFactura} ) #retornar JSON de los datos de la ultima factura

if __name__=="__main__": #si al modulo actual es __main__ es servidor se prende
    app.run(debug=True) #correr el servidor con el debugger activado