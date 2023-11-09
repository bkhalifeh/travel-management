"use strict";

var role = document.getElementById('role');
var containerForm = document.getElementById('containerForm');
var containerField = document.getElementById('containerField');
var containerStudentId = document.getElementById('containerStudentId');
var containerEntryYear = document.getElementById('containerEntryYear');
var studentField = true;
role.addEventListener('change', function (ev) {
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