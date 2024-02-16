"use strict";
const lists = document.querySelectorAll("li");
const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
const origBookLength =
  +document.querySelector(".grow__1").firstChild.textContent;
const dashDetails = document.querySelectorAll(".detail");
const recipesDetail = document.querySelector(".recipes__wrap");
const videosDetail = document.querySelector(".videos__wrap");

let elDel;
let isSet;
let admin = JSON.parse(localStorage.getItem("admin"));

lists.forEach((list) => {
  list.addEventListener("click", function (e) {
    if (!list.classList.contains("dark")) {
      lists.forEach((list) => list.classList.remove("active"));
      list.classList.add("active");
      dashDetails.forEach((detail) => detail.classList.add("hidden"));
      // console.log(e.target.dataset.class);
      document
        .querySelector(`.${e.target.dataset.class}`)
        .classList.remove("hidden");
    }
  });
});
for (let i = 0; i <= 100_000; i++){
  setTimeout(function () {
    document.querySelector('.total__recipes__num').textContent = `+${Intl.NumberFormat('en-us').format(i)}`;
  },0.2);
}
// console.log(document.querySelector('total__recipes__num').textContent)
//dark mode toggling 
document.querySelector('.toggle-switch-background').addEventListener('click', function (e) {
  const state = e.target.closest('.dark');
  if (state.dataset.view === "light") {
    console.log(state);
    console.log(true);
    document.querySelector('body').style.background = '#000';
    document.querySelectorAll('.video').forEach(vid => vid.querySelector('.title').style.color = "#fff");
    lists.forEach(list => list.style.color = "#fff");
    document.querySelector(".admin_name").style.color = "#fff";
    document.querySelector(".admin_email").style.color = '#fff';
    state.closest('body').querySelectorAll('legend').forEach(legend=>legend.style.color = '#fff');
    state.dataset.view = 'dark';
  }
  else{
    console.log(false);
    document.querySelector('body').style.background = '#fff';
    lists.forEach(list => list.style.color = '#222');
    state.closest('body').querySelectorAll('legend').forEach(legend => legend.style.color = '#000');
    document.querySelector(".admin_name").style.color = "#000";
    document.querySelector(".admin_email").style.color = '#000';
    state.dataset.view = "light";
  }
})

//set up the admin;
// localStorage.clear();
if (!admin)
  localStorage.setItem(
    "admin",
    JSON.stringify({
      adminName: "Admin",
      adminImg: "../../Resources/Images/admin.png",
      adminEmail: "adminHagu@gmail.com",
      adminPass: "@adminHagu",
    })
  );

admin = JSON.parse(localStorage.getItem("admin"));
// console.log(admin);
document.querySelector(".admin_name").textContent = admin.adminName;
document.querySelector(".admin_img").src = admin.adminImg;
document.querySelector(".admin_email").textContent = admin.adminEmail;

//just to make it a little larger than it actually is we multiplied the actual numbers with 1000
//but with the real case we wouldn't do this we would just put the number

const bookmarks =
  accounts?.reduce((acc, account) => acc + account.bookmarks.length, 0) *
    1000 || 0;
const cust = accounts?.length * 1000 || 0;
// console.log(bookmarks);

// console.log(Intl.NumberFormat('en-us').format(bookmarks));
document.querySelector(".bookmark__total").textContent =
  Intl.NumberFormat("en-us").format(bookmarks);
document.querySelector(".cust__num").textContent =
  Intl.NumberFormat("en-us").format(cust) || 0;
document.querySelector(".grow__4").firstChild.textContent =
  Intl.NumberFormat("en-us").format(bookmarks);
// console.log(bookmarks);
// console.log(origBookLength);
// console.log(((bookmarks-origBookLength) / origBookLength)*100);
const bookmarkPercentage = Math.trunc(
  ((bookmarks - origBookLength) / origBookLength) * 100
);
// console.log(bookmarkPercentage);
document.querySelector(".perc__growth").textContent = `${
  bookmarkPercentage > 0 ? "+" : ""
}${bookmarkPercentage}%`;

