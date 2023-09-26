const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/todo-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a TodoItem schema
const todoItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

// Create a TodoItem model
const TodoItem = mongoose.model('TodoItem', todoItemSchema);

// Function to Create a new todo item
async function createTodoItem(title, description) {
  const newItem = new TodoItem({
    title,
    description,
    completed: false,
  });

  try {
    await newItem.save();
    return newItem;
  } catch (error) {
    throw error;
  }
}

// Function to Read all todo items
async function getAllTodoItems() {
  try {
    const todoItems = await TodoItem.find();
    return todoItems;
  } catch (error) {
    throw error;
  }
}

// Function to Read a specific todo item by ID
async function getTodoItemById(id) {
  try {
    const todoItem = await TodoItem.findById(id);
    return todoItem || null;
  } catch (error) {
    throw error;
  }
}

// Function to Update a todo item by ID
async function updateTodoItem(id, updatedData) {
  try {
    const updatedItem = await TodoItem.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return updatedItem;
  } catch (error) {
    throw error;
  }
}

// Function to Delete a todo item by ID
async function deleteTodoItem(id) {
  try {
    const deletedItem = await TodoItem.findByIdAndRemove(id);
    return deletedItem || null;
  } catch (error) {
    throw error;
  }
}
