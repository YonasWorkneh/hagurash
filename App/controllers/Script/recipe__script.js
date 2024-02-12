"use strict";

//searchInput from home page

// set timeout

function timeOut(s) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
}
// error
function errorHandling(message) {
  const html = `<div class="error">
  <i class="fas fa-exclamation-triangle"
    ><p>${message}</p></i>
</div>`;
  recipeResultMainSection.innerHTML = "";
  recipeResultMainSection.insertAdjacentHTML("afterbegin", html);
}

// call the html elements
const recipeResultMainSection = document.querySelector(
  ".recipe_result_main_section"
);
const resultList = document.querySelector(".result_list");
const searchField = document.querySelector(".search__field");
const searchBtn = document.querySelector(".search__btn");
const paginationBtnContainer = document.querySelector(".pagination_btn");
const btnNextPage = document.querySelector(".btn_next_page");
const btnPrePage = document.querySelector(".btn_pre_page");
const searchResultParagraph = document.querySelector(".searchResultParagraph");
const searchResultContainer = document.querySelector(
  ".search_result_container"
);
const servingContainer = document.querySelector(".serving_btn_container");
const btnIncServing = document.querySelector(".btn_increase_serving");
const btnDecServing = document.querySelector(".btn_decrease_serving");
const bookmarkResultList = document.querySelector(".bookmark_result_list");
const bookmarkList = document.querySelector(".bookmark_list");
const bookmarkMessage = document.querySelector(".bookmark_message");
const bookMarkBtn = document.querySelector(".bookmark_btn");
const btnCloseAddRecipe = document.querySelector(".btn--close-modal");
const btnAddRecipe = document.querySelector(".addrecipe_btn_click");
const addRecipeSection = document.querySelector(".add-recipe-window");
const overlay = document.querySelector(".overlay");
const uploadRecipe = document.querySelector(".upload_btn");
const form = document.querySelector(".upload");
const addRecipeErrorMessage = document.querySelector(
  ".add_recipe_error_message"
);
const menuBtn = document.querySelector(".nav-toggler");
const menuBtnClose = document.querySelector(".menu-close");
const nav = document.querySelector("nav");
const successMessageAddRecipe = document.querySelector(".success_message");
const APIkey = "db1198af-251e-4cf5-a401-33ee08158169";

//nav__toggling
menuBtn.addEventListener("click", function (e) {
  nav.classList.remove("hidden");
});
menuBtnClose.addEventListener("click", function (e) {
  nav.classList.add("hidden");
});
// spinner
function panRotate(container) {
  const html = `<div class="intro_spinner">
 <img src="../../Resources/Images/Logo.png" alt="spinner_logo" width="120px" height="120px" />
 </div>
<h2 class="header_when_noting">`;

  container.innerHTML = "";
  container.insertAdjacentHTML("afterbegin", html);
}
addRecipeSection.classList.remove("btn_point_event");

//**************************
let bookMarkArray = [];
let responseInfo;
let id;

class BookmarkManager {
  constructor() {
    this.bookmarks = this.getBookmarks();
  }

  addBookmark(recipeId) {
    if (!this.getBookmarks().some((value) => value.id === recipeId.id)) {
      this.bookmarks.push(recipeId);
      this.addToLocalStorage();
    }
  }

  removeBookmark(recipeId) {
    const index = this.bookmarks.findIndex((value) => value.id === recipeId);
    console.log(index);
    if (index !== -1) {
      this.bookmarks.splice(index, 1);
      this.addToLocalStorage();
    }
  }

  isBookmarked(recipeId) {
    return this.bookmarks.includes(recipeId);
  }

  addToLocalStorage() {
    localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));
  }

  getBookmarks() {
    const storage = localStorage.getItem("bookmarks");
    return storage ? JSON.parse(storage) : [];
  }
}
//localStorage.clear("bookmarks");
const bookmarkManager = new BookmarkManager();