let videos = JSON.parse(localStorage.getItem("videos")) || [
  {
    dataSrc: "https://www.youtube.com/embed/SMPfiD6hOlQ",
    imgUrl: "../../Resources/Images/fritata.jpg",
    title: "4 Levels of Fritata",
  },
  {
    dataSrc: "https://www.youtube.com/embed/vYcUd-CVVCI",
    imgUrl: "../../Resources/Images/yoh__placeholder.png",
    title: "Ethiopian Dish fusioned with Paella Dish",
  },
  {
    dataSrc:
      "https://www.youtube.com/embed/HdDwqG3OqY4?list=PLz3-p2q6vFYWi_e0AWEkj2h22l0u1bqER",
    imgUrl: "../../Resources/Images/pro__home.jpg",
    title: "Pro Chef & Home Cook swap Ingredients",
  },
  {
    dataSrc: "https://www.youtube.com/embed/ZPQMbbsjXiQ",
    imgUrl: "../../Resources/Images/velvetta.jpg",
    title: "Making Grilled Cheese",
  },
  {
    dataSrc: "https://www.youtube.com/embed/ulhRORJpuBM",
    imgUrl:
      "https://cdn.vox-cdn.com/thumbor/Nxd9oSE88ETg9XE19olHgbkdv9k=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23426697/259699079_194400052885244_4812031660576318305_n.jpg",
    title: "Gordon Makes an all American Burger",
  },
  {
    dataSrc: "https://www.youtube.com/embed/b5AvSdqyxnI",
    imgUrl:
      "https://images.squarespace-cdn.com/content/v1/5818b2b003596e3016bd3e29/1481221675926-8A1F1CLNY7YH021QN4R5/download.jpeg",
    title: "Marcus Samuelson making Kitfo",
  },
];
let recipes = JSON.parse(localStorage.getItem("recipes")) || [
  {
    imgUrl:
      "https://www.thespruceeats.com/thmb/eWac2gILySU7xhCZzJVEaOvwlRI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/doro-wat-39441-hero-01-b1aa5b8734414d4eb75948a906cc1043.jpg",
    title: "Doro-Wot",
  },
  {
    imgUrl:
      "https://www.allrecipes.com/thmb/I8QL8pshGJY2kJDzr7u-UfU9zk0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-636369362_ethiopian-kitfo_gettyimages_alleko-2000-31e73b5b3aa0479eb15a9d17ef063c33.jpg",
    title: "Kitfo",
  },
  {
    imgUrl:
      "https://spicebreeze.com/wp-content/uploads/2022/09/Ethiopian-Tibs.jpg",
    title: "Tibs",
  },
  {
    imgUrl:
      "https://www.onceuponachef.com/images/2018/02/pan-seared-salmon-.jpg",
    title: "Salmon",
  },
  {
    imgUrl:
      "https://www.foodandwine.com/thmb/nesQwmMJ6zA4Fb0TtAThMwdn56g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/steakhouse-style-rib-eyes-ft-recipe1118-235f4532bcf948efa82aab8065bb98d8.jpg",
    title: "Steak",
  },
  {
    imgUrl:
      "https://tarasmulticulturaltable.com/wp-content/uploads/2023/04/Chechebsa-Ethiopian-Torn-Flatbread-Breakfast-5-of-7.jpg",
    title: "Chechebsa",
  },
  {
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTalCPMNVRNsBc1LdtiVoDcFuzH8bYCzrqT5w&usqp=CAU",
    title: "Burger",
  },
  {
    imgUrl:
      "https://www.dontgobaconmyheart.co.uk/wp-content/uploads/2022/01/tomato-sauce-for-ravioli.jpg",
    title: "Ravioli",
  },
  {
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg",
    title: "Pizza",
  },
  {
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb9U6tKFzOCoWmSSyzI1k5TEo-RZeuKEu8mA&usqp=CAU",
    title: "Noodles",
  },
  {
    imgUrl:
      "https://www.paintthekitchenred.com/wp-content/uploads/2023/01/Air-fryer-frozen-chicken-wings-L1-Paint-the-Kitchen-Red.jpg",
    title: "Chicken-Wings",
  },
  {
    imgUrl:
      "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/43/37/45/y8IMxuYTRLiuGzSK9x2i_mc%2520donalds%2520classic%2520french%2520fries%2520copycat%2520433745-8.jpg",
    title: "French Fries",
  },
];
localStorage.setItem("videos", JSON.stringify(videos));
localStorage.setItem("recipes", JSON.stringify(recipes));

