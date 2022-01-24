// caching the dom elements
const userInput = document.querySelector(".todo-input");
const inputForm = document.querySelector("form");
const list = document.querySelector(".todo-list");

// event listeners
const eventListeners = () => {
    // task submit event
    inputForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = userInput.value;
        const div = document.createElement("div");
        div.innerHTML = `
            <p class="todo-item">
                <span><i class="fas fa-bars"></i></span> ${input}
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
        userInput.value = "";
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
            div.addEventListener("transitionend", () => {
                div.remove();
                console.log("event occured");
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
};

updateState();
