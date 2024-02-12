'use stirct'
const trending = document.querySelector('.trending__videos');
const btnLeft = document.querySelector('.fa-angle-left');
const btnRight = document.querySelector('.fa-angle-right');
const hide = document.querySelector('.hide');
const upNext = document.querySelector('.up__next');
const nextVideos = document.querySelectorAll('.next__video');
const hero = document.querySelector('.hero__vid');
const svg = document.querySelector('.icon-playlist');
const title = document.querySelector('.vid__title');
const navBar = document.querySelector('nav');
const navBtn = document.querySelector('.nav-toggler');
const navClose = document.querySelector('.menu-close');
const logOut = document.querySelector('.log__out');
let localVids = JSON.parse(localStorage.getItem('videos'));


let isFullScreen;
let activeUser;


activeUser = localStorage.getItem('activeUser');

//navigation

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

if (activeUser) {
  const button = `<span class="log__out">Log Out</span>`;
  document.querySelector('.log__out').classList.remove('hidden');
  document.querySelector('.fa-heart').style.color = '#ffbd59';
  document.querySelector('.tool-tip').textContent = 'Saved Recipes';
}

document.querySelector('.fa-heart').addEventListener('click', function (e) {
  if (!activeUser)
    e.preventDefault();
})

btnRight.addEventListener('click', function () {
  const prevTrans = trending.dataset.translate;
  let newTrans = +prevTrans - 428;
  newTrans = newTrans >= -428 * (localVids.length / 2 + 1) ? newTrans : 0;
  trending.dataset.translate = newTrans;
  trending.style.transform = `translateX(${newTrans}px)`;
  
})
btnLeft.addEventListener('click', function () {
  const prevTrans = trending.dataset.translate; 
  let newTrans = +prevTrans + 428;
  newTrans = newTrans <= 0 ? newTrans : -428 * (localVids.length / 2 + 1);
  trending.dataset.translate = newTrans;
  trending.style.transform = `translateX(${newTrans}px)`;
})
hide.addEventListener('click', function () {
  document.querySelector('.up__next').classList.add('hidden');
  document.querySelector('.line').classList.add('hidden');
  document.querySelector('.hero').querySelector('iframe').style.background = '#000';
  document.querySelector('.hero').querySelector('iframe').style.width = '100%';
  isFullScreen = true;
});

hero.querySelector('iframe').addEventListener('mouseover', function () {
  if (isFullScreen){
    console.log(true);
    svg.classList.remove('hidden');
  }
  else
    svg.classList.add('hidden');
});
hero.addEventListener('mouseleave', function () {
  svg.classList.add('hidden');
})

svg.addEventListener('click', function(){
  document.querySelector('.up__next').classList.remove('hidden');
  document.querySelector('.line').classList.remove('hidden');
  document.querySelector('.hero').querySelector('iframe').style.background = '';
  document.querySelector('.hero').querySelector('iframe').style.width = '700px';
  isFullScreen = false;
})

//playing up next videos 


//Playing one of the popular videos 
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('fa-play') || e.target.classList.contains('titlee')) {
    // console.log(e.target.closest('.trending__vid'));
    const trend = e.target.closest('.trending__vid');
    hero.querySelector('iframe').src = trend.dataset.src;
    title.textContent = trend.querySelector('.titlee').textContent;
    document.querySelector('h1').scrollIntoView({ behavior: 'smooth' });
  }
  else if (e.target.classList.contains('next__video') || e.target.classList.contains('vidd') || e.target.classList.contains('title')) {
    console.log(true);
    const vid = e.target.closest('.next__video');
    console.log(vid);
    const html = `
  <div class="next__video" data-src="${hero.querySelector('iframe').src}">
    <img class="vidd" src="${hero.querySelector('iframe').dataset.src}" alt="kitfo">
    <p class="title">${title.textContent}</p>
  </div>
  `
  hero.querySelector('iframe').src = vid.dataset.src;
  hero.querySelector('iframe').dataset.src = vid.querySelector('img').src;
  title.textContent = e.currentTarget.querySelector('.title').textContent;
  document.querySelector('.vid__wrap').insertAdjacentHTML('beforeend', html);
  vid.remove();
  }
})

logOut.addEventListener('click', function () {
  localStorage.removeItem('activeUser');
  logOut.classList.add('hidden');
  document.querySelector('.fa-heart').style.color = '#fff';
})

// videos from Dashboard


// console.log(localVids);

localVids.forEach(vid => {
  const html =`
    <div class="trending__vid" data-src="${vid.dataSrc}">
      <div class="trend__img">
        <img src="${vid.imgUrl}" alt="fritata">
        <i class="fa-solid fa-play"></i>
      </div>
      <p class="titlee">${vid.title}</p>
    </div>`
  trending.insertAdjacentHTML('beforeend', html);
})
