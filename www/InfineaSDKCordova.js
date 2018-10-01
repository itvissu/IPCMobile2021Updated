var exec = require('cordova/exec');

// Enum
var SUPPORTED_DEVICE_TYPES = {
    /**
     All device types, used when setting active device
     */
DEVICE_TYPE_ALL: -1,
    /**
     Linea Pro 1,2,3,4,4s, LineaTab
     */
DEVICE_TYPE_LINEA: 0,
    /**
     Any of the supported printers - PP-60, DPP-250, DPP-350, DPP-450
     */
DEVICE_TYPE_PRINTER: 1,
    /**
     Any of the supported pinpads - MPED-400, PPAD1, BP50, BP500
     */
DEVICE_TYPE_PINPAD: 2,
    /**
     Transport device for connecting to other devices via bluetooth
     */
DEVICE_TYPE_ISERIAL: 3,
    /**
     Any of the supported zebra printers - DPP-450
     */
DEVICE_TYPE_PRINTER_ZPL: 4,
    /**
     Any of the supported iHUB devices
     */
DEVICE_TYPE_IHUB: 5,
    /**
     Any of the supported HID barcode devices
     */
DEVICE_TYPE_HID_BARCODE: 6,
    /**
     Any of the supported USB magnetic stripe reader devices
     */
DEVICE_TYPE_USB_MSR: 7,
    /**
     HID keyboard devices
     */
DEVICE_TYPE_HID_KEYBOARD: 8,
};

var CONN_STATES = {
    /**
     Device is disconnected, no automatic connection attempts will be made
     */
CONN_DISCONNECTED: 0,
    /**
     The SDK is trying to connect to the device
     */
CONN_CONNECTING: 1,
    /**
     Device is connected
     */
CONN_CONNECTED: 2
};

var BATTERY_CHIPS = {
BATTERY_CHIP_NONE: 0,
BATTERY_CHIP_BQ27421: 1,
};

var SCAN_MODES = {
    /**
     The scan will be terminated after successful barcode recognition (default)
     */
    MODE_SINGLE_SCAN: 0,
    /**
     Scanning will continue unless either scan button is releasd, or stop scan function is called
     */
    MODE_MULTI_SCAN: 1,
    /**
     For as long as scan button is pressed or stop scan is not called the engine will operate in low power scan mode trying to detect objects entering the area, then will turn on the lights and try to read the barcode. Supported only on Code engine.
     */
    MODE_MOTION_DETECT: 2,
    /**
     Pressing the button/start scan will enter aim mode, while a barcode scan will actually be performed upon button release/stop scan.
     */
    MODE_SINGLE_SCAN_RELEASE: 3,
    /**
     Same as multi scan mode, but allowing no duplicate barcodes to be scanned
     */
    MODE_MULTI_SCAN_NO_DUPLICATES: 4,
};


// ******* SDK Delegates ********
// These functions will be called when the scanner receives these events
/**
 * Callback from SDK
 * @param {string} barcode The scanned barcode
 * @param {int} type The barcode type
 */
exports.barcodeData = function (barcode, type) {
    
};

/**
 * Called by SDK to notify the current connection state
 * @param {int} state The connection state CONN_STATES
 */
exports.connectionState = function (state) {
    
};

/**
 * Called when an wireless card is in the field. Should power off after successful read.
 * @param {int} cardIndex 
 * @param {key-value} cardInfo
 */
exports.rfCardDetected = function (cardIndex, cardInfo) {
    
};

/**
 * Card tracks data in plain text
 * @param {string} track1
 * @param {string} track2
 * @param {string} track3
 */
exports.magneticCardData = function (track1, track2, track3) {
    
};

/**
 * Called when device unsuccessful reading a card
 * @param {int} source the track data source, one of the CARD_* constants
 * @param {int} reason card failed reason, one of the REASON_* constants
 */
exports.magneticCardReadFailed = function (source, reason) {
    
};

/**
 * Called when a card is read and the head is encrypted.
 * @param {int} encryption encryption algorithm used
 * @param {int} tracks contain information which tracks are successfully read and inside the encrypted data as bit fields, bit 1 corresponds to track 1, etc, so value of 7 means all tracks are read
 * @param {data} data contains the encrypted card data
 */
exports.magneticCardEncryptedData = function (encryption, tracks, data) {
    
};

/**
 * Called when a hardware button is pressed
 * @param {int} which Button index
 */
exports.deviceButtonPressed = function (which) {

};

/**
 * Called when a hardware button released
 * @param {int} which Button index
 */
exports.deviceButtonReleased = function (which) {

};

// ******************************


/**
 * This must be the first function that gets called, and a valid develop key must be passed in, and validated, BEFORE any other functions get executed.
 * @param {string} key The developer key given by IPC
 */
exports.setDeveloperKey = function (key) {
    exec(null, null, 'InfineaSDKCordova', 'setDeveloperKey', [key]);
};

/**
 * Connect the hardware
 * @param {function} success
 * @param {function} error The error reason will be passed in if available
 */
exports.connect = function () {
    exec(null, null, 'InfineaSDKCordova', 'connect', []);
};

/**
 * Disconnect the hardware
 * @param {function} success
 * @param {function} error The error reason will be passed in if available
 */
exports.disconnect = function () {
    exec(null, null, 'InfineaSDKCordova', 'disconnect', []);
};

