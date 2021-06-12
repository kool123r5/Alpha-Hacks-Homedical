var db = firebase.firestore();

let unsubscribe;
const customList = document.getElementById('customList');
var customRef = db.collection('donations');

const cancerDonateButton = document.getElementById('cancerDonateButton');
const covidDonateButton = document.getElementById('covidDonateButton');

var init = function(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log(firebase.auth().currentUser);

          cancerDonateButton.onclick = () => {
              window.location = 'donationButtonClicked.html'
          }

          covidDonateButton.onclick = () => {
              window.location = 'donationButtonClicked.html'
          }

        } else {
          window.location.replace("index.html");
        }
      });
}
init();

unsubscribe = customRef
        .orderBy('amount')
        .onSnapshot(querySnapshot => {
            const items = querySnapshot.docs.map(doc => {
                return `<li>${doc.data().name} donated ${doc.data().amount}</li>`
            });

            customList.innerHTML = items.join('');
    });
