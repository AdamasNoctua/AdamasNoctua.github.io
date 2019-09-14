answers = ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes - definitely', 'You may rely on it',
'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes',
'Reply hazy, try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again',
'Don\'t count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful'];

/**
 * Flag for handling input spam
 * @type {boolean}
 */
let canClick = true;

/**
 * Make decision
 */
function makeDecision() {
    if(canClick){
        let interval = 0;
        canClick = false;
        if(el('triangle').style.opacity === '1'){
            interval = 3000;
            el('triangle').style.opacity = '0';
        }
        setTimeout(()=>{
            el('decision-output').innerHTML = answers[Math.floor(Math.random()*answers.length)].toUpperCase();
            el('triangle').style.opacity = '1';
            canClick = true;
        }, interval);
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    // Apply shake on space
    document.body.onkeypress = ev => {
        if(ev.code === 'Space'){
            makeDecision();
        }
    }
});

//listen to shake event
let shakeEvent = new Shake({threshold: 21});
shakeEvent.start();
window.addEventListener('shake', function(){
    makeDecision()
}, false);

//stop listening
function stopShake(){
    shakeEvent.stop();
}

//check if shake is supported or not.
if(!("ondevicemotion" in window)){console.log("Warning: Shaking is not Supported");}