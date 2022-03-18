import define1 from "./450051d7f1174df8@254.js";
import define2 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# Covid19: Migration of Confirmed Cases`
)}

function _2(md){return(
md`## By Type`
)}

function _3(md){return(
md `**Translation:**<br/>
**出境传播**：From China to other countries<br/>
**入境传播**: From other countries to China<br/>
**境外传播**: From other countries to other countries, exclude China<br/>
**湖北输出**：From Hubei province to other provinces in China<br/>
**湖北内传播**: Within Hubei Province<br/>
**入湖北传播**: From other provinces to Hubei province in China<br/>
**其他省传播**: From other provinces to other provinces in China, exclude Hubei`
)}

function _r(radio){return(
radio({
  title: 'Zoom center of the map',
  options: ["Wuhan", "China", "World"],
  value: "China"
})
)}

function _ch(checkbox){return(
checkbox({
  title: "Please select migration type",
  options: [
    "出境传播",
    "入境传播",
    "境外传播",
    "湖北输出",
    "湖北内传播",
    "入湖北传播",
    "其他省传播"
  ],
  value: ["湖北输出", "湖北内传播", "入湖北传播", "其他省传播"]
})
)}

function _6(md){return(
md `##### mouse over the historgram to select date`
)}

function _ts(d3,margin,stack,data,colors,yScale,yAxis)
{
  const height = 200;
  const svg = d3
    .create('svg')
    .attr('width', 960)
    .attr('height', height);
  svg.style('user-select', 'none').style('-webkit-user-select', 'none');

  const xScale = d3
    .scaleTime()
    .domain([new Date(2019, 11, 1), new Date(2020, 3, 15)])
    .range([margin.left, 960]);

  const chartData = stack(data);
  const groups = svg
    .append('g')
    .selectAll('g')
    .data(chartData)
    .join('g')
    .style('fill', (d, i) => colors(d.key));
  groups
    .selectAll('rect')
    .data(d => d)
    .join('rect')
    .attr('x', d => xScale(Date.parse(d.data.date)))
    .attr('y', d => yScale(d[1]))
    .attr('height', d => {
      if (isNaN(d[1])) {
        d[1] = d[0];
      }
      return yScale(d[0]) - yScale(d[1]);
    })
    .attr('width', 5);
  svg
    .append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale));

  svg
    .append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(yAxis)
    .select('.domain')
    .remove();

  const brush = svg
    .append('rect')
    .attr('x', xScale(xScale.domain()[1]))
    .attr('width', 1)
    .attr('height', height);

  const node = svg.node();
  node.value = xScale.domain()[1];
  function onBrush([px]) {
    // console.info(px)
    brush.attr('x', px);
    node.value = xScale.invert(px);
    svg.dispatch('input');
  }

  svg.on('touchmove', () => onBrush(d3.touches(node)[0]));
  svg.on('mousemove', e => {
    onBrush(d3.pointer(e, node));
  });
  return node;
}


