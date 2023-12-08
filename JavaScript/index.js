function clearFields() {
  const listTitle = document.getElementById("list-title")
  const listDescription = document.getElementById("list-description")

  listTitle.value = ""
  listDescription.value = ""
}

function checkTitleField() {
  const listTitle = document.getElementById("list-title")
  const createButton = document.getElementById("create-button")

  createButton.style.backgroundColor = listTitle.value ? "rgb(14 165 233)" : "rgb(7, 89, 133)"
}

function toggleListForm() {
  const newListForm = document.getElementById("new-list-form")
  newListForm.style.display = newListForm.style.display === "none" ? "block" : "none"
  if (newListForm.style.display === "block") checkTitleField()
}

function cancelList(e) {
  const newListForm = document.getElementById("new-list-form")
  e.preventDefault()
  newListForm.style.display = "none"
  clearFields()
}

const newListButton = document.getElementById("new-list-button")
const cancelButton = document.getElementById("cancel-button")
const createButton = document.getElementById("create-button")
const listTitle = document.getElementById("list-title")

newListButton.addEventListener("click", toggleListForm)
cancelButton.addEventListener("click", cancelList)
listTitle.addEventListener("input", checkTitleField)
