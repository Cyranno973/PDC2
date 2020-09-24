let totaux;
let element;
let name;
let myDictPax = {};
let myDictBebe = {};
let myDictRsc = {};
let cible;
let nbrpax = 0;
let totalPax = 0;
let totalBebe = 0;

let recuperationSumBebe = sessionStorage.getItem("myDictBebe");
let recuperationSumPax = sessionStorage.getItem("myDictPax");

const pax = document.getElementById("pax");
const bebe = document.getElementById("bebes");
const supprimez = document.getElementById("supprimez");
const annuler = document.getElementById("annuler");
const containerNotif = document.getElementById("containerNotif");
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var closeBtn = document.getElementById("closeBtn");

const allRsc = document.querySelectorAll(".allRsc");

const pdc = document.querySelector(".pdc");
const pmr = document.querySelector(".pmr");
const pm = document.querySelector(".pm");

let editPaxEditbebe = document.querySelectorAll(".editPax,.editBebe");
let list = document.querySelectorAll("ul  li");
let editPax = document.querySelectorAll(".editPax");

function total() {
  totalPax = 0;
  totalBebe = 0;
  totalRsc = 0;

  var infosObjDeserializedPax;
  infosObjDeserializedPax = JSON.parse(sessionStorage.getItem("myDictPax"));

  for (var keyPax in infosObjDeserializedPax) {
    var valuePax = Number(infosObjDeserializedPax[keyPax]);
    totalPax = totalPax + valuePax;
  }

  pax.textContent = totalPax;

  infosObjDeserializedBebe = JSON.parse(sessionStorage.getItem("myDictBebe"));

  for (var keyBebe in infosObjDeserializedBebe) {
    var valueBebe = Number(infosObjDeserializedBebe[keyBebe]);
    totalBebe = totalBebe + valueBebe;
    // console.log('total bebe  : '+totalBebe);
  }

  bebe.textContent = totalBebe;

  infosObjDeserializedRsc = JSON.parse(sessionStorage.getItem("myDictRsc"));

  for (var keyRsc in infosObjDeserializedRsc) {
    var valueRsc = Number(infosObjDeserializedRsc[keyRsc]);
    totalRsc = totalRsc + valueRsc;
    // console.log('total bebe  : '+totalBebe);
  }

  pm.textContent = totalRsc;
}

for (const element of list) {
  element.addEventListener("click", function () {
    if (element.classList.contains("moins")) decrement(this);
    if (element.classList.contains("editPax")) editionPax(this);
    if (element.classList.contains("editBebe")) editionBebe(this);
    if (element.classList.contains("plus")) increment(this);
  });
}
for (const rscElt of allRsc) {
  rscElt.addEventListener("click", function () {
    editionRsc(this);
  });
}

function editionRsc(nameId) {
  var reg = new RegExp("^[0-9]+$");

  selectElementContents(nameId);


  addEventListener("focusout", function () {
    cible = nameId;
    myDictRsc[cible.classList[0]] = cible.textContent;
    // // console.log(typeof Number(myDictPax[cible.classList[0]]));
    if (reg.test(myDictRsc[cible.classList[0]])) {
      let infosObjSerializedRsc = JSON.stringify(myDictRsc);
      sessionStorage.setItem("myDictRsc", infosObjSerializedRsc);
      total();
    } else {
      createNotification("Erreur lettre entrez", "red");
      var infosObjDeserializedRsc;

      infosObjDeserializedRsc = JSON.parse(sessionStorage.getItem("myDictRsc"));

      for (var key in infosObjDeserializedRsc) {
        var value = infosObjDeserializedRsc[key];
        document.querySelector("." + key).textContent = value;
        myDictRsc[key] = value;
      }
      total();
    }
  });
}

pdc.addEventListener("click", confirmation);
supprimez.addEventListener("click", reset);
annuler.addEventListener("click", closeModal);



function editionPax(nameId) {
  var reg = new RegExp("^[0-9]+$");
  
  selectElementContents(nameId);


  addEventListener("focusout", function () {
    cible = nameId;
    myDictPax[cible.classList[0]] = cible.textContent;
    // console.log(typeof Number(myDictPax[cible.classList[0]]));
    if (reg.test(myDictPax[cible.classList[0]])) {
      let infosObjSerializedPax = JSON.stringify(myDictPax);
      sessionStorage.setItem("myDictPax", infosObjSerializedPax);
      total();
    } else {
      createNotification("Erreur lettre entrez", "red");
      var infosObjDeserializedPax;

      infosObjDeserializedPax = JSON.parse(sessionStorage.getItem("myDictPax"));

      for (var key in infosObjDeserializedPax) {
        var value = infosObjDeserializedPax[key];
        document.querySelector("." + key).textContent = value;
        myDictPax[key] = value;
      }
      total();
    }
  });
}


function editionBebe(nameId) {
  var reg = new RegExp("^[0-9]+$");

  selectElementContents(nameId);

  addEventListener("focusout", function () {
    cible = nameId;
    myDictBebe[cible.classList[0]] = cible.textContent;

    if (reg.test(myDictBebe[cible.classList[0]])) {
      let infosObjSerializedBebe = JSON.stringify(myDictBebe);
      sessionStorage.setItem("myDictBebe", infosObjSerializedBebe);
      total();
    } else {
      createNotification("Erreur lettre entrez", "red");
      var infosObjDeserializedBebe;

      infosObjDeserializedBebe = JSON.parse(
        sessionStorage.getItem("myDictBebe")
      );

      for (var key in infosObjDeserializedBebe) {
        var value = infosObjDeserializedBebe[key];
        document.querySelector("." + key).textContent = value;
        myDictBebe[key] = value;
      }
      total();
    }
  });
}

