let hamburger = document.querySelector('.hamburger')
let nav = bodymovin.loadAnimation({
    container: hamburger,
    remderer: 'svg',
    loop: false,
    autoplay: false,
    path: HAMBURGER,
    mode:"cursor", 
})

var directionMenu = 1;  
    hamburger.addEventListener('click', (e) => {
    nav.setDirection(directionMenu);
    nav.play();
    directionMenu = -directionMenu;
});


const hambuerMenu = document.getElementById('hamburgerMenu')
hambuerMenu.addEventListener('click', (e) => {
        const popup = document.querySelector('.popup')
        popup.classList.toggle('hidden')
    })


// hero zoom animation 

const zoomElement = document.querySelector(".zoom");
let zoom = 110;
const ZOOM_SPEED = 1;

document.addEventListener("wheel", function(e) {  
    if(e.deltaY > 0 ){    
        zoomElement.style.backgroundSize = `${zoom += ZOOM_SPEED}%`; 

    }else if (e.deltaY < 0 ) {    
        zoomElement.style.backgroundSize = `${zoom -= ZOOM_SPEED}%`;
        if(zoom <110){
            zoom=110
        }
    }
});

// FIN DEL HERO ZOMM ANIMATION


