import re
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'tickets_on'
mysql = MySQL(app)

app.secret_key = "mysecretkey"


@app.route('/ingresar', methods=["POST"])
def ingresar():
    usu = request.json.get("usuario", None)
    con = request.json.get("contraseña", None)
    cur = mysql.connection.cursor()
    cur.execute(
        'SELECT  usuario, password from usuarios  where usuario = %s', (usu,))
    rv = cur.fetchall()
    cur.close()
    for result in rv:

        if usu == result[0] and con == result[1]:
            response = {"msg": "Access"}
            return response

        return {"msg": "Wrong email or password"}, 401


@app.route('/insert', methods=["POST"])
def insert():
    try:
        nombre = request.json['nombre']
        apellido = request.json['apellido']
        tipo_documento = request.json['tipo_documento']
        numero_documento = request.json['numero_documento']
        correo = request.json['correo']
        telefono = request.json['telefono']
        direccion = request.json['direccion']
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO clientes (nombre,apellido,tipo_documento,numero_documento,email,telefono,direccion,fecha) values (%s,%s,%s,%s,%s,%s,%s,now())",
                    (nombre, apellido, tipo_documento, numero_documento, correo, telefono, direccion))
        mysql.connection.commit()
        return jsonify({"Informacion": "Registro exitoso!!"})
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})


@app.route('/GetUsuarios', methods=['GET'])
def GetUsuarios():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT nombre,apellido,tipo_documento.documento,numero_documento,email,telefono,direccion  FROM clientes inner join tipo_documento on tipo_documento.id_tipo_documento = clientes.tipo_documento ')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'nombre': result[0], 'apellido': result[1], 'descripcion': result[2],
                       'numero_documento': result[3], 'email': result[4], 'telefono': result[5],
                       'direccion': result[6]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})


@app.route('/actualizar', methods=['PUT'])
def updateusuario():
    try:
        numero_documento = request.json['numero_documento']
        email = request.json['email']
        telefono = request.json['telefono']
        direccion = request.json['direccion']
        cur = mysql.connection.cursor()
        cur.execute("""update clientes
        set email=%s,
        telefono=%s,
        direccion=%s
        where numero_documento = %s
                """, (email, telefono, direccion, numero_documento))
        mysql.connection.commit()
        return jsonify({"Informacion": "Registro Actualizado"})
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})


@app.route('/deleteUsuario/<Id>', methods=['DELETE'])
def deleteUsuario(Id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('delete from clientes where numero_documento =%s',  (Id,))
        mysql.connection.commit()
        return jsonify({"informacion": "Registro eliminado"})
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})


@app.route('/innerjoin', methods=["GET"])
def innerjoin():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT clientes.numero_documento ,tipo_documento.documento ,email,telefono,direccion,tickets.id_tickets , ciudades.ciudad, horarios.descripcion_horario ,horarios.Hora ,ciudades.precio  FROM tickets_on.clientes inner join tipo_documento on clientes.tipo_documento = tipo_documento.id_tipo_documento inner join tickets on tickets.numero_documento_cliente = clientes.numero_documento inner join horarios on horarios.id_horario = tickets.id_horario left join ciudades on tickets.id_Ciudad = ciudades.id_ciudad')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'numero_documento': result[0], 'documento': result[1], 'email': result[2], 'telefono': result[3], 'dirrecion': result[4],
                       'id_tickets': result[5], 'ciudad': result[6], 'descripcion_horario': result[7], 'precio': result[9]}

            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})


@app.route('/orderby', methods=["GET"])
def orderby():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT clientes.numero_documento ,tipo_documento.documento ,email,telefono,direccion,tickets.id_tickets , ciudades.ciudad, horarios.descripcion_horario ,horarios.Hora ,ciudades.precio  FROM tickets_on.clientes inner join tipo_documento on clientes.tipo_documento = tipo_documento.id_tipo_documento inner join tickets on tickets.numero_documento_cliente = clientes.numero_documento inner join horarios on horarios.id_horario = tickets.id_horario left join ciudades on tickets.id_Ciudad = ciudades.id_ciudad order by precio asc')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'numero_documento': result[0], 'documento': result[1], 'email': result[2], 'telefono': result[3], 'dirrecion': result[4],
                       'id_tickets': result[5], 'ciudad': result[6], 'descripcion_horario': result[7], 'precio': result[9]}

            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})


@app.route('/max', methods=["GET"])
def max():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT clientes.numero_documento ,tipo_documento.documento ,email,telefono,direccion,tickets.id_tickets , ciudades.ciudad, horarios.descripcion_horario  , max(ciudades.precio)  FROM tickets_on.clientes inner join tipo_documento on clientes.tipo_documento = tipo_documento.id_tipo_documento inner join tickets on tickets.numero_documento_cliente = clientes.numero_documento inner join horarios on horarios.id_horario = tickets.id_horario left join ciudades on tickets.id_Ciudad = ciudades.id_ciudad')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'numero_documento': result[0], 'documento': result[1], 'email': result[2], 'telefono': result[3], 'dirrecion': result[4],
                       'id_tickets': result[5], 'ciudad': result[6], 'descripcion_horario': result[7], 'precio': result[8]}

            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})

@app.route('/min', methods=["GET"])
def min():
    try:
        cur = mysql.connection.cursor()
        cur.execute('select numero_documento_cliente,ciudad, min(precio) as "precio" from tickets inner join ciudades on ciudades.id_ciudad = tickets.id_Ciudad')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'numero_documento_cliente': result[0], 'ciudad': result[1], 'precio': result[2]}

            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})

@app.route('/count', methods=["GET"])
def count():
    try:
        cur = mysql.connection.cursor()
        cur.execute('select ciudad,count(ciudad) as "TIQUETES_COMPRADOS" from tickets  inner join ciudades on ciudades.id_ciudad = tickets.id_Ciudad group by ciudad order by  precio asc')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'ciudad': result[0], 'TIQUETES_COMPRADOS': result[1]}

            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})

@app.route('/sum', methods=["GET"])
def sum():
    try:
        cur = mysql.connection.cursor()
        cur.execute('select ciudad,sum(precio) as "VENTA_TOTAL" from tickets  inner join ciudades on ciudades.id_ciudad = tickets.id_Ciudad group by ciudad order by  precio asc')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'ciudad': result[0], 'VENTA_TOTAL': result[1]}

            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})

if __name__ == "__main__":
    app.run(port=3000, debug=True)
