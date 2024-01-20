// * =======>> When Start =======>> //

const searchParams = location.search      /// ?id=555

const params = new URLSearchParams(searchParams);

const id = params.get('id');

const mode = document.getElementById('mode');

if (localStorage.getItem('theme') != null){
    const themeData = localStorage.getItem('theme');
    if (themeData === 'light') {
        mode.classList.replace('fa-sun', 'fa-moon')
    }else{
        mode.classList.replace('fa-moon', 'fa-sun')
    }
    document.querySelector('html').setAttribute('data-theme',themeData)

}



(async function(){                // self invoked function
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd49a312524msh9eb3b38fc8006c5p15448ajsn23bb897fb111',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    let api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options)
    let response = await api.json()

    displayData(response)
    // document.getElementById('detailsPage').style.backgroundImage = response.thumbnail
})()

function displayData(gamesData){
    let game = `
            <div class="col-md-4">
                <img src="${gamesData.thumbnail}" class ="rounded-2" alt="">
            </div>
            <div class="col-md-8">
                <div class="header d-flex">
                    <a href="./home.html" class="me-2 myHome text-decoration-underline">Home</a>
                    <h5>/</h5>
                    <h5 class="ms-2 text-primary">${gamesData.title}</h5>
                </div>
                <h1>${gamesData.title}</h1>
                <h3>About ${gamesData.title}</h3>
                <p>${gamesData.description}</p>
            </div>
    `;

    document.getElementById('gameBox').innerHTML = game;
    document.body.style.cssText = `
        background-image: linear-gradient(#272729be 0% 100%) ,url('${gamesData.thumbnail}');
        background-size: cover;
        background-position: center;    
    `
}

function myMode(){
    if (mode.classList.contains("fa-sun")) {
        document.querySelector("html").setAttribute("data-theme", "light");
        mode.classList.replace("fa-sun", "fa-moon"); // change icon -->moon
    
        localStorage.setItem("theme", "light");
    } 
    else {
        mode.classList.replace("fa-moon", "fa-sun"); //change icon -->sun
        document.querySelector("html").setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    }
}



