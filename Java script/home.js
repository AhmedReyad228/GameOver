// ! =======>> Variables (Elements) =======>> //

const logOut = document.getElementById('logOut');
const loader = document.querySelector('.loading');

const mode = document.getElementById('mode')

if (localStorage.getItem('theme') != null){
    const themeData = localStorage.getItem('theme');
    if (themeData === 'light') {
        mode.classList.replace('fa-sun', 'fa-moon')
    }else{
        mode.classList.replace('fa-moon', 'fa-sun')
    }
    document.querySelector('html').setAttribute('data-theme',themeData)

}

// ? ===========>> Events ================>> //

document.getElementById('logOut').addEventListener('click', function(){
    localStorage.removeItem('uToken')
    location.href = './index.html'
})

document.querySelectorAll('.menu .nav-link').forEach(function(link){
    link.addEventListener('click', function(){
        document.querySelector('.menu .active').classList.remove('active')
        link.classList.add('active')
        const category = link.getAttribute('data-category');

        getGames(category);
    })
})

// * ===========>> Functions =============>> //

getGames('MMORPG');

async function getGames(categoryData){

    loader.classList.remove('d-none')
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd49a312524msh9eb3b38fc8006c5p15448ajsn23bb897fb111',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryData}`, options);
    const response = await api.json()

    displayData(response)
    loader.classList.add('d-none')
}

function displayData(gamesData){
    let gamesBox = ``;

    

    for (let i = 0; i < gamesData.length; i++) {
        let videoPath = gamesData[i].thumbnail.replace('thumbnail.jpg', 'videoplayback.webm')


        gamesBox += `
        <div class="col">
        <div onclick = "goToDetails(${gamesData[i].id})" onmouseenter = "startVideo(event)" onmouseleave = "stopVideo(event)" class="card h-100 bg-transparent" role="button" >
           <div class="card-body">
  
              <figure class="position-relative">
                 <img class="card-img-top object-fit-cover h-100" src="${gamesData[i].thumbnail}" />
  
               <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
                <source src="${videoPath}">
                </video>
  
              </figure>
  
              <figcaption>
  
                 <div class="hstack justify-content-between">
                    <h3 class=" small">${gamesData[i].title}</h3>
                    <span class="badge text-bg-primary p-2">Free</span>
                 </div>
  
                 <p class=" card-text small text-center opacity-50">
                    ${gamesData[i].short_description}
                 </p>
  
              </figcaption>
           </div>
  
           <footer class="card-footer small hstack justify-content-between">
  
              <span class="badge badge-color">${gamesData[i].genre}</span>
              <span class="badge badge-color">${gamesData[i].platform}</span>
  
           </footer>
        </div>
     </div>
        `;
    }
    document.getElementById('gameData').innerHTML = gamesBox;
}


function startVideo(event){
    const videoL = event.target.querySelector('video');
    videoL.classList.remove('d-none')
    videoL.muted = true
    videoL.play();
}

function stopVideo(event){
    const videoL = event.target.querySelector('video');
    videoL.classList.add('d-none')
    videoL.muted = true
    videoL.pause();
}

function goToDetails(id){
    location.href = `./details.html?id=${id}`;
}

function myMode(){
    if (mode.classList.contains("fa-sun")) {
        document.querySelector("html").setAttribute("data-theme", "light");
        mode.classList.replace("fa-sun", "fa-moon");
    
        localStorage.setItem("theme", "light");
    } 
    else {
        mode.classList.replace("fa-moon", "fa-sun");
        document.querySelector("html").setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    }
}


