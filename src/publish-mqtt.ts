import { SmartMeterOutput } from './types';
import { settings } from './settings';
import { connect, MqttClient } from 'mqtt';


export async function publishToMqtt(values: SmartMeterOutput) {
  var mqttClient  = connect(settings.mqttBrokerUrl)
  await onConnectAsync(mqttClient);
  if (settings.mqttTopic_currentPower != null) {
    mqttClient.publish(settings.mqttTopic_currentPower, values.currentPower_W, handleMqttPublishError);
  }
  if (settings.mqttTopic_totalInjection != null) {
    mqttClient.publish(settings.mqttTopic_totalInjection, values.totalInjection_KWh, handleMqttPublishError);
  }
  if (settings.mqttTopic_totalWithdrawal != null) {
      mqttClient.publish(settings.mqttTopic_totalWithdrawal, values.totalWithdrawal_KWh, handleMqttPublishError);
  }
  mqttClient.end(false);
}

async function onConnectAsync(mqttClient: MqttClient) : Promise<MqttClient> {
  return new Promise((resolve) => {
    mqttClient.on('connect', function () {
      if (settings.debug) {
        console.info('connected to MQTT server');
      }
      resolve(mqttClient);
    })
  })
}

function handleMqttPublishError(error?: Error) {
  if (error != null) {
    console.error('error in mqtt publish:', error);
  }
  else if (settings.debug) {    
    console.info('successfully published message');
  }
}

