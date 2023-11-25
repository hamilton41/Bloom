function isFileValid(file) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return allowedTypes.includes(file.type);
}
window.onload = function(){
    //image-cropper照片選擇器
    var inputImageFile = document.querySelectorAll('.form .file');
    for(let i=0;i<inputImageFile.length;i++){
        inputImageFile[i].addEventListener("change", (e) => {
            var file = e.target.files[0];
            // 驗證檔案類型
            if (file && isFileValid(file)) {
            var imageSelectImg = document.createElement("img");
            var imageSelect = document.createElement("div");
            var image = inputImageFile[i].parentNode.parentNode.querySelector('img');
            imageSelect.innerHTML = `
            <div class="image-select">
                <div class="image-select-container">
                    <div class="image-select-pic crop-container">
                    </div>
                    <div class="image-select-btn">選擇完成</div>
                    <div class="image-select-close-btn"><i class="fa-solid fa-xmark"></i></div>
                </div>        
            </div>
            `;
            inputImageFile[i].parentNode.parentNode.parentNode.after(imageSelect);
            imageSelect.querySelector('.image-select-pic').appendChild(imageSelectImg);
            const cropper = new Cropper(imageSelectImg, {
                movable: false, // 禁止整个图像的移动
                zoomable: false,
                autoCropArea: 1,
                viewMode: 1,
            });
            const file = e.target.files[0];
            const reader = new FileReader();
            inputImageFile[i].parentNode
            reader.onload = (e) => {
                imageSelectImg.src = e.target.result;
                cropper.replace(e.target.result);
            };

            reader.readAsDataURL(file);
            var imageWidth = image.width;
            var imageHeight = image.height;
            var imageUrl;
            if(image.hasAttribute('data-old-src')){
                imageUrl = image.getAttribute('data-old-src');
            }
            else{
                imageUrl = image.getAttribute('src');
            }
            cropper.setAspectRatio(imageWidth/imageHeight);
            imageSelect.querySelector('.image-select-close-btn').addEventListener('click',function(){
                imageSelect.remove();
                inputImageFile[i].value='';
            })
            imageSelect.querySelector('.image-select-btn').addEventListener('click',function(){
                const canvas = cropper.getCroppedCanvas();
                const croppedImageDataURL = canvas.toDataURL("image/jpeg"); // 以JPEG格式获取裁剪后的图像数据URL
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'imgUpload.php', true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            console.log('Upload Successful:', xhr.responseText);
                            alert(xhr.responseText);
                            image.src = croppedImageDataURL;
                            image.setAttribute('data-old-src',imageUrl);
                        } else {
                            console.error('Upload Failed:', xhr.statusText);
                        }
                    }
                };
                xhr.send('image=' + encodeURIComponent(croppedImageDataURL) + '&imageName=' + encodeURIComponent(imageUrl));
                imageSelect.remove();
                inputImageFile[i].value='';
            })
            } else {
                // 如果檔案類型無效，顯示錯誤訊息
                alert('請上傳 jpg、jpeg 或 png 格式的圖片');
                inputImageFile[i].value = ''; // 清空輸入
            }
        });
    }
};