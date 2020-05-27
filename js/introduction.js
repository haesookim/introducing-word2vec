const onClickQuizButton = () => {
    let option = document.getElementById("metaphor-quiz").value;
    let answerbox = document.getElementById("answerbox");

    console.log(option);
    if (option.toLowerCase() === "tokyo") {
        answerbox.innerHTML =
            "That's right! The answer is Tokyo.<br>The relationship between the words are (Country):(Capital).";
    } else {
        answerbox.innerHTML =
            "Unfortunately, that's not the right answer. The answer is Tokyo.<br>The relationship between the words are (Country):(Capital).";
    }
    answerbox.style.opacity = "100%";
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
