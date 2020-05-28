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

// Interactive Architecture test
const onClickArchitectureButton = () => {
    let sentence = document.getElementById("architecture-interactive").value;
    let parent = document.getElementById("architecture-output");
    let parsed = sentence.split(" ");
    parent.innerHTML = "";

    for (i = 0; i < parsed.length; i++) {
        let tempword = document.createElement("div");

        tempword.className = "parsedword";
        tempword.innerHTML = parsed[i];

        tempword.addEventListener("click", () => {
            console.log(this);
            this.style.backgroundColor = "black";
        });
        parent.appendChild(tempword);
    }
};

// keyterms popup logic

let keyterms = document.getElementsByClassName("keyterm");
let popup = document.getElementById("popup");
let isPopupOpen = false;

let keytermDict = {
    "word-embeddings": "Mapping words or features to vectors of real numbers",
};

for (i = 0; i < keyterms.length; i++) {
    //disabled jumpy hover code for now

    keyterms[i].addEventListener("click", function (event) {
        isPopupOpen = !isPopupOpen;
        if (isPopupOpen) {
            popup.style.display = "block";
            let currentTerm = this.innerHTML;
            popup.querySelector("#title").innerHTML = currentTerm;
            popup.querySelector("#explanation").innerHTML =
                keytermDict[currentTerm];
            popup.style.top = window.pageYOffset + event.clientY + "px";
            popup.style.left = event.clientX + "px";
        } else {
            closePopup();
        }
    });
}

const closePopup = () => {
    popup.style.display = "none";
};

// Menu visualizing logic
let menu = document.getElementById("menu");

const openMenu = () => {
    menu.style.display = "block";
};

const closeMenu = () => {
    menu.style.display = "none";
};

// Menu scroll to position logic

//
