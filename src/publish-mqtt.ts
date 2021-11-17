import { SmartMeterOutput } from './types';
import { settings } from './settings';
import * as MQTT from 'async-mqtt'


export async function publishToMqtt(values: SmartMeterOutput) {

  try {
    var mqttClient  = await MQTT.connectAsync(settings.mqttBrokerUrl)
    if (settings.debug) {
      console.info("connected to MQTT server '%s'", settings.mqttBrokerUrl);
    }

    await publishTopic(mqttClient, settings.mqttTopic_currentPower, values.currentPower_W);
    await publishTopic(mqttClient, settings.mqttTopic_totalInjection, values.totalInjection_KWh);
    await publishTopic(mqttClient, settings.mqttTopic_totalWithdrawal, values.totalWithdrawal_KWh);

    await mqttClient.end(false);  
  }
  catch(e) {
    console.error(e);
  }
}

async function publishTopic(mqttClient: MQTT.AsyncClient, topic: string, value: string) {
  if (topic != null) {
    await mqttClient.publish(topic, value, {retain: true});
    if (settings.debug) {    
      console.info("MQTT message published: Topic: '%s', Value: '%s'", topic, value);
    }
  }
}


