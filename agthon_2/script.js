let colorArr = ["#167288", "#8cdaec", "#b45248", "#d48c84", "#a89a49", "#d6cfa2", "#3cb464", "#9bddb1", "#643c6a", "#836394"];
let week = ["월", "화", "수", "목", "금"];
let count = 0;

function changeColor() {
    let p = document.getElementById("mytable").getElementsByTagName("td");
    let tmpSubjectArrValue = JSON.parse(localStorage.getItem("tmpSubjectArrValue")) || [];
    for (let i = 0; i < tmpSubjectArrValue.length; i++) {
        for (let j = 0; j < tmpSubjectArrValue[i].value.length; j++) {
            p[tmpSubjectArrValue[i].value[j]].style.backgroundColor = tmpSubjectArrValue[i].color;
        }
    }
}

function reset() {
    let p = document.getElementById("mytable").getElementsByTagName("td");
    for (let i = 0; i < p.length; i++) {
        p[i].style.backgroundColor = "";
    }
    localStorage.clear()
    alert("장바구니가 초기화되었습니다.");

}

function resetThis(e) {
    let p = document.getElementById("mytable").getElementsByTagName("td");

    let tmpSubjectArrValue = JSON.parse(localStorage.getItem("tmpSubjectArrValue")) || [];
    let tmpElement = e.parentNode.parentNode;
    let nameThis = tmpElement.getElementsByTagName("td")[2].innerText;
    let index = 0;
    while (true) {
        if (tmpSubjectArrValue[index].name === nameThis) {
            break;
        }
        index++;
    }
    for (let i = 0; i < tmpSubjectArrValue[index].value.length; i++) {
        p[tmpSubjectArrValue[index].value[i]].style.backgroundColor = "";
    }

    let removeThis = e.parentNode.parentNode;
    let removeParent = removeThis.parentNode;
    removeParent.removeChild(removeThis);
    tmpSubjectArrValue.splice(index, 1);
    localStorage.setItem("tmpSubjectArrValue", JSON.stringify(tmpSubjectArrValue));
}

function tmpSubject(e) {
    let tmpSubjectArrValue = JSON.parse(localStorage.getItem("tmpSubjectArrValue")) || [];
    let pNode = e.parentNode.parentNode;
    let childList = pNode.getElementsByTagName("td");

    let year = childList[0].innerText;
    let subjectNum = childList[1].innerText;
    let professor = childList[5].innerText;
    let subjectName = childList[2].getElementsByTagName("a")[0].innerText;
    let daystr = childList[4].innerText;
    let times = new Array();
    let days = new Array();
    let timestr = daystr.split("/");
    for (let i = 0; i < timestr.length; i++) {
        let tmp = 0;
        for (let j = 0; j < 5; j++) {
            if (timestr[i][0] == week[j]) {
                tmp = j;
                break;
            }
        }
        timestr[i] = timestr[i].substring(1, timestr[i].indexOf('('));
        tmpstr = timestr[i].split(",");
        let tmptimes = new Array;
        for (let j = 0; j < tmpstr.length; j++) {
            tmptimes.push(tmpstr[j]);
        }
        times.push(tmptimes);
        days.push(tmp);
    }

    let resultTimes = new Array();

    for (let i = 0; i < times.length; i++) {
        for (let j = 0; j < times[i].length; j++) {
            resultTimes.push(days[i] + (times[i][j] - 1) * 5);
        }
    }

    let subject = { subYear: year, num: subjectNum, prof: professor, name: subjectName, value: resultTimes, valuestr: daystr, color: colorArr[++count % 10] };

    // 값이 배열에 포함되어 있는지 확인
    let isTimeConflict = tmpSubjectArrValue.some(item => {
        if (Array.isArray(item.value)) {
            return item.value.some(time => resultTimes.includes(time));
        }
        return false;
    });

    let isNameConflict = tmpSubjectArrValue.some(item => {
        return item.name.includes(subjectName)
    })
    if (!isTimeConflict) {
        tmpSubjectArrValue.push(subject);
        localStorage.setItem("tmpSubjectArrValue", JSON.stringify(tmpSubjectArrValue));
        alert("장바구니에 정상적으로 추가되었습니다. 확인을 위해 '장바구니 새로고침' 버튼을 눌러주세요");
        updateCartTable(); // 실시간 업데이트 호출
    } else if (!isNameConflict) {
        {
            alert("강의 시간이 겹칩니다.")
        }
    } else {
        alert("이미 추가된 과목입니다.");
    }
}

// displayCartSubjects 함수를 외부에서 호출 가능하도록 추가
function updateCartTable() {
    if (typeof displayCartSubjects === "function") {
        displayCartSubjects();
    }

}

function displayCartSubjects() {
    let tmpSubjectArrValue = JSON.parse(localStorage.getItem("tmpSubjectArrValue")) || [];
    let cartTableBody = document.getElementById("cartTableBody");
    cartTableBody.innerHTML = "";

    tmpSubjectArrValue.forEach(subject => {
        let row = document.createElement("tr");
        let yearCell = document.createElement("td");
        let numCell = document.createElement("td")
        let profCell = document.createElement("td");
        let nameCell = document.createElement("td");
        let timeCell = document.createElement("td");
        let buttonCell = document.createElement("td");

        yearCell.textContent = subject.subYear;
        numCell.textContent = subject.num;
        profCell.textContent = subject.prof;
        nameCell.textContent = subject.name;
        timeCell.textContent = subject.valuestr;

        row.appendChild(yearCell);
        row.appendChild(numCell);
        row.appendChild(nameCell);
        row.appendChild(profCell);
        row.appendChild(timeCell);
        row.appendChild(buttonCell);
        cartTableBody.appendChild(row);
        buttonCell.innerHTML = "<button onclick=" + "resetThis(this);" + ">제거</button>"

        row.style.backgroundColor = subject.color;
    });
}