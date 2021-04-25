document.addEventListener('DOMContentLoaded', () =>{
       const character = document.querySelector('.character');
       const gameDisplay = document.querySelector('.game-container');
       const ground = document.querySelector('.ground');
       const totalScore = document.getElementById('totalScore');
      
  
        let characterLeft = 220;
        let characterBottom = 100;
        let gravity = 2;
        let isGameOver = false;
        let gap = 430; 
        let score = 0;

      
    
        // Every 20 miliseconds it executes and rests 2 bottom per gravity
       function startGame(){
           
        characterBottom = characterBottom - gravity; //characterBottom -= gravity;
           character.style.bottom= characterBottom + 'px';
           character.style.left= characterLeft + 'px';

       }

       let gameTimerId= setInterval(startGame,20);

       function control(e){
            if(e.keyCode === 32){
                jump();
            }
       }

       function jump(){
           if (characterBottom < 500) characterBottom += 50;
           character.style.bottom = characterBottom + 'px';
           
       }

       document.addEventListener('keyup', control);

       function generateObstacle (){
           let obstacleLeft = 500;
           let randomHeight= Math.random () * 60;
           let obstacleBottom= randomHeight;
           const obstacle = document.createElement('div');
           const topObstacle = document.createElement('div');
           if (!isGameOver) {
               obstacle.classList.add('obstacle');
               topObstacle.classList.add('topObstacle');
            }
           gameDisplay.appendChild(obstacle);
           gameDisplay.appendChild(topObstacle);

           obstacle.style.left= obstacleLeft + 'px';
           topObstacle.style.left= obstacleLeft + 'px';
           obstacle.style.bottom= obstacleBottom + 'px';
           topObstacle.style.bottom= obstacleBottom + gap + 'px';

           function moveObstacle () {
               obstacleLeft -=2;
               obstacle.style.left = obstacleLeft + 'px';
               topObstacle.style.left = obstacleLeft + 'px';


               if(obstacleLeft === -60){
                   clearInterval(timerId);
                   gameDisplay.removeChild(obstacle);
                   gameDisplay.removeChild(topObstacle);
               }

             
               if (obstacleLeft <200 && obstacleLeft > 197){
                score++;
                totalScore.textContent= score;
                    
               }

               if (
                     obstacleLeft > 200 && obstacleLeft < 264 && characterLeft === 220 &&
                   (characterBottom < obstacleBottom + 153  || characterBottom > obstacleBottom + gap -200) || 
                   characterBottom === 0 ) {
                   gameOver();
                   clearInterval(timerId);
               }  
           }

           /*
           5 = 750
           10 = 1500
           15 = 2250
           20 = 3000
           */
          
           let timerId = setInterval(moveObstacle, 10); 
           if (!isGameOver) setTimeout(generateObstacle, 1500); 

       }

        generateObstacle();

        function gameOver(){
            clearInterval(gameTimerId);
            isGameOver = true;
            document.removeEventListener('keyup',control);
            console.log('game over');
            const boton= document.getElementById('boton');
            const imagen=document.getElementById('imagen');
            imagen.style.display='block';
            boton.style.display='block';
            obstacleLeft = 500;
        
        }


        boton.addEventListener('click',()=>{
            location.reload();
            
        })


});