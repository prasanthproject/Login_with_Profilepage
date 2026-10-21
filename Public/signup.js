const studentName = document.getElementById("studentName");
const age = document.getElementById("age");
const rollNumber = document.getElementById("rollNumber");
const className = document.getElementById("className");
const dob = document.getElementById("dob");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const studentNameError = document.getElementById("studentNameError");
const ageError = document.getElementById("ageError");
const rollNumberError = document.getElementById("rollNumberError");
const classNameError = document.getElementById("classNameError");
const dobError = document.getElementById("dobError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const signupForm = document.getElementById("signupForm");
const signupMessage = document.getElementById("signupMessage");

let isValid;

signupForm.addEventListener("submit", function (event) {
  event.preventDefault();
  signupMessage.textContent = "";
  signupMessage.classList.add("hidden");
  isValid = true;
  studentName1();
  studentAge1();
  studentRollName();
  studentClassName();
  studentDOB();
  studentEmail();
  studentPassword();
  studentConfirmPassword();
  if (!isValid) {
    return;
  }
  const formData = {
    studentName: studentName.value.trim(),
    age: Number(age.value),
    rollNumber: rollNumber.value.trim(),
    className: className.value.trim(),
    dob: dob.value,
    email: email.value.trim(),
    password: password.value,
  };
  fetch("/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      studentName: studentName.value.trim(),
      age: Number(age.value),
      rollNumber: rollNumber.value.trim(),
      className: className.value.trim(),
      dob: dob.value,
      email: email.value.trim(),
      password: password.value,
    }),
  })
    .then(function (response) {
      return response.json().then(function (data) {
        if (!response.ok) {
          throw new Error(data.message);
        }
        return data;
      });
    })
    .then(function (data) {
      console.log(data.message);
      signupForm.reset();
      signupMessage.textContent = data.message;
      signupMessage.className =
        "text-sm text-center text-green-600 md:col-span-2";
    })
    .catch(function (error) {
      console.log("Signup error:", error.message);
      signupMessage.textContent = error.message;
      signupMessage.className =
        "text-sm text-center text-red-600 md:col-span-2";
    });

  console.log(formData);
  console.log("Form submitted successfully");
});

studentName.addEventListener("input", function (e) {
  studentName1();
});
age.addEventListener("input", function (e) {
  studentAge1();
});
rollNumber.addEventListener("input", function (e) {
  studentRollName();
});
className.addEventListener("input", function (e) {
  studentClassName();
});
dob.addEventListener("input", function (e) {
  studentDOB();
});
email.addEventListener("input", function (e) {
  studentEmail();
});
password.addEventListener("input", function (e) {
  studentPassword();
});
confirmPassword.addEventListener("input", function (e) {
  studentConfirmPassword();
});

function studentName1() {
  if (studentName.value.trim() !== "") {
    studentNameError.textContent = "";
  } else {
    studentNameError.textContent = "Student Name is required";
    isValid = false;
  }
}

function studentAge1() {
  const ageValue = age.value.trim();

  if (ageValue === "") {
    ageError.textContent = "Age is required.";
    isValid = false;
  } else if (!Number.isInteger(Number(ageValue)) || Number(ageValue) < 5) {
    ageError.textContent = "Age must be 5 or above.";
    isValid = false;
  } else {
    ageError.textContent = "";
  }
}

function studentRollName() {
  if (rollNumber.value.trim() === "") {
    rollNumberError.textContent = "Roll number is required.";
    isValid = false;
  } else {
    rollNumberError.textContent = "";
  }
}

function studentClassName() {
  if (className.value.trim() === "") {
    classNameError.textContent = "Class is required.";
    isValid = false;
  } else {
    classNameError.textContent = "";
  }
}

function studentDOB() {
  // தேதியை "YYYY-MM-DD" ஆக மாற்றும் சிறிய function
  function formatDate(d) {
    return (
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0")
    );
  }

  const now = new Date();
  const today = formatDate(now); // இன்றைய தேதி
  const threeYearsAgo = formatDate(
    new Date(now.getFullYear() - 5, now.getMonth(), now.getDate()),
  ); // 3 வருடம் முன்

  if (dob.value === "") {
    dobError.textContent = "Date of birth is required.";
    isValid = false;
  } else if (dob.value > today) {
    dobError.textContent = "Date of birth cannot be in the future.";
    isValid = false;
  } else if (dob.value > threeYearsAgo) {
    dobError.textContent = "Student must be at least 3 years old.";
    isValid = false;
  } else {
    dobError.textContent = "";
  }
}

function studentEmail() {
  if (email.value.trim() === "") {
    emailError.textContent = "Email is required.";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  } else {
    emailError.textContent = "";
  }
}

function studentPassword() {
  if (password.value === "") {
    passwordError.textContent = "Password is required.";
    isValid = false;
  }
  // else if (password.value.length < 8) {
  //     passwordError.textContent = "Password must contain at least 8 characters.";
  //     isValid = false;
  //   } else if (!/[A-Z]/.test(password.value)) {
  //     passwordError.textContent = "Include at least one uppercase letter (A-Z).";
  //     isValid = false;
  //   } else if (!/[a-z]/.test(password.value)) {
  //     passwordError.textContent = "Include at least one lowercase letter (a-z).";
  //     isValid = false;
  //   } else if (!/[0-9]/.test(password.value)) {
  //     passwordError.textContent = "Include at least one number (0-9).";
  //     isValid = false;
  //   } else if (!/[^A-Za-z0-9]/.test(password.value)) {
  //     passwordError.textContent =
  //       "Include at least one special character (e.g. @, #, !).";
  //     isValid = false;
  //   }
  else {
    passwordError.textContent = "";
  }
}

function studentConfirmPassword() {
  if (confirmPassword.value === "") {
    confirmPasswordError.textContent = "Please confirm your password.";
    isValid = false;
  } else if (password.value !== confirmPassword.value) {
    confirmPasswordError.textContent = "Passwords do not match.";
    isValid = false;
  } else {
    confirmPasswordError.textContent = "";
  }
}
