// document.addEventListener("DOMContentLoaded", function () {
//   const logoScreen = document.getElementById("intro-screen");
//   const teamSelectionScreen = document.getElementById("team-selection");
//   const categoriesScreen = document.getElementById("categories-screen");
//   const startBtn = document.getElementById("start-btn");
//   const restartBtn = document.querySelector("button[onclick='restartGame()']");
//   const teamButtons = document.querySelectorAll(".team-btn");
// })

// أسئلة افتراضية
const questions = {
  "Historical": [
    {
      points: 10,
      question: "When was Saudi Arabia officially founded?",
      image: "",
      choices: ["1902", "1926", "1932", "1953"],
      correctAnswer: "1932",
    },
    {
      points: 30,
      question: "Which of the following countries is known as ‘The Land of Everest’?",
      image: "",
      choices: ["China", "Nepal", "Pakistan", "Tibet"],
      correctAnswer: "Nepal",
    },
    {
      points: 50,
      question: "Who was the first animal to orbit the Earth?",
      image: "",
      choices: ["Ham the chimpanzee", "Laika the dog", "Yuri Gagarin the human", "Félicette the cat"],
      correctAnswer: "Laika the dog",
    
    }
  ],
  "Geographic": [
    {
      points: 10,
      question: "What is the second largest continent by land area?",
      image: "",
      choices: ["Africa", "Asia", "Europe", "Antarctica"],
      correctAnswer: "Africa",
    },
    {
      points: 30,
      question: "The Baltic Sea is bordered by which of the following countries?",
      image: "",
      choices: ["Norway", "Germany", "France", "United Kingdom"],
      correctAnswer: "Germany",
    },
    {
      points: 50,
      question: "What is the southernmost city in the world?",
      image: "",
      choices: ["Punta Arenas, Chile", "Ushuaia, Argentina", "Puerto Williams, Chile", "Christchurch, New Zealand"],
      correctAnswer: "Puerto Williams, Chile",
    }
  ],
  "Science": [
    {
      points: 10,
      question: "What is the unit of electrical resistance?",
      image: "",
      choices: ["Volt", "Coulomb", "Ohm", "Ampere"],
      correctAnswer: "Ohm",
    },
    {
      points: 30,
      question: "Which of the following cell cycle checkpoints ensures that DNA replication is complete before mitosis?",
      image: "",
      choices: ["G0 checkpoint", "G2/M checkpoint", "Metaphase checkpoint", "G1/S checkpoint"],
      correctAnswer: "G2/M checkpoint",
    },
    {
      points: 50,
      question: "Which element is considered the 'backbone' of organic chemistry due to its ability to form stable covalent bonds with itself and other elements?",
      image: "",
      choices: ["Nitrogen", "Oxygen", "Carbon", "Hydrogen"],
      correctAnswer: "Carbon",
    }
  ],
  "Medicine": [
    {
      points: 10,
      question: "Which of the following is NOT an adverse effect of β2 agonists?",
      image: "",
      choices: ["Tremors", "Tachycardia", "Bradycardia", "Arrhythmia"],
      correctAnswer: "Bradycardia",
    },
    {
      points: 30,
      question: "Which of the following medications is an anti-influenza agent?",
      image: "",
      choices: ["Oseltamivir (Tamiflu)", "Acyclovir (Anti-HSV)", "Valacyclovir (Anti-HSV)", "Famciclovir (Anti-HSV)"],
      correctAnswer: "Oseltamivir (Tamiflu)",
    },
    {
      points: 50,
      question: "Which of the following is NOT a branch of the celiac trunk?",
      image: "",
      choices: ["Left gastric artery", "Inferior mesenteric artery", "Splenic artery", "Common hepatic artery"],
      correctAnswer: "Inferior mesenteric artery",
    }
    
  ]
};

let team1Score = 0;
let team2Score = 0;
let mainTimer;
let timeLeft = 30; // الوقت الافتراضي


