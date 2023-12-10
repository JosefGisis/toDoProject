import { model, ToDo, List } from './model.js'
import { buttonView, listView, toDoView } from './view.js'

const retrieveData = {

}


const saveData = {

}


const controller = {
    onStart() {
        for (let i = 0; i < 10; i++) {
            const newToDo = new ToDo(`hello there! ${i}`)
            model.toDos.push(newToDo)
        }
        const defaultList = new List('HAVE YOU?', 'This is your default list.')
        model.lists.push(defaultList)
        model.currentList = model.lists[0]
        listView.init()
    },

    getToDos() {
        return model.toDos
    },

    getCurrentList() {
        return model.currentList
    },

    getLists() {
        return model.lists
    }
}

controller.onStart()

export { saveData, retrieveData, controller }
