/* =========================================================
   МОЯ ФОРМА — ОСНОВНОЙ JAVASCRIPT
========================================================= */


/* =========================================================
   ДАННЫЕ ПРИЛОЖЕНИЯ
========================================================= */

const appData = {

    workouts: {
        monday: {
            title: "Верх тела",
            icon: "💪",
            exercises: [
                "Подтягивания",
                "Отжимания",
                "Брусья",
                "Пайк-отжимания",
                "Подъёмы ног"
            ]
        },

        wednesday: {
            title: "Ноги + корпус",
            icon: "🦵",
            exercises: [
                "Болгарские приседания",
                "Приседания",
                "Выпады",
                "Подъёмы на носки",
                "Планка"
            ]
        },

        friday: {
            title: "Верх тела",
            icon: "💪",
            exercises: [
                "Подтягивания",
                "Отжимания",
                "Брусья",
                "Пайк-отжимания",
                "Пресс"
            ]
        }
    },

    stats: {
        workouts: 0,
        streak: 0,
        records: 0,
        minutes: 0
    }
};


/* =========================================================
   НАВИГАЦИЯ
========================================================= */

const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");


function showPage(pageId) {

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const targetPage = document.getElementById(pageId);

    if (targetPage) {
        targetPage.classList.add("active");
    }

    navItems.forEach(item => {
        item.classList.remove("active");

        if (item.dataset.page === pageId) {
            item.classList.add("active");
        }
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


navItems.forEach(item => {

    item.addEventListener("click", () => {

        const pageId = item.dataset.page;

        showPage(pageId);

    });

});


/* =========================================================
   ТЕКУЩИЙ ДЕНЬ
========================================================= */

function getTodayWorkout() {

    const day = new Date().getDay();

    /*
        0 = воскресенье
        1 = понедельник
        2 = вторник
        3 = среда
        4 = четверг
        5 = пятница
        6 = суббота
    */

    switch (day) {

        case 1:
            return appData.workouts.monday;

        case 3:
            return appData.workouts.wednesday;

        case 5:
            return appData.workouts.friday;

        default:
            return null;
    }
}


/* =========================================================
   ОБНОВЛЕНИЕ КАРТОЧКИ "СЕГОДНЯ"
========================================================= */

function updateTodayWorkout() {

    const workout = getTodayWorkout();

    const workoutTitle = document.querySelector(".workout-info h4");
    const workoutDescription = document.querySelector(".workout-info p");
    const workoutIcon = document.querySelector(".workout-icon");
    const dayBadge = document.querySelector(".day-badge");

    if (!workout) {

        workoutTitle.textContent = "День восстановления";

        workoutDescription.textContent =
            "Сегодня можно отдохнуть и восстановиться.";

        workoutIcon.textContent = "🧘";

        dayBadge.textContent = "REST";

        return;
    }

    workoutTitle.textContent = workout.title;

    workoutDescription.textContent =
        `${workout.exercises.length} упражнений · примерно 40 минут`;

    workoutIcon.textContent = workout.icon;

    const days = [
        "ВС",
        "ПН",
        "ВТ",
        "СР",
        "ЧТ",
        "ПТ",
        "СБ"
    ];

    dayBadge.textContent = days[new Date().getDay()];
}


/* =========================================================
   СТАТИСТИКА
========================================================= */

function updateStats() {

    const statCards = document.querySelectorAll(".stat-card");

    if (statCards.length < 4) {
        return;
    }

    statCards[0].querySelector("strong").textContent =
        appData.stats.workouts;

    statCards[1].querySelector("strong").textContent =
        appData.stats.streak;

    statCards[2].querySelector("strong").textContent =
        appData.stats.records;

    statCards[3].querySelector("strong").textContent =
        appData.stats.minutes;
}


/* =========================================================
   LOCAL STORAGE
========================================================= */

function saveData() {

    localStorage.setItem(
        "myFitnessData",
        JSON.stringify(appData)
    );
}


function loadData() {

    const savedData = localStorage.getItem("myFitnessData");

    if (!savedData) {
        return;
    }

    try {

        const parsedData = JSON.parse(savedData);

        if (parsedData.stats) {
            appData.stats = {
                ...appData.stats,
                ...parsedData.stats
            };
        }

    } catch (error) {

        console.error(
            "Не удалось загрузить сохранённые данные:",
            error
        );

    }
}


/* =========================================================
   КНОПКА "НАЧАТЬ ТРЕНИРОВКУ"
========================================================= */

const startWorkoutButton =
    document.querySelector(".primary-button");


if (startWorkoutButton) {

    startWorkoutButton.addEventListener("click", () => {

        const workout = getTodayWorkout();

        if (!workout) {

            alert(
                "Сегодня день восстановления 🧘\n\n" +
                "Отдых тоже является частью прогресса."
            );

            return;
        }

        alert(
            `Сегодня: ${workout.title}\n\n` +
            `Упражнений: ${workout.exercises.length}\n\n` +
            "Следующим этапом сделаем полноценный режим тренировки."
        );

    });

}


/* =========================================================
   ИНИЦИАЛИЗАЦИЯ
========================================================= */

function init() {

    loadData();

    updateTodayWorkout();

    updateStats();

}


/* =========================================================
   ЗАПУСК
========================================================= */

document.addEventListener("DOMContentLoaded", init);

/* =========================================================
   КНОПКИ ТРЕНИРОВОК
========================================================= */

const workoutButtons =
    document.querySelectorAll(".workout-start-button");


workoutButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        const workouts = [
            appData.workouts.monday,
            appData.workouts.wednesday,
            appData.workouts.friday
        ];

        const workout = workouts[index];

        if (!workout) {
            return;
        }

        alert(
            `${workout.icon} ${workout.title}\n\n` +
            `Упражнений: ${workout.exercises.length}\n\n` +
            "Следующим этапом здесь появится полноценный режим тренировки."
        );

    });

});

/* =========================================================
   НАДЁЖНАЯ НАВИГАЦИЯ СТРАНИЦ
========================================================= */

document.addEventListener("click", function (event) {

    const button = event.target.closest(".nav-item");

    if (!button) {
        return;
    }

    const pageId = button.dataset.page;
    const target = document.getElementById(pageId);

    if (!target) {
        console.error("Страница не найдена:", pageId);
        return;
    }

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
        page.style.display = "none";
    });

    target.classList.add("active");
    target.style.display = "block";

    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
    });

    button.classList.add("active");

    window.scrollTo(0, 0);
});