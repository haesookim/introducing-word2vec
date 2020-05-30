var margin = { top: 10, right: 30, bottom: 30, left: 50 },
    examplewidth = 300 - margin.left - margin.right,
    exampleheight = 300 - margin.top - margin.bottom;

let examplesvg = d3
    .select("#example")
    .append("svg")
    .attr("width", examplewidth)
    .attr("height", exampleheight)
    .append("g");

d3.csv("example.csv", function (data) {
    var x = d3.scaleLinear().domain([0, 100]).range([0, examplewidth]);
    examplesvg
        .append("g")
        .attr("transform", "translate(0," + exampleheight + ")")
        .call(d3.axisBottom(x));
    // Add Y axis
    var y = d3.scaleLinear().domain([0, 100]).range([exampleheight, 0]);
    examplesvg.append("g").call(d3.axisLeft(y));
    // Add dots

    let temp = examplesvg
        .append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("g");

    temp.append("circle")
        .attr("cx", function (d) {
            return x(d.cuteness);
        })
        .attr("cy", function (d) {
            return y(d.size);
        })
        .attr("r", 3)
        .style("fill", "#de5833");

    temp.append("text")
        .attr("x", function (d) {
            return x(d.cuteness) + 6;
        })
        .attr("y", function (d) {
            return y(d.size) + 3;
        })
        .text(function (d) {
            return d.name;
        });
});
