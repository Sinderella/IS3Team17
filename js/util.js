var graphNo = 0;

function changeInfo(pop, den, yes, no, male, female, elec, vote, reject, area, income, employ, epc) {
    $("#info_pop").text("Population: " + pop);
    $("#info_den").text("Density: " + den);
    $("#info_yes").text("Yes: " + yes);
    $("#info_no").text("No: " + no);
    $("#info_male").text("Male: " + male);
    $("#info_female").text("Female: " + female);
    $("#info_elec").text("Electorate: " + elec);
    $("#info_vote").text("Vote: " + vote);
    $("#info_rejected").text("Rejected: " + reject);
    $("#info_area").text("Area: " + area);
    $("#info_income").text("Income: " + income);
    $("#info_employ").text("Employment: " + employ);
    $("#info_expenditure").text("Expenditure per capita(£): " + epc);
}

function filter() {
    var value = $("#search_cities").val().toLowerCase();
    $("#cities").find("> option").each(function () {
        if ($(this).text().toLowerCase().search(value) != -1) {
            $(this).show();
        }
        else {
            $(this).hide();
        }
    });
}

function newGraph(){
    $('#newGraph' + graphNo).html('<img src="https://www.google.co.uk/logos/2012/birthday12-thp.png">');
    graphNo++;
    $("#graphArea").append('<li id="newGraph' + graphNo + '"><a href="#" data-reveal-id="addModal"><img src="img/plus.jpg"></a></li>');
    $('.close-reveal-modal').click();
}