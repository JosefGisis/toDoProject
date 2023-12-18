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
			option.textContent = list.title
			if (list.title === currentList.title) option.selected = option.disabled = true
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

// Todo element handler. Responsible for displaying todos.
const toDoView = {
	display() {
		const toDos = controller.getToDos()
		const toDoSection = document.getElementById('todo-section')
        toDoSection.innerHTML = ''
		
		for (let toDo of toDos) {
			const toDoHTML = `
				<div class="flex flex-wrap content-center items-center justify-between | rounded-lg | bg-slate-800 | transition-all | p-3 mb-5 hover:bg-slate-600 ${ toDo.completed ? 'line-through text-rose-400' : '' }">

				    <div>
						<h3 class="rounded-lg | text-xl font-bold">${toDo.title}</h3>
						<p class="text-sm"><i>Created: ${toDo.creationDate}</i></p>
					</div>
					
					<div>
						<p>Due: ${ toDo.dueDate }</p>
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
			toDoSection.appendChild(parser.parseFromString(toDoHTML, 'text/html').body.firstChild)
		}
	},
}

export { toDoView, listView, changeListView, newListView, newToDoView, deleteListView, view }
