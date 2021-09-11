const formUserLogin = document.querySelector("#form-user-login");
const inputUserName = document.querySelector("#input-user-name");

formUserLogin.addEventListener("submit",async (evt)=>{
    evt.preventDefault();
    if(inputUserName.value){
        const result = await axios.post("/login",{
            name : inputUserName.value
        })
        console.log(result);
        location.href = "/"
    }

})