function barchart(graph, selected) {
    var dataset = [];
    var k = 0;
    for (var i = 0; i < json.objects.lad.geometries.length; ++i) {
        for (var j = 0; j < selectedID.length; ++j) {
            if (json.objects.lad.geometries[i].properties.LAD13NM == selectedID[j]) {
                var consData = {
                    "city": selectedID[j],
                    "yes": ((json.objects.lad.geometries[i].properties.yes / (json.objects.lad.geometries[i].properties.numberOfVotes)) * 100).toFixed(2),
                    "no": ((json.objects.lad.geometries[i].properties.no / (json.objects.lad.geometries[i].properties.numberOfVotes)) * 100).toFixed(2),
                    "value1": json.objects.lad.geometries[i].properties[selected[0]]
                }
                if ($('#radioYes').is(':checked')) {
                    var voteType = YES_TYPE;
                    consData.color = getColorByVote(voteType, consData.yes);
                } else {
                    var voteType = NO_TYPE;
                    consData.color = getColorByVote(voteType, consData.no);
                }
                dataset[k++] = consData;
            }
        }
    }

    var label = "";
    if (selected[0] == "incomeDomainRate")
        label = "Income Domain Rate Percentage";
    else if (selected[0] == "incomeDeprivedPeople")
        label = "No. of Income Deprived People";
    else if (selected[0] == "employmentDomainRate")
        label = "Employment Domain Rate Percentage";
    else if (selected[0] == "employmentDeprivedPeople")
        label = "No. of Employment Deprived People";
    else if (selected[0] == "bestFitWorkingAgePopulation")
        label = "Best Fit Working Age Population";
    else if (selected[0] == "estimatedPopulation")
        label = "Estimated Population";
    else if (selected[0] == "area")
        label = "Area Density";
    else if (selected[0] == "councilExpenditurePerCapita")
        label = "Council Expenditure Per Capita";

    var datamax = d3.max(dataset, function(d) {
        return d.value1;
    });

    var margin = {
            top: 20,
            right: 30,
            bottom: 25,
            left: 50
        },
        width = 500 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .domain([0, datamax])
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
        .html(function(d) {
            var str = d.city + "<br>yes " + d.yes + "% : no " + d.no + "%<br>";

            value1 = d.value1;
            if (value1 % 1 !== 0)
                value1 = value1.toFixed(2);
            str += label + ": " + value1;

            return str;
        })

    var svg = d3.select(graph)
        .append("svg:svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("svg:g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip);

    x.domain(dataset.map(function(d) {
        return d.city;
    }));
    var x0 = x.domain(dataset.sort(function(a, b) {
                if ($('#radioYes').is(':checked'))
                    return b.yes - a.yes;
                else
                    return b.no - a.no;
            })
            .map(function(d) {
                return d.city;
            }))
        .copy();

    y.domain([0, d3.max(dataset, function(d) {
        return d.value1;
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
        .attr("dy", "zem")
        .style("text-anchor", "end")
        .text(label);

    var bars = svg.selectAll(".bar")
        .data(dataset)
        .enter().append("svg:rect")
        .attr("class", "bar")
        .attr("x", function(d) {
            return x(d.city);
        })
        .attr("width", x.rangeBand())
        .attr("y", function(d) {
            return y(d.value1);
        })
        .attr("height", function(d) {
            return height - y(d.value1);
        })
        .style("fill", function(d) {
            return d.color;
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    $(graph).addClass("delete-button");
}
