export function RandomRange(min, max) {
  return Math.random() * (max - min) + min
}

export function translateAlong(path) {
  var direction = 1,
      atLength;
  var l = path.getTotalLength() * 2;
  return function(d, i, a) {
    return function(t) {
      atLength = direction === 1 ? (t * l) : (l - (t * l));
      var p1 = path.getPointAtLength(atLength),
          p2 = path.getPointAtLength((atLength)+direction),
          angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

          if(p2.y - p1.y === 0 && p2.x - p1.x === 0) {
            angle = 270
          }

      return "translate(" + ( p1.x - 10 )+ "," + ( p1.y ) + ")rotate(" + angle + ")";
    }
  }
}

export function Drag(d3, simulation) {
  const boundingBox = BoundingBox.bind(this)

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = boundingBox(d3.event.x, false, true);
    d.fy = boundingBox(d3.event.y, true, true);
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}

export function BoundingBox(num, useHeight=false) {
   const min = (useHeight ? this.height : this.width) - this.config.nodeRadius
   const max = Math.min(min, num)
   const minmax = Math.max(this.config.nodeRadius, max)

   return minmax
}
