function toggleCollectionForm() {
    const newCollectionForm = document.getElementById('new-collection-form')
    newCollectionForm.style.display = (newCollectionForm.style.display === 'none') ? 'block' : 'none'
}

function cancelCollection(e) {
    const newCollectionForm = document.getElementById('new-collection-form')
    const collectionTitle = document.getElementById('collection-title')
    const collectionDescription = document.getElementById('collection-description')

    e.preventDefault()
    newCollectionForm.style.display = "none"
    collectionTitle.value = ""
    collectionDescription.value = ""
}


const newCollectionButton = document.getElementById('new-collection-button')
const cancelButton = document.getElementById('cancel-button')
const submitButton = document.getElementById('create-button')

newCollectionButton.addEventListener('click', toggleCollectionForm)
cancelButton.addEventListener('click', cancelCollection)
