import { readMeterValues } from './read-smartmeter';
import { publishToMqtt } from './publish-mqtt';
import { settings } from './settings';

async function main() {
  settings.init();
 
  const meterValues = await readMeterValues(); 
  if (meterValues != null) {
    await publishToMqtt(meterValues);
  }  
};
  
main()
  .catch((reason) => { console.log(reason); })
  .then(() => process.exit(0))
  
