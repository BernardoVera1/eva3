var buses = []
buses.push(new bus("12345", "NS-001", "50000", "200", "50", "VOLVO", "En Mantenimiento", "2018", "8000", "BLANCO", "Turístico", "DIÉSEL"));
buses.push(new bus("54321", "NS-123", "70023", "250", "60", "MAN", "Operativo", "2010", "7000", "ROJO", "NORMAL", "GASOLINA"));


function listarbuses() {
    var filas = "";
    for (let i = 0; i < buses.length; i++) {
        var B = buses[i];
        filas += "<tr>";
        filas += "<td>" + B.Numero_de_Placa.toUpperCase() + "</td>";
        filas += "<td>" + B.Numero_de_Serie.toUpperCase() + "</td>";
        filas += "<td>" + B.Kilometraje_Actual.toUpperCase() + "</td>";
        filas += "<td>" + B.Capacidad_del_Tanque_de_Combustible.toUpperCase() + "</td>";
        filas += "<td>" + B.Capacidad_de_Pasajeros.toUpperCase() + "</td>";
        filas += "<td>" + B.Marca.toUpperCase() + "</td>";
        filas += "<td>" + B.Estado.toUpperCase() + "</td>";
        filas += "<td>" + B.Año_de_Fabricación.toUpperCase() + "</td>";
        filas += "<td>" + B.Peso_del_autobus.toUpperCase() + "</td>";
        filas += "<td>" + B.Color.toUpperCase() + "</td>";
        filas += "<td>" + B.Tipo_de_Servicio.toUpperCase() + "</td>";
        filas += "<td>" + B.Tipo_de_Combustible.toUpperCase() + "</td>";
        filas += "</tr>";
    }
    document.getElementById("tabladedatos").innerHTML = filas;
}


document.addEventListener("DOMContentLoaded", function(){ listarbuses() });

function limpiarCampos(x) {
    if (x !== 1) {
        document.getElementById("txt_placa").value = "";
    }
    document.getElementById("txt_serie").value = "";
    document.getElementById("txt_kilo").value = "";
    document.getElementById("txt_capa_com").value = "";
    document.getElementById("txt_pasa").value = "";
    document.getElementById("cbo_mar").value = "";
    document.getElementById("op_est_ope").checked = true;
    document.getElementById("txt_año").value = "";
    document.getElementById("txt_peso").value = "";
    document.getElementById("cbo_color").value = "";
    document.getElementById("optiponormal").checked = true;
    document.getElementById("cbocombustible").value = "";
}


function consultar() {
    var placa = document.getElementById("txt_placa").value;
    if (placa.trim().length != 5) {
        alert("Debe digitar una placa de 5 digitos válida para buscar!");
        document.getElementById("txt_placa").value = "";
        document.getElementById("txt_placa").focus();
    } else {
        let sw = 0;
        for (let i = 0; i < buses.length; i++) {
            var B = buses[i];
            if (placa === B.Numero_de_Placa) {
                sw = 1;
                document.getElementById("txt_serie").value = B.Numero_de_Serie;
                document.getElementById("txt_kilo").value = B.Kilometraje_Actual;
                document.getElementById("txt_capa_com").value = B.Capacidad_del_Tanque_de_Combustible;
                document.getElementById("txt_pasa").value = B.Capacidad_de_Pasajeros;
                document.getElementById("cbo_mar").value = B.Marca;
                if (B.Estado === "Operativo") {
                    document.getElementById("op_est_ope").checked = true;
                } else {
                    document.getElementById("op_est_man").checked = true;
                }
                document.getElementById("txt_año").value = B.Año_de_Fabricación;
                document.getElementById("txt_peso").value = B.Peso_del_autobus;
                document.getElementById("cbo_color").value = B.Color;
                if (B.Tipo_de_Servicio === "Normal") {
                    document.getElementById("optiponormal").checked = true;
                } else {
                    document.getElementById("optipoturistico").checked = true;
                }
                document.getElementById("cbocombustible").value = B.Tipo_de_Combustible;
            }
        }
        var msg = "";
        if (sw === 0) {
            msg += "<div class='alert alert-warning alert-dismissible fade show' role='alert'>";
            msg += "<strong>Bus no encontrado puede registrarlo!</strong>";
            msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            msg += "</div>";
            limpiarCampos(1);
        } else if (sw === 1) {
            msg += "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
            msg += "<strong>Bus encontrado puede eliminarlo o modificarlo!</strong>";
            msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            msg += "</div>";
        }
        document.getElementById("mensajes").innerHTML = msg;
    }
}


