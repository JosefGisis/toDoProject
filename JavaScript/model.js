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
    constructor (title, membership, dueDate = 'NA') {
        this.title = title
        this.dueDate = dueDate
        this.membership = membership
        this.creationDate = new Date().toDateString()
        this.completed = false
    }
}


const retrieveData = {
    retrieveLists() {
        const savedLists = JSON.parse(localStorage.getItem('lists'))
        for (let list of savedLists)
            model.lists.push(new List(list.title, list.description))
    },

	retrieveToDos() {
        const savedToDos = JSON.parse(localStorage.getItem('to-dos'))
        for (let toDo of savedToDos)
            model.toDos.push(new ToDo(toDo.title, toDo.dueDate))
    },

    retrieveCurrentList() {
        const savedCurrentList = localStorage.getItem('current list')
        if (!savedCurrentList) {
            const newDefaultList = new List('Have You?', 'This is your default list')
            model.lists.unshift(newDefaultList)
            model.currentList = model.lists[0].title
            saveData.saveCurrentList()
        } else model.currentList = savedCurrentList.value
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
        localStorage.setItem('current list', model.currentList)
    },

    saveAll() {
        this.saveLists()
        this.saveToDos()
        this.saveCurrentList()
    }
} 

export { model, ToDo, List, retrieveData, saveData }