// Store team info
let teamName = '';
let score = 0;
let timeRemaining = 60;
let currentQuestionIndex = 0;
let selectedQuestions = [];
let questionSet = [];
let teamsData = {};

// Timer
let timerInterval;

// Array of question sets (6 sets of 5 questions each)
const questionSets = [
    [
        { question: "What is Galactosemia?", choices: ["A genetic disorder", "A bacterial infection", "A viral disease", "A heart condition"], answer: 0 },
        { question: "Which enzyme is deficient in classic Galactosemia?", choices: ["GALT", "Lactase", "Amylase", "Protease"], answer: 0 },
        { question: "Which food is unsafe for individuals with Galactosemia?", choices: ["Milk", "Rice", "Bananas", "Apples"], answer: 0 },
        { question: "Which organ is primarily affected in untreated Galactosemia?", choices: ["Liver", "Heart", "Lungs", "Kidneys"], answer: 0 },
        {
            question: "What is a potential neurological complication of Galactosemia?",
            choices: ["Developmental delay", "Seizures", "Muscle weakness", "All of the above"],
            answer: 3
          },
          {
            question: "What builds up in the liver in untreated Galactosemia?",
            choices: ["Galactose-1-phosphate", "Glucose", "Fructose", "Glycogen"],
            answer: 0
          },  
        {question: "How many copies of the mutated GALT gene must be inherited to have Galactosemia?",choices: ["1", "2", "3", "4"],answer: 1},
        { question: "Galactose is a type of?", choices: ["Sugar", "Protein", "Vitamin", "Mineral"], answer: 0 },
        {
            question: "Which sugar is often elevated in the blood of infants with Galactosemia?",
            choices: ["Glucose", "Galactose", "Sucrose", "Fructose"],
            answer: 1
          },
          {
            question: "Which genetic screening technique is used to detect GALT mutations?",
            choices: ["Sanger sequencing", "X-ray", "Western blot", "ELISA"],
            answer: 0
          },
          {
            question: "Which type of Galactosemia is caused by GALK deficiency?",
            choices: ["Type I", "Type II", "Type III", "Type IV"],
            answer: 1
          },
          {
            question: "What is a key difference between classic and Duarte variant Galactosemia?",
            choices: ["Severity of symptoms", "Different enzyme deficiency", "Different age of onset", "Different inheritance pattern"],
            answer: 0
          },
          {
            question: "Which type of cataracts can develop as a complication of Galactosemia?",
            choices: ["Nuclear cataracts", "Subcapsular cataracts", "Galactosemic cataracts", "Cortical cataracts"],
            answer: 2
          },
        { question: "What diet is recommended for Galactosemia patients?", choices: ["Galactose-free", "High-protein", "Low-fat", "Low-carb"], answer: 0 },
        { question: "Which symptom is common in untreated Galactosemia?", choices: ["Jaundice", "High fever", "Hair loss", "Hypertension"], answer: 0 },
        { question: "When is Galactosemia typically diagnosed?", choices: ["At birth", "During adolescence", "In adulthood", "During pregnancy"], answer: 0 }
    ],
    // Add 4 more sets of unique questions
    [
        { question: "Galactosemia is an inherited condition in which the body can't process what?", choices: ["Galactose", "Glucose", "Sucrose", "Fructose"], answer: 0 },
        {
            question: "Which biochemical process is affected in Galactosemia?",
            choices: ["Glycolysis", "Gluconeogenesis", "Galactose metabolism", "Pentose phosphate pathway"],
            answer: 2
          },
          {
            question: "Which molecule accumulates in the lens of the eye causing cataracts in Galactosemia?",
            choices: ["Galactitol", "Glucose", "Fructose", "Lactose"],
            answer: 0
          },
          {
            question: "Which of these symptoms can indicate undiagnosed Galactosemia in a newborn?",
            choices: ["Failure to thrive", "Jaundice", "Feeding difficulties", "All of the above"],
            answer: 3
          },
        { question: "What is the main treatment for Galactosemia?", choices: ["Dietary restrictions", "Medication", "Surgery", "Therapy"], answer: 0 },
        { question: "Which complication is NOT associated with Galactosemia?", choices: ["Hearing loss", "Cataracts", "Bone fractures", "Liver damage"], answer: 2 },
        { question: "How is Galactosemia inherited?", choices: ["Autosomal recessive", "Autosomal dominant", "X-linked", "Y-linked"], answer: 0 },
        {
            question: "Which genetic technique is used to detect the Duarte variant in Galactosemia?",
            choices: ["Gene sequencing", "Chromosomal karyotyping", "Western blot", "Southern blot"],
            answer: 0
          },
        { question: "Which substance is toxic in people with Galactosemia?", choices: ["Galactose-1-phosphate", "Fructose", "Sucrose", "Lactase"], answer: 0 },
        { question: "What is the long-term outcome of untreated Galactosemia?", choices: ["Severe intellectual disability", "Rapid recovery", "No effect", "Improved eyesight"], answer: 0 },
        { question: "What does GALT stand for?", choices: ["Galactose-1-phosphate uridylyltransferase", "Glucose absorption liver transport", "Galactose active lipid transfer", "Glucose acid level tolerance"], answer: 0 },
        { question: "Which food group must be avoided by those with Galactosemia?", choices: ["Dairy", "Meat", "Grains", "Fruits"], answer: 0 },
        {
            question: "What long-term developmental complication is often seen in individuals with Galactosemia?",
            choices: ["Cognitive impairments", "Hearing loss", "Vision loss", "Paralysis"],
            answer: 0
          },
        { question: "What kind of disorder is Galactosemia?", choices: ["Metabolic", "Respiratory", "Digestive", "Cardiovascular"], answer: 0 },
        { question: "Which population screening method helps identify Galactosemia?", choices: ["Newborn screening", "CT Scan", "Ultrasound", "Blood pressure test"], answer: 0 }
    ],
    [
        { question: "What is the cause of Classic Galactosemia?", choices: ["Deficiency of the enzyme GALT", "Excess glucose", "Viral infection", "Bacterial infection"], answer: 0 },
        { question: "How is Galactosemia treated?", choices: ["Elimination of galactose from the diet", "Insulin therapy", "Antibiotics", "Chemotherapy"], answer: 0 },

        { question: "Which type of inheritance pattern does Galactosemia follow?", choices: ["Autosomal recessive", "X-linked", "Autosomal dominant", "Mitochondrial"], answer: 0 },
        { question: "Which organ can be damaged due to Galactosemia?", choices: ["Liver", "Heart", "Brain", "Lungs"], answer: 0 },
        {
            question: "Which of the following is an alternative name for Galactosemia Type III?",
            choices: ["UDP-Galactose deficiency", "Galactokinase deficiency", "Epimerase deficiency", "Transferase deficiency"],
            answer: 2
          },
        { question: "In Galactosemia, the body is unable to convert galactose into what?", choices: ["Glucose", "Lactose", "Sucrose", "Fructose"], answer: 0 },
        { question: "Which group is more likely to develop Galactosemia?", choices: ["Newborns", "Teenagers", "Adults", "Elderly"], answer: 0 },
        {
            question: "How does the liver respond to accumulated galactose-1-phosphate in classic Galactosemia?",
            choices: ["It becomes enlarged", "It shrinks", "It produces more enzymes", "It stops functioning"],
            answer: 0
          },
        { question: "What test is performed to detect Galactosemia?", choices: ["Blood test", "Ultrasound", "X-ray", "MRI"], answer: 0 },
        {
            question: "Which hormone deficiency is often linked to Galactosemia-related ovarian failure?",
            choices: ["Estrogen", "Progesterone", "Testosterone", "Cortisol"],
            answer: 0
          },
        { question: "What is the toxic substance that builds up in individuals with Galactosemia?", choices: ["Galactose-1-phosphate", "Lactose", "Sucrose", "Fructose"], answer: 0 },
        { question: "What is a major symptom of untreated Galactosemia?", choices: ["Jaundice", "Blurred vision", "Dry skin", "Fever"], answer: 0 },
        {
            question: "Which technique is most reliable for prenatal diagnosis of Galactosemia?",
            choices: ["Amniocentesis", "Ultrasound", "Fetal MRI", "Chorionic villus sampling"],
            answer: 3
          },
          
        { question: "What enzyme is missing or deficient in individuals with Galactosemia?", choices: ["GALT", "Lipase", "Amylase", "Protease"], answer: 0 }
    ]
];

