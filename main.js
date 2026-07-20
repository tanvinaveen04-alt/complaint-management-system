console.log("main.js loaded");

document.addEventListener("DOMContentLoaded", function () {

    // ===========================
    // Register Form
    // ===========================
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const fullName = document.getElementById("fullName").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            const user = {
                fullName,
                email,
                phone,
                password
            };

            localStorage.setItem("user", JSON.stringify(user));

            alert("Registration Successful!");
            window.location.href = "login.html";
        });
    }

    // ===========================
    // Login Form
    // ===========================
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;

            const savedUser = JSON.parse(localStorage.getItem("user"));

            if (
                savedUser &&
                email === savedUser.email &&
                password === savedUser.password
            ) {
                alert("Login Successful!");
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid Email or Password!");
            }
        });
    }

    // ===========================
    // Complaint Form
    // ===========================
    const complaintForm = document.getElementById("complaintForm");

    if (complaintForm) {
        complaintForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const title = document.getElementById("title").value;
            const category = document.getElementById("category").value;
            const priority = document.getElementById("priority").value;
            const description = document.getElementById("description").value;

            const complaint = {
                id: Date.now(),
                title,
                category,
                priority,
                description,
                status: "Pending"
            };

            let complaints =
                JSON.parse(localStorage.getItem("complaints")) || [];

            complaints.push(complaint);

            localStorage.setItem(
                "complaints",
                JSON.stringify(complaints)
            );

            alert("Complaint Registered Successfully!");
            window.location.href = "my-complaints.html";
        });
    }

    // ===========================
    // Display Complaints
    // ===========================
    const complaintsList = document.getElementById("complaintsList");

    if (complaintsList) {
        const complaints =
            JSON.parse(localStorage.getItem("complaints")) || [];

        if (complaints.length === 0) {
            complaintsList.innerHTML =
                "<h3>No complaints registered.</h3>";
        } else {
            complaints.forEach(function (complaint, index) {
                complaintsList.innerHTML += `
                    <div class="complaint-card">
                        <h2>${complaint.title}</h2>

                        <p><strong>Category:</strong> ${complaint.category}</p>

                        <p><strong>Priority:</strong> ${complaint.priority}</p>

                        <p><strong>Status:</strong> ${complaint.status}</p>

                        <p>${complaint.description}</p>

                        <button onclick="deleteComplaint(${index})">
                            Delete
                        </button>
                    </div>
                `;
            });
        }
    }

    // ===========================
    // Welcome Message
    // ===========================
    const welcomeMessage = document.getElementById("welcomeMessage");

    if (welcomeMessage) {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            welcomeMessage.innerHTML =
                "Welcome, " + user.fullName + "!";
        }
    }

    // ===========================
    // Dashboard Statistics
    // ===========================
    const allComplaints =
        JSON.parse(localStorage.getItem("complaints")) || [];

    const totalComplaints =
        document.getElementById("totalComplaints");

    const pendingComplaints =
        document.getElementById("pendingComplaints");

    const resolvedComplaints =
        document.getElementById("resolvedComplaints");

    if (totalComplaints) {
        totalComplaints.innerHTML = allComplaints.length;

        pendingComplaints.innerHTML =
            allComplaints.filter(c => c.status === "Pending").length;

        resolvedComplaints.innerHTML =
            allComplaints.filter(c => c.status === "Resolved").length;
    }

    // ===========================
    // Admin Login
    // ===========================
    const adminLoginForm =
        document.getElementById("adminLoginForm");

    if (adminLoginForm) {
        adminLoginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email =
                document.getElementById("adminEmail").value.trim();

            const password =
                document.getElementById("adminPassword").value;

            if (
                email === "admin@complaintms.com" &&
                password === "admin123"
            ) {
                alert("Welcome Admin");
                window.location.href = "admin.html";
            } else {
                alert("Invalid Admin Credentials");
            }
        });
    }

});

// ===========================
// Functions outside DOMContentLoaded
// ===========================

function logout() {
    window.location.href = "login.html";
}

function togglePassword() {
    const password =
        document.getElementById("password");

    if (password) {
        password.type =
            password.type === "password"
                ? "text"
                : "password";
    }
}

function toggleAdminPassword() {
    const password =
        document.getElementById("adminPassword");

    if (password) {
        password.type =
            password.type === "password"
                ? "text"
                : "password";
    }
}

function deleteComplaint(index) {

    let complaints =
        JSON.parse(localStorage.getItem("complaints")) || [];

    complaints.splice(index, 1);

    localStorage.setItem(
        "complaints",
        JSON.stringify(complaints)
    );

    location.reload();
}
// ADMIN DASHBOARD

const adminComplaintsList =
    document.getElementById("adminComplaintsList");

if (adminComplaintsList) {

    const complaints =
        JSON.parse(localStorage.getItem("complaints")) || [];

    if (complaints.length === 0) {

        adminComplaintsList.innerHTML =
            "<h3>No complaints available.</h3>";

    } else {

        complaints.forEach(function (complaint, index) {

            adminComplaintsList.innerHTML += `

                <div class="complaint-card">

                    <h2>${complaint.title}</h2>

                    <p>
                        <strong>Category:</strong>
                        ${complaint.category}
                    </p>

                    <p>
                        <strong>Priority:</strong>
                        ${complaint.priority}
                    </p>

                    <p>
                        <strong>Description:</strong>
                        ${complaint.description}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        ${complaint.status}
                    </p>

                    <button onclick="markResolved(${index})">
                        Mark as Resolved
                    </button>

                </div>

            `;

        });

    }

}
function markResolved(index) {

    let complaints =
        JSON.parse(localStorage.getItem("complaints")) || [];

    complaints[index].status = "Resolved";

    localStorage.setItem(
        "complaints",
        JSON.stringify(complaints)
    );

    alert("Complaint marked as Resolved!");

    location.reload();

}