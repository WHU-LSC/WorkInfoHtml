

var totaldata;
var dataCountry;
var dataWuhan;
var dataSearch;
var decision = 1; //这个时方便界面切换的时候区分程序应该操作的内容，1表示全国实习信息，2表示武汉地区实习信息，3表示周末专题
//初始化的函数
function initial() {
    totaldata = localDataGet();
    dataWuhan = totaldata["wuhan"].message;
    dataCountry = totaldata["country"].message;
    // totaldata = dataGet();
}

//获取全部数据的ajax请求,本地数据接口
function dataGet() {
    // Header = "Access-Control-Allow-Origin: * ";
    request_name = 'lsc';
    request_gender = '1202';
    var send_info = {
        'name': request_name,
        'gender': request_gender
    };
    var totaldata;
    $.ajax({
        type: "post",
        crossDomain: true,
        url: "http://127.0.0.1:8080/api/test",
        data: JSON.stringify(send_info),
        dataType: "json",
        async: false,
        // processData: false,
        // "content-type": "application/json",
        // jsonpCallback: "callback",
        success: function(data) {
            console.log("dataget yes!")
            totaldata = data;
            // console.log(data);
        },
        error: function(message) {
            console.log(message);
            console.log("error");
        }
    });
    return totaldata;
}

//本地json数据的获取，json文件保存在github的仓库中
function localDataGet() {
    var totaldata;
    $.ajax({
        type: "get",
//         url: "http://127.0.0.1:8000/data",
        url: "https://whu-lsc.github.io/WorkInfoHtml/js/totaldata.json",
        dataType: "json",
        async: false,
        success: function(data) {
            console.log("dataget yes!")
            totaldata = data;
            // console.log(data);
        },
        error: function(message) {
            console.log(message);
            console.log("error");
        }
    });
    return totaldata;
}

//用于保存json文件
function saveJSON(data, filename) {
    if (!data) {
        alert('保存的数据为空');
        return;
    }
    if (!filename)
        filename = 'json.json'
    if (typeof data === 'object') {
        data = JSON.stringify(data, undefined, 4)
    }
    var blob = new Blob([data], { type: 'text/json' }),
        e = document.createEvent('MouseEvents'),
        a = document.createElement('a')
    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}

//当页面加载成功时启用这个函数，讲200条（或者是少于200条）全国实习的信息展示出来
function totalDataShowCountry() {
    decision = 1;
    dataWrite(dataCountry, 'dataInfo');
    var totalTime = [];
    for (var i = 0; i < dataCountry.length; i++) {
        totalTime[i] = String(dataCountry[i].upgrade_date);
    }
    updateSideLine(totalTime);
}

//当点击武汉界面的时候，展现出武汉地区的实习信息
function totalDataShowWuhan() {
    decision = 2;
    dataWrite(dataWuhan, 'dataInfo');
    var totalTime = [];
    for (var i = 0; i < dataWuhan.length; i++) {
        totalTime[i] = String(dataWuhan[i].upgrade_date);
    }
    updateSideLine(totalTime);
}
// 这个函数的存在实在武汉和全国地区的实习信息交替更换的时候能够爱心暗示出正确的信息
function changeDecision() {
    decision = 1;
}

// 用于实习信息的写入函数
function dataWrite(data, Id) {
    var country = document.getElementById(Id);
    //写入数据的同时更新时间的排序
    var oneInfo = '';
    // 输出全部信息
    var num = (200 > data.length ? data.length : 200);
    for (var i = 0; i < num; i++) {
        oneInfo += '<div class="infoDetial" id="'
        oneInfo += String(i)
        oneInfo += '"><a class="infoAddress" href="#">'
        oneInfo += String(data[i].base)
        oneInfo += '</a><a class="infoCompany" href="#">'
        oneInfo += String(data[i].company)
        oneInfo += '</a><a class="infoJob" href="#">'
        oneInfo += String(data[i].job)
        oneInfo += '</a><a class="infoTime" href="#">&emsp;'
        oneInfo += String(data[i].upgrade_date)
        oneInfo += '</a><a class="infoHerf" href="'
        oneInfo += String(data[i].url)
        oneInfo += '" target="_blank">&nbsp;详情链接</a></div>'
    }
    if (oneInfo == '') {
        country.innerHTML = '<p id="noInfo">信息为空.....</p>';
    } else {
        country.innerHTML = oneInfo;
    }

}
// 将写入信息的函数进行组件化
// function dataWrite(data, Id) {
//     var preShowDate = 200 > data.length ? data : data.slice(0,199)
//     ReactDOM.gender(preShowDate.map(item=><InfoItem {...item}></InfoItem>),document.getElementById(Id))
// }



