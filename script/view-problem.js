const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('problem');

// console.log('hep');

generatePage(id);


function generatePage(id) {

    var http = new XMLHttpRequest();
    http.open("GET", 'getInformationProblem.php?id=' + id, true);
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

            var date = document.getElementById('date');
            date.innerHTML = information.post_date;

            var check = document.getElementById('check');
            check.innerHTML = information.update_data;


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


function exportProblem() {
    var http = new XMLHttpRequest();
    http.open("GET", 'getInformationProblem.php?id=' + id, true);
    http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    http.onreadystatechange = function () {
        //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            var information = JSON.parse(http.responseText);
            // console.log(information);
            const jsonNew = {
                title : information.title_problem,
                difficulty : information.difficulty,
                tags : information.tags,
                status : information.status,
                description : information.description
            };
            const problem = JSON.stringify(jsonNew);
            var blob = new Blob([problem], { type: "application/json" });
            var url = URL.createObjectURL(blob);
            var link = document.createElement("a");
            link.href = url;
            link.download = "problem.json";
            link.click();
            URL.revokeObjectURL(url);
            link.remove(); 
        }
        if (http.readyState == 4 && http.status == 401) {
            // console.log('au')
            window.location.assign("unauthorized.html");
        }
    }
    http.send();
}


function deleteProblem() {
    // console.log(id);
    var http = new XMLHttpRequest();
    http.open("POST", 'deleteProblem.php', true);
    http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    const data = {
        idProblem: id
    };
    const json = JSON.stringify(data);
    // console.log(json);
    http.onreadystatechange = function () {
        //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            window.location.assign('my-problems.html');
        }
    }
    http.send(json);
}