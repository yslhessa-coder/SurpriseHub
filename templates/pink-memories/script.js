const SUPABASE_URL = "https://ivnzaistzrmglibhrvth.supabase.co";
const SUPABASE_KEY = "sb_publishable_iLFcCKI5kvs4kLWWOryrJg_FLzmqEKY";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Supabase connected!");


// ==============================
// SCREEN ELEMENTS
// ==============================

const teddyScreen = document.querySelector(".teddy-screen");
const nextBtn = document.querySelector(".next-btn");
const birthdayScreen = document.querySelector(".birthday-screen");
const questionScreen = document.querySelector(".question-screen");
const polaroidScreen = document.querySelector(".polaroid-screen");
const nextBtn2 = document.querySelector(".next-btn-2");
const endingScreen = document.querySelector(".ending-screen");
const keepsakeScreen = document.querySelector(".keepsake-screen");
const endingNextBtn = document.querySelector(".ending-next-btn");
const nextBtn3 = document.querySelector(".next-btn-3");


// ==============================
// POLAROID → ENDING
// ==============================

if (nextBtn3) {
    nextBtn3.addEventListener("click", function () {

        polaroidScreen.style.display = "none";

        endingScreen.style.display = "flex";
        endingScreen.style.visibility = "visible";
        endingScreen.style.opacity = "1";
        endingScreen.style.transform = "translateX(0)";
        endingScreen.style.animation = "none";
        endingScreen.style.zIndex = "9999";

        const smallText = document.querySelector(".ending-small");
        const mainText = document.querySelector(".ending-content h1");
        const messageText = document.querySelector(".ending-message");
        const signatureText = document.querySelector(".ending-signature");

        if (smallText) {
            typeText(smallText, 45, function () {

                if (mainText) {
                    typeText(mainText, 45, function () {

                        if (messageText) {
                            typeText(messageText, 40, function () {

                                if (signatureText) {
                                    typeText(signatureText, 40);
                                }

                            });
                        }

                    });
                }

            });
        }

    });
}


// ==============================
// BIRTHDAY → QUESTION
// ==============================

if (nextBtn) {
    nextBtn.addEventListener("click", function () {

        birthdayScreen.classList.add("slide-out");

        setTimeout(function () {

            birthdayScreen.style.display = "none";

            questionScreen.style.display = "flex";
            questionScreen.classList.add("slide-in");

        }, 800);

    });
}


// ==============================
// QUESTION SCREEN
// ==============================

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

if (noBtn) {
    noBtn.addEventListener("click", function () {

        if (noClicks < questions.length) {

            questionText.textContent = questions[noClicks];

            noClicks++;

            yesBtn.style.transform =
                `scale(${1 + noClicks * 0.2})`;

        }

    });
}


if (yesBtn) {
    yesBtn.addEventListener("click", function () {

        questionScreen.classList.add("slide-out");

        setTimeout(function () {

            questionScreen.style.display = "none";

            teddyScreen.style.display = "flex";
            teddyScreen.classList.add("slide-in");

        }, 800);

    });
}


// ==============================
// TEDDY → POLAROIDS
// ==============================

if (nextBtn2) {
    nextBtn2.addEventListener("click", function () {

        teddyScreen.classList.add("slide-out");

        setTimeout(function () {

            teddyScreen.style.display = "none";

            polaroidScreen.style.display = "flex";
            polaroidScreen.classList.add("slide-in");

        }, 800);

    });
}


// ==============================
// PHOTO PREVIEWS
// ==============================

const photoInputs = document.querySelectorAll(".photo-input");

photoInputs.forEach(function (input) {

    input.addEventListener("change", function () {

        const file = input.files[0];

        if (!file) return;

        const image = document.createElement("img");

        image.src = URL.createObjectURL(file);

        image.style.width = "100%";
        image.style.height = "100%";
        image.style.objectFit = "cover";

        const photoArea = input.parentElement;

        photoArea.innerHTML = "";
        photoArea.appendChild(image);

    });

});


