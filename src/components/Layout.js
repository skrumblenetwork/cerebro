import React, { Component } from 'react';
import Block from '../classes/Block'
import Transaction from '../classes/Transaction'
import App from '../classes/App'
import {
    translateAlong,
    RandomRange,
} from '../classes/Util'

let app;

class Layout extends Component {
    constructor(props) {
      super(props);
      this.state = {
        tps: 0,
        blockSpeed: '---',
        currentBlock: '---',
        animationSpeed: 50,
        transactionsVisible: 500,
        minimumTransactionsVisible: 0,
        maximumTransactionsVisible: 10000,
        blockStatus: 'Preparing for take off'
      };
    }

    onTransactionsVisibleChange = (e) => {
      this.setState({ transactionsVisible: e.target.value });
      app.setMaxTransactions(e.target.value)
    }

    onAnimationSpeedChange = (e) => {
      this.setState({ animationSpeed: e.target.value });
    }

    async componentDidMount() {
        app = new App(this.refs.shipsvg.clientWidth, this.refs.shipsvg.clientHeight, this.refs.svg, this.refs.canvas, this.refs.shipsvg)

        const this_var = this
        const d3 = app.d3
        const maxBlocksOnScreen = app.config.maxBlocksOnScreen
        const points = app.config.points;
        const width = app.adjustedWidth
        const height = app.adjustedHeight
        const svg = app.svg
        const shipsvg = app.shipsvg
        let transactions = app.transactions
        let blocks = app.blocks
        let tpsCounter = app.tpsCounter
        let lastTpsCheck = app.lastTpsCheck

        this.refs.canvas.width = app.width;
        this.refs.canvas.height = app.height;


        app.web3.eth.subscribe('pendingTransactions', (err, res) => {
          app.web3.eth.getTransaction(res).then((data) => {
            spawnTransaction(data)
          });
        });

        app.web3.eth.subscribe('newBlockHeaders', (err, res) => {
          if(!err) {
            moveBlock(res)
          }
        });

        // Define the div for the tooltip
        const div = d3.select("body").append("div")
                      .attr("class", "tooltip")
                      .style("opacity", 0);

        const blockTimes = []
        let blockDistance = 0
        let currentBlock
        let isAnimating = false

        function createStartBlock() {
          return new Promise((resolve, reject) => {
            if(currentBlock && currentBlock.g) {
              currentBlock.g.remove()
            }
            isAnimating = true

            this_var.refs.blockstatus.style.color = "rgba(255, 255, 255, 0)"
            this_var.refs.blockstatus.style.width = "153px"

            setTimeout(() => {
              this_var.setState({
                blockStatus: 'Preparing for take off'
              })
              this_var.refs.blockstatus.style.color = "rgba(255, 255, 255, 255)"
            }, 550)


            currentBlock = new Block(shipsvg, app.config.startPoints, app.config.blockOffset)

            currentBlock.startTransition(d3, translateAlong, app.config.startPoints, true, 2000, d3.easeBounceOut).on('end', () => {
              // currentBlock.g.remove()
              isAnimating = false
              resolve()
            })
          })
        }

        createStartBlock()

        function moveBlock(b) {
          return new Promise(async (resolve, reject) => {
            let newB = new Block(shipsvg, points, app.config.blockOffset, this_var.state.animationSpeed, isAnimating)
            blockDistance = 0

            this_var.setState({
              currentBlock: b.number
            })

            blocks.push({
              block: b,
              element: newB.g
            })

            blockTimes.push(b.timestamp)

            if(blockTimes.length > 1) {
              for(let i = 1; i < blockTimes.length - 1; i++) {
                blockDistance += blockTimes[i] - blockTimes[i - 1]
              }

              this_var.setState({
                blockSpeed: `${Math.round((blockDistance / blockTimes.length) * 100) / 100}s`
              })
            }

            //send to back
            newB.g.each(function() {
              const firstChild = this.parentNode.firstChild;
              if (firstChild) {
                  this.parentNode.insertBefore(this, firstChild);
              }
            })

            app.web3.eth.getBlock(b.number).then((data) => {
              data.transactions.forEach(t => {
                if(transactions[t]) {
                  transactions[t].onBlock = true
                  transactions[t].element.attr("class", "blockNode")

                  const randomX = RandomRange(-90, -60)
                  const randomY = RandomRange(0, 20)

                  // animate onto block
                  transactions[t].element.transition()
                                         // .attr("cx", (width / 2) + randomX)
                                         .attr("cx", (width / 2) + 5)
                                         // .attr("cy", 0 + randomY)
                                         .attr("cy", -5)
                                         .attr("r", 3)
                                         .duration(2000)
                                         .on("end", () => {
                                           // stick the animated transaction into the block group
                                           if(!transactions[t]) {
                                             return
                                           }

                                           transactions[t].element.attr('cx', randomX).attr('cy', randomY)

                                           transactions[t].element.remove();

                                           delete transactions[t]
                                         })
                }
              })

              setTimeout(() => {
                if(!isAnimating) {
                  currentBlock.g.remove()
                  newB.show()
                }

                newB.startTransition(d3, translateAlong, points).on('end', () => {
                  createStartBlock()
                })

                this_var.refs.blockstatus.style.color = "rgba(255, 255, 255, 0)"

                setTimeout(() => {
                  this_var.setState({
                    blockStatus: 'LIFT OFF!'
                  })
                  this_var.refs.blockstatus.style.width = "52px"
                  this_var.refs.blockstatus.style.color = "rgba(255, 255, 255, 255)"

                  resolve()
                }, 550)

              }, 2250)
            })

            if(blocks.length > maxBlocksOnScreen) {
                blocks.shift().element.remove()
            }
          })

        }


        function spawnTransaction(t) {
          if(!t || !t.value || !svg) return

          const x = RandomRange(0, width)
          const y = RandomRange(0, height)
          const value = parseInt(t.value) / 1000000000000000000
          const r = Math.max(3, Math.min(value, 50))
          const rgba = [RandomRange(0, 255), RandomRange(0, 255), RandomRange(0, 255), Math.max(RandomRange(0, 1), 0.3)]

          const newT = new Transaction(d3, svg, div, width, height, x, y, r, value, rgba)

          transactions[t.hash] = {
            transaction: t,
            element: newT.element,
            x,
            y,
            r,
            rgba,
            id: t.hash
          }

          tpsCounter++;

          if(Date.now() - lastTpsCheck > 1000) {
            this_var.setState({tps: tpsCounter});
            lastTpsCheck = Date.now()
            tpsCounter = 0
          }

          const tkeys = Object.keys(transactions)
          if(tkeys.length > app.config.maxTransactionsOnScreen) {
            let x = 0
            while((x < tkeys.length - 1) && (transactions[tkeys[x]].onBlock)) {
              x++
            }

            transactions[tkeys[x]].element.remove()
            delete transactions[tkeys[x]]

          }
        }



    }

