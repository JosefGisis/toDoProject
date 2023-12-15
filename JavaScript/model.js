const model = {
    lists: [],
    toDos: [],
    currentList: ''
}


class List {
    // instanceCounter provides unique key for each object instance
    static instanceCounter = 0

    constructor (title, description = null, creationDate) {
        this.title = title
        this.description = description
        this.creationDate = creationDate || new Date().toLocaleString()
        List.instanceCounter++
        this.id = List.instanceCounter
    }
}


class ToDo {
    static instanceCounter = 0

    constructor (title, membership, dueDate, creationDate) {
        this.title = title
        this.membership = membership
        this.dueDate = dueDate || 'NA'
        this.creationDate = creationDate || new Date().toDateString()
        this.completed = false
        this.id = ToDo.instanceCounter++
    }
}


const retrieveData = {
    retrieveLists() {
        const savedLists = JSON.parse(localStorage.getItem('lists'))
        if (!savedLists) return
        model.lists = savedLists.map(list => new List(list.title, list.description, list.creationDate))
    },

	retrieveToDos() {
        const savedToDos = JSON.parse(localStorage.getItem('to-dos'))
        if (!savedToDos) return
        model.toDos = savedToDos.map(toDo => new ToDo(toDo.title, toDo.membership, toDo.dueDate, toDo.creationDate))
    },

    retrieveCurrentList() {
        let savedCurrentList = localStorage.getItem('current list')
        // Following segment does not follow single responsibility
        if (!savedCurrentList) {
            model.lists.unshift(new List('Have You?', 'This is your default list'))
            savedCurrentList = 'Have You?'
        } 
        model.currentList = model.lists.find(list => list.title === savedCurrentList)
    },

    retrieveAll() {
        this.retrieveLists()
        this.retrieveToDos()
        this.retrieveCurrentList()
    }
}


const saveData = {
    saveLists() {
        localStorage.setItem('lists', JSON.stringify(model.lists))
    },

	saveToDos() {
        localStorage.setItem('to-dos', JSON.stringify(model.toDos))
    },

    saveCurrentList() {
        localStorage.setItem('current list', model.currentList.title)
    },

    saveAll() {
        this.saveLists()
        this.saveToDos()
        this.saveCurrentList()
    }
} 

export { model, ToDo, List, retrieveData, saveData }