function addAndRemoveRecipeFromBookmark(e) {
  const btnClicked = e.target.closest(".bookmark_add");
  if (!btnClicked) return;

  if (
    bookmarkManager.getBookmarks().some((value) => value.id === responseInfo.id)
  ) {
    bookmarkManager.removeBookmark(responseInfo.id);
    responseInfo.bookmarkedRecipe = false;
  } else {
    bookmarkManager.addBookmark(responseInfo);
    responseInfo.bookmarkedRecipe = true;
    // accounts and bookmark add 👏🏼👏🏼👏🏼👏🏼👏🏼👏🏼
    const activeUser = localStorage.getItem("activeUser");
    if (activeUser) {
      const accounts = JSON.parse(localStorage.getItem("accounts"));
      console.log(accounts);
      accounts.forEach((value, index) => {
        if (value.userName === activeUser) {
          accounts[index].bookmarks.push(responseInfo);
        }
      });
      localStorage.setItem("accounts", JSON.stringify(accounts));
    }
  }

  updateBookmarkIcon();
  bookMarkListRendetHtml(bookmarkManager.getBookmarks());
  checkBookmarkMessage();
}

recipeResultMainSection.addEventListener(
  "click",
  addAndRemoveRecipeFromBookmark
);

function updateBookmarkIcon() {
  recipeResultMainSection.innerHTML = "";
  recipeResultMainSection.insertAdjacentHTML(
    "beforeend",
    renderHtmlForRightSide(responseInfo)
  );
}

function checkBookmarkMessage() {
  if (bookmarkManager.getBookmarks().length === 0) {
    bookmarkList.innerHTML = `
    <div style="padding : 1.8rem; text-align: center;">
      <span style="font-size: 1.3rem; font-weight: 400; ">
      😢 NO RECIPE IS YET ADDED TO THE BOOKMARK 😢  
      </span>
      </div>
    `;
  }
}
bookMarkBtn.addEventListener("mouseover", function (e) {
  bookmarkList.style.opacity = "1";
  bookmarkList.style.display = "block";
});

bookmarkList.addEventListener("mouseleave", function (e) {
  bookmarkList.style.opacity = "0";
  bookmarkList.style.display = "none";
});

async function showRecipe() {
  // get id
  id = window.location.hash.slice(1);
  // console.log(id);
  if (!id) return;
  try {
    panRotate(recipeResultMainSection);

    const response = await Promise.race([
      fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=${APIkey}`
      ),
      timeOut(10),
    ]);
    const awaitd = await response.json();

    // if (!Response.ok) throw new Error(`${awaitd.message} (${response.status})`);
    // console.log(response, awaitd);

    // formating the incoming recipe
    responseInfo = awaitd.data.recipe;
    //render the html

    renderHtmlForRightSide(responseInfo);

    /*😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑*/
    /*book mark*/

    if (
      bookmarkManager
        .getBookmarks()
        .some((value) => value.id === responseInfo.id)
    ) {
      responseInfo.bookmarkedRecipe = true;
    } else {
      responseInfo.bookmarkedRecipe = false;
    }

    // console.log(bookmarkManager.getBookmarks());

    bookMarkListRendetHtml(bookmarkManager.getBookmarks());

    /*😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑😑*/

    /*******************upadate serving***************** */
    function updateServing(newServing) {
      const currElementAll = Array.from(document.querySelectorAll("*"));
      const currElementQuantitiy = Array.from(
        document.querySelectorAll(".recipe_quantity")
      );
      const currServing = document.querySelector(".serv_text");
      responseInfo.ingredients.map((value, index) => {
        currElementQuantitiy[index].innerHTML =
          (value.quantity * newServing) / responseInfo.servings;
      });

      currServing.innerHTML = Number(newServing);
      const nodeListRenderedRigthSide = "";
      currElementAll.forEach(
        (value) => (nodeListRenderedRigthSide += value.outerHTML)
      );
      recipeResultMainSection.innerHTML = "";
      recipeResultMainSection.insertAdjacentHTML(
        "beforeend",
        nodeListRenderedRigthSide
      );
    }
    let newServing = responseInfo.servings;
    function func(e) {
      const btnClicked = e.target.closest(".btn_serving");
      if (!btnClicked) return;

      if (btnClicked.className.includes("btn_increase_serving")) {
        newServing++;
        updateServing(newServing);
      } else if (newServing > 1) {
        newServing--;
        updateServing(newServing);
      }
    }

    recipeResultMainSection.addEventListener("click", func);

    /******************************* */
    recipeResultMainSection.innerHTML = "";
    recipeResultMainSection.insertAdjacentHTML(
      "beforeend",
      renderHtmlForRightSide(responseInfo)
    );
  } catch (error) {
    errorHandling(` We couldn't find the recipe. Try Again😢😢😢`);
    // console.error(`${error} 😢😢😢😢😢😢`);
  }
}

/******************************************/
// load the search result

/*➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕🤣🤣🤣🤣🤣🤣🤣*/
btnAddRecipe.addEventListener("click", function () {
  overlay.classList.toggle("hidden");
  addRecipeSection.classList.toggle("hidden");
  console.log("open");
});
btnCloseAddRecipe.addEventListener("click", function () {
  overlay.classList.toggle("hidden");
  addRecipeSection.classList.toggle("hidden");
  console.log("close");
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = [...new FormData(form)];
  const data = Object.fromEntries(formData); // to an object
  uploadRecipeData(data);

  // Prevent the default form submission
  return false;
});

function uploadRecipeData(data) {
  try {
    const indigrients = Object.entries(data) // return an array of a fiven object
      .filter((value) => value[0].startsWith("ingredient") && value[1] !== "")
      .map((value) => {
        const updateIng = value[1].split(",").map((value) => value.trim());
        if (updateIng.length !== 3)
          throw new Error(
            "💥Wrong Format. Please enter using the correct format 💥"
          );
        const [quantity, unit, description] = updateIng;

        return {
          quantity: quantity ? Number(quantity) : null,
          unit,
          description,
        };
      });
    function recipeObject(data) {
      return {
        title: data.title,
        source_url: data.sourceUrl,
        image_url: data.image,
        publisher: data.publisher,
        cooking_time: Number(data.cookingTime),
        servings: Number(data.servings),
        ingredients: indigrients,
        bookmarkedRecipe: true,
        key: data.key,
      };
    }

    async function sendRecipeToAPI() {
      const response = await Promise.race([
        fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/?key=${APIkey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", //send json formated file
            },
            body: JSON.stringify(recipeObject(data)),
          }
        ),
        timeOut(10),
      ]);

      const awaitd = await response.json();
      console.log(awaitd.data.recipe);

      // panRotate(addRecipeSection);
      //  addRecipeSection.innerHTML = "☝️You have successfully added a recipe☝️";
      // state,title,url

      window.history.pushState(null, "", `#${awaitd.data.recipe.id}`);

      bookmarkManager.addBookmark(awaitd.data.recipe);

      recipeResultMainSection.innerHTML = "";
      recipeResultMainSection.insertAdjacentHTML(
        "beforeend",
        renderHtmlForRightSide(awaitd.data.recipe)
      );
      setTimeout(function () {
        addRecipeSection.classList.toggle("hidden");

        overlay.classList.toggle("hidden");
      }, 3000);

      // render html
    }

    sendRecipeToAPI();
  } catch (error) {
    console.log(error);
    addRecipeSection.classList.add("btn_point_event");
    addRecipeErrorMessage.innerHTML = error.message;
  }
}

