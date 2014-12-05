function scatterplot(graph, selected, isBubble) {
    var dataset = [];
    var k = 0;
    for (var i = 0; i < json.objects.lad.geometries.length; ++i) {
        for (var j = 0; j < selectedID.length; ++j) {
            if (json.objects.lad.geometries[i].properties.LAD13NM == selectedID[j]) {
                var consData = {
                    "city": selectedID[j],
                    "yes": ((json.objects.lad.geometries[i].properties.yes / (json.objects.lad.geometries[i].properties.numberOfVotes)) * 100).toFixed(2),
                    "no": ((json.objects.lad.geometries[i].properties.no / (json.objects.lad.geometries[i].properties.numberOfVotes)) * 100).toFixed(2),
                    "value1": json.objects.lad.geometries[i].properties[selected[0]],
                    "value2": json.objects.lad.geometries[i].properties[selected[1]]
                }
                if (isBubble)
                    consData.value3 = json.objects.lad.geometries[i].properties[selected[2]];
                if ($('#radioYes').is(':checked')) {
                    var voteType = YES_TYPE;
                    consData.color = getColorByVote(voteType, consData.yes);
                }
                else {
                    var voteType = NO_TYPE;
                    consData.color = getColorByVote(voteType, consData.no);
                }
                dataset[k++] = consData;
            }
        }
    }

    var labels = [];
    for (var i = 0; i < 3; ++i) {
        if (selected[i] == "incomeDomainRate")
            labels[i] = "Income Domain Rate Percentage";
        else if (selected[i] == "incomeDeprivedPeople")
            labels[i] = "No. of Income Deprived People";
        else if (selected[i] == "employmentDomainRate")
            labels[i] = "Employment Domain Rate Percentage";
        else if (selected[i] == "employmentDeprivedPeople")
            labels[i] = "No. of Employment Deprived People";
        else if (selected[i] == "bestFitWorkingAgePopulation")
            labels[i] = "Best Fit Working Age Population";
        else if (selected[i] == "estimatedPopulation")
            labels[i] = "Estimated Population";
        else if (selected[i] == "area")
            labels[i] = "Area Density";
        else if (selected[i] == "councilExpenditurePerCapita")
            labels[i] = "Council Expenditure Per Capita";
    }

    var datamax = null;
    if (isBubble) {
        datamax = d3.max(dataset, function (d) {
            return d.value3;
        });
    }

    var margin = {
            top: 20,
            right: 30,
            bottom: 25,
            left: 50
        },
        width = 500 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;

    /*
     * value accessor - returns the value to encode for a given data object.
     * scale - maps value to a visual display encoding, such as a pixel position.
     * map function - maps from data value to display value
     * axis - sets up axis
     */

    // setup x
    var xValue = function (d) {
            return d.value1;
        }, // data -> value
        xScale = d3.scale.linear().range([0, width]), // value -> display
        xMap = function (d) {
            return xScale(xValue(d));
        }, // data -> display
        xAxis = d3.svg.axis().scale(xScale).orient("bottom");

    // setup y
    var yValue = function (d) {
            return d.value2;
        }, // data -> value
        yScale = d3.scale.linear().range([height, 0]), // value -> display
        yMap = function (d) {
            return yScale(yValue(d));
        }, // data -> display
        yAxis = d3.svg.axis().scale(yScale).orient("left");

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d) {
            var str = d.city + "<br>yes " + d.yes + "% : no " + d.no + "%<br>";

            value1 = d.value1;
            if (value1 % 1 !== 0)
                value1 = value1.toFixed(2);
            str += labels[0] + ": " + value1 + "<br>";

            value2 = d.value2;
            if (value2 % 1 !== 0)
                value2 = value2.toFixed(2);
            str += labels[1] + ": " + value2 + "<br>";

            if (isBubble) {
                value3 = d.value3;
                if (value3 % 1 !== 0)
                    value3 = value3.toFixed(2);
                str += labels[2] + ": " + value3;
            }

            return str;
        })


    // add the graph canvas to the body of the webpage
    var svg = d3.select(graph).append("svg:svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip);

    // add the tooltip area to the webpage
    var tooltip = d3.select(graph).append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // don't want dots overlapping axis, so add in buffer to data domain
    xScale.domain([d3.min(dataset, xValue) - 10, d3.max(dataset, xValue) + 10]);
    yScale.domain([d3.min(dataset, yValue) - 10, d3.max(dataset, yValue) + 10]);

    // x-axis
    svg.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text(labels[0]);

    // y-axis
    svg.append("svg:g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(labels[1]);

    // draw dots
    svg.selectAll(".dot")
        .data(dataset)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function (d) {
            if (isBubble) {
                return d.value3 * 1.0 / datamax * 30;
            }
            return 6;
        })
        .attr("cx", xMap)
        .attr("cy", yMap)
        .style("fill", function (d) {
            return d.color;
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    $(graph).addClass("delete-button");
}
