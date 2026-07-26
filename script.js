const lettersContainer = document.getElementById("lettersContainer");

const home = document.getElementById("home");
const letterPage = document.getElementById("letterPage");

const envelope = document.getElementById("envelope");
const letterContent = document.getElementById("letterContent");

const popup = document.getElementById("lockPopup");

const sound = document.getElementById("paperSound");
const countdown = document.getElementById("countdown");


let currentLetter = 0;


// Final countdown date
// August 7, 2026 12:00 AM IST

const finalDate = new Date(
    "2026-08-07T00:00:00+05:30"
);




// Create 12 letter cards

for(let i = 0; i < 12; i++){

    const card = document.createElement("div");

    card.className = "letter-card locked";


    card.innerHTML = `

        <div class="letter-icon">
            ✉
        </div>

        <h2>
            Day ${i + 1}
        </h2>

        <p>
            🔒 Locked
        </p>

    `;


    card.onclick = () => {

        if(isUnlocked(i)){

            openLetter(i);

        }
        else{

            showPopup();

        }

    };


    lettersContainer.appendChild(card);

}





// Unlock system using IST

function isUnlocked(index){

    // Testing mode: unlock first 2 letters
    if(index < 2){
        return true;
    }

    return false;
}







// Update cards automatically

function updateCards(){


    const cards = document.querySelectorAll(".letter-card");


    cards.forEach((card,index)=>{


        if(isUnlocked(index)){


            card.classList.remove("locked");


            card.querySelector("p").innerHTML =
            "Open ✨";


            card.querySelector(".letter-icon").innerHTML =
            "💌";



            if(!card.querySelector(".sparkle")){


                card.innerHTML +=
                `<span class="sparkle">✦</span>`;


            }



        }
        else{


            card.classList.add("locked");


            card.querySelector("p").innerHTML =
            "🔒 Locked";


            card.querySelector(".letter-icon").innerHTML =
            "✉";


        }


    });


}





// Run immediately

updateCards();


// Keep checking every second

setInterval(updateCards,1000);







// Open letter

function openLetter(index){


    currentLetter = index;


    home.classList.remove("active");

    letterPage.classList.add("active");


    envelope.classList.remove("open");


    letterContent.innerHTML = "";



    setTimeout(()=>{


        envelope.classList.add("open");



        sound.play().catch(()=>{});



        setTimeout(()=>{


            letterContent.innerHTML = letters[index];


setTimeout(()=>{

    document.querySelector(".paper")
    .classList.add("expanded");

},500);



        },2000);



    },1000);



}







// Countdown to August 7

function updateCountdown(){


    if(!letterPage.classList.contains("active")){

        return;

    }



    const now = new Date();


    let distance =
    finalDate - now;




    if(distance <= 0){


        countdown.innerHTML =
        "00 : 00 : 00 : 00";



        if(currentLetter === 11){


            countdown.innerHTML +=
            "<br><br>I'm back ❤️";


        }


        return;


    }





    const days =
    Math.floor(
        distance /
        (1000 * 60 * 60 * 24)
    );



    const hours =
    Math.floor(
        (distance %
        (1000 * 60 * 60 * 24))
        /
        (1000 * 60 * 60)
    );



    const minutes =
    Math.floor(
        (distance %
        (1000 * 60 * 60))
        /
        (1000 * 60)
    );



    const seconds =
    Math.floor(
        (distance %
        (1000 * 60))
        /
        1000
    );



    countdown.innerHTML =

    `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;



}




setInterval(updateCountdown,1000);








// Close letter button

function closeLetter(){


    letterPage.classList.remove("active");


    home.classList.add("active");


    envelope.classList.remove("open");


}








// Locked popup

function showPopup(){


    popup.classList.add("show");


}



function closePopup(){


    popup.classList.remove("show");


}








// Phone back button

history.pushState(null,null,location.href);



window.onpopstate = ()=>{


    if(letterPage.classList.contains("active")){


        closeLetter();


    }


    history.pushState(null,null,location.href);


};
