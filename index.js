import { Collection, DefaultCollection } from './collections.js'
import { ToDo } from './todos.js'

function clearFields() {
    const collectionTitle = document.getElementById('collection-title')
    const collectionDescription = document.getElementById('collection-description')

    collectionTitle.value = ""
    collectionDescription.value = ""
}

function toggleCollectionForm() {
    const newCollectionForm = document.getElementById('new-collection-form')
    newCollectionForm.style.display = (newCollectionForm.style.display === 'none') ? 'block' : 'none'
}

function cancelCollection(e) {
    const newCollectionForm = document.getElementById('new-collection-form')
    e.preventDefault()
    newCollectionForm.style.display = "none"
    clearFields()
}


const newCollectionButton = document.getElementById('new-collection-button')
const cancelButton = document.getElementById('cancel-button')
const submitButton = document.getElementById('create-button')

newCollectionButton.addEventListener('click', toggleCollectionForm)
cancelButton.addEventListener('click', cancelCollection)

const defaultCollection = new DefaultCollection()
console.log(defaultCollection.title, defaultCollection.description)

const newToDO = new ToDo('get cheese', 'we are all out of cheese', 'tommorow')
console.log(newToDO.title, newToDO.description, newToDO.dueDate)
