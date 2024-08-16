        let currentQuestion = 1;
        const totalQuestions = 3;
        const quizForm = document.getElementById("quizForm");

        function hideForm(){
            quizForm.style.display ='none';
        }

        // Quiz Display will be hidden when the page loaded
        window.onload = function() {
            showQuestion(currentQuestion);
        };


        /**
         * Display the first question, starting the quiz 
         */
        function showQuestion(questionNumber) {
             //Hide all questions
             for (let i = 1; i <= totalQuestions; i++) {
                document.getElementById(`question${i}`).style.display = 'none';
            }
            //Show the current question
            document.getElementById(`question${questionNumber}`).style.display = 'flex'; 
             //document.getElementById(`question${currentQuestion}`).style.display = 'block'; 
        }

        /**
         *  Saving user answer of the current question and add that in session storage
         */
        function saveAnswer(){
            const form = document.forms['quizForm'];
            const currentQuestion = `q${currentQuestion}`;
            const currentAnswer = form[currentQuestion].value;

            if(currentAnswer){
                sessionStorage.setItem(currentQuestion,currentAnswer);
            }
        }  

        /**
         *  Retrieving and read user answers from the session storage 
         */
        function loadAnswer(){
            const form = document.forms['quizForm'];
            const currentQuestion = `q${currentQuestion}`;
            const savedAnswer = sessionStorage.getItem(currentQuestion);

            if (savedAnswer){
                form[currentQuestion].value = savedAnswer;
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

        
        