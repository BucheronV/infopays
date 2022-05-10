//Action du formulaire
const actionForm = async (name) => {
  let url = `https://restcountries.com/v3.1/name/${name}`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  result(data);
};

//Action valider du formulaire
document.querySelector("#searchCountry").onsubmit = function (e) {
  e.preventDefault(); //empeche le rechargement de la page
  document.querySelector("#result").innerHTML = "";
  actionForm(document.querySelector("#country").value);
};

//Affichage du resultat
let result = async (res) => {
  res.forEach((country) => {
    let lstLng = [];
    for (lang in country.languages) {
      lstLng.push(country.languages[lang]);
    }
    let gens = [];
    for (people in country.demonyms.fra) {
      gens.push(country.demonyms.fra[people]);
    }
    const img = document.createElement("div");
    img.innerHTML = `<img src="${country.flags.png}" ></img>`;
    document.querySelector("#result").appendChild(img);
    const info = document.createElement("p");
    info.innerHTML =
      `${country.name.common} / FR : ${country.translations.fra.common}` +
      "<br />" +
      ` Region : ${country.region}` +
      "<br />" +
      `Capitale ${country.capital[0]}` +
      "<br />" +
      `Population : ${country.population} Habitant(s)` +
      "<br />" +
      `Gentilé : ` +
      gens +
      "<br />" +
      `Langue(s) : ` +
      lstLng +
      "<br />" +
      `Superficie: ${country.area} Km²`;
    document.querySelector("#result").appendChild(info);
    //view sur map
    const gMap = document.createElement("button");
    gMap.id = "btnMap";
    gMap.innerHTML = `<a href="${country.maps.googleMaps}" target="blank" id="textBtn">
        Voir sur googleMaps
     </a>`;
    document.querySelector("#result").appendChild(gMap);
  });
};
