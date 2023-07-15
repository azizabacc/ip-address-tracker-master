import { apiKey } from "./config.js";
const mobileDesign = window.matchMedia("(max-width: 375px)");
const desktopDesign = window.matchMedia("(min-width: 376px)");
const header = document.querySelector('header');
//call resumeBOrd Children
let ipValue = '81.164.31.173';
let ipAdress = document.getElementById('ipAdress');
let location = document.getElementById('location');
let timezone = document.getElementById('timezone');
let isp = document.getElementById('isp');
// function to update resumeBord
const updateResumeBord = (data) =>{
  ipAdress.innerText = data.ip;
  location.innerText = `${data.location.city} ${data.location.country} ${data.location.postalCode}`;
  timezone.innerText = 'UTC '+data.location.timezone;
  isp.innerText = data.isp;

}
///////////////header backgroud Image///////////////////
const changeBackgroundImage = () =>{
    if(mobileDesign.matches){
        header.style.backgroundImage='url(images/pattern-bg-mobile.png)'
      
    }  else{
        header.style.backgroundImage ='url(images/pattern-bg-desktop.png)'
    }
}
// Call the initial function to set the background image on the initial page load
changeBackgroundImage();

// Add event listeners for screen size changes
mobileDesign.addListener(changeBackgroundImage);
desktopDesign.addListener(changeBackgroundImage);


// map generation
const map = L.map('map').setView([51.505, -0.09], 13); // Remplacez les coordonnées et le niveau de zoom selon vos besoins
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);
///////////fetch geo api ///////////////////////
export const forecast = () =>{ 
    let forecastApi = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipValue}`;
    fetch(forecastApi)
    .then(response => response.json())
    .then(data=> {
      updateResumeBord(data);
// Exemple de marqueur pour illustrer la position
const marker = L.marker([51.5, -0.09]).addTo(map); // Remplacez les coordonnées du marqueur selon vos besoins
marker.bindPopup(`<strong>IP: </strong>${data.ip}<br>
                 <strong>Country: </strong>${data.location.country}<br>
                 <strong>Region: </strong>${data.location.region}<br>
                 <strong>Timezone: </strong>UTC ${data.location.timezone}<br>
                 <strong>ISP: </strong>${data.isp}<br>
                 <strong>AS Name: </strong>${data.as.name}<br>`).openPopup();
})

.catch(error => {
  console.log('There was an error!', error);
});

}
forecast();
///add event listner to arrow button on click and input when press on Enter////

const submit = document.getElementById('arrowContainer');
const input = document.getElementById('input')
const update = () =>{

  ipValue = input.value;
  forecast();
}
submit.addEventListener('click',update)
input.addEventListener("keypress",(event) =>{
  if (event.key === "Enter") {
    update();
 
  }
});

