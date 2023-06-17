function changeInfo() {

    document.getElementById('empty-username').style.display = "none";
    document.getElementById('empty-name').style.display = "none";
    document.getElementById('empty-school').style.display = "none";
    document.getElementById('empty-date').style.display = "none";
    document.getElementById('empty-gender').style.display = "none";
    document.getElementById('empty-about').style.display = "none";

    document.getElementById('invalid-username').style.display = "none";
    document.getElementById('taken-username').style.display = "none";
    document.getElementById('invalid-date').style.display = "none";
    document.getElementById('too-about').style.display = "none";

    const username = document.getElementById('username').value;
    const real_name = document.getElementById('name').value;
    const birthdate = document.getElementById('birthday').value;
    const high_school = document.getElementById('highschool').value;
    const gender = document.getElementById('gender').value;
    const aboutMe = document.getElementById('aboutMe').value;

    if (username == '') {
        document.getElementById('empty-username').style.display = "block";
    }
    if (real_name == '') {
        document.getElementById('empty-name').style.display = "block";
    }
    if (birthdate == '') {
        document.getElementById('empty-date').style.display = "block";
    }
    if (high_school == '') {
        document.getElementById('empty-school').style.display = "block";
    }
    if (gender == '') {
        document.getElementById('empty-gender').style.display = "block";
    }
    if (aboutMe == '') {
        document.getElementById('empty-about').style.display = "block";
    }
    if (aboutMe.length > 200) {
        document.getElementById('too-about').style.display = "block";
    }
    if (username != '' && real_name != '' && birthdate != '' && high_school != '' && gender != '' && aboutMe != '' && aboutMe.length <= 200) {
        checkUsername();
    }
}

function checkUsername() {
    var username = document.getElementById('username').value;
    var regexPattern = /([a-zA-Z_0-9]+)/;
    var forbiddenCharsRegex = /[\!\@\#\$\%\^\&\*\(\)\-\=+\[\]\;\'\,\.\/\{\}\:\"\|\<\>\?\"]/;
    if (!regexPattern.test(username) || forbiddenCharsRegex.test(username)) {
        document.getElementById('invalid-username').style.display = "block";
    } else {
        var http = new XMLHttpRequest();

        http.open("GET", "verify_username.php?username=" + username, true);
        http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                var resp = http.responseText;
                if (resp != 0) {
                    document.getElementById('taken-username').style.display = "block";
                } else {
                    checkData();
                }
            }
        }

        http.send();
    }
}

function checkData() {
    var currentDate = new Date();
    var givenDate = new Date(document.getElementById('birthday').value);
    if (givenDate >= currentDate) {
        document.getElementById('invalid-date').style.display = "block";
    }
    else {
        modifyInDatabase();
    }
}


function modifyInDatabase(){
    const username = document.getElementById('username').value;
    const real_name = document.getElementById('name').value;
    const birthdate = document.getElementById('birthday').value;
    const high_school = document.getElementById('highschool').value;
    const gender = document.getElementById('gender').value;
    const aboutMe = document.getElementById('aboutMe').value;
    var displayGender;
    var displayBirthDay;
    var displayHighSchool;

    if (document.getElementById('gen').checked) {
        displayGender = 1;
    } else {
        displayGender = 0;
    }

    if (document.getElementById('nastere').checked) {
        displayBirthDay = 1;
    } else {
        displayBirthDay = 0;
    }

    if (document.getElementById('institutie').checked) {
        displayHighSchool = 1;
    } else {
        displayHighSchool = 0;
    }
    var http = new XMLHttpRequest();
	http.open("POST", 'change-info.php', true);
	http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    http.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
    const data = {
        username: username,
        entire_name: real_name,
        birthday: birthdate,
        highschool:high_school,
        gender: gender,
        aboutMe: aboutMe,
        displayGender: displayGender,
        displayBirthday: displayBirthDay,
        displayHighschool: displayHighSchool
    };
    const json = JSON.stringify(data);
    http.onreadystatechange = function () {
        //Call a function when the state changes.
		if (http.readyState == 4 && http.status == 200) {
			window.location.assign("account-administration.html");
		}
		if (http.readyState == 4 && http.status == 401) {
            console.log('au')
			window.location.assign("unauthorized.html");
		}
	}
	http.send(json);
}