let week = ["월", "화", "수", "목", "금"];
let colors = ["#167288", "#8cdaec", "#b45248", "#d48c84", "#a89a49", "#d6cfa2", "#3cb464", "#9bddb1", "#643c6a", "#836394"];
function getRandomColor() {
    let tmpSubjectArrValue = JSON.parse(localStorage.getItem("tmpSubjectArrValue")) || [];

    let index = new Array();
    for (let i = 0; i < tmpSubjectArrValue.length; i++) {
        if (colors.includes(tmpSubjectArrValue[i].color)) {
            index.push(tmpSubjectArrValue[i].color)
        }
    }

    const set2 = new Set(index);
    let differs = colors.filter(value => !set2.has(value));
    return differs[0];
}

function changeColor() {
    let p = document.getElementById("mytable").getElementsByTagName("td");
    let tmpSubjectArrValue = JSON.parse(localStorage.getItem("tmpSubjectArrValue")) || [];
    for (let i = 0; i < tmpSubjectArrValue.length; i++) {
        for (let j = 0; j < tmpSubjectArrValue[i].value.length; j++) {
            for (let k = 0; k < tmpSubjectArrValue[i].value[j].length; k++) {
                p[tmpSubjectArrValue[i].value[j][k]].style.backgroundColor = tmpSubjectArrValue[i].color;
            }
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
        for (let j = 0; j < tmpSubjectArrValue[index].value[i].length; j++) {
            p[tmpSubjectArrValue[index].value[i][j]].style.backgroundColor = "";
        }
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
    let resultTimes = new Array();

    for (let i = 0; i < timestr.length; i++) {
        let t = timestr[i].substring(0, timestr[i].indexOf("("));

        let thistime = t.split(",");
        let counter = 0;
        let tmparr = new Array();

        for (let j = 0; j < thistime.length; j++) {
            if (week.includes(thistime[j][0])) {
                counter++;
                if (counter == 2) {
                    for (let k = 0; k < times.length; k++) {
                        tmparr.push(parseInt(days[0] + (times[k] - 1) * 5));
                    }
                    resultTimes.push(tmparr);
                    counter = 1;
                    times.length = 0;
                    days.length = 0;
                }
                days.push(week.indexOf(thistime[j][0]));
                times.push(thistime[j].substr(1, thistime[j].length - 1));
                continue;
            } else if (thistime[j].includes("셀")) {
                tmparr.push(140);
                break;
            }
            times.push(thistime[j]);
        }

        if (times.length > 0) {
            for (let k = 0; k < times.length; k++) {
                tmparr.push(days[0] + (times[k] - 1) * 5);
            }
            resultTimes.push(tmparr);
            counter = 1;
            times.length = 0;
            days.length = 0;
        }
    }


    let subject = { subYear: year, num: subjectNum, prof: professor, name: subjectName, value: resultTimes, valuestr: daystr, color: getRandomColor() };

    // 값이 배열에 포함되어 있는지 확인
    let isTimeConflict = tmpSubjectArrValue.some(item => {
        return item.value.some(timeArray => {
            return timeArray.some(time => {
                return resultTimes.flat().includes(time);
            });
        });
    });

    let isNameConflict = tmpSubjectArrValue.some(item => {
        return item.name.includes(subjectName)
    })
    if (isNameConflict) {
        alert("이미 추가된 과목입니다.");
    } else if (isTimeConflict) {
        alert("강의 시간이 겹칩니다.")
    } else {
        tmpSubjectArrValue.push(subject);
        localStorage.setItem("tmpSubjectArrValue", JSON.stringify(tmpSubjectArrValue));
        alert("장바구니에 정상적으로 추가되었습니다. 확인을 위해 '장바구니 새로고침' 버튼을 눌러주세요");
        updateCartTable(); // 실시간 업데이트 호출
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
        buttonCell.innerHTML = '<button onclick="' + "resetThis(this);" + '">제거</button>'

        row.style.backgroundColor = subject.color;
    });
}