// ==============================
// BOOTH PHOTO PREVIEWS
// ==============================

const boothInputs = document.querySelectorAll(".booth-input");

boothInputs.forEach(function (input) {

    input.addEventListener("change", function () {

        const file = input.files[0];

        if (!file) return;

        const image = document.createElement("img");

        image.src = URL.createObjectURL(file);

        image.style.width = "100%";
        image.style.height = "100%";
        image.style.objectFit = "cover";

        const boothPhoto = input.parentElement;

        boothPhoto.innerHTML = "";
        boothPhoto.appendChild(image);

    });

});


// ==============================
// TYPING EFFECT
// ==============================

function typeText(element, speed, callback) {

    if (!element) {
        if (callback) callback();
        return;
    }

    const text = element.textContent.trim();

    element.textContent = "";
    element.classList.add("typing-active");

    let index = 0;

    function type() {

        if (index < text.length) {

            element.textContent += text.charAt(index);

            index++;

            setTimeout(type, speed);

        } else {

            if (callback) {
                callback();
            }

        }

    }

    type();
}


// ==============================
// ENDING → KEEPSAKE
// ==============================

if (endingNextBtn) {

    endingNextBtn.addEventListener("click", function () {

        endingScreen.classList.add("slide-out");

        setTimeout(function () {

            endingScreen.style.display = "none";

            keepsakeScreen.style.display = "flex";
            keepsakeScreen.style.transform = "translateX(0)";
            keepsakeScreen.style.animation = "none";

            keepsakeScreen.classList.add("keepsake-visible");

        }, 800);

    });

}


// ==============================
// SAVE CUSTOMIZED SURPRISE
// ==============================

const saveMemoriesBtn =
    document.querySelector(".save-memories-btn");


if (saveMemoriesBtn) {

    saveMemoriesBtn.addEventListener("click", async function () {

        saveMemoriesBtn.disabled = true;
        saveMemoriesBtn.textContent = "Saving... ♡";


        // --------------------------
        // GET LETTER DATA
        // --------------------------

        const letterName =
            document.querySelector(".letter-name").value;

        const letterMessage =
            document.querySelector(".letter-message").value;

        const letterSignature =
            document.querySelector(".letter-signature").value;


        // --------------------------
        // UPLOAD PHOTOS
        // --------------------------

        const photoInputs =
            document.querySelectorAll(".photo-input");

        const photoPaths = [];


        for (let i = 0; i < photoInputs.length; i++) {

            const file = photoInputs[i].files[0];


            if (!file) {

                photoPaths.push(null);

                continue;
            }


            const fileName =
                `${crypto.randomUUID()}-${file.name}`;


            const { error: uploadError } =
                await supabaseClient
                    .storage
                    .from("surprise-photos")
                    .upload(fileName, file);


            if (uploadError) {

                console.error(
                    "Photo upload error:",
                    uploadError
                );

                saveMemoriesBtn.disabled = false;

                saveMemoriesBtn.textContent =
                    "Save my memories ♡";

                alert(
                    "Something went wrong while uploading a photo 💔"
                );

                return;
            }


            photoPaths.push(fileName);

        }


        // --------------------------
        // SAVE EVERYTHING TO DATABASE
        // --------------------------

        const { data, error } =
            await supabaseClient
                .from("surprises")
                .insert({

                    letter_name: letterName,

                    letter_message: letterMessage,

                    letter_signature: letterSignature,

                    photo_1: photoPaths[0],

                    photo_2: photoPaths[1],

                    photo_3: photoPaths[2],

                    photo_4: photoPaths[3]

                })
                .select()
                .single();


        if (error) {

            console.error(
                "Save error:",
                error
            );

            saveMemoriesBtn.disabled = false;

            saveMemoriesBtn.textContent =
                "Save my memories ♡";

            alert(
                "Database save failed: " +
                error.message
            );

            return;
        }


        console.log(
            "Surprise saved successfully:",
            data
        );


        // --------------------------
        // CREATE SHARE LINK
        // --------------------------

        const surpriseId = data.id;

        console.log(
            "Your surprise ID:",
            surpriseId
        );


        const shareLink =
            "https://yslhessa-coder.github.io/SurpriseHub/templates/pink-memories/?id=" +
            surpriseId;


        console.log(
            "Share link:",
            shareLink
        );


        saveMemoriesBtn.textContent =
            "Saved! ♡";


        alert(
            "Your surprise is ready! 💗\n\nShare this link:\n" +
            shareLink
        );

    });

}


