function boxchart(yes, no) {
    $("#boxchart").empty();
    var width = 290;
    var chart = d3.select("#boxchart").append("svg")
        .attr("width", width)
        .attr("height", 30);

    var data1 = [yes];
    var data2 = [no];

    var rects = chart.selectAll(".rect1")
        .data(data2)
        .enter()
        .append("rect")
        .attr('class', 'rect1')
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", 30)
        .attr("width", function (d) {
            if (data1[0] == "NaN") return 50.0 / 100 * width;
            return data1[0] * 1.0 / 100 * width;
        })
        .attr("fill", "#1a75ff");

    var rects1 = chart.selectAll(".rect")
        .data(data1)
        .enter()
        .append("rect")
        .attr('class', 'rect')
        .attr("x", function (d) {
            if (data2[0] == "NaN") return 50.0 / 100 * width;
            return data1[0] * 1.0 / 100 * width;
        })
        .attr("y", 0)
        .attr("height", 30)
        .attr("width", function (d) {
            if (data2[0] == "NaN") return 50.0 / 100 * width;
            return data2[0] * 1.0 / 100 * width;
        })
        .attr("fill", "#f71919");

    var text1 = chart.selectAll(".txt1")
        .data(data1)
        .enter()
        .append("text")
        .attr("x", 7)
        .attr("y", 18)
        .style("fill", "#ffffff")
        .style("font-size", 12)
        .style("font-family", "Tahoma")
        .text("YES " + data1[0] + "%");

    var text2 = chart.selectAll(".txt2")
        .data(data2)
        .enter()
        .append("text")
        .attr("x", 153)
        .attr("y", 18)
        .style("fill", "#ffffff")
        .style("font-size", 12)
        .style("font-family", "Tahoma")
        .text("NO " + data2[0] + "%");
}