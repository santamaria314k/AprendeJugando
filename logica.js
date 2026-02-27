let score = 0;
let currentAnswer = 0;
let player = "";
let lastReward = null;

const rewards = [
  "img/1.PNG","img/2.PNG","img/3.PNG","img/4.PNG","img/5.PNG",
  "img/6.PNG","img/7.PNG","img/8.PNG","img/9.PNG","img/10.PNG","img/11.PNG","img/12.PNG"
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
