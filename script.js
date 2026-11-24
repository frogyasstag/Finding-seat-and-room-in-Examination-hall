// Student Examination Database
const students = {
    "12619685": { name: "Sakshi Verma", course: "CSE326 - Internet Programming", block: "Block 34", room: "201", seat: "A2", shift: "10:00 AM - 01:00 PM" },
    "101": { name: "Aarav Singh", course: "CSE326 - Internet Programming", block: "Block 34", room: "201", seat: "A1", shift: "10:00 AM - 01:00 PM" },
    "102": { name: "Priya Nair", course: "CSE326 - Internet Programming", block: "Block 34", room: "201", seat: "A3", shift: "10:00 AM - 01:00 PM" },
    "103": { name: "Rohan Verma", course: "CSE326 - Internet Programming", block: "Block 34", room: "201", seat: "B2", shift: "10:00 AM - 01:00 PM" },
    "104": { name: "Ananya Gupta", course: "INT108 - Python Programming", block: "Block 32", room: "105", seat: "B4", shift: "10:00 AM - 01:00 PM" },
    "105": { name: "Karan Bhatia", course: "INT108 - Python Programming", block: "Block 32", room: "105", seat: "C1", shift: "10:00 AM - 01:00 PM" },
    "106": { name: "Sneha Khanna", course: "MTH165 - Mathematics", block: "Block 38", room: "302", seat: "C3", shift: "02:00 PM - 05:00 PM" },
    "107": { name: "Vikram Rao", course: "MTH165 - Mathematics", block: "Block 38", room: "302", seat: "D1", shift: "02:00 PM - 05:00 PM" },
    "108": { name: "Meera Joshi", course: "MEC136 - Engineering Graphics", block: "Block 34", room: "CAD-2", seat: "D2", shift: "10:00 AM - 01:00 PM" },
    "109": { name: "Ishita Kulkarni", course: "CSE111 - Computing", block: "Block 32", room: "401", seat: "D3", shift: "02:00 PM - 05:00 PM" },
    "110": { name: "Riya Malhotra", course: "INT335 - Design Thinking", block: "Block 38", room: "Hall-A", seat: "D4", shift: "10:00 AM - 01:00 PM" }
};

const allSeats = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4", "D1", "D2", "D3", "D4"];

// Page 1: Seat Finder Logic
const seatForm = document.getElementById("seat-form");
if (seatForm) {
    seatForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const inputVal = document.getElementById("roll-number").value.trim();
        renderSeatResult(inputVal);
    });
}

function quickSearch(roll) {
    const input = document.getElementById("roll-number");
    if (input) {
        input.value = roll;
        renderSeatResult(roll);
    }
}

function renderSeatResult(roll) {
    const resultPanel = document.getElementById("result-panel");
    const student = students[roll];

    if (student) {
        const seatMapHTML = allSeats.map(seatCode => {
            const isAssigned = seatCode === student.seat;
            return `<div class="desk ${isAssigned ? "active-seat" : ""}">${seatCode}${isAssigned ? " ★" : ""}</div>`;
        }).join("");

        resultPanel.innerHTML = `
            <div class="slip-header">
                <div>
                    <h2>Official Seating Slip</h2>
                    <small>Roll / Reg. No: <strong>${roll}</strong></small>
                </div>
                <span class="slip-status">Allotted</span>
            </div>

            <div class="slip-grid">
                <div class="slip-field">
                    <span>Student Name</span>
                    <strong>${student.name}</strong>
                </div>
                <div class="slip-field">
                    <span>Course</span>
                    <strong>${student.course}</strong>
                </div>
                <div class="slip-field">
                    <span>Academic Block</span>
                    <strong>${student.block}</strong>
                </div>
                <div class="slip-field">
                    <span>Shift Timing</span>
                    <strong>${student.shift}</strong>
                </div>
                <div class="slip-field highlight">
                    <span>Room Number</span>
                    <strong>${student.room}</strong>
                </div>
                <div class="slip-field highlight">
                    <span>Assigned Seat</span>
                    <strong>${student.seat}</strong>
                </div>
            </div>

            <div class="hall-map">
                <div class="board-bar">INVIGILATOR DESK &amp; WHITEBOARD (FRONT)</div>
                <div class="desk-grid">${seatMapHTML}</div>
            </div>
        `;
    } else {
        resultPanel.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">⚠️</div>
                <h3>No Record Found for "${roll}"</h3>
                <p>Please verify your roll number or raise an urgent request on the <a href="guidelines.html#helpdesk">Exam Cell Helpdesk</a> page.</p>
            </div>
        `;
    }
}

// Page 2: Exam Schedule Filter
function filterSchedule() {
    const searchInput = document.getElementById("schedule-search").value.toLowerCase();
    const blockFilter = document.getElementById("block-filter").value;
    const rows = document.querySelectorAll("#exam-table tbody tr");

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        const matchesSearch = text.includes(searchInput);
        const matchesBlock = blockFilter === "ALL" || row.innerText.includes(blockFilter);
        row.style.display = (matchesSearch && matchesBlock) ? "" : "none";
    });
}

// Page 3: Helpdesk Form Submission
const helpdeskForm = document.getElementById("helpdesk-form");
if (helpdeskForm) {
    helpdeskForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("student-name").value.trim();
        const reg = document.getElementById("student-reg").value.trim();
        const issue = document.getElementById("issue-type").value;
        const ticketId = "EXM-" + Math.floor(1000 + Math.random() * 9000);

        const responseBox = document.getElementById("ticket-response");
        responseBox.style.display = "block";
        responseBox.innerHTML = `Ticket <strong>${ticketId}</strong> generated for <strong>${name} (${reg})</strong> regarding <em>${issue}</em>. The Examination Control Room will update your allotment within 30 minutes.`;
        helpdeskForm.reset();
    });
}