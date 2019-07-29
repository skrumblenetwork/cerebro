import config from '../config';

class Transaction {
  constructor(d3, svg, div, width, height, x, y, r, value, rgba) {

    this.transacton = svg.append('circle')
                      .attr('class', 'transactionNode')
                      .attr('r', 0)
                      .attr('cx', x)
                      .attr('cy', y)
                      .attr('fill', `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`)
                      .attr('opacity', 1)
                      .on("mouseover", function(d) {
                          d3.select(this).transition()
                                         .duration(200)
                                         .attr('r', Math.max(r * 1.5, 6))
                                         .attr('fill', `rgba(${Math.min(rgba[0] + 10, 255)}, ${Math.min(rgba[1] + 10, 255)}, ${Math.min(rgba[2] + 10, 255)}, ${Math.min(rgba[3] + .3, 1)})`)

                          div.transition()
                              .duration(200)
                              .style("opacity", .9);
                          div.html(value + " " + config.token)
                              .style("left", (d3.event.pageX) + "px")
                              .style("top", (d3.event.pageY - 28) + "px");
                          })
                      .on("mouseout", function(d) {
                          d3.select(this).transition()
                                         .duration(200)
                                         .attr('r', r)
                                         .attr('fill', `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`)
                          div.transition()
                              .duration(500)
                              .style("opacity", 0);
                      });

      this.transacton.transition()
                      .duration(750)
                      .attr('r', r)
                      .attr('opacity', 1)
  }

  get element() {
    return this.transacton
  }
}

export default Transaction
