let arrTodo = JSON.parse(localStorage.getItem('todoList')) || [
  { name: 'Watch Youtube', dueDate: '2026-03-24', priority: 'Low', completed: false },
  { name: 'Wash Dishes', dueDate: '2026-03-20', priority: 'Medium', completed: false }
];

function renderTodoList(){
  let todoListHtml = '';

  arrTodo.forEach((todo, i) => {
    const { name, dueDate, priority, completed } = todo;
    let priorityClass = priority.toLowerCase();

    todoListHtml += `
      <div class="task-card ${completed ? 'completed' : ''}">
        <div>
          <input type="checkbox" ${completed ? 'checked' : ''} onclick="toggleComplete(${i})">
          <div>
            <strong>${name}</strong><br>
            <small>${dueDate}</small>
          </div>
          <span class="badge ${priorityClass}">${priority}</span>
        </div>

        <button class="delete-btn" onclick="removeTask(${i})">🗑️</button>
      </div>
    `;
  });

  document.querySelector('.js-output').innerHTML = todoListHtml;
  updateDashboard();
}

function todoList() {
  const inputElement = document.querySelector('.js-input');
  const todoName = inputElement.value;
  const inputDateElement = document.querySelector('.js-date');
  const dueDate = inputDateElement.value;
  const inputPriorityElement = document.querySelector('.js-select-priority');
  const priority = inputPriorityElement.value;

  if(!todoName || !dueDate || !priority) { alert("Please fill all fields"); return; }

  arrTodo.push({ name: todoName, dueDate, priority, completed: false });
  saveToLocalStorage();
  inputElement.value = '';
  inputDateElement.value = '';
  inputPriorityElement.value = '';
  renderTodoList();
}

function removeTask(index) {
  arrTodo.splice(index, 1);
  saveToLocalStorage();
  renderTodoList();
}

function toggleComplete(index) {
  arrTodo[index].completed = !arrTodo[index].completed;
  saveToLocalStorage();
  renderTodoList();
}

function saveToLocalStorage() {
  localStorage.setItem('todoList', JSON.stringify(arrTodo));
}

function updateDashboard() {
  const total = arrTodo.length;
  const completed = arrTodo.filter(todo => todo.completed).length;
  const pending = total - completed;

  document.querySelector('.total-tasks').textContent = total;
  document.querySelector('.completed-tasks').textContent = completed;
  document.querySelector('.pending-tasks').textContent = pending;
}

document.querySelector('.js-input').addEventListener('keydown', e => { if(e.key === 'Enter') todoList(); });
document.querySelector('.js-button').addEventListener('click', todoList);

renderTodoList();

