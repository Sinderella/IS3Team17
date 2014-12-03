function map(voteType) {

	var width = 800,
	height = 840;

	var projection = d3.geo.albers()
	.center([0, 56.5])
	.rotate([2, 0])
	.scale(4450)
	.translate([width/1.7, height/2.5]);

	var path = d3.geo.path()
	.projection(projection);

	var tip = d3.tip()
	.attr('class', 'd3-tip')
	.offset([-10, 0])
	.html(function(d) {
		return d.properties.LAD13NM + "<br>" + 
		"pop: " + d.properties.estimatedPopulation + "<br>"+
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

	d3.json("topo_lad.json", function(error, lad) {
		if (error) return console.error(error);
		
		svg.selectAll(".lad")
		.data(topojson.feature(lad, lad.objects.lad).features)
		.enter().append("path")
		.attr("class", "constituency")
		.attr("d", path)
		.style("fill", function(d) {
			if( d.properties.isSelected ) {
				if( voteType == YES_TYPE )
					return getColorByVote(voteType, d.properties.yes * 1.0 / d.properties.numberOfVotes * 100 );
				else if( voteType == NO_TYPE )
					return getColorByVote(voteType, d.properties.no * 1.0 / d.properties.numberOfVotes * 100 );
				else
					return "#EB974E";
			} else {
				return "#ECECEC";
			}
		})
		.on('mouseover', tip.show)
		.on('mouseout', tip.hide);

		svg.append("path")
		.datum(topojson.mesh(lad, lad.objects.lad, function(a, b) {
			return a !== b; 
		}))
		.attr("d", path)
		.attr("class", "constituency-boundary");
	});

	$("#mapsvg").height(height-350);
}