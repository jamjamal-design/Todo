export interface Todo {
  title: string;
  completed: boolean;
  dueDate?: Date;
}

const todoList: Todo[] = [];

// Add a new todo
function addTodo(title: string, dueDate?: Date) {
  const todo: Todo = { title, completed: false, dueDate };
  todoList.push(todo);
  renderTodos(); // Call renderTodos after adding a new todo
}

// Mark a todo as completed
function completeTodo(index: number) {
  if (todoList[index]) {
    todoList[index].completed = true;
  }
  renderTodos(); // Call renderTodos after completing a todo
}

// Edit a todo
function editTodo(index: number, newTitle: string, newDueDate?: Date) {
  if (todoList[index]) {
    todoList[index].title = newTitle;
    todoList[index].dueDate = newDueDate;
  }
  renderTodos(); // Call renderTodos after editing a todo
}

// Remove a todo
function removeTodo(index: number) {
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
    const container = document.getElementById('card-container');
    if (!container) return;
    container.innerHTML = '';

    todoList.forEach((todo, idx) => {
        const card = document.createElement('div');
        card.className = 'card mb-3';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const header = document.createElement('h5');
        header.className = 'card-title';
        header.textContent = todo.title;

        const completedDiv = document.createElement('span');
        completedDiv.className = `badge ${todo.completed ? 'bg-success' : 'bg-danger'} me-2`;
        completedDiv.textContent = todo.completed ? 'Completed' : 'Pending';

        const dueDiv = document.createElement('span');
        dueDiv.className = 'badge bg-secondary ms-2';
        if (todo.dueDate) {
            dueDiv.textContent = 'Due: ' + todo.dueDate.toLocaleDateString();
        }

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'mt-3';

        // Complete button
        const completeBtn = document.createElement('button');
        completeBtn.className = 'btn btn-success btn-sm me-2';
        completeBtn.textContent = 'Complete';
        completeBtn.onclick = () => {
            completeTodo(idx);
        };

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-warning btn-sm me-2';
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => {
            const newTitle = prompt('Edit task title:', todo.title);
            if (newTitle !== null && newTitle.trim() !== '') {
                let newDueDate: Date | undefined = todo.dueDate;
                const newDueDateStr = prompt('Edit due date (YYYY-MM-DD):', todo.dueDate ? todo.dueDate.toISOString().slice(0,10) : '');
                if (newDueDateStr !== null && newDueDateStr.trim() !== '') {
                    newDueDate = new Date(newDueDateStr);
                }
                editTodo(idx, newTitle.trim(), newDueDate);
            }
        };

        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn btn-danger btn-sm';
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => {
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
  const form = document.getElementById('todo-form');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = document.getElementById('todo-input') as HTMLInputElement;
      const title = input.value.trim();
      if (title) {
        addTodo(title);
        input.value = '';
      }
    });
  }
  // Initial render
  renderTodos();
}