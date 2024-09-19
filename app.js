const btn = document.getElementById('btn');
const input = document.getElementById('input');
const List = document.getElementById('List');
const heading = document.getElementById('heading');
loadTasks()
function addTask() {
    const task = input.value;
    if(task) {
        createTaskElement(task);
        input.value = '';
        heading.style.color = ''
        saveTask()
    } else {
        heading.style.color = 'red';
    }
}
btn.addEventListener('click', addTask)
function createTaskElement(task) {
    const listItem = document.createElement('li');
    listItem.textContent = task;

    let button = document.createElement('button');
    button.className = 'btnR';
    button.textContent = 'delete'
    listItem.appendChild(button)

    let edit = document.createElement('button');
    edit.className = 'edit';
    edit.textContent = 'edit';
    listItem.appendChild(edit)

    List.appendChild(listItem);
    console.log(listItem.textContent)

    edit.addEventListener('click', function() {
        input.value = listItem.textContent.replace('delete', '').replace('edit', '');
        List.removeChild(listItem);
        saveTask()
    })
    button.addEventListener('click', function() {
        List.removeChild(listItem);
        saveTask()
    })
}
function saveTask() {
    let tasks = [];
    List.querySelectorAll('li').forEach(function(item) {
        tasks.push(item.textContent.replace('delete', '').replace('edit', '').trim())
    });

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks.forEach(createTaskElement)
}