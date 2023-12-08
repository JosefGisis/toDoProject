class ToDo {
    constructor (title, dueDate = null) {
        this.title = title
        this.dueDate = dueDate
        this.creationDate = new Date().toLocaleString()
        this.completed = false
    }
}


class List {
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


class DefaultList extends List { 
    constructor() {
        super('Have You?', 'This is your default list')
    }
}


export { List, DefaultList }