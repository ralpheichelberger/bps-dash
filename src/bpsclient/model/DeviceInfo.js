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
import DeviceState from './DeviceState';
import DeviceType from './DeviceType';

/**
 * The DeviceInfo model module.
 * @module model/DeviceInfo
 * @version 0.1.0
 */
class DeviceInfo {
    /**
     * Constructs a new <code>DeviceInfo</code>.
     * device information aggregated from the device, price line and shop list
     * @alias module:model/DeviceInfo
     * @param name {String} name of the device used in MQTT communication
     * @param location {String} location of the device real address of the shop
     * @param type {module:model/DeviceType} 
     * @param price {Number} price of the device in euro cent
     * @param state {module:model/DeviceState} 
     * @param impulsDuration {Number} duration for the relay the device in 1/10 of seconds
     * @param detergent {Boolean} if detergent is available
     * @param softener {Boolean} if softener is available
     */
    constructor(name, location, type, price, state, impulsDuration, detergent, softener) { 
        
        DeviceInfo.initialize(this, name, location, type, price, state, impulsDuration, detergent, softener);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, name, location, type, price, state, impulsDuration, detergent, softener) { 
        obj['name'] = name;
        obj['location'] = location;
        obj['type'] = type;
        obj['price'] = price;
        obj['state'] = state;
        obj['impuls_duration'] = impulsDuration;
        obj['detergent'] = detergent;
        obj['softener'] = softener;
    }

    /**
     * Constructs a <code>DeviceInfo</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DeviceInfo} obj Optional instance to populate.
     * @return {module:model/DeviceInfo} The populated <code>DeviceInfo</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new DeviceInfo();

            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('location')) {
                obj['location'] = ApiClient.convertToType(data['location'], 'String');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = DeviceType.constructFromObject(data['type']);
            }
            if (data.hasOwnProperty('price')) {
                obj['price'] = ApiClient.convertToType(data['price'], 'Number');
            }
            if (data.hasOwnProperty('dryer_units')) {
                obj['dryer_units'] = ApiClient.convertToType(data['dryer_units'], 'Number');
            }
            if (data.hasOwnProperty('state')) {
                obj['state'] = DeviceState.constructFromObject(data['state']);
            }
            if (data.hasOwnProperty('impuls_duration')) {
                obj['impuls_duration'] = ApiClient.convertToType(data['impuls_duration'], 'Number');
            }
            if (data.hasOwnProperty('detergent')) {
                obj['detergent'] = ApiClient.convertToType(data['detergent'], 'Boolean');
            }
            if (data.hasOwnProperty('softener')) {
                obj['softener'] = ApiClient.convertToType(data['softener'], 'Boolean');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>DeviceInfo</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>DeviceInfo</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of DeviceInfo.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['location'] && !(typeof data['location'] === 'string' || data['location'] instanceof String)) {
            throw new Error("Expected the field `location` to be a primitive type in the JSON string but got " + data['location']);
        }

        return true;
    }


}

DeviceInfo.RequiredProperties = ["name", "location", "type", "price", "state", "impuls_duration", "detergent", "softener"];

/**
 * name of the device used in MQTT communication
 * @member {String} name
 */
DeviceInfo.prototype['name'] = undefined;

/**
 * location of the device real address of the shop
 * @member {String} location
 */
DeviceInfo.prototype['location'] = undefined;

/**
 * @member {module:model/DeviceType} type
 */
DeviceInfo.prototype['type'] = undefined;

/**
 * price of the device in euro cent
 * @member {Number} price
 */
DeviceInfo.prototype['price'] = undefined;

/**
 * number of dryer units
 * @member {Number} dryer_units
 */
DeviceInfo.prototype['dryer_units'] = undefined;

/**
 * @member {module:model/DeviceState} state
 */
DeviceInfo.prototype['state'] = undefined;

/**
 * duration for the relay the device in 1/10 of seconds
 * @member {Number} impuls_duration
 */
DeviceInfo.prototype['impuls_duration'] = undefined;

/**
 * if detergent is available
 * @member {Boolean} detergent
 */
DeviceInfo.prototype['detergent'] = undefined;

/**
 * if softener is available
 * @member {Boolean} softener
 */
DeviceInfo.prototype['softener'] = undefined;






export default DeviceInfo;

