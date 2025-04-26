const questions = [
    { text: "Who is widely credited as the founder of genetics?", image: "" },
    { text: "What is the function of ribosomes in a cell?", image: "" },
    { text: "What organelle is known as the powerhouse of the cell?", image: "" },
    { text: "What is the capital city of country labeled 1?", image: "./LOGOS/Q4.jfif" },
    { text: "In which country is this monument located?", image: "./LOGOS/Q5.jpeg" },
    { text: "Which ancient empire is known for building this?", image: "./LOGOS/Q6.jpeg" },
    { text: "Which hormone is responsible for stimulating milk production in mammary glands?", image: "" },
    { text: "What country’s flag is this?", image: "./LOGOS/Q8.jpeg" },
    { text: "What is the most widely spoken native language worldwide?", image: "" }
];

let timeLeft = 10;
let timer;
let timerRunning = false;
let questionAnswered = false; // ⬅️ متغير جديد لمنع تكرار السكور

const timerElem = document.getElementById("clock");

// إضافة هذا الكود في بداية الملف
document.addEventListener('DOMContentLoaded', function() {
    // استرجاع أسماء الفرق من localStorage
    const team1Name = localStorage.getItem('team1Name');
    const team2Name = localStorage.getItem('team2Name');
    
    // تحديث عناصر العرض
    if (team1Name) {
        document.getElementById('team1-name').textContent = team1Name;
        document.getElementById('team1').textContent = team1Name;
    }
    
    if (team2Name) {
        document.getElementById('team2-name').textContent = team2Name;
        document.getElementById('team2').textContent = team2Name;
    }
});


const timerSound = new Audio('Sound/10sec.m4a');



function startTimer() {
    if (!timerRunning) {
        timeLeft = 10;
        timerElem.textContent = timeLeft;
        timerSound.play();
        timer = setInterval(() => {
            timeLeft--;
            timerElem.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                timerRunning = false;
                questionAnswered = true; // منع الإجابة بعد انتهاء الوقت
                
                // 🕒 Alert انتهاء الوقت
                Swal.fire({
                    title: "انتهى الوقت!",
                    text: "لم يتم اختيار إجابة في الوقت المحدد ⏳",
                    icon: "warning",
                    confirmButtonColor: "#f39c12",
                    confirmButtonText: "التالي",
                    timer: 1000,
                    showClass: {
                        popup: 'animate_animated animate_shakeX'
                    },
                    hideClass: {
                        popup: 'animate_animated animate_fadeOut'
                    }
                });

                removeActiveTeam(); // إزالة لون الفريق المختار
            }
        }, 1000);
        timerRunning = true;
    }
}


function stopTimer() {
    clearInterval(timer);
    timerRunning = false;
}

function resetTimer() {
    stopTimer();
    timerElem.textContent = "10";
}



let currentQuestion = 0;
function isArabicText(text) {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text);
}

function displayQuestion() {
    const questionElem = document.getElementById('question');
    const questionImage = document.getElementById('question-image');
    
    const questionNumber = currentQuestion + 1;
    const questionText = questions[currentQuestion].text;
    
    // التحقق من لغة السؤال
    if (isArabicText(questionText)) {
        // إذا كان السؤال بالعربية
        questionElem.innerHTML = `<span class="question-number">${questionNumber}</span> ${questionText}`;
        questionElem.style.direction = 'rtl';
    } else {
        // إذا كان السؤال بالإنجليزية
        questionElem.innerHTML = `<span class="question-number">${questionNumber}</span> ${questionText}`;
        questionElem.style.direction = 'ltr';
    }
    
    if (questions[currentQuestion].image) {
        questionImage.src = questions[currentQuestion].image;
        questionImage.style.display = "block";
    } else {
        questionImage.style.display = "none";
    }

    resetTimer();
    questionAnswered = false;
}

document.getElementById('next').addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    }
});

document.getElementById('prev').addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
});

displayQuestion();

let score1 = 0;
let score2 = 0;
let currentTeam = 0;
   
let correctSound = new Audio("Sound/Correct.m4a");  
let wrongSound = new Audio("Sound/wrong.m4a");     



