let arrTodo = JSON.parse(localStorage.getItem('todoList')) || [
{ name: 'Watch Youtube', dueDate: '2026-03-24', priority: 'Low' },
{ name: 'Wash Dishes', dueDate: '2026-03-20', priority: 'Medium' }
];
function renderTodoList(){
  let todoListHtml = '';

  for(let i = 0; i < arrTodo.length; i++){

    const todoObject = arrTodo[i];
    const { name, dueDate, priority } = todoObject;

    let priorityClass = priority.toLowerCase();

    const html = `
      <div class="task-card">
        <div>
          <strong>${name}</strong><br>
          <small>${dueDate}</small><br>
          <span class="badge ${priorityClass}">
            ${priority}
          </span>
        </div>

        <button class="delete-btn" onclick="removeTask(${i})">
          🗑️
        </button>
      </div>
    `;
    todoListHtml += html;
  }
  document.querySelector('.js-output').innerHTML = todoListHtml;
}
function todoList(){
  //Get the date, priority and task inputs
  const inputElement = document.querySelector('.js-input');
  const todoName = inputElement.value;
  const inputDateElement = document.querySelector('.js-date');
  const dueDate = inputDateElement.value;
  const inputPriorityElement = document.querySelector('.js-select-priority');
  const priority = inputPriorityElement.value;

  //Validate Inputs
  if(!todoName){
    alert('Please Enter A Task');;
    return;
  }
  if(!dueDate){
    alert('Please Select A Due Date')
    return;
  }
  if(!priority){
    alert('Please Select Priority Level')
    return;
  }  
    
  //push the task into the array and display the array
  arrTodo.push({
    name: todoName,
    dueDate: dueDate,
    priority: priority,
  });
  saveToLocalStorage(); 
  //clear the date, priority and inputText
  inputElement.value = '';
  inputDateElement.value = '';
  inputPriorityElement.value = '';
  renderTodoList();
}
//Remove Tasks
function removeTask(index){
  arrTodo.splice(index, 1);
  renderTodoList();
  saveToLocalStorage(); 
}

//save data to local storrage
function saveToLocalStorage(){
  localStorage.setItem('todoList', JSON.stringify(arrTodo));
}
document.querySelector('.js-input').addEventListener('keydown', function(event) {
if (event.key === 'Enter') todoList();
});
document
  .querySelector('.js-button')
  .addEventListener('click', todoList)
renderTodoList();