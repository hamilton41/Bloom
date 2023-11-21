window.onload = function(){
    //image-cropper照片選擇器
    var inputImageFile = document.querySelectorAll('.form .file');
    for(let i=0;i<inputImageFile.length;i++){
        inputImageFile[i].addEventListener("change", (e) => {
            var imageSelectImg = document.createElement("img");
            var imageSelect = document.createElement("div");
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
                autoCrop: 1,
            });
            const file = e.target.files[0];
            const reader = new FileReader();
            inputImageFile[i].parentNode
            reader.onload = (e) => {
                imageSelectImg.src = e.target.result;
                cropper.replace(e.target.result);
            };

            reader.readAsDataURL(file);
            var imageWidth = inputImageFile[i].parentNode.parentNode.querySelector('img').width;
            var imageHeight = inputImageFile[i].parentNode.parentNode.querySelector('img').height;
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
                        } else {
                            console.error('Upload Failed:', xhr.statusText);
                        }
                    }
                };
                xhr.send('image=' + encodeURIComponent(croppedImageDataURL));
                imageSelect.remove();
                inputImageFile[i].value='';
            })
        });
    }
};