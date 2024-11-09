// handles the display of the cleaned data and a download link
// result.js
document.addEventListener("DOMContentLoaded", () => {
    const selectedOptionsList = document.getElementById("selectedOptionsList");
    const selectedOptions = JSON.parse(localStorage.getItem("selectedOptions")) || [];

    selectedOptions.forEach(option => {
        const listItem = document.createElement("li");
        listItem.textContent = option;
        selectedOptionsList.appendChild(listItem);
    });
});
