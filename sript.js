//Select DOM
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);

//Functions

function addTodo(e) {
   // Prevent natural behaviour
   e.preventDefault();
   
   // Create todo div
   const todoDiv = document.createElement("div");
   todoDiv.classList.add("todo");
   
   // Create list
   const newTodo = document.createElement("li");
   newTodo.innerText = todoInput.value;
   newTodo.classList.add("todo-item");
   todoDiv.appendChild(newTodo);


   //Add todo to localstorage
      saveLocalTodos(todoInput.value)

   // Create Completed Button
   const completedButton = document.createElement("button");
   completedButton.innerHTML = `<i class="fas fa-check"></i>`;
   completedButton.classList.add("checked-btn");
   todoDiv.appendChild(completedButton);
 
   // Create trash button
   const trashButton = document.createElement("button");
   trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
   trashButton.classList.add("trash-btn");
   todoDiv.appendChild(trashButton);
 
   // Attach final Todo
   todoList.appendChild(todoDiv);

   todoInput.value = "";
 }
 
 function deleteTodo(e) {
   const item = e.target;
 
   if (item.classList[0] === "trash-btn") {
     const todo = item.parentElement;
     todo.classList.add("fall");
            
     removeLocalTodos(todo);

     todo.addEventListener("transitionend", e => {
       todo.remove();
     });
   }
   
   if (item.classList[0] === "checked-btn") {
     const todo = item.parentElement;
     todo.classList.toggle("completed");
     console.log(todo);
   }
 }
 
 function filterTodo(e) {
   const todos = Array.from(todoList.childNodes).filter(node => node.nodeType === 1);
   todos.forEach(function(todo) {
     switch (e.target.value) {
       case "all":
         todo.style.display = "flex";
         break;
       case "completed":
         if (todo.classList.contains("completed")) {
           todo.style.display = "flex";
         } else {
           todo.style.display = "none";
         }
         break;
       case "uncompleted":
         if (!todo.classList.contains("completed")) {
           todo.style.display = "flex";
         } else {
           todo.style.display = "none";
         }
         break;
     }
   });
 }
 
 function saveLocalTodos(todo) {
   let todos;
   if (
      localStorage.getItem("todos") === null
   ) {
      todos = []
   } else{
      todos = JSON.parse(localStorage.getItem("todos"))
   }
   todos.push(todo)
   localStorage.setItem("todos", JSON.stringify(todos))
}
function getTodos() {
   let todos;
   if (
      localStorage.getItem("todos") === null
   ) {
      todos = []
   } else{
      todos = JSON.parse(localStorage.getItem("todos"))
   }
   todos.forEach(function(todo) {
      
          // Create todo div
   const todoDiv = document.createElement("div");
   todoDiv.classList.add("todo");
   
   // Create list
   const newTodo = document.createElement("li");
   newTodo.innerText = todo;
   newTodo.classList.add("todo-item");
   todoDiv.appendChild(newTodo);

   // Create Completed Button
   const completedButton = document.createElement("button");
   completedButton.innerHTML = `<i class="fas fa-check"></i>`;
   completedButton.classList.add("checked-btn");
   todoDiv.appendChild(completedButton);
 
   // Create trash button
   const trashButton = document.createElement("button");
   trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
   trashButton.classList.add("trash-btn");
   todoDiv.appendChild(trashButton);
 
   // Attach final Todo
   todoList.appendChild(todoDiv);


   })
}


function removeLocalTodos(todo) {
   
   let todos;
   if (
      localStorage.getItem("todos") === null
   ) {
      todos = []
   } else{
      todos = JSON.parse(localStorage.getItem("todos"))
   }
       const todoIndex = todo.children[0].innerText;
       todos.splice(todos.indexOf(todoIndex), 1);
       localStorage.setItem("todos", JSON.stringify(todos));
}