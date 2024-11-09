document.addEventListener("DOMContentLoaded", ()=>{
    const fileInput = document.getElementById("fileInput");
    const message = document.getElementById("message");

    fileInput.addEventListener("submit", async(event) =>{
        const input = document.getElementById("input")
        const data = new FormData()

        data.append("file",fileInput.files[0]);
        
        try{
            const response = await("/api/upload", {method:"POST", body:data });
            if (response.ok){
                message.textContent ="File uploaded";
                navigateTo(result)
            }else{
                message.textContent = "Error uploading"
            }
        }
        catch(error){
            console.error("error: ", error);
        }
    })
})
function navigateTo(page) {
    window.location.href = `${page}.html`;
  }