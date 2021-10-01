# smartmeter-to-mqtt

This is just a small application which will read the smartmeter values and publish them to a mqtt server.
It is using [Apollon77/smartmeter-obis](https://github.com/Apollon77/smartmeter-obis), so many smartmeters should be covered.

## Usage

Change the `smartmeter-to-mqtt.yaml` configuration file so that it fit your needs.

Build the package

    npm run build-ts

Run it

    npm run start

You can easily execute this on a regular basic as a cron job by adding the following line to the crontab:

    0-59/1 * * * * node <smartmeter-to-mqtt-path>/dist/main.js

(This will execute the application every minute.)
