const role = document.getElementById('role');
const containerForm = document.getElementById('containerForm');
const containerField = document.getElementById('containerField');
const containerStudentId = document.getElementById('containerStudentId');
const containerEntryYear = document.getElementById('containerEntryYear');
let studentField = true;


role.addEventListener('change', (ev) => {
    if (studentField && ev.target.value !== 'دانشجو') {
        studentField = false;
        containerForm.removeChild(containerField);
        containerForm.removeChild(containerStudentId);
        containerForm.removeChild(containerEntryYear);
    } else if (!studentField && ev.target.value === 'دانشجو') {
        studentField = true;
        containerForm.appendChild(containerField);
        containerForm.appendChild(containerStudentId);
        containerForm.appendChild(containerEntryYear);
    }
});