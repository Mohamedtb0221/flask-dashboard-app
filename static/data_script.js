loadData();
function loadData() {
  httpRequest2 = new XMLHttpRequest();
  httpRequest2.open("GET", "/api/data7/annee/specialite");
  httpRequest2.onreadystatechange = function () {
    if (httpRequest2.readyState === 4 && httpRequest2.status === 200) {
      jsonData2 = JSON.parse(httpRequest2.response);
      createTableElements(jsonData2);
    }
  };
  httpRequest2.send();
}
var table_rows;
const body = document.querySelector("body"),
  sidebar = body.querySelector("nav");
sidebarToggle = body.querySelector(".sidebar-toggle");

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});
function createTableElements(data) {
  var tableBody = document.getElementById("mybody"); // Replace with your actual table body ID
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }
  // Loop through the data array
  for (var i = 0; i < data.length; i++) {
    // Create a new table row
    var row = document.createElement("tr");

    // Define the order of columns based on your desired format
    var columns = [
      "matricule",
      "full_name",
      "sexe",
      "specialite",
      "moyenne",
      "annee",
      "edit",
    ];

    // Loop through the columns array
    for (var j = 0; j < columns.length; j++) {
      // Create a new table cell
      var cell = document.createElement("td");

      // Set the content of the cell using the current column key
      if (columns[j] === "moyenne") {
        var pElement = document.createElement("p");
        if (parseFloat(data[i][columns[j]]) < 10.0) {
          pElement.className = "status cancelled";
        } else {
          pElement.className = "status delivered";
        }
        pElement.textContent = data[i][columns[j]];
        cell.appendChild(pElement);
      } else if (columns[j] === "edit") {
        var button = document.createElement("button");
        button.className = "edit_btn";
        button.id = "login-show1";
        var icon = document.createElement("i");
        icon.className = "uil uil-edit";
        button.appendChild(icon);
        var button2 = document.createElement("button");
        button2.className = "edit_btn delete_btn";
        var icon2 = document.createElement("i");
        icon2.className = "uil uil-trash";
        button2.appendChild(icon2);
        var div = document.createElement("div");
        div.className = "buttons";
        div.appendChild(button);
        div.appendChild(button2);
        var loginModal1 = document.getElementById("login-modal1");
        var closeModalButtons1 = document.querySelectorAll(".close-modal1");

        (function (index) {
          button.addEventListener("click", function () {
            populateLoginModal1(data[index]);
            loginModal1.style.display = "flex";

            fadeIn(loginModal1);
          });
          button2.addEventListener("click", function () {
            if (confirm("are you sure about deleting this student !")) {
              delete_student(data[index].matricule, data[index].annee);
              tableBody.removeChild(document.getElementsByTagName('tr')[index+1])
              console.log(document.getElementsByTagName('tr')[index+1])
            }
          });
        })(i);

        closeModalButtons1.forEach(function (closeModalButton) {
          closeModalButton.addEventListener("click", function () {
            fadeOut(loginModal1);
          });
        });

        cell.appendChild(div);
        // Set the content of the cell using the current column key
      } else {
        cell.textContent = data[i][columns[j]];
      }

      // Append the cell to the row
      row.appendChild(cell);
    }

    // Append the row to the table body
    tableBody.appendChild(row);
  }
  table_rows = document.querySelectorAll("tbody tr");
}

