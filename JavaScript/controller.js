import { model, ToDo, List, retrieveData, saveData } from './model.js'
import { changeListFormView, currentListView, toDoView, newListFormView, newToDoFormView } from './view.js'

// controller object initiates all objects and provides correspondence between model and view.
const controller = {
	init() {
		retrieveData.retrieveAll()
	    currentListView.init()
		toDoView.init()
		changeListFormView.init()
		changeListFormController.init()
		newListFormController.init()
		newToDoFormController.init()
		toDoController.index()
	},

	getToDos() {
		const toDos = model.toDos.filter(toDo => toDo.membership === model.currentList.title)
		return toDos
	},

	getCurrentList() {
		return model.currentList
	},

	getLists() {
		return model.lists
	},
}

// controls new list form (submission, cancellation, and list instantiation)
const newListFormController = {
	newListButton: document.getElementById('new-list-button'),
	newListCancel: document.getElementById('new-list-cancel'),
	newListSubmit: document.getElementById('new-list-submit'),
	newListTitle: document.getElementById('new-list-title'),

	init() {
		this.newListButton.addEventListener('click', newListFormView.toggleListForm.bind(newListFormView))
		// cancelChange requires a new event listener because multiple functions cannot be invoked on the same line as they require binding to an external object.
		this.newListButton.addEventListener('click', changeListFormView.cancelChange)
		this.newListCancel.addEventListener('click', newListFormView.cancelList.bind(newListFormView))
		this.newListTitle.addEventListener('input', newListFormView.checkTitleField.bind(newListFormView))
		this.newListSubmit.addEventListener('click', this.newList)
	},

	newList(e) {
		e.preventDefault()
		let newListTitle = document.getElementById('new-list-title')
		let newListDescription = document.getElementById('new-list-description')
		const newList = new List(newListTitle.value, newListDescription.value)
		model.lists.push(newList)
		// Fields need to be cleared to prevent submission spamming
		newListTitle.value = ''
		newListDescription.value = ''
		newListFormView.checkTitleField()
		changeListFormView.init()
		saveData.saveLists()
	},
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
		const listChangeMenu = document.getElementById('list-change-menu')
		e.preventDefault()
		for (let list of model.lists) 
		    if (list.title === listChangeMenu.value) model.currentList = list

		changeListFormView.cancelChange(e)
		changeListFormView.init()
		currentListView.init()
		toDoView.init()
		saveData.saveCurrentList()
	},
}

const newToDoFormController = {
	newToDoTitle: document.getElementById('new-todo-title'),
	newToDoSubmit: document.getElementById('new-todo-submit'),

	init() {
		this.newToDoSubmit.addEventListener('click', this.newToDo)
		this.newToDoTitle.addEventListener('input', newToDoFormView.checkTitleField)
	},

	newToDo(e) {
		const newToDoTitle = document.getElementById('new-todo-title').value || 'title error'
		const newToDoDueDate = document.getElementById('new-todo-due-date').value || 'NA'
		e.preventDefault()
		
		const newToDO = new ToDo(newToDoTitle, model.currentList.title, newToDoDueDate)
		model.toDos.push(newToDO)
		
		newToDoFormView.clearFields()
		newToDoFormView.checkTitleField()
		toDoView.init()
		saveData.saveToDos()
		toDoController.index()
	}
}

const toDoController = {
	index() {
		const completeToDoIcons = document.querySelectorAll('.complete-todo-icon')
		const deleteToDoIcons = document.querySelectorAll('.delete-todo-icon')	
		completeToDoIcons.forEach((icon, index) => icon.addEventListener('click', () => {this.completeToDo(index)}))
        deleteToDoIcons.forEach((icon, index) => icon.addEventListener('click', () => {this.deleteToDo(index)}))
	},

    completeToDo(index) {
		const completedId = controller.getToDos()[index].id
		for (let index in model.toDos) {
	        if (model.toDos[index].id === completedId) 
				model.toDos[index].completed = !model.toDos[index].completed ? true : false
		}
	    toDoView.init()
		this.index()
	},
	
	deleteToDo(index) {
		const deletedId = controller.getToDos()[index].id
		for (let index in model.toDos) {
	        if (model.toDos[index].id === deletedId) model.toDos.splice(index, 1)
		}
	    toDoView.init()
		saveData.saveToDos()
		this.index()
	}
}


controller.init()

export { controller }
