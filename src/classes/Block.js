class Block {
  constructor(svg, points, offset, animationSpeed) {
    this.offset = offset

    this.group = svg.append('g').attr('transform', `translate(${points[0][0] - this.offset}, ${points[0][1]})rotate(270)`).attr('opacity', 1)

    this.label = this.group.append("text")
       .attr('transform', "translate(20, -5)")
       .text("")

    this.img = this.group.append("svg:image")
                   .attr('xlink:href', '/images/Rocket Ship.svg')
                   .attr("width", 50)

    this.animationSpeed = 5000

    if(animationSpeed) {
      this.animationSpeed = this.animationSpeed * ((100 - animationSpeed) / 100)
    }
  }

  get g() {
    return this.group
  }

  get l() {
    return this.label
  }

  startTransition(d3, translateAlong, points, keep=false, speed=null, ease) {
    this.group.transition()
        .ease(ease || d3.easeBackIn)
        // .attrTween("transform", translateAlong(path.node()))
        .attr("transform", `translate(${points[1][0] - this.offset}, ${points[1][1]}) rotate(270)`)
        .duration(speed || this.animationSpeed)
        .on('end', () => {
          if(keep) return

          this.group.transition()
                .attr('opacity', 0)
                .duration(1500)
          setTimeout(() => {
            this.group.remove()
          }, 2000)
        })
  }

}


export default Block
