    const auth = firebase.auth();

    const signInBtn = document.getElementById('signInBtn');
    const provider = new firebase.auth.GoogleAuthProvider();
    var db = firebase.firestore();

    signInBtn.onclick = () => auth.signInWithPopup(provider);

    auth.onAuthStateChanged(user => {
        if (user) {
            window.location = 'homepage.html'
        } else {
            
        }
    })
