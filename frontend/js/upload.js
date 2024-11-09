document.addEventListener("DOMContentLoaded", ()=>{
    const uploadForm = document.getElementById("uploadForm");
    const fileInput = document.getElementById("fileInput");
    const message = document.getElementById("message");

    uploadForm.addEventListener("submit", async(event) =>{
        navigateTo("result");
        const input = document.getElementById("input")
        const data = new FormData()

        data.append("file",fileInput.files[0]);
        
        try{
            navigateTo("result");
            const response = await fetch("/api/upload", {method:"POST", body:data });
            if (response.ok){
                message.textContent ="File uploaded";
                navigateTo("result");
            }else{
                message.textContent = "Error uploading"
            }
            navigateTo("result");
        }
        catch(error){
            console.error("error: ", error);
        }
    })
})
function navigateTo(page) {
    window.location.href = `${page}.html`;
  }