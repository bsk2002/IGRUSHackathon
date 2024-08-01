let colorArr = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff"];
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
    let nameThis = tmpElement.firstElementChild.innerText;
    let index = 0;
    while (true) {
        if (tmpSubjectArrValue[index].name === nameThis) {
            break;
        }
        index++;
    }
    alert(tmpSubjectArrValue[index].value)
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
    let subjectName = e.parentNode.previousElementSibling.innerText;
    let times = JSON.parse(e.getAttribute("data-times"))
    let subject = { name: subjectName, value: times, color: colorArr[count] };

    // 값이 배열에 포함되어 있는지 확인
    let isTimeConflict = tmpSubjectArrValue.some(item => {
        return item.value.some(time => times.includes(time));
    });

    let isNameConflict = tmpSubjectArrValue.some(item => {
        return item.name.includes(subjectName)
    })
    if (!isTimeConflict) {
        tmpSubjectArrValue.push(subject);
        count++;
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
        let nameCell = document.createElement("td");
        let timeCell = document.createElement("td");
        let buttonCell = document.createElement("td");

        nameCell.textContent = subject.name;
        timeCell.textContent = subject.value;

        row.appendChild(nameCell);
        row.appendChild(timeCell);
        row.appendChild(buttonCell);
        cartTableBody.appendChild(row);
        buttonCell.innerHTML = "<button onclick=" + "resetThis(this);" + ">제거</button>"

        row.style.backgroundColor = subject.color;
    });
}