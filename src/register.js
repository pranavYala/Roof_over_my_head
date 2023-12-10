//check users password
async function checkPassword() {
    try {
        var email = document.getElementById("email-login").value;
        var userEmail = email;
        const response = await fetch(`https://final-409-api-8d436d40ed6c.herokuapp.com/api/users/?where={"email": "${email}"}`);
        const data = await response.json();
        var pass = data.data[0].password;
        console.log(pass);
        var password = document.getElementById("password-login").value;
        if (password == pass) {
            alert("Login successful");
            localStorage.setItem("userEmail", userEmail);
            // return email;
        } else {
            alert("Login failed");
            return null;
        }
    } catch (error) {
        alert("Login failed");
        console.error("Error loading user data: ", error);
        return null;
    }
}

async function createUser() {
    var email = document.getElementById("email-create").value;
    var password = document.getElementById("password-create").value;
    var firstname = document.getElementById("fname").value;
    var lastname = document.getElementById("lname").value;

    const response = await fetch(`https://final-409-api-8d436d40ed6c.herokuapp.com/api/users/?where={"email": "${email}"}`);
    const data = await response.json();

    if(data.data[0]){
        alert("User already exists");
        return;
    }

    var responce = await fetch("https://final-409-api-8d436d40ed6c.herokuapp.com/api/users", {
        method: "POST",
        body: JSON.stringify({
            // userId: 1,
            // title: "Fix my bugs",
            // completed: false
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: password
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}