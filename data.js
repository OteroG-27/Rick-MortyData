document.addEventListener("DOMContentLoaded", () => {
  let paginaActual = 1;
  function actualizarPagina(numero) {
    paginaActual = numero;
    const url = `https://rickandmortyapi.com/api/character?page=${paginaActual}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => displayCharacters(data.results.slice(0, 4)))
      .catch((error) => console.error("Error fetching data:", error));
  }
  document.addEventListener("DOMContentLoaded", () => {
    fetch("https://rickandmortyapi.com/api/location/")
      .then((response) => response.json())
      .then((data) => displayCharacters(data.results))
      .catch((error) => console.error("Error fetching data:", error));
  });
  function displayCharacters(characters) {
    const charactersDiv = document.getElementById("containerCharacters");
    charactersDiv.innerHTML = ""; 
    characters.forEach((character) => {
      const characterDiv = document.createElement("div");
      characterDiv.className = "character";
      characterDiv.innerHTML = `
        <div class="c-img">
          <img src="${character.image}" alt="${character.name}">
        </div>
        <div class="c-info">
          <button class="btnGO" value="${character.id}">Go</button>
          <h3>Name:</h3>
          <p class="descripcion">${character.name}</p>
          <h3>Status:</h3>
          <p class="descripcion">${character.status}</p>
        </div>
      `;
      charactersDiv.appendChild(characterDiv);
      const learnMoreBtn = document.getElementById("learnMoreBtn");
      learnMoreBtn.addEventListener("click", () => {
        fetch(`https://rickandmortyapi.com/api/character?page=${paginaActual}`)
          .then((response) => response.json())
          .then((data) => displayCharacters(data.results))
          .catch((error) =>
            console.error("Error fetching additional data:", error)
          );
      });
    });
    document.getElementById("btnSiguiente").addEventListener("click", () => {
      actualizarPagina(paginaActual + 1);
    });
    document.getElementById("btnAnterior").addEventListener("click", () => {
      if (paginaActual > 1) {
        actualizarPagina(paginaActual - 1);
      }
    });
    var buttons = document.querySelectorAll(".btnGO");
    var buttonsArray = Array.from(buttons);
    buttonsArray.forEach(function (button) {
      button.addEventListener("click", function () {
        var characterId = button.value;
        localStorage.setItem("id", characterId);
        window.location.href = "personaje-detalles.html";
      });
    });
  }
  actualizarPagina(paginaActual);
});



