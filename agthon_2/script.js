let colorArr = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff"];
let count = 0;

function changeColor() {
    let p = document.getElementsByTagName("th");
    p[12].style.backgroundColor = colorArr[count];
    p[18].style.backgroundColor = colorArr[count];
    p[24].style.backgroundColor = colorArr[count];
    count++;
}

function reset() {
    let p = document.getElementsByTagName("th");
    p[12].style.backgroundColor = "white";
    p[18].style.backgroundColor = "white";
    p[24].style.backgroundColor = "white";
}