// // Function to generate a unique question set for each team
function generateQuestionSet() {
    const randomIndex = Math.floor(Math.random() * questionSets.length);
    questionSet = [...questionSets[randomIndex]];
    selectedQuestions.push(randomIndex); // Store the index to ensure no repetition for other teams
}

// Timer function
function startTimer() {
    const timerElement = document.getElementById('timer');
    
    timerInterval = setInterval(() => {
        timeRemaining--;
        timerElement.textContent = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// Function to start the game and display the first question
function startGame() {
    teamName = document.getElementById('team-name').value;
    if (teamName === '') {
        alert('Please enter a team name!');
        return;
    }
    document.getElementById('intro-page').style.display = 'none';
    document.getElementById('game-page').style.display = 'block';

    generateQuestionSet(); // Generate random question set for the team
    showQuestion();

    startTimer();
}

// Function to display the current question
function showQuestion() {
    const questionObj = questionSet[currentQuestionIndex];
    document.getElementById('question').textContent = questionObj.question;
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = ''; // Clear previous choices

    questionObj.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice-btn');
        button.onclick = () => checkAnswer(index, button);
        choicesDiv.appendChild(button);
    });
}

// Function to check if the selected answer is correct
function checkAnswer(selectedIndex, button) {
    const questionObj = questionSet[currentQuestionIndex];

    if (selectedIndex === questionObj.answer) {
        score += 10;
        document.getElementById('score').textContent = score;
        button.classList.add('correct');
        document.getElementById('result-text').textContent = 'Correct!';
    } else {
        button.classList.add('incorrect');
        document.getElementById('result-text').textContent = 'Incorrect!';
    }

    setTimeout(() => {
        currentQuestionIndex++;
        document.getElementById('result-text').textContent = ''; // Clear feedback

        if (currentQuestionIndex < questionSet.length) {
            showQuestion(); // Move to next question
        } else {
            endGame(); // End the game if no more questions
        }
    }, 1000); // Delay before moving to next question
}

// Function to end the game and store the team's score
function endGame() {
    clearInterval(timerInterval); // Clear the timer interval
    document.getElementById('game-page').style.display = 'none';
    document.getElementById('leaderboard-page').style.display = 'block';

    // Store the team's score
    teamsData[teamName] = score;
    updateLeaderboard();
}

// Function to update the leaderboard
function updateLeaderboard() {
    const leaderboard = document.getElementById('leaderboard');
    leaderboard.innerHTML = ''; // Clear previous leaderboard

    Object.keys(teamsData).forEach(team => {
        const listItem = document.createElement('li');
        listItem.textContent = `${team}: ${teamsData[team]} points`;
        leaderboard.appendChild(listItem);
    });
}