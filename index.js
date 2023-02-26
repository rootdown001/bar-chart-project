
const svg_w = 1100;
const svg_h = 700;

const padding = 30;

const dataset = [
    [
      "1947-01-01",
      243.1
    ],
    [
      "1947-04-01",
      246.3
    ],
    [
      "1947-07-01",
      250.1
    ],
    [
      "1947-10-01",
      260.3
    ],
    [
      "1948-01-01",
      266.2
    ],
    [
      "1948-04-01",
      272.9
    ]
]

const yScale = d3.scaleLinear()
                 .domain([0, d3.max(dataset, (d) => d[1])])
                 .range([svg_h - padding, padding]);


console.log(yScale(250))

const svg = d3.select("div")
                .append("svg")
                .attr("width", svg_w)
                .attr("height", svg_h)
 


svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", (d, i) => i*30)
   .attr("y", (d, i) => yScale(d[1]))
   .attr("width",20)
   .attr("height", (d) => svg_h - yScale(d[1]))
   .attr("fill", "#2f4f4f")
   .attr("class", "bar")
   .append("title")
   .text((d) => d)