document.getElementById('correct').addEventListener('click', () => {
    if (!questionAnswered) { // ⬅️ التحقق من عدم احتساب النقطة من قبل
        if (currentTeam === 1) {
            score1++;
            document.getElementById('score1').innerText = score1;
        } else if (currentTeam === 2) {
            score2++;
            document.getElementById('score2').innerText = score2;
        }
        questionAnswered = true; // ⬅️ منع احتساب نقطة أخرى لنفس السؤال

    // تشغيل صوت الإجابة الصحيحة
        correctSound.currentTime = 0; // التأكد من تشغيله من البداية
        correctSound.play();

        Swal.fire({
            title: "إجابة صحيحة!",
            text: " تم احتساب النقطة ✅",
            icon: "success",
            confirmButtonColor: "#038369",
            confirmButtonText: "التالي",
            timer: 2000,
            showClass: {
                popup: 'animate_animated animate_fadeInDown'
            },
            hideClass: {
                popup: 'animate_animated animate_fadeOutUp'
            }
            });

    }
    stopTimer();
});

document.getElementById('wrong').addEventListener('click', () => {
    stopTimer();
    questionAnswered = true; // ⬅️ منع إعادة الإجابة على السؤال

    // تشغيل صوت الإجابة الخاطئة
    wrongSound.currentTime = 0; // التأكد من تشغيله من البداية
    wrongSound.play();

    Swal.fire({
        title: "إجابة خاطئة!",
        text: " ",
        icon: "error",
        confirmButtonColor: "#c64f17",
        confirmButtonText: "التالي",
        timer: 2000,
        showClass: {
            popup: 'animate_animated animate_shakeX'
        },
        hideClass: {
            popup: 'animate_animated animate_fadeOut'
        }
    });

    removeActiveTeam();

});


document.getElementById('team1').addEventListener('click', () => {
    currentTeam = 1;
    startTimer();
    highlightActiveTeam("team1");
});

document.getElementById('team2').addEventListener('click', () => {
    currentTeam = 2;
    startTimer();
    highlightActiveTeam("team2");
});

// دالة تغيير لون الزرار للفريق النشط
function highlightActiveTeam(teamId) {
    document.getElementById('team1').classList.remove("active-team");
    document.getElementById('team2').classList.remove("active-team");
    document.getElementById(teamId).classList.add("active-team");
}

// عند اختيار إجابة، يتم إزالة التمييز من الفريق
document.getElementById('correct').addEventListener('click', () => {
    if (!questionAnswered) {
        if (currentTeam === 1) {
            score1++;
            document.getElementById('score1').innerText = score1;
        } else if (currentTeam === 2) {
            score2++;
            document.getElementById('score2').innerText = score2;
        }
        questionAnswered = true;
    }
    stopTimer();
    removeActiveTeam();
});

document.getElementById('wrong').addEventListener('click', () => {
    stopTimer();
    questionAnswered = true;
    removeActiveTeam();
});

// دالة لإزالة التحديد بعد الإجابة
function removeActiveTeam() {
    document.getElementById('team1').classList.remove("active-team");
    document.getElementById('team2').classList.remove("active-team");
}

function checkFinalScore() {
    // تخزين النقاط في localStorage
    localStorage.setItem("mcqTeam1Points", score1);
    localStorage.setItem("mcqTeam2Points", score2);

    const team1Name = localStorage.getItem('team1Name');
    const team2Name = localStorage.getItem('team2Name');
    
    if (score1 > score2) {
        Swal.fire({
            title: `${team1Name} Wins!`,
            text: "تم إضافة نقطة للفريق الفائز",
            icon: "success",
            confirmButtonText: "العودة للقائمة الرئيسية",
        }).then(() => {
            window.location.href = 'Competition.html';
        });
    } else if (score2 > score1) {
        Swal.fire({
            title: `${team2Name} Wins!`,
            text: "تم إضافة نقطة للفريق الفائز",
            icon: "success",
            confirmButtonText: "العودة للقائمة الرئيسية",
        }).then(() => {
            window.location.href = 'Competition.html';
        });
    } else {
        Swal.fire({
            title: "تعادل!",
            text: "لم يتم احتساب نقاط",
            icon: "info",
            confirmButtonText: "العودة للقائمة الرئيسية",
        }).then(() => {
            window.location.href = 'Competition.html';
        });
    }
}

document.getElementById('finish-game').addEventListener('click', checkFinalScore);