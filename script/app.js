// Caching the DOM Elements
const userInput = document.querySelector(".todo-input");
const button = document.querySelector(".todo-button");
const list = document.querySelector(".todo-list");

button.addEventListener("click", function (event) {
    event.preventDefault();
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

list.addEventListener("click", function (event) {
    const clickedItem = event.target;
    if (clickedItem.className == "check") {
        const div = clickedItem.parentNode.parentNode;
        div.classList.add("completed");
        clickedItem.remove();
    } else if (clickedItem.className == "trash") {
        const div = clickedItem.parentNode.parentNode;
        div.classList.add("drop-effect");
        div.addEventListener("transitionend", function () {
            div.remove();
            console.log("event occured");
        });
    }
});

// list.addEventListener("d");
