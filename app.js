// Load data from clean_df.json
d3.json("clean_df.json").then(function(data) {
    
    /* ===================== Bar Chart ===================== */

    // Bar Chart dimensions and scales
    const marginBar = {top: 20, right: 20, bottom: 70, left: 40},
        widthBar = 600 - marginBar.left - marginBar.right,
        heightBar = 400 - marginBar.top - marginBar.bottom;

    const xBar = d3.scaleBand().range([0, widthBar]).domain(data.map(d => d.location)).padding(0.1);
    const yBar = d3.scaleLinear().range([heightBar, 0]).domain([0, d3.max(data, d => d.total_cases)]);

    const svgBar = d3.select("#barChart").append("svg")
        .attr("width", widthBar + marginBar.left + marginBar.right)
        .attr("height", heightBar + marginBar.top + marginBar.bottom)
        .append("g")
        .attr("transform", "translate(" + marginBar.left + "," + marginBar.top + ")");
    
    svgBar.selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("x", d => xBar(d.location))
        .attr("width", xBar.bandwidth())
        .attr("y", d => yBar(d.total_cases))
        .attr("height", d => heightBar - yBar(d.total_cases))
        .attr("fill", "steelblue");

    svgBar.append("g")
        .attr("transform", "translate(0," + heightBar + ")")
        .call(d3.axisBottom(xBar));

    svgBar.append("g")
        .call(d3.axisLeft(yBar));

    /* ===================== Scatter Plot ===================== */

    // Scatter Plot dimensions and scales
    const marginScatter = {top: 20, right: 20, bottom: 40, left: 40},
        widthScatter = 600 - marginScatter.left - marginScatter.right,
        heightScatter = 400 - marginScatter.top - marginScatter.bottom;

    const xScatter = d3.scaleLinear().range([0, widthScatter]).domain([0, d3.max(data, d => d.gdp_per_capita)]);
    const yScatter = d3.scaleLinear().range([heightScatter, 0]).domain([0, d3.max(data, d => d.total_cases_per_million)]);

    const svgScatter = d3.select("#scatterPlot").append("svg")
        .attr("width", widthScatter + marginScatter.left + marginScatter.right)
        .attr("height", heightScatter + marginScatter.top + marginScatter.bottom)
        .append("g")
        .attr("transform", "translate(" + marginScatter.left + "," + marginScatter.top + ")");
    
    svgScatter.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("cx", d => xScatter(d.gdp_per_capita))
        .attr("cy", d => yScatter(d.total_cases_per_million))
        .attr("r", 5)
        .attr("fill", "red");

    svgScatter.append("g")
        .attr("transform", "translate(0," + heightScatter + ")")
        .call(d3.axisBottom(xScatter));

    svgScatter.append("g")
        .call(d3.axisLeft(yScatter));

    /* ===================== Pie Chart ===================== */

    // Group by continent and aggregate people_vaccinated for the Pie Chart
    const pieData = d3.nest()
        .key(d => d.continent)
        .rollup(v => d3.sum(v, d => d.people_vaccinated))
        .entries(data);

    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(200);

    const svgPie = d3.select("#pieChart").append("svg")
        .attr("width", 500)
        .attr("height", 500)
        .append("g")
        .attr("transform", "translate(250,250)");
    
    svgPie.selectAll("path")
        .data(pie(pieData))
        .enter().append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => d3.interpolateRainbow(i / pieData.length)); // Color gradient for pie chart segments

});


