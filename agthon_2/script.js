function changeColor() {
    let p = document.getElementsByTagName("th");
    p[12].style.backgroundColor = "blue";
    p[18].style.backgroundColor = "blue";
    p[24].style.backgroundColor = "blue";
}
function reset() {
    let p = document.getElementsByTagName("th");
    p[12].style.backgroundColor = "white";
    p[18].style.backgroundColor = "white";
    p[24].style.backgroundColor = "white";
}