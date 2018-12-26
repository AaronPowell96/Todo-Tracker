let todos = getSavedTodos();

const filters = {
  searchText: "",
  hideCompleted: false
};

renderTodos(todos, filters);

document.querySelector("#searchTodos").addEventListener("input", e => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector("#todoForm").addEventListener("submit", e => {
  e.preventDefault();
  todos.push({
    id: uuidv4(),
    text: e.target.elements.todoItem.value,
    completed: false
  });
  saveTodos();
  e.target.elements.todoItem.value = "";
  renderTodos(todos, filters);
});

document.querySelector("#hideCompleted").addEventListener("change", e => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});
