const body = document.querySelector("body"),
  sidebar = body.querySelector("nav");
sidebarToggle = body.querySelector(".sidebar-toggle");

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

loadData();
function loadData() {
  httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", "/api/data");
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
      jsonData1 = JSON.parse(httpRequest.response);
      update_doughnut(jsonData1);
    }
  };
  httpRequest.send();

  httpRequest2 = new XMLHttpRequest();
  httpRequest2.open("GET", "/api/data3/2021");
  httpRequest2.onreadystatechange = function () {
    if (httpRequest2.readyState === 4 && httpRequest2.status === 200) {
      jsonData2 = JSON.parse(httpRequest2.response);
      update_Pie(jsonData2);
    }
  };
  httpRequest2.send();

  httpRequest3 = new XMLHttpRequest();
  httpRequest3.open("GET", "/api/data2");
  httpRequest3.onreadystatechange = function () {
    if (httpRequest3.readyState === 4 && httpRequest3.status === 200) {
      jsonData3 = JSON.parse(httpRequest3.response);
      update_Lines(jsonData3);
    }
  };
  httpRequest3.send();

  httpRequest4 = new XMLHttpRequest();
  httpRequest4.open("GET", "/api/data4");
  httpRequest4.onreadystatechange = function () {
    if (httpRequest4.readyState === 4 && httpRequest4.status === 200) {
      jsonData4 = JSON.parse(httpRequest4.response);
      update_BigNumbers(jsonData4);
    }
  };

  httpRequest4.send();

  httpRequest5 = new XMLHttpRequest();
  httpRequest5.open("GET", "/api/data5/2021");
  httpRequest5.onreadystatechange = function () {
    if (httpRequest5.readyState === 4 && httpRequest5.status === 200) {
      jsonData5 = JSON.parse(httpRequest5.response);
      update_majors(jsonData5);
    }
  };
  httpRequest5.send();

  httpRequest5_1 = new XMLHttpRequest();
  httpRequest5_1.open("GET", "/api/data5_1");
  httpRequest5_1.onreadystatechange = function () {
    if (httpRequest5_1.readyState === 4 && httpRequest5_1.status === 200) {
      jsonData5_1 = JSON.parse(httpRequest5_1.response);
      update_majors2(jsonData5_1);
    }
  };
  httpRequest5_1.send();

  httpRequest6 = new XMLHttpRequest();
  httpRequest6.open("GET", "/api/data6/2021/SPECIALITE_1");
  httpRequest6.onreadystatechange = function () {
    if (httpRequest6.readyState === 4 && httpRequest6.status === 200) {
      jsonData6 = JSON.parse(httpRequest6.response);
      update_Pie2(jsonData6);
    }
  };
  httpRequest6.send();

  httpRequest7 = new XMLHttpRequest();
  httpRequest7.open("GET", "/api/data8/2021");
  httpRequest7.onreadystatechange = function () {
    if (httpRequest7.readyState === 4 && httpRequest7.status === 200) {
      jsonData7 = JSON.parse(httpRequest7.response);
      update_Radar1(jsonData7);
    }
  };
  httpRequest7.send();
}

var MajorDataSelector = document.getElementById("majors_year");
if (MajorDataSelector) {
  MajorDataSelector.addEventListener("change", function () {
    var selectedValue = MajorDataSelector.value;
    console.log(selectedValue);
    httpRequest2 = new XMLHttpRequest();
    httpRequest2.open("GET", "/api/data5/" + parseInt(selectedValue));
    httpRequest2.onreadystatechange = function () {
      if (httpRequest2.readyState === 4 && httpRequest2.status === 200) {
        jsonData2 = JSON.parse(httpRequest2.response);
        update_majors(jsonData2);
      }
    };
    httpRequest2.send();
  });
}