/*➕➕➕➕➕➕➕➕➕➕➕🤣🤣🤣🤣🤣🤣🤣➕➕➕➕➕➕➕➕➕*/

async function loadSearch() {
  try {
    searchBtn.addEventListener("click", async function (e) {
      e.preventDefault();
      const searchKeyWord = searchField.value;
      // console.log(searchKeyWord);

      const response = await Promise.race([
        fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchKeyWord}&key=${APIkey}`
        ),
        timeOut(10),
      ]);
      const awaitd = await response.json();
      const allAwaited = awaitd.data.recipes;
      // console.log(allAwaited);

      /***************************************** */
      // serach result perpage
      let currentPage = 1;
      function resultPerPage(page) {
        let start = (page - 1) * 12;
        let end = page * 12;
        currentPage = page;
        return allAwaited.slice(start, end);
      }

      function btnPaginationNextBack() {
        const numPage = Math.ceil(allAwaited.length / 12);
        // console.log(numPage + " : number of pages");
        // page 1 and other page
        if (currentPage == 1 && numPage > 1) {
          return `
          <button class="btn_pag notBtn"></button>
          <button data-goto_page= ${
            currentPage + 1
          } class="btn_pag btn_next_page">page ${currentPage + 1}→</button>
          `;
        }
        // last page
        else if (currentPage == numPage && numPage > 1) {
          return `
          
          <button data-goto_page = ${
            currentPage - 1
          } class="btn_pag btn_pre_page">← page ${currentPage - 1}</button>
          <button class="btn_pag notBtn"></button>
          `;
        }
        // other page
        else if (currentPage < numPage) {
          return `
          <button data-goto_page = ${
            currentPage - 1
          } class="btn_pag btn_pre_page">← page ${currentPage - 1}</button>
            <button data-goto_page = ${
              currentPage + 1
            } class="btn_pag btn_next_page">page ${currentPage + 1} →</button>
          `;
        }
        // one page
        else {
          return ``;
        }
      }

      // render data to html
      function renderListData(currentPage) {
        resultPerPage(currentPage).map((value) => {
          const html = `<li class="result_list_list">
           <a class="result_link" href="#${value.id}">
          <figure class="result_img">
         <img
    src="${value.image_url}"
    alt="food_result_list"
    class="result_img_img"
  />
   </figure>
   <div class="result_data">
   <h4 class="result_name">
   ${value.title}
   </h4>
  <p class="result_publisher">${value.publisher}</p>
</div>
</a>
</li>
`;

          resultList.insertAdjacentHTML("afterbegin", html);
        });

        paginationBtnContainer.insertAdjacentHTML(
          "afterbegin",
          btnPaginationNextBack()
        );
      }
      resultList.innerHTML = "";
      paginationBtnContainer.innerHTML = "";
      renderListData(1);

      function whichbtnClickedCheck(chech) {
        paginationBtnContainer.addEventListener("click", function (e) {
          const btnClicked = e.target.closest(".btn_pag");
          if (!btnClicked) return;
          const gotoPage = Number(btnClicked.dataset.goto_page);
          // console.log(btnClicked);
          console.log(gotoPage);
          resultList.innerHTML = "";
          paginationBtnContainer.innerHTML = "";
          renderListData(gotoPage);
        });
      }
      whichbtnClickedCheck();

      /*Search Fiels empty*/
      searchField.value = "";
    });
  } catch (error) {
    console.error(`${error} 😢😢😢😢😢😢`);
  }
}
loadSearch();
async function newSearchResult() {
  let searchResult = localStorage.getItem("searchResult");
  localStorage.removeItem("searchResult");
  if (searchResult) {
    document.querySelector(".search__field").value = searchResult;
    const searchKeyWord = searchField.value;
    console.log(searchKeyWord);

    const response = await Promise.race([
      fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchKeyWord}&key=${APIkey}`
      ),
      timeOut(10),
    ]);
    const awaitd = await response.json();
    const allAwaited = awaitd.data.recipes;
    console.log(allAwaited);

    /***************************************** */
    // serach result perpage
    let currentPage = 1;
    function resultPerPage(page) {
      let start = (page - 1) * 12;
      let end = page * 12;
      currentPage = page;
      return allAwaited.slice(start, end);
    }

    function btnPaginationNextBack() {
      const numPage = Math.ceil(allAwaited.length / 12);
      console.log(numPage + " : number of pages");
      // page 1 and other page
      if (currentPage == 1 && numPage > 1) {
        return `
      <button class="btn_pag notBtn"></button>
      <button data-goto_page= ${
        currentPage + 1
      } class="btn_pag btn_next_page">page ${currentPage + 1}→</button>
      `;
      }
      // last page
      else if (currentPage == numPage && numPage > 1) {
        return `
      
      <button data-goto_page = ${
        currentPage - 1
      } class="btn_pag btn_pre_page">← page ${currentPage - 1}</button>
      <button class="btn_pag notBtn"></button>
      `;
      }
      // other page
      else if (currentPage < numPage) {
        return `
      <button data-goto_page = ${
        currentPage - 1
      } class="btn_pag btn_pre_page">← page ${currentPage - 1}</button>
        <button data-goto_page = ${
          currentPage + 1
        } class="btn_pag btn_next_page">page ${currentPage + 1} →</button>
      `;
      }
      // one page
      else {
        return ``;
      }
    }

    // render data to html
    function renderListData(currentPage) {
      resultPerPage(currentPage).map((value) => {
        const html = `<li class="result_list_list">
       <a class="result_link" href="#${value.id}">
      <figure class="result_img">
     <img
src="${value.image_url}"
alt="food_result_list"
class="result_img_img"
/>
</figure>
<div class="result_data">
<h4 class="result_name">
${value.title}
</h4>
<p class="result_publisher">${value.publisher}</p>
</div>
</a>
</li>
`;

        resultList.insertAdjacentHTML("afterbegin", html);
      });

      paginationBtnContainer.insertAdjacentHTML(
        "afterbegin",
        btnPaginationNextBack()
      );
    }
    resultList.innerHTML = "";
    paginationBtnContainer.innerHTML = "";
    renderListData(1);

    function whichbtnClickedCheck(chech) {
      paginationBtnContainer.addEventListener("click", function (e) {
        const btnClicked = e.target.closest(".btn_pag");
        if (!btnClicked) return;
        const gotoPage = Number(btnClicked.dataset.goto_page);
        // console.log(btnClicked);
        console.log(gotoPage);
        resultList.innerHTML = "";
        paginationBtnContainer.innerHTML = "";
        renderListData(gotoPage);
      });
    }
    whichbtnClickedCheck();

    /*Search Fiels empty*/
    searchField.value = "";
  }
}
newSearchResult();
/***************/
window.addEventListener("hashchange", showRecipe);
window.addEventListener("load", showRecipe); // while loading it is not chnaging the id so we have to add the load function

