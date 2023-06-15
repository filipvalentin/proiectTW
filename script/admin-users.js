const id_user = '648b132c83fa0';

getData(id_user);

function deleteImage(id) {
    const file = "../resources/Sample_User_Icon.png";
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        const mortiiMaSii = reader.result;
        console.log(mortiiMaSii);
        // var http = new XMLHttpRequest();
        // http.open("POST", "upload.php", true);
        // http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        // http.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
        // const data = { image : mortiiMaSii };
        // const json = JSON.stringify(data);
        // http.onreadystatechange = function () {
        //     if (http.readyState == 4 && http.status == 200) {
        //         window.location.assign("account-administration-final.html");
        //     }
        // }

        // http.send(json);
    });
    reader.readAsDataURL(file);

}

function getData(id) {

    var http = new XMLHttpRequest();
    http.open("GET", 'getInfoAdmin.php?id=' + id, true);
    http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    http.onreadystatechange = function () {
        //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            var information = JSON.parse(http.responseText);
            console.log(information);

            var header = document.getElementById('header-user');
            header.innerHTML = information.username;

            var usernameInput = document.getElementById('usernameInput');
            usernameInput.setAttribute('value', information.username);

            var aboutMeInput = document.getElementById('about-me');
            aboutMeInput.innerHTML = information.about_me;

            var emailInput = document.getElementById('currentEmail');
            emailInput.setAttribute('value', information.email);

            var usernameInput = document.getElementById('name-user');
            usernameInput.setAttribute('value', information.entire_name);

            var usernameInput = document.getElementById('high-school');
            usernameInput.setAttribute('value', information.high_school);

            var genderInput = document.getElementById('gender');
            genderInput.value = information.gender;

            var roleInput = document.getElementById('role');
            roleInput.value = information.role;

            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'getImage2.php?id=' + id, true);

            xhr.onload = function () {
                if (xhr.status == 200 && xhr.readyState == 4) {
                    console.log(xhr.responseText);
                    if (xhr.responseText != '') {
                        console.log('ay');
                        var imgElement = document.getElementById('user-img');
                        imgElement.src = xhr.responseText;
                    } else {
                        var imgElement = document.getElementById('user-img');
                        imgElement.src = "../resources/Sample_User_Icon.png";
                    }
                }
                // if (xhr.readyState == 4 && xhr.status == 401) {
                //     console.log('au')
                //     window.location.assign("unauthorized.html");
                // }
            };

            xhr.send();
        }
        if (http.readyState == 4 && http.status == 401) {
            console.log('au')
            window.location.assign("unauthorized.html");
        }
    }
    http.send();
}


function update(id) {
    const usernameInput = document.getElementById('usernameInput').value;
    const aboutMeInput = document.getElementById('about-me').value;
    const emailInput = document.getElementById('currentEmail').value;
    const nameInput = document.getElementById('name-user').value;
    const highSchoolInput = document.getElementById('high-school').value;
    const genderInput = document.getElementById('gender').value;
    const roleInput = document.getElementById('role').value;

    var http = new XMLHttpRequest();
	http.open("POST", 'changeAdmin.php', true);
	http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    console
    const data = {
        idUser: id,
        username: usernameInput,
        entire_name: nameInput,
        highschool:highSchoolInput,
        gender: genderInput,
        aboutMe: aboutMeInput,
        role:roleInput,
        email:emailInput
    };
    const json = JSON.stringify(data);
    console.log(json);
    http.onreadystatechange = function () {
        //Call a function when the state changes.
		if (http.readyState == 4 && http.status == 200) {
			window.location.assign("admin-users.html");
		}
	}
	http.send(json);
}
