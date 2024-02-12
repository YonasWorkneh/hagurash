'use strict'
let activeUser;
activeUser = localStorage.getItem('activeUser');
const container = document.querySelector('.container');
const logOut = document.querySelector('.log__out');


const accounts = JSON.parse(localStorage.getItem('accounts'));
// console.log(accounts);
accounts.forEach((_,i) => {
  if (accounts[i].userName === activeUser) {
    if (accounts[i].bookmarks.length === 0) {
      const div = document.createElement('div');
      div.classList.add('no__saved');
      const p = document.createElement('p');
      div.appendChild(p);
      p.textContent = 'You have not saved any recipes recently.';
      const a = document.createElement('a');
      a.href = 'recipes.html';
      a.textContent = 'Search all Recipes';
      a.classList.add('searchh');
      div.appendChild(a);
      container.insertAdjacentElement('beforeend', div); 
    }
    else {
      const div = document.createElement('div');
      div.className = 'recipe__container';
      // console.log('true');
      // console.log(accounts[i].bookmarks);
      // const bookmarks = new Set(accounts[i].bookmarks);
      // console.log(bookmarks);
      accounts[i].bookmarks.forEach((bookmark) => {
        const html = `
        <div class="recipe">
          <img src="${bookmark.image_url}">
          <p>Hagurash</p>
          <a href="${bookmark.source_url}">${bookmark.title.split(' ').map(tit=>tit[0].toUpperCase().concat(tit.slice(1))).join(' ')}</a>
          <div class="icons">
          <div>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star"></i>
          </div>
          <i class="fa-solid fa-bookmark"></i>
          </div>
        </div>
        `
        div.insertAdjacentHTML('beforeend', html);
      });
      container.insertAdjacentElement('beforeend', div);
    }
  }
});
logOut.addEventListener('click', function () {
  localStorage.removeItem('activeUser');
  window.location.assign('index.html');
})
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('fa-bookmark')) {
    const key = e.target.closest('.recipe').querySelector('a').textContent;
    // console.log(key, 'then');
    // console.log(accounts, "before");
    accounts.forEach((acc, i) => {
      if (acc.userName === activeUser) {
        acc.bookmarks.forEach((bookmark,i) => {
          if (key.toLowerCase() === bookmark.title.toLowerCase()) {
            acc.bookmarks.splice(i, 1);
            localStorage.setItem('accounts', JSON.stringify(accounts));
          }
        })
        
      }
    })
    e.target.closest('.recipe').style.opacity = 0;
    setTimeout(function () {
      e.target.closest('.recipe').remove()
    }, 500);
  }

  
})

