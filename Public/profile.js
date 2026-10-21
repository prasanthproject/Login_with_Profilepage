const profileMessage = document.getElementById("profileMessage");
const profileDetails = document.getElementById("profileDetails");

async function loadProfile() {
    try {
        const response = await fetch("/profile-data");
        const data = await response.json();

        if (!response.ok) {
            window.location.href = "login.html";
            return;
        }

        document.getElementById("studentName").textContent = data.name;
        document.getElementById("age").textContent = data.age;
        document.getElementById("rollNumber").textContent = data.rollNumber;
        document.getElementById("className").textContent = data.className;
        document.getElementById("dob").textContent = data.dob;
        document.getElementById("email").textContent = data.email;

        profileMessage.textContent = "";
        profileDetails.classList.remove("hidden");
    } catch (error) {
        profileMessage.textContent = "Unable to load profile. Please try again.";
        console.log("Profile error:", error);
    }
}

loadProfile();

document.getElementById("logoutButton").addEventListener("click", async function () {
    try {
        const response = await fetch("/logout", { method: "POST" });

        if (response.ok) {
            window.location.href = "login.html";
        } else {
            profileMessage.textContent = "Unable to logout. Please try again.";
        }
    } catch (error) {
        profileMessage.textContent = "Unable to connect to the server.";
    }
});