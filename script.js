document.querySelector('#btn').addEventListener('click', getData);

let reposWrapper = document.querySelector('#repos')//selection
let choose = document.querySelector('#choose');

let mainFileWrapper = document.querySelector('#main-file-wrapper'); //container for file
let fileWrapper = document.querySelector('#file-wrapper'); //ul

function getData(e) {

   reposWrapper.innerHTML = '';
   choose.innerHTML = '';
   
   let userName = document.querySelector('#search').value;

   let urlRepos = `https://api.github.com/users/${userName}/repos`;

   fetch(urlRepos)
      .then((resp) => resp.json())
      .then((repos) => {
         if(repos.message === "Not Found") throw alert('Please Enter a valid UserName');
         console.log(repos);
         getRepos(repos,userName);
      })
      .catch((err) => console.log(err));
   
   e.preventDefault();
}

function getRepos(data, user) {

   let heading = document.createElement('h3');
   heading.innerText = `"${user}" has ${data.length} repositories`;
   heading.classList.add('ml-2', 'text-center', 'text-light','mb-4');

   let selection = document.createElement('select');
   selection.classList.add('custom-select');
   selection.innerHTML = '<option selected> Kindly Choose desired Repository to view the files...</option>'

    data.forEach(function(repos){
      let options = document.createElement('option');
      options.setAttribute("value", repos.name);
      options.innerText = repos.name;
      
      selection.appendChild(options);
   });
 
   choose.appendChild(selection);
   reposWrapper.append(heading, choose);

   selection.addEventListener('change', (e) => {
      mainFileWrapper.innerHTML='';
      fileWrapper.innerHTML ='';
      let repoName = e.target.value;
      let contentUrl = `https://api.github.com/repos/${user}/${repoName}/contents/`;
      
      fetch(contentUrl)
         .then(resp => resp.json())
         .then(content => getFiles(content, repoName))
         .catch(err => console.log(err));
   });

}

function getFiles(fileList, repository) {
   console.log(fileList);

   let heading = document.createElement('h4');
   heading.innerText = `"${repository}" repository contains ${fileList.length} files`;
   heading.classList.add('text-center', 'text-light','mb-4');

   fileList.forEach(function(file){
      let list = document.createElement('li');
      list.classList.add('list-group-item', 'text-grey','list-width','list-group-item-light');
      list.innerText = file.name;

      fileWrapper.appendChild(list);
   })

   mainFileWrapper.appendChild(heading);
   mainFileWrapper.appendChild(fileWrapper);

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

  // data.forEach(function(repos){
   //    let list = document.createElement('li');
   //    list.classList.add('list-group-item', 'text-grey');
   //    list.innerText = repos.name;

   //    reposList.appendChild(list);
   // })

