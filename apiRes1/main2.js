function getJson() {
    var http = new XMLHttpRequest();
    http.open("GET","http://localhost:3000/articulos", true);
    http.send();
    http.addEventListener("readystatechange", function(){
        if(http.readyState === 4 && http.status === 200) {
            var respuesta = JSON.parse(http.responseText);

            var tabla = "";
            tabla += "<table class='t1'>";
                tabla += "<tr>";
                    tabla += "<th>Id</th>";
                    tabla += "<th>Nombre</th>";
                    tabla += "<th>Descripcion</th>";
                    tabla += "<th>Precio</th>";
                    tabla += "<th></th>";
                    tabla += "<th><input type='button' value='Nuevo' id='btnNuevo' onclick='introDatosPost(1)'></th>";
                tabla += "</tr>";
                for(let i = 0; i < respuesta.length; i ++) {
                    tabla += "<tr>";
                        tabla += "<td>"+respuesta[i].id+"</td><td>"+respuesta[i].nombre+"</td><td>"+respuesta[i].descripcion+"</td><td>"+respuesta[i].precio+"</td><td><input type='button' value='Actualizar' id='"+respuesta[i].id+"' onclick='introText(this)'></td><td><input type='button' value='Eliminar' id='"+respuesta[i].id+"' onclick='delText(this)'></td>";
                    tabla += "</tr>"
                }
            tabla += "</table>";
            document.getElementById("proInfo").innerHTML = tabla;
        }
    });
}

function introDatosPost(v) {
    var introDatos = "";
    introDatos += "<form id='introPost'>";
        introDatos += "<table class='tpost' >";
            // introDatos += "<tr>";
            //     introDatos += "<th>    </th>";
            //     introDatos += "<th>INTRODUCE DATOS DEL ARTICULO</th>";
            // introDatos += "</tr>";
            introDatos += "<tr>";
                introDatos += "<td><label>Id</label></td>";
                introDatos += "<td><input type='text' id='textId' ></td>";
            introDatos += "</tr>";
            introDatos += "<tr>";
                introDatos += "<td><label>Nombre</label></td>";
                introDatos += "<td><input type='text' id='textNombre' ></td>";
            introDatos += "</tr>";
            introDatos += "<tr>";
                introDatos += "<td><label>Descripcion</label></td>";
                introDatos += "<td><input type='text' id='textDescripcion' ></td>";
            introDatos += "</tr>";
            introDatos += "<tr>";
                introDatos += "<td><label>Precio</label></td>";
                introDatos += "<td><input type='text' id='textPrecio' ></td>";
            introDatos += "</tr>";
            introDatos += "<tr>";
                // Llamamos a la función postText(), cuando hacemos click en el boton enviar.
            introDatos += "<tr>";
                if(v == 1) {
                    introDatos += "<td><input type='button' id='boton2' value='Enviar' onclick='postText()'></td>";
                }
                else {
                    introDatos += "<td><input type='button' id='boton2' value='Enviar' onclick='putText()'></td>";
                }
                              
                introDatos += "<td><input type='reset' id='boton3' value='Reset'><input type='button' id='boton4' value='Back' onclick='getJson()'></td>";   
            introDatos += "</tr>";
        introDatos += "</table>";
    introDatos += "</form>";
    
    document.getElementById("proInfo").innerHTML = introDatos;
}

function postText() {
    
    // Recogemos los datos que se introdujeron en el formulario.
    var ptId = document.getElementById("textId").value;
    var ptNombre = document.getElementById("textNombre").value;
    var ptDes = document.getElementById("textDescripcion").value;
    var ptPrecio = document.getElementById("textPrecio").value;

    // Objeto ajax.
    var http = new XMLHttpRequest();

    // En open decimos: enviamos datos, a esa url.
    http.open("POST","http://localhost:3000/articulos",true);

    // En setRequestHeader decimos: que le enviamos datos en ese formato.
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    // Creamos el string que vamos a enviar con la información del formulario.
    queryString = "id=" + ptId + "&nombre=" + ptNombre + "&descripcion=" + ptDes + "&precio=" + ptPrecio;

    // Enviamos los datos.
    http.send(queryString);

    // readystatechange esta a la escucha de algún cambio y si lo hay comprueba que todo sea correcto.
    http.addEventListener("readystatechange", function(){
        if(http.readyState === 4 && http.status === 201) {
            if(http.responseText) {
                var respuesta = "Se ha ingresado un nuevo registro en articulos.json";
            }
            else {
                respuesta = "Se ha producido un error. Verifica el código";
            }

            // Imprimimos la respuesta.
            var p = document.createElement("p");
            p.textContent = respuesta;
            document.getElementById("proInfo").appendChild(p);
        }
        // Ocultamos el formulario.
        document.getElementById("introPost").style.display = "none";
    });

}

function putText() {

    idText = document.getElementById("textId").value;
    nomText = document.getElementById("textNombre").value;
    desText = document.getElementById("textDescripcion").value;
    preText = document.getElementById("textPrecio").value;

    var http = new XMLHttpRequest();
    http.open("PUT", "http://localhost:3000/articulos/" + idText, true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var queryString = "id=" + idText + "&nombre=" + nomText + "&descripcion=" + desText + "&precio=" + preText;
    http.send(queryString);
    http.addEventListener("readystatechange", function(){
        if(http.readyState === 4 && http.status === 200) {
            if(http.responseText) {
                var respuesta = "Se ha actualizado el registro " + idText + " en el archivo Json"
            }
            else {
                respuesta = "No se ha actualizado el registro " + idText + " debido a un problema, verifica el código";
            }
        }
        var p = document.createElement("p");
        p.textContent = respuesta;
        document.getElementById("proInfo").appendChild(p);

    });
}
    
function introText(v) {
    introDatosPost();
    let idProd = v.id;
    console.log(idProd);
    var http = new XMLHttpRequest();
    http.open("GET","http://localhost:3000/articulos/" + idProd, true);
    http.send();
    http.addEventListener("readystatechange", function(){
        if(http.readyState === 4 && http.status === 200) {
            var respuesta = JSON.parse(http.responseText);

            document.getElementById("textId").value = respuesta.id;
            document.getElementById("textNombre").value = respuesta.nombre;
            document.getElementById("textDescripcion").value = respuesta.descripcion;
            document.getElementById("textPrecio").value = respuesta.precio;
        }
    });
}

function delText(v) {
    idProd = v.id;
    var http = new XMLHttpRequest();
    http.open("DELETE","http://localhost:3000/articulos/"+ idProd, true);
    http.send();
    http.addEventListener("readystatechange", function(){
        if(http.readyState === 4 && http.status === 200) {
            var respuesta = "Se ha eliminado el registro con id " + v.id;
            var p = document.createElement("p");
            p.textContent = respuesta;
            document.getElementById("proInfo").appendChild(p);
        }
    });
    setTimeout(function(){ getJson(); }, 2000);
    //location.reload();   
}
