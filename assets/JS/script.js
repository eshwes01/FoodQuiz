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

        // Display the first question
        //document.getElementById(`question${currentQuestion}`).style.display = 'block';

        function showQuestion(questionNumber) {
             //Hide all questions
             for (let i = 1; i <= totalQuestions; i++) {
                document.getElementById(`question${i}`).style.display = 'none';
            }
            //Show the current question
            document.getElementById(`question${questionNumber}`).style.display = 'block';
            
        }


        function loadAnswer() {
            const form = document.forms['quizForm'];
            const question = `q${currentQuestion}`;
            const savedAnswer = sessionStorage.getItem(question);
            if (savedAnswer) {
                form[question].value = savedAnswer;
            }
        }

        function submitQuiz() {
            saveAnswer();
            
            // Store correct answers
            const correctAnswers = {
                q1: 'b',  // taco
                q2: 'c',  // spaghetti
                q3: 'a',  // Paella
                q4: 'c',  //
                q5: 'b',  // 
                q6: 'c',  // 
                q7: 'a',  // 
                q8: 'c',  //
                q9: 'a',  //
                q10: 'b'
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

        
        