let imgView = document.querySelector(".imgView");
let inputImg = document.getElementById("inputImg");
let imgViewContent = document.querySelector(".imgViewContent");
let textExtract = document.getElementById("textExtract");
let textAreaDiv = document.querySelector(".textArea");
let textExtracted = document.querySelector(".textExtracted");
const dragText = document.querySelector('.dragText');
let copyBtn = document.getElementById("copyBtn");





// ======= Upload image from desktop =======

inputImg.addEventListener("change", uploadImage)
function uploadImage()
    {
        var img = inputImg.files[0];
        var imgUrl = URL.createObjectURL(new Blob([img], { type: 'image/jpg' }));
        console.log(imgUrl);
        imgView.style.backgroundImage = `url(${imgUrl})`;
        if(imgUrl){
            imgViewContent.innerHTML = '';
        }
    };


// =========== Upload image using Drag & Drop =======

$(".imgView")
    .on("dragover", function(e){
        $(".imgView").addClass("dropping");
        e.preventDefault();
        e.stopPropagation();
        dragText.textContent = 'Release here to upload'})
    .on("dragleave", function(e){
        $(".imgView").removeClass("dropping");
        dragText.textContent = 'Drag and drop or click here'})

imgView.addEventListener("drop", function(e){
        e.preventDefault();
        e.stopPropagation();
        inputImg.files = e.dataTransfer.files;
        uploadImage();
        $(".imgView").removeClass("dropping");
})


// ============ Extract Text from Uploaded Image =====

    textExtract.addEventListener("click", function(){
        let dataExtracted = '';
        const rec = new Tesseract.TesseractWorker();
        rec.recognize(inputImg.files[0])
            .progress(function (response) {
                console.log(response);
                if(response.status == 'recognizing text'){
                    textExtracted.innerHTML = response.status + '   ' + response.progress;
                }else{
                    textExtracted.innerHTML = response.status;
                }
            })
            .then(function (data) {
                dataExtracted = data;
                textExtracted.innerHTML = data.text;
            })
            .then(function(){
                $("#copyBtn").show();
                copyBtn.addEventListener("click", function(){
                    navigator.clipboard.writeText(dataExtracted.text);
                })
            })
    })



$(".generateNew").click(function(){
    location.reload();
})