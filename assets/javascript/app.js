$(document).ready(function () {

   
    ///////////////////////////////////////////////////////////////////
//firebase access 
    var config = {
        apiKey: "AIzaSyDp4nIGK7UfrsAHPWICFRs4sckIST9CIJY",
        authDomain: "train-card.firebaseapp.com",
        databaseURL: "https://train-card.firebaseio.com",
        projectId: "train-card",
        storageBucket: "train-card.appspot.com",
        messagingSenderId: "962235132009"
    };

    firebase.initializeApp(config);
// establishing variables in global
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
//udating variables with info from database
    database.ref().on("child_added", function (childSnapshot) {
        newName = childSnapshot.val().trainName;
        newDestination = childSnapshot.val().trainDestination;
        newDate = childSnapshot.val().trainTime;
        newFrequency = childSnapshot.val().trainFrequency;

        console.log(newDate);
        //creating columns and delete button for the train board
        rows = $("<tr>");
        colName = $("<td>");
        colDestination = $("<td>");
        colFrequency = $("<td>");
        colNextArrival = $("<td>");
        colMinutesAway = $("<td>");
        deleteButton = $("<td>");
        button = $("<button>");
        //formating start time
        startTime = moment(newDate, "HH:mm").subtract(1, "years");
        //formating the current time
        currentTime = moment().format("HH:mm")
        //displaying the current time in the DOM
        $(".time").text(currentTime)
        console.log(currentTime);
        // finding the difference between the start time and the current time
        difference = moment().diff(moment(startTime), "minutes")
        console.log(difference)
        console.log(difference);
        //finding the minutes left until next train arrival
        minutesLeft = newFrequency - difference % newFrequency;
        console.log(minutesLeft)
        //finding the time of the next train arrival
        nextArrival = moment().clone().add('m', minutesLeft).format("HH:mm");
        //pushing the arrival times into an array and sorting them 
        timeleft.push(parseInt(minutesLeft))
        timeleft.sort()
        console.log(timeleft[0])
// updating the next train time by utilizing the timeleft array
               if (timeleft > 1) {
            $(".train-alert").removeClass("urgent")
            $(".train-alert").empty()
            $(".train-alert").text("Next train will arrive in " + timeleft[0] + " minutes.")
        }
        else if (timeleft[0] == 1) {
            $(".train-alert").text("Next train will arrive in less than " + timeleft[0] + " minute.")
            $(".train-alert").addClass("urgent")
        }

//appending all the columns and delete button to the DOM
        deleteButton.append(button);
        rows.append(colName);
        rows.append(colDestination);
        rows.append(colFrequency);
        rows.append(colNextArrival);
        rows.append(colMinutesAway);
        rows.append(deleteButton);

        $("#table-body").append(rows);
//setting the text of all the columns and delete button
        colName.text(newName)
        colDestination.text(newDestination)
        colFrequency.text(newFrequency + " minutes")
        colNextArrival.text(nextArrival)
        colMinutesAway.text(minutesLeft)
        button.text("Delete")
        button.addClass("fun-color")
        deleteButton.addClass("button")

//on click which deletes content from the local html but did not finish so the firebase is not updated 
        $(".button").on("click", function (e) {
            // ref.child(key).$remove()
           
            $(this).prev("td").remove();
            $(this).prev("td").remove();
            $(this).prev("td").remove();
            $(this).prev("td").remove();
            $(this).prev("td").remove();
            $(this).remove()
             


        });
    })
//on click setting a value for the variables which is then updated to the firebase
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

    //An interval that updates the DOM without refreshing the page
    int = setInterval(function () {
        $("#table-body").empty()
        timeleft = [];
        timeleft.sort()
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
            
            if (timeleft[0] == 1) {
                $(".train-alert").text("Next train will arrive in less than " + timeleft[0] + " minute.")
                $(".train-alert").addClass("urgent")
            }
            else {
                $(".train-alert").removeClass("urgent")
                $(".train-alert").empty()
                $(".train-alert").text("Next train will arrive in less than " + timeleft[0] + " minutes.")
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

    }, 5000);


})