import { controller } from './controller.js'

const buttonView = {

}


const listView = {
  init() {
    const currentList = controller.getCurrentList()
    const listSection = document.getElementById("list-section")
    const newToDoForm = document.getElementById("new-todo-form")
    const currentListHTML = `
    <div>
      <h3 class="w-fit rounded-lg | bg-sky-500 | text-4xl font-bold | p-3  mb-5">${ currentList.title }</h3>
      <p class=""><i>Created: ${ currentList.creationDate }</i></p>
      <h4 class="text-2xl font-semibold my-2">${ currentList.description }</h4>
    </div>
    `
    const parser = new DOMParser()
    const newList = parser.parseFromString(currentListHTML, "text/html").body.firstChild
    listSection.insertBefore(newList, newToDoForm)
  }
}


const toDoView = {
  init() {
    const toDos = controller.getToDos()
    const listSection = document.getElementById("list-section")
    for (let toDo of toDos) {
      const toDoHTML = `
      <div class="flex flex-row content-center items-center | rounded-lg | bg-slate-800 | transition-all | p-3 mb-5 hover:bg-slate-600 hover:pl-7">
        <div>
          <h3 class="rounded-lg | text-xl font-bold">${ toDo.title }</h3>
          <p class=""><i>Created: ${ toDo.creationDate }</i></p>
        </div>
      </div>
      `
      const parser = new DOMParser()
      const newToDo = parser.parseFromString(toDoHTML, "text/html").body.firstChild
      listSection.appendChild(newToDo)
    }
  }
}

export { toDoView, listView, buttonView }