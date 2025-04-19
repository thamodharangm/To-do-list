document.getElementById("add-btn").addEventListener("click", addTask);

function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const taskList = document.getElementById("task-list");

    const li = document.createElement("li");
    li.classList.add("task-item");

    // Create input field for task text
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = taskText;
    inputField.disabled = true;

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete";

    // Add input field and delete button to the list item
    li.appendChild(inputField);
    li.appendChild(deleteButton);

    // Mark task as completed when clicked
    li.addEventListener("click", function() {
      li.classList.toggle("completed");
    });

    // Delete task when delete button is clicked
    deleteButton.addEventListener("click", function(e) {
      e.stopPropagation(); // Prevent marking as completed
      deleteTask(li); // Call deleteTask function
    });

    taskList.appendChild(li);
    taskInput.value = ""; // Clear input field
  }
}

function deleteTask(taskItem) {
  const taskInput = taskItem.querySelector("input[type='text']");
  const taskName = taskInput.value;
  taskItem.remove();
  showPopup(`"${taskName}" deleted successfully!`);
}

function showPopup(message) {
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.textContent = message;
  document.body.appendChild(popup);

  // Remove popup after 3 seconds
  setTimeout(() => {
    popup.remove();
  }, 3000);
}