

function getText() {
    var http = new XMLHttpRequest();
    http.open("GET", "http://localhost:3000/articulos", true);
    http.send();
    http.addEventListener('readystatechange',function() {
        if(http.readyState === 4 && http.status === 200) {
            document.getElementById("productInfo").innerHTML = "<pre>" + http.responseText + "</pre>";

        }
    });
}

function getJson() {
    var http = new XMLHttpRequest();
    http.open("GET","http://localhost:3000/articulos", true);
    http.send();
    http.addEventListener("readystatechange", function(){
        if(http.readyState === 4 && http.status === 200) {
            var respuesta = JSON.parse(http.responseText);

            //var btnActualizar = "<input type='button' value='Actualizar' id='btnA-'" + respuesta[i].id + "onclick='actualizar()'>";

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
                    tabla += "<td>"+respuesta[i].id+"</td><td>"+respuesta[i].nombre+"</td><td>"+respuesta[i].descripcion+"</td><td>"+respuesta[i].precio+"</td><td><input type='button' value='Actualizar' id='btnA-'" + respuesta[i].id + "onclick='introDatosPost(2)'></td><td><input type='button' value='Eliminar' id='btnD-'" + respuesta[i].id + "onclick='delText()'></td>";
                tabla += "</tr>";
            }
            tabla += "</table>";
            document.getElementById("productInfo").innerHTML = tabla;
           

        }
    });
}

function conseguirId(){
        
    var text = "";
    text += "<label>Introduce Id </label>";
    text += "<input type='text' id='text'>";
    text += "<input type='button' value='Enviar' onclick='getIdText()'>";
    document.getElementById("productInfo").innerHTML = text;
    
}
function getIdText() {
    var http = new XMLHttpRequest();
    var idProducto = document.getElementById('text').value;
    http.open("GET", "http://localhost:3000/articulos/" + idProducto,  true);
    http.send();
    http.addEventListener("readystatechange", function(){
        
        if(http.readyState === 4 && http.status === 200) {
            document.getElementById("productInfo").innerHTML = "<pre>" + http.responseText + "</pre>";
        }
    });

}

function conseguirId(){
        
    var text = "";
    text += "<label>Introduce Id </label>";
    text += "<input type='text' id='text'>";
    text += "<input type='button' value='Enviar' onclick='getIdJson()'>";
    document.getElementById("productInfo").innerHTML = text;
    
}
function getIdJson() {
    var http = new XMLHttpRequest();
    var idArticulo = document.getElementById("text").value;
    http.open("GET", "http://localhost:3000/articulos/"+ idArticulo, true);
    http.send();
    http.addEventListener("readystatechange", function(){
        if(http.readyState === 4 && http.status === 200) {
            var res = JSON.parse(http.responseText);

            /* var p = document.createElement("p");
            p.textContent = res.id + ", " + res.nombre + ", " + res.descripcion + ", " + res.precio + " €";
            document.getElementById("productInfo").appendChild(p); */

            var tabla= "";
            tabla += "<table class='t1'>";
                tabla += "<tr>";
                    tabla += "<th>Id</th>";
                    tabla += "<th>nombre</th>";  
                    tabla += "<th>descripcion</th>";   
                    tabla += "<th>precio</th>";
                tabla += "</tr>";
                console.log(http.responseText.length);
                
                for(let i = 0; i < 1; i ++) {
                    tabla += "<tr>";
                        tabla += "<td>"+res.id+"</td><td>"+res.nombre+"</td><td>"+res.descripcion+"</td><td>"+res.precio+"</td>";
                    tabla += "</tr>";
                }
            tabla += "</table>";
            document.getElementById("productInfo").innerHTML = tabla;

        }
    });
}

