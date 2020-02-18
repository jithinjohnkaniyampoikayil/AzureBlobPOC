$("#chart").click(function () {
    var fromDate = $("#fromDate").val();
    var toDate = $("#toDate").val();

    var maxPrameters = { type: 1, fromDate: fromDate, toDate: toDate };
    var avgPrameters = { type: 2, fromDate: fromDate, toDate: toDate };
    var minPrameters = { type: 3, fromDate: fromDate, toDate: toDate };
    debugger;
    if (fromDate != "" || toDate != "") {
        if (new Date(fromDate) <= new Date(toDate)) {
            max();
            avg();
            min();
        } else {
            alert("Hola select a valid date range!!");
        }
       
    } else {
        alert("Hola select a date range!!");
    }

    function max() {
        $.ajax({
            type: "POST",
            url: "Chart/",
            data: JSON.stringify(maxPrameters),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (chData) {
                chData.forEach((x) => {
                    var pattern = /Date\(([^)]+)\)/;
                    var results = pattern.exec(x.Date);
                    var dt = new Date(parseFloat(results[1]));
                    x.Date = (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
                });
                var aData = chData;
                var aLabels = [];
                var aDatasets1 = [];
                chData.forEach((x) => {
                    aLabels.push(x.Date);
                    aDatasets1.push(x.Price);
                })

                var dataT = {
                    labels: aLabels,
                    datasets: [{
                        label: [],
                        data: aDatasets1,
                        fill: false,
                        borderWidth: 1
                    }]
                };
                var ctx = $("#MaximumPrices").get(0).getContext("2d");
                var myNewChart = new Chart(ctx, {
                    type: 'bar',
                    data: dataT,
                    options: {
                        responsive: true,
                        title: { display: true, text: 'MaximumPrices' },
                        legend: { position: 'bottom' },
                        scales: {
                            xAxes: [{ gridLines: { display: false }, display: true, scaleLabel: { display: false, labelString: '' } }],
                            yAxes: [{ gridLines: { display: false }, display: true, scaleLabel: { display: false, labelString: '' }, ticks: { stepSize: 50, beginAtZero: true } }]
                        },
                    }
                });
            }
        });
    }
    function avg() {
        $.ajax({
            type: "POST",
            url: "Chart/",
            data: JSON.stringify(avgPrameters),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (chData) {
                chData.forEach((x) => {
                    var pattern = /Date\(([^)]+)\)/;
                    var results = pattern.exec(x.Date);
                    var dt = new Date(parseFloat(results[1]));
                    x.Date = (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
                });
                var aData = chData;
                var aLabels = [];
                var aDatasets1 = [];
                chData.forEach((x) => {
                    aLabels.push(x.Date);
                    aDatasets1.push(x.Price);
                })

                var dataT = {
                    labels: aLabels,
                    datasets: [{
                        label: [],
                        data: aDatasets1,
                        fill: false,
                        borderWidth: 1
                    }]
                };
                var ctx = $("#AveragePrices").get(0).getContext("2d");
                var myNewChart = new Chart(ctx, {
                    type: 'bar',
                    data: dataT,
                    options: {
                        responsive: true,
                        title: { display: true, text: 'AveragePrices' },
                        legend: { position: 'bottom' },
                        scales: {
                            xAxes: [{ gridLines: { display: false }, display: true, scaleLabel: { display: false, labelString: '' } }],
                            yAxes: [{ gridLines: { display: false }, display: true, scaleLabel: { display: false, labelString: '' }, ticks: { stepSize: 50, beginAtZero: true } }]
                        },
                    }
                });
            }
        });
    }
    function min() {
        $.ajax({
            type: "POST",
            url: "Chart/",
            data: JSON.stringify(minPrameters),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (chData) {
                chData.forEach((x) => {
                    var pattern = /Date\(([^)]+)\)/;
                    var results = pattern.exec(x.Date);
                    var dt = new Date(parseFloat(results[1]));
                    x.Date = (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
                });
                var aData = chData;
                var aLabels = [];
                var aDatasets1 = [];
                chData.forEach((x) => {
                    aLabels.push(x.Date);
                    aDatasets1.push(x.Price);
                })

                var dataT = {
                    labels: aLabels,
                    datasets: [{
                        label: [],
                        data: aDatasets1,
                        fill: false,
                        borderWidth: 1
                    }]
                };
                var ctx = $("#MinimumPrices").get(0).getContext("2d");
                var myNewChart = new Chart(ctx, {
                    type: 'bar',
                    data: dataT,
                    options: {
                        responsive: true,
                        title: { display: true, text: 'MinimumPrices' },
                        legend: { position: 'bottom' },
                        scales: {
                            xAxes: [{ gridLines: { display: false }, display: true, scaleLabel: { display: false, labelString: '' } }],
                            yAxes: [{ gridLines: { display: false }, display: true, scaleLabel: { display: false, labelString: '' }, ticks: { stepSize: 50, beginAtZero: true } }]
                        },
                    }
                });
            }
        });
    }

});