var dataSelector = document.getElementById("years");
dataSelector.addEventListener("change", function () {
  var selectedValue = dataSelector.value;
  httpRequest2 = new XMLHttpRequest();
  httpRequest2.open("GET", "/api/data3/" + parseInt(selectedValue));
  httpRequest2.onreadystatechange = function () {
    if (httpRequest2.readyState === 4 && httpRequest2.status === 200) {
      jsonData2 = JSON.parse(httpRequest2.response);
      update_Pie(jsonData2);
    }
  };
  httpRequest2.send();
});

var gender_dataSelector = document.getElementById("genderYears");
gender_dataSelector.addEventListener("change", function () {
  var selectedValue = gender_dataSelector.value;
  httpRequest2 = new XMLHttpRequest();
  httpRequest2.open("GET", "/api/data8/" + selectedValue);
  httpRequest2.onreadystatechange = function () {
    if (httpRequest2.readyState === 4 && httpRequest2.status === 200) {
      jsonData2 = JSON.parse(httpRequest2.response);
      update_Radar1(jsonData2);
    }
  };
  httpRequest2.send();
});

var dataSelector1 = document.getElementById("years1");
var dataSelector2 = document.getElementById("majors");
/*dataSelector1.addEventListener('change', function() {        
    var selectedValue1 = dataSelector1.value;
    httpRequest2 = new XMLHttpRequest();
    httpRequest2.open("GET", "/api/data6/"+parseInt(selectedValue1)+"/SPECIALITE_1");
    httpRequest2.onreadystatechange = function () {
      if (httpRequest2.readyState === 4 && httpRequest2.status === 200) {
        jsonData2 = JSON.parse(httpRequest2.response);
        update_Pie2(jsonData2);
      }
    };
    httpRequest2.send();      
});*/
dataSelector2.addEventListener("change", function () {
  selectedValue2 = dataSelector1.value;
  selectedValue3 = dataSelector2.value;
  console.log(selectedValue3);
  httpRequest2 = new XMLHttpRequest();
  httpRequest2.open(
    "GET",
    "/api/data6/" + selectedValue2 + "/" + selectedValue3
  );
  httpRequest2.onreadystatechange = function () {
    if (httpRequest2.readyState === 4 && httpRequest2.status === 200) {
      jsonData2 = JSON.parse(httpRequest2.response);
      update_Pie2(jsonData2);
    }
  };
  httpRequest2.send();
});

function update_Radar(){

}
var radar_chart;
function update_Radar1(jsonData) {
  var labels = jsonData.map(function (e) {
    return e.specialite;
  });

  var data1 = jsonData.map(function (e) {
    return e.male_count;
  });
  var data2 = jsonData.map(function (e) {
    return e.female_count;
  });
  if (radar_chart) {
    radar_chart.destroy();
  }
  radar_chart = new Chart(document.getElementById("radar-chart"), {
    type: "radar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "nombre etudiants",
          fill:true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 99, 132)",
          data: data1,
        },
        {
          label: "nombre etudiants",
          fill: true,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgb(54, 162, 235)",
          pointBackgroundColor: "rgb(54, 162, 235)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(54, 162, 235)",
          data: data2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      title: {
        display: true,
        text: "nombre etudiants par année",
      },
      scale: {
        ticks: {
          beginAtZero : true
        }
    }
    },
  });
}
function update_Lines(jsonData) {
  var labels = jsonData.years;
  for (d of jsonData.datasets) {
    d.fill = false;
    d.borderColor = getRandomColor();
    d.borderWidth = 2;
    d.radius = 1;
  }

  var data = jsonData.datasets;
  new Chart(document.getElementById("line-chart"), {
    type: "line",
    data: {
      labels: labels,
      datasets: data,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: false,
        text: "students number per major ",
      },
      legend: {
        position: "top",
      },
    },
  });
}

var doughnut_chart;
function update_doughnut(jsonData) {
  const labels = jsonData.map(function (e) {
    return e.annee;
  });

  const data = jsonData.map(function (e) {
    return e.nbr_etudaints;
  });
  if (doughnut_chart) {
    doughnut_chart.destroy();
  }
  doughnut_chart = new Chart(document.getElementById("doughnut-chart"), {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: [
            "#3498db", // Blue
            "#e74c3c", // Red
            "#2ecc71", // Green
            
          ],
          data: data,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMin: 30,
              suggestedMax: 100,
            },
          },
        ],
        xAxes: [{}],
      },
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: false,
        text: "Predicted world population (millions) in 2050",
      },
      legend: {
        position: "top",
      },
    },
  });
}