/**
 * Get the connected device info. Info will be passed to success function
 * @param {SUPPORTED_DEVICE_TYPES} deviceType
 * @param {function} success
 * @param {function} error The error reason will be passed in if available
 */
exports.getConnectedDeviceInfo = function (deviceType, success, error) {
    exec(success, error, 'InfineaSDKCordova', 'getConnectedDeviceInfo', [deviceType]);
};

/**
 * Get the all connected devices info. Info will be passed to success function
 * @param {function} success
 * @param {function} error The error reason will be passed in if available
 */
exports.getConnectedDevicesInfo = function (success, error) {
    exec(success, error, 'InfineaSDKCordova', 'getConnectedDevicesInfo', []);
};

/**
 * Set pass-thru sync
 * @param {bool} value true or false
 * @param {function} error The error reason will be passed in if available
 */
exports.setPassThroughSync = function (value, error) {
    exec(null, error, 'InfineaSDKCordova', 'setPassThroughSync', [value]);
};

/**
 * Get pass-thru sync enabled or disabled
 * @param {function} success The result will be passed in this function
 * @param {function} error The error reason will be passed in if available
 */
exports.getPassThroughSync = function (success, error) {
    exec(success, error, 'InfineaSDKCordova', 'getPassThroughSync', []);
};

/**
 * Set the USB current
 * @param {int} value Must be one of 500, 1000, 2100, 2400
 * @param {function} error The error reason will be passed in if available
 */
exports.setUSBChargeCurrent = function (value, error) {
    exec(null, error, 'InfineaSDKCordova', 'setUSBChargeCurrent', [value]);
};

/**
 * Get current USB charge current
 * @param {function} success The usb current will be passed in this function
 * @param {function} error The error reason will be passed in if available
 */
exports.getUSBChargeCurrent = function (success, error) {
    exec(success, error, 'InfineaSDKCordova', 'getUSBChargeCurrent', []);
};

/**
 * Get battery info
 * @param {function} success The battery info will be passed in as key-value
 * @param {function} error The error reason will be passed in if available
 */
exports.getBatteryInfo = function (success, error) {
    exec(success, error, 'InfineaSDKCordova', 'getBatteryInfo', []);
};

/**
 * Set IPC device sleep timer
 * @param {int} timeIdle this is the idle time, connected or not, after which Linea will turn off. The default value is 5400 seconds (90 minutes)
 * @param {int} timeDisconnected this is the time with no active program connection, after which Linea will turn off. The default value is 30 seconds
 * @param {function} error The error reason will be passed in if available
 */
exports.setAutoOffWhenIdle = function (timeIdle, timeDisconnected, error) {
    exec(null, error, 'InfineaSDKCordova', 'setAutoOffWhenIdle', [timeIdle, timeDisconnected]);
};

/**
 * Power on the RF module. Continuously leaving the RF module powered on will drain battery.
 * @param {function} error The error reason will be passed in if available
 */
exports.rfInit = function (error) {
    exec(null, error, 'InfineaSDKCordova', 'rfInit', []);
};

/**
 * Power down the RF module, when not in use.
 * @param {function} error The error reason will be passed in if available
 */
exports.rfClose = function (error) {
    exec(null, error, 'InfineaSDKCordova', 'rfClose', []);
};

/**
 * Get the scan button mode
 * @param {function} success The scan button mode will be passed in as boolean
 * @param {function} error The error reason will be passed in if available
 */
exports.barcodeGetScanButtonMode = function (success, error) {
    exec(success, error, 'InfineaSDKCordova', 'barcodeGetScanButtonMode', []);
};

/**
 * Enable or Disable scan button.
 * @param {boolean} scanButtonMode true or false
 * @param {function} error The error reason will be passed in if available
 */
exports.barcodeSetScanButtonMode = function (scanButtonMode, error) {
    exec(null, error, 'InfineaSDKCordova', 'barcodeSetScanButtonMode', [scanButtonMode]);
};

/**
 * Get the current barcode scan mode, one of SCAN_MODES
 * @param {function} success The scan mode will be passed in here, one of SCAN_MODES
 * @param {function} error The error reason will be passed in if available
 */
exports.barcodeGetScanMode = function (success, error) {
    exec(success, error, 'InfineaSDKCordova', 'barcodeGetScanMode', []);
};

/**
 * Set a specific scan mode, one of SCAN_MODES
 * @param {int} scanMode One of SCAN_MODES
 * @param {*} error The error reason will be passed in if available
 */
exports.barcodeSetScanMode = function (scanMode, error) {
    exec(null, error, 'InfineaSDKCordova', 'barcodeSetScanMode', [scanMode]);
};

/**
 * Start scan engine. Can be used for on screen scan button
 * @param {function} success Called if execution success
 * @param {function} error The error reason will be passed in if available
 */
exports.barcodeStartScan = function (success, error) {
    exec(success, error, 'InfineaSDKCordova', 'barcodeStartScan', []);
};

/**
 * Stop scan engine. If using an on screen scan button, call this after a barcode is read.
 * @param {function} success Called if execution success
 * @param {function} error The error reason will be passed in if available
 */
exports.barcodeStopScan = function (success, error) {
    exec(success, error, 'InfineaSDKCordova', 'barcodeStopScan', []);
};
