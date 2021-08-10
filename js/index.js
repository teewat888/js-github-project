const fetchService = (queryString, type = "user") => {
  const ulUser = document.getElementById("user-list");
  const ulRepo = document.getElementById("repos-list");
  const p = document.createElement('p');
  const container = document.getElementById('github-container');
  const confObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.github.v3+json",
    },
  };
  let li;
  const clearUl = () => {
    while (ulUser.firstChild) {
        ulUser.removeChild(ulUser.firstChild);
      }
  }
  const createUserList = (obj) => {
    clearUl();
    for (const item of obj.items) {
      li = document.createElement("li");
      li.setAttribute("data-id",item.id);
      li.innerHTML = `
        <img src="${item.avatar_url}" width="25" height="25" />
        <b>${item.login}</b>`;
      ulUser.appendChild(li);
      li.addEventListener('click', () => {
        fetchService(item.login, "repos");
      })
    }
  }

  const createRepolist = (obj,queryString) => {
      console.log(obj);
      clearUl();
      p.innerHTML = `<b>${queryString}</b>`;
      container.insertBefore(p, container.firstElementChild.nextSibling);
      for(const item of obj) {
        li = document.createElement("li");
        li.setAttribute("data-id",item.id);
        li.innerHTML = `
            <b>${item.name}</b>`;
        ulRepo.appendChild(li);
      } 


  }

  if (type === "user") {
    return fetch(
      `https://api.github.com/search/users?q=${queryString}`,
      confObj
    )
      .then((resp) => resp.json())
      .then((obj) => {
        //console.log("Obj: ", obj);
        createUserList(obj);
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
      return fetch(
         `https://api.github.com/users/${queryString}/repos?per_page=100`,confObj)
      .then( (resp) => resp.json()
      )
      .then( (obj) => {
        createRepolist(obj,queryString);
      })
      .catch( (e) => {
          console.log(e);
      })
  }
};

//IIFE
(() => {
  document.addEventListener("DOMContentLoaded", (e) => {
    const searchText = document.getElementById("search");
    const searchBtn = document.querySelector("input[name='submit']");

    //console.log("searchText: ",searchText.value);
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      fetchService(searchText.value, "user");
    });
  });
})();
