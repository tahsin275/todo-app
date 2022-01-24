// caching the dom elements
const userInput = document.querySelector(".todo-input");
const inputForm = document.querySelector("form");
const list = document.querySelector(".todo-list");

// local storage functionality
const checkStorage = () => {
    let todos;
    if (localStorage.getItem("todos")) {
        const todoItems = localStorage.getItem("todos");
        todos = JSON.parse(todoItems);
    } else {
        todos = [];
    }
    return todos;
};

// save todo element to local storage
const saveTodos = (todo) => {
    let todos = checkStorage();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
};

// check for existing todo elements
// const checkTodos = () => {
//     const todos = checkStorage();
//     const todoEl = list.children;
//     if (todoEl.length > 0) {
//         for (let i = 0; i < todoEl.length; i++) {
//             const todo = todoEl[i].children[0].innerText;
//             const index = todos.indexOf(todo);
//             if (index == -1) {
//                 saveTodos(todo);
//             }
//         }
//     }
// };

// get todo elements from local storage
const getTodos = () => {
    let todos = checkStorage();
    if (todos.length > 0) {
        todos.forEach((todo) => renderTodo(todo));
    }
};

// delete todo elements from local storage
const removeTodo = (todo) => {
    let todos = checkStorage();
    const todoInput = todo.children[0].innerText.trim();
    const index = todos.indexOf(todoInput);
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
};

// render todo elements into the list
const renderTodo = (todo) => {
    const div = document.createElement("div");
    div.innerHTML = `
            <p class="todo-item">
                <span><i class="fas fa-bars"></i></span> ${todo}
            </p>
            <div class="butons">
                <button class="check">
                    <i class="fas fa-check"></i>
                </button>
                <button class="trash">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            `;
    div.className = "todo";
    list.append(div);
};

// event listeners
const eventListeners = () => {
    // task submit event
    inputForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = userInput.value;
        if (input) {
            renderTodo(input);
            saveTodos(input);
            userInput.value = "";
        } else {
            alert("You can't add empty element into the list!");
        }
    });

    list.addEventListener("click", (e) => {
        const clickedItem = e.target;
        if (clickedItem.className == "check") {
            const div = clickedItem.parentNode.parentNode;
            div.classList.add("completed");
            const trash = div.querySelector(".trash");
            trash.style.opacity = "80%";
            clickedItem.remove();
        } else if (clickedItem.className == "trash") {
            const div = clickedItem.parentNode.parentNode;
            div.classList.add("drop-effect");
            removeTodo(div);
            div.addEventListener("transitionend", () => {
                div.remove();
            });
        }
    });
};

// async data fetching
const fetchData = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setWeather(data);
};

// get current date and month
const getDate = () => {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const date = new Date();
    const month = date.getUTCMonth();
    const monthName = monthNames[month];
    const day = date.getUTCDate();
    const dateEl = document.querySelector("#date");
    date.innerText = `${day} ${monthName}`;
};

// get weather
const getWeather = () => {
    const url =
        "https://api.weatherapi.com/v1/current.json?key=50350eab94a54295a9801213222401&q=Dhaka";
    fetchData(url);
};

const setWeather = (data) => {
    const weather = document.querySelector("#temp");
    const temp = data.current.temp_c;
    weather.innerText = temp;
};

// update app state
const updateState = () => {
    eventListeners();
    getDate();
    getWeather();
    getTodos();
};

updateState();
