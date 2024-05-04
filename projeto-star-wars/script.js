    let currentpageurl ='https://swapi.dev/api/people/' 

    window.onload = async () => {
    try {
        await loadcharacters(currentpageurl);     
    } catch (error) {
     console.log(error);
     alert('erro ao carregar cards');
    }
    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button') 

    nextButton.addEventListener('click', loadnextpage) 
    backButton.addEventListener('click', loadpreviouspage)   
    };
    async  function loadcharacters(url){
    const maincontent = document.getElementById('main-content') 
    maincontent.innerHTML = ''; //limpa os resultados anteriores
    
    try {
 
        const response = await fetch(url); 
        const responseJson =  await response.json();
        
        responseJson.results.forEach((character) => {
          const card = document.createElement("div")
          card.style.backgroundImage = 
          `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g,"")}.jpg')`
          card.className = "cards"

          

          const chareternamebg = document.createElement("div")
          chareternamebg.className ="chareter-name-bg";

          const charetername = document.createElement("spam")
          charetername.className = "character-name"
          charetername.innerText = `${character.name}`;


          chareternamebg.appendChild(charetername)
          card.appendChild(chareternamebg)



         card.onclick = () => {
            const modal = document.getElementById("modal")
            modal.style.visibility = "visible"

            const modalcontent = document.getElementById("modal-content")
            modalcontent.innerHTML = ''

            const characterimage = document.createElement("div")
            characterimage.style.backgroundImage =  
            `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g,"")}.jpg')`
           characterimage.className = "character-image"
           
          const name = document.createElement("spam")
          name.className = "character-details"
          name.innerText = `nome: ${character.name}` 

          const characterHeight = document.createElement("spam")
          characterHeight.className = "character-details"
          characterHeight.innerText = `altura: ${convertHeight(character.height)}` 

          const mass = document.createElement("spam")
          mass.className = "character-details"
           mass.innerText = `peso: ${convertmass(character.mass)}`
            
           const eyecolor = document.createElement("spam")
           eyecolor.className = "character-details"
            eyecolor.innerText = `cor dos olhos: ${convertEyeColor(character.eye_color)}`;

            const birthyear = document.createElement("spam")
            birthyear.className = "character-details"
            birthyear.innerText = `nascimento: ${convertbirthyer(character. birth_year)}`
         
           modalcontent.appendChild(characterimage);
           modalcontent.appendChild(name);
           modalcontent.appendChild(characterHeight);
           modalcontent.appendChild(mass);
           modalcontent.appendChild(eyecolor);
           modalcontent.appendChild(birthyear);
         }   
          
          maincontent.appendChild(card)
        });
        
     
        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')
        
        
        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous
        
       backButton.style.visibility = responseJson.previous? "visible" : "hidden"
       nextButton.style.visibility= responseJson.next ? "visible": "hidden"
        currentpageurl = url

       }catch (error)  {
        alert('erro ao carregar os personagens')
        console.log(error)
      }
      }

      async function loadnextpage() {
      if (!currentpageurl) return;
      
      try {
      const response = await  fetch(currentpageurl)
      const responseJson = await  response.json()
      await loadcharacters(responseJson.next)
      } catch (error){
        console.log(error)
        alert('Erro ao carregar a próxima pagina')
      }
      }

    async function  loadpreviouspage() {
    if (!currentpageurl) return;

    try {
    const response = await fetch(currentpageurl)
    const responseJson = await  response.json()

    await loadcharacters(responseJson.previous)

    } catch (error){
        console.log(error)
        alert('erro ao carregar a pagina anterior')
    }
    }
    function hidemodal() {
        const modal = document.getElementById("modal") 
        modal.style.visibility = "hidden"  
    } 

     function convertEyeColor(eyecolor) {
      const cores = {
        blue: "azul",
        brown: "castanho",
        greem: "verde",
        yellow: "amarelo",
        black: "preto",
        pink: "rosa",
        red: "vermelho",
        orange: "laranja",
        hazel: "avela",
        unknown: "desconhecida",
      };

      return cores[eyecolor.toLowerCase()] || eyecolor;
     }

     function convertHeight(height) {
      if  (height === "unknown") {
        return "desconhecida"
      }
      return (height / 100).toFixed(2);
     }

     function convertmass(mass) {
      if (mass === "unknown") {
        return "desconhecido"
      }

      return  `${mass} kg`
     }

     function convertbirthyer(birthyear) {
      if (birthyear === "unknown") {
       return "desconhecido"
     }

     return birthyear
    }