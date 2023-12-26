import { controller } from '../controller/controller.js'

const newToDoView = {
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
	
	clearFields() {
		this.newToDoTitle.value = this.newToDoDueDate.value = ''
		this.checkTitleField()
	},
	
	checkTitleField() {
		this.newToDoSubmit.style.backgroundColor = this.newToDoTitle.value ? 'rgb(14 165 233)' : 'rgb(7, 89, 133)'
		this.newToDoSubmit.disabled = this.newToDoTitle.value ? false : true
	}
}

export { newToDoView }