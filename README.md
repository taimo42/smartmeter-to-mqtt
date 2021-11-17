# smartmeter-to-mqtt

This is just a small application which will read the smartmeter values and publish them to a mqtt server.
It is using [Apollon77/smartmeter-obis](https://github.com/Apollon77/smartmeter-obis), so many smartmeters should be covered.

## Usage

Change the `smartmeter-to-mqtt.yaml` configuration file so that it fit your needs.

Build the package

    npm run build-ts

Run it

    npm run start

You can easily execute this on a regular basis by using systemctl. Here is an example of the `smartmeter-to-mqtt.service` file which executes the application every minute:

```Ini

[Unit]
Description=smartmeter-to-mqtt
After=multi-user.target
Requires=network.target

[Service]
Type=simple
User=pi
ExecStart=/home/pi/.config/nvm/versions/node/v14.17.6/bin/node /home/pi/Source/smartmeter-to-mqtt/dist/main.js
Restart=always
RestartSec=60

[Install]
WantedBy=multi-user.target

```
Just put this file into `/etc/systemd/system/` and execute the following commands to enable it:

```Bash
sudo chmod 644 /etc/systemd/system/smartmeter-to-mqtt.service
sudo systemctl daemon-reload
sudo systemctl enable smartmeter-to-mqtt.service
```





