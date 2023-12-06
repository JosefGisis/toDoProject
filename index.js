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