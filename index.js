
// define w & h of svg
const svg_w = 1100;
const svg_h = 740;
// define padding variable
const paddingHor = 30;
const paddingVert = 30;

// adjust on x axis to make bars start just after y axis
const xAdj = paddingHor + 8;

// entering d3.json method
d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
    .then(dataObj => {

        // dataTemp  = data object (dataTemp to feed into parseTime)
        const dataTemp = dataObj.data;
        
        // create parseTime obj for string dates in arrays
        const parseTime = d3.timeParse("%Y-%m-%d")

        // loop through dataTemp -> create new array of x,y data where date is date object
        const dataset = [];
        for (let arr of dataTemp) {
            dataset.push([parseTime(arr[0]), arr[1], arr[0]])
        }

        // make array of just dates for d3.extent
        const justDates = [];
        for (let arr of dataset) {
            justDates.push(arr[0])
        }
        
        // determine earliest & latest date
        const domainDates = d3.extent(justDates) 

        // determin bar width based on how many data points in array
        const barWidth = (svg_w-(paddingHor*2)) / dataObj.data.length

        // create xScale (note this uses scaleTime instead of scaleLinear)
        const xScale = d3.scaleTime()
                         .domain(domainDates)
                         .range([paddingHor, svg_w - paddingHor])

        // yScale domain is 0 to max in set
        const yScale = d3.scaleLinear()
                        .domain([0, d3.max(dataset, (d) => d[1])])
                        .range([svg_h - paddingVert, paddingVert]);

        // xAxis
        const xAxis = d3.axisBottom(xScale)
        
        // yAxis                 
        const yAxis = d3.axisLeft(yScale)

        // select element with class .forSvg to append svg
        const svg = d3.select(".forSvg")
                        .append("svg")
                        .attr("width", svg_w)
                        .attr("height", svg_h)

        // select .forSvg to create a tooltip div
        const tooltip = d3.select(".forSvg")
                        .append("div")
                        .attr("id", "tooltip")

        // creat rect for each data point
        svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        // x adjusted for nice visual effect
        .attr("x", (d, i) => (i*3.8)+xAdj)
        // y adjusted to start visually well with bottom of bars
        .attr("y", (d, i) => yScale(d[1]))
        .attr("width",barWidth)
        .attr("height", (d) => (svg_h - paddingVert)- yScale(d[1]))
        .attr("fill", "#2f4f4f")
        .attr("class", "bar")
        // create data-date and data-gdp properties
        .attr("data-date", (d, i) => d[2])
        .attr("data-gdp",  (d, i) => d[1])
        // create tooltip box on mouseover
        .on("mouseover", function(event, d) {
            // find the x attribute to use in the .html method
            const myX = this.getAttribute('x');

            // use tooltip d3 object defined above and add .html to format
            // format GDP number with toString to add thousands commas 
            tooltip.html(d[2] + "<br>" + " $" + d[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Billion")
                    // put display to "block" instead of none so it appears on mouseover
                    .style("display", "block")
                    .style("left", myX + "px")
                    .style("top", yScale(d[1]) + 25 + "px")
                    // attr added to make it pass tests
                    .attr("data-date", d[2]);
        })
        // put display back to none on mouseout
        .on("mouseout", function() {
            tooltip.style("display", "none")
        })
       
        // add text for y axis
        svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -300)
        .attr('y', 80)
        .text('Gross Domestic Product')

        // add text for title in svg
        svg.append('text')
        .attr('x', svg_w/2-200)
        .attr('y', 60)
        .attr("id", "title")
        .text('GDP of the United States');

        // add x axis 
        svg.append("g")
            .attr("id", "x-axis")
            .attr("transform", "translate(" + 8  + ", " + (svg_h-paddingVert) + ")")
            .call(xAxis);    

        // add y axis (adjusted with "8" so bars start visually nicely at y axis)
        svg.append("g")
            .attr("id", "y-axis")
            .attr("transform", "translate(" + (paddingHor+8) + ", 0)")
            .call(yAxis)

// leaving d3.json method  
})
// log error to console
.catch(e => console.log(e));
