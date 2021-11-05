// console.log('working');

// Caching the DOM Elements
const userInput = document.querySelector('.todo-input');
const button = document.querySelector('.todo-button');
const list = document.querySelector('.todo-list');


// TODO LIST
//  1. Capturing the user input
//  2. Create all the elements
//  3. Insert class and text input
//  4. Append child elements to parent element

button.addEventListener('click', function(event){
    event.preventDefault();
    const input = userInput.value;
    const div = document.createElement('div');
    div.className = 'todo';
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.textContent = input;
    div.appendChild(li);
    const checkBtn = document.createElement('button');
    checkBtn.className = 'check';
    checkBtn.innerHTML = '<i class="fas fa-check"></i>';
    div.appendChild(checkBtn);
    const trashBtn = document.createElement('button');
    trashBtn.className = 'trash';
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    div.appendChild(trashBtn);
    list.appendChild(div);
    userInput.value = '';
})

list.addEventListener('click',function(event){
    const clickedItem = event.target;
    if(clickedItem.className == 'check'){
        const div = clickedItem.parentNode;
        div.classList.add('completed');
        clickedItem.remove();
    } else if(clickedItem.className == 'trash'){
        const div = clickedItem.parentNode;
        div.classList.add('drop-effect');
        div.addEventListener('transitionend', function(){
            div.remove();
            console.log('event occured')
        })   
    }
})