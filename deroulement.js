const PMAX = 8;
// Fonction principal
const sacADos = (objets) => {
	let p = [];
	objets.unshift(new Objet(0, 0));
	for (let i = 0; i < objets.length; i++) {
		p.push([]);
		for (let j = 0; j <= PMAX; j++) {
			if (j === 0 || i === 0) {
				p[i][j] = 0;
			} else if (j < objets[i].poids && i > 0) {
				p[i][j] = p[i - 1][j];
			} else {
				p[i][j] = Math.max(
					p[i - 1][j],
					p[i - 1][j - objets[i].poids] + objets[i].valeur
				);
			}
		}
	}
	return [p[objets.length - 1][PMAX], p];
};

const sacados = document.querySelector(".sacados span");
const objetsTable = document.querySelector(".objets table tbody");
sacados.innerHTML = PMAX;

class Objet {
	constructor(poids, valeur) {
		this.poids = poids;
		this.valeur = valeur;
	}
}

let objets = [new Objet(5, 2), new Objet(3, 6), new Objet(2, 5)];
// pour la création automatique décommenter cette partie
// Create random objets
// for (let i = 0; i < Math.floor(Math.random() * 15) + 4; i++) {
// 	const gain = Math.floor(Math.random() * 10) + 1;
// 	const poids = Math.floor(Math.random() * 10) + 1;
// 	objets.push(new Objet(poids, gain));
// }

objets.forEach((obj, index) => {
	const tr = document.createElement("tr");
	const num = document.createElement("td");
	num.appendChild(document.createTextNode(index + 1));
	tr.appendChild(num);

	const poids = document.createElement("td");
	poids.appendChild(document.createTextNode(obj.poids));
	tr.appendChild(poids);

	const gain = document.createElement("td");
	gain.appendChild(document.createTextNode(obj.valeur));
	tr.appendChild(gain);
	objetsTable.appendChild(tr);
});

const [optimal, matrice] = sacADos(objets);

document.querySelector(".result span").innerHTML = optimal;

const matriceTable = document.querySelector(".matrice table");

const tr0 = document.createElement("tr");
const th0 = document.createElement("th");
tr0.appendChild(th0);

for (let i = 0; i <= PMAX; i++) {
	const th = document.createElement("th");
	th.appendChild(document.createTextNode(i));
	tr0.appendChild(th);
}
matriceTable.appendChild(tr0);

matrice.forEach((row, index) => {
	const tr = document.createElement("tr");
	const objNum = document.createElement("th");
	objNum.appendChild(document.createTextNode(index));
	tr.appendChild(objNum);
	row.forEach((column) => {
		const td = document.createElement("td");
		td.appendChild(document.createTextNode(column));
		tr.appendChild(td);
	});
	matriceTable.appendChild(tr);
});
