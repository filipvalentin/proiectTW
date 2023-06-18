// const id_user //= '648c244fa584d';

// getUserData(id_user);

function deleteImage(id) {
	var httpDeleteImg = new XMLHttpRequest();
	// console.log(id);
	httpDeleteImg.open("POST", "deleteImage.php", true);
	httpDeleteImg.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	const json = JSON.stringify({ idUser: id });
	// console.log(json);
	httpDeleteImg.onreadystatechange = function () {
		if (httpDeleteImg.readyState == 4 && httpDeleteImg.status == 200) {
			window.location.assign("admin-users.html");
		}
	}
	httpDeleteImg.send(json);
}

function getUserData(id) {

	var httpGetUserData = new XMLHttpRequest();
	httpGetUserData.open("GET", 'getInfoAdmin.php?id=' + id, true);
	httpGetUserData.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	httpGetUserData.onreadystatechange = function () {
		//Call a function when the state changes.
		if (httpGetUserData.readyState == 4 && httpGetUserData.status == 200) {
			var information = JSON.parse(httpGetUserData.responseText);
			// console.log(information);

			var headerUsername = document.getElementById('user-username');
			headerUsername.innerHTML = information.username;

			var headerUsername = document.getElementById('user-user-id');
			headerUsername.innerHTML = information.user_id;

			var usernameInput = document.getElementById('usernameInput');
			usernameInput.setAttribute('value', information.username);

			var aboutMeInput = document.getElementById('about-me');
			aboutMeInput.textContent = information.about_me;

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
			xhr.open('GET', 'get_image_unauthorized.php?id=' + id, true);

			xhr.onload = function () {
				if (xhr.status == 200 && xhr.readyState == 4) {
					// console.log(xhr.responseText);
					if (xhr.responseText != '') {
						// console.log('ay');
						var imgElement = document.getElementById('user-img');
						imgElement.src = xhr.responseText;
					} else {
						var imgElement = document.getElementById('user-img');
						imgElement.src = "../resources/Sample_User_Icon.jpg";
					}
				}
			};

			xhr.send();
		}
		if (httpGetUserData.readyState == 4 && httpGetUserData.status == 401) {
			window.location.assign("unauthorized.html");
		}
	}
	httpGetUserData.send();
}


function update(id) {
	const usernameInput = document.getElementById('usernameInput').value;
	const aboutMeInput = document.getElementById('about-me').value;
	const emailInput = document.getElementById('currentEmail').value;
	const nameInput = document.getElementById('name-user').value;
	const highSchoolInput = document.getElementById('high-school').value;
	const genderInput = document.getElementById('gender').value;
	const roleInput = document.getElementById('role').value;

	var httpUpdateUserData = new XMLHttpRequest();
	httpUpdateUserData.open("POST", 'changeAdmin.php', true);
	httpUpdateUserData.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	httpUpdateUserData.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
	const data = {
		idUser: id,
		username: usernameInput,
		entire_name: nameInput,
		highschool: highSchoolInput,
		gender: genderInput,
		aboutMe: aboutMeInput,
		role: roleInput,
		email: emailInput
	};
	const json = JSON.stringify(data);
	console.log(json);
	httpUpdateUserData.onreadystatechange = function () {
		//Call a function when the state changes.
		if (httpUpdateUserData.readyState == 4 && httpUpdateUserData.status == 200) {
			window.location.assign("admin-users.html");
		}
	}
	httpUpdateUserData.send(json);
}



function deleteAccount(){
	var httpDeleteUserAccount = new XMLHttpRequest();
	httpDeleteUserAccount.open("POST", 'changeAdmin.php', true);
	httpDeleteUserAccount.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	httpDeleteUserAccount.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
	httpDeleteUserAccount.onreadystatechange = function () {
		//Call a function when the state changes.
		if (httpDeleteUserAccount.readyState == 4 && httpDeleteUserAccount.status == 200) {
			window.location.assign("admin-users.html");
		}
	}
	httpDeleteUserAccount.send(json);
}


function correctInput() {
	itemsOnPageElem.value = itemsOnPageElem.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
}