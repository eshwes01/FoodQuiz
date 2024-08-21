
const totalQuestions = 10;
let currentQuestion = 1 ;

   document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.getElementsByTagName("button");
    
        for(let button of buttons){
            button.addEventListener("click", function(e){
                if (this.classList.contains("btnletsGo")){
                    showQuestion(currentQuestion);
                }else if (this.getAttribute("class") === "btnNext") {
                    nextQuestion();
                    e.preventDefault();
                }else if (this.getAttribute("class") === "btnPrevious") {
                    previousQuestion();
                    e.preventDefault();
                }else if(this.getAttribute("type") === "submit" ){
                    submitQuiz();
                    e.preventDefault();
                }
            });
        }
                document.getElementById("bSubmit").addEventListener("keydown",function(event){
                if(event.key == "Enter"){
                        submitQuiz();
                    }
                });
        });
       
         /**
         * Display the first question, starting the quiz 
         */
        
        function showQuestion(questionNumber) {
                // Hide all questions
                for (let i = 1; i <= totalQuestions; i++) {
                    document.getElementById(`question${i}`).style.display = 'none';
                }
            // Show the current question
            document.getElementById(`question${questionNumber}`).style.display = 'flex';
            document.getElementById(`qProgress`).innerHTML = `<p>Questions: ${questionNumber} /10 </p> `;
        }

        /**
         *  Save user answer of the current question and add that in session storage
         */
        function saveAnswer(){
            const form = document.forms['quiz.Form'];
            const question = `q${currentQuestion}`;
            const currentAnswer = form[question].value;
            if(currentAnswer){
                sessionStorage.setItem(question,currentAnswer);
            }
        }  
        /**
         *  Retrieve and read user answers from the session storage 
         */
        function loadAnswer(){
            const form = document.forms['quiz.Form'];
            const question = `q${currentQuestion}`;
            const savedAnswer = sessionStorage.getItem(question);
            if (savedAnswer){
                form[question].value = savedAnswer;
            }
        }
       /**
        * Show Previous Question and load previous answer and save again if user make any changes
        */
        function previousQuestion(){
            saveAnswer();
            if (currentQuestion > 1 ){
                currentQuestion--;
                showQuestion(currentQuestion);
                loadAnswer();
            }
        }
         /**
        * Showing Next Question and save answer 
        */
        function nextQuestion(){
            saveAnswer();
            if (currentQuestion<totalQuestions){
                ++currentQuestion;
                showQuestion(currentQuestion);
                loadAnswer();
                if(currentQuestion === 10 ){
                    console.log (currentQuestion);
                    document.getElementById("bSubmit").style.display= 'flex';
                }
            }
        }
        /**
         * Submit Quiz and checking with user answer if match 
         */
        function submitQuiz() {
            saveAnswer();
            let score = 0;
            // Store correct answers
            const correctAnswers = {
                q1: 'c',  // pot au feu
                q2: 'b',  // taco
                q3: 'a',  // Paella
                q4: 'd',  // Moussaka
                q5: 'b',  // Ceviche
                q6: 'c',  // Kim chi
                q7: 'c',  // Borscht
                q8: 'b',  // Bao Bun
                q9: 'a',  // Goulash
                q10: 'd'  // Green Curry
            };
            
            // Check each question
            for (let question in correctAnswers) {
                const userAnswer = sessionStorage.getItem(question);
                if (userAnswer === correctAnswers[question]) {
                    score++;
                }
            }
            // Display Result
            const resultText = `${score} out of ${Object.keys(correctAnswers).length} correct.`;
            document.getElementById('result').innerHTML = ` <strong>Your Score : <hr> ${resultText}
                                                            </strong>`;

            if(score === 10){
                document.getElementById('outsideText').innerHTML = `<i class="fa-solid fa-trophy"></i>
                                                                     Congratulation! 
                                                                     <br> You win a voucher worth of £50 .`;
            }else{
                document.getElementById('outsideText').innerHTML = `Ooops ..<i class="fa-solid fa-heart-crack"></i>
                                                                    <i class="fa-solid fa-heart-crack"></i><br>
                                                                     You didn't Make it this time.`;
     
            }
            sessionStorage.clear(); // Clear session storage after submission
            score=0;
        }
       