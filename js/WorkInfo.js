// function ajaxFunction() {
//     var ajaxRequest; //the variable that makes Ajax possile!
//     try {
//         //Opera 8.0+, firefox , safari
//         ajaxRequest = new XMLHttpRequest();
//     } catch (e) {
//         //Internet Explorer Browser
//         try {
//             ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
//         } catch (e) {

//             try {
//                 ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
//             } catch (e) {
//                 // Something went wrong
//                 alert("Your browser broke!");
//                 return false;
//             }
//         }
//     }

//     ajaxRequest.onreadystatechange = function() {
//         if (ajaxRequest.readyState == 4) {
//             var ajaxDisplay = document.getElementById('sqlreturn');
//             ajaxDisplay.innerHTML = ajaxRequest.responseText;
//         }
//     }
//     ajaxRequest.open("GET", "../php/SqlLink.php", true);
//     ajaxRequest.send(null);
// }

function sen() {
    console.log("ohohohoho")
    $.ajax({
        type: "GET",
        url: "php/SqlLink.php",
        dataType: "json",
        success: function(data) {
            console.log(data);
        },
        error: function(message) {}
    });
}