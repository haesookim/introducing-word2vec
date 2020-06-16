/* D3 code to implement the interactive visualization module */

let width = 800,
    height = 660;

let svg = d3
    .select("#display")
    .append("svg")
    .attr("id", "mainsvg")
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
    if (pair[0] == d.name || pair[1] == d.name) {
        return "#FC7753dd";
    }
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
let paramRadios = document.querySelectorAll('input[type="radio"]');

for (let i = 0; i < 9; i++) {
    paramRadios[i].addEventListener("change", function () {
        createNewData();
    });
}
let datastring = "50_2_0.csv";

const createNewData = () => {
    let size = document.querySelector('input[name="size"]:checked').value;
    let window = document.querySelector('input[name="window"]:checked').value;
    let model = document.querySelector('input[name="model"]:checked').value;

    document.getElementById("sizeparam").innerHTML = "size = " + size;
    document.getElementById("windowparam").innerHTML = "window = " + window;
    document.getElementById("modelparam").innerHTML = "sg = " + model;

    datastring = size + "_" + window + "_" + model + ".csv";

    searchterm = "";
    clearPair();
    clearLine();
    //d3.csv("./../data/" + datastring, function (data) {
    d3.csv("./../introducing-word2vec/data/" + datastring, function (data) {
        svg.selectAll("circle")
            .data(data)
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
            });

        setTimeout(() => {
            reselectNodes();
        }, 700);
    });
};

const reselectNodes = () => {
    if (pair[0] != null) {
        selectNode(pair[0], tooltip_select1);
        selectNode(pair[1], tooltip_select2);
    }
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

let dots;
let wordArray = [];

let drawdata = (data) => {
    wordArray = [];
    svg.append("g").attr("transform", "translate(0," + height + ")");
    // Add dots
    dots = svg.append("g").selectAll("dot").data(data).enter();

    dots.append("circle")
        .attr("cx", function (d) {
            wordArray.push(d.name);
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
                // tooltip
                //     .html(d.name)
                //     .style("left", d3.mouse(this)[0] + 450 + "px")
                //     .style("top", d3.mouse(this)[1] + 40 + "px");

                tooltip
                    .html(d.name)
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY + 10 + "px");
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
                //pair = [null, null];
                pair[0] = pair[1];
                pair[1] = d.name;
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
        });
};

let words = document.getElementsByClassName("selectedword");

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
let terms = document.querySelectorAll(".term");
let searchterm = "";
for (let i = 0; i < terms.length; i++) {
    terms[i].addEventListener("click", () => {
        searchterm = this.innerHTML;
        selectNode(this.innerHTML, tooltip);
    });
}

const trackSearch = (e) => {
    if (e.keyCode == 13) {
        searchterm = inputform.value;
        searchForTerm();
        for (let i = 0; i < terms.length; i++) {
            terms[i].innerHTML = "";
            if (terms[i].classList.contains("visible")) {
                terms[i].classList.toggle("visible");
            }
        }
    } else if (inputform.value !== "") {
        for (let i = 0; i < terms.length; i++) {
            terms[i].innerHTML = "";
            if (terms[i].classList.contains("visible")) {
                terms[i].classList.toggle("visible");
            }
        }
        let termscount = 0;
        for (let i = 0; i < wordArray.length; i++) {
            if (
                wordArray[i].toLowerCase().substr(0, inputform.value.length) ==
                inputform.value.toLowerCase()
            ) {
                terms[termscount].innerHTML = wordArray[i];
                terms[termscount].classList.toggle("visible");
                termscount++;
            }
            if (termscount.length > 4) {
                break;
            }
        }
    } else {
        for (let i = 0; i < terms.length; i++) {
            terms[i].innerHTML = "";
            if (terms[i].classList.contains("visible")) {
                terms[i].classList.toggle("visible");
            }
        }
    }
};

const searchForTerm = () => {
    let input = inputform.value.trim();
    selectNode(input, tooltip);
};

let svgCoords = document.getElementById("mainsvg").getBoundingClientRect();

const selectNode = (input, tip) => {
    svg.selectAll("circle")
        .style("fill", function (d) {
            if (d.name.toLowerCase() == input.toLowerCase()) {
                coordsPair.push([d.x, d.y]);
            }

            if (pair.indexOf(d.name) != -1) {
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
                    .style("left", x(d.x) + svgCoords.x + 10 + "px")
                    .style("top", y(d.y) + svgCoords.y + 10 + "px");
            }

            if (pair.indexOf(d.name) != -1) {
                return 7;
            } else if (d.name.toLowerCase() == searchterm.toLowerCase()) {
                return 7;
            } else {
                return 5;
            }
        });
    searchterm = "";
};
//temporary data code
d3.csv("./../introducing-word2vec/data/" + datastring, function (data) {
    drawdata(data);
});

// d3.csv("./../data/" + datastring, function (data) {
//     drawdata(data);
// });

// legend

let legendData = [
    { type: "Countries", cluster: "1", name: "" },
    { type: "Capitals", cluster: "2", name: "" },
    { type: "Animals", cluster: "3", name: "" },
    { type: "Weather", cluster: "4", name: "" },
    { type: "Jobs", cluster: "5", name: "" },
    { type: "Gendered nouns", cluster: "6", name: "" },
    { type: "Transport", cluster: "7", name: "" },
];
let legend = d3
    .select("#secondaryview")
    .append("svg")
    .attr("width", "200px")
    .attr("height", "200px")
    .append("g")
    .selectAll("dot")
    .data(legendData)
    .enter();

let legendDots = legend
    .append("circle")
    .attr("r", 7)
    .attr("cx", 20)
    .attr("cy", function (d) {
        return d.cluster * 25 - 5;
    })
    .style("fill", function (d) {
        return colorbyCase(d);
    });

legend
    .append("text")
    .text((d) => d.type)
    .style("fill", "white")
    .style("width", 80)
    .attr("x", 40)
    .attr("y", (d) => d.cluster * 25);

const drawWithMovieData = () => {
    clearSVG();
    d3.csv(
        "./../introducing-word2vec/data/movie2vec/movie2vec_57.csv",
        function (data) {
            //d3.csv("./../data/movie2vec/movie2vec_57.csv", function (data) {
            drawdata(data);
        },
    );
};
