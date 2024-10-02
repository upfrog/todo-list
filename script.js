/**
 * This code is over-commented, because I want to practice JavaScript
 * documentation standards.
 * 
 * Potential future improvements:
 * - Make the page less ugly!
 * - Add ability to delete a task list
 * - Add ability to clear a task list
 * - Add subtasks
 * - Add a select button enable eg deleting many items at once
 * - Add ability to sort tasks
 * - Add ability to see all completed tasks
 * - Add a search function
 *      - Extra: Make that search fancy with a trie!
 * - Enable adding tasks with Enter
 * - Add a beforeUnload alert asking if you are sure you want to lose your data
 * - Use event delegation to be more efficient
 * 
 * Completed Improvements:
 * - Add a way to mark a task as completed while not removing it.
 * - Add multiple tabs of tasks. 
 * 
 */

/**
 * This array stores all session data. Each subarray represents a
 * task list.
 * 
 * Index[0] of a given sub array is that task list's name. The rest
 * of the array is the related task nodes. Storing nodes instead of
 * raw text makes it easier to distinguish multiple identical tasks.
 * 
 * If this was not global, I would have to pass it up and down the
 * call stack, through many functions which make no direct use of it.
 * This seems like more of a problem than using a global variable.
 */
const taskArray = [[]];

init();

function init() {
    setupTaskListManager();
    setupTaskManager();
}

/**
 * Sets up an event listener for adding new tasks to a list.
 */
function setupTaskManager() {
    let addNewTaskBtn = document.querySelector(".addNewTaskBtn");
    
    addNewTaskBtn.addEventListener("click", () => {
        let newTask = document.querySelector("#taskInput").value;

        itemWrapper = wrapItem(newTask);
        storeNewItem(itemWrapper);
        drawItem(itemWrapper, taskArray);
    });
}

/**
 * Sets up a default task list and several related event listeners.
 */
function setupTaskListManager() {
    //Create a default task list
    taskArray[0] = (["Default"]);
    let taskListSelector = document.querySelector("#taskListSelector");
    let defaultTask = document.createElement("option");
    defaultTask.textContent = taskArray[0][0];
    taskListSelector.appendChild(defaultTask);

    //Set up listener to add new task lists.
    createNewTaskListBtn = document.querySelector(".createNewTaskListBtn");
    createNewTaskListBtn.addEventListener("click", () => {
        let newTaskList = document.querySelector("#newTaskListInput").value;

        if (validateNewTaskListName(newTaskList) == false) {
            alert("That name is already in use. Please choose a different one.");
            return;
        }
        let newTaskListOption = document.createElement("option");
        newTaskListOption.textContent = newTaskList;

        taskListSelector.appendChild(newTaskListOption);
        taskArray.push([newTaskList]);
    })

    //Set up listener to redraw list when list selector is changed.
    taskListSelector.onchange = function() {
        clearAndPopulateList()
    }
}


/**
 * @param {string} newTaskListName
 * 
 * @returns {boolean}   Whether or not the newTaskListName is valid.
 */
function validateNewTaskListName(newTaskListName) {
    for (let i = 0; i < taskArray.length; i++) {
        if (taskArray[i][0] === newTaskListName) {
            return false;
        }
    }
    return true;
}

/**
 * Clears the current list and replaces it with new content.
 */
function clearAndPopulateList() {
    let newTasklist = findCurTaskListIndex(taskArray);
    document.querySelector("#tasks").replaceChildren();

    for (let j = 1; j < taskArray[newTasklist].length; j++) {
        drawItem(taskArray[newTasklist][j], taskArray);
    }
}

/**
 * Adds a node to the appropriate task sublist.
 * 
 * @param {node} newItem    A prepared node.
 */
function storeNewItem(newItem) {
    let i = findCurTaskListIndex(taskArray);
    taskArray[i].push(newItem);
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

/**
 * Appends a node to the DOM.
 * 
 * @param {node} itemWrapper    A prepared node.
 */
function drawItem(itemWrapper) {
    let container = document.querySelector("#tasks");
    container.appendChild(itemWrapper);
}
    
/**
 * Prepares a string of user input to be added to the list.
 * 
 * Wraps user input in an HTML li, adds buttons, and binds listeners.
 * This is seperated into it's own function to allow for re-use of
 * the code for adding an object to the DOM. A given piece of user
 * input may be added to and removed from the DOM many times, but
 * it should only be wrapped in an HTML element once.
 * 
 * @param {string}  Item    The inputted text to be added to the list.
 * 
 * @returns {node}  A node which contains the text Item, and is
 *                  ready to be added to the DOM.
 */
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

/**
 * Removes a given node from the taskArray.
 * 
 * @param {node} wrappedItem    A node which has previously been
 *                              processed.
 */
function removeStoredItem(wrappedItem) {
    let i = findCurTaskListIndex(taskArray);
    let toDelete = taskArray[i].indexOf(wrappedItem);
    taskArray[i].splice(toDelete, 1);
}


