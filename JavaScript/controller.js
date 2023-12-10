import { model, ToDo } from './model.js'
import { buttonView, listView, toDoView } from './view.js'

const retrieveData = {

}


const saveData = {

}


const controller = {
    onStart() {
        model.currentList = 'Have You?'
        for (let i = 0; i < 10; i++) {
            const newToDo = new ToDo(`hello there! ${i}`)
            model.toDos.push(newToDo)
        }
    },

    display() {
        for (let toDo of model.toDos)
            console.log(`${toDo.title}: ${toDo.membership}`)
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
controller.display()

export { saveData, retrieveData, controller }