function resetPage() {
  // مسح البيانات المخزنة للفريق المحدد
  localStorage.removeItem("selectedTeam");
  
  // إعادة تعيين الألوان الأصلية
  document.querySelector(".team-left").style.backgroundColor = "";
  document.querySelector(".team-right").style.backgroundColor = "";
  
  // إعادة تعيين المتغير selectedTeam
  selectedTeam = null;
}

document.addEventListener("DOMContentLoaded", function() {

  resetPage();
  // استعادة النقاط المخزنة سابقاً إن وجدت
  const savedScores = localStorage.getItem("totalPoints");
  if (savedScores) {
      const scores = JSON.parse(savedScores);
      team1Score = scores.team1;
      team2Score = scores.team2;
      
      // تحديث العرض
      document.getElementById("team1-score").textContent = `${team1Score} Points`;
      document.getElementById("team2-score").textContent = `${team2Score} Points`;
  }

  // استعادة أسماء الفرق
  const team1Name = localStorage.getItem("team1Name");
  const team2Name = localStorage.getItem("team2Name");
  
  if (team1Name && team2Name) {
      document.getElementById("team1-name").innerText = team1Name;
      document.getElementById("team2-name").innerText = team2Name;
  }

  // استعادة الفريق المحدد والألوان
  restoreSelectedTeam();
});

// دالة لاستعادة الفريق المحدد
function restoreSelectedTeam() {
  const savedSelectedTeam = localStorage.getItem("selectedTeam");
  if (savedSelectedTeam) {
      // إزالة اللون من كلا الفريقين أولاً
      document.querySelector(".team-left").style.backgroundColor = "";
      document.querySelector(".team-right").style.backgroundColor = "";
      
      // إضافة اللون للفريق المحدد
      const teamElement = savedSelectedTeam === "Team 1" ? 
          document.querySelector(".team-left") : 
          document.querySelector(".team-right");
      
      if (teamElement) {
          teamElement.style.backgroundColor = "#038369";
          selectedTeam = savedSelectedTeam === "Team 1" ? 
              document.getElementById("team1-name").innerText : 
              document.getElementById("team2-name").innerText;
      }
  }
}

// دالة selectTeam
function selectTeam(team) {
  selectedTeam = team === "Team 1" ? 
      document.getElementById("team1-name").innerText : 
      document.getElementById("team2-name").innerText;
  
  // إزالة اللون من كلا الفريقين
  document.querySelector(".team-left").style.backgroundColor = "";
  document.querySelector(".team-right").style.backgroundColor = "";
  
  // إضافة اللون للفريق المختار
  const teamElement = team === "Team 1" ? 
      document.querySelector(".team-left") : 
      document.querySelector(".team-right");
  teamElement.style.backgroundColor = "#038369";
  
  // حفظ الفريق المختار في localStorage
  localStorage.setItem("selectedTeam", team);
  
  Swal.fire({
      title: "Team Selected!",
      text: `Selected Team: ${selectedTeam}`,
      icon: "success",
      confirmButtonColor: "#038369",
      timer: 2500,
      showClass: {
          popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
      }
  });
}

function startQuestion(points, category) {
  if (!selectedTeam) {
      Swal.fire({
          title: "Warning!",
          text: "Please select a team first!",
          icon: "warning",
          confirmButtonColor: "#038369",
          showClass: {
              popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
          }
      });
      return;
  }

  const selectedQuestion = questions[category].find(q => q.points === points);
  if (selectedQuestion) {
      showQuestionPage(selectedQuestion, points);
      disableButton(category, points);
  } else {
      Swal.fire({
          title: "Error!",
          text: "No question found for the selected points and category.",
          icon: "error",
          confirmButtonColor: "#c64f17",
          showClass: {
              popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
          }
      });
  }
}



function disableButton(category, points) {
  const buttons = document.querySelectorAll(
    `.question-btn[data-category='${category}'][data-points='${points}']`
  );
  buttons.forEach((button) => {
    button.disabled = true;
    button.textContent = "Answered";
    button.style.backgroundColor = "#ccc";
    button.style.cursor = "not-allowed";
  });
}

