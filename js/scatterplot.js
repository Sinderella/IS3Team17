function scatterplot(graph, selected, isBubble) {
    var dataset = [];
    var k = 0;
    for (var i = 0; i < json.objects.lad.geometries.length; ++i) {
        for (var j = 0; j < selectedID.length; ++j) {
            if (json.objects.lad.geometries[i].properties.LAD13NM == selectedID[j]) {
                var consData = {
                    "city": selectedID[j],
                    "color": '#f77c7c',
                    "key1": selected[0],
                    "value1": json.objects.lad.geometries[i].properties[selected[0]],
                    "key2": selected[1],
                    "value2": json.objects.lad.geometries[i].properties[selected[1]]
                }
                if (isBubble) {
                	consData.key3 = selected[2];
                    consData.value3 = json.objects.lad.geometries[i].properties[selected[2]];
                }
                dataset[k++] = consData;
            }
        }
    }

    var datamax = null;
    if (isBubble) {
        datamax = d3.max(dataset, function(d) {
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
    var xValue = function(d) {
            return d.value1;
        }, // data -> value
        xScale = d3.scale.linear().range([0, width]), // value -> display
        xMap = function(d) {
            return xScale(xValue(d));
        }, // data -> display
        xAxis = d3.svg.axis().scale(xScale).orient("bottom");

    // setup y
    var yValue = function(d) {
            return d.value2;
        }, // data -> value
        yScale = d3.scale.linear().range([height, 0]), // value -> display
        yMap = function(d) {
            return yScale(yValue(d));
        }, // data -> display
        yAxis = d3.svg.axis().scale(yScale).orient("left");

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return selected[2];
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

    var xLabel = "";
    // if (selected[0] == )

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
        .text(selected[0]);

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
        .text(selected[1]);

    // draw dots
    svg.selectAll(".dot")
        .data(dataset)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function(d) {
            if (isBubble) {
                return d.value3 * 1.0 / datamax * 30;
            }
            return 6;
        })
        .attr("cx", xMap)
        .attr("cy", yMap)
        .style("fill", function(d) {
            return d.color;
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    $(graph).addClass("delete-button");
}
