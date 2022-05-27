function login() {
  let usuario, contraseña;
  usuario = document.getElementById("txtusuario").value;
  contraseña = document.getElementById("txtpassword").value;

  if (usuario == "" || contraseña == "") {
    alert("ERROR, VERIFIQUE LOS DATOS INGRESADOS");
  } else {
    let data = {
      usuario: usuario,
      contraseña: contraseña,
    };
    axios
      .post("http://127.0.0.1:3000/ingresar", data)
      .then(function (response) {
        console.log(response);
        if (response) {
          window.open("html/crud.html");
          window.close();
          document.getElementById("txtusuario").reset();
          document.getElementById("txtpassword").reset();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

function crearUsuario() {
  var usuario, contraseña;
  usuario = document.getElementById("txtusuario").value;
  contraseña = document.getElementById("txtpassword").value;
  var usu = usuario.substring(0, 2);
  var pass = contraseña.substring(0, 2);
  alert(usu + pass);
  console.log(usu);
}

function InsertCliente() {
  let nombre,
    apellido,
    tipo_documento,
    numero_documento,
    correo,
    telefono,
    direccion;

  nombre = document.getElementById("txtnombre").value;
  apellido = document.getElementById("txtapellido").value;
  tipo_documento = document.getElementById("cmbtipodocumento").value;
  numero_documento = document.getElementById("txtnumerodocumento").value;
  correo = document.getElementById("txtcorreo").value;
  telefono = document.getElementById("txttelefono").value;
  direccion = document.getElementById("txtdirrecion").value;

  let data = {
    nombre: nombre,
    apellido: apellido,
    tipo_documento: tipo_documento,
    numero_documento: numero_documento,
    correo: correo,
    telefono: telefono,
    direccion: direccion,
  };

  if (
    nombre == "" ||
    apellido == "" ||
    tipo_documento == 0 ||
    numero_documento == "" ||
    correo == "" ||
    telefono == "" ||
    direccion == ""
  ) {
    alert("Error, por favor verificar los campos!");
  } else {
    axios
      .post("http://127.0.0.1:3000/insert", data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    alert("Registro exitoso!");
    document.getElementById("formulario").reset();
  }
}

function getUsuarios() {
  let user;
  let infoForm = {};
  axios.get("http://127.0.0.1:3000/GetUsuarios").then(function (response) {
    console.log(response);
    console.log(response.data[0].nombre);
    user = JSON.stringify(response);
    console.log(user);

    document.getElementById("cuerpoclientes").innerHTML = "";

    for (let x in response.data) {
      infoForm["NOMBRE"] = response.data[x].nombre;
      infoForm["APELLIDO"] = response.data[x].apellido;
      infoForm["TIPODOCUMENTO"] = response.data[x].descripcion;
      infoForm["NUMERODOCUMENTO"] = response.data[x].numero_documento;
      infoForm["EMAIL"] = response.data[x].email;
      infoForm["TELEFONO"] = response.data[x].telefono;
      infoForm["DIRRECION"] = response.data[x].direccion;

      document.getElementById("tablaclientes").style.display = "block";
      document.getElementById("cuerpoclientes").innerHTML += "";

      tabla = document.getElementById("cuerpoclientes");
      filanueva = tabla.insertRow(tabla.length);

      cell1 = filanueva.insertCell(0);
      cell1.innerHTML = infoForm.NOMBRE;

      cell2 = filanueva.insertCell(1);
      cell2.innerHTML = infoForm.APELLIDO;

      cell3 = filanueva.insertCell(2);
      cell3.innerHTML = infoForm.TIPODOCUMENTO;

      cell4 = filanueva.insertCell(3);
      cell4.innerHTML = infoForm.NUMERODOCUMENTO;

      cell5 = filanueva.insertCell(4);
      cell5.innerHTML = infoForm.EMAIL;

      cell6 = filanueva.insertCell(5);
      cell6.innerHTML = infoForm.TELEFONO;

      cell7 = filanueva.insertCell(6);
      cell7.innerHTML = infoForm.DIRRECION;

      cell8 = filanueva.insertCell(7);
      cell8.innerHTML = `<a class="btn btn-warning mx-2 " onClick="onEdit(this)">Edit</a>
   <a class= "btn btn-danger " onClick="ondelete(this) ">Delete</a>`;
    }
  });
}

function cargarusuarios() {
  let user;
  let infoForm = {};
  axios.get("http://127.0.0.1:3000/GetUsuarios").then(function (response) {
    console.log(response);
    console.log(response.data[0].email);
    user = JSON.stringify(response);
    console.log(user);

    document.getElementById("cuerpoclientes").innerHTML = "";

    for (let x in response.data) {
      infoForm["NOMBRE"] = response.data[x].nombre;
      infoForm["APELLIDO"] = response.data[x].apellido;
      infoForm["TIPODOCUMENTO"] = response.data[x].descripcion;
      infoForm["NUMERODOCUMENTO"] = response.data[x].numero_documento;
      infoForm["EMAIL"] = response.data[x].email;
      infoForm["TELEFONO"] = response.data[x].telefono;
      infoForm["DIRRECION"] = response.data[x].direccion;

      document.getElementById("tablaclientes").style.display = "block";
      document.getElementById("cuerpoclientes").innerHTML += "";

      tabla = document.getElementById("cuerpoclientes");
      filanueva = tabla.insertRow(tabla.length);

      cell1 = filanueva.insertCell(0);
      cell1.innerHTML = infoForm.NOMBRE;

      cell2 = filanueva.insertCell(1);
      cell2.innerHTML = infoForm.APELLIDO;

      cell3 = filanueva.insertCell(2);
      cell3.innerHTML = infoForm.TIPODOCUMENTO;

      cell4 = filanueva.insertCell(3);
      cell4.innerHTML = infoForm.NUMERODOCUMENTO;

      cell5 = filanueva.insertCell(4);
      cell5.innerHTML = infoForm.EMAIL;

      cell6 = filanueva.insertCell(5);
      cell6.innerHTML = infoForm.TELEFONO;

      cell7 = filanueva.insertCell(6);
      cell7.innerHTML = infoForm.DIRRECION;

      cell8 = filanueva.insertCell(7);
      cell8.innerHTML = `<a class="btn btn-warning mx-2 " onClick="onEdit(this)">Edit</a>
   <a class= "btn btn-danger " onClick="onDelete02(this)">Delete</a>`;
    }
  });
}

function updatedate() {
  let numero_documento = document.getElementById("txtnumerodocumento").value;
  let email = document.getElementById("txtcorreo").value;
  let telefono = document.getElementById("txttelefono").value;
  let direccion = document.getElementById("txtdirrecion").value;

  let data = {
    numero_documento: numero_documento,
    email: email,
    telefono: telefono,
    direccion: direccion,
  };

  axios
    .put("http://127.0.0.1:3000/actualizar", data)
    .then(function (response) {
      console.log(response);
      cargarusuarios();
      alert("REGISTRO ACTUALIZADO");
    })
    .catch(function (error) {
      console.log(error);
    });
}

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("txtnombre").disabled = true;
  document.getElementById("txtapellido").disabled = true;
  document.getElementById("cmbtipodocumento").disabled = true;
  document.getElementById("txtnumerodocumento").disabled = true;
  document.getElementById("txtcorreo").disabled = false;
  document.getElementById("txttelefono").disabled = false;
  document.getElementById("txtdirrecion").disabled = false;

  if (
    selectedRow.cells[0].innerHTML != "" &&
    selectedRow.cells[1].innerHTML != "" &&
    selectedRow.cells[3].innerHTML != "" &&
    selectedRow.cells[4].innerHTML != "" &&
    selectedRow.cells[5].innerHTML != "" &&
    selectedRow.cells[6].innerHTML != ""
  ) {
    document.getElementById("txtnombre").value = selectedRow.cells[0].innerHTML;
    document.getElementById("txtapellido").value =
      selectedRow.cells[1].innerHTML;
    document.getElementById("txtnumerodocumento").value =
      selectedRow.cells[3].innerHTML;
    document.getElementById("txtcorreo").value = selectedRow.cells[4].innerHTML;
    document.getElementById("txttelefono").value =
      selectedRow.cells[5].innerHTML;
    document.getElementById("txtdirrecion").value =
      selectedRow.cells[6].innerHTML;
  }
  alert("Registros Cargados!");
}

function ondelete(td) {
  selectedRow = td.parentElement.parentElement;
  let numero_documento = selectedRow.cells[3].innerHTML;
  axios
    .delete("http://127.0.0.1:3000/deleteUsuario/" + numero_documento)
    .then(function (response) {
      console.log(response);
      alert("REGISTRO ELIMINADO");
      location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function cmbConsultas() {
  let cmbConsultas = document.getElementById("cmbConsultas").value;
  if (cmbConsultas == 0) {
    consultasInnerJoinLeftJoin();
  } else if (cmbConsultas == 1) {
    consultasOrderBy();
  } else if (cmbConsultas == 2) {
    max();
  } else if (cmbConsultas == 3) {
    min();
  } else if (cmbConsultas == 4) {
    count();
  } else if (cmbConsultas == 5) {
    sum();
  }
}

function consultasInnerJoinLeftJoin() {
  let user;
  let infoForm = {};
  document.getElementById("titulo").innerText = "CLIENTES";
  document.getElementById("tablaorderby").style.display = "none";
  document.getElementById("tablamax").style.display = "none";
  document.getElementById("tablamin").style.display = "none";
  document.getElementById("tablacount").style.display = "none";
  document.getElementById("tablasum").style.display = "none";
  axios.get("http://127.0.0.1:3000/innerjoin").then(function (response) {
    console.log(response);
    console.log(response.data[0].numero_documento);
    user = JSON.stringify(response);
    console.log(user);

    document.getElementById("cuerpoinnerjoins").innerHTML = "";

    for (let x in response.data) {
      infoForm["CLIENTE"] = response.data[x].numero_documento;
      infoForm["TIPODOCUMENTO"] = response.data[x].documento;
      infoForm["EMAIL"] = response.data[x].email;
      infoForm["TELEFONO"] = response.data[x].telefono;
      infoForm["DIRECCION"] = response.data[x].dirrecion;
      infoForm["CONSECUTIVO"] = response.data[x].id_tickets;
      infoForm["DESTINO"] = response.data[x].ciudad;
      infoForm["TIPODEHORARIO"] = response.data[x].descripcion_horario;
      infoForm["VALOR"] = response.data[x].precio;

      document.getElementById("tablaclientes").style.display = "block";
      document.getElementById("cuerpoinnerjoins").innerHTML += "";

      tabla = document.getElementById("cuerpoinnerjoins");
      filanueva = tabla.insertRow(tabla.length);

      cell1 = filanueva.insertCell(0);
      cell1.innerHTML = infoForm.CLIENTE;

      cell2 = filanueva.insertCell(1);
      cell2.innerHTML = infoForm.TIPODOCUMENTO;

      cell3 = filanueva.insertCell(2);
      cell3.innerHTML = infoForm.EMAIL;

      cell4 = filanueva.insertCell(3);
      cell4.innerHTML = infoForm.TELEFONO;

      cell5 = filanueva.insertCell(4);
      cell5.innerHTML = infoForm.DIRECCION;

      cell5 = filanueva.insertCell(5);
      cell5.innerHTML = infoForm.CONSECUTIVO;

      cell6 = filanueva.insertCell(6);
      cell6.innerHTML = infoForm.DESTINO;

      cell8 = filanueva.insertCell(7);
      cell8.innerHTML = infoForm.TIPODEHORARIO;

      cell9 = filanueva.insertCell(8);
      cell9.innerHTML = infoForm.VALOR;
    }
  });
}

function consultasOrderBy() {
  let user;
  let infoForm = {};
  document.getElementById("titulo").innerText = "ORDER BY";
  document.getElementById("tablaclientes").style.display = "none";
  document.getElementById("tablamax").style.display = "none";
  document.getElementById("tablamin").style.display = "none";
  document.getElementById("tablacount").style.display = "none";
  document.getElementById("tablasum").style.display = "none";
  axios.get("http://127.0.0.1:3000/orderby").then(function (response) {
    console.log(response);
    console.log(response.data[0].numero_documento);
    user = JSON.stringify(response);
    console.log(user);

    document.getElementById("cuerpoorderby").innerHTML = "";

    for (let x in response.data) {
      infoForm["CLIENTE"] = response.data[x].numero_documento;
      infoForm["TIPODOCUMENTO"] = response.data[x].documento;
      infoForm["EMAIL"] = response.data[x].email;
      infoForm["TELEFONO"] = response.data[x].telefono;
      infoForm["DIRECCION"] = response.data[x].dirrecion;
      infoForm["CONSECUTIVO"] = response.data[x].id_tickets;
      infoForm["DESTINO"] = response.data[x].ciudad;
      infoForm["TIPODEHORARIO"] = response.data[x].descripcion_horario;
      infoForm["VALOR"] = response.data[x].precio;

      document.getElementById("tablaorderby").style.display = "block";
      document.getElementById("cuerpoorderby").innerHTML += "";
      tabla = document.getElementById("cuerpoorderby");
      filanueva = tabla.insertRow(tabla.length);

      cell1 = filanueva.insertCell(0);
      cell1.innerHTML = infoForm.CLIENTE;

      cell2 = filanueva.insertCell(1);
      cell2.innerHTML = infoForm.TIPODOCUMENTO;

      cell3 = filanueva.insertCell(2);
      cell3.innerHTML = infoForm.EMAIL;

      cell4 = filanueva.insertCell(3);
      cell4.innerHTML = infoForm.TELEFONO;

      cell5 = filanueva.insertCell(4);
      cell5.innerHTML = infoForm.DIRECCION;

      cell5 = filanueva.insertCell(5);
      cell5.innerHTML = infoForm.CONSECUTIVO;

      cell6 = filanueva.insertCell(6);
      cell6.innerHTML = infoForm.DESTINO;

      cell8 = filanueva.insertCell(7);
      cell8.innerHTML = infoForm.TIPODEHORARIO;

      cell9 = filanueva.insertCell(8);
      cell9.innerHTML = infoForm.VALOR;
    }
  });
}

function max() {
  let user;
  let infoForm = {};
  document.getElementById("titulo").innerText = "TIQUETE MAS ALTO COMPRADO";
  document.getElementById("tablaorderby").style.display = "none";
  document.getElementById("tablamin").style.display = "none";
  document.getElementById("tablacount").style.display = "none";
  document.getElementById("tablasum").style.display = "none";
  document.getElementById("tablaclientes").style.display = "none";
  axios.get("http://127.0.0.1:3000/max").then(function (response) {
    console.log(response);
    console.log(response.data[0].ciudad);
    user = JSON.stringify(response);
    console.log(user);

    document.getElementById("cuerpomax").innerHTML = "";

    for (let x in response.data) {
      infoForm["CLIENTE"] = response.data[x].numero_documento;
      infoForm["TIPODOCUMENTO"] = response.data[x].documento;
      infoForm["EMAIL"] = response.data[x].email;
      infoForm["TELEFONO"] = response.data[x].telefono;
      infoForm["DIRECCION"] = response.data[x].dirrecion;
      infoForm["CONSECUTIVO"] = response.data[x].id_tickets;
      infoForm["DESTINO"] = response.data[x].ciudad;
      infoForm["TIPODEHORARIO"] = response.data[x].descripcion_horario;
      infoForm["VALOR"] = response.data[x].precio;

      document.getElementById("tablamax").style.display = "block";
      document.getElementById("cuerpomax").innerHTML += "";

      tabla = document.getElementById("cuerpomax");
      filanueva = tabla.insertRow(tabla.length);

      cell1 = filanueva.insertCell(0);
      cell1.innerHTML = infoForm.CLIENTE;

      cell2 = filanueva.insertCell(1);
      cell2.innerHTML = infoForm.TIPODOCUMENTO;

      cell3 = filanueva.insertCell(2);
      cell3.innerHTML = infoForm.EMAIL;

      cell4 = filanueva.insertCell(3);
      cell4.innerHTML = infoForm.TELEFONO;

      cell5 = filanueva.insertCell(4);
      cell5.innerHTML = infoForm.DIRECCION;

      cell5 = filanueva.insertCell(5);
      cell5.innerHTML = infoForm.CONSECUTIVO;

      cell6 = filanueva.insertCell(6);
      cell6.innerHTML = infoForm.DESTINO;

      cell8 = filanueva.insertCell(7);
      cell8.innerHTML = infoForm.TIPODEHORARIO;

      cell9 = filanueva.insertCell(8);
      cell9.innerHTML = infoForm.VALOR;
    }
  });
}

function min() {
  let user;
  let infoForm = {};
  document.getElementById("titulo").innerText = "TIQUETE MAS BAJO COMPRADO";
  document.getElementById("tablamax").style.display = "none";
  document.getElementById("tablacount").style.display = "none";
  document.getElementById("tablasum").style.display = "none";
  document.getElementById("tablaorderby").style.display = "none";
  document.getElementById("tablaclientes").style.display = "none";
  axios.get("http://127.0.0.1:3000/min").then(function (response) {
    console.log(response);
    console.log(response.data[0].ciudad);
    user = JSON.stringify(response);
    console.log(user);

    document.getElementById("cuerpomin").innerHTML = "";

    for (let x in response.data) {
      infoForm["CIUDAD"] = response.data[x].ciudad;
      infoForm["PRECIO"] = response.data[x].precio;
      infoForm["NUMERODOCUMENTO"] = response.data[x].numero_documento_cliente;

      document.getElementById("tablamin").style.display = "block";
      document.getElementById("cuerpomin").innerHTML += "";

      tabla = document.getElementById("cuerpomin");
      filanueva = tabla.insertRow(tabla.length);

      cell1 = filanueva.insertCell(0);
      cell1.innerHTML = infoForm.CIUDAD;

      cell2 = filanueva.insertCell(1);
      cell2.innerHTML = infoForm.PRECIO;

      cell3 = filanueva.insertCell(2);
      cell3.innerHTML = infoForm.NUMERODOCUMENTO;
    }
  });
}

function count() {
  let user;
  let infoForm = {};
  document.getElementById("titulo").innerText =
    "CANTIDAD DE TICKETS POR CIUDAD";
  document.getElementById("tablamin").style.display = "none";
  document.getElementById("tablasum").style.display = "none";
  document.getElementById("tablamax").style.display = "none";
  document.getElementById("tablaorderby").style.display = "none";
  document.getElementById("tablaclientes").style.display = "none";
  axios.get("http://127.0.0.1:3000/count").then(function (response) {
    console.log(response);
    console.log(response.data[0].ciudad);
    user = JSON.stringify(response);
    console.log(user);

    document.getElementById("cuerpocount").innerHTML = "";

    for (let x in response.data) {
      infoForm["CIUDAD"] = response.data[x].ciudad;
      infoForm["TIQUETES_COMPRADOS"] = response.data[x].TIQUETES_COMPRADOS;

      document.getElementById("tablacount").style.display = "block";
      document.getElementById("cuerpocount").innerHTML += "";

      tabla = document.getElementById("cuerpocount");
      filanueva = tabla.insertRow(tabla.length);

      cell1 = filanueva.insertCell(0);
      cell1.innerHTML = infoForm.CIUDAD;

      cell2 = filanueva.insertCell(1);
      cell2.innerHTML = infoForm.TIQUETES_COMPRADOS;
    }
  });
}

function sum() {
  let user;
  let infoForm = {};
  document.getElementById("titulo").innerText =
    "VENTA TOTALES DE TICKETS POR CIUDAD";
  document.getElementById("tablacount").style.display = "none";
  document.getElementById("tablamin").style.display = "none";
  document.getElementById("tablamax").style.display = "none";
  document.getElementById("tablaorderby").style.display = "none";
  document.getElementById("tablaclientes").style.display = "none";
  axios.get("http://127.0.0.1:3000/sum").then(function (response) {
    console.log(response);
    console.log(response.data[0].ciudad);
    user = JSON.stringify(response);
    console.log(user);

    document.getElementById("cuerposum").innerHTML = "";

    for (let x in response.data) {
      infoForm["CIUDAD"] = response.data[x].ciudad;
      infoForm["VENTA_TOTAL"] = response.data[x].VENTA_TOTAL;

      document.getElementById("tablasum").style.display = "block";
      document.getElementById("cuerposum").innerHTML += "";

      tabla = document.getElementById("cuerposum");
      filanueva = tabla.insertRow(tabla.length);

      cell1 = filanueva.insertCell(0);
      cell1.innerHTML = infoForm.CIUDAD;

      cell2 = filanueva.insertCell(1);
      cell2.innerHTML = infoForm.VENTA_TOTAL;
    }
  });
}