var pie_chart;
function update_Pie(jsonData) {
  const labels = jsonData.map(function (e) {
    return e.specialite;
  });

  const data = jsonData.map(function (e) {
    return e.nbr_etudaints;
  });
  if (pie_chart) {
    pie_chart.destroy();
  }
  pie_chart = new Chart(document.getElementById("pie-chart"), {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: [
            "#3498db", // Blue
            "#e74c3c", // Red
            "#2ecc71", // Green
            "#f39c12", // Yellow
            "#9b59b6", // Purple
            "#34495e", // Dark Gray/Blue
            "#1abc9c", // Turquoise
          ],
          data: data,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMin: 30,
              suggestedMax: 100,
            },
          },
        ],
        xAxes: [{}],
      },
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: false,
        text: "Predicted world population (millions) in 2050",
      },
      legend: {
        position: "top",
      },
    },
  });
}
var pie_chart2;
function update_Pie2(jsonData) {
  var data = jsonData.map(function (e) {
    return [e.pass_percentage, e.fail_percentage];
  });
  colors = [];
  colors.length = 0;
  for (let i = 1; i <= 2; i++) {
    colors.push(getRandomColor());
  }
  if (pie_chart2) {
    pie_chart2.destroy();
  }
  pie_chart2 = new Chart(document.getElementById("pie-chart1"), {
    type: "pie",
    data: {
      labels: ["passed", "failed"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: [
            "#3498db", // Blue
            "#e74c3c", // Turquoise
          ],
          data: data[0],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: false,
        text: "Predicted world population (millions) in 2050",
      },
      legend: {
        position: "top",
      },
    },
  });
}
function getRandomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var hexColor = "#" + r.toString(16) + g.toString(16) + b.toString(16);
  return hexColor;
}

function update_BigNumbers(jsonData) {
  var i = 1;
  sum = 0;
  for (d of jsonData) {
    specialite = document.getElementsByClassName("box" + i)[0];
    label = specialite.getElementsByClassName("text")[0];
    pop = specialite.getElementsByClassName("number")[0];
    label.innerText = d["specialite"];
    pop.innerText = d["nbr_etudaints"] + " Student(s)";
    sum += parseInt(d["nbr_etudaints"]);
    i++;
  }
  all_specialite = document.getElementsByClassName("box8")[0];
  all_label = all_specialite.getElementsByClassName("text")[0];
  all_pop = all_specialite.getElementsByClassName("number")[0];
  all_label.innerText = "all students";
  all_pop.innerText = sum + " Student(s)";
}
function update_majors(jsonData) {
  var i = 1;
  for (d of jsonData) {
    students = document.getElementsByClassName("stud" + i);
    
    students[0].innerText = d["matricule"];
    students[1].innerText = d["nom"];
    students[2].innerText = d["prenom"];
    students[3].innerText = d["specialite"];
    students[4].innerText = d["max"];
    students[5].innerText =
      d["max"] >= 18
        ? "excellent"
        : d["max"] >= 16
        ? "very good"
        : d["max"] >= 14
        ? "good"
        : " pretty good";
    i++;
  }
}
function update_majors2(jsonData) {
  var i = 8;
  for (d of jsonData) {
    students = document.getElementsByClassName("stud" + i);
    students[0].innerText = d["matricule"];
    students[1].innerText = d["nom"];
    students[2].innerText = d["prenom"];
    students[3].innerText = d["specialite"];
    students[4].innerText = d["annee"];
    students[5].innerText = d["max"];
    students[6].innerText =
      d["max"] >= 18
        ? "excellent"
        : d["max"] >= 16
        ? "very good"
        : d["max"] >= 14
        ? "good"
        : " pretty good";
    i++;
  }
}
