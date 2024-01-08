//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.querySelector('.input_add-item');//Add a new task.
var addButton=document.querySelector('.button_add');//first button
var incompleteTaskHolder=document.querySelector('.form__list_tasks-incompleted');//ul of #incompleteTasks
var completedTasksHolder=document.querySelector('.form__list_tasks-completed');//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

  var listItem=document.createElement('li');

  //input (checkbox)
  var checkBox=document.createElement('input');//checkbx
  //label
  var label=document.createElement('label');//label
  //input (text)
  var editInput=document.createElement('input');//text
  //button.edit
  var editButton=document.createElement('button');//edit button

  //button.delete
  var deleteButton=document.createElement('button');//delete button
  var deleteButtonImg=document.createElement('img');//delete button image

  listItem.classList.add('form__item');

  label.innerText=taskString;
  label.classList.add('form__label');

  //Each elements, needs appending
  checkBox.type='checkbox';
  checkBox.classList.add('form__input-checkbox');

  editInput.type='text';
  editInput.classList.add('form__input-text');

  editButton.innerText='Edit'; //innerText encodes special characters, HTML does not.
  editButton.className='edit';
  editButton.classList.add('form__button');
  editButton.classList.add('button_edit');

  deleteButton.classList.add('form__button');
  deleteButton.classList.add('button_delete');
  deleteButton.appendChild(deleteButtonImg);
  
  deleteButtonImg.src='./remove.svg';
  deleteButtonImg.classList.add('button__img-delete');

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



var addTask=function(){
  console.log('Add Task...');
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem=createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value='';

}

//Edit an existing task.

var editTask=function(){
  console.log('Edit Task...');
  console.log('Change "edit" to "save"');


  var listItem=this.parentNode;

  var editInput=listItem.querySelector('.form__input-text');
  var label=listItem.querySelector('.form__label');
  var editBtn=listItem.querySelector('.button_edit');
  var containsClass=listItem.classList.contains('form__item_edit');
  //If class of the parent is .editmode
  if(containsClass){

    //switch to .editmode
    //label becomes the inputs value.
    label.innerText=editInput.value;
    editBtn.innerText='Edit';
  }else{
    editInput.value=label.innerText;
    editBtn.innerText='Save';
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle('form__item_edit');
};


//Delete task.
var deleteTask=function(){
  console.log('Delete Task...');

  var listItem=this.parentNode;
  var ul=listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
  console.log('Complete Task...');

  //Append the task list item to the #completed-tasks
  var listItem=this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
  console.log('Incomplete Task...');
//Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  var listItem=this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
  console.log('AJAX Request');
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener('click',addTask);
addButton.addEventListener('click',ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  console.log('bind list item events');
//select ListItems children
  var checkBox=taskListItem.querySelector('.form__input-checkbox');
  var editButton=taskListItem.querySelector('.button_edit');
  var deleteButton=taskListItem.querySelector('.button_delete');


  //Bind editTask to edit button.
  editButton.onclick=editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick=deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.