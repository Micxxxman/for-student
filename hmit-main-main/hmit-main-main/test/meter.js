
function run(){
    Array.from(document.querySelectorAll('.circle-meter')).forEach(CircleMeter);
}

          
function CircleMeter (meterElement) {
const circle = meterElement.querySelector('svg > circle + circle');


const numberElement = meterElement.querySelector('.softskills-percentage');
const score = meterElement.dataset.score;
const normalizedScore = (100 - meterElement.dataset.score)/100;

const maxDuration = 13;

//set initial stroke offset
circle.style.strokeDashoffset = 1;
const duration = Math.floor(Math.random() * Math.floor(maxDuration));
            
const transitionEnd = event => {
                    circle.removeEventListener('transitionend', transitionEnd);
              meterElement.classList.remove('animatable');
}
            

circle.addEventListener('transitionend', transitionEnd);
            
setTimeout(() => {
                  meterElement.classList.add('animatable');
              
let transitionDuration = window.getComputedStyle(circle).transitionDuration;
                              
increaseNumber(numberElement, score, duration);
circle.style.transitionDuration = `${duration}s`;
circle.style.strokeDashoffset = normalizedScore;
  
}, 1000);

}
          
          
function increaseNumber(numberElement, score, duration) {
const startTime = Date.now();
            
const callback = function () {
  const timePassed = (Date.now() - startTime)/1000;    
  const currentScore = Math.floor(score * (timePassed / duration), score);                
  numberElement.textContent = `${currentScore}%`;
              
              if (timePassed < duration)
              {
                requestAnimationFrame(callback);
              }
 }
            
            requestAnimationFrame(callback);
          }
          
          run();
          
