"use strict";

var navBar = document.querySelector('.navbar');
var burgerBtn = document.querySelector('.burger');
var listItems = document.querySelectorAll('.navbar li');


function showNav() {
//    navBar.hidden = !navBar.hidden;
//    if(navBar.style.opacity == "1") {
//        navBar.style.opacity = 0;
//    }else{
//        navBar.style.opacity = 1;
//    }
    var i = 0,
        arrLength = listItems.length;
    for (i = 0; i < arrLength; i += 1) {
//        console.log(listItems[i]);
        
        if (listItems[i].style.opacity === "1") {
            
            listItems[i].style.transitionDelay = +("." + (6 - i)) / 2 + "s";
            listItems[i].style.opacity = 0;
            listItems[i].style.transform = "translateX(0)";
        } else {
            listItems[i].style.transitionDelay = +("." + i) / 2 + "s";
            listItems[i].style.opacity = 1;
            listItems[i].style.transform = "translateX(100%)";
        }
    }
    
}

burgerBtn.addEventListener('click', showNav);


