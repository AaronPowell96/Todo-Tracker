//get saved todos from local storage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");
  return todosJSON !== null ? JSON.parse(todosJSON) : [];
};
//save todos to local storage
const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

//render todos

const renderTodos = (todos, filters) => {
  const filteredTodos = todos.filter(todo => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  document.querySelector("#todoItems").innerHTML = "";

  const incompleteTodos = filteredTodos.filter(item => {
    return !item.completed;
  });

  document
    .querySelector("#todoItems")
    .appendChild(generateSummaryDom(incompleteTodos));

  filteredTodos.forEach(item => {
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
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("input");
  const todoText = document.createElement("span");
  const checkbox = document.createElement("input");
  const removeButton = document.createElement("button");

  //setup todo checkbox
  checkbox.setAttribute("type", "checkbox");
  containerEl.appendChild(checkbox);
  checkbox.checked = item.completed;
  checkbox.addEventListener("change", () => {
    item.completed = !item.completed;
    saveTodos();
    renderTodos(todos, filters);
  });
  //setup todo text
  todoText.textContent = item.text;
  containerEl.appendChild(todoText);

  //setup todo remove button
  removeButton.textContent = "remove";
  removeButton.classList.add("button", "button--text");
  todoEl.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodos(item.id);
    saveTodos();
    renderTodos(todos, filters);
  });

  

  return todoEl;
};

const generateSummaryDom = incompleteTodos => {
  let summary = document.createElement("h1");
  summary.textContent = `You have ${incompleteTodos.length} todos left!`;

  return summary;
};
