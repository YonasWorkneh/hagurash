'use strict'

//Selecting all the dom elements we are going to manipulate
const headerTop = document.querySelector('.header-top');
const searchBtns = document.querySelectorAll('.search');
const navBtn = document.querySelector('.nav-toggler');
const navClose = document.querySelector('.menu-close');
const navBar = document.querySelector('nav');
const previous = document.querySelector('.prev-btn');
const next = document.querySelector('.next-btn');
const testimonialContainer = document.querySelector('.testimonial-wrapper');
const testimonies = document.querySelectorAll('.testimonial-content');
const heart = document.querySelector('.save');
const log = document.querySelector('.log-in');
const toolTip = document.querySelector('.tool-tip');
const sliderTrack = document.querySelector('.recipe-slider-track');
const body = document.querySelector('body');

//necessary global vars 
let accounts;
let activeUser = localStorage.getItem('activeUser');


//loader display

const loader = `<div class="loader"><img src="../../Resources/Images/Logo.png"/></div>`;
body.insertAdjacentHTML("afterbegin", loader);
setTimeout(() => {
  const loader = document.querySelector('.loader');
  body.removeChild(loader);
}, 3000);


//sticky navigation bar 

window.addEventListener('scroll', function () {
  headerTop.classList.toggle('sticky', window.scrollY > 0);
})

//searchForm display and attaching it to the button and the icon

searchBtns.forEach(btn => {
  btn.addEventListener('click', function (e) {
    const html = `
        <div class="overlay"></div>
        <form action="recipes.html" method="post" class="search__form">
          <fieldset >
            <button class="searchh" type="submit" value="Submit"><i class="fa-solid fa-magnifying-glass"></i></button>
            <input type="text" name="search-Result" placeholder="Find a Recipe" id="search-input" autofocus maxlength="30"/>
            <button class="closeField" type="reset" value="Clear">&times;</button>
          </fieldset>
        </form>`;
    body.insertAdjacentHTML('beforeend', html);
  })
  
})

//menu icon-navigation toggling 

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


//Testimonial Slider

const imgWidth = Number.parseInt(getComputedStyle(document.querySelector('.testimonial-content')).width);
next.addEventListener('click', function () {
  // console.log('yes');
  // console.log(testimonialContainer);
  const curr = testimonialContainer.style.transform;
  const trans = curr.slice(curr.indexOf('(')+1,curr.indexOf(')')-2);
  console.log(imgWidth);
  const index = Number(trans) - imgWidth;
  //console.log(index);
  if (Math.abs(index) < (testimonies.length-2)*imgWidth) {
    testimonialContainer.style.transform = `translateX(${index}px)`;  
  }
  else
    testimonialContainer.style.transform = 'translateX(0)';
})
previous.addEventListener('click', function () {
  console.log(testimonialContainer);
  const curr = testimonialContainer.style.transform;
  const trans = curr.slice(curr.indexOf('(') + 1, curr.indexOf(')') - 2);
  const index = Number(trans) + imgWidth;
  if (index <= 0) {
    testimonialContainer.style.transform = `translateX(${index}px)`;//it works because the style is inline not from a css
  }
});


  
//section observer for applying our animation as they scroll into the viewport

const sections = document.querySelectorAll('.reveal');
const revealSection = function (entries, observer) {
  // console.log(entries);
  const [entry] = entries;
  if (entry.isIntersecting)
  entry.target.classList.add('animation');
}
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});
sections.forEach(function (section) {
  section.classList.add('section-hidden');
  sectionObserver.observe(section);
});


sliderTrack.addEventListener('mouseover', function () {
  sliderTrack.style.animationPlayState = 'paused';
})
sliderTrack.addEventListener('mouseleave', function () {
  sliderTrack.style.animationPlayState = 'running';
})

//Login__LogOut

//we'll remove this upon completion
const clearr = function () {
  localStorage.removeItem('emails');
  localStorage.removeItem('users');
  localStorage.removeItem('accounts');
  localStorage.removeItem('activeUser');
  localStorage.removeItem('bookmarks');
}
// clearr();

//if there is already a logged in user
if (activeUser) {
  heart.querySelector('i').classList.add('logged');
  const button = `<span class="log__out">Log Out</span>`;
  toolTip.textContent = 'Saved Recipes';
  log.innerHTML = button;
}

//listening to multiple events using a single listner because the events don't exist when the html is parsed and some of them are added on multiple elements so intead of iterating over the elements to add the event we harnessed the power of event bubbling and capturing 

