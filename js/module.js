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

let colorbyCase = (d) => {
    switch (d.cluster) {
        case "1":
            return "#805D93dd";
        case "2":
            return "#F49FBCdd";
        case "3":
            return "#FFD3BAdd";
        case "4":
            return "#9EBD6Edd";
        case "5":
            return "#169873dd";
        case "6":
            return "#3DA5D9dd";
        case "7":
            return "#73BFB8dd";
        case "8":
            return "#7EBDC3dd";
    }
};

//selecting a pair of point for comparison
let pair = [null, null];
let coordsPair = [];

let emptypoints = () => {
    pair = [null, null];
};

let drawLine = (point1, point2) => {
    svg.append("line")
        .style("stroke", "black")
        .attr("x1", x(coordsPair[point1][0]))
        .attr("y1", y(coordsPair[point1][1]))
        .attr("x2", x(coordsPair[point2][0]))
        .attr("y2", y(coordsPair[point2][1]));
};

let clearLine = () => {
    svg.selectAll("line").remove();
};

// selecting a pair of parameters

let sizeParameter = document.getElementById("size");
let windowParameter = document.getElementById("window");
let modelParameter = document.getElementById("model");

let datastring = "50_2_0.csv";

const createNewData = () => {
    let size = sizeParameter.options[sizeParameter.selectedIndex].value;
    let window = windowParameter.options[windowParameter.selectedIndex].value;
    let model = modelParameter.options[modelParameter.selectedIndex].value;

    document.getElementById("sizeparam").innerHTML = "size = " + size;
    document.getElementById("windowparam").innerHTML = "window = " + window;
    document.getElementById("modelparam").innerHTML = "sg = " + model;

    datastring = size + "_" + window + "_" + model + ".csv";

    clearPair();
    clearLine();
    d3.csv("./../data/" + datastring, function (data) {
        //d3.csv("./../introducing-word2vec/data/" + datastring, function (data) {
        svg.selectAll("circle")
            .data(data)
            .enter()
            .attr("r", 5)
            .transition() // Transition from old to new
            .duration(700)
            .style("fill", function (d) {
                return colorbyCase(d);
            })
            .attr("cx", function (d) {
                return x(d.x);
            })
            .attr("cy", function (d) {
                return y(d.y);
            })
            .exit();
    });
};

const drawWithMovieData = () => {
    clearSVG();

    d3.csv("./../data/movie2vec/movie2vec_57.csv", function (data) {
        drawdata(data);
    });
};

const clearSVG = () => {
    d3.select("#display").select("svg").remove().exit();
    svg = d3
        .select("#display")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g");
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
        .style("fill", function (d) {
            return colorbyCase(d);
        })
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
                    .style("fill", function (d) {
                        return colorbyCase(d);
                    })
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
                selectNode(pair[0], tooltip_select1);
            } else {
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

let words = document.getElementsByClassName("selectedword");

const displayWords = () => {
    words[0].innerHTML = pair[0];
    words[1].innerHTML = pair[1];
};

const clearPair = () => {
    pair = [null, null];
    coordsPair = [];
    svg.selectAll("circle")
        .attr("r", 5)
        .style("fill", function (d) {
            return colorbyCase(d);
        });
    tooltip_select1.style("opacity", 0);
    tooltip_select2.style("opacity", 0);
    ex_tip.style("opacity", 0);
    ex_tip2.style("opacity", 0);
    ex_tip3.style("opacity", 0);
    ex_tip4.style("opacity", 0);
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

const searchByTerm = (input, tooltip) => {
    selectNode(input, tooltip);
};

const selectNode = (input, tip) => {
    svg.selectAll("circle")
        .style("fill", function (d) {
            if (d.name.toLowerCase() == input.toLowerCase()) {
                coordsPair.push([d.x, d.y]);
                return "#FC7753dd";
            } else if (pair.indexOf(d.name) != -1) {
                return "#FC7753dd";
            } else {
                return colorbyCase(d);
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