function populateLoginModal1(rowData) {
  console.log("Populating modal with data:", rowData);

  // Replace these with the actual IDs of your input fields in the loginModel1
  var matriculeInput = document.getElementById("matricule1");
  var fullNameInput = document.getElementById("nom1");
  var surnameInput = document.getElementById("prenom1");
  var genderInput = document.getElementById("gender1");
  var majorInput = document.getElementById("majorr1");
  var moyenneInput = document.getElementById("moyenne1");
  var yearInput = document.getElementById("yearr1");

  // Ensure the input fields are found before setting their values
  if (
    matriculeInput &&
    fullNameInput &&
    surnameInput &&
    genderInput &&
    majorInput &&
    moyenneInput &&
    yearInput
  ) {
    // Use setTimeout to delay the setting of values
    setTimeout(function () {
      var nameArray = rowData.full_name.split(" ");

      // Assuming every full name is in "First Last" format
      var firstName = nameArray[0];
      var lastName = nameArray.slice(1).join(" ");
      // Split the full name and update the name and surname fields
      matriculeInput.value = rowData.matricule;
      fullNameInput.value = firstName;
      surnameInput.value = lastName;
      genderInput.value = rowData.sexe;
      majorInput.value = rowData.specialite;
      moyenneInput.value = rowData.moyenne;
      yearInput.value = rowData.annee;

      console.log("Values set successfully.");
    }, 0);
  } else {
    console.error("One or more input fields not found.");
  }
}

function edit_student() {
  var matricule = document.getElementById("matricule1").value;
  var nom = document.getElementById("nom1").value;
  var prenom = document.getElementById("prenom1").value;
  var sexe = document.getElementById("gender1").value;
  var specialite = document.getElementById("majorr1").value;
  var annee = document.getElementById("yearr1").value;
  var moyenne = document.getElementById("moyenne1").value;
  if (
    !matricule ||
    !nom ||
    !prenom ||
    !sexe ||
    !specialite ||
    !annee ||
    !moyenne
  ) {
    alert("fill all the fields !!");
  } else {
    console.log("yes");
    httpRequest = new XMLHttpRequest();
    httpRequest.open("PUT", "/api/modifier/" + matricule);
    httpRequest.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    httpRequest.onreadystatechange = loadData();
    var data =
      "valAnnee1=" +
      annee +
      "&valMatricule1=" +
      matricule +
      "&valNom1=" +
      nom +
      "&valPrenom1=" +
      prenom +
      "&valSexe1=" +
      sexe +
      "&valSpecialite1=" +
      specialite +
      "&valMoyenne1=" +
      moyenne;
    httpRequest.send(data);
    loadData();
  }
}

function delete_student(id, annee) {
  httpRequest = new XMLHttpRequest();
  httpRequest.open("DELETE", "/api/supprimer/" + id + "/" + annee);
  httpRequest.onreadystatechange = delete_stud();
  httpRequest.send();
}
function delete_stud() {
  alert("student deleted with success");
}

var dataSelector = document.getElementById("year");
var dataSelector2 = document.getElementById("major");
dataSelector.addEventListener("change", function () {
  var selectedValue = dataSelector.value;
  var selectedValue2 = dataSelector2.value;
  httpRequest2 = new XMLHttpRequest();
  httpRequest2.open(
    "GET",
    "/api/data7/" + selectedValue + "/" + selectedValue2
  );
  httpRequest2.onreadystatechange = function () {
    if (httpRequest2.readyState === 4 && httpRequest2.status === 200) {
      jsonData2 = JSON.parse(httpRequest2.response);
      console.log(selectedValue);
      createTableElements(jsonData2);
    }
  };
  httpRequest2.send();
});
dataSelector2.addEventListener("change", function () {
  var selectedValue = dataSelector.value;
  var selectedValue2 = dataSelector2.value;
  httpRequest2 = new XMLHttpRequest();
  httpRequest2.open(
    "GET",
    "/api/data7/" + selectedValue + "/" + selectedValue2
  );
  httpRequest2.onreadystatechange = function () {
    if (httpRequest2.readyState === 4 && httpRequest2.status === 200) {
      jsonData2 = JSON.parse(httpRequest2.response);
      createTableElements(jsonData2);
    }
  };
  httpRequest2.send();
});

var search = document.querySelector(".input-group input"),
  table_headings = document.querySelectorAll("thead th");
// 1. Searching for specific data of HTML table
search.addEventListener("input", searchTable);
function searchTable() {
  table_rows.forEach((row, i) => {
    let table_data = row.textContent.toLowerCase(),
      search_data = search.value.toLowerCase();
    console.log(table_data);
    row.classList.toggle("hide", table_data.indexOf(search_data) < 0);
    row.style.setProperty("--delay", i / 25 + "s");
  });

  document.querySelectorAll("tbody tr:not(.hide)").forEach((visible_row, i) => {
    visible_row.style.backgroundColor =
      i % 2 == 0 ? "transparent" : "#0000000b";
  });
}

