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
    card.className = 'todo-card';

    const header = document.createElement('div');
    header.className = 'todo-header';
    header.textContent = todo.title;

    const content = document.createElement('div');
    content.className = 'todo-content';

    const completedDiv = document.createElement('div');
    completedDiv.className = 'todo-completed';
    completedDiv.textContent = todo.completed ? 'Completed' : 'Pending';

    if (todo.completed) {
      completedDiv.style.color = '#059669';
    } else {
      completedDiv.style.color = '#ef4444';
    }

    const dueDiv = document.createElement('div');
    dueDiv.className = 'todo-due';

    if (todo.dueDate) {
      dueDiv.textContent = 'Due: ' + todo.dueDate.toLocaleDateString();
    }

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.onclick = () => {
      completeTodo(idx);
    };

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => {
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