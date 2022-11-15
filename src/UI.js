import { todoItem, addNewTask, changeTask, removeTodo, getTaskById, toggleComplete } from './index'
let taskContainer = document.querySelector("#taskContainer");

const toggleNewTaskForm = function () {
    let taskPopUp = document.querySelector("#taskFormContainer");
    let todoForm = document.querySelector("#todoForm")
    if (taskPopUp.style.visibility == 'visible'){
            taskPopUp.style.visibility = 'hidden';
            todoForm.reset()
            document.querySelector(".felmeddelande").style.visibility = "hidden"
    }else{
        taskPopUp.style.visibility = 'visible';
    }
}

const clearTaskContainer = function () {
    while(taskContainer.firstChild){
        taskContainer.removeChild(taskContainer.firstChild);
    }
}

const renderTodos = function (array) {
    clearTaskContainer()
    array.forEach(createTaskCard)
}


let createTaskCard = function(taskObject) {
    let taskButton = document.createElement("button");
    let titleSpan = document.createElement("span");
    let checkSymbol = document.createElement("span");
    let title = document.createElement("span");
    let deleteSpan = document.createElement("span");
    let dueDateSpan = document.createElement("span");
    let deleteSymbol = document.createElement("span");

    taskButton.setAttribute("class","main-button task-button")
    taskButton.setAttribute("data-key", taskObject.id)

    checkSymbol.setAttribute("class","checkbox")
    if (!taskObject.complete){
        checkSymbol.innerHTML = "&#9744"
    } else {
        checkSymbol.innerHTML = "&#9746"
        checkSymbol.classList.add("checked")
    }

    title.setAttribute("class", "title");
    title.textContent = taskObject.title;

    dueDateSpan.setAttribute("class", "due-date");
    dueDateSpan.textContent = taskObject.dueDate;

    deleteSymbol.setAttribute("class","delete-symbol")
    deleteSymbol.innerHTML = "&#10005;"
    
    titleSpan.appendChild(checkSymbol);
    titleSpan.appendChild(title);
    deleteSpan.appendChild(dueDateSpan);
    deleteSpan.appendChild(deleteSymbol);
    taskButton.appendChild(titleSpan);
    taskButton.appendChild(deleteSpan);
    taskContainer.appendChild(taskButton);

}

const saveForm = function () {
    const titleInput = document.querySelector('#title').value;
    const descriptionInput = document.querySelector('#description').value;
    const dueDateInput = document.querySelector('#due-date').value;
    const priorityInput = document.querySelector('#prio').value;
    const idInput = document.querySelector('#id').value;

    if (titleInput !== ''){
        let newItem = todoItem(idInput, titleInput, descriptionInput, dueDateInput, priorityInput)
        if (!idInput){
            addNewTask(newItem)
        } else {
            changeTask(newItem)
        }
            
        toggleNewTaskForm()
        console.log("form saved")
    } else {
        document.querySelector(".felmeddelande").style.visibility = "visible"
    }

}

const fillForm = function (taskObject) {
    const idInput = document.querySelector("#id")
    const titleInput = document.querySelector("#title");
    const descriptionInput = document.querySelector("#description");
    const dueDateInput = document.querySelector("#due-date");
    const priorityInput = document.querySelector("#prio");
    idInput.value = taskObject.id;
    titleInput.value = taskObject.title;
    descriptionInput.value = taskObject.description;
    dueDateInput.value = taskObject.dueDate;
    priorityInput.value = taskObject.priority
    toggleNewTaskForm()
    
}


let addTaskButton = document.querySelector("#add-task-button");
addTaskButton.addEventListener("click", toggleNewTaskForm);

let cancelFormButton = document.querySelector("#cancelForm");
cancelFormButton.addEventListener("click", toggleNewTaskForm);

let saveFormButton = document.querySelector("#saveForm");
saveFormButton.addEventListener("click", saveForm);

let taskList = document.querySelector("#taskContainer")
taskList.addEventListener("click", function(event){
    let parent_id = event.target.closest(".task-button").getAttribute("data-key")
    let target = event.target;

    if (target.classList.contains('delete-symbol')){
        removeTodo(parent_id)
        console.log("item deleted")
    }
    if(target.classList.contains("task-button") || target.classList.contains("title") || target.classList.contains("due-date")){
        let task = getTaskById(parent_id)
        fillForm(task)
    }
    if(target.classList.contains("checkbox")){
        toggleComplete(parent_id)
        if (target.classList.contains("checked")){
            target.innerHTML = "&#9744"
            target.classList.remove("checked");
            
        } else {
            target.innerHTML = "&#9746"
            target.classList.add("checked");
        }
            
    }

})


export {renderTodos };