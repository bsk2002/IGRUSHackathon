
function categoryChange(e) {
    var good_a = ["학번을 선택해주세요", "22학번", "23학번", "24학번"];
    var good_b = ["학번을 선택해주세요", "22학번", "23학번", "24학번"];
    var good_c = ["학번을 선택해주세요", "22학번", "23학번", "24학번"];
    var target = document.getElementById("good");


    if (e.value == "a") var d = good_a;
    else if (e.value == "b") var d = good_b;
    else if (e.value == "c") var d = good_c;


    target.options.length = 0;

    for (x in d) {
        var opt = document.createElement("option");
        opt.value = d[x];
        opt.innerHTML = d[x];
        target.appendChild(opt);
    }
}
function gotoSite() {
    var temp = document.getElementById("bad").value;
    var langSelect = document.getElementById("good").value;

    if (temp == "a" && langSelect == "23학번") {
        var openNewWindow = window.open("about:blank" ,target="_blank");
        openNewWindow.location.href ="gridtest2.html";
    }
    else if (temp == "a" && langSelect == "22학번") {
        var openNewWindow = window.open("about:blank" ,target="_blank");
        openNewWindow.location.href = "https://cse.inha.ac.kr/cse/14996/subview.do";
    }
    else if (temp == "a" && langSelect == "24학번") {
        var openNewWindow = window.open("about:blank" ,target="_blank");
        openNewWindow.location.href = "gridtest.html";
    }
    else if (temp == "b" && langSelect == "24학번") {
        location.href = "https://cse.inha.ac.kr/cse/14996/subview.do";
    }
    else if (temp == "b" && langSelect == "23학번") {
        location.href = "https://cse.inha.ac.kr/cse/14996/subview.do";
    }
    else if (temp == "b" && langSelect == "22학번") {
        location.href = "https://cse.inha.ac.kr/cse/14996/subview.do";
    }
    else if (temp == "c" && langSelect == "24학번") {
        location.href = "https://ee.inha.ac.kr/ee/12748/subview.do";
    }
    else if (temp == "c" && langSelect == "23학번") {
        location.href = "https://ee.inha.ac.kr/ee/12748/subview.do";
    }
    else if (temp == "c" && langSelect == "22학번") {
        location.href = "https://ee.inha.ac.kr/ee/11154/subview.do";
    }
}