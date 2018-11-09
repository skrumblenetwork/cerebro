import * as d3 from 'd3';
import Web3 from 'web3'
import config from '../config.json'

class App {
  constructor(width, height, svgref, canvasref, shipsvgref) {
    this.d3 = d3
    // Point to your ipfs and web3 api endpoints here
    this.web3 = new Web3(config.web3API)

    this.width = width
    this.height = height

    this.data = {
      nodes: [

      ],
      links: [

      ]
    }

    /* CONFIG */
    this.config = {
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      nodeRadius: 15,
      maxTransactionsOnScreen: 500,
      maxBlocksOnScreen: 20,
      points: [
        [width / 2, height - 85],
        [width / 2, 0],
      ],
      startPoints: [
        [width / 2, height + 100],
        [width / 2, height - 85]
      ],
      blockOffset: 20
    }

    this.transactions = {

    }
    this.blocks = []
    this.tpsCounter = 0
    this.lastTpsCheck = Date.now();

    this.svg = d3.select(svgref)
                 .attr('width', width + this.config.margin.left + this.config.margin.right)
                 .attr('height', height + this.config.margin.top + this.config.margin.bottom)
                 .append('g')
                 .attr('transform', `translate(${this.config.margin.left},${this.config.margin.top})`);

    this.shipsvg = d3.select(shipsvgref)
                     .attr('width', shipsvgref.clientWidth)
                     .attr('height', shipsvgref.clientHeight)
                     .append('g');

    this.path = this.svg.append("path")
      .data([this.config.points])
      .attr("d", d3.line().curve(d3.curveBundle.beta(1)))
      .attr('class', 'invisible')

    this.shipStartPath = this.shipsvg.append("path")
      .data([this.config.startPoints])
      .attr("d", d3.line().curve(d3.curveBundle.beta(1)))
      .attr('class', 'invisible')
  }

  get adjustedWidth() {
    return this.width - this.config.margin.left - this.config.margin.right
  }

  get adjustedHeight() {
    return this.height - this.config.margin.top - this.config.margin.bottom
  }

  setMaxTransactions(max) {
    this.config.maxTransactionsOnScreen = max
  }
}

export default App
