const cheminBack = 'http://localhost:4000/?controller=tache&action=';

/*----------fetch------------------*/

const container = document.querySelector('.container');
const archive=document.querySelector('.archive');
const iconeArchive=document.querySelector('.fa-box-archive');
const ajoutColonne = document.getElementById("ajout-colonne");
const bntAjouterTache =document.getElementById('bntAjouterTache');
const btntache = document.getElementById("tache");
const modalContainer = document.querySelector('.modal-container');
const closeModal = document.querySelector('.close-modal');
const colonneArchive=document.querySelector('.colonne-archive');
const colonnes= document.getElementsByClassName('colonne');
const error = document.querySelector('.error');
const errorDate=document.querySelector('.errorDate');
const errorTime=document.querySelector('.errorTime');
const textarea = document.getElementById('textarea');
const right = document.querySelector('.right');
const left = document.querySelector('.left');
const notif=document.querySelector('.notif');
const btnAnnuler = document.querySelector('#btn-annuler');
const btnValider = document.querySelector('#btn-valider');
const icone1=document.querySelector('.icone1');
const icone2=document.querySelector('.icone2');
const etat = document.querySelector('.etat');

const content = document.createElement('div');
content.className="content";
container.appendChild(content);

let nbr = 0;
let numId = 1;

tabColor=[
    "#F6BAFF",
    "#B2A2DE",
    "#C0D1F5",
    "#A2D7DE",
    "#9BDEBC",
    "#E980FF",
    "#896FDE",
    "#86ACF5",
    "#CEEAF0",
    "#3F6770",
    "#A2B8BD",
    "#2E86C1"    
]

/*-------------------------Functions----------------------------*/

function createColonne(){
    var colonne = document.createElement('div');
    var titre = document.createElement('h2');
    var icone = document.createElement('i');
    
    icone.className="delete-colonne"
    icone.innerHTML=`&times;`;
    colonne.className="colonne";
    colorColonne(colonne,titre) ;
    colonne.style.backgroundImage="url('monLogo.png')";
    titre.className="header-colonne";
    titre.innerHTML="colonne" + " " + nbr;
    
    if(colonnes.length < 5) {
        colonne.appendChild(titre);
        content.appendChild(colonne);
        titre.appendChild(icone); 
    } 
    icone.addEventListener('click',()=>{
        notification(colonne,'Voulez-vous vraiment supprimmer cette colonne ?');         
    });

    titre.addEventListener('dblclick',()=>{
        titre.contentEditable=true;
    });
}

function colorColonne(colonne,titre){
    if (nbr==1) {
        colonne.style.backgroundColor=tabColor[2];
        titre.style.backgroundColor=tabColor[7];
    } else if (nbr==2) {
        colonne.style.backgroundColor=tabColor[1];
        titre.style.backgroundColor=tabColor[6];
    } else if (nbr==3) {
        colonne.style.backgroundColor=tabColor[4];
        titre.style.backgroundColor=tabColor[8];
    } else if (nbr==4) {
        colonne.style.backgroundColor=tabColor[0];
        titre.style.backgroundColor=tabColor[5];
    }else{
        colonne.style.backgroundColor=tabColor[3];
        titre.style.backgroundColor=tabColor[9];
    }
}

function recupValueModal(){

    let valueModal = document.createElement('div');
    let top = document.createElement('div');
    let left = document.createElement('div');
    let right = document.createElement('div')
    let tache = document.createElement('div');
    let tacheContent = document.createElement('div');
    let date = document.createElement('div');
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');
    let icone1 = document.createElement('i');
    let icone2 = document.createElement('i');

    valueModal.className="value-modal";
    valueModal.setAttribute('id',"id" + numId);
    span1.className="jour";
    span2.className="debut";
    span3.className="fin";
    top.className="top";
    icone1.innerHTML=`&#9940;`;
    icone2.innerHTML=`&#8635;`;
    icone1.className="icone1";
    icone2.className="icone2";
    left.className="left";
    left.innerHTML=`&#8606;`;
    right.className="right";
    right.innerHTML=`&#8608;`;
    tache.className="tache";
    date.className="date";
    tacheContent.className="tacheContent";
    colonnes[0].appendChild(valueModal);
    tache.innerHTML=`<pre>` + document.form[0].value + `</pre>`;
    span1.innerHTML=document.form[1].value;
    span2.innerHTML=document.form[2].value;
    span3.innerHTML=document.form[3].value;
    date.append(span1,span2,span3);
    top.append(icone1,icone2);
    tacheContent.append(top,left,tache,right)
    valueModal.append(tacheContent,date);

    right.addEventListener('click',()=>{    
        if (valueModal.parentElement.nextSibling != null) {
        valueModal.parentElement.nextSibling.appendChild(valueModal);
        }
    }); 
    left.addEventListener('click',()=>{
        if (valueModal.parentElement.previousSibling != null) {
            valueModal.parentElement.previousSibling.appendChild(valueModal);
        }    
    });
    icone1.addEventListener('click',()=>{
        notification(valueModal,'Voulez-vous mettre cette tache à la corbeille ?');     
    });
    icone2.addEventListener('click',()=>{
            colonnes[0].appendChild(valueModal);

        })
    span3.addEventListener('dblclick',()=>{
        modalContainer.classList.add("show-modal");
    });
    // colorTask();
}

