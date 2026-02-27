let score = 0;
let currentAnswer = 0;
let player = "";
let lastReward = null;

const rewards = [
  "img/1.png","img/2.png","img/3.png","img/4.png","img/5.png",
  "img/6.png","img/7.png","img/8.png","img/9.png","img/10.png","img/11.png"
];

function startGame(){
  player = document.getElementById("playerName").value.trim();
  if(player === ""){
    alert("Escribe tu nombre");
    return;
  }

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");
  document.getElementById("welcome").textContent = "¡Vamos " + player + "!";
  generateQuestion();
}

function generateQuestion(){
  let a = Math.floor(Math.random()*10)+1;
  let b = Math.floor(Math.random()*10)+1;

  const ops = ["+","-","*"];
  let op = ops[Math.floor(Math.random()*ops.length)];

  // 🔹 Evitar resultados negativos en restas
  if(op === "-" && a < b){
    let temp = a;
    a = b;
    b = temp;
  }

  if(op === "+") currentAnswer = a+b;
  if(op === "-") currentAnswer = a-b;
  if(op === "*") currentAnswer = a*b;

  document.getElementById("question").textContent = a + " " + op + " " + b;
  document.getElementById("answer").value="";
}

function showReward(img){
  const box = document.getElementById("reward-box");
  const image = document.getElementById("reward-img");
  image.src = img;
  box.classList.remove("hidden");
}

function getRandomReward(){
  let index = Math.floor(Math.random()*rewards.length);
  return rewards[index];
}

function checkAnswer(){
  let userAnswer = Number(document.getElementById("answer").value);

  if(userAnswer === currentAnswer){
    score += 10;
    alert("🎉 ¡Correcto!");

    lastReward = getRandomReward();
    showReward(lastReward);

  }else{
    alert("😅 Ups, intenta otra");

    if(lastReward !== null){
      showReward(lastReward);
    }
  }

  document.getElementById("score").textContent = score;
  generateQuestion();
}