function renderHtmlForRightSide(responseInfo) {
  const htmlForTheRigthSide = `
  <!-- recipe_img -->
  <figure class="recipe_fig">
    <img src="${responseInfo.image_url}" alt="Dorowot" class="recipe_img" />
    <h1 class="recipe__title">${responseInfo.title}</h1>
  </figure> 
  <!-- recipe details -->
  <div class="recipe_detail">
    <!-- recipe details top -->
    <div class="recipe_time_serv icon">
      <div class="minute icon">
        <i class="fa-solid fa-clock">
          <span class="min_text">${responseInfo.cooking_time} </span>MINUTE</i
        >
      </div>
      <div class="serving icon">
        <i class="fa-solid fa-users"
          >
          <span class="serv_text">${responseInfo.servings}</span> SERVING</i
        >
        
       
       <button  class="btn_serving btn_increase_serving">
       <span><i class="fa-solid fa-circle-plus"></i></button></span>
       <button class="btn_serving btn_decrease_serving"><span><i class="fa-solid  fa-circle-minus"></i></button></span>
       </div>
      
      <div class="bookmark_add icon">
        <i class="fa-${
          responseInfo.bookmarkedRecipe === true ? "solid" : "regular"
        } fa-bookmark bookmark_bottom"></i>
      </div>

     
    </div> 
    <!-- recipe details bottom-->

    <div class="recipe_ingredients">
      <h2 class="heading_2">RECIPE INGREDIENTS</h2>
      <ul class="recipe_ingredient_ulist">

      
      ${responseInfo.ingredients
        .map((value) => {
          return ` 
          <li class="recipe_ingredient_llist">
          <i class="fa-solid fa-check"></i>
          <div class="recipe_quantity_out"><span class="recipe_quantity">${value.quantity}</span>
            ${value.unit} ${value.description}</div>
         
        </li>`;
        })
        .join("")}

        

      </ul>
      
    </div>
    <div class="direction_link">
      <h2 class="how_to"> HOW TO COOK
      </h2>
      <p class="how_to_cook_discription">
   This recipe was carefully designed and tested by <span class="recipe_direction_user">${
     responseInfo.publisher
   }</span>. Please check out directions at their website 
      </p>
      <div class="direction_link_btn">
      <a
      class="recipe_btn"
      href="${responseInfo.source_url}"
    >
      <span>Directions <span class="arrow">→</span></span>
    </a>
  
  </div>
</div>`;
  return htmlForTheRigthSide;
}

