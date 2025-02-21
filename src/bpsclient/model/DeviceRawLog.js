/**
 * BPS
 * Bubble Point System API
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The DeviceRawLog model module.
 * @module model/DeviceRawLog
 * @version 0.1.0
 */
class DeviceRawLog {
    /**
     * Constructs a new <code>DeviceRawLog</code>.
     * @alias module:model/DeviceRawLog
     * @param timestamp {Number} Timestamp of the log entry.
     * @param topic {String} Topic of the log entry.
     * @param message {String} Message of the log entry.
     * @param deviceId {Number} ID of the device.
     */
    constructor(timestamp, topic, message, deviceId) { 
        
        DeviceRawLog.initialize(this, timestamp, topic, message, deviceId);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, timestamp, topic, message, deviceId) { 
        obj['timestamp'] = timestamp;
        obj['topic'] = topic;
        obj['message'] = message;
        obj['device_id'] = deviceId;
    }

    /**
     * Constructs a <code>DeviceRawLog</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DeviceRawLog} obj Optional instance to populate.
     * @return {module:model/DeviceRawLog} The populated <code>DeviceRawLog</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new DeviceRawLog();

            if (data.hasOwnProperty('timestamp')) {
                obj['timestamp'] = ApiClient.convertToType(data['timestamp'], 'Number');
            }
            if (data.hasOwnProperty('topic')) {
                obj['topic'] = ApiClient.convertToType(data['topic'], 'String');
            }
            if (data.hasOwnProperty('message')) {
                obj['message'] = ApiClient.convertToType(data['message'], 'String');
            }
            if (data.hasOwnProperty('device_id')) {
                obj['device_id'] = ApiClient.convertToType(data['device_id'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>DeviceRawLog</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>DeviceRawLog</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of DeviceRawLog.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['topic'] && !(typeof data['topic'] === 'string' || data['topic'] instanceof String)) {
            throw new Error("Expected the field `topic` to be a primitive type in the JSON string but got " + data['topic']);
        }
        // ensure the json data is a string
        if (data['message'] && !(typeof data['message'] === 'string' || data['message'] instanceof String)) {
            throw new Error("Expected the field `message` to be a primitive type in the JSON string but got " + data['message']);
        }

        return true;
    }


}

DeviceRawLog.RequiredProperties = ["timestamp", "topic", "message", "device_id"];

/**
 * Timestamp of the log entry.
 * @member {Number} timestamp
 */
DeviceRawLog.prototype['timestamp'] = undefined;

/**
 * Topic of the log entry.
 * @member {String} topic
 */
DeviceRawLog.prototype['topic'] = undefined;

/**
 * Message of the log entry.
 * @member {String} message
 */
DeviceRawLog.prototype['message'] = undefined;

/**
 * ID of the device.
 * @member {Number} device_id
 */
DeviceRawLog.prototype['device_id'] = undefined;






export default DeviceRawLog;

