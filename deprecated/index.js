function clearFields() {
    const newListTitle = document.getElementById('new-list-title')
	  const newListDescription = document.getElementById('new-list-description')

	  newListTitle.value = ''
	  newListDescription.value = ''
}

function checkTitleField() {
	  const newListTitle = document.getElementById('new-list-title')
	  const newListSubmit = document.getElementById('new-list-submit')

	  newListSubmit.style.backgroundColor = newListTitle.value ? 'rgb(14 165 233)' : 'rgb(7, 89, 133)'
}

function toggleListForm() {
    const newListForm = document.getElementById('new-list-form')
	  if (newListForm.classList.contains('hidden')) newListForm.classList.replace('hidden', 'block')
	  else newListForm.classList.replace('block', 'hidden')

	  // if form is visible check if title has been entered
	  if (newListForm.style.display === 'block') checkTitleField()
}

function cancelList(e) {
	  const newListForm = document.getElementById('new-list-form')
	  e.preventDefault()
	  newListForm.style.display = 'none'
	  clearFields()
}

const newListButton = document.getElementById('new-list-button')
const newListCancel = document.getElementById('new-list-cancel')
const newListSubmit = document.getElementById('new-list-submit')
const newListTitle = document.getElementById('new-list-title')

newListButton.addEventListener('click', toggleListForm)
newListCancel.addEventListener('click', cancelList)
newListTitle.addEventListener('input', checkTitleField)
