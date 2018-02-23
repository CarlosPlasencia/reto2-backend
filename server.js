'use strict'

const argv = require('yargs').argv;
const { 
    addContact,
    fetchContacts,
    fetchContact,
    deleteContact
 } = require('./contact')

const option = argv._[0]
const { name, number } = argv
const file_name = 'directorio.json'

switch(option){
    case 'add':
        const data = { name, number }
        addContact(file_name,data)
        break
    case 'list':
        fetchContacts(file_name)
        break
    case 'read':
        fetchContact(file_name, name)
        break
    case 'delete':
        deleteContact(file_name, name)
        break
    default:
        console.log('Opcion no valida!!')
        break
}