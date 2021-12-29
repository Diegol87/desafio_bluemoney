const fs = require('fs')
const https = require('https')

const argumentos = process.argv.slice(2)

const nombreArchivo = argumentos[0];
const extensionArchivo = argumentos[1];
const indicadorEconomico = argumentos[2];
const cantidadPesos = Number(argumentos[3]);

https.get(`https://mindicador.cl/api`, (resp) => {
    resp.on(`data`, (data) => {
        let indicadores = JSON.parse(data);
        let valorDivisa = indicadores[argumentos[2]].valor;
        let conversion = (cantidadPesos * valorDivisa);
        
        fs.writeFile(`${nombreArchivo}.${extensionArchivo}`, `A la fecha: ${Date()}\nFue realizada cotización con los siguientes datos:\nCantidad de pesos a convertir: ${cantidadPesos}\nConvertido a ${indicadorEconomico} da un total de:\n$${conversion}`, `utf8`, () => {
            console.log('Archivo creado con éxito')
        })

        fs.readFile(`${nombreArchivo}.${extensionArchivo}`, `utf8`, (err, data) => {
            console.log('contenido del archivo:\n' + data)
        })
    })
})

.on('error', (err) => {
    console.log('Error: ' + err.message)
})

