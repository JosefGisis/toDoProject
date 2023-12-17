import { model, ToDo, List, toDos, lists, dataHandler } from './model.js'
import { changeListView, listView, toDoView, newListView, newToDoView, deleteListView, view } from './view.js'

// controller object initiates all objects and provides correspondence between model and view.
const controller = {
	onStart() {
		dataHandler.retrieveAll()
	    view.updateContent()
		newToDoView.checkTitleField()
		const controllerObjects = [changeListController, newListController, deleteListController, newToDoController]
		for (let controller of controllerObjects) {
		    controller.init()
		    controller.createEventListeners()
		}
		toDoController.index()
	},

	onClose() {
		model.toDos = model.toDos.filter(toDo => !toDo.completed)
		dataHandler.saveAll()
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


// Controls list change form (list change submission/cancellation)
const changeListController = {
	
	init() {
		this.changeListButton = document.getElementById('change-list-button')
		this.changeListCancel = document.getElementById('change-list-cancel')
		this.changeListSubmit = document.getElementById('change-list-submit')
		this.listChangeMenu = document.getElementById('list-change-menu')
	},
	
	createEventListeners() {
		this.changeListButton.addEventListener('click', () => view.toggleChangeList())
		this.changeListCancel.addEventListener('click', () => changeListView.cancel())
		this.changeListSubmit.addEventListener('click', () => this.handleSubmission())
	},
	
	handleSubmission() {
		this.changeList()
		changeListView.cancel()
		view.updateContent()
		toDoController.index()
		lists.saveCurrentList()
	},
	
	changeList() {
		model.currentList = model.lists.find(list => list.title === this.listChangeMenu.value)
	}
}


// controls new list form (submission, cancellation, and list instantiation)
const newListController = {	
	init() {
		this.newListButton = document.getElementById('new-list-button')
		this.newListCancel = document.getElementById('new-list-cancel')
		this.newListSubmit = document.getElementById('new-list-submit')
		this.newListTitle = document.getElementById('new-list-title')
		this.newListDescription = document.getElementById('new-list-description').value
	},
	
	createEventListeners() {
		this.newListButton.addEventListener('click', () => view.toggleNewList())
		this.newListCancel.addEventListener('click', () => newListView.cancel())
		this.newListTitle.addEventListener('input', () => newListView.checkTitleField())
		this.newListSubmit.addEventListener('click', () => this.handleSubmission())
	},
	
	handleSubmission() {
		this.newList()
		view.updateContent()
		newListView.cancel()
		lists.saveLists()
		toDoController.index()
	},

	newList() {
		model.lists.push(new List(this.newListTitle.value, this.newListDescription))
		model.currentList = model.lists[model.lists.length - 1]
	}
}


const deleteListController = {
	init() {
		this.deleteListButton =  document.getElementById('delete-list-button')
		this.deleteListForm = document.getElementById('change-list-form')
		this.deleteListCancel =  document.getElementById('delete-list-cancel') 
		this.deleteListSubmit =  document.getElementById('delete-list-submit')
	},
	
	createEventListeners() {
		this.deleteListButton.addEventListener('click', () => view.toggleDeleteList())
		this.deleteListCancel.addEventListener('click', () => deleteListView.cancel())
		this.deleteListSubmit.addEventListener('click', () => this.handleSubmission())
	},
	
	handleSubmission() {
		this.deleteList()
		deleteListView.cancel()
		view.updateContent()
		toDoController.index()
	},
	
	deleteList() {
		model.lists = model.lists.filter(list => list.title !== model.currentList.title)
		model.toDos = model.toDos.filter(toDo => toDo.membership !== model.currentList.title)
		model.currentList = model.lists[0]
	}
}


const newToDoController = {
	
	init() {
		this.newToDoTitle = document.getElementById('new-todo-title')
		this.newToDoSubmit = document.getElementById('new-todo-submit')
		this.newToDoDueDate = document.getElementById('new-todo-due-date').value
	},
	
	createEventListeners() {
		this.newToDoTitle.addEventListener('input', () => newToDoView.checkTitleField())
		this.newToDoSubmit.addEventListener('click', () => this.handleSubmission())
	},
	
	handleSubmission() {
		this.newToDo()
		newToDoView.clearFields()
		toDoView.display()
		toDos.saveToDos()
		toDoController.index()
	},

	newToDo() {
		const newToDoTitle = this.newToDoTitle.value || 'title error'
		const newToDoDueDate = this.newToDoDueDate || 'NA'
		const newToDO = new ToDo(newToDoTitle, model.currentList.title, newToDoDueDate)
		model.toDos.push(newToDO)
	}
}


// first version 
const toDoController = {
	index() {
		this.completeToDoIcons = document.querySelectorAll('.complete-todo-icon')
		this.deleteToDoIcons = document.querySelectorAll('.delete-todo-icon')	
		this.completeToDoIcons.forEach((icon, index) => icon.addEventListener('click', () => {this.completeToDo(index)}))
        this.deleteToDoIcons.forEach((icon, index) => icon.addEventListener('click', () => {this.deleteToDo(index)}))
	},

    completeToDo(index) {
		/**
		 * controller.getToDos returns the todos for the current list. The following statement gets the id property (an unique key
		 * identifier for all todo instances) and changes its completed status to true. This changes the status of the todo itself
		 * rather than changing a shallow copy. 
		**/
		const completedToDoId = controller.getToDos()[index].id
		model.toDos.forEach(toDo => {
			if (toDo.id === completedToDoId) toDo.completed = !toDo.completed ? true : false
		})
		toDoView.display()
		this.index()
	},
	
	deleteToDo(index) {
		const deletedToDoId = controller.getToDos()[index].id
		model.toDos = model.toDos.filter(toDo => toDo.id !== deletedToDoId)
	    toDoView.display()
		toDos.saveToDos()
		this.index()
	}
}

controller.onStart()

window.addEventListener('beforeunload', controller.onClose)

export { controller }
