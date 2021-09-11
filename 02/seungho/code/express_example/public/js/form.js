const formUploadImage = document.querySelector("#form-upload-image");
const inputFile = document.querySelector("#input-image-file");
const inputText = document.querySelector("#input-text");
const imgPreview = document.querySelector("#img-preview");

formUploadImage.addEventListener("submit",async (evt)=>{
    console.log("onClick submit upload file")
    const formData = new FormData();
    console.log(inputFile.files);
    formData.append("image",inputFile.files[0]);
    formData.append("title",inputText.value);
    await axios.post("/upload",{
        formData
    });
});