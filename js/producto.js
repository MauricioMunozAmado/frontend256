function mostrarProducto(){
    let request = sendRequest('producto', 'GET', '');
    let table = document.getElementById('producto-table');
    table.innerHTML ="";
    request.onload = function () {
        let data = request.response;
        //console.log(data);    se deja para probar que traiga los datos a la consola, no es necesario
        data.forEach(element => {
            table.innerHTML += `
            <tr>
            <td>${element.producto}</td>
            <td>${element.categoria}</td>
            <td>${element.cantidad}</td>
            <td>${element.medida}</td>
            <td>${element.lote}</td>
            <td>${element.ubicacion}</td>

            <td>
            <button type="button" class ="btn btn-primary" onclick='window.location = "/formProducto.html?id=${element._id}"'>Editar</button>
            <button type="button" class ="btn btn-danger" onclick='deleteProducto("${element._id}")'>Eliminar</button>
            </td>
            </tr>
            `
        });
    }
}

function deleteProducto(id) {
    let request = sendRequest('producto/'+id, 'DELETE', '');
    request.onload = function(){
        mostrarProducto();
    }
}

function guardarProducto() {
    let pro = document.getElementById('producto-p').value
    let cat = document.getElementById('categoria-c').value
    let can = document.getElementById('cantidad-c').value
    let med = document.getElementById('medida-m').value
    let lot = document.getElementById('lote-l').value
    let ubi = document.getElementById('ubicacion-u').value
    let data ={'producto':pro, 'categoria':cat, 'cantidad':can, 'medida':med, 'lote':lot, 'ubicacion':ubi}
    let request = sendRequest('producto/', 'POST', data);
    request.onload = function(){
        window.location='producto.html';
    }
    request.onerror = function(){
        console.log("error al guardar datos")
    }
}

function cargarDatos(id) {
    let request = sendRequest('producto/'+id, 'GET', '');
    let pro = document.getElementById('producto-p')
    let cat = document.getElementById('categoria-c')
    let can = document.getElementById('cantidad-c')
    let med = document.getElementById('medida-m')
    let lot = document.getElementById('lote-l')
    let ubi = document.getElementById('ubicacion-u')

    request.onload = function(){
        let data = request.response;
        pro.value = data.producto
        cat.value = data.categoria
        can.value = data.cantidad
        med.value = data.medida
        lot.value = data.lote
        ubi.value = data.ubicacion
        console.log(data)
    }
    request.onerror = function(){
        console.log("error al cargar datos")
    }
}


function modificarProducto(id){
    let pro = document.getElementById('producto-p').value
    let cat = document.getElementById('categoria-c').value
    let can = document.getElementById('cantidad-c').value
    let med = document.getElementById('medida-m').value
    let lot = document.getElementById('lote-l').value
    let ubi = document.getElementById('ubicacion-u').value
    let data ={'producto':pro, 'categoria':cat, 'cantidad':can, 'medida':med, 'lote':lot, 'ubicacion':ubi}
    let request = sendRequest('producto/'+id, 'PUT', data);
    console.log(request)
    request.onload = function(){
        window.location='producto.html';
    }
    request.onerror = function(){
        console.log("error al modificar datos")
    }
}


