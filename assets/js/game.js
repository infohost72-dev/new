(function() {
    // Game state
    const gameState = {
        totalScore: 0,
        completedCategories: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        currentStreak: 0,
        longestStreak: 0,
        currentCategory: null,
        currentQuestionIndex: 0,
        currentQuestions: [],
        selectedAnswer: null,
        timeRemaining: 30,
        timerInterval: null,
        categoryProgress: {}
    };

    // 30 Categories with enhanced descriptions
    const categories = [
        { id: 'science', name: 'Quantum Science', icon: '⚛️', description: 'Explore physics, chemistry, and cutting-edge discoveries', color: '#00ffff' },
        { id: 'technology', name: 'Cyber Tech', icon: '🔬', description: 'AI, robotics, and futuristic innovations', color: '#ff00ff' },
        { id: 'history', name: 'Digital History', icon: '🏛️', description: 'Ancient civilizations to modern events', color: '#00ff88' },
        { id: 'geography', name: 'Terra Mapping', icon: '🗺️', description: 'Countries, capitals, and natural wonders', color: '#ffff00' },
        { id: 'literature', name: 'Data Literature', icon: '📚', description: 'Classic and contemporary literary works', color: '#ff6b6b' },
        { id: 'movies', name: 'Holo Cinema', icon: '🎬', description: 'Films, directors, and entertainment history', color: '#4ecdc4' },
        { id: 'music', name: 'Sound Waves', icon: '🎵', description: 'Musical genres, artists, and compositions', color: '#ffe66d' },
        { id: 'sports', name: 'Combat Arena', icon: '⚽', description: 'Athletics, competitions, and champions', color: '#a8e6cf' },
        { id: 'food', name: 'Nutrition Matrix', icon: '🍕', description: 'Cuisine, cooking, and culinary traditions', color: '#ff9ff3' },
        { id: 'nature', name: 'Bio Systems', icon: '🌿', description: 'Flora, fauna, and ecological networks', color: '#54a0ff' },
        { id: 'space', name: 'Cosmic Data', icon: '🚀', description: 'Astronomy, space exploration, and universe', color: '#5f27cd' },
        { id: 'art', name: 'Visual Codex', icon: '🎨', description: 'Painting, sculpture, and artistic movements', color: '#00d2d3' },
        { id: 'mythology', name: 'Ancient Protocols', icon: '⚡', description: 'Gods, legends, and mythical beings', color: '#ff9f43' },
        { id: 'languages', name: 'Linguistic Core', icon: '🗣️', description: 'World languages and communication systems', color: '#ee5a24' },
        { id: 'philosophy', name: 'Core Logic', icon: '⚖️', description: 'Thinkers, theories, and ethical questions', color: '#0984e3' },
        { id: 'mathematics', name: 'Number Systems', icon: '🔢', description: 'Equations, theorems, and mathematical concepts', color: '#6c5ce7' },
        { id: 'bionics', name: 'Bionic Systems', icon: '🦾', description: 'Implants, enhancements, and human-machine integration', color: '#fd79a8' },
        { id: 'behavior', name: 'Behavioral Algorithms', icon: '📈', description: 'Analyzing patterns in human and AI behavior', color: '#fdcb6e' },
        { id: 'economics', name: 'Resource Flow', icon: '💰', description: 'Markets, trade, and economic systems', color: '#e17055' },
        { id: 'politics', name: 'Power Structures', icon: '⚖️', description: 'Government, policy, and political systems', color: '#74b9ff' },
        { id: 'religion', name: 'Belief Systems', icon: '🕉️', description: 'Faiths, traditions, and spiritual practices', color: '#a29bfe' },
        { id: 'fashion', name: 'Style Matrix', icon: '👗', description: 'Clothing, trends, and fashion history', color: '#fd79a8' },
        { id: 'architecture', name: 'Structure Codex', icon: '🏗️', description: 'Buildings, design, and architectural styles', color: '#636e72' },
        { id: 'transportation', name: 'Mobility Systems', icon: '🚗', description: 'Vehicles, travel, and transportation history', color: '#00cec9' },
        { id: 'games', name: 'Play Algorithms', icon: '🎮', description: 'Video games, board games, and gaming culture', color: '#e84393' },
        { id: 'anime', name: 'Animation Core', icon: '🎌', description: 'Japanese animation and manga culture', color: '#fd63a8' },
        { id: 'comics', name: 'Hero Database', icon: '🦸', description: 'Superheroes, villains, and comic universes', color: '#ffeaa7' },
        { id: 'photography', name: 'Image Capture', icon: '📸', description: 'Cameras, techniques, and visual storytelling', color: '#81ecec' },
        { id: 'dance', name: 'Motion Sync', icon: '💃', description: 'Dance styles, choreography, and performances', color: '#fab1a0' },
        { id: 'trivia', name: 'Random Access', icon: '🎯', description: 'Mixed knowledge and fun facts', color: '#ff7675' }
    ];

    // Sample questions database (in a real app, this would be much larger)
    const questionsDatabase = {
        science: [
            { question: "What is the smallest unit of matter?", options: ["Molecule", "Atom", "Proton", "Electron"], correct: 1 },
            { question: "What does DNA stand for?", options: ["Deoxyribonucleic Acid", "Deoxyribose Nucleic Acid", "Dynamic Nuclear Assembly", "Deoxyribonucleic Assembly"], correct: 0 },
            { question: "What is the speed of light in vacuum?", options: ["300,000 km/s", "299,792,458 m/s", "186,000 miles/s", "All of the above"], correct: 3 },
            { question: "Which planet is known as the Red Planet?", options: ["Venus", "Jupiter", "Mars", "Saturn"], correct: 2 },
            { question: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], correct: 2 },
            { question: "How many chambers does a human heart have?", options: ["2", "3", "4", "5"], correct: 2 },
            { question: "What is the hardest natural substance?", options: ["Quartz", "Diamond", "Graphite", "Steel"], correct: 1 },
            { question: "Which gas makes up about 78% of Earth's atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"], correct: 1 },
            { question: "What is the study of earthquakes called?", options: ["Seismology", "Geology", "Meteorology", "Volcanology"], correct: 0 },
            { question: "Which part of a cell is known as its powerhouse?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Apparatus"], correct: 2 }
        ],
        technology: [
            { question: "Who founded Microsoft?", options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Larry Page"], correct: 1 },
            { question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Processing Unit", "Central Program Unit", "Computer Program Unit"], correct: 0 },
            { question: "Which programming language was created by Guido van Rossum?", options: ["Java", "C++", "Python", "JavaScript"], correct: 2 },
            { question: "What does HTTP stand for?", options: ["HyperText Transfer Protocol", "HyperText Transmission Protocol", "High Transfer Text Protocol", "HyperText Transport Protocol"], correct: 0 },
            { question: "When was the World Wide Web invented?", options: ["1989", "1991", "1993", "1995"], correct: 0 },
            { question: "What is the maximum capacity of a standard DVD?", options: ["4.7 GB", "8.5 GB", "9.4 GB", "17 GB"], correct: 0 },
            { question: "Which company developed the Android operating system?", options: ["Apple", "Google", "Microsoft", "Samsung"], correct: 1 },
            { question: "What is the binary representation of the decimal number 8?", options: ["1000", "1010", "1100", "1111"], correct: 0 },
            { question: "Which protocol is used for secure web browsing?", options: ["HTTP", "HTTPS", "FTP", "SMTP"], correct: 1 },
            { question: "What does AI stand for?", options: ["Artificial Intelligence", "Automated Intelligence", "Advanced Intelligence", "Algorithmic Intelligence"], correct: 0 }
        ],
        history: [
            { question: "In which year did World War II end?", options: ["1944", "1945", "1946", "1947"], correct: 1 },
            { question: "Who was the first person to walk on the moon?", options: ["Buzz Aldrin", "Neil Armstrong", "John Glenn", "Alan Shepard"], correct: 1 },
            { question: "Which ancient wonder was located in Alexandria?", options: ["Hanging Gardens", "Colossus of Rhodes", "Lighthouse", "Great Pyramid"], correct: 2 },
            { question: "The Berlin Wall fell in which year?", options: ["1987", "1988", "1989", "1990"], correct: 2 },
            { question: "Who was known as the Iron Lady?", options: ["Angela Merkel", "Margaret Thatcher", "Golda Meir", "Indira Gandhi"], correct: 1 },
            { question: "Which empire was ruled by Julius Caesar?", options: ["Greek", "Roman", "Byzantine", "Ottoman"], correct: 1 },
            { question: "The French Revolution began in which year?", options: ["1789", "1799", "1804", "1815"], correct: 0 },
            { question: "Who painted the ceiling of the Sistine Chapel?", options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"], correct: 2 },
            { question: "Which war was fought between the North and South in America?", options: ["Revolutionary War", "War of 1812", "Civil War", "Spanish-American War"], correct: 2 },
            { question: "The Titanic sank in which year?", options: ["1910", "1911", "1912", "1913"], correct: 2 }
        ],
        // Add more categories with 10 questions each...
        geography: [
            { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], correct: 2 },
            { question: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Mississippi", "Yangtze"], correct: 1 },
            { question: "Mount Everest is located in which mountain range?", options: ["Andes", "Alps", "Rockies", "Himalayas"], correct: 3 },
            { question: "Which country has the most time zones?", options: ["Russia", "United States", "China", "Canada"], correct: 0 },
            { question: "What is the smallest country in the world?", options: ["Monaco", "Nauru", "Vatican City", "San Marino"], correct: 2 },
            { question: "Which desert is the largest in the world?", options: ["Sahara", "Gobi", "Antarctic", "Arabian"], correct: 2 },
            { question: "The Great Barrier Reef is located near which country?", options: ["New Zealand", "Australia", "Fiji", "Papua New Guinea"], correct: 1 },
            { question: "Which strait separates Europe and Africa?", options: ["Bering Strait", "Strait of Gibraltar", "Strait of Hormuz", "Bass Strait"], correct: 1 },
            { question: "What is the highest waterfall in the world?", options: ["Niagara Falls", "Victoria Falls", "Angel Falls", "Iguazu Falls"], correct: 2 },
            { question: "Which city is known as the Big Apple?", options: ["Los Angeles", "Chicago", "New York", "San Francisco"], correct: 2 }
        ]
        // Note: In a real application, you would have all 30 categories with 10+ questions each
        ,
        bionics: [
            { question: "What does 'cyborg' stand for?", options: ["Cybernetic Organism", "Cylindrical Robot", "Cybernetic Android", "Cyber-Organic Robot"], correct: 0 },
            { question: "A prosthetic limb is an example of what?", options: ["An implant", "An exoskeleton", "A bionic enhancement", "All of the above"], correct: 3 },
            { question: "In sci-fi, what is a common power source for bionics?", options: ["Solar", "Micro-fusion cell", "AA Batteries", "Kinetic energy"], correct: 1 },
            { question: "What field combines biology, mechanics, and electronics?", options: ["Biochemistry", "Bionics", "Bioengineering", "Biophysics"], correct: 1 },
            { question: "Which of these is a famous fictional cyborg?", options: ["Superman", "The Terminator", "Spider-Man", "The Hulk"], correct: 1 },
            { question: "What is the primary purpose of an exoskeleton?", options: ["Fashion", "Strength augmentation", "Stealth", "Data storage"], correct: 1 },
            { question: "The term 'android' typically refers to a robot that...", options: ["Can fly", "Resembles a human", "Is self-aware", "Has no emotions"], correct: 1 },
            { question: "What is a neural interface?", options: ["A computer screen", "A brain-computer link", "A type of software", "A robotic eye"], correct: 1 },
            { question: "Which sense is most commonly replaced with a bionic version in fiction?", options: ["Smell", "Taste", "Touch", "Sight"], correct: 3 },
            { question: "What is 'transhumanism'?", options: ["A genre of music", "A political party", "A philosophy favoring the evolution of humanity through technology", "A type of computer virus"], correct: 2 }
        ],
        behavior: [
            { question: "What is the 'Turing Test' designed to assess?", options: ["A machine's processing speed", "A machine's ability to exhibit intelligent behavior", "A machine's battery life", "A machine's physical strength"], correct: 1 },
            { question: "In game theory, what is a 'zero-sum game'?", options: ["A game with no rules", "A situation where one person's gain is another's loss", "A game that always ends in a tie", "A game with infinite players"], correct: 1 },
            { question: "What is 'confirmation bias'?", options: ["The tendency to favor information that confirms existing beliefs", "The bias towards confirming a purchase", "The bias of a robot to its creator", "The tendency to be a conformist"], correct: 0 },
            { question: "An algorithm that learns from data is a key component of what?", options: ["A static website", "A simple calculator", "Machine Learning", "A word processor"], correct: 2 },
            { question: "What does a 'heuristic' refer to in problem-solving?", options: ["A guaranteed solution", "A random guess", "A practical shortcut to find a solution", "A complex formula"], correct: 2 },
            { question: "What is 'groupthink'?", options: ["A form of brainstorming", "A collective AI consciousness", "A phenomenon where a group desires conformity, resulting in irrational decisions", "A team-building exercise"], correct: 2 },
            { question: "In AI, what is a 'neural network' loosely modeled after?", options: ["The internet", "A social network", "The human brain's structure", "A crystal lattice"], correct: 2 },
            { question: "What is 'operant conditioning'?", options: ["A method of learning that uses rewards and punishments", "A computer maintenance procedure", "A type of software update", "A surgical procedure"], correct: 0 },
            { question: "The 'Uncanny Valley' describes the feeling of unease towards robots that appear...", options: ["Too metallic", "Almost, but not perfectly, human", "Too small", "Overly friendly"], correct: 1 },
            { question: "A 'feedback loop' is a system where...", options: ["There is no output", "The output of an action is used to modify the next action", "The system shuts down after one cycle", "All data is deleted"], correct: 1 }
        ]
    };

    // DOM Elements
    const elements = {
        totalScore: document.getElementById('totalScore'),
        completedCategories: document.getElementById('completedCategories'),
        accuracyRate: document.getElementById('accuracyRate'),
        currentStreak: document.getElementById('currentStreak'),
        timer: document.getElementById('timer'),
        timerValue: document.getElementById('timerValue'),
        categorySelection: document.getElementById('categorySelection'),
        categoryGrid: document.getElementById('categoryGrid'),
        quizContainer: document.getElementById('quizContainer'),
        resultsScreen: document.getElementById('resultsScreen'),
        categoryName: document.getElementById('categoryName'),
        questionCounter: document.getElementById('questionCounter'),
        questionText: document.getElementById('questionText'),
        optionsContainer: document.getElementById('optionsContainer'),
        resetProgressBtn: document.getElementById('resetProgressBtn'),
        randomCategoryBtn: document.getElementById('randomCategoryBtn'),
        backToCategoriesBtn: document.getElementById('backToCategoriesBtn'),
        nextQuestionBtn: document.getElementById('nextQuestionBtn'),
        finishQuizBtn: document.getElementById('finishQuizBtn'),
        resultsTitle: document.getElementById('resultsTitle'),
        resultsDescription: document.getElementById('resultsDescription'),
        resultsStats: document.getElementById('resultsStats'),
        retryQuizBtn: document.getElementById('retryQuizBtn'),
        backToMenuBtn: document.getElementById('backToMenuBtn')
    };

    // Initialize the game
    function initGame() {
        loadGameState();
        renderCategories();
        updateStats();
        addEventListeners();
    }

    // Load game state from localStorage
    function loadGameState() {
        const savedState = localStorage.getItem('cyberQuizState');
        if (savedState) {
            const parsed = JSON.parse(savedState);
            Object.assign(gameState, parsed);
        }
    }

    // Save game state to localStorage
    function saveGameState() {
        localStorage.setItem('cyberQuizState', JSON.stringify(gameState));
    }

    // Render category grid
    function renderCategories() {
        elements.categoryGrid.innerHTML = '';
        
        categories.forEach(category => {
            const progress = gameState.categoryProgress[category.id] || { completed: 0, total: 10, bestScore: 0 };
            const progressPercent = (progress.completed / progress.total) * 100;
            
            const categoryCard = document.createElement('div');
            categoryCard.className = `category-card ${progress.completed === progress.total ? 'completed' : ''}`;
            categoryCard.innerHTML = `
                <div class="category-title">${category.icon} ${category.name}</div>
                <div class="category-description">${category.description}</div>
                <div class="category-progress">
                    <span>${progress.completed}/${progress.total} completed</span>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressPercent}%"></div>
                    </div>
                </div>
            `;
            
            categoryCard.addEventListener('click', () => startQuiz(category.id));
            elements.categoryGrid.appendChild(categoryCard);
        });
    }

    // Update statistics display
    function updateStats() {
        elements.totalScore.textContent = gameState.totalScore;
        elements.completedCategories.textContent = `${gameState.completedCategories}/30`;
        
        const accuracy = gameState.totalQuestions > 0 
            ? Math.round((gameState.correctAnswers / gameState.totalQuestions) * 100)
            : 0;
        elements.accuracyRate.textContent = `${accuracy}%`;
        elements.currentStreak.textContent = gameState.currentStreak;
    }

    // Start quiz for selected category
    function startQuiz(categoryId) {
        const category = categories.find(cat => cat.id === categoryId);
        if (!category) return;

        gameState.currentCategory = categoryId;
        gameState.currentQuestionIndex = 0;
        gameState.selectedAnswer = null;
        
        // Get questions for this category (fallback to science if not available)
        const questions = questionsDatabase[categoryId] || questionsDatabase.science;
        gameState.currentQuestions = shuffleArray([...questions]).slice(0, 10);
        
        // Show quiz container
        elements.categorySelection.style.display = 'none';
        elements.quizContainer.style.display = 'block';
        elements.resultsScreen.style.display = 'none';
        elements.timer.style.display = 'block';
        
        elements.categoryName.textContent = category.name;
        
        displayQuestion();
        startTimer();
    }

    // Display current question
    function displayQuestion() {
        const question = gameState.currentQuestions[gameState.currentQuestionIndex];
        if (!question) return;

        elements.questionCounter.textContent = `Question ${gameState.currentQuestionIndex + 1} of ${gameState.currentQuestions.length}`;
        elements.questionText.textContent = question.question;
        
        // Create option elements
        elements.optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectAnswer(index));
            elements.optionsContainer.appendChild(optionElement);
        });
        
        // Reset UI state
        gameState.selectedAnswer = null;
        elements.nextQuestionBtn.disabled = true;
        elements.finishQuizBtn.style.display = 'none';
        
        // Show finish button on last question
        if (gameState.currentQuestionIndex === gameState.currentQuestions.length - 1) {
            elements.finishQuizBtn.style.display = 'inline-block';
        }
    }

    // Handle answer selection
    function selectAnswer(answerIndex) {
        if (gameState.selectedAnswer !== null) return; // Already answered
        
        gameState.selectedAnswer = answerIndex;
        const question = gameState.currentQuestions[gameState.currentQuestionIndex];
        const options = elements.optionsContainer.children;
        
        // Show correct/incorrect styling
        Array.from(options).forEach((option, index) => {
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === answerIndex && answerIndex !== question.correct) {
                option.classList.add('wrong');
            }
            option.style.pointerEvents = 'none';
        });
        
        // Update statistics
        gameState.totalQuestions++;
        if (answerIndex === question.correct) {
            gameState.correctAnswers++;
            gameState.currentStreak++;
            gameState.totalScore += calculateScore();
            
            // Visual feedback for correct answer
            createSuccessEffect();
        } else {
            gameState.currentStreak = 0;
            createErrorEffect();
        }
        
        // Enable next button or finish button
        if (gameState.currentQuestionIndex < gameState.currentQuestions.length - 1) {
            elements.nextQuestionBtn.disabled = false;
        }
        
        stopTimer();
        updateStats();
        saveGameState();
    }

    // Calculate score based on time and streak
    function calculateScore() {
        const baseScore = 100;
        const timeBonus = Math.max(0, gameState.timeRemaining - 10) * 2;
        const streakBonus = Math.min(gameState.currentStreak * 10, 100);
        return baseScore + timeBonus + streakBonus;
    }

    // Start question timer
    function startTimer() {
        gameState.timeRemaining = 30;
        elements.timerValue.textContent = gameState.timeRemaining;
        elements.timer.classList.remove('warning');
        
        gameState.timerInterval = setInterval(() => {
            gameState.timeRemaining--;
            elements.timerValue.textContent = gameState.timeRemaining;
            
            if (gameState.timeRemaining <= 10) {
                elements.timer.classList.add('warning');
            }
            
            if (gameState.timeRemaining <= 0) {
                stopTimer();
                // Auto-select wrong answer if time runs out
                if (gameState.selectedAnswer === null) {
                    const wrongAnswers = [0, 1, 2, 3].filter(i => 
                        i !== gameState.currentQuestions[gameState.currentQuestionIndex].correct
                    );
                    selectAnswer(wrongAnswers[0]);
                }
            }
        }, 1000);
    }

    // Stop question timer
    function stopTimer() {
        if (gameState.timerInterval) {
            clearInterval(gameState.timerInterval);
            gameState.timerInterval = null;
        }
    }

    // Move to next question
    function nextQuestion() {
        gameState.currentQuestionIndex++;
        if (gameState.currentQuestionIndex < gameState.currentQuestions.length) {
            displayQuestion();
            startTimer();
        } else {
            finishQuiz();
        }
    }

    // Finish current quiz
    function finishQuiz() {
        stopTimer();
        
        // Update category progress
        const categoryId = gameState.currentCategory;
        if (!gameState.categoryProgress[categoryId]) {
            gameState.categoryProgress[categoryId] = { completed: 0, total: 10, bestScore: 0 };
        }
        
        const categoryScore = gameState.currentQuestions.reduce((score, question, index) => {
            return score + (gameState.selectedAnswer !== null ? calculateScore() : 0);
        }, 0);
        
        gameState.categoryProgress[categoryId].completed = gameState.currentQuestions.length;
        gameState.categoryProgress[categoryId].bestScore = Math.max(
            gameState.categoryProgress[categoryId].bestScore,
            categoryScore
        );
        
        // Check if category is newly completed
        if (gameState.categoryProgress[categoryId].completed === gameState.categoryProgress[categoryId].total) {
            gameState.completedCategories = Object.values(gameState.categoryProgress)
                .filter(progress => progress.completed === progress.total).length;
        }
        
        showResults();
        saveGameState();
    }

    // Show results screen
    function showResults() {
        elements.quizContainer.style.display = 'none';
        elements.timer.style.display = 'none';
        elements.resultsScreen.style.display = 'block';
        
        const categoryName = categories.find(cat => cat.id === gameState.currentCategory)?.name || 'Unknown';
        const correctCount = gameState.currentQuestions.filter((_, index) => 
            index <= gameState.currentQuestionIndex
        ).length; // Simplified for demo
        
        const accuracy = Math.round((correctCount / gameState.currentQuestions.length) * 100);
        const grade = accuracy >= 90 ? 'EXCELLENT' : accuracy >= 70 ? 'GOOD' : accuracy >= 50 ? 'AVERAGE' : 'POOR';
        
        elements.resultsTitle.textContent = `ANALYSIS: ${categoryName} COMPLETE`;
        elements.resultsDescription.textContent = `Performance analysis: ${grade} result detected.`;
        
        elements.resultsStats.innerHTML = `
            <div class="stat-card">
                <div class="stat-label">Questions Correct</div>
                <div class="stat-value">${correctCount}/${gameState.currentQuestions.length}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Accuracy</div>
                <div class="stat-value">${accuracy}%</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Score Earned</div>
                <div class="stat-value">+${calculateScore()}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Time Average</div>
                <div class="stat-value">${Math.round(30 - gameState.timeRemaining)}s</div>
            </div>
        `;
    }

    // Return to category selection
    function backToCategories() {
        stopTimer();
        elements.categorySelection.style.display = 'block';
        elements.quizContainer.style.display = 'none';
        elements.resultsScreen.style.display = 'none';
        elements.timer.style.display = 'none';
        
        renderCategories();
        updateStats();
    }

    // Visual effects
    function createSuccessEffect() {
        document.body.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.5)';
        setTimeout(() => {
            document.body.style.boxShadow = '';
        }, 500);
    }

    function createErrorEffect() {
        document.body.style.boxShadow = '0 0 30px rgba(255, 68, 68, 0.5)';
        setTimeout(() => {
            document.body.style.boxShadow = '';
        }, 500);
    }

    // Utility functions
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    function resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This action cannot be undone.')) {
            gameState.totalScore = 0;
            gameState.completedCategories = 0;
            gameState.totalQuestions = 0;
            gameState.correctAnswers = 0;
            gameState.currentStreak = 0;
            gameState.categoryProgress = {};
            
            saveGameState();
            renderCategories();
            updateStats();
            
            alert('Progress reset successfully!');
        }
    }

    function selectRandomCategory() {
        const availableCategories = categories.filter(cat => {
            const progress = gameState.categoryProgress[cat.id];
            return !progress || progress.completed < progress.total;
        });
        
        if (availableCategories.length === 0) {
            alert('All categories completed! Amazing work!');
            return;
        }
        
        const randomCategory = availableCategories[Math.floor(Math.random() * availableCategories.length)];
        startQuiz(randomCategory.id);
    }

    // Event listeners
    function addEventListeners() {
        elements.resetProgressBtn.addEventListener('click', resetProgress);
        elements.randomCategoryBtn.addEventListener('click', selectRandomCategory);
        elements.backToCategoriesBtn.addEventListener('click', backToCategories);
        elements.nextQuestionBtn.addEventListener('click', nextQuestion);
        elements.finishQuizBtn.addEventListener('click', finishQuiz);
        elements.retryQuizBtn.addEventListener('click', () => startQuiz(gameState.currentCategory));
        elements.backToMenuBtn.addEventListener('click', backToCategories);
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (elements.quizContainer.style.display === 'block') {
                if (e.key >= '1' && e.key <= '4') {
                    const index = parseInt(e.key) - 1;
                    if (gameState.selectedAnswer === null) {
                        selectAnswer(index);
                    }
                }
                if (e.key === 'Enter' && !elements.nextQuestionBtn.disabled) {
                    nextQuestion();
                }
            }
        });
    }

    // Initialize the game when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGame);
    } else {
        initGame();
    }
})();