document.addEventListener('click', function (e) {

  //this is a lot of dynamically added elements so bear the confusion

  //search__form close btn
  if (e.target.classList.contains('closeField')) {
    e.target.closest('.search__form').remove();
    body.querySelector('.overlay').remove();
  }
  else if (e.target.classList.contains('fa-user') || e.target.classList.contains('sign-inn')) {
    e.preventDefault();
    const html = `
  <div class="wrapper">
  <div class="inner__wrap">
  <div class="wrap__close">
    <form class="sign-upp">
      <fieldset>
        <div class="line"></div>
        <img src="../../Resources/Images/Logo.png" alt="Hagurash logo.png">
        <h1>Sign Up</h1>
        <input type="text" name="" autofocus id="userName"placeholder="Name" maxlength="30"required>
        <input type="email" name="" id="userEmail"placeholder="Email"required>
        <input type="password" name="" id="pass" minlength="8" maxlength="12"placeholder="Password"required>
        <input type="submit" value="Sign-Up">
        <p>Already have an account? <span class="sign-in-btn">Sign in</span></p>
      </fieldset>
    </form>
    <form action="" class="sign-in hidden">
      <fieldset>
        <div class="line"></div>
        <img src="../../Resources/Images/Logo.png" alt="Hagurash logo.png">
        <h1>Sign In</h1>
        <input type="email" autofocus name="" id="email"placeholder="Email" required>
        <input type="password" name="" id="pin" minlength="8" maxlength="12"placeholder="Password"required>
        <input type="submit" value="Sign-In">
        <p>Don't have an account? <span class="sign-up-btn">Sign Up</span></p>
      </fieldset>
      </form>
      <span class="form__close">&times;</span>
  </div>
  </div>
  </div>`;
    body.insertAdjacentHTML('beforeend', html);
  }
  else if (e.target.classList.contains('sign-in-btn')) {
    e.target.closest('.sign-upp').classList.add('hidden');
    e.target.closest('.sign-upp').querySelector('#pass').value = '';
    e.target.closest('.sign-upp').querySelector('#userEmail').value = '';
    e.target.closest('.sign-upp').querySelector('#userName').value = '';
    e.target.closest('.sign-upp').querySelector('.err__mess')?.remove();
    e.target.closest('.inner__wrap').querySelector('.sign-in').classList.remove('hidden');//the same is true here we can't directly use query selector on the element
  }
  else if (e.target.classList.contains('sign-up-btn')) {
    e.target.closest('.sign-in').classList.add('hidden');
    e.target.closest('.sign-in').querySelector('#pin').value = '';
    e.target.closest('.sign-in').querySelector('#email').value = '';
    e.target.closest('.sign-in').querySelector('.err__mess')?.remove();
    e.target.closest('.inner__wrap').querySelector('.sign-upp').classList.remove('hidden');
  }
  else if (e.target.classList.contains('continue')) {
    const innerWrap = e.target.closest('.wrap__close');
    innerWrap.removeChild(e.target.closest('.log__message'));
    innerWrap.querySelector('.sign-in').classList.remove('hidden');
  }
  else if (e.target.classList.contains('err__close')) {
    e.target.closest('.err__mess').remove();
  }
  else if (e.target.classList.contains('log__out')) {
    heart.querySelector('i').classList.remove('logged');
    const button = `<i class="fa-solid fa-user"></i>`;
    toolTip.textContent = 'Sign in to see saved recipes';
    log.innerHTML = button;
    activeUser = null;
    localStorage.removeItem('activeUser');
  }
  else if (e.target.classList.contains('form__close')) {
    e.target.closest('.wrapper').remove();
  }
  //passing the popular recipes link to recipe.html page 
  else if (e.target.classList.contains('popular')) {
    e.preventDefault();
    const searchResult = e.target.closest('.recipe').querySelector('span').textContent;
    localStorage.setItem('searchResult', searchResult);
    window.location.href = "recipes.html";
    
  }
});

