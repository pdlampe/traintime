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

        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#firsttrain").val().trim();
        var frequency = $("#frequency").val().trim();

        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency

        });
    });

    database.ref().on("child_added", function (childSnapshot) {

        var departingTrain = childSnapshot.val().trainName;
        var finalDestination = childSnapshot.val().destination;
        var initialTrain = childSnapshot.val().firstTrain;
        var updatedFrequency = childSnapshot.val().frequency;

        var departingTime = moment(initialTrain, "hh:mm").subtract(1, "years");

        var currentTime = moment();

        var timeDifference = moment().diff(moment(departingTime), "minutes");

        var timeRemainder = timeDifference % updatedFrequency;

        var minutesForTrain = newFreq - timeRemainder;

        var departingTrain = moment().add(minutesForTrain, "minutes");
        var nextArrival = moment(nextTrain).format("HH:mm");

        $("#upload-content").append(
            ' <tr><td>' + departingTrain +
            ' </td><td>' + finalDestination +
            ' </td><td>' + updatedFrequency +
            ' </td><td>' + nextArrival +
            ' </td><td>' + minutesForTrain + ' </td></tr>');

        $("#trName, #destination, #firsttrain, #frequency").val("");
        return false;

    },
        function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });

});