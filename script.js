function openExternalWebPage(url) {
  window.open(url, '_blank');
}

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ff0000"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false
    },
    "size": {
      "value": 3,
      "random": true
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ff0000",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "out_mode": "out"
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    }
  },
  "retina_detect": true
});

let numbersDiv = document.getElementById("numbers");
let numbers = [];

function generateNumbers() {
  numbers = [];
  for (let i = 0; i < 5; i++) {
    numbers.push(Math.floor(Math.random() * 100));
  }
  numbersDiv.innerHTML = numbers.join(". ");
  setTimeout(generateNumbers, 1000);
}

generateNumbers();

        document.querySelectorAll('.checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const allChecked = Array.from(document.querySelectorAll('.checkbox')).every(cb => cb.checked);
                document.querySelector('.button').style.display = allChecked ? 'block' : 'none';
            });
        });

        document.addEventListener('DOMContentLoaded', function() {
            let GAMEID = "";

            function startTypingAnimation(text, gameIDElement) {
                let index = 0;
            
                const typingInterval = setInterval(function() {
                    gameIDElement.textContent += text[index];
                    index++;
                    if (index >= text.length) {
                        clearInterval(typingInterval);
                    }
                }, 50); // Typing speed in milliseconds
            }

            function getGameID(updatedGameID){
                const now = new Date();
                const currentMinute = now.getHours() * 60 + now.getMinutes() + 1;
                const gameID = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate()}01${currentMinute.toString().padStart(4, '0')}`;
                if (GAMEID !== gameID + updatedGameID){
                    document.getElementById("prediction-result").style.display = 'none';
                    var gameIDElem = document.getElementById("gameID")
                    gameIDElem.textContent = ""
                    startTypingAnimation(gameID, gameIDElem)
                }
                GAMEID = gameID + updatedGameID;
            }

            function delayedPrediction(gameID) {
                const currentMinute = (new Date()).getMinutes(); // Get the current minute
                let savedPrediction = localStorage.getItem('prediction_' + gameID); // Retrieve the saved prediction
                let savedMinute = localStorage.getItem('minute_' + gameID); // Retrieve the saved minute

                console.log(`delayedPrediction gameID: ${gameID}, savedPrediction: ${savedPrediction}, savedMinute: ${savedMinute}`);
                
                // Check if there's a saved prediction and it's from the same minute
                if (savedPrediction && savedMinute && parseInt(savedMinute) === currentMinute) {
                    // Use the saved prediction
                    document.getElementById("prediction").textContent = savedPrediction;
                    console.log("Got saved prediction: " + savedPrediction);
                } else {
                    // Generate a new prediction
                    const predictions = ['BIG', 'SMALL'];
                    const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];
                
                    // Save the new prediction and current minute
                    localStorage.setItem('prediction_' + gameID, randomPrediction);
                    localStorage.setItem('minute_' + gameID, currentMinute);
                
                    // Display the new prediction
                    document.getElementById("prediction").textContent = randomPrediction;
                    console.log("Got random prediction: " + randomPrediction);
                }
                    
                document.getElementById("prediction-result").style.display = 'block';
                playSuccessSound();
            }

            function playSuccessSound() {
                const audio = new Audio('success.mp3'); // Replace with the path to your success sound file
                audio.play();
            }
            
            let updatedGameID = "";
            document.getElementById('prediction-button').addEventListener('click', function() {
                updatedGameID = this.getAttribute('data-game-id');
                console.log(updatedGameID)
                setTimeout(function() {
                    delayedPrediction(updatedGameID);
                }, 2000);
            });

            setInterval(function() {
                getGameID(updatedGameID);
            }, 1000);
        });
  // Get the button and text elements
  const button = document.getElementById('prediction-button');
  const textElement = document.getElementById('prediction');

  // Add an event listener to the button
  button.addEventListener('click', () => {
    // Show the text after 3 seconds
    setTimeout(() => {
      textElement.style.display = 'block';
    }, 3000);

    // Hide the text again after another 3 seconds
    setTimeout(() => {
      textElement.style.display = 'none';
    }, 6000);
  });