function showQuestionPage(question, points) {
  if (mainTimer) {
      clearInterval(mainTimer);
  }

  const categoriesScreen = document.getElementById("categories-screen");
  const questionScreen = document.getElementById("question-screen");
  const questionContainer = document.getElementById("question-container");

  categoriesScreen.style.display = "none";
  questionScreen.style.display = "flex";

  timeLeft = 30;
  const timer = document.getElementById("clock");
  timer.textContent = timeLeft;

  questionContainer.innerHTML = `
      <div class="question-box">
          <h3>${question.question}</h3>
          ${question.image && question.image !== "" ? 
            `<div class="question-image-container">
              <img src="${question.image}" alt="Question Image" class="question-image">
             </div>` 
            : ''}
      </div>
      <div class="choices">
          ${question.choices
            .map(
              (choice) =>
                `<button class="choice-btn" onclick="checkAnswer('${choice}', '${question.correctAnswer}', ${points})">${choice}</button>`
            )
            .join("")}
      </div>
      <div class="help-buttons">
          <button data-help-type="askAudience" onclick="askAudience()">Ask Audience</button>
          <button data-help-type="deleteTwoAnswers" onclick="deleteTwoAnswers()">Delete 2 Answers</button>
         
      </div>
  `;

  // تحديث حالة أزرار المساعدة
  updateHelpButtons();
  
  // بدء المؤقت
  startTimer();
}

let fullTimerSound = new Audio("Sound/Timer (mp3cut.net).m4a"); // صوت تشغيل التايمر بالكامل
let timeUpSound = new Audio("Sound/Timer (mp3cut.net).m4a"); // صوت انتهاء الوقت



function startTimer() {
  const timer = document.getElementById("clock");
  

  // إعادة ضبط الصوت
  fullTimerSound.currentTime = 0;
  fullTimerSound.loop = false; 

  if (mainTimer) {
      clearInterval(mainTimer);
  }

  // تشغيل صوت التايمر بالكامل
  fullTimerSound.play();

  mainTimer = setInterval(() => {
      timeLeft--;
      timer.textContent = timeLeft;

      if (timeLeft <= 0) {
          clearInterval(mainTimer);

          // إيقاف صوت التايمر وتشغيل صوت انتهاء الوقت
          fullTimerSound.pause();
          fullTimerSound.currentTime = 0;

          timeUpSound.currentTime = Math.max(timeUpSound.duration - 1 , 0);
          timeUpSound.play();

          Swal.fire({
              title: "Time's Up!",
              text: "Moving back to categories",
              icon: "warning",
              timer: 3000,
              showConfirmButton: false
          }).then(() => {
              goBackToCategories();
          });
      }
  }, 1000);
}


