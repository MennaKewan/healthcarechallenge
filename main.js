document.addEventListener("DOMContentLoaded", function () {
    const logoScreen = document.getElementById("intro-screen");
    const teamSelectionScreen = document.getElementById("team-selection");
    const startBtn = document.getElementById("start-btn");
    const team1NameInput = document.getElementById("team1-name");
    const team2NameInput = document.getElementById("team2-name");

    // عرض شاشة الشعار لمدة 2 ثانية ثم الانتقال إلى اختيار الفريق
    setTimeout(() => {
        logoScreen.style.display = "none";
        teamSelectionScreen.style.display = "flex";
    }, 4000);

    // تمكين زر البدء فقط عند إدخال الأسماء
    function checkTeamNames() {
        if (team1NameInput.value && team2NameInput.value) {
            startBtn.disabled = false;
        } else {
            startBtn.disabled = true;
        }
    }

    // متابعة التحقق عند كتابة الأسماء
    team1NameInput.addEventListener("input", checkTeamNames);
    team2NameInput.addEventListener("input", checkTeamNames);

    // بدء اللعبة وحفظ الأسماء في localStorage
    function startGame() {
        const team1Name = team1NameInput.value;
        const team2Name = team2NameInput.value;

        // مسح كل البيانات الموجودة في localStorage
        localStorage.clear();

        // حفظ أسماء الفرق الجديدة فقط
        localStorage.setItem("team1Name", team1Name);
        localStorage.setItem("team2Name", team2Name);

        // الانتقال إلى الصفحة الثانية
        window.location.href = "/Competition.html";
    }

    // تعيين وظيفة startGame لزر Start
    startBtn.addEventListener("click", startGame);
});