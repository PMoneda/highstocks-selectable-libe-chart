/**
 *
 * @param {string} divId div that will render the chart
 * @param {*} serie data to be plotted
 * @param {*} _cnf highstock configurantion to override default config
 */
function SelectableChart(divId, serie,_cnf, onSelectChange) {
    var self = {};
    var seriesOptions = []
    var bindingIdx = {}
    var flag = true;
    var config = {
        chart: {
            zoomType: 'x',
            animation: false,
            lineWidth: 0.3,
            panning: false,
            events: {
                selection: selectPointsByDrag
            },

        },
        scrollbar: {
            enabled: false,
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            layout: 'vertical',
            x: 0,
            y: 100
        },
        rangeSelector: {
            enabled: false
        },
        xAxis: {
            minRange: 5000000,
        },
        yAxis: {
            labels: {
                formatter: function () {
                    return this.value;
                }
            },
            step:2,
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },
        navigator: {
            enabled: false
        },
        plotOptions: {
            series: {
                states: {
                    hover: {
                        animation: false,
                        enabled: false,
                    }
                }
            }
        },

        tooltip: {
            enabled: false
        },
        credits: { enabled: false },


    };


    function standardDeviation(values) {
        var avg = average(values);

        var squareDiffs = values.map(function (value) {
            var diff = value - avg;
            var sqrDiff = diff * diff;
            return sqrDiff;
        });

        var avgSquareDiff = average(squareDiffs);

        var stdDev = Math.sqrt(avgSquareDiff);
        return stdDev;
    }

    function average(data) {
        var sum = data.reduce(function (sum, value) {
            return sum + value;
        }, 0);

        var avg = sum / data.length;
        return avg;
    }

    function selectPointsByDrag(event) {
        var isShift = window.event.shiftKey;
        var ctrlKey = window.event.ctrlKey;
        if (isShift) {
            event.preventDefault();
            selectPoints(event);
        } else if (ctrlKey) {
            event.preventDefault();
            unselectPoints(event);
            //desmarcar região
        }
    }

    function unselectPoints(event) {
        var min = event.xAxis[0].min;
        var max = event.xAxis[0].max;
        if (!seriesOptions[1]) {
            return;
        }
        var selectedSerie = seriesOptions[1].data
        var minIdx = binSearch(selectedSerie, min)
        var maxIdx = binSearch(selectedSerie, max)
        while (selectedSerie[minIdx] && selectedSerie[minIdx][1] === null) {
            minIdx++;
        }
        while (selectedSerie[maxIdx] && selectedSerie[maxIdx][1] === null) {
            maxIdx--;
        }
        for (var i = minIdx; i <= maxIdx; i++) {
            if (i > minIdx && i < maxIdx) {
                //keep series connected
                var value = seriesOptions[1].data[i][1];
                if (value !== null){
                    seriesOptions[1].data[i][1] = null;
                    seriesOptions[0].data[i][1] = value;
                }
            }else{
                var value = seriesOptions[1].data[i][1];
                if (value !== null)
                    seriesOptions[0].data[i][1] = value;
            }
        }



        redrawAllSeries();
    }

    function selectPoints(event) {
        var min = event.xAxis[0].min;
        var max = event.xAxis[0].max;
        var originalSerie = seriesOptions[0].data;
        var minIdx = binSearch(originalSerie, min)
        var maxIdx = binSearch(originalSerie, max)
        while (originalSerie[minIdx][1] === null) {
            minIdx++;
        }
        while (originalSerie[maxIdx][1] === null) {
            maxIdx--;
        }
        for (var i = minIdx; i <= maxIdx; i++) {
            if (i > minIdx && i < maxIdx) {
                //keep series connected
                var value = seriesOptions[0].data[i][1];
                if(value !== null){
                    seriesOptions[0].data[i][1] = null;
                    seriesOptions[1].data[i][1] = value;
                }
            }else{
                var value = seriesOptions[0].data[i][1];
                if(value !== null)
                    seriesOptions[1].data[i][1] = value;
            }
        }
        redrawAllSeries()
    }

    function showSelecteds(){

        if(chart.series.length == 1){
            for(var i=1;i<seriesOptions.length;i++){
                chart.addSeries(seriesOptions[i],true)
            }
        }
    }
    function hideSelecteds(){

        while(chart.series.length > 0){
            chart.series[0].remove();
        }
        chart.addSeries(seriesOptions[0],true)
    }

    function redrawAllSeries() {
        if (seriesOptions[1]) {
            if (seriesOptions[1].data.length === 0) {
                seriesOptions.splice(1, 1);
            }if(seriesOptions[1].data.length > 0 && seriesOptions[1].data.filter(s => s[1] !== null).length === 0){
                seriesOptions.splice(1, 1);
            } else {
                seriesOptions[1].data.sort((a, b) => {
                    return a[0] - b[0];
                })
            }

        }

        while (chart.series.length > 0) {
            chart.series[0].remove();
        }
        for (var i = 0; i < seriesOptions.length; i++) {
            if (seriesOptions[i].data.length > 0) {
                chart.addSeries(seriesOptions[i], true)
            }

        }

        setTimeout(()=>{
            if(typeof onSelectChange === "function"){
                if(seriesOptions[1]){
                    onSelectChange(seriesOptions[1].data);
                }else{
                    onSelectChange([]);
                }

            }
        },10)

    }

    function binSearch(array, value) {
        var total = array.length;
        var pivot = parseInt(total / 2);
        var begin = 0;
        var end = array.length - 1;
        var elem = array[pivot][0];
        while (elem !== value) {
            if (elem > value) {
                end = pivot - 1;
                pivot = begin + parseInt((end - begin) / 2)
            } else if (elem < value) {
                begin = pivot + 1;
                pivot = begin + parseInt((end - begin) / 2)
            }
            if (begin > end) {
                return pivot
            }
            elem = array[pivot][0]
        }
        return pivot;
    }
    var selected = {
        color:"#FF0000",
        data:[]
    }
    for(var i=0;i<serie.data.length;i++){
        selected.data.push([serie.data[i][0],null]);
    }
    seriesOptions.push(serie);
    seriesOptions.push(selected);
    config.series = seriesOptions
    if(_cnf){
        Object.keys(_cnf).forEach(k=>{
            config[k] = _cnf[k]
        })
    }
    var chart = Highcharts.stockChart(divId, config);
    self.chart = chart;
    self.hideSelecteds = hideSelecteds;
    self.showSelecteds = showSelecteds;
    return self;
}

