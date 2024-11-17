var input = document.getElementById("ip-name");
var question = document.getElementById("question");
var category = document.getElementById("category"); 
var answer = document.getElementById("answer"); 
var score = document.getElementById("score"); 
var Score=0;
var boo=false;
input.addEventListener("keypress", function(event) {

  if (event.key === "Enter") {
    event.preventDefault();
    input.readOnly=true;
    input.style.backgroundColor="transparent";
    input.style.fontWeight="bold";
    input.style.fontSize="x-large";
    loadquestion();
  }
});

function loadquestion(){
  
const xhttp = new XMLHttpRequest();


xhttp.onload = function() {
  console.log(Score);
    const data = JSON.parse(xhttp.responseText);
    const categories = data.questions;
    const randomCategoryIndex = Math.floor(Math.random() * categories.length);
    const selectedCategory = categories[randomCategoryIndex];
    const questions = selectedCategory.questions;
    const randomQuestionIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomQuestionIndex];
    category.innerText="Category: "+selectedCategory.category;
    question.innerText=" Question: "+ randomQuestion.question;
    console.log("Answer:", randomQuestion.answer);
    answer.readOnly=false;
    answer.addEventListener("keypress", function(event) {

      if (event.key === "Enter" && answer.input!='') {
        boo=!boo;
        if(boo){
        answer.readOnly=true;
        event.preventDefault();
        if(answer.value.toLowerCase().includes(randomQuestion.answer.toLowerCase())){
          answer.style.backgroundColor="green";
          Score++;
            score.innerText="Score : "+Score;
          setTimeout(() => {
            
            answer.value="";
            answer.style.backgroundColor="whitesmoke";
            
            loadquestion();
          }, 2000);
         
        }
        else{
          answer.style.backgroundColor="red";
          Score=Score-1;
            score.innerText="Score : "+Score;
          answer.value=randomQuestion.answer;
          setTimeout(() => {
            answer.style.backgroundColor="whitesmoke";
            answer.value="";
          
          }, 2000);
          loadquestion();
        }
      }
}});
}

xhttp.open("GET", "./questions.json");
xhttp.send();}



