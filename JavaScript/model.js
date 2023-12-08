
const model = {
    lists: [
        {title: 'Have You?', description: 'This is your default collection'}
    ],
    toDos: [       
    ],
    currentList: ''
}

class ToDo {
    constructor (title, dueDate = null) {
        this.title = title
        this.dueDate = dueDate
        this.membership = model.currentList
        this.creationDate = new Date().toLocaleString()
        this.completed = false
    }
}


export { model, ToDo }