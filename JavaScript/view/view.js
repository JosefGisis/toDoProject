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
		listView.display()
		toDoView.display()
		toDoController.index()
		lists.saveCurrentList()
	},

	changeList() {
		model.currentList = model.lists.find((list) => list.id === Number(this.listChangeMenu.value.split(' ')[0]) - 1)
	},
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
		this.checkTitleAvailability()
		this.newList()
		listView.display()
		toDoView.display()
		toDoController.index()
		newListView.cancel()
		lists.saveLists()
		lists.saveCurrentList()
	},

	checkTitleAvailability() {
		for (let list of model.lists) {
			let i = 1
			while (this.newListTitle.value === list.title) {
				this.newListTitle.value = `${this.newListTitle.value}(${i})`
				i++
			}
		}
	},

	newList() {
		model.lists.push(new List(this.newListTitle.value, this.newListDescription))
		model.currentList = model.lists[model.lists.length - 1]
	},
}

const deleteListController = {
	init() {
		this.deleteListButton = document.getElementById('delete-list-button')
		this.deleteListForm = document.getElementById('change-list-form')
		this.deleteListCancel = document.getElementById('delete-list-cancel')
		this.deleteListSubmit = document.getElementById('delete-list-submit')
	},

	createEventListeners() {
		this.deleteListButton.addEventListener('click', () => view.toggleDeleteList())
		this.deleteListCancel.addEventListener('click', () => deleteListView.cancel())
		this.deleteListSubmit.addEventListener('click', () => this.handleSubmission())
	},

	handleSubmission() {
		this.deleteToDos()
		if (model.currentList.id !== 0) this.deleteList()
		deleteListView.cancel()
		listView.display()
		toDoView.display()
		toDoController.index()
		dataHandler.saveAll()
	},

	deleteToDos() {
		model.toDos = model.toDos.filter((toDo) => toDo.membership !== model.currentList.id)
	},

	deleteList() {
		model.lists = model.lists.filter((list) => list.id !== model.currentList.id)
		model.currentList = model.lists[0]
	},
}

const newToDoController = {
	init() {
		this.newToDoTitle = document.getElementById('new-todo-title')
		this.newToDoSubmit = document.getElementById('new-todo-submit')
		this.newToDoDueDate = document.getElementById('new-todo-due-date')
	},

	createEventListeners() {
		this.newToDoTitle.addEventListener('input', () => newToDoView.checkTitleField())
		this.newToDoSubmit.addEventListener('click', () => this.handleSubmission())
	},

	handleSubmission() {
		this.newToDo()
		newToDoView.clearFields()
		toDoView.display()
		toDoController.index()
		toDos.saveToDos()
	},

	newToDo() {
		const newToDoTitle = this.newToDoTitle.value || 'title error'
		const newToDoDueDate = this.newToDoDueDate.value || 'NA'
		const newToDO = new ToDo(newToDoTitle, model.currentList.id, newToDoDueDate)
		model.toDos.unshift(newToDO)
	},
}



controller.onStart()

window.addEventListener('beforeunload', controller.onClose)

export { controller }

import { controller } from './controller.js'

const view = {
	toggleChangeList() {
		changeListView.toggleForm()
		newListView.cancel() 
		deleteListView.cancel()
	},

	toggleNewList() {
		changeListView.cancel()
		newListView.toggleForm()
		deleteListView.cancel() 
	},
	
	toggleDeleteList() {
		changeListView.cancel()
		newListView.cancel() 
		deleteListView.toggleForm()
	},

	updateContent() {
		listView.display()
		toDoView.display()
	}
}

// change list form view handler. Responsible for handling form view, content, and list changes.
const changeListView = {
	displayLists() {
		const lists = controller.getLists()
		const currentList = controller.getCurrentList()
		const listChangeMenu = document.getElementById('list-change-menu')
		
		listChangeMenu.innerHTML = ''

		for (let list of lists) {
			const option = document.createElement('option')
			option.textContent = `${list.id + 1} ${list.title}`
			if (list.id === currentList.id) option.selected = option.disabled = true
			listChangeMenu.appendChild(option)
		}
	},

	toggleForm() {
		const changeList = document.getElementById('change-list')
		if (changeList.classList.contains('hidden')) {
			changeList.classList.replace('hidden', 'block')
			this.displayLists()
		} else changeList.classList.replace('block', 'hidden')
	},

	cancel() {
		const changeList = document.getElementById('change-list')
		changeList.classList.replace('block', 'hidden')
	},
}

// new list form view handler. Responsible for handling form view and new list submissions.
const newListView = {
	clearFields() {
		const newListTitle = document.getElementById('new-list-title')
		const newListDescription = document.getElementById('new-list-description')
		newListTitle.value = newListDescription.value = ''
	},

	checkTitleField() {
		const newListTitle = document.getElementById('new-list-title')
		const newListSubmit = document.getElementById('new-list-submit')
		newListSubmit.style.backgroundColor = newListTitle.value ? 'rgb(14 165 233)' : 'rgb(7, 89, 133)'
        newListSubmit.disabled = newListTitle.value ? false : true
	},

	toggleForm() {
		const newList = document.getElementById('new-list')
		if (newList.classList.contains('hidden')) {
			newList.classList.replace('hidden', 'block')
			this.checkTitleField()
        } else newList.classList.replace('block', 'hidden')
	},

	cancel() {
		const newList = document.getElementById('new-list')
		newList.classList.replace('block', 'hidden')
		this.clearFields()
	},
}

// delete list form view handler. Responsible for handling form view and list deletion.
const deleteListView = {
	toggleForm() {
		const deleteList = document.getElementById('delete-list')
		if (deleteList.classList.contains('hidden')) deleteList.classList.replace('hidden', 'block')
		else deleteList.classList.replace('block', 'hidden')
	},

	cancel() {
		const deleteList = document.getElementById('delete-list')
		deleteList.classList.replace('block', 'hidden')
	}
} 

// New todo form view handles forms appearance and fields. 
const newToDoView = {
	clearFields() {
		const newToDoTitle = document.getElementById('new-todo-title')
		const newToDoDueDate = document.getElementById('new-todo-due-date')
		newToDoTitle.value = newToDoDueDate.value = ''
		this.checkTitleField()
	},

	checkTitleField() {
		const newToDoTitle = document.getElementById('new-todo-title')
		const newToDoSubmit = document.getElementById('new-todo-submit')
		newToDoSubmit.style.backgroundColor = newToDoTitle.value ? 'rgb(14 165 233)' : 'rgb(7, 89, 133)'
		newToDoSubmit.disabled = newToDoTitle.value ? false : true
	}
}

// Current list element handler. Responsible for displaying current list.
const listView = {
    display() {
		const currentList = controller.getCurrentList()
		const currentListSection = document.getElementById('current-list-section')
        currentListSection.innerHTML = ''

		const currentListHTML = `
        <div>
          <h3 class="w-fit rounded-lg | bg-sky-500 | text-4xl font-bold | p-3  mb-5">${currentList.title}</h3>
          <p class=""><i>Created: ${currentList.creationDate}</i></p>
          <h4 class="text-2xl font-semibold my-2">${currentList.description}</h4>
        </div>
        `
		const parser = new DOMParser()
		currentListSection.appendChild(parser.parseFromString(currentListHTML, 'text/html').body.firstChild)
	},
}

export { toDoView, listView, changeListView, newListView, newToDoView, deleteListView, view }