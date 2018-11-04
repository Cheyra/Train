$(document).ready(function () {

    int = setInterval(function () {
        $("#table-body").empty()
        timeleft = [];


        database.ref().on("child_added", function (childSnapshot) {
            newName = childSnapshot.val().trainName;
            newDestination = childSnapshot.val().trainDestination;
            newDate = childSnapshot.val().trainTime;
            newFrequency = childSnapshot.val().trainFrequency;

            console.log(newDate);
            rows = $("<tr>");
            colName = $("<td>");
            colDestination = $("<td>");
            colFrequency = $("<td>");
            colNextArrival = $("<td>");
            colMinutesAway = $("<td>");
            deleteButton = $("<td>");
            button = $("<button>");
            startTime = moment(newDate, "HH:mm").subtract(1, "years");
            currentTime = moment().format("HH:mm")
            $(".time").text(currentTime)
            console.log(currentTime);
            difference = moment().diff(moment(startTime), "minutes")
            console.log(difference)
            console.log(difference);
            minutesLeft = newFrequency - difference % newFrequency;
            console.log(minutesLeft)
            nextArrival = moment().clone().add('m', minutesLeft).format("HH:mm");
            timeleft.push(parseInt(minutesLeft))
            // console.log(timeleft)
            timeleft.sort()
            console.log(timeleft[0])
            if (timeleft > 1) {
                $(".train-alert").removeClass("urgent")
                $(".train-alert").empty()
                $(".train-alert").text("Next train will arrive in " + timeleft[0] + " minutes.")
            }
            else if (timeleft[0] == 1) {
                $(".train-alert").text("Next train will arrive in less than " + timeleft[0] + " minute.")
                $(".train-alert").addClass("urgent")
            }


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
            button.addClass("fun-color")
            deleteButton.addClass("button")


            $(".button").on("click", function (e) {
                console.log($(this))
                $(this).prev("td").remove();
                $(this).prev("td").remove();
                $(this).prev("td").remove();
                $(this).prev("td").remove();
                $(this).prev("td").remove();
                $(this).remove()

            });
        })

        $("#submit").on("click", function (event) {

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




    }, 5000);

    ///////////////////////////////////////////////////////////////////

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
    var timeleft = [];
    var rows;
    var colName;
    var colDestination;
    var colFrequency;
    var colNextArrival;
    var colMinutesAway;
    var deleteButton;

    database.ref().on("child_added", function (childSnapshot) {
        newName = childSnapshot.val().trainName;
        newDestination = childSnapshot.val().trainDestination;
        newDate = childSnapshot.val().trainTime;
        newFrequency = childSnapshot.val().trainFrequency;

        console.log(newDate);
        rows = $("<tr>");
        colName = $("<td>");
        colDestination = $("<td>");
        colFrequency = $("<td>");
        colNextArrival = $("<td>");
        colMinutesAway = $("<td>");
        deleteButton = $("<td>");
        button = $("<button>");
        startTime = moment(newDate, "HH:mm").subtract(1, "years");
        currentTime = moment().format("HH:mm")
        $(".time").text(currentTime)
        console.log(currentTime);
        difference = moment().diff(moment(startTime), "minutes")
        console.log(difference)
        console.log(difference);
        minutesLeft = newFrequency - difference % newFrequency;
        console.log(minutesLeft)
        nextArrival = moment().clone().add('m', minutesLeft).format("HH:mm");
        timeleft.push(parseInt(minutesLeft))
        timeleft.sort()
        console.log(timeleft[0])

        ///////////////////////////////////////////
        // timeleft.map(d => moment(d)),
        // maxDate = moment.max(moments)
        // console.log(maxDate)
        ////////////////////////////////////////////
        //         function sortDates(a, b)
        // {
        //     return a.getTime() - b.getTime();
        // }
        // var sorted = timeleft.sort(sortDates);
        // var minDate = sorted[0];
        // console.log(minDate)
        if (timeleft > 1) {
            $(".train-alert").removeClass("urgent")
            $(".train-alert").empty()
            $(".train-alert").text("Next train will arrive in " + timeleft[0] + " minutes.")
        }
        else if (timeleft[0] == 1) {
            $(".train-alert").text("Next train will arrive in less than " + timeleft[0] + " minute.")
            $(".train-alert").addClass("urgent")
        }


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
        button.addClass("fun-color")
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
            // for(DataSnapshot itemSnapshot : dataSnapshot.getChildren()){
            // itemSnapshot.removeValue()}


            //     database.ref().on("value", function (childSnapshot) {
            //         var ref = database.getReference()
            //        ref.childSnapshot(trainName).remove()
            // })
            //   datab = database.getInstance();
            //             var refdb = datab.getReference()
            //             refdb.child("trainName").remove()
            //             console.log(refdb)
            ///////////////////////////////////////////////////////////////////////////////////////////////
            // trainKey = $(this).parent("td").parent("tr").data("key")
            // firebase.database().ref().child(trainKey)
            //         .once("value")
            //         .then(function(snapshot) {

            //           var trainData = snapshot.val();

            //           $("#train-name-delete").val(trainData.trainName);
            //           $("#destination-delete").val(trainData.destination);
            //           $("#first-train-time-delete").val(trainData.trainTime);
            //           $("#frequency-delete").val(trainData.frequency);

            //         });



        });
    })

    $("#submit").on("click", function (event) {
        // event.preventDefault();

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