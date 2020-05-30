/* D3 code to implement the interactive visualization module */

let margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 800,
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
let selectpoints = (point) => {};

// selecting a pair of parameters

let sizeParameter = document.getElementById("size");
let windowParameter = document.getElementById("window");
let modelParameter = document.getElementById("model");
let themeParameter = document.getElementById("theme");

let datastring = "birds_50_2_0.csv";
const createNewData = () => {
    let size = sizeParameter.options[sizeParameter.selectedIndex].value;
    let window = windowParameter.options[windowParameter.selectedIndex].value;
    let model = modelParameter.options[modelParameter.selectedIndex].value;
    let theme = themeParameter.options[themeParameter.selectedIndex].value;

    datastring = theme + "_" + size + "_" + window + "_" + model + ".csv";

    d3.csv("../data/" + datastring, function (data) {
        drawdata(data);
    });
};

// Reusable chart drawing code for when the data source changes

let drawdata = (data) => {
    // Add X axis
    var x = d3.scaleLinear().domain([-10, 10]).range([0, width]);
    svg.append("g").attr("transform", "translate(0," + height + ")");
    // Add Y axis
    var y = d3.scaleLinear().domain([-10, 10]).range([height, 0]);

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
        .attr("r", 3)
        .style("fill", "#69b3a2dd")
        .on("mouseover", function (d) {
            d3.select(this).attr("r", 5);
            tooltip.style("opacity", 1);
            tooltip
                .html(d.name)
                .style("left", d3.mouse(this)[0] + 370 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
                .style("top", d3.mouse(this)[1] + 30 + "px");
        })
        .on("mouseleave", function (d) {
            d3.select(this).attr("r", 3);
            tooltip.style("opacity", 0);
        })
        .on("click", function (d) {
            //comparison function
        });
};

// temporary data code
d3.csv("../data/" + datastring, function (data) {
    drawdata(data);
});
