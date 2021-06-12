    var db = firebase.firestore();
const submit = document.getElementById('submit');
const deleteButton = document.getElementById('deleteButton');
const age = document.getElementById('age');
const bloodType = document.getElementById('bloodType');
const allergies = document.getElementById('allergies');
const drugs = document.getElementById('drugs');
const vaccine = document.getElementById('vaccine');
const name = document.getElementById('name');
var init = function(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log(firebase.auth().currentUser);

          submit.onclick = (e) => {
            e.preventDefault();

            let ageValue = age.value;
            let bloodTypeValue = bloodType.value;
            let allergiesValue = allergies.value;
            let drugsValue = drugs.value;
            let vaccineValue = vaccine.value;
            let nameValue = name.value;

            db.collection('medicalRecords').doc(firebase.auth().currentUser.uid).set({
                ageRecord: ageValue,
                bloodTypeRecord: bloodTypeValue,
                allergiesValueRecord: allergiesValue,
                drugsValueRecord: drugsValue,
                vaccineValueRecord: vaccineValue,
                nameValueRecord: nameValue
            })
          }

          deleteButton.onclick = () => {
              db.collection('medicalRecords').doc(firebase.auth().currentUser.uid).delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
          }

        } else {
          window.location.replace("index.html");
        }
      });
}

init();
