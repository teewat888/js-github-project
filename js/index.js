const fetchService = (queryString, type = "user") => {
  const ulUser = document.getElementById("user-list");
  const ulRepo = document.getElementById("repos-list");
  let li;
  const clearUl = () => {
    while (ulUser.firstChild) {
        ulUser.removeChild(ulUser.firstChild);
      }
  }
  const createUserList = (obj) => {
    for (const item of obj.items) {
      li = document.createElement("li");
      li.innerHTML = `
        <img src="${item.avatar_url}" width="25" height="25" />
        <b>${item.login}</b>`;
      ulUser.appendChild(li);
    }
  };

  if (type === "user") {
    const confObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
      },
    };
    return fetch(
      `https://api.github.com/search/users?q=${queryString}`,
      confObj
    )
      .then((resp) => resp.json())
      .then((obj) => {
        console.log("Obj: ", obj);
        clearUl();
        createUserList(obj);
      })
      .catch((e) => {
        console.log(e);
      });
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
