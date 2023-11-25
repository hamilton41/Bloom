
// Import the required functions from Firebase Auth SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, signOut, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, getRedirectResult } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3hmaa5DKY70in7d8_HT8uLuPnsc58wyo",
    authDomain: "authentication-app-2d849.firebaseapp.com",
    databaseURL: "https://authentication-app-2d849-default-rtdb.firebaseio.com",
    projectId: "authentication-app-2d849",
    storageBucket: "authentication-app-2d849.appspot.com",
    messagingSenderId: "680172971072",
    appId: "1:680172971072:web:d9387667c8bc56052e2ba5"
};

// Initialize Firebase

const resultString = sessionStorage.getItem('result');
const result = JSON.parse(resultString);
const userString = sessionStorage.getItem('user');
const user = JSON.parse(userString);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Add an event listener to the "Join with Google" button
document.querySelector('.google-btn').addEventListener('click', (e) => {
    console.log(auth);
    console.log(provider);
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("this is result", result);
            // Google sign-in successful
            const user = result?.user;
            alert('Hello ' + user?.displayName + ' ');
            document.getElementById('displayName').innerText = 'Hello ' + user?.displayName + ' (Google)';
            sessionStorage.setItem('result', JSON.stringify(result));
            sessionStorage.setItem('user', JSON.stringify(user));
            location.reload();
            // ...
        })
        .catch((error) => {
            const errorMessage = error;
            alert(errorMessage);
            // ...
        });
});
if (user != null) { document.getElementById('displayName').innerText = 'Hello ' + user?.displayName + ' (Google)'; }

// Check for the Google sign-in redirect result after the "Join with Google" button is clicked
document.addEventListener('DOMContentLoaded', () => {
    getRedirectResult(auth)
        .then((result) => {
            if (result == null) {
                return;
            }
            if (result.user) {
                // Google sign-in successful
                const user = result.user;
                alert('Hello ' + user?.displayName + ' (Google)');

            } else {

            }
        })
        .catch((error) => {
            const errorMessage = error;
            alert(error);
            // ...
        });
});



//登出按鈕
document.getElementById('logout-button').addEventListener('click', () => {

    const auth = getAuth();
    signOut(auth).then(() => {
        sessionStorage.removeItem('result');
        sessionStorage.removeItem('user');
        console.log('User signed out.');
        location.reload();
    }).catch((error) => {
        // An error happened.
    });

});

// log-out-button-set
if (user?.displayName) {
    document.getElementById('displayName').textContent = 'Hello ' + user.displayName;
    document.getElementById('logout-button').style.display = 'inline-flex';
}

