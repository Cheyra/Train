$(document).ready(function () {



    var config = {
        apiKey: "AIzaSyDp4nIGK7UfrsAHPWICFRs4sckIST9CIJY",
        authDomain: "train-card.firebaseapp.com",
        databaseURL: "https://train-card.firebaseio.com",
        projectId: "train-card",
        storageBucket: "train-card.appspot.com",
        messagingSenderId: "962235132009"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    var newName;
    var newDestination;
    var newDate;
    var newFrequency;
    var nextArrival;
    var button;
    var minutesLeft;
    var difference;
    var currentTime

    database.ref().on("child_added", function (childSnapshot) {
        newName = childSnapshot.val().trainName;
        newDestination = childSnapshot.val().trainDestination;
        newDate = childSnapshot.val().trainTime;
        newFrequency = childSnapshot.val().trainFrequency;

        console.log(newDate);
        // console.log(moment());
        var rows = $("<tr>");
        var colName = $("<td>");
        var colDestination = $("<td>");
        var colFrequency = $("<td>");
        var colNextArrival = $("<td>");
        var colMinutesAway = $("<td>");
        var deleteButton = $("<td>");
        button = $("<button>");
        startTime = moment(newDate, "HH:mm").subtract(1, "years");
        currentTime = moment().format("HH:mm")
        console.log(currentTime);
        difference = moment().diff(moment(startTime), "minutes")
        // var d = newDate.duration('m', 5)
        console.log(difference)

        // difference = moment.to(newDate, true)

        // difference = moment.utc(moment(currentTime,"HH:mm").diff(moment(newDate,"HH:mm"))).format("HH:mm");
        console.log(difference);
        minutesLeft = newFrequency - difference % newFrequency;

        nextArrival = moment().clone().add('m', minutesLeft).format("HH:mm");


        deleteButton.append(button);
        rows.append(colName);
        rows.append(colDestination);
        rows.append(colFrequency);
        rows.append(colNextArrival);
        rows.append(colMinutesAway);
        rows.append(deleteButton);

        $("#table-body").append(rows);

        colName.text(newName)
        colDestination.text(newDestination)
        colFrequency.text(newFrequency + " minutes")
        colNextArrival.text(nextArrival)
        colMinutesAway.text(minutesLeft)
        button.text("Delete")
        deleteButton.addClass("button")


        $(".button").on("click", function (e) {
            // ref.child(key).$remove()
            console.log($(this))
            $(this).prev("td").remove();
            $(this).prev("td").remove();
            $(this).prev("td").remove();
            $(this).prev("td").remove();
            $(this).prev("td").remove();
            $(this).remove()
            // ref.child(trainName).remove()
            //  childSnapshot.val().trainName.null;
            // rows.remove()

            database.ref().on("value", function (childSnapshot) {

                ref.child(key).remove()






            });
        })

        $("#submit").on("click", function (event) {
            event.preventDefault();

            newName = $("#name").val().trim();
            newDestination = $("#destination").val().trim();
            newDate = $("#train-start").val().trim();
            newFrequency = $("#frequency").val().trim();


            database.ref().push({
                trainName: newName,
                trainDestination: newDestination,

                trainFrequency: newFrequency,

                trainTime: newDate,

                dataAdded: firebase.database.ServerValue.TIMESTAMP

            });


        })
    })
})