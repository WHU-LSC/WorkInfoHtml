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
    ajaxRequest.open("GET", "http://localhost:8888/WorkInfoHtml/test.php", true);
    ajaxRequest.send(null);
}

function dataGet() {
    console.log("ohohohoho")
    request_name = 'lsc';
    request_gender = '1202';
    var send_info = {
        'name': request_name,
        'gender': request_gender
    };
    $.ajax({
        type: "post",
        crossDomain: true,
        url: "http://127.0.0.1:8888/api/test",
        data: JSON.stringify(send_info),
        dataType: "json",
        // processData: false,
        // "content-type": "application/json",
        // jsonpCallback: "callback",

        success: function(data) {
            console.log("yes!")
            console.log(data);

        },
        error: function(message) {
            console.log(message);
            console.log("error");
        }
    });
}



// new Vue({
//     el: '#sqlreturn',
//     data() {
//         return {
//             info: null
//         }
//     },
//     mounted() {
//         axios
//             .get('http://localhost:8080/api/test')
//             .then(response => (this.info = response))
//             .catch(function(error) { // 请求失败处理
//                 console.log(error);
//             });
//     }
// })