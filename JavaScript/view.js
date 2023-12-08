import { controller } from './controller.js'

const buttonView = {

}

const listView = {

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