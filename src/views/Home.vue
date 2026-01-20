<script setup>
import { ref, watch } from "vue";

const editMode = ref(false);

const storedLessons = localStorage.getItem("brainblocks-lessons");

const lessons = ref(
    storedLessons
        ? JSON.parse(storedLessons)
        : [
              {
                  id: 1,
                  title: "Les 1 – Lorem",
                  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              }
          ]
);

const addLesson = () => {
    lessons.value.push({
        id: Date.now(),
        title: "Nieuwe les",
        description: "Beschrijving van de les"
    });
};

const removeLesson = (id) => {
    lessons.value = lessons.value.filter(l => l.id !== id);
};

watch(
    lessons,
    (value) => {
        localStorage.setItem("brainblocks-lessons", JSON.stringify(value));
    },
    { deep: true }
);
</script>

<template>
    <main class="page">
        <header class="page__header">
            <div class="page__title">
                <img class="page__title__logo" src="../assets/images/logo.png" />
                <h1 class="page__title__text">BrainBlocks</h1>
            </div>
        </header>

        <div class="page__content">
            <section class="hero">
                <div class="hero__text">
                    <h2>Welkom bij BrainBlocks</h2>
                    <p>
                        Leer stap voor stap met duidelijke lessen, interactieve opdrachten en handige hulpmiddelen.
                    </p>
                    <p>
                        Ontdek nieuwe onderwerpen, oefen in je eigen tempo en bouw jouw kennis blok voor blok op.
                    </p>
                </div>
            </section>

            <section class="intro">
                <h2>Inleiding</h2>
                <p>
                    Met BrainBlocks leer je op een manier die bij jou past. Je werkt met korte, overzichtelijke lessen
                    die duidelijke uitleg combineren met praktische opdrachten, zodat je direct kunt oefenen met wat
                    je hebt geleerd.
                </p>
                <p>
                    Je bepaalt zelf je tempo en kunt lessen altijd opnieuw bekijken wanneer dat nodig is. Zo bouw je
                    stap voor stap aan je kennis en vaardigheden, zonder dat het overweldigend wordt.
                </p>
                <p>
                    Door regelmatig te oefenen en je voortgang te volgen, krijg je beter inzicht in wat je al beheerst
                    en waar je nog extra aandacht aan kunt besteden. Met BrainBlocks zie je je vooruitgang groeien en
                    werk je gericht toe naar jouw leerdoelen.
                </p>
            </section>

            <section class="lessons">
                <button
                    class="edit-toggle"
                    @click="editMode = !editMode"
                >
                    <i class="fas fa-pen"></i>
                    {{ editMode ? 'Stop bewerken' : 'Bewerk lessen' }}
                </button>

                <h2>Lessen</h2>

                <div class="lessons__grid">
                    <div
                        v-for="lesson in lessons"
                        :key="lesson.id"
                        class="lesson-card"
                    >
                        <button
                            v-if="editMode"
                            class="lesson-card__delete"
                            @click="removeLesson(lesson.id)"
                        >
                            ✕
                        </button>

                        <div class="lesson-card__image">
                            <i v-if="editMode" class="fas fa-image"></i>
                        </div>

                        <div class="lesson-card__content">
                            <h3>{{ lesson.title }}</h3>
                            <p>{{ lesson.description }}</p>

                            <div class="lesson-card__actions">
                                <button class="button--primary">
                                    Start les
                                </button>

                                <button
                                    v-if="editMode"
                                    class="button--secondary"
                                >
                                    Bewerken
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        v-if="editMode"
                        class="lesson-card lesson-card--add"
                        @click="addLesson"
                    >
                        <i class="fas fa-plus"></i>
                    </div>
                </div>
            </section>

        </div>

        <footer class="page__footer">
            <div class="page__footer__left">
                <div class="page__footer__left__logo">
                    <img src="../assets/images/logo.png" />
                    <h1>
                        <span class="page__title__text--first">Brain</span>
                        <span class="page__title__text--second">Blocks</span>
                    </h1>
                </div>
            </div>

            <div class="page__footer__right">
                <h3>Over</h3>
                <p>
                    BrainBlocks is een leerplatform voor leerlingen en leraren. Leerlingen leren in hun eigen tempo,
                    terwijl leraren eenvoudig nieuwe lessen kunnen toevoegen en beheren.
                </p>
                <p class="page__footer__names">
                    Nick, Jelmer, Fimme, Joel
                </p>
            </div>
        </footer>
    </main>
</template>

