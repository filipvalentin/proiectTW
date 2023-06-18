const urlParams = new URLSearchParams(window.location.search);
const id_user = urlParams.get('id');

function resetPassword() {
    document.getElementById('failed-passwd-cap-letter').style.display = "none";
    document.getElementById('failed-passwd-number').style.display = "none";
    document.getElementById('failed-passwd-lenght').style.display = "none";
    document.getElementById('failed-passwd-spec-char').style.display = "none";
    document.getElementById('failed-passwd-small-letter').style.display = "none";
    document.getElementById('conf-passwd').style.display = "none";
    document.getElementById('empty-passwd').style.display = "none";
    document.getElementById('empty2-passwd').style.display = "none";

    if (document.getElementById('newPassword').value == '') {
        document.getElementById('empty-passwd').style.display = "block";
    }
    if (document.getElementById('confirmPassword').value == '') {
        document.getElementById('empty2-passwd').style.display = "block";
    }
    if (document.getElementById('newPassword').value != '' && document.getElementById('confirmPassword').value != '') {
        validatePassword();
    }
}

function validatePassword() {
    var password = document.getElementById("newPassword").value;

    var lowercaseLetterRegExp = /[a-z]/g;
    var uppercaseLetterRegExp = /[A-Z]/g;
    var numberRegExp = /[0-9]/g;
    var specialCharRegExp = /[\*\.\!\@\#\$\%\^\&\(\)\{\}\[\]\:\;\<\>\,\.\?\/\~\_\+\-\=\|]/g;

    var hasLowercase = true;
    var hasUppercase = true;
    var hasNumner = true;
    var hasSpecialChar = true;
    var hasMinLength = true;

    if (!lowercaseLetterRegExp.test(password)) {
        hasLowercase = false;
        document.getElementById('failed-passwd-small-letter').style.display = "block";
    }
    if (!uppercaseLetterRegExp.test(password)) {
        hasUppercase = false;
        document.getElementById('failed-passwd-cap-letter').style.display = "block";
    }
    if (!numberRegExp.test(password)) {
        hasNumner = false;
        document.getElementById('failed-passwd-number').style.display = "block";
    }
    if (!specialCharRegExp.test(password)) {
        hasSpecialChar = false;
        document.getElementById('failed-passwd-spec-char').style.display = "block";
    }
    if (password.length < 8) {
        hasMinLength = false;
        document.getElementById('failed-passwd-lenght').style.display = "block";
    }

    if (hasLowercase && hasUppercase && hasNumner && hasSpecialChar && hasMinLength) {
        confirmation();
    }
}

function confirmation() {
    var passOne = document.getElementById('newPassword').value;
    var passTwo = document.getElementById('confirmPassword').value;
    if (passOne !== passTwo) {
        document.getElementById('conf-passwd').style.display = "block";
    } else {
        replacePassword();
    }
}

function replacePassword() {
    var newPasswd = document.getElementById('newPassword').value;
    console.log(newPasswd);
    var http = new XMLHttpRequest();
    http.open("POST", '../php/reset-password.php', true);
    http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    const data = { password: newPasswd, id: id_user };
    const json = JSON.stringify(data);
    http.onreadystatechange = function () {
        //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            window.location.assign("index.html");
        }
        if (http.readyState == 4 && http.status == 401) {
            console.log('au')
            window.location.assign("unauthorized.html");
        }
    }
    http.send(json);
}