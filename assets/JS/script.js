        let currentQuestion = 1;
        const totalQuestions = 10;
        const quizForm = document.getElementById("quizForm");

        document.getElementById("btnletsGo").addEventListener("click", showQuestion(currentQuestion));
        document.getElementById("btnPrevious").addEventListener("click", previousQuestion());
        document.getElementById("btnNext").addEventListener("click", nextQuestion());
        document.getElementById("btnSubmit").addEventListener("click", submitQuiz());
        
        // function hideForm(){
        //     quizForm.style.display ='none';
        // }

        // Quiz Display will be hidden when the page loaded
        window.onload = function() {
            showQuestion(currentQuestion);
        };


        /**
         * Display the first question, starting the quiz 
         */
        function showQuestion(questionNumber) {
            
            //Show the current question
            document.getElementById(`question${questionNumber}`).style.display = 'block'; 
             //document.getElementById(`question${currentQuestion}`).style.display = 'block'; 

             // Hide questions when calling the function
             for (let i = 1; i <= totalQuestions; i++) {
                document.getElementById(`question${i}`).style.display ='none';
            }
        }

        /**
         *  Saving user answer of the current question and add that in session storage
         */
        function saveAnswer(){
            const form = document.forms['quizForm'];
            const question = `q${currentQuestion}`;
            const currentAnswer = form[currentQuestion].value;

            if(currentAnswer){
                sessionStorage.setItem(question,currentAnswer);
            }
        }  

        /**
         *  Retrieving and read user answers from the session storage 
         */
        function loadAnswer(){
            const form = document.forms['quizForm'];
            const question = `q${currentQuestion}`;
            const savedAnswer = sessionStorage.getItem(currentQuestion);

            if (savedAnswer){
                form[question].value = savedAnswer;
            }
        }

       
       
       /**
        * Showing Previous Question and load previous answer and save again if user make any changes
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
            if (currentQuestion < totalQuestions){
                currentQuestion++;
                showQuestion(currentQuestion);
                loadAnswer();
            }
        }

        /**
         * Submit Quiz and checking with user answer if match 
         */
        function submitQuiz() {
            saveAnswer();
            
            // Store correct answers
            const correctAnswers = {
                q1: 'b',  // taco
                q2: 'c',  // pot au feu
                q3: 'a',  // Paella
                q4: 'd',  // Moussaka
                q5: 'b',  // Goulash
                q6: 'c',  // Kim chi
                q7: 'c',  // Borscht
                q8: 'b',  // Bao Bun
                q9: 'a',  // Ceviche
                q10: 'd'  // Green Curry
            };

            let score = 0;

            // Check each question
            for (let question in correctAnswers) {
                const userAnswer = sessionStorage.getItem(question);
                if (userAnswer === correctAnswers[question]) {
                    score++;
                }
            }

            // Display the result
            const resultText = `You got ${score} out of ${Object.keys(correctAnswers).length} correct.`;
            alert( resultText);
            document.getElementById('result').innerText = resultText;

            // Clear session storage after submission
            sessionStorage.clear();
        }

        
        