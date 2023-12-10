import { controller } from './controller.js'

const buttonView = {

}

const listView = {
  init() {
    const currentList = controller.getCurrentList()
    const listSection = document.getElementById("list-section")
    const currentListHTML = `
    <div>
      <h3 class="w-fit rounded-lg | bg-sky-500 | text-4xl font-bold | p-3  mb-5">${ currentList.title }</h3>
      <p class=""><i>Created: ${ currentList.creationDate }</i></p>
      <h4 class="text-2xl font-semibold my-2">${ currentList.description }</h4>
    </div>
    `
    const parser = new DOMParser()
    const newList = parser.parseFromString(currentListHTML, "text/html").body.firstChild
    listSection.appendChild(newList)
  }
}

const toDoView = {

}

export { toDoView, listView, buttonView }

// const lists = []
// const defaultList = new DefaultList(
  // "Have You?",
  // "This is your default list"
// )
// const secondList = new List(
  // "Shopping list",
  // "this is my weekly shopping list"
// )
// lists.push(defaultList, secondList)
// const listSection = document.getElementById("list-section")
// 
// let newListHTML = `
// <div class="bg-slate-700 | p-6 m-5 | min-h-[30rem]">
    // <h3 class="text-3xl font-semibold | mb-5">${defaultList.title}</h3>                 
    // <h4 class="text-lg font-semibold my-2">${defaultList.description}<h4>
    // <p><i>Created ${defaultList.creationDate}</i></p>
    // <input class="my-3" type='text'>
// </div>
// `
// const parser = new DOMParser()
// const newList = parser.parseFromString(newListHTML, "text/html").body.firstChild
// listSection.appendChild(newList)