//将周末专题的信息写入网页的函数
function WeedendDateLoad() {
    var weekendData = totaldata["weekend"].message;
    var weekend = document.getElementById('imgInfo');
    //写入数据的同时更新时间的排序
    var oneInfo = '';
    // 输出全部信息
    for (var i = 0; i < weekendData.length; i++) {
        oneInfo += ' <div class="img" id="special_'
        oneInfo += String(i)
        oneInfo += '"><div class="imgTitle">'
        oneInfo += String(weekendData[i].title)
        oneInfo += '</div><a id="weekendbox" target="_blank" href="'
        oneInfo += String(weekendData[i].herf)
        oneInfo += '"><img loading="lazy" src="'
        oneInfo += String(weekendData[i].herf)
        oneInfo += '" alt="图片文本描述"></a><div class="imgDesc">'
        oneInfo += String(weekendData[i].detail)
        oneInfo += '</div></div>'
    }
    weekend.innerHTML = oneInfo;
}
// 在开始的时候会更具json文件中的数据更新时间栏
function updateSideLine(totalTime) {
    var TimeSide = removeDuplicates(totalTime);
    var timeside = document.getElementById('dateDetail');
    var oneTime = '';
    for (var i = 0; i < TimeSide.length; i++) {
        oneTime += '<a id="dateContent" href="#';
        oneTime += '" onclick="searchByTime(this.innerHTML);return false;">';
        oneTime += TimeSide[i];
        oneTime += '</a>';
    }
    timeside.innerHTML = oneTime;
}
//点击左边sideline的时间出发这个函数，按照时间来筛选实习信息
function searchByTime(time) {
    // console.log(time);
    if (decision === 1) {
        var shixiByTime = [];
        var k = 0;
        for (var j = 0; j < dataCountry.length; j++) {
            if (dataCountry[j].upgrade_date === time) {
                shixiByTime[k] = dataCountry[j];
                k++;
            }
        }
    } else if (decision === 2) {
        var shixiByTime = [];
        var k = 0;
        for (var j = 0; j < dataWuhan.length; j++) {
            if (dataWuhan[j].upgrade_date === time) {
                shixiByTime[k] = dataWuhan[j];
                k++;
            }
        }
    }

    // console.log(shixiByTime);
    // console.log(dataCountry);
    dataWrite(shixiByTime, 'dataInfo');
}
//去除字符串的重复
function removeDuplicates(arr) {
    var temp = {},
        r = [];
    for (var i in arr)
        temp[arr[i]] = true;
    for (var k in temp)
        r.push(k);
    return r;
}
//将熟悉信息的数据按照时间的降序排列
//由于这个功能在读出数据时已经做到，所以可能会在检索中使用到
function SrotShixiInfo(data) {
    var sortData;
    return sortData;
}

// 用于搜索组件的功能实现
function SearchData() {
    dataSearch = []
        // searchtext = String(searchtext)
    var x = document.getElementById("searchinput") //获取输入框元素
    var searchtext = x.value;
    console.log(searchtext)
    if (decision == 3) {
        // 周末专题的搜索
        console.log("周末专题的搜索")
    } else {
        //实习信息的搜索
        var k = 0;
        // for (var i = 0; i < dataCountry.length; i++) {
        //     if (searchtext.indexOf(dataCountry[i].base) != -1 || searchtext.indexOf(dataCountry[i].company) != -1 || searchtext.indexOf(dataCountry[i].job) != -1 || searchtext.indexOf(dataCountry[i].upgrade_date != -1)) {
        //         dataSearch[k] = dataCountry[i];
        //         k++;
        //     }
        // }
        // for (var i = 0; i < dataWuhan.length; i++) {
        //     if (searchtext.indexOf(dataWuhan[i].base) != -1 || searchtext.indexOf(dataWuhan[i].company) != -1 || searchtext.indexOf(dataWuhan[i].job) != -1 || searchtext.indexOf(dataWuhan[i].upgrade_date != -1)) {
        //         dataSearch[k] = dataCountry[i];
        //         k++;
        //     }
        // }
        for (var i = 0; i < dataCountry.length; i++) {
            if ((dataCountry[i].base).match(searchtext) || (dataCountry[i].company).match(searchtext) || (dataCountry[i].job).match(searchtext)) {
                dataSearch[k] = dataCountry[i];
                console.log((dataCountry[i].base).match(searchtext) || (dataCountry[i].company).match(searchtext) || (dataCountry[i].job).match(searchtext))
                k++;
            }
        }
        for (var i = 0; i < dataWuhan.length; i++) {
            if ((dataWuhan[i].base).match(searchtext) || (dataWuhan[i].company).match(searchtext) || (dataWuhan[i].job).match(searchtext)) {
                console.log((dataWuhan[i].base).match(searchtext) || (dataWuhan[i].company).match(searchtext) || (dataWuhan[i].job).match(searchtext))
                dataSearch[k] = dataCountry[i];
                k++;
            }
        }
    }
    console.log(dataSearch)
    dataWrite(dataSearch, 'dataInfo');
}

// 显示网页的div组件
function ShowDiv(id) {
    var traget = document.getElementById(id);
    traget.style.display = "";
}
// 不显示网页的div组件
function notShowDiv(id) {
    var traget = document.getElementById(id);
    traget.style.display = "none";
}
// 增加周末专题的按钮控制函数
function addImg() {
    alert("正在开发！敬请期待！")
}
//对于搜索框回车事件的监听
$('#coding').bind('keypress', function(event) {
    if (event.keyCode == "13") {
        console.log("jahah ")
    }
});

// 下面是在获取json文件时做的一些尝试，在readme文件中也有体现

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
//         console.log(ajaxRequest.readyState)
//         if (ajaxRequest.readyState == 4) {
//             console.log("loading....")
//             if (ajaxRequest.status == 200) {
//                 var ajaxDisplay = document.getElementById('sqlreturn');
//                 ajaxDisplay.innerHTML = ajaxRequest.responseText;
//                 console.log(ajaxRequest.responseText)
//             } else {
//                 console.log(ajaxRequest.status)
//                 console.log("error")
//             }
//         }
//     }
//     ajaxRequest.open("GET", "http://localhost:8888/WorkInfoHtml/test.php", true);
//     ajaxRequest.send(null);
// }


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

