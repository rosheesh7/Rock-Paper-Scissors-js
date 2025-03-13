//Rock = 0 to 1/3
      //Paper = 1/3 to 2/3
      //scissors = 2/3 to 1

      //object to store result
      let score = JSON.parse(localStorage.getItem('score')) || { wins: 0 , losses: 0, ties: 0};
      
      const resultElement = document.querySelector('.js-result');
      const moveElement = document.querySelector('.js-move');

      //generates computer move with random number
      function pickComputerMove(){
        const randomNum = Math.random();
        let computerMove = '';
        
        if(randomNum >= 0 && randomNum < 1/3){
          computerMove = 'Rock';
        }else if(randomNum >= 1/3 && randomNum <2/3){
          computerMove = 'Paper';
        }else if(randomNum >= 2/3 && randomNum < 1){ 
          computerMove = 'Scissors';
        }        
        return computerMove;
      }


      //event listener for body
      document.body.addEventListener('keydown',(event) => {
        if(event.key === 'r' || event.key ===  'R'){
          PlayGame('Rock');
        }else if(event.key === 'p' || event.key ===  'P'){
          PlayGame('Paper');
        }else if(event.key === 's' || event.key ===  'S'){
          PlayGame('Scissors');
        }
      });

      //event for rock
      document.querySelector('.js-rock-button')
        .addEventListener('click',() => PlayGame('Rock'));

      //event for paper
      document.querySelector('.js-paper-button')
        .addEventListener('click',() => PlayGame('Paper'));
      

      //event for scissors
      document.querySelector('.js-scissor-button')
        .addEventListener('click',() => PlayGame('Scissors'));

      //function  to decide result
      function PlayGame(playerMove){
        let result = '';
        const computerMove = pickComputerMove();
        if(playerMove === 'Scissors'){

          if(computerMove === 'Rock'){
            result = 'You Lose.';
          }else if(computerMove === 'Paper'){
            result = 'You win.';
          }else if(computerMove === 'Scissors'){
            result = 'Tie.';
          }      

        }else if(playerMove === 'Paper'){

          if(computerMove === 'Rock'){
            result = 'You win.';
          }else if(computerMove === 'Paper'){
            result= 'Tie.';
          }else if(computerMove === 'Scissors'){
            result = 'You Lose.';
          }      

        }else if(playerMove==='Rock'){

          if(computerMove === 'Rock'){
            result = 'Tie.';
          }else if(computerMove === 'Paper'){
            result = 'You Lose.';
          }else if(computerMove === 'Scissors'){
            result = 'You win.';
          }
        }

        if(result ==='You win.'){
          score.wins +=1;
        }
        else if(result === 'You Lose.'){
          score.losses +=1;
        }else if(result === 'Tie.'){
          score.ties += 1;
        }
        localStorage.setItem('score', JSON.stringify(score));


        moveElement.innerHTML =  `You : <img src= "images/${playerMove}-emoji.png" class = "move-image">  Computer: <img src = "images/${computerMove}-emoji.png" class = "move-image">`; 

        resultElement.innerHTML = `${result}`;
        updateScore();
      }

      

      function updateScore(){       
        document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
      }

      //Display past values 
      updateScore();
      
      function confirmReset(){
        const confirmElement = document.querySelector('.js-confirm-message');
        confirmElement.innerHTML = `Are you sure you want to reset the score?
        <button class = "js-confirm-yes confirm-message-button">Yes</button>
        <button class = "js-confirm-no confirm-message-button">No</button>`
        document.querySelector('.js-confirm-yes').addEventListener('click',() => {
          resetScore();
          confirmElement.innerHTML = '';

        })
        document.querySelector('.js-confirm-no').addEventListener('click',() => {
          confirmElement.innerHTML = '';
        })
      }

      //Reset Score 
      function resetScore(){
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        console.log('scores reset.');
        document.querySelector('.js-move').innerHTML = '';
        updateScore();

      }
      //event for reset score button
      document.querySelector('.js-reset-score-button')
        .addEventListener('click',() => {
          confirmReset();
          localStorage.removeItem('score');
        });

      //event for reset score ( reset when backspace is pressed).
      document.body.addEventListener('keydown', (event) => {
        if(event.key === 'Backspace'){
          confirmReset();
        }
      })

      //auto play
      let intervalId;
      function autoPlay(){
        const autoElement = document.querySelector('.js-auto-play-button');
        let autoInnerText = autoElement.innerText;

        if(autoInnerText === 'Auto Play'){
          autoElement.classList.add('autoplay-ON');
          autoElement.innerText = 'Stop Auto Play';
        }
        else{
          autoElement.classList.remove('autoplay-ON');
          autoElement.innerText = 'Auto Play';
        }

        if(autoElement.classList.contains('autoplay-ON')){
            intervalId =  setInterval(() =>{
            const autoMove = pickComputerMove();
            PlayGame(autoMove);
          },1000);
        }
        else{
          clearInterval(intervalId); //clear interval() is a function that stops repeated action caused by setInterval function(). Since setInterval returns an intervalId, the clearInterval Function takes it as parameter and stops the process.
        }
      }     
       //event for auto play button
      document.querySelector('.js-auto-play-button')
      .addEventListener('click',() => autoPlay());

      //event for auto play (auto play while pressing 'a')
      document.body.addEventListener('keydown', (event) => {
        if(event.key === 'a' || event.key === 'A'){
          autoPlay();
        }
      })


      //convert to light mode
      function lightMode(){
        if(!document.body.classList.contains('isLight')){
          document.querySelector('.js-light-mode-button').innerText = 'Dark Mode';  
          document.body.classList.add('isLight');
        }else{
          document.querySelector('.js-light-mode-button').innerText = 'Light Mode';  
          document.body.classList.remove('isLight');
        }
      }
      //event for light mode
      document.querySelector('.js-light-mode-button')
        .addEventListener('click',lightMode);