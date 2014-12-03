	//***********************************
	// This code should be somewhere that every component can use it
	// start from 0-10 % at idx 0 to 90-100 % at the last idx
	var YES_COLORS = [ '#e5f0ff', '#cce0ff', '#b2d1ff', '#99c2ff', '#80b2ff', '#66a3ff', '#4c94ff', '#3385ff', '#1a75ff', '#0066ff' ];
	var NO_COLORS = [ '#f7dfdf', '#f7c6c6', '#f7adad', '#f79494',  '#f77c7c', '#f76363' ,'#f74a4a', '#f73131', '#f71919', '#f70000' ];
	var YES_TYPE = 'YESTYPE';
	var NO_TYPE = 'NOTYPE';

	function getColorByVote(voteType, votePercentage) {
		var voteLevel = Math.floor(votePercentage * 1.0 / 10);
		if (voteType == YES_TYPE) {
			return YES_COLORS[voteLevel];
		} else {
			return NO_COLORS[voteLevel];
		}
	}