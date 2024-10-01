
const btn = document.querySelector(".addNewTaskBtn");

btn.addEventListener("click", () => {
    const newTask = document.querySelector("#taskInput")
    let t = newTask.value;

    addToList(t)
});









function addToList(item) {


    /*
    const container = document.querySelector("#tasks");

    const content = document.createElement("div");
    content.classList.add("content");
    content.textContent = item;

    container.appendChild(content);
    */

    const container = document.querySelector("#tasks");
    

    const content = document.createElement("li");
    content.textContent = item;
    
    const deleteBtn = document. createElement("button");
    deleteBtn.textContent = "Remove"
    
    const itemWrapper = document.createElement("div");
    itemWrapper.setAttribute("id", "itemWrapper");
    itemWrapper.appendChild(content);
    itemWrapper.appendChild(deleteBtn);

    
    


    container.appendChild(itemWrapper);

    deleteBtn.addEventListener("click", () => {
        container.removeChild(itemWrapper);
    });
    

}
    


