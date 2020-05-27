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
    answerbox.style.display = "block";
};

// keyterms popup logic

let keyterms = document.getElementsByClassName("keyterm");
let popup = document.getElementById("popup");

let keytermDict = { consectetur: "Some value" };

for (i = 0; i < keyterms.length; i++) {
    console.log(keyterms[i]);
    keyterms[i].addEventListener("mouseenter", function (event) {
        popup.style.display = "block";
        let currentTerm = this.innerHTML;
        popup.querySelector("#title").innerHTML = currentTerm;
        popup.querySelector("#explanation").innerHTML =
            keytermDict[currentTerm];

        popup.style.top = event.clientY + "px";
        popup.style.left = event.clientX + "px";
    });

    keyterms[i].addEventListener("mouseout", function () {
        popup.style.display = "none";
    });
}