//when sign up or sign in occurs i.e the form is submitted we want to prevent the default which is going to the action attribute 
document.addEventListener('submit', function (e) {
  e.preventDefault();
  // console.log(e.target);

  ////passing the search-result to recipe.html page

  if (e.target.classList.contains('search__form')) {
    const searchResult = document.getElementById('search-input');
    localStorage.setItem('searchResult', searchResult.value);
    window.location.href = "recipes.html";
    searchResult.value = '';
  }

  //signing up

  else if (e.target.classList.contains('sign-upp')) {
    accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const pass = e.target.querySelector('#pass').value;
    const email = e.target.querySelector('#userEmail').value;
    const user = e.target.querySelector('#userName').value;
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }
    const locale = navigator.language;
    // console.log(locale);
    const date = new Intl.DateTimeFormat(locale, options).format(new Date());
    console.log(date);
    if (!accounts.some(acc => acc.userName === user && acc.email === email)) {
      accounts.push({
        userName: user,
        email: email,
        password:pass,
        regDate:date,
        bookmarks:[]
      });
      localStorage.setItem('accounts', JSON.stringify(accounts));
      const innerWrap = e.target.closest('.wrap__close');
      innerWrap.insertAdjacentHTML('afterbegin',loader);
      setTimeout(function () {
        innerWrap.removeChild(innerWrap.querySelector('.loader'));
        const html = `
        <div class="log__message">
        <div class="check"><i class="fa-solid fa-check"></i></div>
        <p class="sign__mess">Sign-Up Successful!</p>
        <p>Welcome to <span class="highlight">Hagurash</span> please press the continue <br>button below to sign-in</p>
        <button class="continue">Continue</button>
        </div>`;
        innerWrap.removeChild(e.target);
        innerWrap.insertAdjacentHTML('beforeend', html);
      }, 2000);  
    }
    else{
      if (!e.target.querySelector('.err__close')) {
        const p = document.createElement('p');
        p.classList.add('err__mess');
        p.insertAdjacentHTML('beforeend', `<span class="err__close">&times;</span><span>User already exists!</span>`);
        e.target.querySelector('#pass').after(p);   
      }
    }
  }
  //signing-in
  else if (e.target.classList.contains('sign-in')) {
    localStorage.removeItem('bookmarks');//because the new user shouldn't have access to the bookmarks of the previous user
    let isCorrect;
    // console.log(true);
    accounts = JSON.parse(localStorage.getItem('accounts'));
    // console.log(accounts);
    const email = e.target.querySelector('#email').value;
    const pass = e.target.querySelector('#pin').value;
    
    if (email === "adminHagu@gmail.com" && pass === "@dminHagu") {
      window.open("dash.html", "_blank");
      e.target.closest('.wrapper').remove();
      isCorrect = true;
    }
    
    //I used the optional chaining operator because if you try to log in without signing up it throws an error since the accounts is not set in the local storage it's empty so by adding the optional operator we made it iterate even though it's not iterable 
    accounts?.forEach((_,i) => {
      if (accounts[i].password === pass && accounts[i].email === email) {
        // console.log('trueeee');
        activeUser = accounts[i].userName;
        localStorage.setItem('activeUser', activeUser);
        document.querySelector('body').removeChild(e.target.closest('.wrapper'));
        heart.querySelector('i').classList.add('logged');
        const button = `<span class="log__out">Log Out</span>`;
        toolTip.textContent = 'Saved Recipes';
        log.innerHTML = button;
        isCorrect = true;//I used this guard because if i just put else for the if it would create so many error messages for every mismatch so if u have 5 users and the email...u get the idea
      }
    })
    if (!isCorrect && !e.target.querySelector('.err__close')) {//and e.target milew guard demo is to avoid displaying the same error message when ever the user tries to log in without changing the inputs.
      const p = document.createElement('p');
      p.classList.add('err__mess');
      p.insertAdjacentHTML('beforeend', `<span class="err__close">&times;</span><span>Incorrect email or password!</span>`);
      e.target.querySelector('#pin').after(p);  
    }
  }
});
//when hovering over the heart icon user should see the tool-tip / and tooltip should be gone when the hover stops;
heart.firstChild.firstChild.addEventListener('mouseover', function () {
  // console.log(true);
  toolTip.style.visibility = 'visible';
})
heart.firstChild.firstChild.addEventListener('mouseleave', function () {
  // console.log(false);
  toolTip.style.visibility = 'hidden';
})

//user can't access the saved.html file without logging in 
heart.firstChild.addEventListener('click', function (e) {
  if (!activeUser)
    e.preventDefault();
});

// dash__board
let recipes = JSON.parse(localStorage.getItem("recipes"));
let reviews = JSON.parse(localStorage.getItem('reviews')); 
recipes?.forEach(recipe => {
  const html = ` 
  <div class="recipe">
    <img src="${recipe.imgUrl}" alt="${recipe.title}">
    <span>${recipe.title}</span>
    <a href="#" class="popular">Get Recipe</a>
  </div>`;
  sliderTrack.insertAdjacentHTML('beforeend', html);
})
//since the number of recipes is dynamical our keyframe hast to be dynamic as well
const style = document.createElement('style');
const keframe = `@keyframes slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-250px * ${recipes.length - 3}));
  }
} `;
style.innerHTML = keframe;
document.querySelector('head').insertAdjacentElement('beforeend', style);




