// Online Hospital Management System
// Main JavaScript File

const API_BASE_URL = "https://hospital-management-api-2fqs.onrender.com";

console.log("MediCare Hospital Website Loaded Successfully!");

// =====================================================
// PATIENT REGISTRATION
// =====================================================

async function registerPatient(event) {
    event.preventDefault();
    
    const name = document.getElementById("fullName")?.value;
    const email = document.getElementById("email")?.value;
    const phone = document.getElementById("phone")?.value;
    const password = document.getElementById("password")?.value;
    const confirmPassword = document.getElementById("confirmPassword")?.value;
    const age = document.getElementById("age")?.value;
    const gender = document.getElementById("gender")?.value;
    const address = document.getElementById("address")?.value;

    if (!name || !email || !phone || !password || !age || !gender || !address) {
        alert("Please fill all fields");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/patients/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                password,
                age: parseInt(age),
                gender,
                address
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registration successful! Please login.");
            window.location.href = "login.html";
        } else {
            alert(data.message || "Registration failed");
        }
    } catch (error) {
        console.error("Registration error:", error);
        alert("An error occurred during registration");
    }
}

// =====================================================
// PATIENT LOGIN
// =====================================================

async function loginPatient(event) {
    event.preventDefault();
    
    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")?.value;

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/patients/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("patientId", data.patient.id);
            localStorage.setItem("patientName", data.patient.name);
            alert("Login successful!");
            window.location.href = "patient-dashboard.html";
        } else {
            alert(data.message || "Login failed");
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login");
    }
}

// =====================================================
// DOCTOR LOGIN
// =====================================================

async function loginDoctor(event) {
    event.preventDefault();
    
    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")?.value;

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/doctors/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("doctorId", data.doctor.id);
            localStorage.setItem("doctorName", data.doctor.name);
            alert("Login successful!");
            window.location.href = "doctor-dashboard.html";
        } else {
            alert(data.message || "Login failed");
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login");
    }
}

// =====================================================
// ADMIN LOGIN
// =====================================================

async function loginAdmin(event) {
    event.preventDefault();
    
    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")?.value;

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/admin/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("adminId", data.admin.id);
            localStorage.setItem("adminName", data.admin.name);
            alert("Login successful!");
            window.location.href = "admin-dashboard.html";
        } else {
            alert(data.message || "Login failed");
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login");
    }
}

// =====================================================
// LOGOUT
// =====================================================

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}

// =====================================================
// DOCTOR SELECTION
// =====================================================

async function loadDoctors() {
    const departmentSelect = document.getElementById("department");
    const doctorSelect = document.getElementById("doctor");
    
    if (!departmentSelect || !doctorSelect) return;

    try {
        const response = await fetch(`${API_BASE_URL}/doctors`);
        const data = await response.json();

        departmentSelect.addEventListener("change", function() {
            doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
            const filteredDoctors = data.doctors.filter(doc => 
                doc.department === this.value
            );
            
            filteredDoctors.forEach(doctor => {
                const option = document.createElement("option");
                option.value = doctor._id;
                option.textContent = `${doctor.name} - ${doctor.specialization}`;
                doctorSelect.appendChild(option);
            });
        });
    } catch (error) {
        console.error("Error loading doctors:", error);
    }
}

// =====================================================
// APPOINTMENT BOOKING
// =====================================================

async function bookAppointment(event) {
    event.preventDefault();
    
    const patientId = localStorage.getItem("patientId");
    const patientName = document.getElementById("patientName")?.value;
    const phone = document.getElementById("phone")?.value;
    const email = document.getElementById("email")?.value;
    const age = document.getElementById("age")?.value;
    const department = document.getElementById("department")?.value;
    const doctor = document.getElementById("doctor")?.value;
    const date = document.getElementById("date")?.value;
    const time = document.getElementById("time")?.value;
    const problem = document.getElementById("problem")?.value;

    if (!patientId || !patientName || !phone || !email || !age || !department || !doctor || !date || !time) {
        alert("Please fill all required fields");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/appointments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                patientId,
                patientName,
                phone,
                email,
                age: parseInt(age),
                department,
                doctor,
                date,
                time,
                problem: problem || ""
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Appointment booked successfully!");
            window.location.href = "patient-dashboard.html";
        } else {
            alert(data.message || "Booking failed");
        }
    } catch (error) {
        console.error("Booking error:", error);
        alert("An error occurred while booking appointment");
    }
}

// =====================================================
// PAGE INITIALIZATION
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
    loadDoctors();
    
    // Attach event listeners to forms by ID
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        // Determine which page we're on based on URL
        if (window.location.pathname.includes("register")) {
            registerForm.addEventListener("submit", registerPatient);
        } else if (window.location.pathname.includes("appointment")) {
            registerForm.addEventListener("submit", bookAppointment);
        } else if (window.location.pathname.includes("login")) {
            registerForm.addEventListener("submit", function(e) {
                if (window.location.pathname.includes("doctor")) {
                    loginDoctor(e);
                } else if (window.location.pathname.includes("admin")) {
                    loginAdmin(e);
                } else {
                    loginPatient(e);
                }
            });
        }
    }
});
