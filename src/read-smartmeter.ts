import { SmartMeterOutput } from './types';
import { init, ObisOptions } from 'smartmeter-obis';
import { settings } from './settings';

export async function readMeterValues(): Promise<SmartMeterOutput> {
  if (settings.debug) {
    console.log('Fetching smartmeter data...')
  }

  var smOptions: ObisOptions = {
    obisNameLanguage: 'en',
    transportSerialPort: settings.smartmeterSerialPort,
    transport: 'SerialResponseTransport',
    protocol: 'SmlProtocol',
    protocolSmlInputEncoding: 'binary',
    protocolSmlIgnoreInvalidCRC: false,
    debug: settings.debug ? 1 : 0,
    transportSerialMessageTimeout: 30 * 1000 
  }

  return new Promise((resolve) => {
    const smTransport = init(smOptions, (err, obisResult) => {
      var meterValues: SmartMeterOutput;      
      if (err) {
        // handle error
        // if you want to cancel the processing because of this error call smTransport.stop() before returning
        // else processing continues      
        console.log('ERROR: ' + err);
      }
      else {
        meterValues = {
          totalWithdrawal_KWh: obisResult["1-0:1.8.0*255"].getValue(0).value.toString(),
          totalInjection_KWh: obisResult["1-0:2.8.0*255"].getValue(0).value.toString(),
          currentPower_W: obisResult["1-0:16.7.0*255"].getValue(0).value.toString()
        };  
      }    
      smTransport.stop();
      if (settings.debug) {
        console.log("Received smartmeter values: ", meterValues);
      }
      resolve(meterValues);
    });

    smTransport.process();
  });  
};


