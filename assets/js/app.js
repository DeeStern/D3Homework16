//Define SVG height and width variables
var svgWidth = 960;
var svgHeight = 500;

//Define margins for SVG 
var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

//Define width and height of plot area
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("data.csv")
  .then(function(data){
  console.log(data);

   
// Parse Data/Cast as numbers
    data.forEach(function(d) {  
        d.obesity = +d.obesity;
        d.poverty = +d.poverty;
    });
    console.log(data[0]);
  

 // Create scale functions
      var xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(data, d => d.poverty)])
        .range([8, width]);

      var yLinearScale = d3.scaleLinear()
        .domain([18, d3.max(data, d => d.obesity)])
        .range([height, 18]);

    //Create Circles
    chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "15")
    .attr("fill", "teal")
    .attr("opacity", .5)
    
  //Create circle labels
   chartGroup.selectAll("text")
   .attr("class", "labels")
   .data(data)
   .enter()
   .append("text")
   .classed("chartText", true)
   .text((d) => d.abbr)
   .style("fill", "white")
   .attr("x", d => xLinearScale(d.poverty) -10)
   .attr("y", d => yLinearScale(d.obesity) +4)
      
    //Create axis functions
      var bottomAxis = d3.axisBottom(xLinearScale);
      var leftAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart
      chartGroup.append("g")
        .attr("transform", `translate(10, ${height})`)
        .call(bottomAxis);

      chartGroup.append("g")
        .call(leftAxis);  
    

    // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 10 - margin.left + 40)
    .attr("x", 10 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Obesity (%)");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("In Poverty (%)");

    });