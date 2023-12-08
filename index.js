import { List, DefaultList } from "./toDo.js"

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

/**
 *
 **/
const lists = []
const defaultList = new DefaultList(
  "Have You?",
  "This is your default list"
)
const secondList = new List(
  "Shopping list",
  "this is my weekly shopping list"
)
lists.push(defaultList, secondList)
const listSection = document.getElementById("list-section")

let newListHTML = `
<div class="bg-slate-700 | p-6 m-5 | min-h-[30rem]">
    <h3 class="text-3xl font-semibold | mb-5">${defaultList.title}</h3>                 
    <h4 class="text-lg font-semibold my-2">${defaultList.description}<h4>
    <p><i>Created ${defaultList.creationDate}</i></p>
    <input class="my-3" type='text'>
</div>
`
const parser = new DOMParser()
const newList = parser.parseFromString(newListHTML, "text/html").body.firstChild
listSection.appendChild(newList)
