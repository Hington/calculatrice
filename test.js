
// couleur calculatrice
let couleurCaculatrice = document.querySelector('.lumiere')
let bodyCaculatrice = document.querySelector('.partie2')

couleurCaculatrice.addEventListener('click',()=>{
    bodyCaculatrice.classList.toggle('lumiere1')
    couleurCaculatrice.classList.toggle('lumiere2')
})

// calcule
let memoireAffichage = document.querySelector('.memoires > .memoire');
let memoire;
let resultatPrecedent = document.querySelector('.resultatPrecedent');
let ecran = document.querySelector('.ecran');

let precedent = 0
let affichage = ''
let operation = null
let afficherPoint = ''


window.onload = ()=>{
    let touchess = document.querySelectorAll('span')
    window.addEventListener('keydown', gererTouche)
    for(let touche of touchess){
        touche.addEventListener('click', gererTouche)
    }
    memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) : 0
    if (memoire != 0) {
        memoireAffichage.style.display = 'initial'
    }
}

function gererTouche(e) {
    let touche;
    let toucheClavier = ["1","2","3","4","5","6","7","8","9","0","+","-","*","/",".","Enter","Delete","Backspace",]

    if (e.type === 'keydown') {
        if (toucheClavier.includes(e.key)) {
            e.preventDefault()
            touche = e.key
        }
    } else{
        touche = this.innerText
    }




    if (touche >= 0) {
        affichage = (affichage === '') ? touche : affichage + touche;

        ecran.innerText = affichage
    } else{
        switch (touche) {
            case '.':
                // declaration de deux  variable de type tableau
                let points = []
                let prendValeurTouche = [touche]
                // attribution de la valeur de prendValeurTouche au tableau points
                points = prendValeurTouche
                // on verifie si la variabe de type tableau (points) contient un '.' et on attribue la valeur à tableauPoint
            let tableauPoint =tableau(points, '.')
            // si tableauPoint = true, on verifie si la vaiable affichagePoint contient un '.'; si oui alors on affiche la valeur de affichage sion on concaténe la valeur d'affichage et la valeur de points (qui es .)
            if (tableauPoint) {
              let affichagePoint = (affichage.includes('.')) ?affichage : affichage + points
            //   on attribu la valeur d'affichagePoint à affichage
              affichage = affichagePoint
              //   on attribu la valeur d'affichage a l'écran
            ecran.innerText = affichage
            }




                break;
            case 'C':
            case 'Delete':

                affichage = ''
                ecran.innerText = 0
                operation = null
                precedent = 0
                resultatPrecedent.innerText = `Hington Code`
                break;
            case 'AC':
            case 'Backspace':
                supprimeUnChiffre = ecran.innerText.slice(0,-1)
                affichage = supprimeUnChiffre
                ecran.innerText = affichage
                break;
                case '+':
                case '-':
                case '*':
                case '/':
                    precedent = (precedent === 0) ? parseFloat(affichage) : calculer(precedent, affichage, operation)
                    ecran.innerText = precedent
                    resultatPrecedent.innerText = `${precedent} ${touche}`
                    affichage = ''
                    operation = touche
                    break;
                case '=':
                case 'Enter':
                    precedent = (precedent === 0) ? parseFloat(affichage) : calculer(precedent, affichage, operation)
                    console.log(precedent);
                    resultatPrecedent.innerText = `${precedent}`
                    ecran.innerText = precedent
                    affichage = precedent
                    precedent = 0

                    break;
                case 'M+':
                    localStorage.memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) + parseFloat(affichage) : parseFloat(affichage)
                    memoireAffichage.style.display = 'initial'
                    break;
                case 'MR':
                    memoire = (localStorage.memoire)? parseFloat(localStorage.memoire) : 0;
                    affichage = memoire
                    ecran.innerText = memoire
                    break;
                case 'MC':
                    localStorage.memoire = 0
                    memoireAffichage.style.display = 'none'
                    break;

            default:
                break;
        }
    }

}

function calculer(nbr_1, nbr_2, operation) {
    nbr_1 = parseFloat(nbr_1)
    nbr_2 = parseFloat(nbr_2)

    if (operation === '+') {
        return nbr_1 + nbr_2
    }
    if (operation === '-') {
        return nbr_1 - nbr_2
    }
    if (operation === '*') {
        return nbr_1 * nbr_2
    }
    if (operation === '/') {
        return nbr_1 / nbr_2
    }
}


function tableau(table, valeur) {
    return table.includes(valeur)
}





