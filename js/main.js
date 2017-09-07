console.log('HELLO WORLD');

var colors = ["rgba(244, 208, 111, 1)", "rgba(255, 136, 17, 1)", "rgba(157, 217, 210, 1)", "rgba(93, 211, 158, 1)"];

var blocks = document.querySelectorAll('.item');
console.log(blocks);

function randomNumber (n) {
    return Math.floor(Math.random() * n);
}

blocks.forEach(function(item) {
    var random = randomNumber(4);
    item.style.background = "url('../img/ROTOR.svg'), linear-gradient("+ colors[random] + "," + colors[random] + ")";
});
