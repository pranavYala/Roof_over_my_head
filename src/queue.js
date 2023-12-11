async function addQueue() {
    var userid = localStorage.getItem("userId");//"6575761b29a389002a85795f";
    var useremail = localStorage.getItem("userEmail");//"sethueapen@gmail.com"
    var buidlingid = localStorage.getItem("buildingId"); //"65756b1129a389002a857918";
    console.log(localStorage.getItem("userEmail"));
    console.log(localStorage.getItem("userId"));
    console.log(localStorage.getItem("buildingId"));
    if(!userid){
        alert("Please login to add to queue");
        window.location.href = "register.html";
    }
    var inQueue = await fetch(`https://final-409-api-8d436d40ed6c.herokuapp.com/api/users/?where={"email": "${useremail}"}`);
    var inQueueData = await inQueue.json();
    if (inQueueData.data[0].queuePosition != -1) {
        alert("Already in queue");
        window.location.href = "account.html";
    }

    var responce = await fetch(`https://final-409-api-8d436d40ed6c.herokuapp.com/api/apartments/${buidlingid}`);
    var data = await responce.json();
    console.log(data);
    if (data.data) {
        if (data.data.available != 0) {
            var responce2 = await fetch(`https://final-409-api-8d436d40ed6c.herokuapp.com/api/users/`);
            var data2 = await responce2.json();
            var maxQueue = 0;
            for (i in data2.data) {
                if (data2.data[i].queuePosition > maxQueue) {
                    maxQueue = data2.data[i].queuePosition;
                }
            }
            console.log(maxQueue);
            localStorage.setItem("queuePosition", maxQueue + 1);
            var responce3 = await fetch(`https://final-409-api-8d436d40ed6c.herokuapp.com/api/users/${userid}`, {
                method: "PUT",
                body: JSON.stringify({
                    email: useremail,
                    queuePosition: maxQueue + 1,
                    queueRequest: buidlingid
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            alert("Added to queue at position " + (maxQueue + 1));
            var responce4 = await fetch(`https://final-409-api-8d436d40ed6c.herokuapp.com/api/apartments/${buidlingid}`, {
                method: "PUT",
                body: JSON.stringify({
                    _id: buidlingid,
                    // queuePosition: maxQueue + 1
                    available: data.data.available - 1
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        } else {
            alert("Apartment is full");
            return;
        }
    }
}

