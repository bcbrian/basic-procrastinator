// TODO
// [X] 1a. Keep track of all todos
// [X] 2. Create new todo
// [ ] 6. Check box button
// [ ] 5. Delete/edit todo button
// [X] 1b. Keep track of collections
// [ ] 4. Keep track of timeline before auto-deleted
// [ ] 3. Render all the todos

const CONSTANTS = {
  COLLECTIONS: {
    BUSINESS: "business",
    PERSONAL: "personal",
    OTHER: "other"
  }
};

const collections = [
  CONSTANTS.COLLECTIONS.BUSINESS,
  CONSTANTS.COLLECTIONS.PERSONAL,
  CONSTANTS.COLLECTIONS.OTHER
];

function createTodo({ text, isCompleted = false, collection }) {
  return {
    text, // text of the todo
    isCompleted, // check box of todo
    createdTimestamp: Date.now(), // when todo is created
    collection
  };
}

const todos = [
  createTodo({ text: "Keep track of all todos", collection: collections[1] }),
  createTodo({ text: "Finish app", collection: collections[0] })
];

function renderTodos() {
  const sect = document.querySelector("section#todosContainer");
  while (sect.firstChild) {
    sect.removeChild(sect.firstChild);
  }

  todos.forEach(function (todo) {
    const para = document.createElement("p");
    para.textContent = todo.text;
    sect.appendChild(para);
    console.log(todo);
  });
}

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
