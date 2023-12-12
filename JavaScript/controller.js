import { model, ToDo, List } from './model.js'
import { changeListFormView, listView, toDoView, newListFormView } from './view.js'

// retrieveData and saveData objects may be placed in model file
const retrieveData = {
    retrieveLists() {},
    retrieveToDos() {}

}

const saveData = {
    saveLists() {},
    saveToDos() {}
}


// controller object initiates all objects and provides correspondence between model and view.
const controller = {
    init() {
        if (model.lists[0]) model.currentList = model.lists[0]
        
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


// controls new list form (submission, cancellation, and list instantiation)
const newListFormController = {
    newListButton: document.getElementById("new-list-button"),
    newListCancel: document.getElementById("new-list-cancel"),
    newListSubmit: document.getElementById("new-list-submit"),
    newListTitle: document.getElementById("new-list-title"),
   
    init() {
        this.newListButton.addEventListener("click", newListFormView.toggleListForm.bind(newListFormView))
        // cancelChange requires a new event listener because multiple functions cannot be invoked on the same line as they require binding to an external object.
        this.newListButton.addEventListener("click", changeListFormView.cancelChange)
        this.newListCancel.addEventListener("click", newListFormView.cancelList.bind(newListFormView))
        this.newListTitle.addEventListener("input", newListFormView.checkTitleField.bind(newListFormView))
        this.newListSubmit.addEventListener('click', this.newList)
    },
    
    newList(e) {
        e.preventDefault()
        let newListTitle = document.getElementById("new-list-title")
        let newListDescription = document.getElementById("new-list-description")
        const newList = new List(newListTitle.value, newListDescription.value)
        model.lists.push(newList)
        // Fields need to be cleared to prevent submission spamming
        newListTitle.value = ''
        newListDescription.value = ''
    }
}


// Controls list change form (list change submission/cancellation)
const changeListFormController = {
    changeListButton: document.getElementById('change-list-button'),
    changeListCancel: document.getElementById('change-list-cancel'),
    changeListSubmit: document.getElementById('change-list-submit'),
    
    init() {
        this.changeListButton.addEventListener('click', changeListFormView.toggleChangeForm)
        // cancelList requires a new event listener because multiple functions cannot be invoked on the same line as they require binding to an external object.
        this.changeListButton.addEventListener('click', newListFormView.cancelList.bind(newListFormView))
        this.changeListCancel.addEventListener('click', changeListFormView.cancelChange)
        this.changeListSubmit.addEventListener('click', this.changeList)
    },

    changeList(e) {
        const listChangeMenu = document.getElementById("list-change-menu")
        e.preventDefault()
        for (let list of model.lists)
            if (list.title === listChangeMenu.value) model.currentList = list
        changeListFormView.cancelChange(e)
        // Clear and reset list change drop-down menu
        changeListFormView.init()
    }
}

controller.init()

export { saveData, retrieveData, controller }