// 2. Sorting | Ordering data of HTML table

table_headings.forEach((head, i) => {
  let sort_asc = true;
  head.onclick = () => {
    table_headings.forEach((head) => head.classList.remove("active"));
    head.classList.add("active");

    document
      .querySelectorAll("td")
      .forEach((td) => td.classList.remove("active"));
    (table_rows = document.querySelectorAll("tbody tr")),
      table_rows.forEach((row) => {
        row.querySelectorAll("td")[i].classList.add("active");
      });
    head.classList.toggle("asc", sort_asc);
    sort_asc = head.classList.contains("asc") ? false : true;
    console.log("clicked ...");
    sortTable(i, sort_asc);
  };
});
function sortTable(column, sort_asc) {
  [...table_rows]
    .sort((a, b) => {
      let first_row = a
          .querySelectorAll("td")
          [column].textContent.toLowerCase(),
        second_row = b.querySelectorAll("td")[column].textContent.toLowerCase();

      return sort_asc
        ? first_row < second_row
          ? 1
          : -1
        : first_row < second_row
        ? -1
        : 1;
    })
    .map((sorted_row) =>
      document.querySelector("tbody").appendChild(sorted_row)
    );
}

document.addEventListener("DOMContentLoaded", function () {
  var loginShowButton = document.getElementById("login-show");
  var loginModal = document.getElementById("login-modal");
  var closeModalButtons = document.querySelectorAll(".close-modal");

  loginShowButton.addEventListener("click", function () {
    loginModal.style.display = "flex";
    fadeIn(loginModal);
  });

  closeModalButtons.forEach(function (closeModalButton) {
    closeModalButton.addEventListener("click", function () {
      fadeOut(loginModal);
    });
  });
});

function fadeIn(element) {
  var opacity = 0;
  element.style.opacity = opacity;

  var fadeInInterval = setInterval(function () {
    if (opacity < 1) {
      opacity += 0.1;
      element.style.opacity = opacity;
    } else {
      clearInterval(fadeInInterval);
    }
  }, 20);
}

function fadeOut(element) {
  var opacity = 1;
  element.style.opacity = opacity;

  var fadeOutInterval = setInterval(function () {
    if (opacity > 0) {
      opacity -= 0.1;
      element.style.opacity = opacity;
    } else {
      element.style.display = "none";
      clearInterval(fadeOutInterval);
    }
  }, 5);
}

function add_student() {
  var matricule = document.getElementById("matricule").value;
  var nom = document.getElementById("nom").value;
  var prenom = document.getElementById("prenom").value;
  var sexe = document.getElementById("gender").value;
  var specialite = document.getElementById("majorr").value;
  var annee = document.getElementById("yearr").value;
  var moyenne = document.getElementById("moyenne").value;
  if (
    !matricule ||
    !nom ||
    !prenom ||
    !sexe ||
    !specialite ||
    !annee ||
    !moyenne
  ) {
    alert("fill all the fields !!");
  } else {
    console.log("yes");
    httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "/api/ajouter");
    httpRequest.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === 4 && httpRequest.status === 201) {
        console.log("yes");
        resp = JSON.parse(httpRequest.response);
      }
    };
    var data =
      "valAnnee=" +
      annee +
      "&valMatricule=" +
      matricule +
      "&valNom=" +
      nom +
      "&valPrenom=" +
      prenom +
      "&valSexe=" +
      sexe +
      "&valSpecialite=" +
      specialite +
      "&valMoyenne=" +
      moyenne;
    httpRequest.send(data);
    document.getElementById("matricule").value = "";
    document.getElementById("nom").value = "";
    document.getElementById("prenom").value = "";
    document.getElementById("moyenne").value = "";
  }
}
