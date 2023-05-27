function revealPasswordButtonRegisterPage() {
	// const togglePassword = document.getElementsByName('togglePassword');
	const togglePassword = document.getElementById('togglePassword');

	const password = document.getElementById('password');
	const retypePassword = document.getElementById('retypePassword');
	
	const type_pw = password.getAttribute('type') === 'password' ? 'text' : 'password';
	password.setAttribute('type', type_pw);

	const type_rpw = retypePassword.getAttribute('type') === 'password' ? 'text' : 'password';
	retypePassword.setAttribute('type', type_rpw);
	
	// toggle the eye / eye slash icon
	togglePassword.classList.toggle('bi-eye');

}

function revealPasswordButtonLoginPage() {
	const togglePassword = document.getElementsByName('togglePassword');
	const password = document.getElementById('password');
	
	const type_pw = password.getAttribute('type') === 'password' ? 'text' : 'password';
	password.setAttribute('type', type_pw);

	// toggle the eye / eye slash icon
	togglePassword.forEach(element => {
		element.classList.toggle('bi-eye');
	});

}