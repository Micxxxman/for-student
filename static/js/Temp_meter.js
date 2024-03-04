var score;
var normalizedScore;
var maxDuration;



export function Temp_Meter(percent){
    Array.from(document.querySelectorAll('.Temp_circle-meter')).forEach(CircleMeter);
    score = parseFloat((percent).toFixed(1));
    normalizedScore = (100 - percent)/100;
    console.log(normalizedScore);
    maxDuration = 13;
  }

          
function CircleMeter (meterElement) {
    const circle = meterElement.querySelector('svg > circle + circle');
    console.log(meterElement);
    const numberElement = meterElement.querySelector('.softskills-percentage');
    const maxDuration = 13;


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
    console.log(normalizedScore);
    // console.log(duration);
    }, 1000);

}
          
          
function increaseNumber(numberElement, score, duration) {
  const startTime = Date.now();
            
  const callback = function () {
  const timePassed = (Date.now() - startTime)/1000;    
  const currentScore =score.toFixed(1);
  // console.log(score);            
  numberElement.textContent = `${currentScore}°C`;
              
              if (timePassed < duration)
              {
                requestAnimationFrame(callback);
                // onsole.log(score);
              }
 }
            
            requestAnimationFrame(callback);
          }

          

          
