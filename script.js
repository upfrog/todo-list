/**
 * This code is over-commented, because I want to practice JavaScript
 * documentation standards
 */


let btn = document.querySelector(".addNewTaskBtn");

const taskArray = [[]];

//Make sure the default list is selected
taskArray[0][0] = "List";



//Just for testing
taskArray[1][0] = "Homework";


let taskListSelector = document.querySelector("#taskListSelector");

let task1 = document.createElement("option");
task1.textContent = "List";

taskListSelector.appendChild(task1);


let task2 = document.createElement("option");
task2.textContent = "Homework";

taskListSelector.appendChild(task2);



//let defaultList = document.querySelector("#taskListSelector").value;








btn.addEventListener("click", () => {
    let newTask = document.querySelector("#taskInput")
    let t = newTask.value;

    addToList(t)
    //storeNewItem(taskArray, t);
    
});

/*
taskListSelector.onchange = (event) => {
    populateList()
}




function storeNewItem(taskArray, new_item) {
    let i = findCurTaskListIndex(taskArray);
    taskArray[i].push(new_item);
}
*/


/**
 * Finds the subarray with the name of the currently selected task list
 * 
 * This is simpler than using a global variable to track the current list,
 * or passing around a variable.
 * 
 * This currently lacks error handling.
 * 
 * @param {Array}   taskArray   2D array. Each subarray contains the name of
 *                              the list at index[0], followed by the text
 *                              contents of the list.
 *        
 * @returns {Number}    The index of the list with the currently selected name.
 */
function findCurTaskListIndex(taskArray) {
    let curList = document.querySelector("#taskListSelector").value;

    for (let i = 0; i < taskArray.length; i++) {
        if (taskArray[i][0] === curList) {
            break;
        }
    }

    return i;
}



function populateList(list) {
    let container = document.querySelector("#tasks");
    container.replaceChildren();

    for (let i = 1; i < list.length; i++) {
        addToList(item);
    }
}


/*

I need to seperate two pieces of logic:
    - Given some text that makes up a task, turn it into a thing on the screen
    - Track that text as part of a specific list, which can later be recalled.
*/





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