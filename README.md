<p align="center">
  <br />
  <img
    alt="Hyperledger Aries logo"
    src="https://raw.githubusercontent.com/hyperledger/aries-framework-javascript/aa31131825e3331dc93694bc58414d955dcb1129/images/aries-logo.png"
    height="250px"
  />
</p>

<h1 align="center"><b>Aries Akrida</b></h1>

<p align="center">
  <a href="#features">Features</a> &nbsp;|&nbsp;
  <a href="#design">Design</a> &nbsp;|&nbsp;
  <a href="#getting-started">Getting started</a> &nbsp;|&nbsp;
  <a href="#contributing">Contributing</a> &nbsp;|&nbsp;
  <a href="#license">License</a> 
</p>

The Aries Akrida is designed to **load test** various [Hyperledger Aries](https://www.hyperledger.org/projects/aries) **deployments**.

The project uses the [Locust](https://locust.io/) tool in combination with [Aries Framwork Javascript](https://github.com/hyperledger/aries-framework-javascript) to test [DIDComm](https://decentralized-id.com/projects/decentralized-identity-foundation/did-communications/) based protocols. 

From Ancient Greek ἀκρίς, or akrída, means locust or grasshopper.

## Features

- 🦗 Easy to run load tests distributed over multiple machines using [Locust](https://locust.io/) with the ability to swarm from thousands to hundreds of thousands of simultaneous users.
- 🐍 Easy to write Python tests
- 📦️ Isolated users using greenlet and Node.js environment
- 📃 Provides a user friendly web interface that shows the progress of your test in real-time. It can also be run without the UI, making it easy to use for CI/CD testing.

## Design 

Typically, three to four types of agents may be involved in a decentralized identity environment. There is typically a large number of holder agents, a mediator agent for the holder agents, and one or more issuer and verifier agents. In some environments, a mediator agent isn't required as the holder agents do not have dynamic IP addresses.

Example of a typical environment with a mediator:

![Typical environment with a mediator](./docs/images/holdermediatorissuer.png)

Example of a typical environment without mediator:

![Typical environment without mediator](./docs/images/holderissuerverifier.png)

Aries Akrida takes the place of the holder agents, as the typical case for load testing is to test the server infrastructure of environments. In this case the server infrastructure includes the mediator, issuer, and verifier agents. The holder agent is the client.

Example of Locust with a mediator:

![Locust with a mediator](./docs/images/locustmediatorissuer.png)

Example of Locust without mediator:

![Locust without mediator](./docs/images/locustissuerverifier.png)

Locust can run multiple holder agents per Locust instance. This can be controlled by a master Locust instance.

![Design Image](./docs/images/designTransparent.png)

Main Design Requirements
- Use proven load scale platform ( Locust )
- Support scaling with the use of clustering ( Locust )
- Provide easy to use interface with metrics ( Locust )
- Ensure each user scales independently ( Independent Aries Framework Javascript Subprocesses )
- Simulate real world clients ( Aries Framework Javascript )

Aries Akrida was built using the following code bases.

- Locust
- Aries Framework Javascript

Aries Akrida uses Locust, a load testing tool, as the base for load testing. This decision was made for the following features

- Clustering / Scaling
- Simplicity
- Community
- Open Source License

Locust is already a proven open source solution for load testing various environments. While Locust's main focus is on performance of HTTP based interfaces, Locust has the ability to be extended to support other protocols.

Aries Akrida uses Aries Framework Javascript for the DIDComm protocol. Aries Framework Javascript was chosen because many DIDComm clients are written and use Aries Framework Javascript. By using Aries Framework Javascript as the client, Aries Akirda can best simulate real world clients.

Aries Akrida uses a subprocess's stdin/stdout to call Aries Framework Javascript from Locust. Other Frameworks could be used in place of Aries Framework Javascript as long as the implement the same calls.

See [design](./docs/DESIGN.md) for more design details.

## Getting Started

Before starting any load testing you **SHOULD** gain written permission that includes the time, method and various systems that you wish to load test. You **MUST NOT** load test any system that you do **NOT** have permission to test.

For high concurrency testing, it is useful to run Locust on a VM where you can easily add more resources for bigger tests. Please read [docs/VM.md](./docs/VM.md)

### Demo

TODO

## Contributing

If you would like to contribute to the framework, please read the [Framework Developers README](/DEVREADME.md) and the [CONTRIBUTING](/CONTRIBUTING.md) guidelines. These documents will provide more information to get you started!

## License

Hyperledger Akrida is licensed under the [Apache License Version 2.0 (Apache-2.0)](/LICENSE).

## Running Locally

The following summarizes how to run the project locally and using a [VS Code DevContainer].

### DevContainer

This project contains a vscode devContainer to provide a consistent platform for running the load tests and/or mediator in a virtual environment.

Prerequisites:
- VSCode with the Dev Containers plugin installed.

To use it, open the project in VSCode and you should be prompted to `Reopen in Container`.  Click `Reopen in Container`.  Once the container has built and started you will be able to access a workspace terminal in the container where you'll be able to run your commands.  You can then follow the remainder of these steps from within the container.

ToDo:
- Enhance the dev container to automate the setup of the load testing environment.

### Local Setup Instructions

## Running load tests
```
# Clone this repo
git clone https://github.com/hyperledger/aries-mediator-service
cd aries-mediator-service

# Start in the load-testing folder
cd load-testing

# A specific fork of AFJ is currently used to support listening to trustping events. This pull request was added to AFJ, and future versions may use the standard AFJ package.
git clone https://github.com/reflectivedevelopment/aries-framework-javascript.git
cd aries-framework-javascript
git checkout feature/add_trustping_events
cd ..

# Copy the sample.env to .env and edit it according to your needs -- at least the MEDIATION URL
cp sample.env .env

# If you are running a local Mediator using the root `docker-compose.yml` file, then start it first and copy/paste the Mediation invitation URL
# MEDIATION_URL=<insert your mediation invitation url here>

# Each successive ping on an AFJ agent will be sent in a random interval between these two parameters (in seconds)
# Lower these to send more pings
# LOCUST_MIN_WAIT=60 min time between pings
# LOCUST_MAX_WAIT=120 max time between pings

# Some tests require the issuer or verifier to talk directly to AFJ. A port and IP address are required for this. The ports and IP address must be available for the Issuer or Verifier to contact for the tests to work correctly. In the case that the test is using a mediator, the IP and address don't need to be publicly available, but they still need to be allocated for code simplification.

# AGENT_IP=172.16.49.18

# A port range is required since each AFJ agent requires its own port. The ports are in a pool and are acquired from the pool as needed. If the process runs out of ports during operation, it will hang causes locust to freeze. Allocating at least one IP address per locust user is required. All the ports are mapped in Docker, so the more ports that are mapped, the longer it will take to start the docker environment.
# The more ports you allocate, the longer to start and stop the Locust

# START_PORT=10000
# END_PORT=12000

# More than one locust file can be specified at a time. Each locust User will be assigned to run one test. After the tests are defined, other locust commands could be added to the end of the LOCUST_FILES parameter.
# For mediator testing use just the "locustMediatorPing.py" as notes in the sample.env
# LOCUST_FILES=locustMediatorPing.py,locustIssue.py # Specifies which tests to run
# LOCUST_FILES=locustMediatorPing.py --master -P 8090

# The Issuer URL and HEADERS required to use the issuer
# Not needed for Mediator testing with pings
# ISSUER_URL=http://172.16.49.18:8150
# ISSUER_HEADERS={"Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ3YWxsZXRfaWQiOiIwOWY5ZDAwNC02OTM0LTQyZDYtOGI4NC1jZTY4YmViYzRjYTUiLCJpYXQiOjE2NzY4NDExMTB9.pDQPjiYEAoDJf3044zbsHrSjijgS-yC8t-9ZiuC08x8"}

# The cred def, credential attributes, and schema used for issuer load testing.
# Not needed for Mediator testing with pings
# CRED_DEF=MjCTo55s4x1UWy2W2spuU2:3:CL:131358:default
# CRED_ATTR='[{"mime-type": "text/plain","name": "score","value": "test"}]'
# SCHEMA=MjCTo55s4x1UWy2W2spuU2:2:prefs:1.0

# The ledger to use for issuance and verification. Additional networks can be added to config.js
# Not needed for Mediator testing with pings
# LEDGER=candy

docker-compose build
docker-compose up

# open web browser to localhost:8089
# Use the interface to start and stop tests, review results
```

## Issuer configuration

Accept TAA

Register DID

Register Schema

{
  "attributes": [
    "score"
  ],
  "schema_name": "prefs",
  "schema_version": "1.0"
}

Register Cred Def

Add Cred Def and Schema to env

## Load Test Notes

The start rate for clients, when to high will, will cause the mediator to be overloaded.
Starting at new clients of 0.4 for every second is a good starting point.

Since the load testing uses AFJ for the clients, it may require more resources to run the
load environment than other Locust based load testing frameworks.

## Multi machine load test

Multiple locust nodes can be run to distribute the load testing. In the case of running
multiple nodes, you need to ensure each node has the environment variables set.

The master node will need to have a port opened to listen to incoming workers.

```
locust --master -P 8090
locust --worker
locust --worker  --master-host 10.128.15.214
```

## locustfile.py

The locustfile.py controls the AFJ agent by sending commands via STDIN and STDOUT over the subprocess. For load testing there are several different type of load tests that we wanted to run, so we created a base class locustClient.py that controls the agent.js AFJ script.

This is done for two reasons.

- The ARIES Framework clients are known to throw uncaught exceptions or crash under some circumstances, such as timeouts
- AFJ is written in JavaScript, and does not have a Python integration at this time. Using a subprocess allows locust to call AFJ code.

There is some issues that arise from agents crashing. The locustfile code focuses on handling agent crashes and ensuring the agents are running for the ping requests.

### locustIssue.py

locustIssue.py is designed to test issuing credentials. 

### locustMediatorIssue.py

locustIssue.py is designed to test issuing credentials using a mediator.

### locustIssueMsg.py

locustIssueMsg.py is designed to test sending messages from the issuer to the AFJ Client.

### locustMediatorMsg.py

locustMediatorMsg.py is designed to test sending messages from the issuer to the AFJ Client using the mediator.

### locustMediatorPing.py

locustMediatorPing.py is designed to test the number of agents that can connect to a mediator. A ping will be sent to the mediator and return via the websocket connection to ensure the agent is still connected.

### locustLiveness.py

locustLiveness.py is designed to test the issuer's /status REST API Call.

## agent.js

The agent.js is an event based architecture. It has a readline loop that listens for incoming commands. Commands are json strings. Examples

```
{"cmd":"start"}
{"cmd":"ping_mediator"}
{"cmd":"shutdown"}
```

## System requirements

* An IP address and ports accessible to the Issuer or Verifier if running tests without a mediator
* Each AFJ agent requires approximately 52 - 100 MB of ram. So a 32 GB machine should be able to run approximately 550 Users assuming 4 GB of OS overhead.
* CPU usage will vary depending upon LOCUST_X_TIME and load test being run

### Memory Usage

Memory usage is more complicated than looking at top and using the RSS value.

Looking at the process status in linux we can see the following
```
cat /proc/15041/status

Name:   node
Umask:  0022
State:  S (sleeping)
Tgid:   15041
Ngid:   0
Pid:    15041
PPid:   14769
TracerPid:      0
Uid:    0       0       0       0
Gid:    0       0       0       0
FDSize: 64
Groups:  
NStgid: 15041   178
NSpid:  15041   178
NSpgid: 14769   1
NSsid:  14769   1
VmPeak: 12090960 kB
VmSize: 12023888 kB
VmLck:         0 kB
VmPin:         0 kB
VmHWM:    225704 kB
VmRSS:    100892 kB
RssAnon:           49280 kB
RssFile:           51612 kB
RssShmem:              0 kB
VmData:   173944 kB
VmStk:       132 kB
VmExe:     78112 kB
VmLib:     16852 kB
VmPTE:      2760 kB
VmSwap:        0 kB
HugetlbPages:          0 kB
CoreDumping:    0
THP_enabled:    1
Threads:        19
SigQ:   0/63948
SigPnd: 0000000000000000
ShdPnd: 0000000000000000
SigBlk: 0000000000000000
SigIgn: 0000000001001000
SigCgt: 0000000188004602
CapInh: 00000000a80425fb
CapPrm: 00000000a80425fb
CapEff: 00000000a80425fb
CapBnd: 00000000a80425fb
CapAmb: 0000000000000000
NoNewPrivs:     0
Seccomp:        2
Seccomp_filters:        1
Speculation_Store_Bypass:       thread force mitigated
Cpus_allowed:   f
Cpus_allowed_list:      0-3
Mems_allowed:   00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000001
Mems_allowed_list:      0
voluntary_ctxt_switches:        1162
nonvoluntary_ctxt_switches:     644
```

Focusing on memory usage

```
RssAnon:           49280 kB
RssFile:           51612 kB
```

It can be seen that the process uses a unique 49280 kB, but since the RssFile can be shared between processes, only one copy of 51612 kB needs to reside in memory. This results in each process using around ~50 MB of ram with an additional ~50 MB shared with all the processes.
