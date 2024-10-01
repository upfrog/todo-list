/**
 * This code is over-commented, because I want to practice JavaScript
 * documentation standards
 */




let addNewTaskBtn = document.querySelector(".addNewTaskBtn");

/*
Why should I store nodes instead of raw text? If the user has multiple
identical entries to the list, and wants to remove one, it will be difficult
to tell them apart if I store raw text.

This is a global variable. This makes the program not threadsafe, and may
introduce some footguns for the future.

On the up side, the alternative was to constantly pass the taskArray up and
down the call stack, despite many of those functions making no direct use of 
it.
*/
const taskArray = [[]];

//Make sure the default list is selected
taskArray[0] = (["List"]);



//Just for testing
taskArray.push(["Homework"]);


let taskListSelector = document.querySelector("#taskListSelector");

let task1 = document.createElement("option");
task1.textContent = "List";

taskListSelector.appendChild(task1);


let task2 = document.createElement("option");
task2.textContent = "Homework";

taskListSelector.appendChild(task2);



//let defaultList = document.querySelector("#taskListSelector").value;





addNewTaskBtn.addEventListener("click", () => {
    let newTask = document.querySelector("#taskInput")
    let t = newTask.value;

    itemWrapper = wrapItem(t);
    storeNewItem(itemWrapper);
    addToList(itemWrapper, taskArray);
});


createNewTaskListBtn = document.querySelector(".createNewTaskListBtn");

createNewTaskListBtn.addEventListener("click", () => {
    let newTaskList = document.querySelector("#newTaskListInput").value;
    //let t = newTaskList.value;

    if (validateNewTaskList(newTaskList) == false) {
        alert("That name is already in use. Please choose a different one.");
        return;
    }
    let newTaskListOption = document.createElement("option");
    newTaskListOption.textContent = newTaskList;

    taskListSelector.appendChild(newTaskListOption);
    taskArray.push([newTaskList]);
})


function validateNewTaskList(newTaskListName) {
    for (let i = 0; i < taskArray.length; i++) {
        if (taskArray[i][0] === newTaskListName) {
            return false;
        }
    }
    return true;
}


taskListSelector.onchange = (event) => {
    populateList()
}



function populateList() {
    let newTasklist = findCurTaskListIndex(taskArray);
    let container = document.querySelector("#tasks");
    container.replaceChildren();

    for (let j = 1; j < taskArray[newTasklist].length; j++) {
        addToList(taskArray[newTasklist][j], taskArray);
    }
    
}


function storeNewItem(new_item) {
    let i = findCurTaskListIndex(taskArray);
    taskArray[i].push(new_item);
}



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
function findCurTaskListIndex() {
    let curList = document.querySelector("#taskListSelector").value;

    for (let i = 0; i < taskArray.length; i++) {
        if (taskArray[i][0] === curList) {
            return i;
        }
    }

    
    
}





/*

I need to seperate two pieces of logic:
    - Given some text that makes up a task, turn it into a thing on the screen
    - Track that text as part of a specific list, which can later be recalled.
*/





function addToList(itemWrapper) {
    let container = document.querySelector("#tasks");
    



    
    


    container.appendChild(itemWrapper);

    let deleteBtn = itemWrapper.querySelector(".deleteBtn")
    let completeBtn = itemWrapper.querySelector(".completeBtn")

    //Should these be in the item wrapper?
    /*
    deleteBtn.addEventListener("click", function (e) {
        console.log(e)
        //container.removeChild(itemWrapper);
        e.originalTarget.parentNode.parentNode.removeChild(itemWrapper);
        removeStoredItem(itemWrapper);

    });

    completeBtn.addEventListener("click", () => {
        itemWrapper.classList.toggle("completed");
    })
    
    */
    return itemWrapper;
}
    

function wrapItem(item) {
    let content = document.createElement("li");
    content.textContent = item;
    
    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "deleteBtn");
    deleteBtn.textContent = "Remove"

    let completeBtn = document.createElement("button");
    completeBtn.setAttribute("class", "completeBtn");
    completeBtn.textContent = "Completed";
    
    let itemWrapper = document.createElement("div");
    itemWrapper.setAttribute("class", "itemWrapper");
    itemWrapper.appendChild(content);
    itemWrapper.appendChild(deleteBtn);
    itemWrapper.appendChild(completeBtn);


    //Consider putting these back in addToList()
    let container = document.querySelector("#tasks");
    deleteBtn.addEventListener("click", () => {
        container.removeChild(itemWrapper);
        removeStoredItem(itemWrapper);
    });

    completeBtn.addEventListener("click", () => {
        itemWrapper.classList.toggle("completed");
    })
    

    return itemWrapper;
}


function removeStoredItem(wrappedItem) {
    let i = findCurTaskListIndex(taskArray);

    let toDelete = taskArray[i].indexOf(wrappedItem);

    taskArray[i].splice(toDelete, 1);
}


/*
Future Improvements:
- Add subtasks
- Make the design less painful
- Add a "see completed tasks" button and/or a "clear all" button
- Add a select button?
- Implement a search
- Make the search extra fancy and use a trie or similar
- Remove a task list


Completed Improvements:
- Add a "completed" button that crosses a task out/greys it out/moves it to
a completed list/something
- Add multiple tabs of tasks
*/