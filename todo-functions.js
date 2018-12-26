//get saved todos from local storage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");
  if (todosJSON !== null) {
    return JSON.parse(todosJSON);
  } else {
    return [];
  }
};
//save todos to local storage
const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

//render todos

const renderTodos = (todos, filters) => {
  const filteredTodos = todos.filter(function(todo) {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  document.querySelector("#todoItems").innerHTML = "";

  const incompleteTodos = filteredTodos.filter(function(item) {
    return !item.completed;
  });

  document
    .querySelector("#todoItems")
    .appendChild(generateSummaryDom(incompleteTodos));

  filteredTodos.forEach(function(item) {
    document.querySelector("#todoItems").appendChild(generateTodoDOM(item));
  });
};

//remove todo

const removeTodos = id => {
  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

//generates the dom structure of todos area
const generateTodoDOM = item => {
  const todoContainer = document.createElement("div");
  const todoText = document.createElement("span");
  const checkbox = document.createElement("input");
  const button = document.createElement("button");

  //setup todo checkbox
  checkbox.setAttribute("type", "checkbox");
  todoContainer.appendChild(checkbox);
  checkbox.checked = item.completed;

  checkbox.addEventListener("change", function() {
    item.completed = !item.completed;
    saveTodos();
    renderTodos(todos, filters);
  });
  //setup todo text
  todoText.textContent = item.text;
  todoContainer.appendChild(todoText);

  //setup todo remove button
  button.textContent = "x";
  todoContainer.appendChild(button);
  button.addEventListener("click", function() {
    removeTodos(item.id);
    saveTodos();
    renderTodos(todos, filters);
  });

  return todoContainer;
};

const generateSummaryDom = incompleteTodos => {
  let summary = document.createElement("h1");
  summary.textContent = `You have ${incompleteTodos.length} todos left!`;

  return summary;
};
