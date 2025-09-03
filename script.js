const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');
const countEl = document.getElementById('count');
const clearBtn = document.getElementById('clear-btn');
const filterBtns = document.querySelectorAll('.filters button');

let todos = [];
let filter = 'all';

function render() {
  list.innerHTML = '';
  let filtered = todos.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'completed') return t.done;
    return true;
  });

  filtered.forEach((todo, idx) => {
    const li = document.createElement('li');
    if (todo.done) li.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = todo.text;
    li.appendChild(span);

    // Show buttons only in "All"
    if (filter === 'all') {
      const actions = document.createElement('div');
      actions.className = 'actions';

      const status = document.createElement('button');
      status.textContent = '✔️';
      status.addEventListener('click', () => toggle(idx));

      const del = document.createElement('button');
      del.textContent = '❌';
      del.addEventListener('click', () => remove(idx));

      actions.appendChild(status);
      actions.appendChild(del);
      li.appendChild(actions);
    }

    list.appendChild(li);
  });

  countEl.textContent = `${todos.filter(t => !t.done).length} items left`;

  filterBtns.forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
}

function add() {
  const text = input.value.trim();
  if (!text) return;
  todos.unshift({ text, done: false });
  input.value = '';
  render();
}

function toggle(idx) {
  todos[idx].done = !todos[idx].done;
  render();
}

function remove(idx) {
  todos.splice(idx, 1);
  render();
}

function clearCompleted() {
  todos = todos.filter(t => !t.done);
  render();
}

addBtn.addEventListener('click', add);
input.addEventListener('keydown', e => e.key === 'Enter' && add());
clearBtn.addEventListener('click', clearCompleted);
filterBtns.forEach(btn => btn.addEventListener('click', () => {
  filter = btn.dataset.filter;
  render();
}));

render();
