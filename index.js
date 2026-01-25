const searchrow = document.querySelector(".searchrow");
const pokemonName = document.querySelector(".pokemonName");
const pokemoncard = document.querySelector(".pokemoncard");
const btn =document.querySelector(".btn");
const right =document.querySelector(".right");
const middle =document.querySelector(".middle");


btn.addEventListener("click" ,async event =>{

    event.preventDefault();

 
const pokename = pokemonName.value.toLowerCase();

if(pokename){

    try {

        const pokenamedata = await getpokenamedata(pokename);
        displaypokeinfo(pokenamedata);

    }

    catch(error){
        console.error(error);
        displayError(error.message);

    }
}
else{
    displayError("Please enter a pokemon name");
}
});

async function getpokenamedata(pokename){

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokename}`);

    if(!response.ok){
        throw new Error("Could not catch the pokemon");
    }
    return await response.json();
}
function displaypokeinfo(data){

    const{name: pokename,
         weight:weightkg ,
         height: height,
         id: id,
         abilities:[{ability:{name:firstability}}]}= data;
         
         const pokemonSprite=
          data.sprites.other["official-artwork"].front_default ||
          data.sprites.front_default;   
         const imgelement= document.getElementById("pokemonSprite");
         if(!imgelement){
  displayError("Image element not found. Check id='pokemonSprite' in HTML");
  return;
}


         imgelement.src = pokemonSprite;
         imgelement.style.display="block";
         
middle.textContent="";
right.textContent="";




        
         pokemoncard.style.display = "flex";
         
         const displayname = document.createElement("p");
         const displayweight = document.createElement("p");
         const displayheight = document.createElement("p");
         const displayid = document.createElement("p");
         const displayabilities = document.createElement("p");
        
         
const weightKg = (weightkg / 10).toFixed(1);
const heightM = (height / 10).toFixed(1);


         displayname.textContent ="NAME:"+ pokename;
        displayweight.textContent = `WEIGHT: ${weightKg} kg`;
        displayheight.textContent = `HEIGHT: ${heightM} m`;
         displayabilities.textContent = "ABILITY:"+firstability;
         displayid.textContent = "#:"+id;
         
         



displayname.classList.add("displayname");
displayweight.classList.add("displayweight");
displayheight.classList.add("displayheight");
displayid.classList.add("displayid");





middle.appendChild(displayname);
middle.appendChild(displayabilities);
middle.appendChild(displayid);
right.appendChild(displayweight);
right.appendChild(displayheight);



    }

    function displayError(message){
        const errorDisplay =document.createElement("p");
        errorDisplay.textContent = message;
        errorDisplay.classList.add("errorDisplay");

        
        pokemoncard.style.display="flex";
        pokemoncard.appendChild(errorDisplay);
          middle.textContent = "";
  right.textContent = "";
  

  middle.appendChild(errorDisplay);
    }