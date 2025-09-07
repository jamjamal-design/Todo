"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
var todoList = [];
// Add a new todo
function addTodo(title, dueDate) {
    var todo = { title: title, completed: false, dueDate: dueDate };
    todoList.push(todo);
    renderTodos(); // Call renderTodos after adding a new todo
}
// Mark a todo as completed
function completeTodo(index) {
    if (todoList[index]) {
        todoList[index].completed = true;
    }
    renderTodos(); // Call renderTodos after completing a todo
}
// Remove a todo
function removeTodo(index) {
    if (todoList[index]) {
        todoList.splice(index, 1);
    }
    renderTodos(); // Call renderTodos after removing a todo
}
// List all todos
function listTodos() {
    return todoList;
}
function renderTodos() {
    var container = document.getElementById('card-container');
    if (!container)
        return;
    container.innerHTML = '';

    todoList.forEach(function (todo, idx) {

        var card = document.createElement('div');
        card.className = 'todo-card';

        var header = document.createElement('div');
        header.className = 'todo-header';
        header.textContent = todo.title;

        var content = document.createElement('div');
        content.className = 'todo-content';

        var completedDiv = document.createElement('div');
        completedDiv.className = 'todo-completed';
        completedDiv.textContent = todo.completed ? 'Completed' : 'Pending';
        if (todo.completed) {
            completedDiv.style.color = '#059669';
        }
        else {
            completedDiv.style.color = '#ef4444';
        }

        var dueDiv = document.createElement('div');
        dueDiv.className = 'todo-due';
        if (todo.dueDate) {
            dueDiv.textContent = 'Due: ' + todo.dueDate.toLocaleDateString();
        }

        var buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        var completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.onclick = function () {
            completeTodo(idx);
        };

        var removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = function () {
            removeTodo(idx);
        };

        content.appendChild(completedDiv);
        
        if (todo.dueDate) {
            content.appendChild(dueDiv);
        }
        buttonContainer.appendChild(completeBtn);
        buttonContainer.appendChild(removeBtn);
        card.appendChild(header);
        card.appendChild(content);
        card.appendChild(buttonContainer);
        container.appendChild(card);
    });
}
// Listen for form submit and add todo
if (typeof document !== 'undefined') {
    var form = document.getElementById('todo-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var input = document.getElementById('todo-input');
            var title = input.value.trim();
            if (title) {
                addTodo(title);
                input.value = '';
            }
        });
    }
    // Initial render
    renderTodos();
}
