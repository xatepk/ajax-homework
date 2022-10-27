const loadBtn = document.querySelector(".js-load");
const postsBtn = document.querySelector('.posts-load');
const numberInput = document.querySelector('.number-input');
const inputNumberError = document.querySelector('.number-input-error');
const inputGhError = document.querySelector('.js-input-error');
const resultsContainer = document.querySelector(".js-results");
const searchInput = document.querySelector(".js-input");
const loading = document.querySelector(".text-center")

loadBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  inputGhError.textContent = "";
  const searchValue = searchInput.value.trim().toLowerCase();

  try {
    if (!searchValue.length) {
      throw new SyntaxError('Ошибка в данных');
    }

    loading.classList.add('text-center_visible');

    fetch(`https://api.github.com/users/${searchValue}`)
    .then((res) => res.json())
    .then((data) =>
        (resultsContainer.innerHTML = `<div class="response-container">
                  <img src="${data.avatar_url}">
                  <p> Имя: <span>${data.name}</span><p>
                  <p> О себе: <span>${data.bio}</span><p>
                  <p> Кол-во репозиториев: <span>${data.public_repos}</span><p>
              </div>`)
    )
    
    loading.classList.remove('text-center_visible');

  } catch (error) {
    if (error.name === "SyntaxError") {
      inputGhError.textContent = "заполните поле";
    } else {
      console.log(error.message)
    }

  }
});

postsBtn.addEventListener('click', async (evt) => {
  evt.preventDefault();
  try {
    resultsContainer.innerHTML = '';
    loading.classList.add('text-center_visible');
    let response = await axios.get("https://jsonplaceholder.typicode.com/users");
    loading.classList.remove('text-center_visible');

    response.data.forEach(el => {
      resultsContainer.innerHTML += `<div class="response-container">
                <p> Имя: <span>${el.name}</span><p>
                <p> Никнейм: <span>${el.username}</span><p>
                <p> Город: <span>${el.address.city}</span><p>
                <p> Телефон: <span>${el.phone}</span><p>
                <p> Наименование компании: <span>${el.company.name}</span><p>
            </div>`})

  } catch {
    error => console.log(error)
  };

  // loading.classList.add('text-center_visible');

  // axios.get("https://jsonplaceholder.typicode.com/users").then(response => {
  //   resultsContainer.innerHTML = "";
  //   response.data.forEach(el => {
  //     resultsContainer.innerHTML += `<div class="response-container">
  //               <p> Имя: <span>${el.name}</span><p>
  //               <p> Никнейм: <span>${el.username}</span><p>
  //               <p> Город: <span>${el.address.city}</span><p>
  //               <p> Телефон: <span>${el.phone}</span><p>
  //               <p> Наименование компании: <span>${el.company.name}</span><p>
  //           </div>`

  //   });

  // })
  // .catch(error => console.log(error));

  // loading.classList.remove('text-center_visible');

});

numberInput.addEventListener('input', (evt) => {
  evt.preventDefault();
  inputNumberError.textContent = "";

  try {
   if (evt.target.value === "") {
      throw new SyntaxError('заполните поле');
    } else if (evt.target.value < 5 || evt.target.value > 10) {
      throw new SyntaxError('значение меньше 5 или больше 10');
    }

  } catch (error) {
    if (error.name === "SyntaxError") {
      inputNumberError.textContent = error.message;
    } else {
      console.log(error.message);
    }
  }
})
