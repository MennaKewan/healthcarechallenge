document.addEventListener("DOMContentLoaded", function () {
  const team1Display = document.getElementById("team1-display");
  const team2Display = document.getElementById("team2-display");
  const team1ScoreElement = document.getElementById("team1-score");
  const team2ScoreElement = document.getElementById("team2-score");

  // استعادة أسماء الفرق
  const team1Name = localStorage.getItem("team1Name");
  const team2Name = localStorage.getItem("team2Name");

  // استعادة النقاط من الجولة السابقة
  const mcqTeam1Points = parseInt(localStorage.getItem("mcqTeam1Points")) || 0;
  const mcqTeam2Points = parseInt(localStorage.getItem("mcqTeam2Points")) || 0;

  // استعادة النقاط الإجمالية
  let team1Score = parseInt(localStorage.getItem("totalTeam1Score")) || 0;
  let team2Score = parseInt(localStorage.getItem("totalTeam2Score")) || 0;

  console.log("MCQ Points:", mcqTeam1Points, mcqTeam2Points);

  // تحديد الفائز وإضافة نقطة
  if (mcqTeam1Points > mcqTeam2Points) {
    team1Score += 1;
    localStorage.setItem("totalTeam1Score", team1Score);
    console.log("Team 1 wins round");
  } else if (mcqTeam2Points > mcqTeam1Points) {
    team2Score += 1;
    localStorage.setItem("totalTeam2Score", team2Score);
    console.log("Team 2 wins round");
  }

  // تحديث النقاط في الشاشة
  team1ScoreElement.innerText = team1Score;
  team2ScoreElement.innerText = team2Score;

  // عرض أسماء الفرق
  if (team1Name && team2Name) {
    team1Display.innerText = team1Name;
    team2Display.innerText = team2Name;
  } else {
    alert("Team names not found! Redirecting to team selection...");
    window.location.href = "main.html";
  }

  // التحقق من انتهاء اللعبة
  // في ملف Competition.js
if (team1Score >= 2 || team2Score >= 2) {
    const winner = team1Score >= 2 ? team1Name : team2Name;
    
    // حفظ اسم الفائز في localStorage
    localStorage.setItem("winnerName", winner);

    setTimeout(() => {
      Swal.fire({
        title: "Game Over!",
        text: `${winner} Wins the Game!`,
        icon: "success",
        confirmButtonText: "Continue",
        timer: 2000,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(() => {
        setTimeout(() => {
          // لا تمسح كل البيانات، فقط البيانات غير الضرورية
          localStorage.removeItem("mcqTeam1Points");
          localStorage.removeItem("mcqTeam2Points");
          localStorage.removeItem("totalTeam1Score");
          localStorage.removeItem("totalTeam2Score");
          localStorage.removeItem("team1Name");
          localStorage.removeItem("team2Name");
          window.location.href = "celebration.html";
        }, 1000);
      });
    }, 1000);
}

  window.startGameRound = function (round) {
    localStorage.setItem("currentRound", round);

    switch (round) {
      case 1:
        window.location.href = "Mcq.html";
        break;
      case 2:
        window.location.href = "cell.html";
        break;
      case 3:
        window.location.href = "randamquestion.html";
        break;
      default:
        console.error("Invalid round number");
    }
  };

  // مسح بيانات الجولة السابقة بعد تأخير
  setTimeout(() => {
    localStorage.removeItem("mcqTeam1Points");
    localStorage.removeItem("mcqTeam2Points");
  }, 2000);
});

