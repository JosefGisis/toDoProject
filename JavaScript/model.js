const model = {
    lists: [],
    toDos: [],
    currentList: ''
}


class List {
    constructor (title, description = null, creationDate) {
        this.title = title
        this.description = description
        this.creationDate = creationDate || new Date().toLocaleString()
    }
}


class ToDo {
    constructor (title, membership, dueDate, creationDate) {
        this.title = title
        this.membership = membership
        this.dueDate = dueDate || 'NA'
        this.creationDate = creationDate || new Date().toLocaleString()
        this.completed = false
    }
}


const retrieveData = {
    retrieveLists() {
        const savedLists = JSON.parse(localStorage.getItem('lists'))
        if (!savedLists) return
        for (let list of savedLists)
            model.lists.push(new List(list.title, list.description, list.creationDate))
    },

	retrieveToDos() {
        const savedToDos = JSON.parse(localStorage.getItem('to-dos'))
        if (!savedToDos) return
        for (let toDo of savedToDos)
            model.toDos.push(new ToDo(toDo.title, toDo.membership, toDo.dueDate, toDo.creationDate))
    },

    retrieveCurrentList() {
        let savedCurrentList = localStorage.getItem('current list')
        const savedLists = localStorage.getItem('lists')

        if (!savedCurrentList) {
            model.lists.unshift(new List('Have You?', 'This is your default list'))
            savedCurrentList = 'Have You?'
        } 
        
        for (let list of model.lists)
            if (savedCurrentList === list.title) model.currentList = list
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
        // removing completed todos should have its own function
        model.toDos = model.toDos.filter(todo => !todo.completed)
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