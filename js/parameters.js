let infobuttons = document.getElementsByClassName("infobutton");

let defbox = document.getElementById("param-def");
let defTerm = document.getElementById("paramtitle");
let deftext = document.getElementById("paramtext");

const openDef = (i) => {
    if (defbox.style.width == "300px") {
        closeDef();
    } else {
        defbox.style.width = "300px";
        defbox.style.padding = "10px 20px 0";

        switch (i) {
            case 0:
                defTerm.innerHTML = "Size";
                deftext.innerHTML =
                    "Size is the dimension of the output vector space, a hundred being the most widely used. ";
                return;

            case 1:
                defTerm.innerHTML = "Window Size";
                deftext.innerHTML =
                    "Window size is the unit of input that is used for training, five used most frequently.";
                return;
            case 2:
                defTerm.innerHTML = "Training Model";
                deftext.innerHTML =
                    "Training model is the model used for an internal two-layer neural network, skip-gram model used for better performance.";
                return;
        }
    }
};

const closeDef = () => {
    defbox.style.width = "0px";
    defbox.style.padding = "10px 0";
};
