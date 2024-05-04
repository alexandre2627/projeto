 let currentpageurl ='https://swapi.dev/api/planets/' 

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
        
        responseJson.results.forEach((planet) => {
          const card = document.createElement("div")
          card.style.backgroundImage = 
          `url('https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g,"")}.jpg')`
          card.className = "cards"

          

          const planetnamebg = document.createElement("div")
          planetnamebg.className ="planet-name-bg";

          const planetname = document.createElement("spam")
          planetname.className = " planet-name"
           planetname.innerText = `${planet.name}`;


          planetnamebg.appendChild(planetname)
          card.appendChild(planetnamebg)



         card.onclick = () => {
            const modal = document.getElementById("modal")
            modal.style.visibility = "visible"

            const modalcontent = document.getElementById("modal-content")
            modalcontent.innerHTML = ''

            const planetimage = document.createElement("div")
            planetimage.style.backgroundImage =  
            `url('https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g,"")}.jpg')`
           planetimage.className = "planet-image"
           
          const name = document.createElement("spam")
          name.className = "planet-details"
          name.innerText = `nome: ${planet.name}` 

          const diameter = document.createElement("spam")
          diameter.className = "planet-details"
          diameter.innerText = `diametro: ${planet.diameter}`  
          
          const climate = document.createElement("spam")
          climate.className = "planet-details"
          climate.innerText = `clima: ${planet.climate}` 

          
          const gravity = document.createElement("spam")
          gravity.className = "planet-details"
          gravity.innerText = `gravidade: ${planet.gravity}` 


          const terrain = document.createElement("spam")
          terrain.className = "planet-details"
          terrain.innerText = `terreno: ${planet.terrain}` 



           modalcontent.appendChild(planetimage);
           modalcontent.appendChild(name);
           modalcontent.appendChild(diameter);
           modalcontent.appendChild(climate);
           modalcontent.appendChild(gravity);
           modalcontent.appendChild(terrain);
           
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