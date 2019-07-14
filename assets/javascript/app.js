$(document).ready(function () {

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyBfbOF3MhIMXZ5FCemed2gL7GajCvi7gNU",
        authDomain: "traintime-f34c0.firebaseapp.com",
        databaseURL: "https://traintime-f34c0.firebaseio.com",
        projectId: "traintime-f34c0",
        storageBucket: "",
        messagingSenderId: "963914657009",
        appId: "1:963914657009:web:58318cb218df4adb"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    $("#uploadTrainInfo").on("click", function (event) {
        event.preventDefault();

        var trnName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#firsttrain").val().trim();
        var frequency = $("#frequency").val().trim();

        database.ref().push({
            trainName: trnName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency

        });


    });