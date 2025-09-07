function darkMode() {
    document.getElementById('mainPage').style = "background-color: black; color: white;";
    document.getElementById('headerId').style = "background-color: rgb(65, 65, 65); color: white;";
    document.getElementById('mode').innerHTML = "Dark Mode";

}
function lightMode() {
    document.getElementById('mainPage').style = "background-color: white; color: black;";
    document.getElementById('headerId').style = "background-color: lightgrey; color: black;";
    document.getElementById('mode').innerHTML = "Light Mode";

}
function defaultMode() {
    document.getElementById('mainPage').style = "background-color: #d3f2fa; color: black;";
    document.getElementById('headerId').style = "background-color: rgb(0, 100, 100); color: black;";
    document.getElementById('mode').innerHTML = "Default Mode";

}
