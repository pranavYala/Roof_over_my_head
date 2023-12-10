//check users password
async function checkPassword() {
    var email = document.getElementById("email-login").value;
    const response = await fetch(`https://final-409-api-8d436d40ed6c.herokuapp.com/api/users/?where={"email": "${email}"}`);
    const data = await response.json();
    var pass = data.data[0].password;
    console.log(pass);
    var password = document.getElementById("password-login").value;
    if (password == pass) {
        alert("Login successful");
    } else {
        alert("Login failed");
    }
}

async function createUser() {
    var email = document.getElementById("email-create").value;
    var password = document.getElementById("password-create").value;
    var firstname = document.getElementById("fname").value;
    var lastname = document.getElementById("lname").value;

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