//si sessionstorage vide sum vaut 0  ou je recupere la valeur de sum dans le session storage
if (recuperationSumPax === null && recuperationSumBebe === null) {
  for (let editELt of editPaxEditbebe) {
    editELt.textContent = 0;
    pax.textContent = 0;
    bebe.textContent = 0;
    pm.textContent = 0;
  }
  for (let rscElt of allRsc) {
	rscElt.textContent = 0;
	cibleRsc = rscElt;
	myDictRsc[cibleRsc.classList[0]] = cibleRsc.textContent;
    infosObjSerializedRsc = JSON.stringify(myDictRsc);
    sessionStorage.setItem("myDictRsc", infosObjSerializedRsc);
	
  }

  for (let elementPax of editPax) {
    var infosObjSerializedPax;
    var infosObjSerializedBebe;

    ciblePax = elementPax;
    cibleBebe = elementPax.nextElementSibling;

    myDictPax[ciblePax.classList[0]] = ciblePax.textContent;
    infosObjSerializedPax = JSON.stringify(myDictPax);
    sessionStorage.setItem("myDictPax", infosObjSerializedPax);

    myDictBebe[cibleBebe.classList[0]] = cibleBebe.textContent;
    infosObjSerializedBebe = JSON.stringify(myDictBebe);
	sessionStorage.setItem("myDictBebe", infosObjSerializedBebe);
	
    
  }
} else {
  var infosObjDeserializedPax;

  infosObjDeserializedPax = JSON.parse(sessionStorage.getItem("myDictPax"));

  for (var key in infosObjDeserializedPax) {
    var value = infosObjDeserializedPax[key];
    document.querySelector("." + key).textContent = value;
    myDictPax[key] = value;
  }
  var infosObjDeserializedBebe = JSON.parse(
    sessionStorage.getItem("myDictBebe")
  );

  for (var key in infosObjDeserializedBebe) {
    var value = infosObjDeserializedBebe[key];
    document.querySelector("." + key).textContent = value;
    myDictBebe[key] = value;
  }

  var infosObjDeserializedRsc = JSON.parse(sessionStorage.getItem("myDictRsc"));

  for (var key in infosObjDeserializedRsc) {
    var value = infosObjDeserializedRsc[key];
    document.querySelector("." + key).textContent = value;
    myDictRsc[key] = value;
  }
  total();
}

function decrement(nameId) {
  var infosObjDeserializedPax;
  cible = nameId.nextElementSibling.nextElementSibling;
  myDictPax[cible.classList[0]] = cible.textContent;
  infosObjSerializedPax = JSON.stringify(myDictPax);
  sessionStorage.setItem("myDictPax", infosObjSerializedPax);
  infosObjDeserializedPax = JSON.parse(sessionStorage.getItem("myDictPax"));
  if (infosObjDeserializedPax[cible.classList[0]] - 1 >= 0)
    cible.textContent = infosObjDeserializedPax[cible.classList[0]] - 1;

  myDictPax[cible.classList[0]] = cible.textContent;
  infosObjSerializedPax = JSON.stringify(myDictPax);
  sessionStorage.setItem("myDictPax", infosObjSerializedPax);
  total();
}

function increment(nameId) {
  var infosObjDeserializedPax;
  cible = nameId.previousElementSibling.previousElementSibling;
  myDictPax[cible.classList[0]] = cible.textContent;
  infosObjSerializedPax = JSON.stringify(myDictPax);
  sessionStorage.setItem("myDictPax", infosObjSerializedPax);

  infosObjDeserializedPax = JSON.parse(sessionStorage.getItem("myDictPax"));
  cible.textContent = Number(infosObjDeserializedPax[cible.classList[0]]) + 1;
  myDictPax[cible.classList[0]] = cible.textContent;
  infosObjSerializedPax = JSON.stringify(myDictPax);
  sessionStorage.setItem("myDictPax", infosObjSerializedPax);
  total();
}

function reset() {
  sessionStorage.removeItem("myDictPax");
  sessionStorage.removeItem("myDictBebe");
  sessionStorage.removeItem("myDictRsc");
  pax.textContent = 0;
  bebe.textContent = 0;
  pm.textContent = 0;

  for (let editELt of editPaxEditbebe) {
    editELt.textContent = 0;
  }
  for (let rscElt of allRsc) {
    rscElt.textContent = 0;
  }
  myDictPax = {};
  myDictBebe = {};
  myDictRsc = {};
  totalPax = 0;
  totalBebe = 0;
  closeModal();
  createNotification("Remise à zéro", " #2D882D");
}

function createNotification(chaine, color) {
  containerNotif.innerHTML = "";
  let notif = document.createElement("div");
  notif.classList.add("toast");
  notif.textContent = chaine;
  notif.style.backgroundColor = color;
  containerNotif.appendChild(notif);
  setTimeout(() => {
    notif.remove();
    delete notif;
  }, 3000);
}
function closeModal() {
  modal.style.display = "none";
}

// When the user clicks on the button, open the modal
//with function anonyme
function confirmation() {
  modal.style.display = "block";
  // When the user clicks on <span> (x), close the modal
  // with function with name
  closeBtn.addEventListener("click", closeModal);

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/pdc/sw.js")
    .then(() => console.log("registered service worker!"));
}

document.addEventListener("keydown", function (event) {
  let el = document.querySelector(":focus");
  if (event.which === 13) {
    el.blur();
  }
});
function selectElementContents(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

