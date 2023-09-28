// 1. Create a constant variable called toDoItems containing an array of todo objects.
// Each todo object should have a todoText property, and a completed property.

const toDoItems = [
  {
    todoText: 'item1',
    completed: false,
  },
  {
    todoText: 'item2',
    completed: false,
  },
  {
    todoText: 'item3',
    completed: false,
  },
];

// 2. Create a function that displays a list of todo items in an element with the id todos in the browser.

function displayTodos() {
  const todosUl = document.querySelector('#todos');
  todosUl.innerHTML = '';
  toDoItems.forEach((item) => {
    const todoLi = document.createElement('li');
    todoLi.textContent = item.todoText;
    todosUl.appendChild(todoLi);
  });
}
