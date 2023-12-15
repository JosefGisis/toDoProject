import { controller } from './controller.js'

/*********************************************************************************************
 * change list form view handler. Responsible for handling form view, content, and list changes.
**********************************************************************************************/
const changeListFormView = {
	init() {
		const lists = controller.getLists()
		const currentList = controller.getCurrentList()
		const listChangeMenu = document.getElementById('list-change-menu')
		// clear change drop-down menu, so lists are not duplicated
		listChangeMenu.innerHTML = ''

		for (let list of lists) {
			const option = document.createElement('option')
			option.textContent = list.title
			// currently displayed list shows up as an option but is not selectable
			if (list.title === currentList.title) option.selected = option.disabled = true
			listChangeMenu.appendChild(option)
		}
	},

	toggleChangeForm() {
		const changeListForm = document.getElementById('change-list-form')
		if (changeListForm.classList.contains('hidden')) changeListForm.classList.replace('hidden', 'block')
		else changeListForm.classList.replace('block', 'hidden')
	},

	cancelChange(e) {
		const changeListForm = document.getElementById('change-list-form')
		e.preventDefault()
		changeListForm.classList.replace('block', 'hidden')
	},
}


/****************************************************************************************
 * new list form view handler. Responsible for handling form view and new list submissions.
****************************************************************************************/
const newListFormView = {
	clearFields() {
		const newListTitle = document.getElementById('new-list-title')
		const newListDescription = document.getElementById('new-list-description')
		newListTitle.value = ''
		newListDescription.value = ''
	},

	checkTitleField() {
		const newListTitle = document.getElementById('new-list-title')
		const newListSubmit = document.getElementById('new-list-submit')
		newListSubmit.style.backgroundColor = newListTitle.value ? 'rgb(14 165 233)' : 'rgb(7, 89, 133)'
        newListSubmit.disabled = newListTitle.value ? false : true
	},

	toggleListForm() {
		const newListForm = document.getElementById('new-list-form')
		if (newListForm.classList.contains('hidden')) newListForm.classList.replace('hidden', 'block')
		else newListForm.classList.replace('block', 'hidden')
		// if form is visible check if title has been entered
		if (newListForm.classList.contains('block')) this.checkTitleField()
	},

	cancelList(e) {
		const newListForm = document.getElementById('new-list-form')
		e.preventDefault()
		newListForm.classList.replace('block', 'hidden')
		this.clearFields()
	},
}


const deleteListFormView = {
	toggleForm() {
		console.log('active')
		const deleteListForm = document.getElementById('delete-list-form')
		if (deleteListForm.classList.contains('hidden')) deleteListForm.classList.replace('hidden', 'block')
		else deleteListForm.classList.replace('block', 'hidden')
	},

	cancel() {
		const deleteListForm = document.getElementById('delete-list-form')
		deleteListForm.classList.replace('block', 'hidden')
	}
} 


/********************************************************* 
 * New todo form view handles forms appearance and fields. 
*********************************************************/
const newToDoFormView = {
  clearFields() {
    const newToDoTitle = document.getElementById('new-todo-title')
    const newToDoDueDate = document.getElementById('new-todo-due-date')
    newToDoTitle.value = ''
    newToDoDueDate.value = ''
  },

  checkTitleField() {
    const newToDoTitle = document.getElementById('new-todo-title')
    const newToDoSubmit = document.getElementById('new-todo-submit')
    newToDoSubmit.style.backgroundColor = newToDoTitle.value ? 'rgb(14 165 233)' : 'rgb(7, 89, 133)'
    newToDoSubmit.disabled = newToDoTitle.value ? false : true
  }
}


const currentListView = {
	init() {
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
		const currentListNode = parser.parseFromString(currentListHTML, 'text/html').body.firstChild
		currentListSection.appendChild(currentListNode)
	},
}

const toDoView = {
	init() {
		const toDos = controller.getToDos()
		const toDoSection = document.getElementById('todo-section')
        toDoSection.innerHTML = ''
		for (let toDo of toDos) {
			const toDoHTML = `
				<div class="flex content-center items-center justify-between | rounded-lg | bg-slate-800 | transition-all | p-3 mb-5 hover:bg-slate-600 ${ toDo.completed ? 'line-through text-rose-400' : '' }">
					
				    <div>
						<h3 class="rounded-lg | text-xl font-bold">${toDo.title}</h3>
						<p class="text-sm"><i>Created: ${toDo.creationDate}</i></p>
					</div>
					
					<div>
						<p>Due:${ toDo.dueDate }</p>
					</div>

					<div class="border-2 rounded-md">
						<div class="complete-todo-icon | p-2 rounded-md | bg-slate-700 hover:bg-slate-800 | transition-all">
						
						    <div>
								<img src="/images/checkbox.svg" width="20px" height="20px" alt="checkbox icon">
							</div>
						
							<div class="absolute translate-y-[-22px] translate-x-[2px] | ${ toDo.completed ? 'opacity-100' : 'opacity-0' } | transition-all">
								<img src="/images/checkmark.svg" width="20px" height="20px" alt="checkmark">
							</div>
						
						</div>  
					</div>

					<div class="border-2 rounded-md">
						<div class="delete-todo-icon | p-2 rounded-md | bg-slate-700 hover:bg-slate-800 | transition-all">
							<img src="/images/delete-icon.svg" width="14px" height="20px" alt="icon for new list button">   
						</div>      
					</div>
				
				</div>
			`
			const parser = new DOMParser()
			const newToDo = parser.parseFromString(toDoHTML, 'text/html').body.firstChild
			toDoSection.appendChild(newToDo)
		}
	},
}

export { toDoView, currentListView, changeListFormView, newListFormView, newToDoFormView, deleteListFormView }
