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

//example tooltips

let ex_tip = d3
    .select("#display")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("position", "absolute")
    .style("border", "solid 1px black")
    .style("border-radius", "4px")
    .style("padding", "5px 7px");

let ex_tip2 = d3
    .select("#display")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("position", "absolute")
    .style("border", "solid 1px black")
    .style("border-radius", "4px")
    .style("padding", "5px 7px");
let ex_tip3 = d3
    .select("#display")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("position", "absolute")
    .style("border", "solid 1px black")
    .style("border-radius", "4px")
    .style("padding", "5px 7px");
let ex_tip4 = d3
    .select("#display")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("position", "absolute")
    .style("border", "solid 1px black")
    .style("border-radius", "4px")
    .style("padding", "5px 7px");

const showSection = (num) => {
    for (i = 0; i < menuSections.length; i++) {
        if (num == i) {
            menuSections[i].style.display = "block";
        } else {
            menuSections[i].style.display = "none";
        }
    }

    if (num == 1) {
        selectNode("korea", ex_tip);
        selectNode("seoul", ex_tip2);
        drawLine(0, 1);
        selectNode("japan", ex_tip3);
        selectNode("tokyo", ex_tip4);
        drawLine(2, 3);
    }
    if (num == 4) {
        clearPair();
        clearLine();
        selectNode("man", ex_tip);
        selectNode("actor", ex_tip2);
        drawLine(0, 1);
        selectNode("woman", ex_tip3);
        selectNode("actress", ex_tip4);
        drawLine(2, 3);
    } else {
        clearLine();
        clearPair();
        openMenu();
    }
};
