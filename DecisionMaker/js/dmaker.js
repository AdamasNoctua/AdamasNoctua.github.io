answers = ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes - definitely', 'You may rely on it',
'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes',
'Reply hazy, try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again',
'Don\'t count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful'];

function makeDecision() {
    el('decision-output').innerHTML = answers[Math.floor(Math.random()*answers.length)]
}

//listen to shake event
let shakeEvent = new Shake({threshold: 15});
shakeEvent.start();
window.addEventListener('shake', function(){
    makeDecision()
}, false);

//stop listening
function stopShake(){
    shakeEvent.stop();
}

//check if shake is supported or not.
if(!("ondevicemotion" in window)){alert("Not Supported");}