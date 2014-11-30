function scatterplot(graph, isBubble){
    var dataset = [{
        "city": "Aberdeen City",
        "color": '#f77c7c',
        "vote": 58,
        "value1": 11,
        "value2": 19605,
        "value3": 217120
    }, {
        "city": "Aberdeen Shire",
        "color": '#f76363',
        "vote": 60,
        "value1": 20,
        "value2": 16645,
        "value3":  245780
    }, {
        "city": "Angus",
        "color": '#f77c7c',
        "vote": 56,
        "value1": 16,
        "value2": 12290,
        "value3": 110570
    }, {
        "city": "Argyll & Bute",
        "color": '#f77c7c',
        "vote": 58,
        "value1": 25,
        "value2": 9570,
        "value3": 89200
    }, {
        "city": "Clackmannanshire",
        "color": '#f7adad',
        "vote": 53,
        "value1": 3,
        "value2": 7915,
        "value3": 50630
    }, {
        "city": "Comhairle Nan Eilean Siar",
        "color": '#f7adad',
        "vote": 53,
        "value1": 6,
        "value2": 18515,
        "value3": 148190
    }, {
        "city": "East Ayrshire",
        "color": '#f7adad',
        "vote": 53,
        "value1": 45,
        "value2": 25690,
        "value3": 144290
    }, {
        "city": "East Lothian",
        "color": '#f7adad',
        "vote": 53,
        "value1": 8,
        "value2": 20060,
        "value3": 120240
    }, {
        "city": "Orkney",
        "color": '#f7adad',
        "vote": 53,
        "value1": 11,
        "value2": 8265,
        "value3": 104580
    }, {
        "city": "Perth & Kinross",
        "color": '#f7adad',
        "vote": 53,
        "value1": 23,
        "value2": 10375,
        "value3": 97500
    }];

    var datamax = null;
    if (isBubble) {
        datamax = d3.max(dataset, function(d) { return d.value3; });
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
    var xValue = function(d) { return d.value1;}, // data -> value
        xScale = d3.scale.linear().range([0, width]), // value -> display
        xMap = function(d) { return xScale(xValue(d));}, // data -> display
        xAxis = d3.svg.axis().scale(xScale).orient("bottom");

    // setup y
    var yValue = function(d) { return d.value2;}, // data -> value
        yScale = d3.scale.linear().range([height, 0]), // value -> display
        yMap = function(d) { return yScale(yValue(d));}, // data -> display
        yAxis = d3.svg.axis().scale(yScale).orient("left");

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "temp msg";
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
    xScale.domain([d3.min(dataset, xValue)-10, d3.max(dataset, xValue)+10]);
    yScale.domain([d3.min(dataset, yValue)-10, d3.max(dataset, yValue)+10]);

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
        .text("Temp Axis X");

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
        .text("Temp Axis Y");

    // draw dots
    svg.selectAll(".dot")
        .data(dataset)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function(d) {
            if (isBubble) {
                return d.value3*1.0/datamax*30;
            }
            return 6;
        })
        .attr("cx", xMap)
        .attr("cy", yMap)
        .style("fill", function(d) { return d.color;})
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
}