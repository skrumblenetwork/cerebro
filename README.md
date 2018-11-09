<img src="/uploads/74f9f8d8dbf06d933a8d728e012222f4/SKM_Logo_black.svg" width=30% height=30%>

# Blockchain Visualizer
Skrumble Networks blockchain visualizer pulls data in real time from blockchains, takes that information and represents each transaction as a circle, whose size scales with value. Once a block is confirmed all the transactions are sent to that block, and it rides away. You can also view idividual transaction values, average block time, and transactions per second.
<br>

 
<p>
  <a href="#getting-started">Getting Started</a> •
  <a href="#features">Features</a> •
  <a href="#contact">Contact</a> •
  <a href="#links">Links</a> •
  <a href="#to do">To Do</a> •
  <a href="#past designs">Past Designs</a>•
  <a href="#license">License</a> 
</p>

#### Current Version
<img src="/uploads/76e63d39f877e080b0aa2a450fa6b6f1/ship2.gif">




    
# Getting Started

### Prerequisites
To run the visualizer you will need [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/download/) to install.

### Installing
```bash
$ git clone https://github.com/skrumblenetwork/skm-visualizer  # Clone Git repo
$ cd skm-visualizer                                            # Move to the directory
```

Before using `npm` the file `config.example.json` needs to be renamed to `config.json` it will be located in the `src` folder.
Within config.json set the endpoint to the network you are trying to connect to. 
you need to change the endpoint to the network


```bash
$ npm i                                                        # Install Dependencies
$ npm start                                                    # Run!
```

# Features

* Realtime Information
* Transaction scale with their value
* Hover over Transactions for more info
* Transactions move to thier block once committed
* Reporting of transactions per second (TPS)
* Variable Speed and Node Amount

# Contact
Have questions about our Github page?

Reach out to one of our team members in our main groups on [Ally](https://getally.io/c/) or [Telegram](https://t.me/skrumble) and be sure to follow us on [Twitter](https://twitter.com/SkrumbleNetwork).

For all other inquiries, please contact Shelby Pearce, Marketing Manager at Skrumble Network, at shelby@skrumble.com


# To Do
- [ ] IPFS Visualization
- [ ] Physics
- [ ] Dynamic Scaling
- [ ] Updated UI
- [ ] Updated Design



# License
Usage is provided under the MIT License. See LICENSE for the full details.