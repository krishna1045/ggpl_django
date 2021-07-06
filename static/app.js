// Firebase Config
var firebaseConfig = {
    apiKey: "AIzaSyCMWY1g-tNFFUegdSgqauW3Yokf_3pAaOI",
    authDomain: "ggpl-e219f.firebaseapp.com",
    databaseURL: "https://ggpl-e219f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ggpl-e219f",
    storageBucket: "ggpl-e219f.appspot.com",
    messagingSenderId: "1008042192809",
    appId: "1:1008042192809:web:c1a3d0071991bda1e09eb8"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// Vuex
const store = Vuex.createStore({
    state() {
        return {
            userData: [],
            adminMatchData: {
                isCurrentPrediction: false,
                isPredictionOn: false,
                matchName: '',
                matchCode: ''
            },
            error: {
                signIn: {
                    errorCode: '',
                    errorMessage: ''
                },
                signOut: {
                    errorCode: '',
                    errorMessage: ''
                },
                signUp: {
                    errorCode: '',
                    errorMessage: ''
                }
            },
            isSignedIn: false,
            teams: [],
            leaderboards: [],
            current_prediction: [],
        }
    },
    mutations: {
        getLeaderboardsData(state) {
            state.leaderboards = []
            db.collection("leaderboards")
                .orderBy("points", "desc")
                .onSnapshot((res) => {
                    let changes = res.docChanges();
                    changes.forEach((change) => {
                        if (change.type === "added") {
                            state.leaderboards.push({
                                ...change.doc.data(),
                                id: change.doc.id,
                            });
                        } else if (change.type == "modified") {
                            console.log("Modified Message: ", change.doc.data());
                            for (let i = 0; i < state.leaderboards.length; i++) {
                                if (state.leaderboards[i].id == change.doc.id) {
                                    state.leaderboards[i] = {
                                        ...change.doc.data(),
                                        id: change.doc.id,
                                    };
                                }
                            }
                        }
                    });
                });
        },
        updateLeaderboardsPointsData(state, { i, operator }) {
            console.log(i + " : " + operator);
            var id = state.leaderboards[i].id;
            if (operator == '+') {
                var updatedPoints = state.leaderboards[i].points + 1;
                db.collection("leaderboards").doc(id).update({
                    points: updatedPoints,
                });
            } else {
                updatedPoints = state.leaderboards[i].points - 1;
                db.collection("leaderboards").doc(id).update({
                    points: updatedPoints,
                });
            }
        },
        getTeamsData(state) {
            state.teams = []
            db.collection("teams")
                .orderBy("name")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        state.teams.push(doc.data());
                    });
                });
        },
        getAdminSettings(state) {
            db.collection("admin")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        state.adminMatchData = doc.data()
                        console.log(state.adminMatchData);
                    });
                });
        },
        signOutUser(state) {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    console.log("User signed out");
                    state.isSignedIn = false;
                    router.replace("/signin");
                })
                .catch((error) => {
                    var errorCode = error.code;
                    state.error.signOut.errorCode = errorCode;

                    var errorMessage = error.message;
                    state.error.signOut.errorMessage = errorMessage;

                });
        },
        signInUser(state, { emailId, password }) {
            firebase
                .auth()
                .signInWithEmailAndPassword(emailId, password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    console.log("User ID => " + user.uid);
                    state.userData = user;
                    state.isSignedIn = true
                    router.replace('/')
                })
                .catch((error) => {
                    var errorCode = error.code;
                    state.error.signIn.errorCode = errorCode;

                    var errorMessage = error.message;
                    state.error.signIn.errorMessage = errorMessage;

                });
        },
        createUser(state, { emailId, password, displayName }) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(emailId, password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    user.updateProfile(
                        {
                            displayName: displayName
                        })
                    state.userData = user;
                    state.isSignedIn = true
                    console.log(user);
                    router.replace('/')
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    state.error.signUp.errorCode = errorCode;

                    var errorMessage = error.message;
                    state.error.signUp.errorMessage = errorMessage;

                    // ..
                });


        },
        postAdminSettings(state) {
            db.collection("admin").doc("ggTATaxBy9qH63jePc4S").update({
                matchName: state.adminMatchData.matchName,
                matchCode: state.adminMatchData.matchCode,
            });
        },
        turnOnPrediction(state) {

            state.adminMatchData.isPredictionOn = true
            console.log("workedd");
            db.collection("admin").doc("ggTATaxBy9qH63jePc4S").update({
                isPredictionOn: state.adminMatchData.isPredictionOn,
            });
        },
        turnOffPrediction(state) {

            state.adminMatchData.isPredictionOn = false
            console.log("workedd");
            db.collection("admin").doc("ggTATaxBy9qH63jePc4S").update({
                isPredictionOn: state.adminMatchData.isPredictionOn,
            });
        },
        turnOnCurrentPrediction(state) {

            state.adminMatchData.isCurrentPrediction = true
            console.log("workedd");
            db.collection("admin").doc("ggTATaxBy9qH63jePc4S").update({
                isCurrentPrediction: state.adminMatchData.isCurrentPrediction,
            });
        },
        turnOffCurrentPrediction(state) {

            state.adminMatchData.isCurrentPrediction = false
            console.log("workedd");
            db.collection("admin").doc("ggTATaxBy9qH63jePc4S").update({
                isCurrentPrediction: state.adminMatchData.isCurrentPrediction,
            });
        },
        getPredictionData(state) {
            state.current_prediction = [];
            db.collection("current_prediction")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        state.current_prediction.push(doc.data());
                    });
                });
        },
    },
})

// Vue
const app = Vue.createApp({
    delimiters: ["[[", "]]"],
    store: store,
    data() {
        return {
            prediction: {
                name: this.$store.state.userData.displayName,
                uid: this.$store.state.userData.uid,
                batsman: "",
                bowler: "",
                pp1: "",
                pp2: "",
                win: "",
                score: "",
            },
        };
    },
    computed: {},
    mounted() {
        this.$store.commit("getLeaderboardsData");
    },
    created() {
        this.$store.commit("getPredictionData");

        this.$store.commit("getAdminSettings");
    },
    methods: {
        update(i, operator) {
            this.$store.commit("updateLeaderboardsPointsData", { i, operator });
        },
        postSettings() {
            this.$store.commit("postAdminSettings");
        },
        turnOnPrediction() {
            this.$store.commit("turnOnPrediction");
        },
        turnOffPrediction() {
            this.$store.commit("turnOffPrediction");
        },
        turnOnCurrentPrediction() {
            this.$store.commit("turnOnCurrentPrediction");
        },
        turnOffCurrentPrediction() {
            this.$store.commit("turnOffCurrentPrediction");
        },
        addPrediction() {
            db.collection(this.$store.state.userData.uid)
                .doc(this.$store.state.adminMatchData.matchCode)
                .set(this.prediction);
            db.collection("current_prediction")
                .doc(this.$store.state.userData.uid)
                .set(this.prediction);
        },
    },
})
app.use(store).mount("#app")

console.log('Hello');