document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    var menu = new InformationMenu();
    $.support.cors = true;
    menu.start();
  }
}