function registrar() {
    var placa = document.getElementById("txt_placa").value.toUpperCase();
    var serie = document.getElementById("txt_serie").value.toUpperCase();
    var kilo = document.getElementById("txt_kilo").value.toUpperCase();
    var capa_com = document.getElementById("txt_capa_com").value.toUpperCase();
    var pasa = document.getElementById("txt_pasa").value.toUpperCase();
    var mar = document.getElementById("cbo_mar").value.toUpperCase();
    var año = document.getElementById("txt_año").value.toUpperCase();
    var peso = document.getElementById("txt_peso").value.toUpperCase();
    var color = document.getElementById("cbo_color").value.toUpperCase();
    var com = document.getElementById("cbocombustible").value.toUpperCase();

    var esta = "";
    if (document.getElementById("op_est_ope").checked === true) {
        esta = "Operativo"
    } else {
        esta = "En Mantenimiento"
    }

    var tipo = "";
    if (document.getElementById("optiponormal").checked === true) {
        tipo = "Normal"
    } else {
        tipo = "Turístico"
    }

    var errores = "";
    if (placa.trim().length != 5) {
        errores += "la placa debe contener 5 digitos! \n";
    } else {
        for (let i = 0; i < buses.length; i++) {
            var B = buses[i];
            if (placa === B.Numero_de_Placa) {
                errores += "la placa ya se encuentra registrado!\n";
                break;
            }
        }
    }

    if (serie.trim().length < 1 || serie.trim().length > 30){
        errores += "La serie debe contener entre 1 y 30 caracteres! \n";
    }

    if (kilo.trim().length < 1 || kilo.trim().length > 30){
        errores += "El kilometraje debe contener entre 1 y 30 caracteres! \n";
    }

    if (capa_com.trim().length < 1 || capa_com.trim().length > 30){
        errores += "La capacidad del tanque debe contener entre 1 y 30 caracteres! \n";
    }

    if (pasa.trim().length < 1 || pasa.trim().length > 30){
        errores += "La capacidad de pasajeros debe contener entre 1 y 30 caracteres! \n";
    }

    if (isNaN(año) || parseInt(año) <= 0) {
        errores += "Debe ingresar año de fabricación debe ser un número positivo! \n";
    }
    
    if (isNaN(peso) || parseInt(peso) <= 0) {
        errores += "Debe ingresar un año con numeros positivos! \n";
    }

    if (color.trim().length === 0){
        errores += "Debe ingresar el color! \n";
    }

    if (mar.trim().length === 0){
        errores += "Debe ingresar la marca! \n";
    }

    if (com.trim().length === 0){
        errores += "Debe ingresar el tipo de combustible! \n";
    }

    if (errores !== "") {
        alert(errores)
    } else {
        var B = new bus(placa, serie, kilo, capa_com, pasa, mar, esta, año, peso, color, tipo, com);
        buses.push(B);

        var msg = "";
        msg += "<div class='alert alert-success alert-dismissible fade show' role='alert'>"
        msg += "<strong>autoBus registrado correctamente!</strong>"
        msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>"
        msg += "</div>"
        document.getElementById("mensajes").innerHTML = msg;
        listarbuses();
        limpiarCampos();
    }
}

