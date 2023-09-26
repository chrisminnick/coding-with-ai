// Simulated in-memory database for the todo-list
const todoListDB = [];

// Function to Create a new todo item
function createTodoItem(title, description) {
  const newItem = {
    id: todoListDB.length + 1,
    title,
    description,
    completed: false,
  };

  todoListDB.push(newItem);
  return newItem;
}

// Function to Read all todo items
function getAllTodoItems() {
  return todoListDB;
}

// Function to Read a specific todo item by ID
function getTodoItemById(id) {
  const todoItem = todoListDB.find((item) => item.id === id);
  return todoItem || null;
}

// Function to Update a todo item by ID
function updateTodoItem(id, updatedData) {
  const todoItemIndex = todoListDB.findIndex((item) => item.id === id);

  if (todoItemIndex !== -1) {
    todoListDB[todoItemIndex] = {
      ...todoListDB[todoItemIndex],
      ...updatedData,
    };
    return todoListDB[todoItemIndex];
  }

  return null;
}

// Function to Delete a todo item by ID
function deleteTodoItem(id) {
  const todoItemIndex = todoListDB.findIndex((item) => item.id === id);

  if (todoItemIndex !== -1) {
    const deletedItem = todoListDB.splice(todoItemIndex, 1)[0];
    return deletedItem;
  }

  return null;
}

// Example usage:
createTodoItem('Buy groceries', 'Milk, eggs, and bread');
createTodoItem('Finish project', 'Complete the coding task');
console.log(getAllTodoItems());
console.log(getTodoItemById(1));
updateTodoItem(1, { completed: true });
console.log(getAllTodoItems());
deleteTodoItem(2);
console.log(getAllTodoItems());
