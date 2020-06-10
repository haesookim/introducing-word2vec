/* D3 code to implement the interactive visualization module */

let width = 800,
    height = 660;

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
    .style("z-index", 70)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("position", "absolute")
    .style("border", "solid 1px black")
    .style("border-radius", "4px")
    .style("padding", "5px 7px");

let tooltip_select1 = d3
    .select("#display")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("position", "absolute")
    .style("border", "solid 1px black")
    .style("border-radius", "4px")
    .style("padding", "5px 7px");

let tooltip_select2 = d3
    .select("#display")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("position", "absolute")
    .style("border", "solid 1px black")
    .style("border-radius", "4px")
    .style("padding", "5px 7px");

//selecting a pair of point for comparison
let pair = [null, null];
let selectpoints = (point) => {
    if (pair[0] == null) {
        pair[0] = point;
        point.attr("r", 7);
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

let datastring = "country_50_2_0.csv";

const createNewData = () => {
    let size = sizeParameter.options[sizeParameter.selectedIndex].value;
    let window = windowParameter.options[windowParameter.selectedIndex].value;
    let model = modelParameter.options[modelParameter.selectedIndex].value;
    let theme = "country";

    document.getElementById("sizeparam").innerHTML = "size = " + size;
    document.getElementById("windowparam").innerHTML = "window = " + window;
    document.getElementById("modelparam").innerHTML = "sg = " + model;

    datastring = theme + "_" + size + "_" + window + "_" + model + ".csv";

    clearPair();
    d3.csv("./../data/" + datastring, function (data) {
        //d3.csv("./../introducing-word2vec/data/" + datastring, function (data) {
        svg.selectAll("circle")
            .data(data)
            .attr("r", 5)
            .transition() // Transition from old to new
            .duration(700)
            .style("fill", "#7EBDC3dd")
            .attr("cx", function (d) {
                return x(d.x);
            })
            .attr("cy", function (d) {
                return y(d.y);
            });
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
        .style("fill", "#7EBDC3dd")
        .on("mouseover", function (d) {
            d3.select(this)
                .transition()
                .style("fill", "#FC7753dd")
                .attr("r", 7);
            if (pair[0] !== d.name && pair[1] !== d.name) {
                tooltip
                    // .transition() // Transition from old to new
                    // .duration(200)
                    .style("opacity", 1);
                tooltip
                    .html(d.name)
                    .style("left", d3.mouse(this)[0] + 450 + "px")
                    .style("top", d3.mouse(this)[1] + 40 + "px");
            }
        })
        .on("mouseleave", function (d) {
            if (pair[0] !== d.name && pair[1] !== d.name) {
                d3.select(this)
                    .transition()
                    .style("fill", "#7EBDC3dd")
                    .attr("r", 5);
            }
            tooltip.style("opacity", 0);
        })
        .on("click", function (d) {
            //selectpoints(d3.select(this));
            tooltip.style("opacity", 0);
            if (pair[0] == d.name) {
                if (pair[1] != null) {
                    pair = [pair[1], null];
                } else {
                    pair = [null, null];
                }
            } else if (pair[1] == d.name) {
                pair[1] = null;
                //tooltip_select2.style("opacity", 0);
            } else if (pair[0] == null) {
                pair[0] = d.name;
            } else if (pair[1] == null) {
                pair[1] = d.name;
            } else if (pair[1] != null) {
                pair = [null, null];
                pair[0] = d.name;
            }

            if (pair[0] != null) {
                secondaryview.style.display = "block";
                selectNode(pair[0], tooltip_select1);
            } else {
                secondaryview.style.display = "none";
                tooltip_select1.style("opacity", 0);
            }

            if (pair[1] != null) {
                selectNode(pair[1], tooltip_select2);
            } else {
                tooltip_select2.style("opacity", 0);
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
    pair = [null, null];
    svg.selectAll("circle").attr("r", 5).style("fill", "#7EBDC3dd");
    tooltip_select1.style("opacity", 0);
    tooltip_select2.style("opacity", 0);
    secondaryview.style.display = "none";
};

let inputform = document.getElementById("searchinput");

const trackSearch = (e) => {
    if (e.keyCode == 13) {
        searchForTerm();
    }
};

const searchForTerm = () => {
    let input = inputform.value.trim();
    selectNode(input, tooltip);
};

const selectNode = (input, tip) => {
    svg.selectAll("circle")
        .style("fill", function (d) {
            if (d.name.toLowerCase() == input.toLowerCase()) {
                return "#FC7753dd";
            } else if (pair.indexOf(d.name) != -1) {
                return "#FC7753dd";
            } else {
                return "#7EBDC3dd";
            }
        })
        .transition()
        .attr("r", function (d) {
            if (d.name.toLowerCase() == input.toLowerCase()) {
                tip.style("opacity", 1);
                tip.html(d.name)
                    .style("left", x(d.x) + 450 + "px")
                    .style("top", y(d.y) + 40 + "px");
                return 7;
            } else if (pair.indexOf(d.name) != -1) {
                return 7;
            } else {
                return 5;
            }
        });
};
// temporary data code
// d3.csv("./../introducing-word2vec/data/" + datastring, function (data) {
//     drawdata(data);
// });

d3.csv("./../data/" + datastring, function (data) {
    drawdata(data);
});
