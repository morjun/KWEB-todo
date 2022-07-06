window.addEventListener("load", () => {
  tasks = JSON.parse(localStorage.getItem("tasks")) || []; //global
  const taskInput = document.querySelector("#new-task-input");
  const newTaskForm = document.querySelector("#new-task-form");
  newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = {
      content: e.target.elements.content.value.trim(),
      done: false,
    };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    e.target.reset(); //?

    DisplayTasks();
  });
  DisplayTasks();
});

function DisplayTasks() {
  let taskList = document.querySelector("#tasks");
  let doneList = document.querySelector("#done-tasks");

  taskList.innerHTML = ""; // 호출 시마다 Clear
  doneList.innerHTML = "";

  tasks.forEach((task) => {
    const taskItem = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");

    if (task.done) {
        taskItem.classList.add('done');
    }

    input.addEventListener('click', e => {
        task.done = e.target.checked;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        if (task.done) {
            taskItem.classList.add('done');
        }
        else {
            taskItem.classList.remove('done');
        }
        DisplayTasks();
    })

    taskItem.classList.add("task");
    input.type = 'checkbox';

    input.checked = task.done;
    span.classList.add('marker');
    
    content.classList.add('content');
    content.innerHTML = `<input type="text" value="${task.content}" readonly>`;
    label.appendChild(input);
    label.appendChild(span);
    taskItem.appendChild(label);
    taskItem.appendChild(content);
    if (task.done) {
    doneList.appendChild(taskItem);
    }
    else {
    taskList.appendChild(taskItem);
    }
  });
}
