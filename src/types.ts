

export type Settings = {
	smartmeterSerialPort: string
	mqttBrokerUrl: string
	mqttTopic_currentPower?: string
	mqttTopic_totalInjection?: string
	mqttTopic_totalWithdrawal?: string
	debug?: boolean
	init: () => Settings
}

export type SmartMeterOutput = {
	currentPower_W:      string
	totalInjection_KWh:  string
	totalWithdrawal_KWh: string
};
