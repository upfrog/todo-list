
let btn = document.querySelector(".addNewTaskBtn");

const task_array = [[]];

//Make sure the default list is selected
task_array[0][0] = "List";


let taskListSelector = document.querySelector("#taskListSelector");

let task1 = document.createElement("option");
task1.textContent = "Pfffffffffff";

taskListSelector.appendChild(task1);


let defaultList = document.querySelector("#taskListSelector").value;







btn.addEventListener("click", () => {
    let newTask = document.querySelector("#taskInput")
    let t = newTask.value;

    addToList(t)
});







function populateList(list) {
    list.forEach((item) => addToList(item));
}






function addToList(item) {
    let container = document.querySelector("#tasks");
    

    let content = document.createElement("li");
    content.textContent = item;
    
    let deleteBtn = document. createElement("button");
    deleteBtn.textContent = "Remove"

    let completeBtn = document.createElement("button");
    completeBtn.textContent = "Completed";
    
    let itemWrapper = document.createElement("div");
    itemWrapper.setAttribute("id", "itemWrapper");
    itemWrapper.appendChild(content);
    itemWrapper.appendChild(deleteBtn);
    itemWrapper.appendChild(completeBtn);

    
    


    container.appendChild(itemWrapper);

    deleteBtn.addEventListener("click", () => {
        container.removeChild(itemWrapper);
    });

    completeBtn.addEventListener("click", () => {
        itemWrapper.classList.toggle("completed");
    })
    

}
    


/*

Improvements:
- Add a "completed" button that crosses a task out/greys it out/moves it to
a completed list/something
- Add multiple tabs of tasks
- Add subtasks
- Make the design less painful
- Add a "see completed tasks" button and/or a "clear all" button
- Add a select button?

*/