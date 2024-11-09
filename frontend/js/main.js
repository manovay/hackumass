// Main.js handles js form interactions and then API calls

function navigateTo(page) {
    window.location.href = `${page}.html`;
  }

let selectedOptions = [];

function saveSelections() {
    const options = document.querySelectorAll(".option:checked");
    selectedOptions = Array.from(options).map(option => option.value);

    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
}





document.addEventListener("DOMContentLoaded", () =>{
    if(uploadButton){
        uploadButton.addEventListener("click",() =>{
            navigateTo(upload)
        })
    }

})