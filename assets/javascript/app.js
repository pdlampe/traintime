$(document).ready(function () {

    // Your web app's Firebase configuration

    var firebaseConfig = {
        apiKey: "AIzaSyAHb7ehZrVdZg2TDhgJF_qPR7OOuSKc06g",
        authDomain: "trainstation-78d6f.firebaseapp.com",
        databaseURL: "https://trainstation-78d6f.firebaseio.com",
        projectId: "trainstation-78d6f",
        storageBucket: "trainstation-78d6f.appspot.com",
        messagingSenderId: "598311122100",
        appId: "1:598311122100:web:ea3ec23f6659c6cc"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    $("#uploadTrainInfo").on("click", function (event) {
        event.preventDefault();

        var trainName = $("#trainName").val().trim();
        var place = $("#place").val().trim();
        var firstTrain = $("#firsttrain").val().trim();
        var frequency = $("#frequency").val().trim();

        database.ref().push({
            trainName: trainName,
            place: place,
            firstTrain: firstTrain,
            frequency: frequency

        });
    });

    database.ref().on("child_added", function (childSnapshot) {

        var departingTrain = childSnapshot.val().trainName;
        var finalDestination = childSnapshot.val().place;
        var initialTrain = childSnapshot.val().firstTrain;
        var updatedFrequency = childSnapshot.val().frequency;

        var departingTime = moment(initialTrain, "hh:mm").subtract(1, "years");

        var timeDifference = moment().diff(moment(departingTime), "minutes");

        var timeRemainder = timeDifference % updatedFrequency;

        var minutesForTrain = updatedFrequency - timeRemainder;

        var leavingTrain = moment().add(minutesForTrain, "minutes");

        var nextArrival = moment(leavingTrain).format("HH:mm");


        $("#upload-content").append(
            ' <tr><td>' + departingTrain +
            ' </td><td>' + finalDestination +
            ' </td><td>' + updatedFrequency +
            ' </td><td>' + nextArrival +
            ' </td><td>' + minutesForTrain + ' </td></tr>');

        $("#trainName, #place, #firsttrain, #frequency").val("");
        return false;
    },
        function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });

});