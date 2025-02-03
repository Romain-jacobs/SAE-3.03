// fonction pour convertir les ventes en nombres flottants
function ventesFlotantes(ventes) {
    return parseFloat(ventes.replace(/[^\d,]/g, '').replace(',', '.'));
}

// Fonction qui extrait du fichier data, les top 15
function top15(data) {
    const resultat = {};

    for (const annee in data) {
        const jeux = Object.entries(data[annee]).map(([nom, details]) => ({
            nom,
            ventes: ventesFlotantes(details.ventes),
        }));

        resultat[annee] = jeux.slice(0, 15);
    }

    return resultat;
}

// Générer les boutons pour chaque année
const boutons = document.querySelector('#buttons');
for (const annee in jeu) {
    const click = document.createElement('button');
    click.textContent = annee;
    click.classList.add('buttons');
    click.onclick = () => {
        afficherTop15Annee(annee);
        lancerAnimationKarts(annee);
    };
    boutons.appendChild(click);
}

// Fonction pour afficher le top 15 d'une année spécifique
let anneeSelectionnee = null;

function afficherTop15Annee(annee) {
    anneeSelectionnee = annee;
    const resultat = document.querySelector('#results');
    resultat.innerHTML = '';
}

// Script pour placer les karts en fonction des ventes dans l'ordre croisant
function lancerAnimationKarts(annee, ordre) {
    const karts = document.querySelectorAll('.premier');
    const jeux = Object.values(jeu[annee]);
    const ventes = jeux.map(jeu => ventesFlotantes(jeu.ventes));
    const minVentes = Math.min(...ventes);
    const maxVentes = Math.max(...ventes);

    // Trier les karts par ventes croissantes
    const triKart = Array.from(karts);
    triKart.sort((a, b) => {
        const ventesA = ventesFlotantes(jeux[triKart.indexOf(a) % jeux.length].ventes);
        const ventesB = ventesFlotantes(jeux[triKart.indexOf(b) % jeux.length].ventes);
        return ordre === 'asc' ? ventesA - ventesB : ventesB - ventesA;
    });

    triKart.forEach((kart, index) => {
        const ventesActuelles = ventesFlotantes(jeux[triKart.indexOf(kart) % jeux.length].ventes);
        const pourcentage = ((ventesActuelles - minVentes) / (maxVentes - minVentes)) * 150;

        if (ventesActuelles === minVentes) {
            kart.style.animation = 'none';
        } else {
            kart.style.offsetDistance = pourcentage + '%';
            kart.style.animation = 'move '+pourcentage +'s linear';
            kart.style.animationDelay = index * 0.6 + 's'; 
        }
    });
}

// Script pour récuperer les données des jeux et les liés aux karts pour pouvoir afficher les détails
const karts = document.querySelectorAll(".kart");
karts.forEach((kart, index) => {
    kart.addEventListener("click", () => {
        if (anneeSelectionnee) {
            const jeuAnnee = Object.values(jeu[anneeSelectionnee]);
            if (jeuAnnee[index]) {
                afficherDetailsJeu(jeuAnnee[index]);
            }
        }
    });
});

// Script pour afficher les détails d'un jeu
function afficherDetailsJeu(jeu) {
    const details = `
        <h2>${jeu.nom}</h2>
        <p>Ventes: ${jeu.ventes || 'Non disponible'}</p>
        <p>Date de sortie: ${jeu["date de sortie"] || 'Non disponible'}</p>
        <p>Type de jeu: ${jeu["type de jeu"] || 'Non disponible'}</p>
        <p>Développeur: ${jeu.dev || 'Non disponible'}</p>
        <p>Éditeur: ${jeu.editeur || 'Non disponible'}</p>
        <p>Plateforme: ${jeu.plateforme || 'Non disponible'}</p>
        <p>Univers: ${jeu.univers || 'Non disponible'}</p>
    `;
    document.querySelector("#details").innerHTML = details;
}

// Script pour que les karts avancent chacun leur tour
document.addEventListener("DOMContentLoaded", () => {
    const attente = document.querySelectorAll('.premier');
    attente.forEach((element, index) => {
        element.style.animationDelay = index * 0.6 + 's';
    });
});


// script pour que quand on scroll vers le bas que le pacman mange vers le bas et quand on scroll vers le haut qu'il mange vers le haut
document.addEventListener("DOMContentLoaded", () => {
    const pacman = document.querySelector(".pacman");
    let dernierscroll = window.scrollY;

    window.addEventListener("scroll", () => {
        const scrollActuel = window.scrollY;

        if (scrollActuel > dernierscroll) {
            pacman.style.transform = "rotate(90deg)";
        } else {
            pacman.style.transform = "rotate(-90deg)";
        }

        dernierscroll = scrollActuel;
    });
});

// Script pour cocher le premier cube pour etre trié en ordre croissant
document.querySelector(".cube1").addEventListener("click", cocher);

function cocher() {
    const img1 = 'img/cube-vide.png'; 
    const img2 = 'img/cube-rempli.png'; 

    const image = document.querySelector('.cube1');
    if (image) {
        if (image.src.includes(img1)) {
            image.src = img2;
        } else if (image.src.includes(img2)) {
            image.src = img1;
        }
    }
};

// Script pour cocher le premier cube pour etre trié 
document.querySelector(".cube2").addEventListener("click", cocher1);

function cocher1() {
    const img1 = 'img/cube-vide.png'; // Remplacez par le chemin de votre image1
    const img2 = 'img/cube-rempli.png'; // Remplacez par le chemin de votre image2

    const image1 = document.querySelector('.cube2');
    if (image1) {
        if (image1.src.includes(img1)) {
            image1.src = img2;
        } else if (image1.src.includes(img2)) {
            image1.src = img1;
        }
    }
};