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
                gapSize: 1,
                dataGrouping: {
                    approximation: function (arr) {
                        if (arr.length > 0) {
                            var stddev = standardDeviation(arr);
                            //console.log("std deviation: ",stddev)
                            var min = arr[0];
                            arr.forEach(e => { e < min ? min = e : min = min })
                            //console.log("min: ",min)
                            var max = arr[0];
                            arr.forEach(e => { e > max ? max = e : max = max })
                            var absoluteMax = Math.abs(max)
                            var absoluteMin = Math.abs(min)
                            //console.log("max: ",max);
                            var mean = arr.reduce((acc, i) => acc + i) / arr.length;
                            //console.log("mean: ",mean)
                            if ((max-min) > mean + stddev) {
                                
                                if (max - mean > mean - min) {
                                    //console.log("return max")
                                    return max
                                }
                                //console.log("return min")
                                return min
                            }
                            else {
                                //console.log("return mean")
                                return mean
                            }
                        }
                        return null;
                    }
                },
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
        var original = seriesOptions[0].data
        var minIdx = binSearch(selectedSerie, min)
        var maxIdx = binSearch(selectedSerie, max)

        for (var i = minIdx - 1; i <= maxIdx + 1; i++) {
            var current = selectedSerie[i]
            if (current && current[1] !== null) {
                var originalIdx = bindingIdx[current[0]];
                original[originalIdx][1] = current[1];
            }
        }
        if (selectedSerie[minIdx]) {
            selectedSerie[minIdx][1] = null;
        }
        if (selectedSerie[maxIdx]) {
            selectedSerie[maxIdx][1] = null;
        }

        selectedSerie.splice(minIdx + 1, maxIdx - minIdx)
        seriesOptions[1].data = selectedSerie;
        redrawAllSeries();
    }

    function selectPoints(event) {
        var min = event.xAxis[0].min;
        var max = event.xAxis[0].max;
        var originalSerie = seriesOptions[0].data;

        var selecteds = { name: "selecteds", data: [], "color": "#FF0000" }
        if (seriesOptions[1]) {
            selecteds = seriesOptions[1];
        }


        var minIdx = binSearch(originalSerie, min)
        var maxIdx = binSearch(originalSerie, max)
        while (originalSerie[minIdx][1] === null) {
            minIdx++;
        }
        while (originalSerie[maxIdx][1] === null) {
            maxIdx--;
        }
        for (var i = minIdx; i <= maxIdx; i++) {
            var current = seriesOptions[0].data[i]
            if (current[1] === null) {
                continue;
            } else {
                selecteds.data.push([current[0], current[1]]);
                bindingIdx[current[0]] = i
                if (i > minIdx && i < maxIdx) {
                    //keep series connected
                    seriesOptions[0].data[i][1] = null;
                }
            }
        }
        if (!seriesOptions[1]) {
            seriesOptions.push(selecteds);
        }
        //TODO otimizar a questao do q deve e nao deve ser renderizado
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
    seriesOptions.push(serie);
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

