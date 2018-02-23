'use strict'

const fs = require('fs')

//leer el archivo
const readFile = ( name ) => new Promise( (resolve,reject) =>{
    fs.readFile(name,'utf8',function (err, data) {
        if (err) return reject(new Error("Se ha producido un error al leer el archivo!!"))
        else return resolve(JSON.parse(data))
    })
})

//escribir el archivo
const writeFile = ( name, data ) => new Promise( (resolve,reject) =>{
    fs.writeFile(name, JSON.stringify(data), function (err) {
        if (err) return reject(new Error("Se ha producido un error al guardar el archivo!!"))
        else return resolve(data)
    });
})

//escribir mensaje en consola
const print = (message) => console.log(message)

//escribir un contacto en consola
const printContact = (data) =>{
    print('--')
    print('name: '+data.name)
    print('number: '+data.number)
}

//guardar en el archivo
const addContact = async ( file_name, data ) =>{
    try {
        let datos = await readFile(file_name)
        datos.push(data)
        await writeFile(file_name,datos)
        print('Contact created')
        printContact( data )
    } catch (error) {
        print(error)
    }
}

//listar contactos
const fetchContacts = async ( file_name ) =>{
    try {
        let datos = await readFile(file_name)
        print(`Printing ${datos.length} contacts(s).`)
        datos.forEach(data=>printContact(data))
    } catch (error) {
        print(error)
    }
}

//listar contacto
const fetchContact = async ( file_name, name ) =>{
    try {
        let datos = await readFile(file_name)
        let contact = datos.find(data=>data.name == name)
        if(contact){
            print(`Contact found`)
            printContact(contact)
        } else {
            print(`Contact not found`)
        }
    } catch (error) {
        print(error)
    }
}

const deleteContact = async ( file_name, name ) =>{
    try {
        let datos = await readFile(file_name)
        let contact = datos.find(data=>data.name == name)
        if(contact){
            const new_datos = datos.filter(data=>data.name !== name)
            await writeFile(file_name,new_datos)
            print('Contact was removed')
        } else {
            print(`Contact not found`)
        }
    } catch (error) {
        print(error)
    }
}
module.exports = {
    addContact,
    fetchContacts,
    fetchContact,
    deleteContact
}