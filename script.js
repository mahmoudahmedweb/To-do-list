const inputBox = document.getElementById("input-box");
const itemsContainer = document.getElementById("items-container");
const listEmptyParagraph = document.getElementById("paragraph");
const nightModeButton = document.getElementById("night-mode");

// Toggle night mode
nightModeButton.onclick = () => {
    nightModeButton.classList.toggle("fa-moon");
    nightModeButton.classList.toggle("fa-sun");
    document.body.classList.toggle("dark-mode");
};

// Add item to the list
function addItem() {
    const inputValue = inputBox.value.trim(); // Use trim to ignore leading/trailing whitespace
    if (!inputValue) {
        alert("You must write something!");
        return; // Exit early if input is empty
    }
    
    const li = createListItem(inputValue); // Create a new list item
    itemsContainer.appendChild(li);
    
    // Hide the empty message since we are adding an item
    listEmptyParagraph.style.display = "none";
    inputBox.value = ''; // Clear the input field
    saveData();
    updateCurrentCount(); // Update item count after adding
}

// Create a new list item with a remove button
function createListItem(value) {
    const li = document.createElement("li");
    li.textContent = value; // Use textContent for better security against XSS
    const span = document.createElement("span");
    span.textContent = "\u00d7"; // Unicode for multiplication sign
    span.classList.add("remove-btn"); // Add a class for styling if needed
    li.appendChild(span);
    return li;
}

// Event listener for item clicks (toggle and remove)
itemsContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        updateCurrentCount();
        saveData();
    }
});

// Update item count and visibility of empty message
function updateCurrentCount() {
    const itemCountSpan = document.querySelector('.heading h2 span');
    const currentCount = itemsContainer.children.length;
    itemCountSpan.textContent = `${currentCount} item(s)`;
    listEmptyParagraph.style.display = currentCount === 0 ? "block" : "none"; 
}

// Save items to local storage
function saveData() {
    localStorage.setItem("data", itemsContainer.innerHTML);
}

// Load items from local storage
function displayData() {
    const storedData = localStorage.getItem("data");
    itemsContainer.innerHTML = storedData || ''; 
    updateCurrentCount();
}

// Initialize the app
displayData();