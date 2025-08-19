// Function to count working days (Mon-Fri) in a given month/year string (YYYY-MM)
function countWorkingDays(monthYear) {
    const [year, month] = monthYear.split('-').map(Number);
    if (!year || !month) return 0;

    const daysInMonth = new Date(year, month, 0).getDate();
    let workingDays = 0;
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day);
        const weekday = date.getDay();
        if (weekday >= 1 && weekday <= 5) workingDays++; // Mon-Fri
    }
    return workingDays;
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const resultDiv = document.getElementById('result');
    const table = document.querySelector('table');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const sname = document.getElementById('sname').value.trim();
        const month = document.getElementById('number').value.trim();
        const daysAttended = parseInt(document.getElementById('num').value, 10);

        if (!sname || !month || isNaN(daysAttended)) {
            resultDiv.textContent = "Please fill all fields correctly.";
            resultDiv.style.color = "red";
            return;
        }

        const totalDays = countWorkingDays(month);

        if (daysAttended > totalDays) {
            resultDiv.textContent = "Days attended cannot be more than total working days.";
            resultDiv.style.color = "red";
            return;
        }
        if (daysAttended < 0 || totalDays <= 0) {
            resultDiv.textContent = "Please enter valid positive numbers.";
            resultDiv.style.color = "red";
            return;
        }

        const attendancePercentage = (daysAttended / totalDays) * 100;
        resultDiv.textContent = `Attendance for ${sname} in month ${month}: ${attendancePercentage.toFixed(2)}%`;
        resultDiv.style.color = "green";

        // Add row to table
        const newRow = table.insertRow(-1);
        newRow.insertCell(0).textContent = sname;
        newRow.insertCell(1).textContent = month;
        newRow.insertCell(2).textContent = attendancePercentage.toFixed(2) + "%";

        form.reset();
    });
});