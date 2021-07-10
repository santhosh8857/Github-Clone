document.querySelector('#btn').addEventListener('click', getData);

let reposWrapper = document.querySelector('#repos')
let reposList = document.querySelector('#reposList');


function getData(e) {
   let userName = document.querySelector('#search').value;

   let urlRepos = `https://api.github.com/users/${userName}/repos`;

   fetch(urlRepos)
      .then((resp) => resp.json())
      .then((repos) => {
         console.log(repos);
         getRepos(repos,userName);
      })
      .catch((err) => console.log(err));
   
   e.preventDefault();
}

function getRepos(data, user) {

   let heading = document.createElement('h3');
   heading.innerText = `"${user}" has ${data.length} repositories`;
   heading.classList.add('ml-2')

   data.forEach(function(repos){
      let list = document.createElement('li');
      list.classList.add('list-group-item');
      list.innerText = repos.name;

      reposList.appendChild(list);
   })

   reposWrapper.append(heading,reposList);

}

// function getGithub(data) {
//       let row = document.createElement('tr');

//       let name = data.name;
//       let respos = data.public_repos;

//       if(name === null) name = data.login;

//       row.innerHTML = `
//          <td>${name}</td>
//          <td>${respos}</td>
//       `
//       document.querySelector('tbody').appendChild(row);
// }



