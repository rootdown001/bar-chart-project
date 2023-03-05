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
        // determin bar width based on how many data points in array
        const barWidth = (svg_w-(paddingHor*2)) / dataObj.data.length
        // dataset = data object
        const dataset = dataObj.data;
        // console.log("🚀 ~ file: index.js:21 ~ dataset:", dataset)
        

        // const xScale = d3.scaleLinear()
        //                 .domain([0, d3.max(dataset. (d) => )])
        //                 .range([paddingHor, svg_w - paddingHor])

        // yScale domain is 0 to max in set
        const yScale = d3.scaleLinear()
                        .domain([0, d3.max(dataset, (d) => d[1])])
                        .range([svg_h - paddingVert, paddingVert]);

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

        // TODO: fix centering of svg holder
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
        .attr("data-date", (d, i) => d[0])
        .attr("data-gdp",  (d, i) => d[1])
        // create tooltip
        .on("mouseover", function(event, d) {
            const myX = this.getAttribute('x');
            //console.log("🚀 ~ file: index.js:71 ~ .on ~ myX:", myX)
            // console.log("🚀 ~ file: index.js:70 ~ .on ~ event:", event)
            
            // console.log("🚀 ~ file: index.js:70 ~ .on ~ d:", d)
             
            tooltip.html(d[0] +  " $" + d[1])
                    .style("display", "block")
                    .style("left", myX + "px")
                    .style("top", yScale(d[1]) + 25 + "px")
            // TODO: fix position of tooltip


        })
        .on("mouseout", function() {
            tooltip.style("display", "none")
        })
       
        

        // add text for y axis
        svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -300)
        .attr('y', 80)
        .text('Gross Domestic Product')

        // add text for y axis
        svg.append('text')
        .attr('x', svg_w/2-200)
        .attr('y', 60)
        .attr("id", "title")
        .text('GDP of the United States');

        // add x axis 
        svg.append("g")
            .attr("id", "x-axis")
        // TODO: call xAxis    


        // add y axis (adjusted with "8" so bars start visually nicely at y axis)
        svg.append("g")
            .attr("id", "y-axis")
            .attr("transform", "translate(" + (paddingHor+8) + ", 0)")
            .call(yAxis)

// leaving d3.json method
})
.catch(e => console.log(e));
