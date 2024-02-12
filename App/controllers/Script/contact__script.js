'use strict'
const navBar = document.querySelector('nav');
const navBtn = document.querySelector('.nav-toggler');
const navClose = document.querySelector('.menu-close');
const heart = document.querySelector('.save');
const toolTip = document.querySelector('.tool-tip');
const logOut = document.querySelector('.log__out');

let activeUser = localStorage.getItem('activeUser');

if (activeUser) {
  document.querySelector('.log__out').classList.remove('hidden');
  document.querySelector('.fa-heart').style.color = '#ffbd59';
  toolTip.textContent = 'Saved Recipes';
}

navBtn.addEventListener('click', function () {
  navClose.classList.remove('hidden');
  navBar.classList.add('updated__nav');
  navBar.querySelector('.logo').classList.remove('hidden');
  navBar.querySelector('div').classList.remove('hidden');
  navBar.querySelector('ul').classList.remove('nav');

})

navClose.addEventListener('click', function () {
  navClose.classList.add('hidden');
  navBar.classList.remove('updated__nav');
  navBar.querySelector('.logo').classList.add('hidden');
  navBar.querySelector('div').classList.add('hidden');
  navBar.querySelector('ul').classList.add('nav');
});

heart.querySelector('a').addEventListener('click', function (e) {
  if (!acitiveUser)
    e.preventDefault();
})

logOut.addEventListener('click', function () {
  localStorage.removeItem('activeUser');
  logOut.classList.add('hidden');
  document.querySelector('.fa-heart').style.color = '#fff';
});

// comments sent to dashboard

document.addEventListener('submit', function (e) {
  if (e.target.classList.contains('comment__form')) {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const subject = document.querySelector('#subject').value;
    const comment = document.querySelector('#comment').value;
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    console.log(comments);
    comments.push({ uname: name, uemail: email, usubject: subject, ucomment: comment });
    localStorage.setItem('comments', JSON.stringify(comments));
    alert('Your response has been recorded.');
    document.querySelector('#name').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#subject').value = '';
    document.querySelector('#comment').value = '';
  }
})

