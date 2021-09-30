import {Settings} from './types'
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';


export let settings : Settings = {
	smartmeterSerialPort: null,
	mqttBrokerUrl: null,
    init() : Settings {
        var configFilePath = path.resolve(__dirname, 'smartmeter-to-mqtt.yaml')      
        var newSettings = yaml.load(fs.readFileSync(configFilePath, 'utf8')) as Settings;
        Object.assign(this, newSettings);
        if (this.debug) {
            console.info("Read settings: ",this);
        }
        
        return this;    
    }
};

