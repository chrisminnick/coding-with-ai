// Example usage:
(async () => {
  try {
    const newItem = await createTodoItem(
      'Buy groceries',
      'Milk, eggs, and bread'
    );
    console.log('Created item:', newItem);

    const allItems = await getAllTodoItems();
    console.log('All items:', allItems);

    const itemToUpdate = await getTodoItemById(newItem._id);
    if (itemToUpdate) {
      const updatedItem = await updateTodoItem(itemToUpdate._id, {
        completed: true,
      });
      console.log('Updated item:', updatedItem);
    }

    const deletedItem = await deleteTodoItem(newItem._id);
    console.log('Deleted item:', deletedItem);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.disconnect();
  }
})();
