const model = {
    lists: [],
    toDos: [],
    currentList: ''
}

class List {
    constructor (title, description = null) {
        this.title = title
        this.description = description
        this.creationDate = new Date().toLocaleString()
    }
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


export { model, ToDo, List }