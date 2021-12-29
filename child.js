const child_process = require('child_process')
const fs = require('fs')

const ejecutar = (archivo, nombreArchivo, extensionArchivo, indicadorEconomico, cantidadPesos) => {
    return new Promise((resolve) => {
        child_process.exec(`node ${archivo} ${nombreArchivo} ${extensionArchivo} ${indicadorEconomico} ${cantidadPesos}`, (err, result) => {
            resolve(Number(result))
        })
    })
}

let nombreArchivo = 'conversorDolar'
let extensionArchivo = '.txt'
let indicadorEconomico = 'dolar'
let cantidadPesos = 400

ejecutar(`index.js`, nombreArchivo, extensionArchivo, indicadorEconomico, cantidadPesos).then((data) => {
    
    fs.readFile(`${nombreArchivo}.${extensionArchivo}`, `utf8`, (err, data) => {
        console.log('contenido del archivo:\n' + data)
    })

})