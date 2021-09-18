/**
 * Va contenir le formulaire de consultation
 */
const form = document.getElementById('consulationForm');
/**
 * Toutes les pages de notre formulaire
 */
 const steps = document.querySelectorAll(".step");
 /**
  * Va contenir les Alert du formulaire
  */
 const alert = document.querySelector(".alert");
 
 
/**
 * Tous les buttons du formulaire
 */
const buttons = document.querySelectorAll(".btn-container button");
const prevBtn = buttons[0];
const nextBtn = buttons[1];

/** 
 * Va contenir le numero de la page courante
 *  @type {number} */
let currentPage = 0;

/**
 * Le conteneur des indicateurs des pages
 */
const header = document.querySelector(".form-footer");
let indicators = header.querySelectorAll('a');

/**
 * Va contenir les donner du formulaire
 *  @type {Object} */
const formData ={};

window.onload =()=>{
    header.innerHTML="";
    steps.forEach((page, index) => {
        let elementLink = document.createElement("a");
        elementLink.href = "#";
        elementLink.classList.add("page-num");
        elementLink.id = `page-num#page${index}`;
        elementLink.textContent = index + 1;
        header.appendChild(elementLink);
      });
      indicators = header.querySelectorAll('a');
}
/**
 * @description Va permettre de se deplacer dans les differentes etapes de la page
 * @author Arick
 * @param {number} n  La page courrante
 * @returns {Boolean}
 */
const move =(n)=>{
    // 01. On stop le deplacement si le formulaire n'est pas valid
    if(n===1 && !validateForm()) return false;

    // 02. On enleve la page courrant pour passer à la page suivante
    steps[currentPage].style.display="none";
    steps[currentPage].classList.remove="active";

    // 03. On incremente l'indice de la page courrante
    currentPage +=n;

    // 04. On soummet le formulaire et on stop La consulation si le button submit est cliquer
    if(currentPage >=steps.length){
        form.submit();
        // On stop le scrip
        return false;
    }

    // 05. On affiche la page suivante
    showStep(currentPage)

}

/**
 * @description Va permettre de valider le formulaire de la page courrante
 * @author Arick
 */
const validateForm = ()=>{
    formData[steps[currentPage].id]={}
    // 01. On initialise les données
    let inputsText= steps[currentPage].querySelectorAll('input[type="text"],input[type="number"],.form-group textarea');
    let inputsDate = steps[currentPage].querySelectorAll('input[type="date"]');
    let inputsTime = steps[currentPage].querySelectorAll('input[type="time"]');
    let inputsCheck= steps[currentPage].querySelectorAll('input[type="checkbox"],input[type="radio"]');
    let selectInput = steps[currentPage].querySelectorAll('.form-group select');
    if(selectInput){
        selectInput.forEach(select=>{
            select.addEventListener('input',(e)=>{
                
                formData[steps[currentPage].id][select.name]= e.target.value;
            })
        })
    }
    /** @type {Boolean} valid  Pour permettre de valider le formulaire à la fin*/
    let valid = true;
    
    // 02. On verifie si tous les inputs ne sont pas vide
    // A. Les inputs de type date
    if(inputsDate && inputsDate.length>0){

        let validDate=false;
        validDate= TestInputValid(
            inputsDate,
            /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/gm,valid,"date");
            
        if(!validDate){
            valid =false;
        }
    }
    // Test de checkbox
    if(inputsCheck.length >0){
        let validCheck = false;
        validCheck = TestInputValid(inputsCheck,false,valid,'checkbox','Cocher la bonne case');
        if(validCheck){
            valid =false;
        }
    }
    // B. Les inputs de type text et nombre
    if(inputsText.length>0){

        let validText=false;
        validText =TestInputValid(inputsText,false,valid);
        if(!validText){
            valid =false;
        }
    }

    // 03. Si tous va bien on continus le deplacement
    if(valid){
        indicators[currentPage].classList.add('finish');

    }else{
        
      const alertError = document.createElement("div");
      alertError.classList.add("alert-error");
      alertError.textContent = "Veuillez remplir correctement le formulaire";
      alert.appendChild(alertError);
      setTimeout(() => alert.removeChild(alertError), 2500);
      indicators[currentPage].classList.remove('finish');
    }
    
    console.table(formData);
    return valid;
    
}


/**
 * @description Va valider les inputs de chaque type et personnalise les erreurs
 * @author Arick
 * @param {Array} inputsDataVerify Les inputs à traiter
 * @param OtherCondition  La seconde condtion
 * @param {boolean} valid  La validation
 * @param {string} [typeInput="text"] Le type d'input à trqiter
 * @param {string} [message='Champ invalide']   Le message si erreur
 */
const TestInputValid =(inputsDataVerify,OtherCondition,valid,typeInput="text",message='Champ invalide',)=>{
        inputsDataVerify.forEach(input=>{

            let alertInput = input.parentElement.parentElement
            let value = input.value;
            let condition=value.length <2 || value=='';

            if(typeInput !="text" && typeInput!="number"){
                condition = OtherCondition;
            }
            if(typeInput =="date"){
                let date = new  Date(value).toLocaleDateString("fr-FR",{
                    year:'numeric',
                    month:'numeric',
                    day:'numeric'
                });
                value = date;
                condition = !OtherCondition.test(value);
            }
            if(typeInput=='checkbox' || typeInput=="radio"){
                condition = !input.checked || input.value.length <2;
            }
            if(condition){
                input.classList.add('invalid');
                if(alertInput.classList.contains('radio')&& alertInput.classList.contains('switch')){
                    alertInput = alertInput.parentElement;
                }
                alertInput.classList.add('error');
                span = alertInput.querySelector('.alert-container span');
                span.textContent = message;
                valid =false;

            }else{
                alertInput.classList.remove('error');
                input.classList.remove('invalid');
                formData[steps[currentPage].id][input.name]= input.value;
            }
        });
    return valid;
}
/**
 * @description Permet d'afficher la page courrante
 * @author Arick
 * @param {number} indexPage Le numero de la page courrante à afficher
 */
const showStep =(indexPage)=>{
    // 01. 0n affiche la page suivante à l'index IndexPage
    steps[indexPage].style.display="initial";
    steps[indexPage].classList.add("active");

    // 02. On modifie le boutton charger de la modification de la page courrante
    // Ie si on est sur la premiere page on efface le button 'Precedent';
    if(indexPage==0){
        prevBtn.style.display='none';
    }else{
        prevBtn.style.display='initial';
    }
    if(indexPage>=(steps.length - 1)){
        nextBtn.type='submit';
        nextBtn.textContent='Valider';
    }else{
        nextBtn.type='button';
        nextBtn.textContent='Next';
    }

    // 03. On modifie l'indicacteur de la page courrante;
    stepIndicator(indexPage);
}

/**
 * @description Permet modifie l'indicacteur de la page courrante;
 * @author Arick
 * @param {number} indexIndicator le numero de l'indicateur à modifier
 */
const stepIndicator = (indexIndicator)=>{
    // 01. On enleve le style de la classe "active"
    indicators.forEach((value,key)=>{
        indicators[key].className = indicators[key].className.replace(' active','');
    })
    
    indicators[indexIndicator].classList.add('active');
}
// On recupere les donnée du formulaire
// On affiche la premiere page
showStep(currentPage);
prevBtn.addEventListener('click',()=>{
    move(-1);
})
nextBtn.addEventListener('click',()=>{
    move(1);
});
