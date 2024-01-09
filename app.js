// TODO: Add interactivity so the user can manage daily tasks.
// TODO: make function for AJAX request
// TODO: fix checkboxes behaviour in Firefox

const taskInput = document.querySelector('.input_add-item');
const addButton = document.querySelector('.button_add');
const incompletedTaskHolder = document.querySelector('.form__list_tasks-incompleted');
const completedTasksHolder = document.querySelector('.form__list_tasks-completed');


let createNewTaskElement = function(taskString) {
  let listItem = document.createElement('li');
  let checkBox = document.createElement('input');
  let label = document.createElement('label');
  let editInput = document.createElement('input');
  let editButton = document.createElement('button');
  let deleteButton = document.createElement('button');
  let deleteButtonImg = document.createElement('img');

  listItem.classList.add('form__item');

  label.innerText = taskString;
  label.classList.add('form__label');

  checkBox.type = 'checkbox';
  checkBox.classList.add('form__input-checkbox');

  editInput.type = 'text';
  editInput.classList.add('form__input-text');

  // 'innerText' encodes special characters, 'innerHTML' does not.
  editButton.innerText = 'Edit';
  editButton.classList.add('form__button');
  editButton.classList.add('button_edit');

  deleteButton.classList.add('form__button');
  deleteButton.classList.add('button_delete');
  deleteButton.appendChild(deleteButtonImg);
  
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = 'remove';
  deleteButtonImg.classList.add('button__img-delete');

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}


let addTask = function() {
  if (!taskInput.value) return;
  let listItem = createNewTaskElement(taskInput.value);

  incompletedTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, markTaskCompleted);

  taskInput.value='';
}


let editTask = function() {
  let listItem = this.parentNode;

  let editInput = listItem.querySelector('.form__input-text');
  let label = listItem.querySelector('.form__label');
  let editButton = listItem.querySelector('.button_edit');
  let containsClass = listItem.classList.contains('form__item_edit');

  if (containsClass) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('form__item_edit');
};


let deleteTask = function() {
  let listItem = this.parentNode;
  let list = listItem.parentNode;

  list.removeChild(listItem);
}


let markTaskCompleted = function() {
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, markTaskIncompleted);
}


let markTaskIncompleted = function() {
  let listItem = this.parentNode;
  incompletedTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, markTaskCompleted);
}


addButton.onclick = addTask;
addButton.addEventListener('click', addTask);


let bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  let checkBox = taskListItem.querySelector('.form__input-checkbox');
  let editButton = taskListItem.querySelector('.button_edit');
  let deleteButton = taskListItem.querySelector('.button_delete');


  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}


for (let i = 0; i < incompletedTaskHolder.children.length; i++){
  bindTaskEvents(incompletedTaskHolder.children[i], markTaskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++){
    bindTaskEvents(completedTasksHolder.children[i], markTaskIncompleted);
}