function _chart1(d3,projection,DOM,topojson,world,tripForDayChecked,colors,formatDate,ts,data)
{
  const width = 960;
  const height = 600;

  const path = d3
    .geoPath()
    .projection(projection)
    .pointRadius(5);
  const svg = d3
    .select(DOM.svg(width, height))
    .style("width", "100%")
    .style("height", "auto");
  svg
    .append("path")
    .datum(topojson.merge(world, world.objects.lower48.geometries))
    .attr("fill", "#ddd")
    .attr("d", path);
  svg
    .append("path")
    .datum(topojson.mesh(world, world.objects.lower48, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-linejoin", "round")
    .attr("d", path);
  const g = svg.append("g");
  const g1 = svg.append("g");
  let t = tripForDayChecked;
  for (const d of t) {
    let count = d.count;
    g.append("path")
      .datum(d.route)
      .attr("fill", "none")
      .attr("stroke", colors(d.type))
      .attr("stroke-opacity", "0.5")
      .style("stroke-width", count)
      .attr("d", path);
    let dpoint = d.dPoint;
    let opoint = d.dPoint;
    let cityname = d.dCity;
    g1.append("circle")
      .attr("transform", `translate(${dpoint})`)
      .attr("fill", "steelblue")
      .attr("r", 1)
      .attr("fill-opacity", 1);
    // g1.append("circle")
    //   .attr("transform", `translate(${opoint})`)
    //   .attr("fill", "orange")
    //   .attr("r", 1)
    //   .attr("fill-opacity", 1);
  }
  // const svg2 = d3
  //   .create('svg')
  //   .attr('width', 900)
  //   .attr('height', 15);
  const legend = svg.append("g");
  legend
    .append('text')
    .text(formatDate(ts))
    .attr('text-anchor', 'end')
    .style('font-size', 25)
    .attr('x', 940)
    .attr('y', 20);
  legend
    .selectAll('g')
    .data(data.categories.slice(0).reverse())
    .join('g')
    .attr('transform', (d, i) => `translate(${i * 100},5)`)
    .call(g =>
      g
        .append('rect')
        .attr('width', 20)
        .attr('height', 20)
        .style('fill', d => colors(d))
    )
    .call(g =>
      g
        .append('text')
        .attr('y', 10)
        .attr('x', 20)
        .attr('dy', '0.35em')
        .style('font-size', 14)
        .style('font-family', 'sans-serif')
        .text(d => d[0] + d.slice(1).toLowerCase())
    );

  return svg.node();
}


function _9(md){return(
md`---`
)}

function _10(md){return(
md`## By City`
)}

function _11(md){return(
md `Focus on one city, get its in and outs`
)}

function _dd1(select,distinctCity){return(
select({
  title: "City Name in China",
  options: distinctCity,
  value: "武汉"
})
)}

function _ts2(d3,margin,stack2,tripByCitySum,yScale2,height,yAxis2)
{
  const svg = d3
    .create('svg')
    .attr('width', 960)
    .attr('height', 200);
  svg.style('user-select', 'none').style('-webkit-user-select', 'none');

  const xScale = d3
    .scaleTime()
    .domain([new Date(2019, 11, 1), new Date(2020, 3, 15)])
    .range([margin.left, 960]);

  const chartData = stack2(tripByCitySum);
  const groups = svg
    .append('g')
    .selectAll('g')
    .data(chartData)
    .join('g')
    .style('fill', (d, i) => {
      if (d.key == "ocount") return "orange";
      else return "steelblue";
    });

  groups
    .selectAll('rect')
    .data(d => d)
    .join('rect')
    .attr('x', d => xScale(Date.parse(d.data.date)))
    .attr('y', d => yScale2(d[1]))
    .attr('height', d => yScale2(d[0]) - yScale2(d[1]))
    .attr('width', 5);
  svg
    .append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale));

  svg
    .append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(yAxis2)
    .select('.domain')
    .remove();

  const brush = svg
    .append('rect')
    .attr('x', xScale(xScale.domain()[1]))
    .attr('width', 1)
    .attr('height', height);

  const node = svg.node();
  node.value = xScale.domain()[1];

  function onBrush([px]) {
    brush.attr('x', px);
    node.value = xScale.invert(px);
    svg.dispatch('input');
  }

  svg.on('touchmove', () => onBrush(d3.touches(node)[0]));
  svg.on('mousemove', (e) => onBrush(d3.pointer(e,node)));

  return node;
}