function introDatosPost(v) {

    // Tabla para la recogida de datos que queremos ingresar.
    
    var introDatos = "";
    introDatos += "<form>";
        introDatos += "<table class='tpost' id='introPost'>";
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
                introDatos += "<td><input type='button' id='boton2' value='Enviar' onclick='postText()'></td>";
                // introDatos += "<td><input type='button' id='boton2' value='Enviar' onclick='postText()'></td>";
                
                if(v == "1") {
                    introDatos += "<td><input type='button' id='boton' value='Eliminar' onclick='postEliminar()'></td>";
                }
                else {
                    introDatos += "<td><input type='button' id='boton3' value='Actualizar' onclick='postActualizar()'><input type='button' id='boton' value='Eliminar' onclick='postEliminar()'></td>";
                }

                
                //introDatos += "<td><input type='button' id='boton' value='Eliminar' onclick='postText()'></td>";
            introDatos += "</tr>";
        introDatos += "</table>";
    introDatos += "</form>";
    
    document.getElementById("productInfo").innerHTML = introDatos;
}
function postText() {
    
    // Recogemos los datos que se introdujeron en el formulario.
    var ptId = document.getElementById("textId").value;
    var ptNombre = document.getElementById("textNombre").value;
    var ptDes = document.getElementById("textDescripcion").value;
    var ptPrecio = document.getElementById("textPrecio").value;

    // var producto = {
    //     "id":"11",
    //     "nombre":"Monitor LG",
    //     "descripcion":"Monitor 22 pulgadas",
    //     "precio":250
    // };

    // Objeto ajax.
    var http = new XMLHttpRequest();
    // En open decimos: enviamos datos, a esa url.
    http.open("POST","http://localhost:3000/articulos",true);
    // En setRequestHeader decimos: que le enviamos datos en ese formato.
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    // queryString = "id=" + producto.id + "&nombre=" + producto.nombre + "&descripcion=" + producto.descripcion + "&precio=" + producto.precio;

    // Creamos el string que vamos a enviar con la información del formulario.
    queryString = "id=" + ptId + "&nombre=" + ptNombre + "&descripcion=" + ptDes + "&precio=" + ptPrecio;
    // Enviamos los datos.
    http.send(queryString);
    // readystatechange esta a la escucha de algún cambio y si lo hay comprueba que todo sea correcto.
    http.addEventListener("readystatechange", function(){
        console.log(http.readyState);
        console.log(http.status);
        if(http.readyState === 4 && http.status === 201) {
            console.log(http.responseText);
            if(http.responseText) {
                var respuesta = "Se ha ingresado un nuevo registro en articulos.json";
            }
            else {
                respuesta = "Se ha producido un error. Verifica el código";
            }
            // Imprimimos la respuesta.
            var p = document.createElement("p");
            p.textContent = respuesta;
            document.getElementById("productInfo").appendChild(p);
        }
        // Ocultamos el formulario.
        document.getElementById("introPost").style.display = "none";
    });

}

function postJson() {
    var producto2 = {
        "id":"20",
        "nombre":"Samsumg S10",
        "descripcion":"movil XL",
        "precio":"750"
    };

    var http = new XMLHttpRequest();
    http.open("POST","http://localhost:3000/articulos",true);
    http.setRequestHeader("Content-type","application/json");
    http.send(JSON.stringify(producto2));
    http.addEventListener("readystatechange", function(){
        if(http.readyState === 4 && http.status === 201) {
            alert("Se ha introducido un nuevo registro");
        }
    });

}

function putText() {
    var producto3 = {
        "id":"20",
        "nombre":"Samsumg S300",
        "descripcion":"movil Atomico XL",
        "precio":"1250"
    }

    idProd = 20;
    var http = new XMLHttpRequest();
    http.open("PUT","http://localhost:3000/articulos/"+ idProd, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    productString = "id=" + producto3.id + "&nombre=" + producto3.nombre + "&descripcion=" + producto3.descripcion + "&precio=" + producto3.precio;
    http.send(productString);
    http.addEventListener("readystatechange", function(){
        if(http.readyState === 4 && http.status === 200) {
            var p = document.createElement("p");
            p.textContent = http.responseText;
            console.log(http.responseText);
            document.getElementById("productInfo").appendChild(p);
        }
    });
}

function delText(v) {
    idProd = v;
    var http = new XMLHttpRequest();
    http.open("DELETE","http://localhost:3000/articulos/"+ idProd, true);
    http.send();
    http.addEventListener("readystatechange", function(){
        if(http.readyState === 4 && http.status === 200) {
            var respuesta = "Se ha eliminado el registro con id " + idProd;
            var p = document.createElement("p");
            p.textContent = respuesta;
            document.getElementById("productInfo").appendChild(p);
        }
    });
}

function patchText() {
    var producto = {
        "id":"10",
        "nombre":"Cafetera LG",
        "descripcion":"Modelo superior capsulas",
        "precio":"345"
    };

    idProd = 10;
    var http = new XMLHttpRequest();
    http.open("PATCH","http://localhost:3000/articulos/"+ idProd,true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var productString = "id=" + producto.id + "&nombre=" + producto.nombre + "&descripcion=" + producto.descripcion + "&precio=" + producto.precio;
    http.send(productString);
    http.addEventListener("readystatechange", function(){
        if(http.readyState === 4 && http.status === 200) {
            var p = document.createElement("p");
            p.textContent = http.responseText;
            document.getElementById("productInfo").appendChild(p);
        }
    });

}




