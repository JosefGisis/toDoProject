import { controller } from '../controller/controller.js'

const newListView = {
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

export { newListView }