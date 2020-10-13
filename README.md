node-red-contrib-heatweb
========================

A <a href="http://nodered.org" target="_new">Node-RED</a> set of nodes for interacting with Heatweb systems, handling message topics, and data storage.

Pre-requisites
--------------

There are no pre-requisites.

Install
-------

Run the following command in the root directory of your Node-RED install.
This is usually `~/.node-red`

        npm install node-red-contrib-heatweb

# Usage

## Heatweb Connect Node

A single connect node should be used for establishing a link to the Heatweb server, and for initialising global variables.

### Global Variables

  - **readings** - A nested object containing all message data.
  - **node** - A unique alpha-numeric identifier for the instance.
  - **networkId** - A unique alpha-numeric **external** identifier for the network.
  - **localNetworkId** - An alpha-numeric **internal** identifier for the network.
  - **topics** - A nested object containing the dictionary for interpreting messages.

## Message Handling Node

Messages (data) fed into a handling node are stored in memory under the global **readings** object, and appended with additional relevant data extracted from the global **topics** object, such as a description and units of measurement.  

Message topics are conditioned to match the standard 5 level <a href="https://github.com/heatweb/heat-network" target="_blank">Heatweb MQTT protocol</a>:

  **network** / **publisher** / **device** / **data type** / **data key**

About
-----

Heatweb is a brand name of Thermal Integration Ltd. <a href="https://heatweb.co.uk" target="_blank">Heatweb.co.uk</a>
