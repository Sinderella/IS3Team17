//***********************************
// This code should be somewhere that every component can use it
// start from 0-10 % at idx 0 to 90-100 % at the last idx
var YES_COLORS = ['#BDD4F8', '#A1C3F7', '#82B0F6', '#6FA5FA', '#478AF1', '#1762D5', '#004CC1', '#003C9A', '#002C71', '#001C48'];
var NO_COLORS = ['#f8c5c6', '#f8a1a2', '#ff8384', '#ff6a6b', '#f93b3d', '#d50003', '#bf0002', '#940002', '#760002', '#570001'];
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