<style lang="scss">
.page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #2e2e2e;
    color: #ffffff;

    &__header {
        background: linear-gradient(160deg, #353535 0%, #4d4d4d 100%);
        box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.6);
        z-index: 10;
    }

    &__title {
        padding: 10px 15px;
        display: flex;
        align-items: center;

        &__logo {
            width: 60px;
            height: 60px;
        }

        &__text {
            margin: 0;
            padding-left: 15px;
            font-size: 1.8rem;

            &--first {
                color: #ee4d4e;
            }

            &--second {
                color: #ffc502;
            }
        }
    }

    &__content {
        flex: 1;
    }

    &__footer {
        display: flex;
        background: linear-gradient(160deg, #353535 0%, #4d4d4d 100%);
        box-shadow: 0px -5px 20px rgba(0, 0, 0, 0.35);
        height: 250px;

        &__left {
            width: 40%;
            background: #383838;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;

            img {
                width: 80px;
                height: 80px;
            }
        }

        &__logo{
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        &__right {
            width: 60%;
            background: #444444;
            padding: 30px;

            h3 {
                margin-top: 0;
                color: #ffc502;
            }
        }

        &__names {
            margin-top: 20px;
            opacity: 0.8;
            font-size: 0.9rem;
        }
    }
}

.hero {
    background: url("../assets/images/hero.jpg") center / cover no-repeat;
    padding: 130px 120px;
    color: #ffffff;
    min-height: 680px;

    &__text {
        max-width: 620px;

        h2 {
            font-size: 2.5rem;
            color: #ffc502;
        }

        p {
            font-size: 1.4rem;
        }
    }
}

.intro {
    padding: 40px 60px;
    text-align: center;
    background: #363636;

    h2 {
        font-size: 2.2rem;
        color: #ffc502;
        margin-bottom: 20px;
    }

    p {
        font-size: 1.2rem;
        max-width: 1200px;
        margin: 0 auto 1rem;
    }
}

.lessons {
    padding: 40px 60px 80px;

    h2 {
        text-align: center;
        font-size: 2.2rem;
        color: #ffc502;
        margin-bottom: 40px;
    }

    &__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(520px, 1fr));
        gap: 30px;
    }

    .edit-toggle {
        background: #2d8cff;
        border: none;
        color: white;
        padding: 8px 14px;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;

        &:hover {
            background: #1f6fd6;
        }
    }
}

.lesson-card {
    position: relative;
    display: flex;
    background: #3a3a3a;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0,0,0,0.4);

    &__delete {
        position: absolute;
        top: 8px;
        left: 8px;
        background: #e74c3c;
        border: none;
        color: white;
        width: 26px;
        height: 26px;
        border-radius: 6px;
        cursor: pointer;
    }

    &__image {
        width: 200px;
        height: 300px;
        background: url("../assets/images/lesson-template.jpg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666;
        font-size: 32px;
    }

    &__content {
        padding: 15px;
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    &__actions {
        margin-top: auto;  
        display: flex;
        gap: 10px;
        justify-content: flex-start;
    }
}

.lesson-card--add {
    min-height: 300px;
    display: flex;
    align-items: stretch;
    justify-content: center;
    align-items: center;
    font-size: 48px;
    color: #888;
    border: 2px dashed #555;
    cursor: pointer;

    .lesson-card--add::before {
        content: "";
        width: 200px;
    }

    .lesson-card--add i {
        margin: auto;
        font-size: 48px;
        color: #888;
    }

    &:hover {
        color: #2d8cff;
        border-color: #2d8cff;
    }
}

.button {
    &--primary {
        align-items: center;
        appearance: none;
        border: 0;
        border-radius: 6px;
        box-shadow: rgba(48, 48, 48, 0.4) 0 2px 4px, rgba(45, 45, 45, 0.3) 0 7px 13px -3px, rgba(80, 80, 80, 0.5) 0 -3px 0 inset;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        display: inline-flex;
        font-family: var(--font-main);
        height: 48px;
        justify-content: center;
        line-height: 1;
        list-style: none;
        overflow: hidden;
        padding-left: 16px;
        padding-right: 16px;
        width: 140px;
        margin: 10px 5px 10px 15px;
        position: relative;
        text-align: left;
        text-decoration: none;
        transition: box-shadow .15s, transform .15s;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        white-space: nowrap;
        will-change: box-shadow, transform;
        font-size: 18px;
        font-weight: 500;
        background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
        box-shadow:
            rgba(45, 35, 66, .4) 0 4px 8px,
            rgba(45, 35, 66, .3) 0 7px 13px -3px,
            #3c4fe0 0 -3px 0 inset;

        &:hover {
            transform: translateY(-2px);
        }

        &:active {
            transform: translateY(2px);
        }
    }

        &--secondary {
        align-items: center;
        appearance: none;
        border: 0;
        border-radius: 6px;
        box-shadow: rgba(48, 48, 48, 0.4) 0 2px 4px, rgba(45, 45, 45, 0.3) 0 7px 13px -3px, rgba(80, 80, 80, 0.5) 0 -3px 0 inset;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        display: inline-flex;
        font-family: var(--font-main);
        height: 48px;
        justify-content: center;
        line-height: 1;
        list-style: none;
        overflow: hidden;
        padding-left: 16px;
        padding-right: 16px;
        width: 140px;
        margin: 10px 15px 10px 5px;
        position: relative;
        text-align: left;
        text-decoration: none;
        transition: box-shadow .15s, transform .15s;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        white-space: nowrap;
        will-change: box-shadow, transform;
        font-size: 18px;
        font-weight: 500;
        background-image: radial-gradient(100% 100% at 100% 0, #ff5a5a 0, #ff5454 100%);
        box-shadow:
            rgba(66, 35, 35, 0.4) 0 4px 8px,
            rgba(66, 35, 35, 0.3) 0 7px 13px -3px,
            #dc3b3b 0 -3px 0 inset;

        &:hover {
            transform: translateY(-2px);
        }

        &:active {
            transform: translateY(2px);
        }
    }
}

@media (max-width: 768px) {
    .hero {
        padding: 50px 30px;
        min-height: 500px;

        &__text {
            h2 {
                font-size: 1.9rem;
            }

            p {
                font-size: 1.1rem;
            }
        }
    }

    .intro,
    .lessons {
        padding: 30px 20px;

        p {
            font-size: 1rem;
        }
    }

    .page__footer {
        text-align: center;
        flex-direction: column;

        &__left,
        &__right {
            width: 100%;
        }
    }
}
</style>
