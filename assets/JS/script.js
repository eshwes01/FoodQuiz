// function checkQuiz() {
//     // Store correct answers
//     const correctAnswers = {
//         q1: 'b',  // Paris
//         q2: 'b',  // 4
//         q3: 'c'   // William Shakespeare
//     };

//     let score = 0;
//     const form = document.forms['quizForm'];

//     // Check each question
//     for (let question in correctAnswers) {
//         const userAnswer = form[question].value;
//         if (userAnswer === correctAnswers[question]) {
//             score++;
//         }
//     }

    // Display the result
    const resultText = `You got ${score} out of ${Object.keys(correctAnswers).length} correct.`;
    document.getElementById('result').innerText = resultText;
}


        let currentQuestion = 1;
        const totalQuestions = 3;

        // Display the first question
        document.getElementById(`question${currentQuestion}`).style.display = 'block';

        function showQuestion(questionNumber) {
            // Hide all questions
            for (let i = 1; i <= totalQuestions; i++) {
                document.getElementById(`question${i}`).style.display = 'none';
            }
            // Show the current question
            document.getElementById(`question${questionNumber}`).style.display = 'block';
        }

        function saveAnswer() {
            const form = document.forms['quizForm'];
            const question = `q${currentQuestion}`;
            const answer = form[question].value;
            if (answer) {
                sessionStorage.setItem(question, answer);
            }
        }

        function loadAnswer() {
            const form = document.forms['quizForm'];
            const question = `q${currentQuestion}`;
            const savedAnswer = sessionStorage.getItem(question);
            if (savedAnswer) {
                form[question].value = savedAnswer;
            }
        }

        function nextQuestion() {
            saveAnswer();
            if (currentQuestion < totalQuestions) {
                currentQuestion++;
                showQuestion(currentQuestion);
                loadAnswer();
            }
        }

        function previousQuestion() {
            saveAnswer();
            if (currentQuestion > 1) {
                currentQuestion--;
                showQuestion(currentQuestion);
                loadAnswer();
            }
        }

        function submitQuiz() {
            saveAnswer();

            // Store correct answers
            const correctAnswers = {
                q1: 'b',  // Paris
                q2: 'b',  // 4
                q3: 'c'   // William Shakespeare
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
            document.getElementById('result').innerText = resultText;

            // Clear session storage after submission
            sessionStorage.clear();
        }