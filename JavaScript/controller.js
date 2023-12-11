import { model, ToDo, List } from './model.js'
import { changeListFormView, listView, toDoView, newListFormView } from './view.js'

const retrieveData = {

}


const saveData = {

}


const controller = {
    onStart() {
        for (let i = 0; i < 10; i++) {
            const newToDo = new ToDo(`hello there! ${i}`)
            model.toDos.push(newToDo)
        }
        const defaultList = new List('HAVE YOU?', 'This is your default list.')
        const otherList = new List('other list', 'This is another list')
        model.lists.push(defaultList)
        model.lists.push(otherList)
        model.currentList = model.lists[0]
        
        listView.init()
        // toDoView.init()
        changeListFormView.init()
        changeListFormController.init()
        newListFormController.init()

    },

    getToDos() {
        return model.toDos
    },

    getCurrentList() {
        return model.currentList
    },
    
    getLists() {
        return model.lists
    }
}

const newListFormController = {
    newListButton: document.getElementById("new-list-button"),
    newListCancel: document.getElementById("new-list-cancel"),
    newListSubmit: document.getElementById("new-list-submit"),
    newListTitle: document.getElementById("new-list-title"),
   
    init() {
        this.newListButton.addEventListener("click", newListFormView.toggleListForm.bind(newListFormView)),
        this.newListCancel.addEventListener("click", newListFormView.cancelList.bind(newListFormView)),
        this.newListTitle.addEventListener("input", newListFormView.checkTitleField.bind(newListFormView))
    },
}


const changeListFormController = {
    changeListButton: document.getElementById('change-list-button'),

    init() {
        this.changeListButton.addEventListener('click', changeListFormView.toggleChangeForm)
    }
}



const toDoController = {

}

const listController = {

}

controller.onStart()

export { saveData, retrieveData, controller }
