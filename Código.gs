function doGet() {
    return HtmlService.createHtmlOutputFromFile('evaluacionresidentes.html');
}

function obtenerNombresResidentes(clasificacion) {
    var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Residentes');
    var rango = hoja.getRange('A2:C'); // Asume que los nombres están en la columna A, las clasificaciones en la columna C
    var valores = rango.getValues();
    var nombres = valores.filter(function(fila) {
        return (clasificacion === 'Todos' || fila[2] === clasificacion) && fila[0] !== ''; // Filtra basándose en la clasificación y verifica si el nombre no está vacío
    }).map(function(fila) {
        return fila[0]; // Devuelve solo el nombre
    });
    return nombres;
}

function guardarCalificacion(datos) {
    var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Calificación');
    hoja.appendRow([datos.nombre, datos.aspectosPositivos, datos.aspectosNegativos, datos.nota]);
}

function obtenerDatos(nombreResidente) {
    var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Calificación');
    var rango = hoja.getRange('A2:D'); // Asume que los datos están en las columnas A a D
    var valores = rango.getValues();

    // Filtra los valores para incluir solo las filas que corresponden al residente seleccionado
    var datosResidente = valores.filter(function(fila) {
        return fila[0] === nombreResidente; // Asume que el nombre del residente está en la columna A
    });

    return datosResidente;
}