// Recipee Section //
recipes.forEach((recipe) => {
  const html = `
  <div class="recipe">
    <img src="${recipe.imgUrl}" alt="${recipe.title}">
    <span class="title">${recipe.title}</span>
    <span class="remove">Remove</span>
    </div>
    `;
  recipesDetail.insertAdjacentHTML("beforeend", html);
});

//add the plus button at the end to allow admin to dynamically add to popular recipes
const createPlusButton = function (position, className) {
  const div = document.createElement("div");
  div.className = "plus__button";
  const span = document.createElement("span");
  span.className = `plus ${className}`;
  span.textContent = "+";
  div.insertAdjacentElement("beforeend", span);
  const toolTip = document.createElement("span");
  if (className === "add") toolTip.textContent = "Add to Popular Recipe";
  else toolTip.textContent = "Add to Trending Videos";
  toolTip.className = "tooltip";
  div.insertAdjacentElement("beforeend", toolTip);
  position.insertAdjacentElement("afterend", div);
};
createPlusButton(recipesDetail, "add");
createPlusButton(videosDetail, "vid__add");

const plusBtns = document.querySelectorAll(".plus");
plusBtns.forEach((btn) => {
  btn.addEventListener("mouseover", function (e) {
    e.target
      .closest(".plus__button")
      .querySelector(".tooltip").style.visibility = "visible";
  });
  btn.addEventListener("mouseout", function (e) {
    e.target
      .closest(".plus__button")
      .querySelector(".tooltip").style.visibility = "hidden";
  });
});
const createOverlay = function () {
  const div = document.createElement("div");
  div.className = "overlay";
  document.querySelector("body").insertAdjacentElement("beforeend", div);
};
const warning = function (message, from) {
  const html = `
      <div class="decision__box">
        <p data-from="${from}">${message}</p>
        <button class="yes">Yes</button><button class="cancel">Cancel</button>
      </div>`;
  document.querySelector(".overlay").innerHTML = html;
};
const displayForm = function (title, field1, field2) {
  const form = document.createElement("form");
  form.className = "add__recipe__form";
  if (title === "Add to Trending Videos") form.className = "add__video__form";
  const html = `
    <fieldset>
      <legend>${title}</legend>
      <label for="url">${field1}:</label>
      <input type="url" placeholder="${
        title === "Add to Trending Videos" ? "embed code" : "url"
      }" required id="url"><br>
      ${
        title === "Add to Trending Videos"
          ? '<label for="img_url">Image:</label><input type = "url" placeholder = "poster url" min-length="2" max - length="40" required id = "img_url"> '
          : ""
      }
      <br><label for="title">${field2}:</label>
      <input type="text" placeholder="title" min-length="2" max-length="40" required id="title">
      <div>
      <input type="submit" value="Add">
      </div>
    </fieldset>
    `;
  form.innerHTML = html;
  document.querySelector(".overlay").insertAdjacentElement("beforeend", form);
};
const remove = function (element, elements) {
  const title = element.querySelector(".title");
  const condition = elements === videos;
  // console.log(condition);
  let updatedElements = elements.filter(
    (recipe) => recipe.title !== title.textContent
  );
  localStorage.setItem(
    `${condition ? "videos" : "recipes"}`,
    JSON.stringify(updatedElements)
  );
  element.remove();
  document.querySelector(".overlay").remove();
};
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove")) {
    createOverlay();
    warning("Are you sure you want to delete this recipe?", "recipes");
    elDel = e.target.closest(".recipe");
  } else if (e.target.classList.contains("yes")) {
    // console.log(recipe, video);
    if (
      e.target.closest(".overlay").querySelector("p").dataset.from === "videos"
    )
      remove(elDel, videos);
    else remove(elDel, recipes);
  } else if (e.target.classList.contains("cancel")) {
    document.querySelector(".overlay").remove();
  } else if (e.target.classList.contains("add")) {
    createOverlay();
    displayForm("Add to Popular Recipes", "Image", "Title");
  } else if (e.target.classList.contains("overlay")) {
    e.target.remove();
  } else if (e.target.classList.contains("vid__remove")) {
    createOverlay();
    warning("Are you sure you want to remove this video ?", "videos");
    elDel = e.target.closest(".video");
  } else if (e.target.classList.contains("vid__add")) {
    createOverlay();
    displayForm("Add to Trending Videos", "Video", "Title");
  }
  else if (e.target.classList.contains('fa-user-minus')) {
    const update = accounts.filter((_, i) => i !== +e.target.dataset.index);
    console.log(update);
    localStorage.setItem('accounts', JSON.stringify(update));
    const profile = e.target.closest('.cust__list');
    profile.querySelector('.profile__field').remove();
    profile.querySelector('.profile__status').remove();
    profile.querySelector('.profile__contact').remove();
  }
  else if (e.target.classList.contains('see__more')) {
    createOverlay();
    const index = e.target.dataset.index;
    const comments = JSON.parse(localStorage.getItem('comments'));
    console.log(comments[index])
    const html = `
    <div class="comment_detail">
      <div style="height:300px; overflow-y:scroll; text-align:initial">
        <p>Name:<span style="font-size:18px"> ${comments[index].uname}</span></p>
        <p>Email:<span style="font-size:18px"> ${comments[index].uemail}</span></p>
        <p>Subject:<span style="font-size:18px"> ${comments[index].usubject}</span></p>
        <p style="font-size:20px">${comments[index].ucomment}</p>
      </div>
      <p class="comm__deci">
        <a href="mailto:${comments[index].uemail}"class="reply"><i class="fa-solid fa-reply"></i></a><span class="cancel">cancel</span>
      </p>
    </div>`
    document.querySelector('.overlay').innerHTML = html;
  }
});