function checkAnswer(selectedAnswer, correctAnswer, points) {
  // تحميل الأصوات
  let correctSound = new Audio("Sound/Correct.m4a");  
  let wrongSound = new Audio("Sound/wrong.m4a");     

  
  // إيقاف التايمر إذا كان يعمل
  if (!fullTimerSound.paused) {
    fullTimerSound.pause();
    fullTimerSound.currentTime = 0;
}
clearInterval(mainTimer); // إيقاف العد التنازلي عند اختيار الإجابة


  if (selectedAnswer === correctAnswer) {
    correctSound.play(); // تشغيل صوت الإجابة الصحيحة
    Swal.fire({
      title: "Correct!",
      text: "Well done! Points added ✅",
      icon: "success",
      confirmButtonColor: "#038369",
      confirmButtonText: "Next",
      timer: 2000,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
    updateScore(points);
  } else {
    wrongSound.play(); // تشغيل صوت الإجابة الخاطئة
    Swal.fire({
      title: "Incorrect!",
      text: `The correct answer is ${correctAnswer} ❌`,
      icon: "error",
      confirmButtonColor: "#c64f17",
      confirmButtonText: "Try Again",
      timer: 2000,
      showClass: {
        popup: "animate__animated animate__shakeX",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOut",
      },
    });
  }

  setTimeout(goBackToCategories, 2000);
}


function updateScore(points) {
  const team1NameElement = document.getElementById("team1-name");
  const team2NameElement = document.getElementById("team2-name");
  
  if (selectedTeam === team1NameElement.innerText) {
      team1Score += points;
      document.getElementById("team1-score").textContent = `${team1Score} Points`;
      
      // تخزين النقاط مباشرة في localStorage
      localStorage.setItem("mcqTeam1Points", team1Score);
  } else if (selectedTeam === team2NameElement.innerText) {
      team2Score += points;
      document.getElementById("team2-score").textContent = `${team2Score} Points`;
      
      // تخزين النقاط مباشرة في localStorage
      localStorage.setItem("mcqTeam2Points", team2Score);
  }
}




function goBackToCategories() {
  if (mainTimer) {
      clearInterval(mainTimer);
  }
  
// إيقاف صوت التايمر إذا كان يعمل
if (typeof fullTimerSound !== "undefined") {
  fullTimerSound.pause();
  fullTimerSound.currentTime = 0;
}

  const categoriesScreen = document.getElementById("categories-screen");
  const questionScreen = document.getElementById("question-screen");
  categoriesScreen.style.display = "flex";
  questionScreen.style.display = "none";
  
  // إعادة تعيين المؤقت
  timeLeft = 30;
  const timer = document.getElementById("clock");
  timer.textContent = timeLeft;
  timer.style.transform = "rotate(0deg)";
}

const helpUsage = {
  team1: {
      askAudience: false,
      deleteTwoAnswers: false,
      callAFriend: false,
      showAnswer: false
  },
  team2: {
      askAudience: false,
      deleteTwoAnswers: false,
      callAFriend: false,
      showAnswer: false
  }
};

function resetHelps() {
  helpUsage.team1 = {
      askAudience: false,
      deleteTwoAnswers: false,
      callAFriend: false,
      showAnswer: false
  };
  helpUsage.team2 = {
      askAudience: false,
      deleteTwoAnswers: false,
      callAFriend: false,
      showAnswer: false
  };
}

function resetPage() {
  localStorage.removeItem("selectedTeam");
  document.querySelector(".team-left").style.backgroundColor = "";
  document.querySelector(".team-right").style.backgroundColor = "";
  selectedTeam = null;
  resetHelps();
}

function canUseHelp(helpType) {
  if (!selectedTeam) {
      Swal.fire({
          title: "Warning!",
          text: "Please select a team first!",
          icon: "warning",
          confirmButtonColor: "#038369"
      });
      return false;
  }

  const team = selectedTeam === document.getElementById("team1-name").innerText ? 'team1' : 'team2';
  
  if (helpUsage[team][helpType]) {
      Swal.fire({
          title: "Help Already Used!",
          text: "This team has already used this help option",
          icon: "warning",
          confirmButtonColor: "#038369"
      });
      return false;
  }
  
  return true;
}


function updateHelpButtons() {
  const team = selectedTeam === document.getElementById("team1-name").innerText ? 'team1' : 'team2';
  const helpButtons = document.querySelectorAll('.help-buttons button');
  
  helpButtons.forEach(button => {
      const helpType = button.getAttribute('data-help-type');
      if (helpUsage[team][helpType]) {
          button.disabled = true;
          button.style.opacity = "0.5";
          button.style.cursor = "not-allowed";
      }
  });
}

function askAudience() {

  if (!canUseHelp('askAudience')) return;
    
  const team = selectedTeam === document.getElementById("team1-name").innerText ? 'team1' : 'team2';
  helpUsage[team].askAudience = true;

  // إيقاف المؤقت الرئيسي وحفظ وقت الصوت
  clearInterval(mainTimer);
  pausedMainTimerTime = fullTimerSound.currentTime; // حفظ مكان التوقف
  fullTimerSound.pause();

  // حفظ الوقت المتبقي من المؤقت الرئيسي
  const mainTimerElement = document.getElementById("clock");
  const remainingMainTime = parseInt(mainTimerElement.textContent);

  // تشغيل الصوت عند بدء المساعدة
  const startSound = new Audio('path_to_start_sound.mp3'); // ضع الرابط الخاص بالصوت
  startSound.play();

  Swal.fire({
      title: "Ask the Audience",
      text: "You will have 30 seconds to ask the audience",
      icon: "info",
      confirmButtonColor: "#038369",
      showClass: {
          popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
          popup: "animate__animated animate__fadeOutUp",
      }
  }).then(() => {
      let helpTimeLeft = 30;
      mainTimerElement.textContent = helpTimeLeft;
      mainTimerElement.style.color = "#FF5722"; // لون مختلف للتمييز

      const helpTimer = setInterval(() => {
          helpTimeLeft--;
          mainTimerElement.textContent = helpTimeLeft;
          mainTimerElement.style.transform = `rotate(${(helpTimeLeft / 30) * 360}deg)`;

          if (helpTimeLeft <= 0) {
              clearInterval(helpTimer);
              
              // إظهار رسالة انتهاء الوقت
              Swal.fire({
                  title: "Time's Up!",
                  text: "Your 30 seconds have ended",
                  icon: "warning",
                  timer: 1000,
                  showConfirmButton: false,
                  showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                  }
              }).then(() => {
                  // إعادة لون المؤقت للحالة الأصلية
                  mainTimerElement.style.color = "#00bcd4";

                  // استئناف المؤقت الرئيسي والصوت الرئيسي من حيث توقف
                  timeLeft = remainingMainTime;
                  mainTimerElement.textContent = timeLeft;
                  startTimer();
              });
          }
      }, 1000);
  });

  // تشغيل صوت عند انتهاء الوقت
  const endSound = new Audio('path_to_end_sound.mp3'); // ضع الرابط الخاص بالصوت
  endSound.play();

  updateHelpButtons();
}


function deleteTwoAnswers() {
  
  if (!canUseHelp('deleteTwoAnswers')) return;
    
    const team = selectedTeam === document.getElementById("team1-name").innerText ? 'team1' : 'team2';
    helpUsage[team].deleteTwoAnswers = true;
  // إيقاف المؤقت الرئيسي
  clearInterval(mainTimer);
  
  // حفظ الوقت المتبقي
  const currentTime = parseInt(document.getElementById("clock").textContent);
  
  Swal.fire({
      title: "50:50",
      text: "Two incorrect answers will be deleted.",
      icon: "info",
      confirmButtonColor: "#038369",
      showClass: {
          popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
          popup: "animate__animated animate__fadeOutUp",
      }
  }).then(() => {
      // إعادة تشغيل المؤقت من حيث توقف
      const timer = document.getElementById("clock");
      let timeLeft = currentTime;
      
      mainTimer = setInterval(() => {
          timeLeft--;
          timer.textContent = timeLeft;
          timer.style.transform = `rotate(${(timeLeft / 30) * 360}deg)`;
          if (timeLeft <= 0) {
              clearInterval(mainTimer);
              goBackToCategories();
          }
      }, 1000);

      // باقي كود حذف الإجابات
      const choiceButtons = document.querySelectorAll('.choice-btn');
      const choicesContainer = document.querySelector('.choices');
      
      choicesContainer.classList.add('filtered');
      
      const correctAnswer = choiceButtons[0].getAttribute('onclick').split("'")[3];
      
      let correctButton = null;
      const incorrectButtons = [];
      
      choiceButtons.forEach(button => {
          const buttonText = button.textContent;
          if (buttonText === correctAnswer) {
              correctButton = button;
          } else {
              incorrectButtons.push(button);
          }
      });
      
      const randomIndex = Math.floor(Math.random() * incorrectButtons.length);
      const keepIncorrectButton = incorrectButtons[randomIndex];
      
      incorrectButtons.forEach((button, index) => {
          if (index !== randomIndex) {
              button.classList.add('hidden');
          }
      });
      
      [correctButton, keepIncorrectButton].forEach(button => {
          if (button) {
              button.classList.add('remaining');
          }
      });
  });
  updateHelpButtons();
}


function finishGame() {
  // تخزين النقاط النهائية
  localStorage.setItem("mcqTeam1Points", team1Score);
  localStorage.setItem("mcqTeam2Points", team2Score);

  // الانتقال إلى صفحة المنافسة
  window.location.href = "competition.html";
}


