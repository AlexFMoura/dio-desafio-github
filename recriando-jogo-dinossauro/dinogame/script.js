const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;
let pontos = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
    // console.log('precionou espaco')
  }
}

function jump() {

  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Desceu
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if(position <= 0) {
          clearInterval(downInterval);
          isJumping = false;

        } else {

          position -= 20;
          // @ts-ignore
          dino.style.bottom = position + 'px';
        }
      }, 20);

    } else {
      // Pulou
      position += 20;
  
      // @ts-ignore
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;
  console.log(randomTime); 

  if (isGameOver) return;

  cactus.classList.add('cactus');
  cactus.style.left = 1000 + 'px';
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    cactusPosition -= 10;
    cactus.style.left = cactusPosition + 'px';

    if (cactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftInterval);
      background.removeChild(cactus);
      
      pontos = pontos + 1 ;
      console.log(`Pontos: ${pontos}`); 
        
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      //Game Over
      clearInterval(leftInterval);
      isGameOver = true;
      document.body.innerHTML = `<h1 class="game-over">Fim de jogo, vc fez ${pontos} pontos! </h1>`;
     } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px' ;

    }
  }, 30); 

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp); 