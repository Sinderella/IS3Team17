function map() {
	
	//***********************************
		// This code should be somewhere that every component can use it
		// start from 0-10 % at idx 0 to 90-100 % at the last idx
		var YES_COLORS = [ '#e5f0ff', '#cce0ff', '#b2d1ff', '#99c2ff', '#80b2ff', '#66a3ff', '#4c94ff', '#3385ff', '#1a75ff', '#0066ff' ];
		var NO_COLORS = [ '#f7dfdf', '#f7c6c6', '#f7adad', '#f79494',  '#f77c7c', '#f76363' ,'#f74a4a', '#f73131', '#f71919', '#f70000' ];
		var YES_TYPE = 'YESTYPE';
		var NO_TYPE = 'NOTYPE';

		//***********************************
		// voteType specifies the selected value of the radio button groups yes/no
		var voteType = YES_TYPE;

		function getColorByVote(voteType, votePercentage) {
			var voteLevel = Math.floor(votePercentage * 1.0 / 10);
			if (voteType == YES_TYPE) {
				return YES_COLORS[voteLevel];
			} else {
				return NO_COLORS[voteLevel];
			}
		}

		var width = 900,
		height = 960;

		var projection = d3.geo.albers()
		.center([0, 56.5])
		.rotate([2, 0])
		.scale(4900)
		.translate([width/2, height/2.7]);

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
		})

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
					if( voteType == YES_TYPE ) {
						return getColorByVote(voteType, d.properties.yes * 1.0 / d.properties.numberOfVotes * 100 );
					}
					else
						return getColorByVote(voteType, d.properties.no * 1.0 / d.properties.numberOfVotes * 100 );
				} else {
					return "#ECECEC";
				}
			})
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide);;

			svg.append("path")
			.datum(topojson.mesh(lad, lad.objects.lad, function(a, b) {
				return a !== b; 
			}))
			.attr("d", path)
			.attr("class", "constituency-boundary");
		});

		$("#mapsvg").height(height-350);
	}