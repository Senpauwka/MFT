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

/* =========================================================
   РЕЖИМ ТРЕНИРОВКИ — V1
========================================================= */

let currentWorkout = null;
let currentExerciseIndex = 0;
let currentExerciseResults = [];
let workoutStartedAt = null;


/* =========================================================
   ДАННЫЕ УПРАЖНЕНИЙ
========================================================= */

const exerciseDetails = {

    "Подтягивания": {
        muscles: "Спина · Бицепс",
        sets: 4,
        min: 5,
        max: 10
    },

    "Отжимания": {
        muscles: "Грудь · Трицепс · Плечи",
        sets: 4,
        min: 10,
        max: 20
    },

    "Брусья": {
        muscles: "Грудь · Трицепс",
        sets: 3,
        min: 6,
        max: 12
    },

    "Пайк-отжимания": {
        muscles: "Плечи · Трицепс",
        sets: 3,
        min: 6,
        max: 12
    },

    "Подъёмы ног": {
        muscles: "Пресс · Корпус",
        sets: 3,
        min: 10,
        max: 15
    },

    "Болгарские приседания": {
        muscles: "Квадрицепс · Ягодицы",
        sets: 3,
        min: 8,
        max: 12
    },

    "Приседания": {
        muscles: "Ноги · Ягодицы",
        sets: 3,
        min: 10,
        max: 20
    },

    "Выпады": {
        muscles: "Ноги · Ягодицы",
        sets: 3,
        min: 8,
        max: 12
    },

    "Подъёмы на носки": {
        muscles: "Икры",
        sets: 3,
        min: 15,
        max: 25
    },

    "Планка": {
        muscles: "Пресс · Корпус",
        sets: 3,
        min: 30,
        max: 60,
        unit: "сек"
    },

    "Отжимания с усложнением": {
        muscles: "Грудь · Трицепс · Плечи",
        sets: 4,
        min: 8,
        max: 15
    },

    "Пресс": {
        muscles: "Корпус",
        sets: 3,
        min: 10,
        max: 20
    }

};


/* =========================================================
   ОПРЕДЕЛЕНИЕ ТЕКУЩЕЙ ТРЕНИРОВКИ
========================================================= */

function getWorkoutByName(workoutName) {

    if (workoutName === "Понедельник") {
        return appData.workouts.monday;
    }

    if (workoutName === "Среда") {
        return appData.workouts.wednesday;
    }

    if (workoutName === "Пятница") {
        return appData.workouts.friday;
    }

    return null;
}


/* =========================================================
   СОЗДАНИЕ ЭКРАНА ТРЕНИРОВКИ
========================================================= */

function createWorkoutScreen() {

    if (document.getElementById("activeWorkoutScreen")) {
        return;
    }

    const screen = document.createElement("section");

    screen.id = "activeWorkoutScreen";
    screen.className = "page";

    screen.innerHTML = `
        <div class="page-header">

            <span class="card-label">ТРЕНИРОВКА</span>

            <h2 id="activeWorkoutTitle">
                Тренировка
            </h2>

            <p id="activeWorkoutProgress">
                Упражнение 1
            </p>

        </div>


        <div class="workout-day-card">

            <div class="workout-day-header">

                <div class="workout-day-icon" id="activeExerciseIcon">
                    💪
                </div>

                <div>

                    <span class="day-name">
                        ТЕКУЩЕЕ УПРАЖНЕНИЕ
                    </span>

                    <h3 id="activeExerciseName">
                        Подтягивания
                    </h3>

                </div>

            </div>


            <div style="
                margin-bottom: 18px;
                color: var(--muted);
                font-size: 12px;
            " id="activeExerciseMuscles">
                Спина · Бицепс
            </div>


            <div style="
                padding: 16px;
                border-radius: 14px;
                background: rgba(124, 108, 255, 0.08);
                margin-bottom: 18px;
            ">

                <div style="
                    color: var(--muted);
                    font-size: 10px;
                    margin-bottom: 6px;
                ">
                    ЦЕЛЬ
                </div>

                <strong
                    id="activeExerciseTarget"
                    style="font-size: 20px;"
                >
                    4 × 5–10
                </strong>

            </div>


            <div id="setInputs"></div>


            <button
                class="primary-button"
                id="saveExerciseButton"
            >
                Сохранить упражнение
                <span>→</span>
            </button>


            <button
                id="cancelWorkoutButton"
                style="
                    width: 100%;
                    margin-top: 10px;
                    padding: 12px;
                    border: 1px solid var(--border);
                    border-radius: 14px;
                    background: transparent;
                    color: var(--muted);
                    font-family: inherit;
                    cursor: pointer;
                "
            >
                Выйти из тренировки
            </button>

        </div>
    `;

    document.querySelector(".app").appendChild(screen);


    document
        .getElementById("saveExerciseButton")
        .addEventListener("click", saveCurrentExercise);


    document
        .getElementById("cancelWorkoutButton")
        .addEventListener("click", cancelWorkout);

}


