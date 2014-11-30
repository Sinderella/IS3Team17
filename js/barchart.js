
function barchart(graph) {
    var dataset = [{
        "city": "Aberdeen City",
        "color": '#f77c7c',
        "vote": 58,
        "value": 11
    }, {
        "city": "Aberdeen Shire",
        "color": '#f76363',
        "vote": 60,
        "value": 20
    }, {
        "city": "Angus",
        "color": '#f77c7c',
        "vote": 56,
        "value": 16
    }, {
        "city": "Argyll & Bute",
        "color": '#f77c7c',
        "vote": 58,
        "value": 25
    }, {
        "city": "Clackmannanshire",
        "color": '#f7adad',
        "vote": 53,
        "value": 3
    }, {
        "city": "Comhairle Nan Eilean Siar",
        "color": '#f7adad',
        "vote": 53,
        "value": 6
    }, {
        "city": "East Ayrshire",
        "color": '#f7adad',
        "vote": 53,
        "value": 45
    }, {
        "city": "East Lothian",
        "color": '#f7adad',
        "vote": 53,
        "value": 8
    }, {
        "city": "Orkney",
        "color": '#f7adad',
        "vote": 53,
        "value": 11
    }, {
        "city": "Perth & Kinross",
        "color": '#f7adad',
        "vote": 53,
        "value": 23
    }];

    var data_max = 50;

    var margin = {
            top: 20,
            right: 30,
            bottom: 25,
            left: 50
        },
        width = 500 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .domain([0, data_max])
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .domain(d3.range(dataset.length))
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d) {
            return "temp msg";
        })

    var svg = d3.select(graph)
        .append("svg:svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("svg:g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip);

    x.domain(dataset.map(function (d) {
        return d.city;
    }));
    var x0 = x.domain(dataset.sort(function (a, b) {
        return b.vote - a.vote;
    })
        .map(function (d) {
            return d.city;
        }))
        .copy();

    y.domain([0, d3.max(dataset, function (d) {
        return d.value;
    })]);

    svg.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .text("");

    svg.append("svg:g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "-3.55em")
        .style("text-anchor", "end")
        .text("Temp Y-Axis name");

    var bars = svg.selectAll(".bar")
        .data(dataset)
        .enter().append("svg:rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.city);
        })
        .attr("width", x.rangeBand())
        .attr("y", function (d) {
            return y(d.value);
        })
        .attr("height", function (d) {
            return height - y(d.value);
        })
        .style("fill", function (d) {
            return d.color;
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
}