function _chart2(d3,projection,DOM,topojson,world,cityForDay,nameForDayByCity,pie,tripForDayByCity,dd1,formatDate,ts2,tripByCitySum)
{
  const width = 960;
  const height = 600;

  const path = d3
    .geoPath()
    .projection(projection)
    .pointRadius(5);
  const svg = d3
    .select(DOM.svg(width, height))
    .style("width", "100%")
    .style("height", "auto");
  svg
    .append("path")
    .datum(topojson.merge(world, world.objects.lower48.geometries))
    .attr("fill", "#ddd")
    .attr("d", path);
  svg
    .append("path")
    .datum(topojson.mesh(world, world.objects.lower48, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-linejoin", "round")
    .attr("d", path);
  const g = svg.append("g");

  let path2 = d3.arc();
  for (const onecity of cityForDay) {
    if (nameForDayByCity.indexOf(onecity.cityname) == -1) continue;
    const arcs = pie(onecity.pie);
    let point = onecity.location;
    let g2 = svg.append('g').attr('transform', `translate(${point})`);
    let pieGroup = g2.append('g');
    let r = onecity.pie[0].value + onecity.pie[1].value;
    let radius = r => {
      if (r < 20) return r;
      else return 20;
    };
    path2.outerRadius(radius(r) * 0.5).innerRadius(radius(r));
    var arc = pieGroup
      .selectAll('.arc')
      .data(arcs)
      .enter()
      .append('g')
      .attr('class', 'arc');
    arc
      .append('path')
      .attr('d', path2)
      .attr('fill', d => {
        if (d.data.name == "dcount") return "steelblue";
        else return "orange";
      })
      .attr("fill-opacity", 0.5);
  }
  const g1 = svg.append("g");
  let t = tripForDayByCity;
  for (const d of t) {
    let count = d.count;
    let ocity = d.oCity;
    g.append("path")
      .datum(d.route)
      .attr("fill", "none")
      .attr("stroke", dcity => {
        if (ocity == dd1) return "orange";
        else return "steelblue";
      })
      .attr("stroke-opacity", "0.7")
      .style("stroke-width", count)
      .attr("d", path);
  }

  for (const d of t) {
    let count = d.count;
    let dpoint = d.dPoint;
    let opoint = d.dPoint;
    let cityname = d.dCity;
    g1.append("circle")
      .attr("transform", `translate(${dpoint})`)
      .attr("fill", "black")
      .attr("r", 2)
      .attr("fill-opacity", 0.25);
    g1.append("circle")
      .attr("transform", `translate(${opoint})`)
      .attr("fill", "black")
      .attr("r", 1)
      .attr("fill-opacity", 0.25);
    g1.append('text')
      .text(cityname)
      .attr("transform", `translate(${dpoint})`)
      .attr('text-anchor', 'end')
      .style('font-size', 8);
  }
  let legend = g.append('g').attr('transform', `translate(20, 30)`);
  legend
    .append('text')
    .text(formatDate(ts2) + " " + dd1)
    .attr('text-anchor', 'end')
    .style('font-size', 20)
    .attr('dx', 100)
    .attr('dy', -10);

  legend
    .selectAll('g')
    .data(tripByCitySum.categories.slice(0).reverse())
    .join('g')
    .attr('transform', (d, i) => `translate(${i * 100},5)`)
    .call(g =>
      g
        .append('rect')
        .attr('width', 20)
        .attr('height', 20)
        .style('fill', d => {
          if (d == "ocount") return "orange";
          else return "steelblue";
        })
    )
    .call(g =>
      g
        .append('text')
        .attr('y', 10)
        .attr('x', 25)
        .attr('dy', '0.35em')
        .style('font-size', 12)
        .style('font-family', 'sans-serif')
        .text(d => d[0] + d.slice(1).toLowerCase())
    );

  return svg.node();
}


function _15(md){return(
md`# Dependency`
)}

function _d3(require){return(
require("d3")
)}

function _projectionChina(d3){return(
d3
  .geoMercator()
  .scale(700)
  .center([100, 38])
  .translate([480, 300])
)}

function _projectionWuhan(d3){return(
d3
  .geoMercator()
  .scale(2000)
  .center([114.31, 30.52])
  .translate([480, 300])
)}

function _projectionWorld(d3){return(
d3
  .geoMercator()
  .scale(150)
  .translate([480, 300])
)}

function _projection(v,r){return(
v(r)
)}

function _v(projectionWorld,projectionWuhan,projectionChina){return(
function v(r) {
  if (r == "World") return projectionWorld;
  else if (r == "Wuhan") return projectionWuhan;
  else return projectionChina;
}
)}

function _topojson(require){return(
require("topojson-client@3")
)}

async function _world(d3)
{
  const world = await d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
  world.objects.lower48 = {
    type: "GeometryCollection",
    geometries: world.objects.countries.geometries
  };
  return world;
}


function _formatDate(d3){return(
d3.timeFormat("%y-%m-%d")
)}

function _27(md){return(
md`# Data`
)}

async function _linesTripOD(FileAttachment){return(
(await FileAttachment("0501TripOD@2.txt").text())
  .split('\n')
  .map(l => l.split('\t').map(s => s.trim()))
)}

function _keyframesAll(linesTripOD)
{
  const keyframes = [];
  let i = 8;
  let oldts = new Date(0, 0, 0);
  let trip = [];
  let routes = [];
  while (i < linesTripOD.length - 1) {
    let [
      opro,
      ocity,
      dpro,
      dcity,
      olng,
      olat,
      dlng,
      dlat,
      date,
      count,
      type
    ] = linesTripOD[i];
    const ts = new Date(Date.parse(date.replace(/-/g, "/")));
    olng = parseFloat(olng);
    olat = parseFloat(olat);
    dlng = parseFloat(dlng);
    dlat = parseFloat(dlat);
    const path = {
      type: "LineString",
      coordinates: [[olng, olat], [dlng, dlat]]
    };
    const route = {
      path,
      count
    };
    route.path = path;
    route.count = count;
    if (ts - oldts != 0) {
      routes = [];
      routes.push(route);
      keyframes.push([ts, routes]);
    } else {
      routes.push(route);
      keyframes.pop();
      keyframes.push([ts, routes]);
    }
    i++;
    oldts = ts;
  }
  return keyframes;
}


function _tripsOD(linesTripOD,projection)
{
  const trips = [];
  let i = 8;
  while (i < linesTripOD.length - 1) {
    let [
      opro,
      ocity,
      dpro,
      dcity,
      olng,
      olat,
      dlng,
      dlat,
      date,
      count,
      type
    ] = linesTripOD[i];
    const ts = new Date(Date.parse(date.replace(/-/g, "/")));
    olng = parseFloat(olng);
    olat = parseFloat(olat);
    dlng = parseFloat(dlng);
    dlat = parseFloat(dlat);
    const d = projection([dlng, dlat]);
    const o = projection([olng, olat]);
    const trip = {};
    trip.route = {
      type: "LineString",
      coordinates: [
        // projection([olng,olat]),
        // projection([dlng,dlat])
        [olng, olat],
        [dlng, dlat]
      ]
    };
    trip.date = ts;
    trip.count = count;
    trip.dPoint = d;
    trip.oPoint = o;
    trip.dCity = dcity;
    trip.oCity = ocity;
    trip.type = type;
    trips.push(trip);
    i++;
  }
  return trips;
}


function _tripForDay(tripsOD,d3,ts){return(
tripsOD.filter(h => d3.timeDay.count(ts, h.date) == 0)
)}

function _tripForDayChecked(tripForDay,ch){return(
tripForDay.filter(h => ch.indexOf(h.type) != -1)
)}

function _tripByCity(tripsOD,dd1){return(
tripsOD.filter(h => h.dCity == dd1 || h.oCity == dd1)
)}

function _tripForDayByCity(tripByCity,d3,ts2){return(
tripByCity.filter(h => d3.timeDay.count(ts2, h.date) == 0)
)}

function _nameForDayByCity(tripForDayByCity)
{
  const names = [];
  for (const d of tripForDayByCity) {
    if (names.indexOf(d.dCity) == -1) names.push(d.dCity);
    if (names.indexOf(d.oity) == -1) names.push(d.oity);
  }
  return names;
}


function _tripByCitySum(tripByCity,dd1)
{
  const sum = [];
  let oldts = new Date(0, 0, 0);
  for (const d of tripByCity) {
    let date = d.date;
    let count = parseInt(d.count);
    let dCity = d.dCity;
    let oCity = d.oCity;
    if (oldts - date != 0) {
      const oneSum = {};
      oneSum.date = date;
      oneSum.ocount = parseInt(0);
      oneSum.dcount = parseInt(0);
      if (dCity == dd1) oneSum.dcount = count;
      else oneSum.ocount = count;
      oneSum.total = oneSum.dcount + oneSum.ocount;
      sum.push(oneSum);
    } else {
      const oneSum = sum.pop();
      console.log(oneSum);
      if (dCity == dd1) oneSum.dcount += count;
      else oneSum.ocount += count;
      oneSum.total = oneSum.dcount + oneSum.ocount;
      sum.push(oneSum);
    }
    oldts = date;
  }
  const categories = ["ocount", "dcount"];
  return Object.assign(sum, { categories });
}


function _37(tripByCitySum){return(
tripByCitySum.categories
)}

async function _linesdistinctCity(FileAttachment){return(
(await FileAttachment("0503distinctCity.txt").text())
  .split('\n')
  .map(l => l.split('\t').map(s => s.trim()))
)}

function _distinctCity(linesdistinctCity)
{
  const distinctCities = [];
  let i = 0;
  while (i < linesdistinctCity.length) {
    let [onecity] = linesdistinctCity[i];
    distinctCities.push(onecity);
    i++;
  }
  return distinctCities;
}


async function _data(FileAttachment,ch,d3)
{
  const parsed = (await FileAttachment("0501TripHis@3.txt").text())
    .split('\n')
    .map(l => l.split('\t').map(s => s.trim()));
  for (const d of parsed) {
    d[0] = new Date(Date.parse(d[0].replace(/-/g, "/")));
  }
  const dates = Object.keys(
    parsed.reduce((acc, d) => {
      acc[d[0]] = true;
      return acc;
    }, {})
  );
  const categories = Object.keys(
    parsed.reduce((acc, d) => {
      acc[d[1]] = true;
      return acc;
    }, {})
  );
  const allData = dates
    .map(date => {
      const dateData = parsed
        .filter(d => d[0] == date)
        .reduce((acc, d) => {
          if (ch.indexOf(d[1]) == -1) acc[d[1]] = 0;
          else acc[d[1]] = d[2];
          return acc;
        }, {});
      return Object.assign(
        {
          date,
          total: d3.sum(parsed.filter(d => d[0] == date), d => d[2])
        },
        dateData
      );
    })
    .sort((a, b) => b.date - a.date);

  return Object.assign(allData, { categories });
}


function _colors(d3,data){return(
d3.scaleOrdinal(data.categories.reverse(), d3.schemeSpectral[8])
)}

function _color2(d3,tripByCitySum){return(
d3.scaleOrdinal(tripByCitySum.categories, d3.schemeGnBu[9].slice(3))
)}

function _margin(){return(
{
  top: 5,
  right: 0,
  bottom: 30,
  left: 30
}
)}

function _width(){return(
960
)}

function _height(){return(
200
)}

function _yScale(d3,data,height,margin){return(
d3.scaleLinear(
  [ 0, d3.max(data, d => d.total) ],
  [ height - margin.bottom, margin.top ]
)
)}

function _yScale2(d3,tripByCitySum,height,margin){return(
d3.scaleLinear(
  [0, d3.max(tripByCitySum, d => d.total)],
  [height - margin.bottom, margin.top]
)
)}

function _yAxis(d3,yScale){return(
d3.axisLeft(yScale)
)}

function _yAxis2(d3,yScale2){return(
d3.axisLeft(yScale2)
)}

function _stack(d3,data){return(
d3.stack()
  .keys( data.categories )
)}

function _stack2(d3,tripByCitySum){return(
d3.stack().keys(tripByCitySum.categories)
)}

function _52(stack,data){return(
stack(data)
)}

async function _linesCity(FileAttachment){return(
(await FileAttachment("0502city@1.txt").text())
  .split('\n')
  .map(l => l.split('\t').map(s => s.trim()))
)}

function _city(linesCity,projection)
{
  const cities = [];
  let i = 0;
  while (i < linesCity.length - 2) {
    if (
      linesCity[i][1] == linesCity[i + 1][1] &&
      linesCity[i][0] == linesCity[i + 1][0]
    )
      i++;
    let [date, name, dcount, ocount, lng, lat] = linesCity[i];
    const ts = new Date(Date.parse(date.replace(/-/g, "/")));
    ocount = parseInt(ocount);
    dcount = parseInt(dcount);
    lng = parseFloat(lng);
    lat = parseFloat(lat);
    const d = projection([lng, lat]);
    const pieForCity = {};
    pieForCity.cityname = name;
    pieForCity.date = ts;
    pieForCity.location = d;
    pieForCity.pie = [];
    let piedata = {};
    piedata.name = "dcount";
    piedata.value = dcount;
    pieForCity.pie.push(piedata);
    piedata = {};
    piedata.name = "ocount";
    piedata.value = ocount;
    pieForCity.pie.push(piedata);
    i++;
    cities.push(pieForCity);
  }
  return cities;
}


function _cityForDay(city,d3,ts2){return(
city.filter(h => d3.timeDay.count(ts2, h.date) == 0)
)}

function _56(pie,city){return(
pie(city[0].pie)
)}

function _pie(d3){return(
d3
  .pie()
  .sort(null)
  .value(d => d.value)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["0501TripOD@2.txt",new URL("./files/8ac409e6efce1139413b55550617972a7fe53fb56c7d43efd4f62fa1b769546f7eadbdf7df510588375ed662a627f7108da7b6d5679ff9daa54370777bc2dbf6",import.meta.url)],["0503distinctCity.txt",new URL("./files/1d403d2b56b86098399bdc22398168cab69b2794e0ba448bd71988f0c26b1aa12fa40c4caaf5b1fdf5f6d76088da52fc05016efa0dded000033588fef473601f",import.meta.url)],["0501TripHis@3.txt",new URL("./files/59848902293962873006a2f8f18606949151004be53d3e7a5f9f68febfd0f4b10006f12c13cac7fdcc909bb5e559930c0f1c7f49aec3577e18ec72611b752709",import.meta.url)],["0502city@1.txt",new URL("./files/273ae4321005c990cd245dd0d3fde4c02d7eb096664d72b1cc11d524b39145fa7ceb3c7c271aff5e2cdb366d38bff47a4a8d986d38970ac99e26d412693e4b57",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof r")).define("viewof r", ["radio"], _r);
  main.variable(observer("r")).define("r", ["Generators", "viewof r"], (G, _) => G.input(_));
  main.variable(observer("viewof ch")).define("viewof ch", ["checkbox"], _ch);
  main.variable(observer("ch")).define("ch", ["Generators", "viewof ch"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("viewof ts")).define("viewof ts", ["d3","margin","stack","data","colors","yScale","yAxis"], _ts);
  main.variable(observer("ts")).define("ts", ["Generators", "viewof ts"], (G, _) => G.input(_));
  main.variable(observer("chart1")).define("chart1", ["d3","projection","DOM","topojson","world","tripForDayChecked","colors","formatDate","ts","data"], _chart1);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof dd1")).define("viewof dd1", ["select","distinctCity"], _dd1);
  main.variable(observer("dd1")).define("dd1", ["Generators", "viewof dd1"], (G, _) => G.input(_));
  main.variable(observer("viewof ts2")).define("viewof ts2", ["d3","margin","stack2","tripByCitySum","yScale2","height","yAxis2"], _ts2);
  main.variable(observer("ts2")).define("ts2", ["Generators", "viewof ts2"], (G, _) => G.input(_));
  main.variable(observer("chart2")).define("chart2", ["d3","projection","DOM","topojson","world","cityForDay","nameForDayByCity","pie","tripForDayByCity","dd1","formatDate","ts2","tripByCitySum"], _chart2);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("projectionChina")).define("projectionChina", ["d3"], _projectionChina);
  main.variable(observer("projectionWuhan")).define("projectionWuhan", ["d3"], _projectionWuhan);
  main.variable(observer("projectionWorld")).define("projectionWorld", ["d3"], _projectionWorld);
  main.variable(observer("projection")).define("projection", ["v","r"], _projection);
  main.variable(observer("v")).define("v", ["projectionWorld","projectionWuhan","projectionChina"], _v);
  main.variable(observer("topojson")).define("topojson", ["require"], _topojson);
  main.variable(observer("world")).define("world", ["d3"], _world);
  const child1 = runtime.module(define1);
  main.import("Scrubber", child1);
  const child2 = runtime.module(define2);
  main.import("checkbox", child2);
  main.import("radio", child2);
  main.import("select", child2);
  main.variable(observer("formatDate")).define("formatDate", ["d3"], _formatDate);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("linesTripOD")).define("linesTripOD", ["FileAttachment"], _linesTripOD);
  main.variable(observer("keyframesAll")).define("keyframesAll", ["linesTripOD"], _keyframesAll);
  main.variable(observer("tripsOD")).define("tripsOD", ["linesTripOD","projection"], _tripsOD);
  main.variable(observer("tripForDay")).define("tripForDay", ["tripsOD","d3","ts"], _tripForDay);
  main.variable(observer("tripForDayChecked")).define("tripForDayChecked", ["tripForDay","ch"], _tripForDayChecked);
  main.variable(observer("tripByCity")).define("tripByCity", ["tripsOD","dd1"], _tripByCity);
  main.variable(observer("tripForDayByCity")).define("tripForDayByCity", ["tripByCity","d3","ts2"], _tripForDayByCity);
  main.variable(observer("nameForDayByCity")).define("nameForDayByCity", ["tripForDayByCity"], _nameForDayByCity);
  main.variable(observer("tripByCitySum")).define("tripByCitySum", ["tripByCity","dd1"], _tripByCitySum);
  main.variable(observer()).define(["tripByCitySum"], _37);
  main.variable(observer("linesdistinctCity")).define("linesdistinctCity", ["FileAttachment"], _linesdistinctCity);
  main.variable(observer("distinctCity")).define("distinctCity", ["linesdistinctCity"], _distinctCity);
  main.variable(observer("data")).define("data", ["FileAttachment","ch","d3"], _data);
  main.variable(observer("colors")).define("colors", ["d3","data"], _colors);
  main.variable(observer("color2")).define("color2", ["d3","tripByCitySum"], _color2);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("yScale")).define("yScale", ["d3","data","height","margin"], _yScale);
  main.variable(observer("yScale2")).define("yScale2", ["d3","tripByCitySum","height","margin"], _yScale2);
  main.variable(observer("yAxis")).define("yAxis", ["d3","yScale"], _yAxis);
  main.variable(observer("yAxis2")).define("yAxis2", ["d3","yScale2"], _yAxis2);
  main.variable(observer("stack")).define("stack", ["d3","data"], _stack);
  main.variable(observer("stack2")).define("stack2", ["d3","tripByCitySum"], _stack2);
  main.variable(observer()).define(["stack","data"], _52);
  main.variable(observer("linesCity")).define("linesCity", ["FileAttachment"], _linesCity);
  main.variable(observer("city")).define("city", ["linesCity","projection"], _city);
  main.variable(observer("cityForDay")).define("cityForDay", ["city","d3","ts2"], _cityForDay);
  main.variable(observer()).define(["pie","city"], _56);
  main.variable(observer("pie")).define("pie", ["d3"], _pie);
  return main;
}
