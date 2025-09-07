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
// Edit a todo
function editTodo(index, newTitle, newDueDate) {
    if (todoList[index]) {
        todoList[index].title = newTitle;
        todoList[index].dueDate = newDueDate;
    }
    renderTodos(); // Call renderTodos after editing a todo
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
        card.className = 'card mb-3';
        var cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        var header = document.createElement('h5');
        header.className = 'card-title';
        header.textContent = todo.title;
        var completedDiv = document.createElement('span');
        completedDiv.className = "badge ".concat(todo.completed ? 'bg-success' : 'bg-danger', " me-2");
        completedDiv.textContent = todo.completed ? 'Completed' : 'Pending';
        var dueDiv = document.createElement('span');
        dueDiv.className = 'badge bg-secondary ms-2';
        if (todo.dueDate) {
            dueDiv.textContent = 'Due: ' + todo.dueDate.toLocaleDateString();
        }
        var buttonContainer = document.createElement('div');
        buttonContainer.className = 'mt-3';
        // Complete button
        var completeBtn = document.createElement('button');
        completeBtn.className = 'btn btn-success btn-sm me-2';
        completeBtn.textContent = 'Complete';
        completeBtn.onclick = function () {
            completeTodo(idx);
        };
        // Edit button
        var editBtn = document.createElement('button');
        editBtn.className = 'btn btn-warning btn-sm me-2';
        editBtn.textContent = 'Edit';
        editBtn.onclick = function () {
            var newTitle = prompt('Edit task title:', todo.title);
            if (newTitle !== null && newTitle.trim() !== '') {
                var newDueDate = todo.dueDate;
                var newDueDateStr = prompt('Edit due date (YYYY-MM-DD):', todo.dueDate ? todo.dueDate.toISOString().slice(0, 10) : '');
                if (newDueDateStr !== null && newDueDateStr.trim() !== '') {
                    newDueDate = new Date(newDueDateStr);
                }
                editTodo(idx, newTitle.trim(), newDueDate);
            }
        };
        var removeBtn = document.createElement('button');
        removeBtn.className = 'btn btn-danger btn-sm';
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = function () {
            removeTodo(idx);
        };
        cardBody.appendChild(header);
        cardBody.appendChild(completedDiv);
        if (todo.dueDate) {
            cardBody.appendChild(dueDiv);
        }
        buttonContainer.appendChild(completeBtn);
        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(removeBtn);
        cardBody.appendChild(buttonContainer);
        card.appendChild(cardBody);
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
