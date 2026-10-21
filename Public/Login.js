// const loginForm = document.getElementById("loginForm");
// const email = document.getElementById("email");
// const password = document.getElementById("password");
// const emailError = document.getElementById("emailError");
// const passwordError = document.getElementById("passwordError");

// loginForm.addEventListener("submit", function (event) {
//   event.preventDefault();

//   emailError.textContent = "";
//   passwordError.textContent = "";

//   if (email.value.trim() === "") {
//     emailError.textContent = "Email is required.";
//   }

//   if (password.value.trim() === "") {
//     passwordError.textContent = "Password is required.";
//   }
// });

const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    loginError.textContent = "";

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email.value.trim(),
                password: password.value
            })
        });

        if (response.status === 404) {
            loginError.textContent =
                "Login API route not found. Stop the old server and run node Server.js, then open http://localhost:3000/login.html.";
            return;
        }

        const data = await response.json();

        if (!response.ok) {
            loginError.textContent = data.message;
            return;
        }

        window.location.href = "profile.html";
    } catch (error) {
        loginError.textContent = error instanceof SyntaxError
            ? "Server returned an invalid response. Restart the server and try again."
            : "Unable to connect to the server. Check that the server is running at http://localhost:3000.";
        console.log("Login error:", error);
    }
});