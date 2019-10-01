/**
 * List of Racer objects
 */
let racers = [];

/**
 * List of available colors
 * @type {*[]}
 */
let colors = ["#E53935", "#FB8C00", "#FDD835",
    "#43A047", "#00ACC1", "#3949AB",
    "#8E24AA"];

/**
 * Whether or not
 * @type {boolean}
 */
let isRace = false;

/**
 * List of available speeds
 * @type {*[]}
 */
let speeds = [[0, 20], [20, 40], [40, 60]];

/**
 * Racer Class
 */
class Racer{
    constructor(name, colorId=0){
        this.name = name;
        this.progress = 0;
        this.colorId = colorId;
        this.speed = speeds[Math.floor(Math.random() * speeds.length)];
        this.section = 0;
    }

    /**
     * Randomly change racer's speed
     */
    change_speed(){
        this.speed = speeds[Math.floor(Math.random() * speeds.length)]
    }

    /**
     * Get racer's HTML
     * @return {string}
     */
    getHtml(){
        return `<div class="race-item" id="item-${this.name}"><h3>${this.name}</h3>
        <span class="remove-button" title="Remove" onclick="removeRacer(\'${this.name}\')">X</span>
        <div class="progress-container">
        <div class="progress" style="background: ${colors[this.colorId]}" id="progress-${this.name}"></div></div></div>`
    }

    /**
     * Move racer
     */
    move(){
        this.progress += Math.floor(Math.random() * (this.speed[1] - this.speed[0]) + this.speed[0])/100;
        if(this.progress > this.section * 20){
            this.section++;
            this.change_speed()
        }
        if(this.progress > 100) this.progress = 100;
        el(`progress-${this.name}`).style.width = this.progress + '%'
    }

    reset(){
        this.progress = 0;
        this.change_speed();
        this.section = 0;
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
 * Reset Racers to start state
 */
function resetRacers() {
    el('message').innerHTML = '';
    racers.forEach(racer => {
        racer.reset();
    })
}

document.addEventListener('DOMContentLoaded', ()=>{
    /**
     * Add racer on Enter keypress at name-input
     * @param e Event
     */
    el('name-input').onkeypress = e => {
       if(e.key === 'Enter'){
           addRacer();
       }
   }
});