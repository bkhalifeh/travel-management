/**
 * App user list
 */
'use strict'; // Datatable (jquery)

$(function () {
  var dtUserTable = $('.datatables-users'),
      statusObj = {
    1: {
      title: 'در انتظار',
      "class": 'bg-label-warning'
    },
    2: {
      title: 'فعال',
      "class": 'bg-label-success'
    },
    3: {
      title: 'غیرفعال',
      "class": 'bg-label-secondary'
    }
  };
  var userView = 'app-user-view-account.html'; // Users List datatable

  if (dtUserTable.length) {
    dtUserTable.DataTable({
      ajax: '/user',
      // JSON file to add data
      columns: [// columns according to JSON
      {
        data: ''
      }, {
        data: 'full_name'
      }, {
        data: 'role'
      }, // { data: 'current_plan' },
      // { data: 'billing' },
      // { data: 'status' },
      {
        data: ''
      }],
      columnDefs: [{
        // For Responsive
        className: 'control',
        orderable: false,
        searchable: false,
        responsivePriority: 2,
        targets: 0,
        render: function render(data, type, full, meta) {
          return '';
        }
      }, {
        // User full name and email
        targets: 1,
        responsivePriority: 4,
        render: function render(data, type, full, meta) {
          var $name = full['full_name'],
              $email = full['email'],
              $image = full['avatar'];

          if ($image) {
            // For Avatar image
            var $output = '<img src="' + $image + '" alt="آواتار" class="rounded-circle">';
          } else {
            // For Avatar badge
            //   var stateNum = Math.floor(Math.random() * 6) + 1;
            //   var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
            //   var $state = states[stateNum],
            //     $name = full['full_name'],
            //     $initials = $name.split(' ').slice(0, 2).map(word => word[0]).join('‌') || '';
            //   $output = '<span class="avatar-initial rounded-circle bg-label-' + $state + '">' + $initials + '</span>';
            $output = '';
          } // Creates full output for row


          var $row_output = '<div class="d-flex justify-content-left align-items-center">' + '<div class="avatar-wrapper">' + '<div class="avatar avatar-sm me-3">' + $output + '</div>' + '</div>' + '<div class="d-flex flex-column">' + '<span class="fw-semibold">' + $name + '</span></a>' + '<small class="text-muted">' + $email + '</small>' + '</div>' + '</div>';
          return $row_output;
        }
      }, {
        // User Role
        targets: 2,
        render: function render(data, type, full, meta) {
          var $role = full['role'];
          var roleBadgeObj = {
            'عضو': '<span class="badge badge-center rounded-pill bg-label-primary w-px-30 h-px-30 me-2"><i class="bx bx-universal-access bx-xs"></i></span>',
            'معاون': '<span class="badge badge-center rounded-pill bg-label-info w-px-30 h-px-30 me-2"><i class="bx bx-award bx-xs"></i></span>',
            'مدیر': '<span class="badge badge-center rounded-pill bg-label-warning w-px-30 h-px-30 me-2"><i class="bx bx-crown bx-xs"></i></span>'
          }; // return "<span class='text-truncate d-flex align-items-center'>" + roleBadgeObj[$role] + $role + '</span>';

          return "<span class='text-truncate d-flex align-items-center'>" + $role + '</span>';
        }
      }, {
        // Actions
        targets: -1,
        title: 'عمل ها',
        searchable: false,
        orderable: false,
        render: function render(data, type, full, meta) {
          var id = full['id'];
          var r = "\n<div class=\"demo-inline-spacing\">\n    <button type=\"button\" class=\"btn btn-icon btn-outline-info\" data-bs-target=\"#SHOW".concat(id, "\", data-bs-toggle=\"modal\">\n        <span class=\"tf-icons bx bx-show\"></span>\n    </button>\n    <button type=\"button\" class=\"btn btn-icon btn-outline-warning\" data-bs-target=\"#EDIT").concat(id, "\", data-bs-toggle=\"modal\">\n        <span class=\"tf-icons bx bx-edit\"></span>\n    </button>\n    <a href=\"/user/delete/").concat(id, "\" class=\"btn btn-icon btn-outline-danger\">\n        <span class=\"tf-icons bx bx-trash\"></span>\n    </a>\n</div>\n");
          return r; //return '<a href="' + userView + '" class="btn btn-sm btn-icon"><i class="bx bx-show-alt"></i></a>';
        }
      }],
      //order: [[1, 'asc']],
      dom: '<"row mx-2"' + '<"col-sm-12 col-md-4 col-lg-6" l>' + '<"col-sm-12 col-md-8 col-lg-6"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-md-end justify-content-center align-items-center flex-sm-nowrap flex-wrap"<"me-4 me-sm-3 ms-4 ms-sm-0"f><"user_role w-px-200 pb-3 pb-sm-0">>>' + '>t' + '<"row mx-2"' + '<"col-sm-12 col-md-6"i>' + '<"col-sm-12 col-md-6"p>' + '>',
      language: {
        sLengthMenu: '_MENU_',
        search: 'جستجو:',
        searchPlaceholder: 'جستجو ...'
      },
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function header(row) {
              var data = row.data();
              return 'جزئیات ' + data['full_name'];
            }
          }),
          type: 'column',
          renderer: function renderer(api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
              ? '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' + '<td>' + col.title + ':' + '</td> ' + '<td>' + col.data + '</td>' + '</tr>' : '';
            }).join('');
            return data ? $('<table class="table"/><tbody />').append(data) : false;
          }
        }
      },
      initComplete: function initComplete() {
        // Adding role filter once table initialized
        this.api().columns(2).every(function () {
          var column = this;
          var select = $('<select id="UserRole" class="form-select text-capitalize"><option value=""> انتخاب نقش </option></select>').appendTo('.user_role').on('change', function () {
            var val = $.fn.dataTable.util.escapeRegex($(this).val());
            column.search(val ? '^' + val + '$' : '', true, false).draw();
          });
          column.data().unique() //.sort()
          .each(function (d, j) {
            select.append('<option value="' + d + '" class="text-capitalize">' + d + '</option>');
          });
        });
      }
    });
  } // Filter form control to default size
  // ? setTimeout used for multilingual table initialization


  setTimeout(function () {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);
}); // (function () {
//   // On edit role click, update text
//   var roleEditList = document.querySelectorAll('.role-edit-modal'),
//     roleAdd = document.querySelector('.add-new-role'),
//     roleTitle = document.querySelector('.role-title');
//   roleAdd.onclick = function () {
//     roleTitle.innerHTML = 'افزودن نقش جدید'; // reset text
//   };
//   if (roleEditList) {
//     roleEditList.forEach(function (roleEditEl) {
//       roleEditEl.onclick = function () {
//         roleTitle.innerHTML = 'ویرایش نقش'; // reset text
//       };
//     });
//   }
// })();