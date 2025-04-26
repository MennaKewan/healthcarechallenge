// في ملف celebration.js
const confettiContainer = document.getElementById("confetti-container");
const scoreFullmark = document.getElementById("scoreFullmark");
const winnerNameElement = document.getElementById("winner-name");
const Reloadbtn = document.getElementById("Reloadbtn");

// استرجاع اسم الفريق الفائز من localStorage
const winnerName = localStorage.getItem("winnerName");

// عرض اسم الفريق الفائز
if (winnerName) {
    winnerNameElement.textContent = winnerName;
} else {
    winnerNameElement.textContent = "Unknown Team";
}


// إعدادات الكونفيتي
const confettiCount = 450;
const colors = [
  "#f94144",
  "#f3722c",
  "#f8961e",
  "#f9c74f",
  "#90be6d",
  "#43aa8b",
  "#577590",
];

// وظيفة لإنشاء الكونفيتي
function explodeConfetti() {
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.backgroundColor = randomColor;

    const isLong = Math.random() > 0.5;
    if (isLong) {
      confetti.classList.add("confetti-long");
    } else {
      confetti.classList.add("confetti-round");
    }

    const x = Math.random() * 500 - 250;
    const y = Math.random() * -140;

    confetti.style.setProperty("--x", `${x}px`);
    confetti.style.setProperty("--y", `${y}px`);

    confettiContainer.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

// تشغيل الكونفيتي عند تحميل الصفحة
window.onload = () => {
  explodeConfetti();
};

// عند الضغط على زر الرجوع، امسح اسم الفائز
Reloadbtn.addEventListener("click", () => {
    localStorage.removeItem("winnerName");
    window.location.replace("./main.html");
    window.history.forward();
});