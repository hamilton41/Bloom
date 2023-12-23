import { user } from './firebase.js';

//圖片上傳機制
document.addEventListener('DOMContentLoaded', () => {
    let userEmail = user?.email; // 假設這是使用者的電子郵件地址
    let upperLimit = 15; // 自行設定上限值


    let tagIdArray = ["a1", "a2", "a3", "a4", "b1", "b2", "c1", "c2", "c3", "c4", "d1", "main"]; // 假設這是 tagNames 陣列

    for (let i = 0; i < tagIdArray.length; i++) {
        let tagId = tagIdArray[i];
        let ImageUrl = `./upload/${user?.email}${tagId}.jpg`;
        const dynamicImage = document.getElementById(tagId);
        // console.log(tagId);

        // Send user data to PHP using AJAX
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'Upload.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                console.log('User data sent to PHP');
            }
        };


        // 更新圖片 URL 並設定給 img 標籤的 src 屬性
        function updateImage() {
            dynamicImage.src = ImageUrl;
            dynamicImage.onerror = function () {
                this.onerror = null;
                this.src = './upload/undefined' + tagId + '.jpg'; // 預設的圖片路徑
            };
        }

        // 初始設定
        updateImage();

        // 新增的 HTML 內容
        const newHtmlContent = `
            <form id="uploadForm_${tagId}" class="form" method="post" enctype="multipart/form-data">
                <label for="file">choose image：</label>
                <input type="file" class="file" name="file" id="file"><br>
                <input type="hidden" name="user_data" class="user_data_field" value="">
                <input type="hidden" name="tag_name" value="${tagId}">
                <input class="submitButton" type="submit" value="upload">
            </form>
        `;

        // 在每個 imgTagElement 之後插入新的 HTML 內容
        dynamicImage.insertAdjacentHTML('afterend', newHtmlContent);
        const user_data_field = document.querySelector(`#uploadForm_${tagId} .user_data_field`);
        user_data_field.value = userEmail;

        // Convert user object to JSON string
        // const userStringify = JSON.stringify(user);


        // xhr.send(JSON.stringify({ user: userStringify }));
    }
});