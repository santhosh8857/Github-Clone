// default 

let defaultUser = 'santhosh8857';
let defaulturl = `https://api.github.com/users/${defaultUser}/repos`; 

fetch(defaulturl)
   .then(resp => resp.json())
   .then(repos => getRepos(repos,defaultUser))
   .catch(err => console.log(err));

// click event
document.querySelector('#btn').addEventListener('click', getData);

let reposWrapper = document.querySelector('#repos')//selection
let choose = document.querySelector('#choose');

let mainFileWrapper = document.querySelector('#main-file-wrapper'); //container for file
let fileWrapper = document.querySelector('#file-wrapper'); //ul

function getData(e) {
   // Clearing HTML wrapper    
   reposWrapper.innerHTML = '';
   choose.innerHTML = '';
   mainFileWrapper.innerHTML='';
   fileWrapper.innerHTML ='';
   
   //getting value for username    
   let userName = document.querySelector('#search').value;
   
   //API URL for getting repos 
   let urlRepos = `https://api.github.com/users/${userName}/repos`;
   
   //fetch
   fetch(urlRepos)
      .then((resp) => resp.json())
      .then((repos) => {
         if(repos.message === "Not Found") throw alert('Please Enter a valid UserName');
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
   selection.innerHTML = '<option selected> Kindly choose desired repository to view the files...</option>'

    data.forEach(function(repos){
      let options = document.createElement('option');
      options.setAttribute("value", repos.name);
      options.innerText = repos.name;
      
      selection.appendChild(options);
   });
 
   choose.appendChild(selection);
   reposWrapper.append(heading, choose);
   
   //Change event
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
      list.classList.add('list-group-item', 'text-grey','list-group-item-light', 'd-flex', 'justify-content-between', 'align-items-center');
      list.innerText = file.name;

      let link = document.createElement('a');
      link.classList.add('badge' ,'badge-primary');
      link.setAttribute('href', file.download_url);
      link.setAttribute('target', '_blank');
      link.innerText = 'Open';
      console.log(file.download_url);

      list.appendChild(link);
    
      fileWrapper.appendChild(list);
   })

   mainFileWrapper.appendChild(heading);
   mainFileWrapper.appendChild(fileWrapper);

}