function bookMarkListRendetHtml(returnValue) {
  const html = returnValue.map((value) => {
    return `<li class="result_list_list">
     <a class="result_link" href="#${value.id}">
    <figure class="result_img">
<img
src="${value.image_url}"
alt="food_result_list"
class="result_img_img"
/>
</figure>
<div class="result_data">
<h4 class="result_name">
${value.title}
</h4>
<p class="result_publisher">${value.publisher}</p>
</div>
</a>
</li>
`;
  });

  bookmarkList.innerHTML = "";
  bookmarkList.insertAdjacentHTML("afterbegin", html);
  checkBookmarkMessage();
}

// async function deleteRecipe() {
//   try {
//     const response = await fetch(
//       `https://forkify-api.herokuapp.com/api/v2/recipes/659db0b28b1e5a00144342c9?${APIkey}`,
//       {
//         method: "DELETE",
//       }
//     );

//     if (response.ok) {
//       console.log("Recipe deleted successfully!");
//       console.log(response.statusText); // Log response status for confirmation
//     } else {
//       console.error("Error deleting recipe:", response.statusText);
//       const errorData = await response.json(); // Attempt to parse error data
//       console.error(errorData);
//     }
//   } catch (error) {
//     console.error("Network error:", error);
//   }
// }

// deleteRecipe();