/* =========================================================
   ОТКРЫТИЕ ТРЕНИРОВКИ
========================================================= */

function startWorkout(workout) {

    if (!workout) {
        return;
    }

    currentWorkout = workout;

    currentExerciseIndex = 0;

    currentExerciseResults = [];

    workoutStartedAt = Date.now();


    createWorkoutScreen();

    showWorkoutScreen();

    renderCurrentExercise();

}


/* =========================================================
   ПОКАЗ ЭКРАНА ТРЕНИРОВКИ
========================================================= */

function showWorkoutScreen() {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

            page.style.display = "none";

        });


    const screen =
        document.getElementById("activeWorkoutScreen");


    if (screen) {

        screen.classList.add("active");

        screen.style.display = "block";

    }


    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove("active");

        });


    window.scrollTo(0, 0);

}


/* =========================================================
   ОТОБРАЖЕНИЕ УПРАЖНЕНИЯ
========================================================= */

function renderCurrentExercise() {

    if (!currentWorkout) {
        return;
    }


    const exerciseName =
        currentWorkout.exercises[currentExerciseIndex];


    const details =
        exerciseDetails[exerciseName];


    if (!details) {

        console.error(
            "Нет данных упражнения:",
            exerciseName
        );

        return;

    }


    document
        .getElementById("activeWorkoutTitle")
        .textContent = currentWorkout.title;


    document
        .getElementById("activeWorkoutProgress")
        .textContent =
        `Упражнение ${currentExerciseIndex + 1} из ${currentWorkout.exercises.length}`;


    document
        .getElementById("activeExerciseName")
        .textContent = exerciseName;


    document
        .getElementById("activeExerciseMuscles")
        .textContent = details.muscles;


    document
        .getElementById("activeExerciseTarget")
        .textContent =
        `${details.sets} × ${details.min}–${details.max}${details.unit ? " " + details.unit : ""}`;


    const inputs =
        document.getElementById("setInputs");


    inputs.innerHTML = "";


    for (let i = 0; i < details.sets; i++) {

        const row =
            document.createElement("div");


        row.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 10px;
        `;


        row.innerHTML = `
            <span style="
                color: var(--muted);
                font-size: 12px;
            ">
                Подход ${i + 1}
            </span>

            <input
                type="number"
                min="0"
                inputmode="numeric"
                placeholder="${details.min}–${details.max}"
                data-set="${i}"
                style="
                    width: 110px;
                    padding: 12px;
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    background: var(--surface-light);
                    color: var(--text);
                    font-family: inherit;
                    font-size: 14px;
                    text-align: center;
                    outline: none;
                "
            >
        `;


        inputs.appendChild(row);

    }

}


/* =========================================================
   СОХРАНЕНИЕ УПРАЖНЕНИЯ
========================================================= */

function saveCurrentExercise() {

    const inputs =
        document.querySelectorAll(
            "#setInputs input"
        );


    const values =
        Array.from(inputs).map(input => {

            return Number(input.value) || 0;

        });


    if (values.every(value => value === 0)) {

        alert(
            "Введи хотя бы один результат подхода 💪"
        );

        return;

    }


    currentExerciseResults.push({
        exercise:
            currentWorkout.exercises[currentExerciseIndex],

        values: values,

        date:
            new Date().toISOString()
    });


    currentExerciseIndex++;


    if (
        currentExerciseIndex >=
        currentWorkout.exercises.length
    ) {

        finishWorkout();

        return;

    }


    renderCurrentExercise();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   ЗАВЕРШЕНИЕ ТРЕНИРОВКИ
========================================================= */

function finishWorkout() {

    const endTime = Date.now();

    const minutes =
        Math.max(
            1,
            Math.round(
                (endTime - workoutStartedAt) /
                60000
            )
        );


    appData.stats.workouts += 1;

    appData.stats.minutes += minutes;


    saveData();


    alert(
        "🔥 ТРЕНИРОВКА ЗАВЕРШЕНА!\n\n" +
        `Упражнений: ${currentWorkout.exercises.length}\n` +
        `Время: примерно ${minutes} мин.\n\n` +
        "Результат сохранён."
    );


    currentWorkout = null;

    currentExerciseIndex = 0;

    currentExerciseResults = [];


    document
        .getElementById("activeWorkoutScreen")
        .classList.remove("active");


    document
        .getElementById("activeWorkoutScreen")
        .style.display = "none";


    const home =
        document.getElementById("homePage");


    home.classList.add("active");

    home.style.display = "block";


    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove("active");

            if (
                item.dataset.page ===
                "homePage"
            ) {

                item.classList.add("active");

            }

        });


    updateStats();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   ОТМЕНА ТРЕНИРОВКИ
========================================================= */

function cancelWorkout() {

    const confirmed =
        confirm(
            "Выйти из тренировки?\n\n" +
            "Введённые результаты этого занятия не будут сохранены."
        );


    if (!confirmed) {
        return;
    }


    const screen =
        document.getElementById(
            "activeWorkoutScreen"
        );


    if (screen) {

        screen.classList.remove("active");

        screen.style.display = "none";

    }


    currentWorkout = null;

    currentExerciseIndex = 0;

    currentExerciseResults = [];


    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

            page.style.display = "none";

        });


    const workoutPage =
        document.getElementById(
            "workoutsPage"
        );


    workoutPage.classList.add("active");

    workoutPage.style.display = "block";


    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove("active");

            if (
                item.dataset.page ===
                "workoutsPage"
            ) {

                item.classList.add("active");

            }

        });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   ПОДКЛЮЧЕНИЕ КНОПОК "НАЧАТЬ ТРЕНИРОВКУ"
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                ".workout-start-button"
            );


        if (!button) {
            return;
        }


        const cards =
            Array.from(
                document.querySelectorAll(
                    ".workout-day-card"
                )
            );


        const card =
            button.closest(
                ".workout-day-card"
            );


        const index =
            cards.indexOf(card);


        const workouts = [
            appData.workouts.monday,
            appData.workouts.wednesday,
            appData.workouts.friday
        ];


        const workout =
            workouts[index];


        if (!workout) {
            return;
        }


        startWorkout(workout);

    }
);

/* =========================================================
   АКТИВНАЯ ТРЕНИРОВКА
========================================================= */

let activeWorkout = null;
let activeExerciseIndex = 0;


/* Данные упражнений */

const exerciseDetails = {

    "Подтягивания": {
        icon: "🪽",
        muscles: "Спина · Бицепс",
        sets: 4
    },

    "Отжимания": {
        icon: "🫀",
        muscles: "Грудь · Трицепс · Плечи",
        sets: 4
    },

    "Брусья": {
        icon: "🔱",
        muscles: "Грудь · Трицепс",
        sets: 3
    },

    "Пайк-отжимания": {
        icon: "🏋️",
        muscles: "Плечи · Трицепс",
        sets: 3
    },

    "Подъёмы ног": {
        icon: "🧱",
        muscles: "Пресс · Корпус",
        sets: 3
    },

    "Болгарские приседания": {
        icon: "🦵",
        muscles: "Квадрицепс · Ягодицы",
        sets: 3
    },

    "Приседания": {
        icon: "🦵",
        muscles: "Ноги · Ягодицы",
        sets: 3
    },

    "Выпады": {
        icon: "🦵",
        muscles: "Ноги · Ягодицы",
        sets: 3
    },

    "Подъёмы на носки": {
        icon: "🦶",
        muscles: "Икры",
        sets: 3
    },

    "Планка": {
        icon: "🧱",
        muscles: "Пресс · Корпус",
        sets: 3
    },

    "Пресс": {
        icon: "🧱",
        muscles: "Корпус",
        sets: 3
    }

};


/* =========================================================
   ПОКАЗ АКТИВНОЙ ТРЕНИРОВКИ
========================================================= */

function startWorkout(workout) {

    if (!workout) {
        return;
    }

    activeWorkout = workout;

    activeExerciseIndex = 0;

    showPage("activeWorkoutPage");

    renderActiveExercise();
}


/* =========================================================
   ОТРИСОВКА УПРАЖНЕНИЯ
========================================================= */

function renderActiveExercise() {

    if (!activeWorkout) {
        return;
    }

    const exerciseName =
        activeWorkout.exercises[activeExerciseIndex];

    const details =
        exerciseDetails[exerciseName] || {
            icon: "💪",
            muscles: "Мышцы корпуса",
            sets: 3
        };


    const title =
        document.getElementById("activeWorkoutTitle");

    const subtitle =
        document.getElementById("activeWorkoutSubtitle");

    const icon =
        document.getElementById("activeExerciseIcon");

    const name =
        document.getElementById("activeExerciseName");

    const muscles =
        document.getElementById("activeExerciseMuscles");

    const progress =
        document.getElementById("exerciseProgress");

    const progressFill =
        document.getElementById("workoutProgressFill");

    const setList =
        document.getElementById("setList");


    title.textContent = activeWorkout.title;

    subtitle.textContent =
        "Делай чисто. Не спеши. Качество важнее количества.";

    icon.textContent = details.icon;

    name.textContent = exerciseName;

    muscles.textContent = details.muscles;


    const current =
        activeExerciseIndex + 1;

    const total =
        activeWorkout.exercises.length;


    progress.textContent =
        `${current} / ${total}`;


    progressFill.style.width =
        `${(current / total) * 100}%`;


    setList.innerHTML = "";


    for (let i = 1; i <= details.sets; i++) {

        const row =
            document.createElement("div");

        row.className = "set-row";

        row.innerHTML = `
            <span>Подход ${i}</span>
            <strong>Готов</strong>
        `;

        setList.appendChild(row);
    }

}


/* =========================================================
   ЗАВЕРШЕНИЕ УПРАЖНЕНИЯ
========================================================= */

const completeExerciseButton =
    document.getElementById("completeExerciseButton");


if (completeExerciseButton) {

    completeExerciseButton.addEventListener(
        "click",
        () => {

            if (!activeWorkout) {
                return;
            }


            activeExerciseIndex++;


            if (
                activeExerciseIndex >=
                activeWorkout.exercises.length
            ) {

                alert(
                    "🔥 Тренировка завершена!\n\n" +
                    "Красиво отработал. Теперь сохраняем результат."
                );

                activeWorkout = null;

                showPage("homePage");

                return;
            }


            renderActiveExercise();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   ВЫХОД ИЗ ТРЕНИРОВКИ
========================================================= */

const exitWorkoutButton =
    document.getElementById("exitWorkoutButton");


if (exitWorkoutButton) {

    exitWorkoutButton.addEventListener(
        "click",
        () => {

            const confirmExit =
                confirm(
                    "Выйти из текущей тренировки?"
                );

            if (!confirmExit) {
                return;
            }

            activeWorkout = null;

            showPage("homePage");

        }
    );

}


/* =========================================================
   ПЕРЕХВАТ КНОПОК "НАЧАТЬ ТРЕНИРОВКУ"
========================================================= */

document.addEventListener(
    "click",
    (event) => {

        const button =
            event.target.closest(
                ".primary-button"
            );


        if (!button) {
            return;
        }


        /*
            Кнопки внутри карточек Пн / Ср / Пт
        */

        if (
            button.classList.contains(
                "workout-start-button"
            )
        ) {

            const cards =
                document.querySelectorAll(
                    ".workout-day-card"
                );

            const card =
                button.closest(
                    ".workout-day-card"
                );

            const index =
                Array.from(cards).indexOf(card);


            const workouts = [
                appData.workouts.monday,
                appData.workouts.wednesday,
                appData.workouts.friday
            ];


            startWorkout(
                workouts[index]
            );

            return;
        }


        /*
            Кнопка "Начать тренировку"
            на главной странице
        */

        if (
            button.closest(".today-card")
        ) {

            const workout =
                getTodayWorkout();


            if (!workout) {

                alert(
                    "Сегодня день восстановления 🧘\n\n" +
                    "Отдых тоже является частью прогресса."
                );

                return;
            }


            startWorkout(workout);

        }

    },
    true
);