//allowing dynamic popular recipe addition
const submit = function (addTo, submitTo, e) {
  let condition = submitTo === videos;
  const vidUrl = condition ? e.target.querySelector("#url").value : null;
  const imgUrl = condition
    ? e.target.querySelector("#img_url").value
    : e.target.querySelector("#url").value;
  const title = e.target.querySelector('input[type="text"]').value;
  submitTo.push({ dataSrc: vidUrl, imgUrl: imgUrl, title: title });
  localStorage.setItem(
    `${condition ? "videos" : "recipes"}`,
    JSON.stringify(submitTo)
  );
  const html = `
  <div class="${submitTo === videos ? "video" : "recipe"}">
    <img src="${imgUrl}" alt="${title}">
    <span class="title">${title}</span>
    <span class="${
      submitTo === videos ? "vid__remove" : "remove"
    }">Remove</span>
    </div>
  `;
  addTo.insertAdjacentHTML("beforeend", html);
  document.querySelector(".overlay").remove();
};
document.addEventListener("submit", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("add__recipe__form")) {
    submit(recipesDetail, recipes, e);
  } else if (e.target.classList.contains("add__video__form")) {
    submit(videosDetail, videos, e);
  }
});

// Recipee Section //
videos.forEach((vid) => {
  const html = `
  <div class="video">
    <img src="${vid.imgUrl}" alt="${vid.title} data">
    <span class="title">${vid.title}</span>
    <span class="vid__remove">Remove</span>
    </div>
    `;
  videosDetail.insertAdjacentHTML("beforeend", html);
});
// localStorage.clear();
// console.log(accounts);
accounts?.forEach((acc,index) => {
  const condition = acc.bookmarks.length === 0;
  const profile = `
    <div class="profile__field">
      <img class="profile__img" src="../../Resources/Images/admin.png">
      <div class="user">
        <p class="username">${acc.userName[0].toUpperCase() + acc.userName.slice(1)}</p>
        <p class="reg__date"><i class="fa-regular fa-clock"></i> ${acc.regDate}</p> 
      </div>
    </div>
  `;
  const contact = `
    <div class="profile__contact">
      <i class="fa-solid fa-envelope"></i> <span class="cust__email">${acc.email}</span>
    </div>`;
  const status = `
    <div class="profile__status">
      <p class="status__${condition ? 'yes' : 'no'}">${condition ? 'Not Bookmarked' : 'Bookmarked'}</p>
      <i class="fa-solid fa-user-minus" style="padding-left:10px; cursor:pointer;" data-index="${index}"></i>
    </div>
  `;
  document.querySelector(".cust__list").insertAdjacentHTML("beforeend", profile);
  document.querySelector('.cust__list').insertAdjacentHTML('beforeend', contact);
  document.querySelector('.cust__list').insertAdjacentHTML('beforeend', status);
});
const numBook = accounts?.reduce((acc, account) => {
  if (account.bookmarks.length !== 0)
    return ++acc;
  else return acc;
}, 0);
const numNotBook = accounts.length - numBook;
document.querySelector('.stat__book').textContent = Intl.NumberFormat('en-us').format(numBook * 1000);
document.querySelector('.stat__nobook').textContent = Intl.NumberFormat('en-us').format(numNotBook * 1000);
const percBook = Intl.NumberFormat('en-us', { style: 'percent' }).format((numBook / accounts.length || 0));
const percNoBook = Intl.NumberFormat('en-us', { style: 'percent' }).format((numNotBook / accounts.length || 0));

