

function changeInfoClass() {
    document.getElementById('empty-name').style.display = "none";
    document.getElementById('empty-description').style.display = "none";
    console.log('hello');
    var newName = document.getElementById('new-name').value;
    var newDescription = document.getElementById('new-description').value;
    console.log(newName);
    console.log(newDescription);

    if (newName == '') {
        document.getElementById('empty-name').style.display = "block";
    }
    if (newDescription == '') {
        document.getElementById('empty-description').style.display = "block";
    }
    if (newName != '' && newDescription != '') {
        var http = new XMLHttpRequest();
        http.open("POST", 'changeInfoClass.php', true);
        http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        const data = { 
            id: id,
            name : newName,
            description: newDescription
        };
        const json = JSON.stringify(data);
        http.onreadystatechange = function () {
            //Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                window.location.assign('class-admin-settings.html?id='+id);
            }
        }
        http.send(json);
    }
}