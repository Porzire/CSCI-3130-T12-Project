var simplify = false;

function draw(selector, username, interval) {
    // Retrive data from database and write to tsv file.
    $.ajax({
        type: 'POST',
        url: 'php/mySQL.php',
        async: false,
        data: {
            func: 'writeData',
            username: username,
            interval: interval
        }
    });
    // Set the constants of the graph.
    var WIDTH = $(window).width() > 600 ? 600 : $(window).width();
    var HEIGHT = 400;
    // Set simplify.
    if (WIDTH / interval < 60) {
        simplify = true;
    }

    // Set the location of the graph.
    var margin = {top: 80, right: 80, bottom: 80, left: 80},
        width = WIDTH - margin.left - margin.right,
        height = HEIGHT - margin.top - margin.bottom;

    // Create Axis.
    // Create x-Axis.
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    // Create left y-Axis.
    var y0 = d3.scale.linear().domain([0, 3000]).range([height, 0]);
    var yAxisLeft = d3.svg.axis().scale(y0).ticks(6).orient("left");
    // Create right y-Axis.
    var y1 = d3.scale.linear().domain([0, 3000]).range([height, 0]);
    var yAxisRight = d3.svg.axis().scale(y1).ticks(6).orient("right");

    var svg = d3.select(selector)
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("class", "graph")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Get and process the data file.
    d3.tsv("tmp/data.tsv", type, function(error, data) {
        // Search the maximum value in the data.
        var max = 0;
        for (var i = 0; i < data.length; i++) {
            max = Math.max(max, data[i].food, data[i].sport);
        }
        // Set date to x-Axis.
        x.domain(data.map(function(d) { return d.date; }));
        y0.domain([0, max]);
        y1.domain([0, max]);
        //alert(d3.max(d3.tsv.parseRows(data)));
        // Append x-Axis data.
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        // Append y-Axis left data.
        svg.append("g")
                .attr("class", "y axis axisLeft")
                .attr("transform", "translate(0,0)")
                .call(yAxisLeft)
            .append("text")
                .attr("y", 6)
                .attr("dx", "2em")
                .attr("dy", "-2em")
                .style("text-anchor", "end")
                .text("Gain");
        // Append y-Axis right data.
        svg.append("g")
                .attr("class", "y axis axisRight")
                .attr("transform", "translate(" + (width) + ",0)")
                .call(yAxisRight)
            .append("text")
                .attr("y", 6)
                .attr("dy", "-2em")
                .attr("dx", "2em")
                .style("text-anchor", "end")
                .text("Consumed");

        bars = svg.selectAll(".bar").data(data).enter();

        // Draw rectangle for food data.
        bars.append("rect")
            .attr("class", "bar1")
            .attr("x", function(d) { return x(d.date); })
            .attr("width", x.rangeBand()/2)
            .attr("y", function(d) { return y0(d.food); })
            .attr("height", function(d,i,j) { return height - y0(d.food); }); 
        // Draw rectangle for sport data.
        bars.append("rect")
            .attr("class", "bar2")
            .attr("x", function(d) { return x(d.date) + x.rangeBand()/2; })
            .attr("width", x.rangeBand() / 2)
            .attr("y", function(d) { return y1(d.sport); })
            .attr("height", function(d,i,j) { return height - y1(d.sport); }); 
    });

    // Accessor of the data row.
    function type(d) {
        if (simplify) {
            d.date = d.date.split('/')[1]; 
        }
        return d;
    }
}
