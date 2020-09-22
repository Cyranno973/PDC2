let nbrpax = 0;
let totaux;
let element;
let name;
let myDictPax = {};
let myDictBebe = {};
let cible;
let totalPax = 0;
let totalBebe = 0;

let recuperationSumBebe = sessionStorage.getItem("myDictBebe");
let recuperationSumPax = sessionStorage.getItem("myDictPax");

const pax = document.getElementById('pax');
const bebe = document.getElementById('bebes');
const containerNotif = document.getElementById('containerNotif');

const pdc = document.querySelector('.pdc');

let editPaxEditbebe = document.querySelectorAll('.editPax,.editBebe');
let list = document.querySelectorAll('ul  li');
let editPax = document.querySelectorAll('.editPax');






function total() {
	totalPax = 0;
	totalBebe = 0;
	var infosObjDeserializedPax;
	infosObjDeserializedPax = JSON.parse(sessionStorage.getItem('myDictPax'));

	for (var keyPax in infosObjDeserializedPax) {
		var valuePax = Number(infosObjDeserializedPax[keyPax]);
		totalPax = totalPax + valuePax;
	}

	pax.textContent = totalPax;



	infosObjDeserializedBebe = JSON.parse(sessionStorage.getItem('myDictBebe'));

	for (var keyBebe in infosObjDeserializedBebe) {
		var valueBebe = Number(infosObjDeserializedBebe[keyBebe]);
		totalBebe = totalBebe + valueBebe;
		// console.log('total bebe  : '+totalBebe);	
	}

	bebe.textContent = totalBebe;
}

for (const element of list) {
	element.addEventListener('click', function () {
		if (element.classList.contains('moins')) decrement(this);
		if (element.classList.contains('editPax')) editionPax(this);
		if (element.classList.contains('editBebe')) editionBebe(this);
		if (element.classList.contains('plus')) increment(this);
	})
}

pdc.addEventListener('click', reset);



function editionPax(nameId) {
	var reg = new RegExp('^[0-9]+$');

	addEventListener('focusout', function () {
		cible = nameId;
		myDictPax[cible.classList[0]] = cible.textContent;
		// console.log(typeof Number(myDictPax[cible.classList[0]]));
		if (reg.test(myDictPax[cible.classList[0]])) {
			let infosObjSerializedPax = JSON.stringify(myDictPax);
			sessionStorage.setItem('myDictPax', infosObjSerializedPax);
			total();
		} else {
			createNotification('Erreur lettre entrez', 'red',);
			var infosObjDeserializedPax;

			infosObjDeserializedPax = JSON.parse(sessionStorage.getItem('myDictPax'));

			for (var key in infosObjDeserializedPax) {
				var value = infosObjDeserializedPax[key];
				document.querySelector('.' + key).textContent = value;
				myDictPax[key] = value;
			}
			total();

		}

	}
	)
};
function editionBebe(nameId) {
	var reg = new RegExp('^[0-9]+$');

	addEventListener('focusout', function () {
		cible = nameId;
		myDictBebe[cible.classList[0]] = cible.textContent;

		if (reg.test(myDictBebe[cible.classList[0]])) {
			let infosObjSerializedBebe = JSON.stringify(myDictBebe);
			sessionStorage.setItem('myDictBebe', infosObjSerializedBebe);
			total();
		}else {
			createNotification('Erreur lettre entrez', 'red',);
			var infosObjDeserializedBebe;

			 infosObjDeserializedBebe = JSON.parse(sessionStorage.getItem('myDictBebe'));

			for (var key in infosObjDeserializedBebe) {
				var value = infosObjDeserializedBebe[key];
				document.querySelector('.' + key).textContent = value;
				myDictBebe[key] = value;
			}
			total();

		}
	}
	)
};

//si sessionstorage vide sum vaut 0  ou je recupere la valeur de sum dans le session storage
if (recuperationSumPax === null && recuperationSumBebe === null) {
	for (let editELt of editPaxEditbebe) {
		editELt.textContent = 0;
		pax.textContent = 0;
		bebe.textContent = 0;
	}
}
else {
	var infosObjDeserializedPax;

	infosObjDeserializedPax = JSON.parse(sessionStorage.getItem('myDictPax'));

	for (var key in infosObjDeserializedPax) {
		var value = infosObjDeserializedPax[key];
		document.querySelector('.' + key).textContent = value;
		myDictPax[key] = value;
	}
	var infosObjDeserializedBebe = JSON.parse(sessionStorage.getItem('myDictBebe'));

	for (var key in infosObjDeserializedBebe) {
		var value = infosObjDeserializedBebe[key];
		document.querySelector('.' + key).textContent = value;
		myDictBebe[key] = value;
	}
	total();
}

function decrement(nameId) {
	var infosObjDeserializedPax;
	cible = nameId.nextElementSibling.nextElementSibling;
	myDictPax[cible.classList[0]] = cible.textContent;
	infosObjSerializedPax = JSON.stringify(myDictPax);
	sessionStorage.setItem('myDictPax', infosObjSerializedPax);
	infosObjDeserializedPax = JSON.parse(sessionStorage.getItem('myDictPax'));
	cible.textContent = infosObjDeserializedPax[cible.classList[0]] - 1;
	myDictPax[cible.classList[0]] = cible.textContent;
	infosObjSerializedPax = JSON.stringify(myDictPax);
	sessionStorage.setItem('myDictPax', infosObjSerializedPax);
	total();
};

function increment(nameId) {
	var infosObjDeserializedPax;
	cible = nameId.previousElementSibling.previousElementSibling;
	myDictPax[cible.classList[0]] = cible.textContent;
	infosObjSerializedPax = JSON.stringify(myDictPax);
	sessionStorage.setItem('myDictPax', infosObjSerializedPax);
	infosObjDeserializedPax = JSON.parse(sessionStorage.getItem('myDictPax'));
	cible.textContent = Number(infosObjDeserializedPax[cible.classList[0]]) + 1;
	myDictPax[cible.classList[0]] = cible.textContent;
	infosObjSerializedPax = JSON.stringify(myDictPax);
	sessionStorage.setItem('myDictPax', infosObjSerializedPax);
	total();

};

function reset() {
	sessionStorage.removeItem('myDictPax');
	sessionStorage.removeItem('myDictBebe');
	pax.textContent = 0;
	bebe.textContent = 0;

	for (let editELt of editPaxEditbebe) {
		editELt.textContent = 0;
	}
	myDictPax = {};
	myDictBebe = {};
	totalPax = 0;
	totalBebe = 0;
	createNotification('Remise à zéro', ' #2D882D');
};

function createNotification(chaine, color) {

	containerNotif.innerHTML = '';
	let notif = document.createElement('div');
	notif.classList.add('toast');
	notif.textContent = chaine;
	notif.style.backgroundColor = color;
	containerNotif.appendChild(notif);
	setTimeout(() => {
		notif.remove();
		delete notif;

	}, 3000);


}
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var closeBtn = document.getElementById("closeBtn");

// When the user clicks on the button, open the modal 
//with function anonyme
pdc.addEventListener('click', function() {
  modal.style.display = "block";
})

// When the user clicks on <span> (x), close the modal
// with function with name
closeBtn.addEventListener('click', closeModal)
function closeModal() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/pdc/sw.js")
        .then(() => console.log("registered service worker!"));
}
