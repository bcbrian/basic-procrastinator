// TODO
// [X] 1a. Keep track of all todos
// [X] 2. Create new todo
// [ ] 6. Check box button
// [ ] 5. Delete/edit todo button
// [X] 1b. Keep track of collections
// [ ] 4. Keep track of timeline before auto-deleted
// [X] 3. Render all the todos

const CONSTANTS = {
  COLLECTIONS: {
    BUSINESS: "business",
    PERSONAL: "personal",
    OTHER: "other"
  },
  TIME_PERIOD: {
    FIVE_SECONDS: 1000 * 5,
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
  const sect = document.querySelector("section#todosContainer");
  while (sect.firstChild) {
    sect.removeChild(sect.firstChild);
  }
  const notDeletedTodos = todos.filter((todo) => !todo.isDeleted);
  notDeletedTodos.forEach(function (todo) {
    const para = document.createElement("p");
    para.textContent = todo.text;
    sect.appendChild(para);
    console.log(todo);
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
  console.log(todos);
  renderTodos();
};
