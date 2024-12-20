let authData = {};
let currentUser = null;
let attendanceData = {}; // Store attendance for each user

// Select Language
function selectLanguage(language) {
    alert(`Language selected: ${language}`);
    document.querySelector('.language-page').style.display = 'none';
    document.querySelector('.auth-page').style.display = 'flex';
}

// Save Authentication Data
function saveAuthData() {
    const name = document.getElementById('name').value;
    const mobile = document.getElementById('mobile').value;

    if (!name || !mobile) {
        alert("Please fill out all fields.");
        return;
    }

    authData = { name, mobile };
    currentUser = name.toLowerCase();

    document.querySelector('.auth-page').style.display = 'none';
    document.querySelector('.dashboard-page').style.display = 'block';

    // Show Take Attendance button only for 'ashok rebari'
    if (currentUser === 'ashok rebari') {
        document.getElementById('takeAttendanceButton').style.display = 'block';
    }
}

// Toggle Menu
function toggleMenu() {
    const menu = document.getElementById('menuColumn');
    menu.style.display = menu.style.display === 'none' || menu.style.display === '' ? 'block' : 'none';
}

// Load Home Section
function loadHome() {
    closeAllSections();
    document.getElementById('homeContent').style.display = 'block';
}

// Load Profile Section
function loadProfile() {
    closeAllSections();
    const profileData = document.getElementById('profileData');
    profileData.innerHTML = `
        <h2>Profile</h2>
        <p><strong>Name:</strong> ${authData.name}</p>
        <p><strong>Mobile:</strong> ${authData.mobile}</p>
    `;
    profileData.style.display = 'block';
}

// Load Attendance Section
function loadAttendance() {
    closeAllSections();
    const attendanceSection = document.getElementById('attendance');
    attendanceSection.innerHTML = `
        <h2>Attendance Calendar</h2>
        <div id="calendar">
            ${generateCalendar()}
        </div>
    `;
    attendanceSection.style.display = 'block';
}

// Generate Calendar
function generateCalendar() {
    const daysInMonth = 31; // Example: May
    let calendarHTML = '';
    for (let day = 1; day <= daysInMonth; day++) {
        calendarHTML += `<div>${day}</div>`;
    }
    return calendarHTML;
}

// Show Attendance Form for Ashok Rebari
function showAttendanceForm() {
    closeAllSections();

    if (currentUser === 'ashok rebari') {
        const attendanceForm = document.getElementById('attendanceForm');
        const usersList = [
            { name: "User 1", status: "" },
            { name: "User 2", status: "" },
            { name: "User 3", status: "" },
        ];

        const usersHTML = usersList
            .map(
                (user, index) => `
            <div class="user">
                <span>${user.name}</span>
                <button class="present" id="present-${index}" onclick="markAttendance(${index}, 'present')">Present</button>
                <button class="absent" id="absent-${index}" onclick="markAttendance(${index}, 'absent')">Absent</button>
            </div>
        `
            )
            .join("");

        document.getElementById('usersList').innerHTML = usersHTML;
        attendanceForm.style.display = 'block';
    }
}

// Mark Attendance
function markAttendance(userIndex, status) {
    const presentButton = document.getElementById(`present-${userIndex}`);
    const absentButton = document.getElementById(`absent-${userIndex}`);

    // Update attendance data
    attendanceData[userIndex] = status;

    // Update button styles
    if (status === 'present') {
        presentButton.textContent = 'Marked';
        presentButton.style.backgroundColor = '#6c757d'; // Gray
        absentButton.textContent = 'Absent';
        absentButton.style.backgroundColor = '#dc3545'; // Red
    } else if (status === 'absent') {
        absentButton.textContent = 'Marked';
        absentButton.style.backgroundColor = '#6c757d'; // Gray
        presentButton.textContent = 'Present';
        presentButton.style.backgroundColor = '#28a745'; // Green
    }
}

// Save Attendance
function saveAttendance() {
    console.log("Saved Attendance:", attendanceData);
    alert("Attendance saved successfully.");
}

// Close all sections
function closeAllSections() {
    document.getElementById('homeContent').style.display = 'none';
    document.getElementById('profileData').style.display = 'none';
    document.getElementById('attendance').style.display = 'none';
    document.getElementById('attendanceForm').style.display = 'none';

    // Hide menu if it is open
    document.getElementById('menuColumn').style.display = 'none';
}