function modificar(){
    var placa = document.getElementById("txt_placa").value.toUpperCase();
    var serie = document.getElementById("txt_serie").value.toUpperCase();
    var kilo = document.getElementById("txt_kilo").value.toUpperCase();
    var capa_com = document.getElementById("txt_capa_com").value.toUpperCase();
    var pasa = document.getElementById("txt_pasa").value.toUpperCase();
    var mar = document.getElementById("cbo_mar").value.toUpperCase();
    var año = document.getElementById("txt_año").value.toUpperCase();
    var peso  = document.getElementById("txt_peso").value.toUpperCase();
    var color = document.getElementById("cbo_color").value.toUpperCase();
    var com = document.getElementById("cbocombustible").value.toUpperCase();

    var esta = "";
    if (document.getElementById("op_est_ope").checked === true){
        esta = "Operativo";
    } else {
        esta = "En Mantenimiento";
    }

    var tipo = "";
    if (document.getElementById("optiponormal").checked === true){
        tipo = "Normal";
    } else {
        tipo = "Turístico";
    }

    var errores = "";
    if (placa.trim().length != 5){
        errores += "La placa debe contener 5 dígitos! \n";
    } else {
        let x = 0;
        for (let i = 0; i < buses.length; i++) {
            var B = buses[i];
            if (placa === B.Numero_de_Placa){
                x = 1;
                break;
            }
        }
        if (x === 0){
            errores += "La placa no se encuentra registrada!\n";
        }
    }

    if (serie.trim().length < 1 || serie.trim().length > 30){
        errores += "La serie debe contener entre 1 y 30 caracteres! \n";
    }

    if (kilo.trim().length < 1 || kilo.trim().length > 30){
        errores += "El kilometraje debe contener entre 1 y 30 caracteres! \n";
    }

    if (capa_com.trim().length < 1 || capa_com.trim().length > 30){
        errores += "La capacidad del tanque debe contener entre 1 y 30 caracteres! \n";
    }

    if (pasa.trim().length < 1 || pasa.trim().length > 30){
        errores += "La capacidad de pasajeros debe contener entre 1 y 30 caracteres! \n";
    }

    if (isNaN(año) || parseInt(año) <= 0) {
        errores += "Debe ingresar año de fabricación debe ser un número positivo! \n";
    }
    
    if (isNaN(peso) || parseInt(peso) <= 0) {
        errores += "Debe ingresar un año con numeros positivos! \n";
    }

    if (color.trim().length === 0){
        errores += "Debe ingresar el color! \n";
    }

    if (mar.trim().length === 0){
        errores += "Debe ingresar la marca! \n";
    }

    if (com.trim().length === 0){
        errores += "Debe ingresar el tipo de combustible! \n";
    }

    if (errores !== ""){
        alert(errores);
    } else {
        var sw = 0;
        for (let i = 0; i < buses.length; i++) {
            var B = buses[i];
            if (placa === B.Numero_de_Placa){
                var x = confirm("¿Desea modificar el registro?");
                if (x === true){
                    sw = 1;
                    buses[i].Numero_de_Serie = serie;
                    buses[i].Kilometraje_Actual = kilo;
                    buses[i].Capacidad_del_Tanque_de_Combustible = capa_com;
                    buses[i].Capacidad_de_Pasajeros = pasa;
                    buses[i].Marca = mar;
                    buses[i].Estado = esta;
                    buses[i].Año_de_Fabricación = año;
                    buses[i].Peso_del_autobus = peso;
                    buses[i].Color = color;
                    buses[i].Tipo_de_Servicio = tipo;
                    buses[i].Tipo_de_Combustible = com;
                    break;
                } else {
                    sw = 2;
                }
            }
        }

        var msg = "";
        if (sw === 0){
            msg += "<div class='alert alert-warning alert-dismissible fade show' role='alert'>";
            msg += "<strong>Bus no encontrado!</strong>";
            msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            msg += "</div>";
        } else if (sw === 1){
            msg += "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
            msg += "<strong>Bus modificado correctamente!</strong>";
            msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            msg += "</div>";
        } else if (sw === 2){
            msg += "<div class='alert alert-warning alert-dismissible fade show' role='alert'>";
            msg += "<strong>El Bus no fue modificado!</strong>";
            msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            msg += "</div>";
        }
        document.getElementById("mensajes").innerHTML = msg;
        listarbuses();
        limpiarCampos();
    }
}

function eliminar(){
    var placa = document.getElementById("txt_placa").value.toUpperCase();

    var errores = "";
    if(placa.trim().length != 5){
        errores += "La placa debe contener 5 caracteres! \n";
    } else {
        let x = 0;
        for (let i = 0; i < buses.length; i++) {
            var B = buses[i];
            if(placa === B.Numero_de_Placa){
                x = 1;
                break;
            }
        }
        if(x === 0){
            errores += "La placa no se encuentra registrada!\n";
        }
    }

    
    if(errores !== ""){
        alert(errores);
    }else{
        var sw = 0;
        for (let i = 0; i < buses.length; i++) {
            var B = buses[i];
            if(placa === B.Numero_de_Placa){
                var x = confirm("¿Desea eliminar el registro?");
                if(x === true){
                    sw=1;
                    buses.splice(i, 1);
                    break;
                }else{
                    sw = 2;
                }
            }
        }

        var msg = "";
        if(sw === 0){
            msg += "<div class='alert alert-warning alert-dismissible fade show' role='alert'>";
            msg += "<strong>Autobús no encontrado!</strong>";
            msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            msg += "</div>";
        } else if(sw === 1){
            msg += "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
            msg += "<strong>Autobús eliminado correctamente!</strong>";
            msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            msg += "</div>";
        } else if(sw === 2){
            msg += "<div class='alert alert-warning alert-dismissible fade show' role='alert'>";
            msg += "<strong>El Autobús no fue eliminado!</strong>";
            msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            msg += "</div>";
        }
        document.getElementById("mensajes").innerHTML = msg;
        listarbuses();
        limpiarCampos();
    }
}
