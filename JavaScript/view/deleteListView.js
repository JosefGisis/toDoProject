
// delete list form view handler. Responsible for handling form view and list deletion.
const deleteListView = {
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

    toggleForm() {
		const deleteList = document.getElementById('delete-list')
		if (deleteList.classList.contains('hidden')) deleteList.classList.replace('hidden', 'block')
		else deleteList.classList.replace('block', 'hidden')
    },

    cancel() {
            const deleteList = document.getElementById('delete-list')
            deleteList.classList.replace('block', 'hidden')
    },
} 

export { deleteListView }