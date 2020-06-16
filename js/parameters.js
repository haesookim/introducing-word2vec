let infobuttons = document.getElementsByClassName("infobutton");

let defbox = document.getElementById("param-def");
let defTerm = document.getElementById("paramtitle");
let deftext = document.getElementById("paramtext");

let currentlyopen = -1;

const openDef = (i) => {
    if (defbox.style.width == "300px") {
        if (currentlyopen != i) {
            setTimeout(() => {
                openDef(i);
            }, 400);
        }
        closeDef();
    } else {
        currentlyopen = i;
        defbox.style.width = "300px";
        defbox.style.padding = "10px 20px 0";

        switch (i) {
            case 0:
                defTerm.innerHTML = "Size";
                deftext.innerHTML =
                    "Size is the dimension of the output vector space. The data in this visualization is normalized to a 2D vector space, but originally it will be placed in a vector space with the specified number of dimensions.<br><br> The most commonly used value is 100.";
                return;

            case 1:
                defTerm.innerHTML = "Window Size";
                deftext.innerHTML =
                    "Window size is the unit of input that is used for training. It refers to how many adjacent words will be used as a relevant sample for each word. <br><br>The most frequently used value for window size is 5.";
                return;
            case 2:
                defTerm.innerHTML = "Training Model";
                deftext.innerHTML =
                    "Training model is the model used for an internal two-layer neural network. The skip-gram model predicts multiple neighboring words for one input, while the CBOW model predicts a single target word from multiple inputs. For smaller corpuses, the skip-gram model is more effective. <br><br>Skip-gram model is usually used for better performance.";
                return;
        }
    }
};

const closeDef = () => {
    defbox.style.width = "0px";
    defbox.style.padding = "10px 0";
    currentlyopen = -1;
};
