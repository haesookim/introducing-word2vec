let infobuttons = document.getElementsByClassName("infobutton");

let defbox = document.getElementById("param-def");

const openDef = (i) => {
    defbox.style.width = "300px";
    defbox.style.padding = "10px 20px 0";
};

const closeDef = () => {
    defbox.style.width = "0px";
    defbox.style.padding = "10px 0";
};

for (i = 0; i < 3; i++) {
    infobuttons[i].addEventListener("click", () => {
        openDef(i);
    });
}
