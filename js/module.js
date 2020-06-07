/* D3 code to implement the interactive visualization module */

let width = 800,
    height = 740;

let svg = d3
    .select("#display")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g");

let tooltip = d3
    .select("#display")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("position", "absolute")
    .style("border", "solid 1px black")
    .style("border-radius", "4px")
    .style("padding", "10px");

//selecting a pair of point for comparison
let pair = [null, null];
let selectpoints = (point) => {
    if (pair[0] == null) {
        pair[0] = point;
        point.attr("r", 10);
    } else if (pair[1] == null) {
        if (pair[0] == point) {
            pair[0] == null;
        } else {
            pair[1] = point;
        }
    }
    console.log(pair);
};
let emptypoints = () => {
    pair = [null, null];
};

// selecting a pair of parameters

let sizeParameter = document.getElementById("size");
let windowParameter = document.getElementById("window");
let modelParameter = document.getElementById("model");
let themeParameter = document.getElementById("theme");

let datastring = "country_50_2_0.csv";

const createNewData = () => {
    let size = sizeParameter.options[sizeParameter.selectedIndex].value;
    let window = windowParameter.options[windowParameter.selectedIndex].value;
    let model = modelParameter.options[modelParameter.selectedIndex].value;
    let theme = themeParameter.options[themeParameter.selectedIndex].value;

    datastring = theme + "_" + size + "_" + window + "_" + model + ".csv";

    //d3.csv("./../introducing-word2vec/data/" + datastring, function (data) { // use when deploying to github pages

    d3.csv("./../data/" + datastring, function (data) {
        console.log(datastring);
        d3.select("#display").select("svg").remove().exit();
        svg = d3
            .select("#display")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g");
        drawdata(data);
    });
};

// Reusable chart drawing code for when the data source changes

// Add X axis
var x = d3.scaleLinear().domain([-0.1, 1.1]).range([0, width]);
// Add Y axis
var y = d3.scaleLinear().domain([-0.1, 1.1]).range([height, 0]);

let drawdata = (data) => {
    svg.append("g").attr("transform", "translate(0," + height + ")");
    // Add dots
    svg.append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return x(d.x);
        })
        .attr("cy", function (d) {
            return y(d.y);
        })
        .attr("r", 5)
        .style("fill", "#69b3a2dd")
        .on("mouseover", function (d) {
            d3.select(this).attr("r", 10);
            tooltip.style("opacity", 1);
            tooltip
                .html(d.name)
                .style("left", d3.mouse(this)[0] + 450 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
                .style("top", d3.mouse(this)[1] + 30 + "px");
        })
        .on("mouseleave", function (d) {
            if (pair[0] !== d.name && pair[1] !== d.name) {
                d3.select(this).attr("r", 5);
                tooltip.style("opacity", 0);
            }
        })
        .on("click", function (d) {
            //selectpoints(d3.select(this));
            if (pair[0] == d.name) {
                if (pair[1] != null) {
                    pair[0] = pair[1];
                    pair[1] == null;
                } else {
                    pair = [null, null];
                }
            } else if (pair[1] == d.name) {
                pair[1] = null;
            } else if (pair[0] == null) {
                pair[0] = d.name;
            } else if (pair[1] == null) {
                pair[1] = d.name;
            }

            if (pair[0] != null) {
                secondaryview.style.display = "block";
            } else {
                secondaryview.style.display = "none";
            }

            if (pair[1] != null) {
            }
            console.log(pair);
            //comparison function
            displayWords();
        });
};

let secondaryview = document.getElementById("secondaryview");
let words = document.getElementsByClassName("selectedword");

const displayWords = () => {
    words[0].innerHTML = pair[0];
    words[1].innerHTML = pair[1];
};

const clearPair = () => {
    pairs = [null, null];
};

let inputform = document.getElementById("searchinput");

const trackSearch = (e) => {
    if (e.keyCode == 13) {
        searchForTerm();
    }
};

const searchForTerm = () => {
    let input = inputform.value.toLowerCase().trim();
    svg.selectAll("circle").attr("r", function (d) {
        if (d.name == input) {
            tooltip.style("opacity", 1);
            tooltip
                .html(d.name)
                .style("left", x(d.x) + 450 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
                .style("top", y(d.y) + 30 + "px");
            return 10;
        } else {
            return 5;
        }
    });
};
// temporary data code
//d3.csv("./../introducing-word2vec/data/" + datastring, function (data) {

d3.csv("./../data/" + datastring, function (data) {
    drawdata(data);
});
