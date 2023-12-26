import { model, ToDo, List, toDos, lists, dataHandler } from '../model/model.js'
import { listView } from '../view/listView.js'
import { toDoView } from '../view/toDoView.js'
import { changeListView, newListView, deleteListView } from '../view/listControlView.js'
import { newToDoView } from '../view/newToDoView.js'

const controller = {
	onStart() {
		dataHandler.retrieveAll()
		const viewObjects = [changeListView, deleteListView, newListView, listView, newToDoView, toDoView]
		for (let view of viewObjects) {
			view.init && view.init()
			view.createEventListeners && view.createEventListeners()
		}
		newToDoView.checkTitleField()
		toDoView.display()
		listView.display()
	},
	
	onClose() {
		model.toDos = model.toDos.filter((toDo) => !toDo.completed)
		dataHandler.saveAll()
	},
	
	getCurrentList() {
		return model.currentList
	},
	
	getLists() {
		return model.lists
	},
	
	getToDos() {
		return model.toDos
	},
	
	getCurrentToDos() {
		const toDos = model.toDos.filter((toDo) => toDo.membership === model.currentList.id)
		return toDos.sort(toDo => {
			if (!toDo.completed) return -1
			return 1 
		})
	},

	getOrderedToDos() {
		return
	},
	
	//************************************************************************* */
	changeCurrentList(index) {
		model.currentList = model.lists[index]
		listView.display()
		toDoView.display()
		lists.saveCurrentList()
	},
	
	newList(title, description) {
		model.lists.push(new List(title, description))
		model.currentList = model.lists[model.lists.length - 1]
		listView.display()
		toDoView.display()
		lists.saveLists()
	},
	
	deleteCurrentToDos() {
		model.toDos = model.toDos.filter((toDo) => toDo.membership !== model.currentList.id)
		toDoView.display()
		toDos.saveToDos()
	},
	
	deleteCurrentList() {
		model.lists = model.lists.filter((list) => list.id !== model.currentList.id)
        model.currentList = model.lists[0]
		listView.display()
		lists.saveLists()
    },
		
	
    //****************************************************************************** */
	newToDo(title, dueDate) {
		model.toDos.unshift(new ToDo(title, model.currentList.id, dueDate))
		toDoView.display()
		toDos.saveToDos()
	},
	
	completeToDo(index) {
		model.toDos[index].completed = !model.toDos[index].completed
		toDoView.display()
		toDos.saveToDos()
	},
	
	deleteToDo(index) {
		model.toDos.splice(index, 1)
		toDoView.display()
		toDos.saveToDos()
	},
}

controller.onStart()

window.addEventListener('beforeunload', controller.onClose)

export { controller }