let colorArr = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff"];
let count = 0;

function changeColor() {
    let p = document.getElementsByTagName("th");
    let tmpSubjectArrValue = JSON.parse(localStorage.getItem("tmpSubjectArrValue")) || [];

    for (let i = 0; i < tmpSubjectArrValue.length; i++) {
        p[tmpSubjectArrValue[i].value].style.backgroundColor = tmpSubjectArrValue[i].color;
    }
}

function reset() {
    let p = document.getElementsByTagName("th");
    for (let i = 0; i < p.length; i++) {
        p[i].style.backgroundColor = "";
    }
    localStorage.clear()
    alert("장바구니가 초기화되었습니다.");

}

function tmpSubject(e) {
    let tmpSubjectArrValue = JSON.parse(localStorage.getItem("tmpSubjectArrValue")) || [];
    let subjectName = e.parentNode.previousElementSibling.innerText;
    let value = parseInt(e.value);
    let timeClass = e.className;
    let subject = { name: subjectName, value: value, time: timeClass, color: colorArr[count] };

    // 값이 배열에 포함되어 있는지 확인
    if (!tmpSubjectArrValue.some(item => item.value === value)) {
        tmpSubjectArrValue.push(subject);
        count++;
        localStorage.setItem("tmpSubjectArrValue", JSON.stringify(tmpSubjectArrValue));
        alert("장바구니에 정상적으로 추가되었습니다. 확인을 위해 '장바구니 새로고침' 버튼을 눌러주세요");
        updateCartTable(); // 실시간 업데이트 호출
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

        nameCell.textContent = subject.name;
        timeCell.textContent = subject.time + " (" + subject.value + ")";

        row.appendChild(nameCell);
        row.appendChild(timeCell);
        cartTableBody.appendChild(row);

        row.style.backgroundColor = subject.color;
    });
}