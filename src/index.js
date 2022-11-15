import { renderTodos } from './UI'


console.log("Hello world!")

let tasks = [];


const todoItem = (id, title, description, dueDate, priority, complete) => {
    if (!id) {
        id = Date.now()
        complete = false}
    
    return { id, title, description, dueDate, priority, complete}
}

//const project = (title) => {
//    items = new Array();
//    return { title, items }
//}


const addNewTask = function (taskObject) {
    tasks.push(taskObject)
    addToLocalStorage(tasks);
    renderTodos(tasks);
}

const changeTask = function (taskObject){
    tasks.forEach(function(item){
        if (item.id == taskObject.id){
            console.log("item match")
            item.title = taskObject.title
            item.description = taskObject.description
            item.dueDate = taskObject.dueDate
            item.priority = taskObject.priority;
        }
    })
    addToLocalStorage(tasks)
    renderTodos(tasks)
}

const addToLocalStorage = function (taskArray) {
    localStorage.setItem("storage", JSON.stringify(taskArray))
}

const removeTodo = function(id){
    tasks = tasks.filter((item) => item.id != id)
    addToLocalStorage(tasks)
    renderTodos(tasks)
}

const toggleComplete = function (id) {
    tasks.forEach(function(item){
        if (item.id == id){
            item.complete = !item.complete;
        }
    })
    addToLocalStorage(tasks)
    renderTodos(tasks)
}

const getTaskById = function (id){
    let task;
    tasks.forEach(function(item){
        if (item.id == id){
            task = item;
        }
    })
    console.log("task found")
    return task
}



let onLoad = function () {
    let storage = JSON.parse(localStorage.getItem("storage")) 
    if (storage){
        tasks = storage
        console.log("storage retrived")
        renderTodos(tasks)
    } //else {
    //    tasks = []
    //    console.log("storage created")
    //}

};

onLoad()

export { changeTask, todoItem, addNewTask, removeTodo, getTaskById, toggleComplete }
