function uploadImage() {
    document.getElementById('no-image').style.display = "none";
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
    if (!file || !file.type.startsWith('image/')) {
        document.getElementById('no-image').style.display = "block";
    } else {
        console.log(file);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const picture = reader.result;
            console.log(picture);
            var http = new XMLHttpRequest();
            http.open("POST", "upload.php", true);
            http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            http.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
            const data = { image : picture };
            const json = JSON.stringify(data);
            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    window.location.assign("account-administration.html");
                }
            }

            http.send(json);
        });
        reader.readAsDataURL(file);
    }

}