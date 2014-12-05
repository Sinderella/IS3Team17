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

function filterList() {
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

function newGraph() {
    var selected = $('#jstree').jstree("get_checked", null, true);
    var tmpIndex = selected.indexOf("j1_4");
    if (tmpIndex > -1) {
        selected.splice(tmpIndex, 1);
    }
    tmpIndex = selected.indexOf("j1_1");
    if (tmpIndex > -1) {
        selected.splice(tmpIndex, 1);
    }
    if (selected.length < 1 || selected.length > 3) {
        $("#popup-title").html('Choose datafields (max 3) <span class="alert label">maximum is 3</span>');
    } else {
        //$('#newGraph' + graphNo).html('<img src="https://www.google.co.uk/logos/2012/birthday12-thp.png">');
        $('#newGraph' + graphNo).empty();
        $('#newGraph' + graphNo).append("<button onclick=\"deleteGraph(" + graphNo + ")\" class='buttonhide' style=\"padding: 0px; width: 60px; height: 30px; margin-bottom: 0px;\"><p> Remove </p></button>");
        if (selected.length == 1){
            barchart("#newGraph" + graphNo);
        }else if (selected.length == 2){
            scatterplot("#newGraph" + graphNo, selected, false);
        }else{
            scatterplot("#newGraph" + graphNo, selected, true);
        }

        graphNo++;
        $("#graphArea").append('<li id="newGraph' + graphNo + '"><a href="#" data-reveal-id="addModal"><img src="img/plus.jpg"></a></li>');
        $('.close-reveal-modal').click();
        $('#jstree').jstree("uncheck_all");
    }
}

function deleteGraph(delgraphNo) {
    $('#newGraph' + delgraphNo).remove();
    graphNo--;
    var i = 0;
    var lis = $('#graphArea').find("li");
    for (i = 0; i < lis.length; i++) {
        $(lis[i]).attr('id', 'newGraph' + i);
    }
}