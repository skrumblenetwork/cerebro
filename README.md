<img src="https://raw.githubusercontent.com/skrumblenetwork/cerebro/master/img/SKM_Logo_black.png" width="30%" height="30%">

# Cerebro: Blockchain Visualizer

Skrumble Network's Cerebro is blockchain visualizer that pulls data in real time from our blockchain, takes that information and represents each transaction as a circle, whose size scales with value. Once a block is confirmed all the transactions are sent to that block, and it rides away. You can also view individual transaction values, average block time, and transactions per second.
<br>

<p>
  <a href="#getting-started">Getting Started</a> •
  <a href="#features">Features</a> •
  <a href="#contact">Contact</a> •
  <a href="#coming-next">Coming Next</a> •
  <a href="#license">License</a>
</p>

#### Current Version

<img src="https://raw.githubusercontent.com/skrumblenetwork/cerebro/master/img/ship2.gif">

# Getting Started

### Prerequisites

To run the visualizer you will need [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/download/) to install.

### Installing

```bash
$ git clone https://github.com/skrumblenetwork/cerebro  # Clone Git repo
$ cd cerebro                                            # Move to the directory
```

Before using npm the file `config.example.json` needs to be renamed to `config.json` it will be located in the src folder. Within `config.json` set the endpoint to the network you are trying to connect to. You need to change the endpoint to the network.

```bash
$ npm i                                                        # Install Dependencies
$ npm start                                                    # Run!
```

# Features

- Real-time information
- Transaction scale with value
- Hover-over transactions for more info
- Transactions move to their block once committed
- Reporting of transactions per second (TPS)
- Variable speed and node amount

# Contact

Have questions about our Github page?

Reach out to one of our team members in our main groups on [Ally](https://getally.io/c/) or [Telegram](https://t.me/skrumble) and be sure to follow us on [Twitter](https://twitter.com/SkrumbleNetwork).

For all other inquiries, please contact Shelby Pearce, Marketing Manager at Skrumble Network, at shelby@skrumble.com

# Coming Next

- [ ] IPFS Visualization
- [ ] Physics
- [ ] Dynamic Scaling
- [ ] Updated UI
- [ ] Updated Design

# License

Usage is provided under the MIT License. See [LICENSE](./master/LICENSE) for the full details.
