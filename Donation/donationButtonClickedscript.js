const amount = document.getElementById('amount');
const randomNumberInput = document.getElementById('randomNumberInput');
const email = document.getElementById('email');
const name = document.getElementById('name');
const submit = document.getElementById('submit');
var db = firebase.firestore();

var init = function(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(firebase.auth().currentUser);
            submit.onclick = (e) => {
                e.preventDefault();
                let nameValue = name.value;
                let emailValue = email.value;
                let amountValue = amount.value;

                let randomNumber = Math.floor((Math.random() * 1000) + 1);

                sendEmail(nameValue, emailValue, randomNumber, amountValue)
            }
        } else {
          window.location.replace("index.html");
        }
      });
}
init();

function sendEmail(name, email, number, amount) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "homedical7@gmail.com",
        Password: "hzoilikbrstthuwo",
        To: `${email}`,
        From: "homedical7@gmail.com",
        Subject: "Donation succeeded!",
        Body: `Hi ${name}! We have received your donation of $${amount}, but to confirm its you, please enter this number into the next input: ${number}`
    }).then((message) => {
        console.log('Mail sent successfully!')

        randomNumberInput.onchange = () => {
            if (number == randomNumberInput.value) {
                const { serverTimestamp } = firebase.firestore.FieldValue;
                alert('Thanks for donating!');
                db.collection('donations').add({
                    name: name,
                    amount: amount,
                    uid: firebase.auth().currentUser.uid,
                    createdAt: serverTimestamp()
                })

            } else {
                firebase.auth().signOut();
            }
        }
    })
}
