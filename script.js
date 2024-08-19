const toDoListNode = document.querySelector(".toDo__list");
const toDoFormNode = document.querySelector(".toDo__form");
const toDoInputNode = document.querySelector(".toDo__input");
const deleteAllNode = document.querySelector(".footer__delete-all");
const deleteButtonsNode = document.querySelector(".footer");
const deleteCompletedNode = document.querySelector(".footer__delete-check");

//пустой массив для добавления задач
let taskArr = [];

// шаблон отрисовки
function getTasksBegin(toDo) {
  const toDoItem = document.createElement("li");
  toDoItem.className = "toDo__item";
  toDoItem.innerHTML = `
  <input class = 'toDo__item-check' id = 'checkbox'type="checkbox">
  <p class="toDo__item-text">${toDo.task}</p>
  <button class = "toDo__button-delete">❌</button>
    `;

  const textEraseNode = toDoItem.querySelector(".toDo__item-check");
  textEraseNode.addEventListener("click", () => {
    if (textEraseNode.checked) {
      toDo.done = true;
    } else {
      toDo.done = false;
    }
  });
  const deleteTaskNode = toDoItem.querySelector(".toDo__button-delete"); // вытаскиваем крестик из лишки
  deleteTaskNode.addEventListener("click", () => deleteCrossButton(toDo.id));
  return toDoItem;
}
// функция - удаление тасок по крестикам
function deleteCrossButton(id) {
  taskArr = taskArr.filter((el) => el.id !== id);
  renderTasks(taskArr);
  removeButtons();
}
// функция - удаление тасок по кнопке "удалить завершенные"
function deleteSelectedButton() {
  taskArr = taskArr.filter((el) => !el.done);
  renderTasks(taskArr);
  removeButtons();
}

//рендер задач
function renderTasks(arr) {
  toDoListNode.innerHTML = "";
  arr.forEach((element) => {
    const tasks = getTasksBegin(element);
    toDoListNode.append(tasks);
  });
}

// функция добавления задач в массив
function getTasks(text) {
  taskArr.push({
    task: text.trim(),
    id: Date.now(),
    done: false,
  });
  renderTasks(taskArr);
  toDoListNode.classList.remove("toDo__list-none");
  deleteButtonsNode.classList.remove("footer__show");
}

// слушатель событий для сабмита
toDoFormNode.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (toDoInputNode.value.trim() != "") {
    getTasks(toDoInputNode.value);
  }
  toDoInputNode.value = "";
});

//удаление выполненных тасок по нижней кнопке
deleteCompletedNode.addEventListener("click", () => {
  deleteSelectedButton();
  removeButtons();
});

// удаление по кнопке всего контента
deleteAllNode.addEventListener("click", () => {
  taskArr = [];
  toDoListNode.innerHTML = "";
  removeButtons();
});

// функция для удаления нижних кнопок
function removeButtons() {
  if (taskArr.length == 0) {
    toDoListNode.classList.add("toDo__list-none");
    deleteButtonsNode.classList.add("footer__show");
  }
}
