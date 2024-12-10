function addTask() {
    const newTaskText = document.getElementById("newTask").value.trim(); // Trim spaces
    if (newTaskText === "") return; // Prevent empty tasks

    const taskList = document.getElementById("tasks");
    const taskItem = document.createElement("li");
    taskItem.className = "task";

    // Initialize the edit count to 0 and store it as a dataset property
    taskItem.dataset.editCount = 0;

    taskItem.innerHTML = `
        <input type="text" value="${newTaskText}" readonly>
        <button class="editTask"><i class="fa-regular fa-pen-to-square"></i></button>
        <button class="completeTask"><i class="fa-solid fa-check"></i></button>
        <button class="deleteTask"><i class="fa-solid fa-trash"></i></button>
        <span class="editCount"><i class="fa-solid fa-message"></i></span>
    `;

    taskList.appendChild(taskItem);

    // Clear the input field
    document.getElementById("newTask").value = "";

    // Attach event listeners
    const editButton = taskItem.querySelector(".editTask");
    const completeButton = taskItem.querySelector(".completeTask");
    const deleteButton = taskItem.querySelector(".deleteTask");

    editButton.addEventListener("click", () => editTask(taskItem));
    completeButton.addEventListener("click", () => completeTask(taskItem));
    deleteButton.addEventListener("click", () => deleteTask(taskItem));
}

function editTask(taskItem) {
    const taskInput = taskItem.querySelector("input[type='text']");
    const editButton = taskItem.querySelector(".editTask");
    const editCountSpan = taskItem.querySelector(".editCount");

    if (taskInput.readOnly) {
        taskInput.readOnly = false;
        taskInput.focus();
        editButton.innerHTML = `<i class="fa-regular fa-floppy-disk"></i>`;
    } else {
        taskInput.readOnly = true;

        // Increment the edit count and update the display
        taskItem.dataset.editCount = parseInt(taskItem.dataset.editCount) + 1;
        editCountSpan.textContent = `[${taskItem.dataset.editCount}]`;

        editButton.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
    }
}

function completeTask(taskItem) {
    const taskInput = taskItem.querySelector("input[type='text']");
    taskInput.classList.toggle("strikethrough");
    taskItem.querySelector(".editTask").style.display = "none";
    taskItem.querySelector(".completeTask").style.display = "none";
}

function deleteTask(taskItem) {
    taskItem.remove();
}

document.getElementById("newTask").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

document.getElementById("addTask").addEventListener("click", addTask);