function notification(div,message) {
    const notif=document.createElement('div');
    const contentNotif=document.createElement('div');
    const bodytNotif=document.createElement('div');
    const headerNotif=document.createElement('div');
    const footerNotif=document.createElement('div');
    let btnAnnuler=document.createElement('button');
    let btnValider=document.createElement('button');

    notif.className="notif";
    contentNotif.setAttribute('class','content-notif');
    bodytNotif.setAttribute('class','body-notif');
    headerNotif.setAttribute('class','header-notif');
    footerNotif.setAttribute('class','footer-notif');
    btnAnnuler.setAttribute('id','btn-annuler');
    btnValider.setAttribute('id','btn-valider');

    headerNotif.innerHTML=`<i class="fa-solid fa-triangle-exclamation"></i>`;
    btnAnnuler.innerHTML="Annuler";
    btnValider.innerHTML="Valider";
    bodytNotif.textContent=message;

    container.appendChild(notif);
    contentNotif.append(headerNotif,bodytNotif,footerNotif);
    footerNotif.append(btnValider,btnAnnuler);
    notif.appendChild(contentNotif);

    btnAnnuler.addEventListener('click',()=>{
        notif.style.display="none";
    });
    btnValider.addEventListener('click',()=>{
        if (colonnes.length > 1 && div != colonnes.firstChild){
            div.remove();
        }else if (colonnes.length==1){
            div.remove();
        }
        notif.style.display="none";
        colonneArchive.appendChild(div);
    });
}

/*--------------------------functions-of-valiadtion-----------------------*/
function validateDate(){
    let current=moment();
    if(moment(current).isAfter(moment(document.form[1].value,'day'))){
        document.form[0].style.border="solid red";
        errorDate.classList.add('show-error');
        e.preventDefault(); 
    }else{
        document.form[1].style.border="solid green";
    }
}
function champsObligatoire(){
        if(document.form[0].value=="") {
            textarea.style.border="solid red";
            error.classList.add('show-error');
            e.preventDefault();    
        }else{
            document.form[0].style.border="solid green";
        }   
}
function validTime(){
    let now = moment().format('HH:mm');
    let first=(document.form[2].value);
    let second=(document.form[3].value);

    if (first < now) {
        document.form[2].style.border="solid red";
        errorTime.classList.add('show-error');
        e.preventDefault();    
    }else{
        document.form[2].style.border="solid green";

    }
    if (first >= second) {
        document.form[3].style.border="solid red";
        errorTime.classList.add('show-error');
        e.preventDefault();    
    }else{
        document.form[2].style.border="solid green";
    }
}
function colorTask() {
    let now=moment().format('HH:mm');
    let first=(document.form[2].value);
    let second=(document.form[3].value);
    let timeGreen=first-now;
    let timeGrey=second-now;
    setTimeout(()=>{
        document.getElementById('id1').style.backgroundColor="green";
    },timeGreen);
    /* setTimeout(()=>{
        document.getElementById('id1').style.backgroundColor="grey";
    },timeGrey); */
}
/*---------------------fetch----------------------*/

etat.addEventListener('click',()=>{
    function saveEtat(cle,mescolonnes,texts,mesdates,debuts,fins) {
        fetch(cheminBack + cle,
        {
            method:"POST",
            body:JSON.stringify({
                colonnes :mescolonnes,
                taches : texts,
                dates : mesdates,
                heures_debut : debuts,
                heures_fin : fins
            })
        })
    }
    let all_columns = [];
    let task = [];
    let dates = [];
    let start = [];
    let end = [];
    const mes_colonnes=document.querySelectorAll('.colonne');
    mes_colonnes.forEach((columns) => 
    {
        if(columns.firstChild.value == undefined)
        {
            all_columns.push(columns.firstChild.innerText);
        }
        else
        {
            all_columns.push(columns.firstChild.value);
        }
        const mes_taches = columns.querySelectorAll('.tache');

        mes_taches.forEach((nom) => 
            {
                task.push(nom.innerText);
            })
        const mes_dates = columns.querySelectorAll('.jour');

        mes_dates.forEach((date) => 
            {
                dates.push(date.innerText);
            })
        const mes_heures_debut = columns.querySelectorAll('.debut');

        mes_heures_debut.forEach((heure_debut) => 
            {
                start.push(heure_debut.innerText);
            })
        const mes_heures_fin = columns.querySelectorAll('.fin');

        mes_heures_fin.forEach((heure_fin) => 
            {
                end.push(heure_fin.innerText);
            })
    })
    saveEtat('ajouter',all_columns,task,dates,start,end);
});

/*-------------------------Events----------------------------*/

ajoutColonne.addEventListener('click',()=>{
    nbr++;
    createColonne();
});
btntache.addEventListener('click',()=>{        
    modalContainer.classList.add("show-modal");
});

closeModal.addEventListener('click',()=>{
    modalContainer.classList.remove("show-modal");
});

bntAjouterTache.addEventListener('click',()=>{
    champsObligatoire();
    validateDate();
    validTime();
    recupValueModal();
    modalContainer.classList.remove("show-modal");
    numId++;
    document.form.reset();
    for (let i = 0; i < form.length; i++) {
        document.form[i].style.border="solid black";
    }
});

iconeArchive.addEventListener('click',(e)=>{
    archive.classList.toggle('show-archive');
});



