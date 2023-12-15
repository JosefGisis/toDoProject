import { model, ToDo, List, retrieveData, saveData } from './model.js'
import { changeListView, listView, toDoView, newListView, newToDoView, deleteListView, view } from './view.js'

// controller object initiates all objects and provides correspondence between model and view.
const controller = {
	init() {
		retrieveData.retrieveAll()
	    listView.display()
		toDoView.display()
		changeListView.displayLists()
		changeListFormController.init()
		newListFormController.init()
		newToDoFormController.init()
		toDoController.index()
		deleteListFormController.init()
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
		this.newListButton.addEventListener('click', view.toggleNewList)
		this.newListCancel.addEventListener('click', newListView.cancel.bind(newListView))
		this.newListTitle.addEventListener('input', newListView.checkTitleField.bind(newListView))
		this.newListSubmit.addEventListener('click', this.newList)
	},

	newList() {
		let newListTitle = document.getElementById('new-list-title')
		let newListDescription = document.getElementById('new-list-description')
		const newList = new List(newListTitle.value, newListDescription.value)
		model.lists.push(newList)
		// Fields need to be cleared to prevent submission spamming
		newListTitle.value = ''
		newListDescription.value = ''
		newListView.checkTitleField()
		changeListView.displayLists()
		saveData.saveLists()
	},
}

// Controls list change form (list change submission/cancellation)
const changeListFormController = {
	changeListButton: document.getElementById('change-list-button'),
	changeListCancel: document.getElementById('change-list-cancel'),
	changeListSubmit: document.getElementById('change-list-submit'),

	init() {
		this.changeListButton.addEventListener('click', view.toggleChangeList)
		this.changeListCancel.addEventListener('click', changeListView.cancel)
		this.changeListSubmit.addEventListener('click', this.changeList)
	},

	changeList() {
		const listChangeMenu = document.getElementById('list-change-menu')
		for (let list of model.lists) 
		    if (list.title === listChangeMenu.value) model.currentList = list

		changeListView.cancel()
		changeListView.displayLists()
		listView.display()
		toDoView.display()
		saveData.saveCurrentList()
	},
}

const newToDoFormController = {
	newToDoTitle: document.getElementById('new-todo-title'),
	newToDoSubmit: document.getElementById('new-todo-submit'),

	init() {
		this.newToDoSubmit.addEventListener('click', this.newToDo)
		this.newToDoTitle.addEventListener('input', newToDoView.checkTitleField)
	},

	newToDo() {
		const newToDoTitle = document.getElementById('new-todo-title').value || 'title error'
		const newToDoDueDate = document.getElementById('new-todo-due-date').value || 'NA'
		
		const newToDO = new ToDo(newToDoTitle, model.currentList.title, newToDoDueDate)
		model.toDos.push(newToDO)
		
		newToDoView.clearFields()
		newToDoView.checkTitleField()
		toDoView.display()
		saveData.saveToDos()
		toDoController.index()
	}
}

const deleteListFormController = {
	deleteListButton: document.getElementById('delete-list-button'),
	deleteListForm: document.getElementById('change-list-form'),
	deleteListCancel: document.getElementById('delete-list-cancel'), 
	deleteListSubmit: document.getElementById('delete-list-submit'),

	init() {
		this.deleteListButton.addEventListener('click', view.toggleDeleteList)
		this.deleteListCancel.addEventListener('click', deleteListView.cancel)
		this.deleteListSubmit.addEventListener('click', this.deleteList)
	},

	deleteList() {
		model.lists = model.lists.filter(list => list.title !== model.currentList.title)
		model.toDos = model.toDos.filter(toDo => toDo.membership !== model.currentList.title)
		model.currentList = model.lists[0]
		deleteListView.cancel()
		listView.display()
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
	    toDoView.display()
		this.index()
	},
	
	deleteToDo(index) {
		const deletedId = controller.getToDos()[index].id
		for (let index in model.toDos) {
	        if (model.toDos[index].id === deletedId) model.toDos.splice(index, 1)
		}
	    toDoView.display()
		saveData.saveToDos()
		this.index()
	}
}


controller.init()

export { controller }