// ======================================================
// LOAD SAVED SURPRISE FROM GENERATED LINK
// ======================================================

async function loadSavedSurprise() {

    // --------------------------
    // GET ID FROM URL
    // --------------------------

    const urlParams =
        new URLSearchParams(window.location.search);

    const surpriseId =
        urlParams.get("id");


    // If there is no ID,
    // this is the normal editable template.
    if (!surpriseId) {
        console.log(
            "No surprise ID. Starting normal template."
        );
        return;
    }


    console.log(
        "Loading saved surprise:",
        surpriseId
    );


    // --------------------------
    // VIEW MODE
    // --------------------------

    document.body.classList.add("view-mode");


    // --------------------------
    // GET SAVED DATA
    // --------------------------

    const { data, error } =
        await supabaseClient
            .from("surprises")
            .select(
                "letter_name, letter_message, letter_signature, photo_1, photo_2, photo_3, photo_4"
            )
            .eq("id", surpriseId)
            .single();


    // --------------------------
    // CHECK DATABASE RESULT
    // --------------------------

    if (error || !data) {

        console.error(
            "Could not load surprise:",
            error
        );

        alert(
            "Could not load this surprise 💔"
        );

        return;
    }


    console.log(
        "Saved surprise data:",
        data
    );


    // ==================================================
    // LOAD LETTER
    // ==================================================

    const nameInput =
        document.querySelector(".letter-name");

    const messageInput =
        document.querySelector(".letter-message");

    const signatureInput =
        document.querySelector(".letter-signature");


    if (nameInput) {

        nameInput.value =
            data.letter_name || "";

    }


    if (messageInput) {

        messageInput.value =
            data.letter_message || "";

    }


    if (signatureInput) {

        signatureInput.value =
            data.letter_signature || "";

    }


    // ==================================================
    // LOAD FOUR POLAROID PHOTOS
    // ==================================================

    const photoAreas =
        document.querySelectorAll(
            ".polaroid .photo-area"
        );


    const photoPaths = [

        data.photo_1,

        data.photo_2,

        data.photo_3,

        data.photo_4

    ];


    photoAreas.forEach(function (area, index) {

        const path =
            photoPaths[index];


        // No photo saved for this position.
        if (!path) {
            return;
        }


        // --------------------------
        // GET PUBLIC SUPABASE URL
        // --------------------------

        const { data: imageData } =
            supabaseClient
                .storage
                .from("surprise-photos")
                .getPublicUrl(path);


        if (
            !imageData ||
            !imageData.publicUrl
        ) {

            console.error(
                "Could not get public URL for:",
                path
            );

            return;
        }


        console.log(
            "Loading saved photo:",
            imageData.publicUrl
        );


        // --------------------------
        // CREATE IMAGE
        // --------------------------

        const image =
            document.createElement("img");


        image.src =
            imageData.publicUrl;


        image.alt =
            "A saved memory";


        image.style.width =
            "100%";


        image.style.height =
            "100%";


        image.style.objectFit =
            "cover";


        image.style.display =
            "block";


        // --------------------------
        // PUT IMAGE INTO POLAROID
        // --------------------------

        area.replaceChildren(image);

    });


    // --------------------------
    // FINISHED
    // --------------------------

    console.log(
        "Surprise loaded successfully! 💗"
    );

}


// ======================================================
// START SAVED-LINK LOADING
// ======================================================

window.addEventListener(
    "load",
    loadSavedSurprise
);
