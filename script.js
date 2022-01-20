const CONSTANTS = {
  COLLECTIONS: {
    BUSINESS: "business",
    PERSONAL: "personal",
    OTHER: "other"
  },
  TIME_PERIOD: {
    FIVE_SECONDS: 1000 * 5,
    THIRTY_SECONDS: 1000 * 30,
    TWENTY_FOUR_HOURS: 1000 * 60 * 60 * 24,
    TWO_DAYS: this.TWENTY_FOUR_HOURS * 2,
    FIVE_DAYS: this.TWENTY_FOUR_HOURS * 5
  }
};

const collections = [
  CONSTANTS.COLLECTIONS.BUSINESS,
  CONSTANTS.COLLECTIONS.PERSONAL,
  CONSTANTS.COLLECTIONS.OTHER
];

function createTodo({
  text,
  isCompleted = false,
  collection,
  isDeleted = false
}) {
  return {
    text, // text of the todo
    isCompleted, // check box of todo
    createdTimestamp: Date.now(), // when todo is created
    collection,
    isDeleted
  };
}

const todos = [
  createTodo({
    text: "Keep track of all todos",
    collection: collections[1],
    isDeleted: true
  }),
  createTodo({ text: "Finish app", collection: collections[0] })
];

function renderTodos() {
  console.log(todos);
  const todoContainer = document.querySelector("section#todosContainer");
  while (todoContainer.firstChild) {
    todoContainer.removeChild(todoContainer.firstChild);
  }
  const notDeletedTodos = todos.filter((todo) => !todo.isDeleted);
  notDeletedTodos.forEach(function (todo) {
    const todoElem = document.createElement("p");
    todoElem.textContent = todo.text;
    const deleteButton = document.createElement("button"); //<button>delete</button>
    deleteButton.textContent = "Delete";
    const completeTodo = document.createElement("input");
    completeTodo.type = "checkbox";
    completeTodo.checked = todo.isCompleted;
    completeTodo.onclick = function completeTodo() {
      todo.isCompleted = !todo.isCompleted;
      renderTodos();
    };
    deleteButton.onclick = function deleteTodo() {
      todo.isDeleted = true;
      renderTodos();
    };
    todoElem.prepend(completeTodo);
    todoElem.appendChild(deleteButton);
    todoContainer.append(todoElem);
  });
}
renderTodos();

function deleteExpiredTodos() {
  // adjust todos that expired
  const end = Date.now();
  const notCompletedTodos = todos.filter((todo) => !todo.isCompleted);
  notCompletedTodos.forEach(function (todo) {
    const elapsed = end - todo.createdTimestamp;
    if (elapsed > CONSTANTS.TIME_PERIOD.TWO_DAYS) {
      // if (elapsed > CONSTANTS.TIME_PERIOD.THIRTY_SECONDS) {
      todo.isDeleted = true;
    }
  });
  renderTodos();

  // this is looping mech
  setTimeout(() => {
    deleteExpiredTodos();
  }, CONSTANTS.TIME_PERIOD.FIVE_SECONDS);
}
deleteExpiredTodos();

document.getElementById("demo").onclick = function changeContent() {
  // get todo text from input
  const textInputElem = document.getElementById("newTodo");
  const selectedRadioInput = document.querySelector(
    'input[name="collection"]:checked'
  );
  const text = textInputElem.value;
  const collection = selectedRadioInput.value;
  // use text above to create todo
  const newTodo = createTodo({ text, collection });
  // add todo into todos;
  todos.push(newTodo);
  renderTodos();
};