const spanPercBook = document.createElement('span');
spanPercBook.textContent = percBook;
spanPercBook.style.paddingLeft = '20px';
const spanPercNoBook = document.createElement('span');
spanPercNoBook.textContent = percNoBook;
spanPercNoBook.style.paddingLeft = '20px';

document.querySelector('.stat__book').insertAdjacentElement('beforeend', spanPercBook);
document.querySelector('.stat__nobook').insertAdjacentElement('beforeend', spanPercNoBook);

// comments
const comments = JSON.parse(localStorage.getItem('comments')) || [];
// console.log(comments);
comments.forEach((comment,index) => {
  const html = `
  <p>${comment.uname}</p>
  <p>${comment.uemail}</p>
  <p>${comment.usubject} <span class="see__more" data-index="${index}">See More</span></p>`;
  document.querySelector('.comm__list').insertAdjacentHTML('beforeend', html);
});

// prfoile
document.querySelector('.admin_profile_form').addEventListener('submit', function (e) {
  const name = document.querySelector('#admin_name').value;
  const email = document.querySelector('#admin_email').value;
  const pass = document.querySelector('#admin_pass').value;
  name !== '' ? admin.adminName = name : false;
  email !== '' ? admin.adminEmail = email : false;
  pass !== '' ? admin.pass = pass : false;
  document.querySelector(".admin_name").textContent = admin.adminName;
  document.querySelector(".admin_img").src = admin.adminImg;
  document.querySelector(".admin_email").textContent = admin.adminEmail;
  document.querySelector('#admin_name').value = '';
  document.querySelector('#admin_email').value = '';
  document.querySelector('#admin_pass').value = '';

  localStorage.setItem('admin', JSON.stringify(admin));
})
