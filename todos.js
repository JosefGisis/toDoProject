class ToDo {
    constructor (title, description = null, dueDate = null) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.creationDate = new Date().toLocaleString()
        this.completed = false
    }
}

export { ToDo }