const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

generatePage(id);


function generatePage(id) {
    var http = new XMLHttpRequest();
    http.open("GET", '../php/getInformationProblem.php?id=' + id, true);
    http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    http.onreadystatechange = function () {
        //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            var information = JSON.parse(http.responseText);
            // console.log(information);

            var title = document.getElementById('title-prb');
            title.innerHTML = information.title_problem;

            var status = document.getElementById('status');
            status.innerHTML = information.status;

            var teacher = document.getElementById('teacher');
            teacher.innerHTML = information.teacher;

            var date = document.getElementById('date');
            date.innerHTML = information.post_date;

            var difficulty = document.getElementById('diff');
            difficulty.innerHTML = information.difficulty;

            const tags = information.tags.split(', ');

            var tagsElem = document.getElementById('tags');
            for (const tag in tags) {
                // console.log(tags[tag]);
                var tagElem = document.createElement('li');
                var tagProp = document.createElement('p');
                tagProp.innerHTML = tags[tag];
                tagProp.classList.add('tags-2');
                tagElem.appendChild(tagProp);
                tagsElem.appendChild(tagElem);
            }

            var description = document.getElementById('description');
            description.innerHTML = information.description;

        }
        if (http.readyState == 4 && http.status == 401) {
            // console.log('au')
            window.location.assign("unauthorized.html");
        }
    }
    http.send();
}


function problem(param) {
    var http = new XMLHttpRequest();
    http.open("POST", '../php/changeStatusProblem.php', true);
    http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    const data = {
        id: id,
        status: param
    };
    const json = JSON.stringify(data);
    http.onreadystatechange = function () {
        //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            window.location.assign('admin-problems.html');
        }
    }
    http.send(json);
}