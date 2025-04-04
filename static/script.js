document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("nationality")
    ?.addEventListener("change", function () {
      var otherNationalityDiv = document.getElementById("otherNationality");
      if (otherNationalityDiv) {
        otherNationalityDiv.style.display =
          this.value === "Others" ? "block" : "none";
      }
    });

  document
    .getElementById("passportYes")
    ?.addEventListener("change", function () {
      var passportDetailsDiv = document.getElementById("passportDetails");
      if (passportDetailsDiv) {
        passportDetailsDiv.style.display =
          this.value === "Yes" ? "block" : "none";
      }
    });

  document
    .getElementById("passportNo")
    ?.addEventListener("change", function () {
      var passportDetailsDiv = document.getElementById("passportDetails");
      if (passportDetailsDiv) {
        passportDetailsDiv.style.display =
          this.value === "No" ? "none" : "none";
      }
    });

  document
    .getElementById("visaDeniedYes")
    ?.addEventListener("change", function () {
      var visaDeniedDetailsDiv = document.getElementById("visaDeniedDetails");
      if (visaDeniedDetailsDiv) {
        visaDeniedDetailsDiv.style.display =
          this.value === "Yes" ? "block" : "none";
      }
    });

  document
    .getElementById("visaDeniedNo")
    ?.addEventListener("change", function () {
      var visaDeniedDetailsDiv = document.getElementById("visaDeniedDetails");
      if (visaDeniedDetailsDiv) {
        visaDeniedDetailsDiv.style.display =
          this.value === "No" ? "none" : "none";
      }
    });

  document
    .getElementById("overseasYes")
    ?.addEventListener("change", function () {
      var overseasDetailsDiv = document.getElementById("overseasDetails");
      if (overseasDetailsDiv) {
        overseasDetailsDiv.style.display =
          this.value === "Yes" ? "block" : "none";
      }
    });

  document
    .getElementById("overseasNo")
    ?.addEventListener("change", function () {
      var overseasDetailsDiv = document.getElementById("overseasDetails");
      if (overseasDetailsDiv) {
        overseasDetailsDiv.style.display =
          this.value === "No" ? "none" : "none";
      }
    });

  document
    .getElementById("wiproProcessYes")
    ?.addEventListener("change", function () {
      var wiproProcessDetailsDiv = document.getElementById(
        "wiproProcessDetails"
      );
      if (wiproProcessDetailsDiv) {
        wiproProcessDetailsDiv.style.display =
          this.value === "Yes" ? "block" : "none";
      }
    });

  document
    .getElementById("wiproProcessNo")
    ?.addEventListener("change", function () {
      console.log(document.getElementById("wiproProcessNo")); // Added console.log
      var wiproProcessDetailsDiv = document.getElementById(
        "wiproProcessDetails"
      );
      if (wiproProcessDetailsDiv) {
        wiproProcessDetailsDiv.style.display =
          this.value === "No" ? "none" : "none";
      }
    });

  document
    .getElementById("wiproRelativeYes")
    ?.addEventListener("change", function () {
      var wiproRelativeDetailsDiv = document.getElementById(
        "wiproRelativeDetails"
      );
      if (wiproRelativeDetailsDiv) {
        wiproRelativeDetailsDiv.style.display =
          this.value === "Yes" ? "block" : "none";
      }
    });

  document
    .getElementById("wiproRelativeNo")
    ?.addEventListener("change", function () {
      var wiproRelativeDetailsDiv = document.getElementById(
        "wiproRelativeDetails"
      );
      if (wiproRelativeDetailsDiv) {
        wiproRelativeDetailsDiv.style.display =
          this.value === "No" ? "none" : "none";
      }
    });

  document
    .getElementById("illnessYes")
    ?.addEventListener("change", function () {
      var illnessDetailsDiv = document.getElementById("illnessDetails");
      if (illnessDetailsDiv) {
        illnessDetailsDiv.style.display =
          this.value === "Yes" ? "block" : "none";
      }
    });

  document.getElementById("illnessNo")?.addEventListener("change", function () {
    var illnessDetailsDiv = document.getElementById("illnessDetails");
    if (illnessDetailsDiv) {
      illnessDetailsDiv.style.display = this.value === "No" ? "none" : "none";
    }
  });

  document
    .getElementById("commitmentYes")
    ?.addEventListener("change", function () {
      var commitmentDetailsDiv = document.getElementById("commitmentDetails");
      if (commitmentDetailsDiv) {
        commitmentDetailsDiv.style.display =
          this.value === "Yes" ? "block" : "none";
      }
    });

  document
    .getElementById("commitmentNo")
    ?.addEventListener("change", function () {
      var commitmentDetailsDiv = document.getElementById("commitmentDetails");
      if (commitmentDetailsDiv) {
        commitmentDetailsDiv.style.display =
          this.value === "No" ? "none" : "none";
      }
    });

  document
    .getElementById("applicationForm")
    ?.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission

      // Basic form validation (expand as needed)
      var firstName = document.getElementById("firstName").value;
      var lastName = document.getElementById("lastName").value;
      var email = document.getElementById("email").value;
      var declaration = document.getElementById("declaration").checked;
      var dob = document.getElementById("dob").value;
      var date = document.getElementById("date").value;
      var place = document.getElementById("place").value;

      if (
        !firstName ||
        !lastName ||
        !email ||
        !declaration ||
        !dob ||
        !date ||
        !place
      ) {
        alert("Please fill in all required fields.");
        return; // Stop submission if required fields are not filled
      }

      // Email validation
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Collect form data
      const formData = new FormData(this);
      const data = {};
      formData.forEach((value, key) => {
        if (key.endsWith("[]")) {
          const baseKey = key.slice(0, -2);
          if (!data[baseKey]) {
            data[baseKey] = [];
          }
          data[baseKey].push(value);
        } else {
          data[key] = value;
        }
      });

      // Send data to Flask app
      fetch("/submit_form", {
        // Change URL to your Flask endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.text())
        .then((result) => {
          alert("Form submitted successfully!");
          this.reset(); // Reset the form
        })
        .catch((error) => {
          console.error("Error:", error);
          alert(
            "An error occurred while submitting the form. Please try again."
          );
        });
    });
});
