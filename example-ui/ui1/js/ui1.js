'use strict';
const url = 'https://bcwt-server-emil.northeurope.cloudapp.azure.com/app'; // change url when uploading to server
const imgPath = url + '/uploads/';
const ul = document.querySelector('ul');

const getCat = async () => {
  const response = await fetch(url + '/cat');
  const cats = await response.json();
  for (const cat of cats) {
    const user = await getUser(cat.owner);
    ul.innerHTML += `
    <li>
        <h2>${cat.name}</h2>
        <figure>
            <img src="${imgPath + cat.filename}" class="resp">
        </figure>
        <p>Birthdate: ${cat.birthdate}</p>
        <p>Weight: ${cat.weight}kg</p>
        <p>Owner: ${user.name}</p>
    </li>
    `;
  }
};

const getUser = async (id) => {
  const response = await fetch(url + '/user/' + id);
  const user = await response.json();
  return user;
};

getCat();
