//interactive Quiz

const onClickQuizButton = () => {
    let option = document.getElementById("metaphor-quiz").value;
    let answerbox = document.getElementById("answerbox");

    console.log(option);
    if (option.toLowerCase() === "tokyo") {
        answerbox.innerHTML =
            "That's right! The answer is Tokyo.<br>The relationship between the words are (Country):(Capital).<br>The distance vector between Korea and Seoul will match the vector between Japan and Tokyo.";
    } else {
        answerbox.innerHTML =
            "Unfortunately, that's not the right answer. The answer is Tokyo.<br>The relationship between the words are (Country):(Capital).<br>The distance vector between Korea and Seoul will match the vector between Japan and Tokyo.";
    }
    answerbox.style.opacity = "100%";
};

// Menu visualizing logic
let menu = document.getElementById("menu");
let menuOpen = false;

const openMenu = () => {
    console.log("?");
    if (menuOpen) {
        menu.style.width = "0";
        menu.style.padding = "20px 0";
    } else {
        menu.style.width = "342px";
        menu.style.padding = "20px";
    }
    menuOpen = !menuOpen;
};

// Menu display each section logic
let menuSections = document.getElementsByClassName("section");
let menuItems = document.getElementsByClassName("menuitem");

const showSection = (num) => {
    for (i = 0; i < menuSections.length; i++) {
        if (num == i) {
            menuSections[i].style.display = "block";
        } else {
            menuSections[i].style.display = "none";
        }
    }
    openMenu();
};
