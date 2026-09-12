const teddyScreen = document.querySelector(".teddy-screen");
const nextBtn = document.querySelector(".next-btn");
const birthdayScreen = document.querySelector(".birthday-screen");
const questionScreen = document.querySelector(".question-screen");
const polaroidScreen = document.querySelector(".polaroid-screen");
const nextBtn2 = document.querySelector(".next-btn-2");

nextBtn.addEventListener("click", function(){
    birthdayScreen.classList.add("slide-out");
    setTimeout(function(){
        birthdayScreen.style.display = "none";
        questionScreen.style.display = "flex";
        questionScreen.classList.add("slide-in");
    },800);
});

const questionText = document.querySelector("#questionText");
const yesBtn = document.querySelector("#yesBtn");
const noBtn = document.querySelector("#noBtn");

const questions = [
    "Are you sure? 🥺",

    "Really? 😭",

    "Come on... 💖",

    "Last chance! 🎀",

    "Okay okay... 😭"
];
let noClicks = 0;

noBtn.addEventListener("click", function(){
    if(noClicks < questions.length){
        questionText.textContent = questions[noClicks];
        noClicks++;
        yesBtn.style.transform = `scale(${1 + noClicks * 0.2})`;
    }
});

yesBtn.addEventListener("click", function(){
    questionScreen.classList.add("slide-out");
    setTimeout(function(){
        questionScreen.style.display = "none";
        teddyScreen.style.display = "flex";
        teddyScreen.classList.add("slide-in");
    },800);
});

nextBtn2.addEventListener("click", function(){
    teddyScreen.classList.add("slide-out");

    setTimeout(function(){
        teddyScreen.style.display = "none";
        polaroidScreen.style.display = "flex";
        polaroidScreen.classList.add("slide-in");
    }, 800);
});
const photoInput = document.querySelector(".photo-input");
const photoArea = document.querySelector(".photo-area");

photoInput.addEventListener("change", function() {
    const file = photoInput.files[0];

    if (file) {
        const image = document.createElement("img");
        image.src = URL.createObjectURL(file);

        image.style.width = "100%";
        image.style.height = "100%";
        image.style.objectFit = "cover";

        photoArea.innerHTML = "";
        photoArea.appendChild(image);
    }
});