    render() {
        return <div className="all-content">
            <div className="banner">
              <div className="logo-container">
                <div className="logo"></div>
              </div>
              <div className="details">
                <div className="stats">
                  <div className="group">
                    <div className="label">Block Time</div>
                    <div className="data">{this.state.blockSpeed}</div>
                  </div>
                  <div className="group">
                    <div className="label">TPS</div>
                    <div className="data">{this.state.tps}</div>
                  </div>
                  <div className="group">
                    <div className="label">Current Block</div>
                    <div className="data">{this.state.currentBlock}</div>
                  </div>
                </div>
                <div className="settings">
                  <div className="group">
                    <div className="label">Animation Speed</div>
                    <div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        onChange={this.onAnimationSpeedChange}
                        value={this.state.animationSpeed}
                      />
                      <input
                        type="number"
                        className="number-input"
                        min={1}
                        max={100}
                        onChange={this.onAnimationSpeedChange}
                        value={this.state.animationSpeed}
                      />
                    </div>
                  </div>
                  <div className="group">
                    <div className="label">Transactions Visible</div>
                    <div>
                      <input
                        type="range"
                        min={this.state.minimumTransactionsVisible}
                        max={this.state.maximumTransactionsVisible}
                        onChange={this.onTransactionsVisibleChange}
                        value={this.state.transactionsVisible}
                      />
                      <input
                        type="number"
                        className="number-input"
                        min={this.state.minimumTransactionsVisible}
                        max={this.state.maximumTransactionsVisible}
                        onChange={this.onTransactionsVisibleChange}
                        value={this.state.transactionsVisible}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="legend">
                  <div className="group">
                    <div className="label">Contract Transaction</div>
                    <div className="icon"></div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="main-content">
              <div className="background">
                <div className="stars" />
              </div>
              <svg className="shipsvg" ref="shipsvg" />
              <div className="transaction-container">
                <div className="block-status" ref="blockstatus">
                  {this.state.blockStatus}
                </div>
                <svg className="svg" ref="svg" width="100%" height="100%"></svg>
              </div>
              <canvas className="canvas" ref="canvas"></canvas>
              <img src="/images/cat.png" alt="cat" ref="cat" width="10px" style={{display: 'none'}} />
              <video autoPlay loop ref="video" style={{display: 'none'}}>
                <source src="https://i.imgur.com/no3t9ib.webm" type="video/webm" />
              </video>

              <footer className="footer">
                Skrumble Network © 2018
              </footer>
            </div>
        </div>
    }
}

export default Layout;
