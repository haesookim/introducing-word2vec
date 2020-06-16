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

let legendDiv = document.getElementById("secondaryview");

let switchData = false;
const showSection = (num) => {
    closeDef();
    for (i = 0; i < menuSections.length; i++) {
        if (num == i) {
            menuSections[i].style.display = "block";
        } else {
            menuSections[i].style.display = "none";
        }
    }
    if (switchData) {
        clearSVG();
        datastring = "50_2_0.csv";
        d3.csv("./../data/" + datastring, function (data) {
            //d3.csv("./../introducing-word2vec/data/" + datastring, function (data) {
            drawdata(data);
        });
        switchData = false;
    }

    if (num == 1) {
        clearPair();
        clearLine();
        selectNode("korea", ex_tip);
        selectNode("seoul", ex_tip2);
        drawLine(0, 1);
        selectNode("greece", ex_tip3);
        selectNode("athens", ex_tip4);
        drawLine(2, 3);
    } else if (num == 2) {
        clearPair();
        clearLine();
        drawWithMovieData();

        setTimeout(() => {
            selectNode("Batman (1989)", ex_tip);
            selectNode("Dark Knight, The (2008)", ex_tip2);
        }, 400);
        //drawLine(0, 1);
        switchData = true;
    } else if (num == 4) {
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
    }

    if (num == 2) {
        disableParameters();
    } else {
        overlay.style.display = "none";
    }

    if (num == 2) {
        legendDiv.style.display = "none";
    } else {
        legendDiv.style.display = "block";
    }

    prevnum = num;
};

let overlay = document.getElementById("disabled-overlay");
const disableParameters = () => {
    overlay.style.display = "flex";
};

const enableParameters = () => {
    overlay.style.display = "none";
    showSection(3);
    openMenu();
};

let legendVisible = true;
let legendd = document.querySelector("#secondaryview");
let legendButton = document.querySelector("#secondaryview button");

const showLegend = () => {
    if (legendVisible) {
        legendDiv.style.height = "10px";
        legendButton.innerHTML =
            "<i class='fa fa-angle-up' aria-hidden='true'></i>";
    } else {
        console.log("???");
        legendDiv.style.height = "230px";
        legendButton.innerHTML =
            "<i class='fa fa-angle-down' aria-hidden='true'></i>";
    }
    legendVisible = !legendVisible;
};
