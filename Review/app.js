const submit = document.getElementById('submit');
const email = document.getElementById('email');
const reviewInput = document.getElementById('reviewInput');
const name = document.getElementById('name');
const rating = document.getElementById('rating');
var db = firebase.firestore();

var init = function(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log(firebase.auth().currentUser);


          submit.onclick = (e) => {
              e.preventDefault();
              let emailValue = email.value;
              let review = reviewInput.value;
              let nameValue = name.value;
              let ratingValue = rating.value;
              
              sendEmail(nameValue, emailValue, review)

              var doctor = prompt('What was the name of the doctor who you were talking about?')

              db.collection('ratings').add({
                review: review,
                personWhoRatingWasFrom: nameValue,
                ratingGiven: ratingValue,
                doctor: doctor
              })
          }
          
        } else {
          window.location.replace("index.html");
        }
      });
}

function sendEmail(name, email, review) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "homedical7@gmail.com",
        Password: "hzoilikbrstthuwo",
        To: `homedical7@gmail.com`,
        From: `${email}`,
        Subject: `Review from ${name}`,
        Body: `${review}`
    }).then((message) => {
        console.log('Mail sent successfully!')
    })
}

init();
