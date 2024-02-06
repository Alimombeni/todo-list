 //decleare variable
 const form = document.querySelector('#task-form'); // form selected with taask-form id
const taskList = document.querySelector('.collection'); //ul with class 'collection'
 const clearBtn = document.querySelector('.clear-tasks'); //select btn 'clear-task'
 const filter =document.querySelector('#filter') // select input with filter id
const taskInput = document.querySelector('#task');
 // all event listener in here
 loadEventListener();
  function loadEventListener() {
   //DOM load event
   document.addEventListener('DOMContentLoaded' , getTasks);

   //add task event
   form.addEventListener('submit' , addTask);
    // remove task event
   taskList.addEventListener('click' , removeTask);
   //clear btn
   clearBtn.addEventListener('click' , clearTask);
//filter task
   filter.addEventListener('keyup' , filterTask);
  }
  //get tasks from ls
 function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null ){
   tasks = [];
  }else {
   tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task){
    
   const li = document.createElement('li');
   li.className = 'collection-item'; //add class to li
   li.appendChild(document.createTextNode(task));//push input value to li like text node
   //add link ************************ELEMENT CREAT*******************
   const link = document.createElement('a');
   link.className = 'delete-item secondary-content '; // add class for align and remove icon tag class
   link.innerHTML = '<i class="fa fa-remove"></i>' //add icon remove into a tag
   li.appendChild(link); // push link to li
//***************************************************************************************
   taskList.appendChild(li);//
  });
 }



  //===================================================== 1==>ADD-TASK=============================
  function addTask (e) {
   if (taskInput.value === ''){
    alert('لطفا تسک خود را وارد نمایید')
   }else {
//add li tag ***************************ELEMENT CREAT*******************
    const li = document.createElement('li');
    li.className = 'collection-item'; //add class to li
    li.appendChild(document.createTextNode(taskInput.value));//push input value to li like text node
    //add link ************************ELEMENT CREAT*******************
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content '; // add class for align and remove icon tag class
    link.innerHTML = '<i class="fa fa-remove"></i>' //add icon remove into a tag
    li.appendChild(link); // push link to li
//***************************************************************************************
    taskList.appendChild(li);// append li to ul
   }
   //storein local storage
   storeTaskInLocalStorage(taskInput.value)

   taskInput.value='';
   e.preventDefault()
  }

function storeTaskInLocalStorage(task) {
 let tasks;
 if (localStorage.getItem('tasks') === null ){
  tasks = [];
 }else {
  tasks = JSON.parse(localStorage.getItem('tasks'));
 }
 tasks.push(task);
 localStorage.setItem('tasks' , JSON.stringify(tasks));
}

  
  
//========================================================== 2==>REMOVE-TASK ======================================



 function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
  if (confirm('are you sure')){
   e.target.parentElement.parentElement.remove();
   //remove from local storage
 removeTaskFromLocalStorage(e.target.parentElement.parentElement);

  }
 }
 }

 //remove from ls
 function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if (localStorage.getItem('tasks') === null ){
   tasks = [];
  }else {
   tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task , index) {
if (taskItem.textContent === task){
 tasks.splice(index , 1)
}
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
 }
// //==================================================== 3==> CLEAR-TASK =================================
function clearTask() {
while (taskList.firstChild){
 taskList.removeChild(taskList.firstChild);

}

//clear from localstorage
 clearTaskFromLocalStorage();

  }
//clear from localstorage function
 function clearTaskFromLocalStorage() {
  localStorage.clear();
 }



//=======================================================4 ==> FILTER TASK ==============================

 function filterTask(e) {
   // empty input condition for search with lowercase method
  const text = e.target.value.toLowerCase();
 document.querySelectorAll('.collection-item').forEach(function (task){
  const  item = task.firstChild.textContent;
  if (item.toLowerCase().indexOf(text) !== -1) {
   task.style.display = 'block';
  }else {
   task.style.display = 'none';
  }
 })
  }

