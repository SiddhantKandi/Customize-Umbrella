const addBtn = document.getElementById('add-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

addBtn.addEventListener('click', addTask);
taskList.addEventListener('click', handleTaskAction);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  const li = document.createElement('li');
  li.innerHTML = `
    <span class="task">${taskText}</span>
    <button class="delete-btn">Delete</button>
  `;
  taskList.appendChild(li);
  taskInput.value = '';
}

function handleTaskAction(e) {
  if (e.target.classList.contains('delete-btn')) {
    e.target.parentElement.remove();
  } else if (e.target.classList.contains('task')) {
    e.target.parentElement.classList.toggle('completed');
  }
}
