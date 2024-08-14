function checkQuiz() {
    // Store correct answers
    const correctAnswers = {
        q1: 'b',  // Paris
        q2: 'b',  // 4
        q3: 'c'   // William Shakespeare
    };

    let score = 0;
    const form = document.forms['quizForm'];

    // Check each question
    for (let question in correctAnswers) {
        const userAnswer = form[question].value;
        if (userAnswer === correctAnswers[question]) {
            score++;
        }
    }

    // Display the result
    const resultText = `You got ${score} out of ${Object.keys(correctAnswers).length} correct.`;
    document.getElementById('result').innerText = resultText;
}