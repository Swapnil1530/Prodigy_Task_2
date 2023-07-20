document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addButton = document.getElementById("addButton");
    const taskList = document.getElementById("taskList");
    const remainingTasks = document.getElementById("remainingTasks");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const saveTasksToLocalStorage = () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };
    const renderTasks = () => {
        taskList.innerHTML = "";

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.textContent = task.text;
            li.classList.add("task-item");

            if (task.complete) {
                li.classList.add("complete");
            }

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.addEventListener("click", () => {
                const newText = prompt("Edit the task:", task.text);
                if (newText !== null && newText.trim() !== "") {
                    tasks[index].text = newText.trim();
                    renderTasks();
                    saveTasksToLocalStorage();
                }
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => {
                tasks.splice(index, 1);
                renderTasks();
                saveTasksToLocalStorage();
            });

            li.appendChild(editButton);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });

        updateRemainingTasks();
    };
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, complete: false });
            taskInput.value = "";
            renderTasks();
            saveTasksToLocalStorage();
        }
    };
    const updateRemainingTasks = () => {
        const incompleteTasks = tasks.filter((task) => !task.complete);
        remainingTasks.textContent = `Tasks remaining: ${incompleteTasks.length}`;
    };

    addButton.addEventListener("click", addTask);

    taskInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });

    taskList.addEventListener("click", (event) => {
        if (event.target.tagName === "LI") {
            const index = Array.from(taskList.children).indexOf(event.target);
            tasks[index].complete = !tasks[index].complete;
            renderTasks();
            saveTasksToLocalStorage();
        }
    });

    renderTasks();
});
