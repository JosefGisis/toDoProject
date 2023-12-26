import { controller } from '../controller/controller.js'

const changeListView = {
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

export {changeListView}