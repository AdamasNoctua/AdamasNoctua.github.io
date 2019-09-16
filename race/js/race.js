let racers = [];

let colors = ["#E53935", "#FB8C00", "#FDD835",
    "#43A047", "#00ACC1", "#3949AB",
    "#8E24AA"];

/**
 * Whether or not there's an ongoing race. Used to prevent interval from additional activating.
 */
let isRace = false;

/**
 * Racer Class
 */
class Racer{
    constructor(name, colorId=0){
        this.name = name;
        this.progress = 0;
        this.colorId = colorId;
    }

    getHtml(){
        return `<div class="race-item" id="item-${this.name}"><h3>${this.name}</h3>
        <span class="remove-button" title="Remove" onclick="removeRacer(\'${this.name}\')">X</span>
        <div class="progress-container">
        <div class="progress" style="background: ${colors[this.colorId]}" id="progress-${this.name}"></div></div></div>`
    }

    move(){
        this.progress += Math.floor(Math.random() * 50)/100;
        if(this.progress > 100) this.progress = 100;
        el(`progress-${this.name}`).style.width = this.progress + '%'
    }

    reset(){
        this.progress = 0;
        el(`progress-${ this.name}`).style.width = '0%';
    }
}


/**
 * Add Racer to the track
 */
function addRacer() {
    let name = el('name-input').value.trim();
    if(racers.filter(obj => {return obj.name === name}).length > 0 || name === '') return;
    racers.push(new Racer(name, racers.length % colors.length));
    console.log(racers);
    updateTrack();
    el('name-input').value = '';
}

/**
 * Remove Racer from the track
 * @param racerName
 */
function removeRacer(racerName) {
    racers = racers.filter(obj => {
        return obj.name !== racerName
    });
    updateTrack()
}

/**
 * Update track's HTML
 */
function updateTrack() {
    el('track').innerHTML = '';
    racers.forEach(racer => {
        el('track').innerHTML += racer.getHtml();
    })
}

/**
 * Start the race
 */
function run() {
    if(isRace || racers.length === 0) return;
    isRace = true;
    resetRacers();
    let interval = setInterval(tick, 10);
    function tick() {
        racers.forEach(racer => {
            if(racer.progress >= 100){
                clearInterval(interval);
                isRace = false;
                el('message').style.color = colors[racer.colorId];
                el('message').innerHTML = racer.name + ' won!';
            }
            else{
                racer.move();
            }
        })
    }
}

/**
 * Reset Racers to 0
 */
function resetRacers() {
    el('message').innerHTML = '';
    racers.forEach(racer => {
        racer.reset();
    })
}

document.addEventListener('DOMContentLoaded', ()=>{
   el('name-input').onkeypress = e => {
       if(e.key === 'Enter'){
           addRacer();
       }
   }
});