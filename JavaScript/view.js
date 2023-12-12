import { controller } from './controller.js'

// change list form view handler. Responsible for handling form view, content, and list changes. 
const changeListFormView = {
  init() {
    const lists = controller.getLists()
    const currentList = controller.getCurrentList()
    const listChangeMenu = document.getElementById("list-change-menu")
    // clear change drop-down menu, so lists are not duplicated
    listChangeMenu.innerHTML = ''

    for (let list of lists) {
      const option = document.createElement('option')
      option.textContent = list.title
      // currently displayed list shows up as an option but is not selectable  
      if (list.title === currentList.title) {
        option.selected = option.disabled = true
      }  
      listChangeMenu.appendChild(option)
    }
  },

  toggleChangeForm() {
    const changeListForm = document.getElementById("change-list-form")
    if (changeListForm.classList.contains('hidden')) changeListForm.classList.replace('hidden', 'block')
    else changeListForm.classList.replace('block', 'hidden')
  },

  cancelChange(e) {
    const changeListForm = document.getElementById("change-list-form")
    e.preventDefault()
    changeListForm.classList.replace('block', 'hidden')
  }
}


// new list form view handler. Responsible for handling form view and new list submissions.
const newListFormView = {
  clearFields() {
    const newListTitle = document.getElementById("new-list-title")
    const newListDescription = document.getElementById("new-list-description")
    newListTitle.value = ""
    newListDescription.value = ""
  },
  
  checkTitleField() {
    const newListTitle = document.getElementById("new-list-title")
    const newListSubmit = document.getElementById("new-list-submit")
    newListSubmit.style.backgroundColor = newListTitle.value ? "rgb(14 165 233)" : "rgb(7, 89, 133)"
  },
  
  toggleListForm() {
    const newListForm = document.getElementById("new-list-form")
    if (newListForm.classList.contains('hidden')) newListForm.classList.replace('hidden', 'block')
    else newListForm.classList.replace('block', 'hidden')
    // if form is visible check if title has been entered 
    if (newListForm.style.display === "block") this.checkTitleField()
  },
  
  cancelList(e) {
    const newListForm = document.getElementById("new-list-form")
    e.preventDefault()
    newListForm.classList.replace('block', 'hidden')
    this.clearFields()
  }, 
}


const listView = {
  init() {
    const currentList = controller.getCurrentList()
    const toDoSection = document.getElementById("todo-section")
    const newToDoForm = document.getElementById("new-todo-form")
    const currentListHTML = `
    <div>
      <h3 class="w-fit rounded-lg | bg-sky-500 | text-4xl font-bold | p-3  mb-5">${ currentList.title }</h3>
      <p class=""><i>Created: ${ currentList.creationDate }</i></p>
      <h4 class="text-2xl font-semibold my-2">${ currentList.description }</h4>
    </div>
    `
    const parser = new DOMParser()
    const currentListNode = parser.parseFromString(currentListHTML, "text/html").body.firstChild
    toDoSection.insertBefore(currentListNode, newToDoForm)
  }
}


const toDoView = {
  init() {
    const toDos = controller.getToDos()
    const toDoSection = document.getElementById("todo-section")
    for (let toDo of toDos) {
      const toDoHTML = `
      <div class="flex flex-row content-center items-center justify-between | rounded-lg | bg-slate-800 | transition-all | p-3 mb-5 hover:bg-slate-600 hover:pl-7">
        <div>
          <h3 class="rounded-lg | text-xl font-bold">${ toDo.title }</h3>
          <p class=""><i>Created: ${ toDo.creationDate }</i></p>
        </div>
        
        <div aria-label="new todo list button" class="border-2 rounded-md">
          <div id="new-list-button" class="peer | w-fit | p-3 rounded-md | bg-slate-700 hover:bg-slate-600 | transition-all">
            <img src="/images/delete-icon.svg" width="15px" height="15px" alt="icon for new list button">         
          </div>
        </div>
      </div>
      `
      const parser = new DOMParser()
      const newToDo = parser.parseFromString(toDoHTML, "text/html").body.firstChild
      toDoSection.appendChild(newToDo)
    }
  }
}


export { toDoView, listView, changeListFormView, newListFormView }