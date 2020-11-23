function ajaxFunction() {
    var ajaxRequest; //the variable that makes Ajax possile!
    try {
        //Opera 8.0+, firefox , safari
        ajaxRequest = new XMLHttpRequest();
    } catch (e) {
        //Internet Explorer Browser
        try {
            ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {

            try {
                ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                // Something went wrong
                alert("Your browser broke!");
                return false;
            }
        }
    }

    ajaxRequest.onreadystatechange = function() {
        console.log(ajaxRequest.readyState)
        if (ajaxRequest.readyState == 4) {
            console.log("loading....")
            if (ajaxRequest.status == 200) {
                var ajaxDisplay = document.getElementById('sqlreturn');
                ajaxDisplay.innerHTML = ajaxRequest.responseText;
                console.log(ajaxRequest.responseText)
            } else {
                console.log(ajaxRequest.status)
                console.log("error")
            }
        }
    }
    ajaxRequest.open("GET", "test.php", true);
    ajaxRequest.send(null);
}

function dataGet() {
    console.log("ohohohoho")
    $.ajax({
        type: "GET",
        url: "SqlLink.php",
        dataType: "json",
        "content-type": "application/json",
        success: function(data) {
            console.log(data);
        },
        error: function(message) {
            console.log(message);
            console.log("error");
        }
    });
}