class ToDo {
    constructor (title, dueDate = null) {
        this.title = title
        this.dueDate = dueDate
        this.creationDate = new Date().toLocaleString()
        this.completed = false
    }
}


class Collection {
    constructor(title, description = null) {
        this.title = title
        this.description = description
        this.creationDate = new Date().toLocaleString()
        this.toDos = []   
    }

    addToDo(title, dueDate = null) {
        const newToDo = new ToDo(title, dueDate)
        this.toDos.push(newToDo)
    }

}


class DefaultCollection extends Collection { 
    constructor() {
        super('Have You?', 'This is your default collection')
    }
}


export { Collection, DefaultCollection }