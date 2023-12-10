let currentEmail;

async function fetchUserData(email) {
    try {
        const response = await fetch(`https://final-409-api-8d436d40ed6c.herokuapp.com/api/users/?where={"email": "${email}"}`);
        // console.log(email)
        const data = await response.json();
        // console.log(data.data[0].firstName)
        if (data.data.length > 0) {
            const userData = data.data[0];

            document.getElementById("userName").innerText = userData.firstName;
            // console.log(name)
            document.getElementById("userEmail").innerText = userData.email;
            document.getElementById("userPassword").innerText = userData.password;
        } else {
            console.error("No user found with email: ", email);
            alert("No user found with email: ", email);
        }
    } catch (error) {
        console.error("Error fetching user data: ", error);
    }
}

async function loadUserData() {
    try {
        const email = localStorage.getItem("userEmail");
        // console.log(email);
        if (email) {
            fetchUserData(email);
            fetchAptData(email);
        } else {
            //console.log("No user email found")
            alert("Please log in first");
            window.location.href = "register.html";
            console.error("Error loading user data");
        }
    } catch (error) {
        alert("Error loading user data");
        console.error("Error loading user data: ", error);
    }
}

document.getElementById("edit-email").addEventListener("click", function () {
    // var email = document.getElementById("userEmail").innerText;
    var email = document.getElementById("userEmail");
    var emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.value = email.innerText.trim();
    email.innerHTML = "";
    email.appendChild(emailInput);

    document.getElementById("edit-email").style.display = "none";
    document.getElementById("save-email").style.display = "inline-block";
    email.parentElement.classList.add("editing");

    currentEmail = emailInput.value;
});

document.getElementById("save-email").addEventListener("click", async function () {
    const email = document.getElementById("userEmail");
    const emailInput = document.querySelector("#userEmail input");
    if (emailInput) {
        const newEmail = emailInput.value;
        await updateUserData("email", newEmail);
        const emailElement = document.createElement("span");
        emailElement.innerText = newEmail;
        email.innerHTML = "";
        email.appendChild(emailElement);

        email.parentElement.classList.remove("editing");

        currentEmail = newEmail;
        // document.getElementById("userEmail").innerText = newEmail;
        document.getElementById("save-email").style.display = "none";
        document.getElementById("edit-email").style.display = "inline-block";
    } else {
        console.error("No email input found");
    }

});

document.getElementById("edit-pass").addEventListener("click", function () {
    // var email = document.getElementById("userEmail").innerText;
    var pass = document.getElementById("userPassword");
    var passInput = document.createElement("input");
    passInput.type = "password";
    passInput.value = pass.innerText.trim();
    pass.innerHTML = "";
    pass.appendChild(passInput);

    document.getElementById("edit-pass").style.display = "none";
    document.getElementById("save-pass").style.display = "inline-block";

    pass.parentElement.classList.add("editing");
});


document.getElementById("save-pass").addEventListener("click", async function () {
    const pass = document.getElementById("userPassword");
    const passInput = document.querySelector("#userPassword input");
    if (passInput) {
        const newPass = passInput.value;
        await updateUserData("password", newPass);
        const passElement = document.createElement("span");
        passElement.innerText = newPass;
        pass.innerHTML = "";
        pass.appendChild(passElement);
        pass.parentElement.classList.remove("editing");
        // document.getElementById("userPassword").innerText = newPass;
        document.getElementById("save-pass").style.display = "none";
        document.getElementById("edit-pass").style.display = "inline-block";
    } else {
        console.error("Input element not found for password.");
    }
});

async function updateUserData(field, value) {
    try {
        const email = localStorage.getItem("userEmail");
        console.log(email);
        if (email) {
            const response = await fetch(`https://final-409-api-8d436d40ed6c.herokuapp.com/api/users/?where={"email": "${email}"}`);
            const data = await response.json();
            if (data.data.length > 0) {
                const userData = data.data[0];
                userData[field] = value;
                console.log(userData);
                const updateResponse = await fetch(`https://final-409-api-8d436d40ed6c.herokuapp.com/api/users/${userData._id}`, {
                    method: "PUT",
                    body: JSON.stringify(userData),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                });
                const updateData = await updateResponse.json();
                if (updateData.data) {
                    alert("User data updated successfully");
                    console.log("User data updated successfully");
                } else {
                    alert("Error updating user data");
                    console.error("Error updating user data");
                }
                
            } else {
                alert("Error updating user data");
                console.error("Error updating user data");
            }
        } else {
            alert("Error updating user data");
            console.error("Error updating user data");
        }
    } catch (error) {
        alert("Error updating user dataaaa");
        console.error("Error updating user data: ", error);
    }
}

async function fetchAptData(email) {
    try {
        const response = await fetch(`https://final-409-api-8d436d40ed6c.herokuapp.com/api/users/?where={"email": "${email}"}`);
        // console.log(email)
        const data = await response.json();
        console.log(localStorage.getItem("buildingId"));
        const aptAddress = await fetch(`https://final-409-api-8d436d40ed6c.herokuapp.com/api/apartments/${localStorage.getItem("buildingId")}`);
        const obj = await aptAddress.json();
        console.log(obj.data.address);
        // console.log(data.data[0].firstName)
        if (data.data.length > 0) {
            const userData = data.data[0];
            if(userData.queuePosition == -1){
                document.getElementById("queue-position").innerText = "Not in queue";
                document.getElementById("address").innerText = "Not in queue";
            } else {
                document.getElementById("queue-position").innerText = localStorage.getItem("queuePosition");
            
            // console.log(name)
                document.getElementById("address").innerText = obj.data.address;
            }
            //document.getElementById("userPassword").innerText = userData.password;
        } else {
            console.error("No user found with email: ", email);
            alert("No user found with email: ", email);
        }
    } catch (error) {
        console.error("Error fetching user data: ", error);
    }
}

async function logout(){
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    window.location.href = "home.html";
}

async function leaveQueue(){
    await updateUserData("queuePosition", -1);
    localStorage.removeItem("queuePosition");
    var email = localStorage.getItem("userEmail");
    const response = await fetch(`https://final-409-api-8d436d40ed6c.herokuapp.com/api/users/?where={"email": "${email}"}`);
    var data = await response.json()
    var buildingid = data.data[0].queueRequest; //"65756b1129a389002a857918";

    var responce4 = await fetch(`https://final-409-api-8d436d40ed6c.herokuapp.com/api/apartments/${buildingid}`);
    var responceData = await responce4.json();
    var responce2 = await fetch(`https://final-409-api-8d436d40ed6c.herokuapp.com/api/apartments/${buildingid}`, {
                method: "PUT",
                body: JSON.stringify({
                    _id: buildingid,
                    // queuePosition: maxQueue + 1
                    available: responceData.data.available + 1
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
    //console.log(responce4.data.available)
    // alert("Left queue");
    window.location.href = "account.html";
}

loadUserData();


