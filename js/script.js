// Time & Greeting
function updateTime() {
    const now = new Date();
    const timeEl = document.getElementById('time');
    const dateEl = document.getElementById('date');
    
    if (timeEl) timeEl.textContent = now.toLocaleTimeString();
    if (dateEl) dateEl.textContent = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function updateGreeting() {
    const now = new Date();
    const hrs = now.getHours();
    let greet = "Good Morning";
    if (hrs >= 12 && hrs < 17) greet = "Good Afternoon";
    else if (hrs >= 17) greet = "Good Evening";
    
    const name = localStorage.getItem('userName') || 'User';
    const greetingEl = document.getElementById('greeting');
    if (greetingEl) {
        greetingEl.innerHTML = `${greet}, <span id="user-name" contenteditable="true">${name}</span>!`;
        
        // Listener simpan nama
        const userNameEl = document.getElementById('user-name');
        if (userNameEl) {
            userNameEl.addEventListener('blur', (e) => {
                localStorage.setItem('userName', e.target.textContent);
            });
        }
    }
}

// Update jam setiap detik
setInterval(updateTime, 1000);
updateTime();
updateGreeting();

// Theme Toggle (Dark Mode)
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeBtn.textContent = isDark ? '🌙 Dark Mode' : '☀️ Light Mode';
    });
}

// Focus Timer
let timer;
let timeLeft = 25 * 60;
const timerDisplay = document.getElementById('timer-display');

function updateTimerDisplay() {
    const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const secs = (timeLeft % 60).toString().padStart(2, '0');
    if (timerDisplay) timerDisplay.textContent = `${mins}:${secs}`;
}

const startBtn = document.getElementById('start-btn');
if (startBtn) {
    startBtn.addEventListener('click', () => {
        clearInterval(timer);
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                alert("Time's up!");
            }
        }, 1000);
    });
}

const stopBtn = document.getElementById('stop-btn');
if (stopBtn) stopBtn.addEventListener('click', () => clearInterval(timer));

const resetBtn = document.getElementById('reset-btn');
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        clearInterval(timer);
        timeLeft = 25 * 60;
        updateTimerDisplay();
    });
}

// To-Do List (Termasuk Tombol Delete)
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const errorMsg = document.getElementById('error-msg');
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveAndRenderTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
    if (!todoList) return;
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        if (todo.completed) li.classList.add('completed');
        
        // TOMBOL DELETE DIPASANG DI SINI:
        li.innerHTML = `
            <span onclick="toggleTodo(${index})" style="cursor:pointer;">${todo.text}</span>
            <button onclick="deleteTodo(${index})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

if (todoForm) {
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        
        if (!text) return;

        if (todos.some(t => t.text.toLowerCase() === text.toLowerCase())) {
            if (errorMsg) errorMsg.textContent = 'Task already exists!';
            return;
        }
        
        if (errorMsg) errorMsg.textContent = '';
        todos.push({ text, completed: false });
        todoInput.value = '';
        saveAndRenderTodos();
    });
}

window.toggleTodo = (index) => {
    todos[index].completed = !todos[index].completed;
    saveAndRenderTodos();
};

window.deleteTodo = (index) => {
    todos.splice(index, 1);
    saveAndRenderTodos();
};

saveAndRenderTodos();

// Quick Links
const linkForm = document.getElementById('link-form');
const linksContainer = document.getElementById('links-container');
let links = JSON.parse(localStorage.getItem('quickLinks')) || [];

function saveAndRenderLinks() {
    localStorage.setItem('quickLinks', JSON.stringify(links));
    if (!linksContainer) return;
    linksContainer.innerHTML = '';
    links.forEach(l => {
        const a = document.createElement('a');
        a.href = l.url;
        a.target = '_blank';
        a.textContent = l.name;
        linksContainer.appendChild(a);
    });
}

if (linkForm) {
    linkForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('link-name').value;
        const url = document.getElementById('link-url').value;
        links.push({ name, url });
        document.getElementById('link-name').value = '';
        document.getElementById('link-url').value = '';
        saveAndRenderLinks();
    });
}

saveAndRenderLinks();