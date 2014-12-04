function map(voteType) {
    var width = 800,
        height = 840;

    var projection = d3.geo.albers()
        .center([0, 56.5])
        .rotate([2, 0])
        .scale(4450)
        .translate([width / 1.7, height / 2.5]);

    var path = d3.geo.path()
        .projection(projection);

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d) {
            //changeInfo(d.properties.estimatedPopulation, 0, d.properties.yes, d.properties.no, 0, 0, d.properties.electorate,
            //    d.properties.numberOfVotes, 0, 0, 0, 0, 0);
            return d.properties.LAD13NM + "<br>" +
                "pop: " + d.properties.estimatedPopulation + "<br>" +
                "electorate: " + d.properties.electorate + "<br>" +
                "#votes: " + d.properties.numberOfVotes + "<br>" +
                "yes: " + d.properties.yes + "(" + (d.properties.yes * 1.0 / d.properties.numberOfVotes * 100).toFixed(2) + "%)" +
                ", no: " + d.properties.no + "(" + (d.properties.no * 1.0 / d.properties.numberOfVotes * 100).toFixed(2) + "%)";
        });

    var svg = d3.select("#map").append("svg")
        .attr("id", "mapsvg")
        .attr("width", width)
        .attr("height", height);

    svg.call(tip);

    d3.json("topo_lad.json", function (error, lad) {
        if (error) return console.error(error);

        svg.selectAll(".lad")
            .data(topojson.feature(lad, lad.objects.lad).features)
            .enter().append("path")
            .attr("class", "constituency")
            .attr("id", function (d) {
                return d.properties.LAD13NM;
            })
            .attr("d", path)
            .style("fill", function (d) {
                if (d.properties.isSelected) {
                    if (voteType == YES_TYPE)
                        return getColorByVote(voteType, d.properties.yes * 1.0 / d.properties.numberOfVotes * 100);
                    else if (voteType == NO_TYPE)
                        return getColorByVote(voteType, d.properties.no * 1.0 / d.properties.numberOfVotes * 100);
                    else
                        return "#95a5a6";
                } else {
                    return "#ECECEC";
                }
            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        svg.append("path")
            .datum(topojson.mesh(lad, lad.objects.lad, function (a, b) {
                return a !== b;
            }))
            .attr("d", path)
            .attr("class", "constituency-boundary");
    });

    $("#mapsvg").height(height - 350);
}

function changeMapColor() {
    var color, properties, percent;
    var pop, den, yes, no, male, female, elec, vote, reject, area, income, employ, epc;
    pop = den = yes = no = male = female = elec = vote = reject = area = income = employ = epc = 0;
    var voteType;
    var loop = 0;
    var checked = [];

    if ($('#radioYes').is(':checked'))
        voteType = YES_TYPE;
    else
        voteType = NO_TYPE;

    for (i = 0; i < 10; i++) {
        checked[checked.length] = $('#ch' + i).is(':checked');
    }
    d3.json("topo_lad.json", function (error, lad) {
        if (error) return console.error(error);

        $('.constituency').each(function (path) {
            properties = lad.objects.lad.geometries[loop].properties;
            percent = properties.yes * 1.0 / properties.numberOfVotes * 100;
            color = '#95a5a6';
            if (percent >= 0 && percent < 10 && checked[0] == true) {
                color = getColorByVote(voteType, percent);
                pop += properties.totalPopulation;
                den += properties.populationDensity;
                yes += properties.yes;
                no += properties.no;
                male += properties.estimatedMales;
                female += properties.estimatedFemales;
                elec += properties.electorate;
                vote += properties.numberOfVotes;
                reject += properties.rejectedPaper;
                area += properties.area;
                income += properties.incomeDeprivedPeople;
                employ += properties.employmentDeprivedPeople;
                epc += properties.councilExpenditurePerCapita;
                properties.isSelected = true;
            } else if (percent >= 10 && percent < 20 && checked[1] == true) {
                color = getColorByVote(voteType, percent);
                pop += properties.totalPopulation;
                den += properties.populationDensity;
                yes += properties.yes;
                no += properties.no;
                male += properties.estimatedMales;
                female += properties.estimatedFemales;
                elec += properties.electorate;
                vote += properties.numberOfVotes;
                reject += properties.rejectedPaper;
                area += properties.area;
                income += properties.incomeDeprivedPeople;
                employ += properties.employmentDeprivedPeople;
                epc += properties.councilExpenditurePerCapita;
                properties.isSelected = true;
            } else if (percent >= 20 && percent < 30 && checked[2] == true) {
                color = getColorByVote(voteType, percent);
                pop += properties.totalPopulation;
                den += properties.populationDensity;
                yes += properties.yes;
                no += properties.no;
                male += properties.estimatedMales;
                female += properties.estimatedFemales;
                elec += properties.electorate;
                vote += properties.numberOfVotes;
                reject += properties.rejectedPaper;
                area += properties.area;
                income += properties.incomeDeprivedPeople;
                employ += properties.employmentDeprivedPeople;
                epc += properties.councilExpenditurePerCapita;
                properties.isSelected = true;
            } else if (percent >= 30 && percent < 40 && checked[3] == true) {
                color = getColorByVote(voteType, percent);
                pop += properties.totalPopulation;
                den += properties.populationDensity;
                yes += properties.yes;
                no += properties.no;
                male += properties.estimatedMales;
                female += properties.estimatedFemales;
                elec += properties.electorate;
                vote += properties.numberOfVotes;
                reject += properties.rejectedPaper;
                area += properties.area;
                income += properties.incomeDeprivedPeople;
                employ += properties.employmentDeprivedPeople;
                epc += properties.councilExpenditurePerCapita;
                properties.isSelected = true;
            } else if (percent >= 40 && percent < 50 && checked[4] == true) {
                color = getColorByVote(voteType, percent);
                pop += properties.totalPopulation;
                den += properties.populationDensity;
                yes += properties.yes;
                no += properties.no;
                male += properties.estimatedMales;
                female += properties.estimatedFemales;
                elec += properties.electorate;
                vote += properties.numberOfVotes;
                reject += properties.rejectedPaper;
                area += properties.area;
                income += properties.incomeDeprivedPeople;
                employ += properties.employmentDeprivedPeople;
                epc += properties.councilExpenditurePerCapita;
                properties.isSelected = true;
            } else if (percent >= 50 && percent < 60 && checked[5] == true) {
                color = getColorByVote(voteType, percent);
                pop += properties.totalPopulation;
                den += properties.populationDensity;
                yes += properties.yes;
                no += properties.no;
                male += properties.estimatedMales;
                female += properties.estimatedFemales;
                elec += properties.electorate;
                vote += properties.numberOfVotes;
                reject += properties.rejectedPaper;
                area += properties.area;
                income += properties.incomeDeprivedPeople;
                employ += properties.employmentDeprivedPeople;
                epc += properties.councilExpenditurePerCapita;
                properties.isSelected = true;
            } else if (percent >= 60 && percent < 70 && checked[6] == true) {
                color = getColorByVote(voteType, percent);
                pop += properties.totalPopulation;
                den += properties.populationDensity;
                yes += properties.yes;
                no += properties.no;
                male += properties.estimatedMales;
                female += properties.estimatedFemales;
                elec += properties.electorate;
                vote += properties.numberOfVotes;
                reject += properties.rejectedPaper;
                area += properties.area;
                income += properties.incomeDeprivedPeople;
                employ += properties.employmentDeprivedPeople;
                epc += properties.councilExpenditurePerCapita;
                properties.isSelected = true;
            } else if (percent >= 70 && percent < 80 && checked[7] == true) {
                color = getColorByVote(voteType, percent);
                pop += properties.totalPopulation;
                den += properties.populationDensity;
                yes += properties.yes;
                no += properties.no;
                male += properties.estimatedMales;
                female += properties.estimatedFemales;
                elec += properties.electorate;
                vote += properties.numberOfVotes;
                reject += properties.rejectedPaper;
                area += properties.area;
                income += properties.incomeDeprivedPeople;
                employ += properties.employmentDeprivedPeople;
                epc += properties.councilExpenditurePerCapita;
                properties.isSelected = true;
            } else if (percent >= 80 && percent < 90 && checked[8] == true) {
                color = getColorByVote(voteType, percent);
                pop += properties.totalPopulation;
                den += properties.populationDensity;
                yes += properties.yes;
                no += properties.no;
                male += properties.estimatedMales;
                female += properties.estimatedFemales;
                elec += properties.electorate;
                vote += properties.numberOfVotes;
                reject += properties.rejectedPaper;
                area += properties.area;
                income += properties.incomeDeprivedPeople;
                employ += properties.employmentDeprivedPeople;
                epc += properties.councilExpenditurePerCapita;
                properties.isSelected = true;
            } else if (percent >= 90 && percent <= 100 && checked[9] == true) {
                color = getColorByVote(voteType, percent);
                pop += properties.totalPopulation;
                den += properties.populationDensity;
                yes += properties.yes;
                no += properties.no;
                male += properties.estimatedMales;
                female += properties.estimatedFemales;
                elec += properties.electorate;
                vote += properties.numberOfVotes;
                reject += properties.rejectedPaper;
                area += properties.area;
                income += properties.incomeDeprivedPeople;
                employ += properties.employmentDeprivedPeople;
                epc += properties.councilExpenditurePerCapita;
                properties.isSelected = true;
            } else
                properties.isSelected = false;
            loop = loop + 1;
            changeInfo(pop, den, yes, no, male, female, elec, vote, reject, area, income, employ, epc);
            var yesPer = (yes / vote * 100).toFixed(2), noPer = (no / vote * 100).toFixed(2);
            boxchart(yesPer, noPer);
            $(this).css('fill', color);
        });
    });

}