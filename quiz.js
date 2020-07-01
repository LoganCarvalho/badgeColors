// select all elements
const start = document.getElementById("start");
const logo = document.getElementById("logo");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const counter = document.getElementById("counter");
//const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// vetor de perguntas
let questions = [
    {
        question : "Nos últimos 14 dias, você recebeu um diagnóstico confirmado de coronavírus (COVID-19) por um teste de coronavírus (COVID-19) ou por diagnóstico de um médico (clinicamente confirmado) ou está aguardando o resultado de um teste para COVID-19??",
        imgSrc : "img/covidTest.png",
        choiceA : "SIM",
        choiceB : "NÃO",
        correct : "B"
    },{
        question : "Nos últimos 14 dias, você realizou alguma viagem aérea internacional?",
        imgSrc : "img/intTravel.png",
        choiceA : "SIM",
        choiceB : "NÃO",
        correct : "B"
    },{
        question : "Nos últimos 14 dias, você teve contato próximo ou cuidou de alguém diagnosticado com COVID-19?",
        imgSrc : "img/covidPatient.png",
        choiceA : "SIM",
        choiceB : "NÃO",
        correct : "B"
    },{
        question : "Nos últimos 14 dias, você apresentou sintomas de resfriado ou gripe, incluindo: febre, tosse, falta de ar ou dificuldade em respirar, dor de garganta, pressão no peito, fadiga extrema, dor de ouvido, dor de cabeça persistente, diarréia, vômitos, dores musculares, calafrios ou agitação repetida com calafrios e perda persistente de olfato ou paladar?",
        imgSrc : "img/sickSymp.png",
        choiceA : "SIM",
        choiceB : "NÃO",
        correct : "B" 
    }
];

// Algumas variáveis

const lastQuestion = questions.length - 1; //quantidade de perguntas no vetor
let runningQuestion = 0;
let count = 0;
//const questionTime = 10; // 10s
//const gaugeWidth = 150; // 150px
//const gaugeUnit = gaugeWidth / questionTime;
//let TIMER;
let score = 0;

// renderizar perguntas
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    logo.style.display = "none";
    start.style.display = "none"; //retirar visibilidade do teste inicial
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    //renderCounter();
    //TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        //timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// Verificar Resposta do usuário quando clicar no botão [SIM, NÃO]

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // atualiza a pontuação
        score++;
        // Muda a cor dos circulos de progresso para verde
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        //clearInterval(TIMER);
        scoreRender();
    }
}

//Essa função define a cor do circulo para verde
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

//Essa função define a cor do circulo para vermelho
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}





