//圖片上傳機制
document.addEventListener('DOMContentLoaded', () => {
    let userEmail = user?.email; // 假設這是使用者的電子郵件地址
    let upperLimit = 15; // 自行設定上限值


    let tagIdArray = ["a1", "a2", "a3", "a4", "b1", "b2", "c1", "c2", "c3", "c4"]; // 假設這是 tagNames 陣列

    for (let i = 0; i < tagIdArray.length; i++) {
        let tagId = tagIdArray[i];
        let ImageUrl = `./upload/${user?.email}${tagId}.jpg`;
        const dynamicImage = document.getElementById(tagId);

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
        }

        // 初始設定
        updateImage();

        // 新增的 HTML 內容
        const newHtmlContent = `
            <form id="uploadForm_${tagId}" class="form" action="imgUpload.php" method="post" enctype="multipart/form-data">
                <label for="file">選擇要上傳的文檔：</label>
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
        const userStringify = JSON.stringify(user);


        xhr.send(JSON.stringify({ user: userStringify }));
    }
});


//文字上傳機制

//可編輯事件
function makeEditable(element) {
    element.contentEditable = true;
    element.focus();
}
// 選取所有的 <h1> 和 <p> 標籤
var headings = document.querySelectorAll("h1");
var paragraphs = document.querySelectorAll("p");

// 對選取的 <h1> 元素和 <p> 元素添加事件處理程序
for (var i = 0; i < headings.length; i++) {
    headings[i].addEventListener("dblclick", function () {
        makeEditable(this);
    });
}

for (var j = 0; j < paragraphs.length; j++) {
    paragraphs[j].addEventListener("dblclick", function () {
        makeEditable(this);
    });
}

//先對所有的title和paragraph添加class，然後再用添加的class去改變原id
//對t和p~做出遍歷識別，對上傳的檔案做出遍歷識別

// 在模組內部定義 makeEditable 函式


document.addEventListener('DOMContentLoaded', () => {
    var userEmail = user?.email;

    let titleIdArray = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9", "t10", "t11", "t12", "t13", "t14", "t15", "t16"];
    let paragraphIdArray = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10", "p11", "p12"];
    // dom提交按紐和p標籤，將p標籤內容上傳到伺服器

    // 新增title的class
    for (var i = 0; i < titleIdArray.length; i++) {
        var titleId = titleIdArray[i];
        // console.log(titleId);
        var element = document.getElementById(titleId);

        if (element) {
            // 如果找到具有相應 id 的標籤，添加 classname
            element.classList.add("titleEditable");
        }
    }
    // 新增title的class
    for (var i = 0; i < paragraphIdArray.length; i++) {
        var paragraphIdArrayId = paragraphIdArray[i];
        // console.log(paragraphIdArrayId);
        var element = document.getElementById(paragraphIdArrayId);

        if (element) {
            // 如果找到具有相應 id 的標籤，添加 classname
            element.classList.add("paragraphEditable");
        }
    }

    // 取得所有具有 "textEditable" 和 "paragraphEditable"類別的元素
    var titleEditableElements = document.getElementsByClassName("titleEditable");
    var paragraphEditableElements = document.getElementsByClassName("paragraphEditable");

    // 將這些元素存儲在陣列中
    var titlesArray = Array.from(titleEditableElements);
    var paragraphsArray = Array.from(paragraphEditableElements);

    // 遍歷陣列並更改每個元素的 id
    for (var i = 0; i < titleIdArray.length; i++) {

        if (i < titleIdArray.length) { // 確保有足夠的新 id 值供使用
            titlesArray[i].id = "editableText" + titleIdArray[i];
            var titlesIdArray = titlesArray[i].id;
            const dynamicText = document.getElementById(titlesIdArray);
            const newTextContent = `<button id="saveButton${titlesIdArray}" class="textEditable">Save Text</button>`;
            dynamicText.insertAdjacentHTML('afterend', newTextContent);
        }
    }
    for (var i = 0; i < paragraphIdArray.length; i++) {

        if (i < paragraphIdArray.length) { // 確保有足夠的新 id 值供使用
            paragraphsArray[i].id = "editableText" + paragraphIdArray[i];
            var paragraphsIdArray = paragraphsArray[i].id;
            // console.log(paragraphsIdArray);
            const dynamicText = document.getElementById(paragraphsIdArray);
            const newTextContent = `<button id="btn${paragraphsIdArray}" class="textEditable">Save Text</button>`;
            dynamicText.insertAdjacentHTML('afterend', newTextContent);
        }
    }

    // 遍歷集合並為每個元素添加事件監聽器
    // 選取所有具有 "textEditable" 類別的按鈕
    var saveButtons = document.querySelectorAll(".textEditable");

    // 對選取的按鈕添加事件處理程序
    saveButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            // 獲取相關的文本編輯區域（即按鈕的前一個兄弟元素）
            var editedText = button.previousElementSibling.innerText;
            var tagId = button.previousElementSibling.id;
            console.log(tagId);


            // 發送 POST 請求，處理編輯的文本
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "textUpload.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    console.log("Text saved successfully.");
                }
            };
            xhr.send("editedText=" + encodeURIComponent(editedText) + "&tagId=" + encodeURIComponent(tagId) + "&userEmail=" + encodeURIComponent(userEmail));

            alert("update!");
            location.reload(true);
        });
    });

    var titles = document.querySelectorAll(".titleEditable");
    var paragraphs = document.querySelectorAll(".paragraphEditable");

    titles.forEach(function (titlesElement) {
        var titlesId = titlesElement.id;

        fetchTitlesTextFile(userEmail, titlesId);
    });
    paragraphs.forEach(function (paragraphsElement) {
        var paragraphsId = paragraphsElement.id;

        fetchParagraphsTextFile(userEmail, paragraphsId);
    });


    // 對選取的按鈕添加事件處理程序


    function fetchTitlesTextFile(userEmail, titlesId) {
        // 動態生成文件路徑，例如：./user_email_t1.txt 或 ./user_email_t2.txt
        var filePath = `./${userEmail}${titlesId}.txt`;
        console.log(titlesId);


        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                return response.text();
            })
            .then(fileContent => {
                // 將內容填充到適當的元素中
                sessionStorage.setItem('fileContent', fileContent);
                const fileContents = sessionStorage.getItem('fileContent');
                console.log(fileContent);
                // 使用 titlesId 來動態設置相應的元素 ID
                document.getElementById(titlesId).innerText = fileContents;

                // 在這裡為元素添加雙擊事件監聽器
                document.getElementById(titlesId).addEventListener("dblclick", function () {
                    makeEditable(this);
                });
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
    }
    function fetchParagraphsTextFile(userEmail, titlesId) {
        // 動態生成文件路徑，例如：./user_email_t1.txt 或 ./user_email_t2.txt
        var filePath = `./${userEmail}${titlesId}.txt`;
        console.log(titlesId);


        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                return response.text();
            })
            .then(fileContent => {
                // 將內容填充到適當的元素中
                sessionStorage.setItem('fileContent', fileContent);
                const fileContents = sessionStorage.getItem('fileContent');
                console.log(fileContent);
                // 使用 titlesId 來動態設置相應的元素 ID
                document.getElementById(titlesId).innerText = fileContents;

                // 在這裡為元素添加雙擊事件監聽器
                document.getElementById(titlesId).addEventListener("dblclick", function () {
                    makeEditable(this);
                });
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
    }
    //明天早上在做一個paragraph的，就完成文字上傳，便可以開始製作金流系統了
});


// 檔案生成機制
const generateButton = document.getElementById('generateButton');

generateButton.addEventListener('click', () => {
    // 獲取整個HTML文件的內容
    const htmlContent = document.documentElement.outerHTML;

    // 發送 HTTP 請求到伺服器端的 PHP 腳本
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "documentUpload.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log("Text saved successfully.");
        }
    };

    // 將HTML內容傳遞到伺服器端，記得要編碼
    xhr.send("htmlContent=" + encodeURIComponent(htmlContent));
});

