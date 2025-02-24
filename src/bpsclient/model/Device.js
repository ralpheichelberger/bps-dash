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
import DeviceRawLog from './DeviceRawLog';
import DeviceType from './DeviceType';
import Module from './Module';
import Pump from './Pump';
import WasherStatus from './WasherStatus';

/**
 * The Device model module.
 * @module model/Device
 * @version 0.1.0
 */
class Device {
    /**
     * Constructs a new <code>Device</code>.
     * @alias module:model/Device
     * @param id {Number} 
     * @param nr {Number} 
     * @param typ {module:model/DeviceType} 
     * @param location {String} 
     * @param priceLine {String} 
     * @param module {module:model/Module} 
     * @param detergent {module:model/Pump} 
     * @param softener {module:model/Pump} 
     * @param status {module:model/WasherStatus} 
     */
    constructor(id, nr, typ, location, priceLine, module, detergent, softener, status) { 
        
        Device.initialize(this, id, nr, typ, location, priceLine, module, detergent, softener, status);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, nr, typ, location, priceLine, module, detergent, softener, status) { 
        obj['id'] = id;
        obj['nr'] = nr;
        obj['typ'] = typ;
        obj['location'] = location;
        obj['priceLine'] = priceLine;
        obj['module'] = module;
        obj['detergent'] = detergent;
        obj['softener'] = softener;
        obj['status'] = status;
    }

    /**
     * Constructs a <code>Device</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Device} obj Optional instance to populate.
     * @return {module:model/Device} The populated <code>Device</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Device();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('nr')) {
                obj['nr'] = ApiClient.convertToType(data['nr'], 'Number');
            }
            if (data.hasOwnProperty('typ')) {
                obj['typ'] = DeviceType.constructFromObject(data['typ']);
            }
            if (data.hasOwnProperty('location')) {
                obj['location'] = ApiClient.convertToType(data['location'], 'String');
            }
            if (data.hasOwnProperty('priceLine')) {
                obj['priceLine'] = ApiClient.convertToType(data['priceLine'], 'String');
            }
            if (data.hasOwnProperty('module')) {
                obj['module'] = Module.constructFromObject(data['module']);
            }
            if (data.hasOwnProperty('detergent')) {
                obj['detergent'] = Pump.constructFromObject(data['detergent']);
            }
            if (data.hasOwnProperty('softener')) {
                obj['softener'] = Pump.constructFromObject(data['softener']);
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = WasherStatus.constructFromObject(data['status']);
            }
            if (data.hasOwnProperty('logs')) {
                obj['logs'] = ApiClient.convertToType(data['logs'], [DeviceRawLog]);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Device</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Device</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of Device.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['location'] && !(typeof data['location'] === 'string' || data['location'] instanceof String)) {
            throw new Error("Expected the field `location` to be a primitive type in the JSON string but got " + data['location']);
        }
        // ensure the json data is a string
        if (data['priceLine'] && !(typeof data['priceLine'] === 'string' || data['priceLine'] instanceof String)) {
            throw new Error("Expected the field `priceLine` to be a primitive type in the JSON string but got " + data['priceLine']);
        }
        // validate the optional field `module`
        if (data['module']) { // data not null
          Module.validateJSON(data['module']);
        }
        // validate the optional field `detergent`
        if (data['detergent']) { // data not null
          Pump.validateJSON(data['detergent']);
        }
        // validate the optional field `softener`
        if (data['softener']) { // data not null
          Pump.validateJSON(data['softener']);
        }
        // validate the optional field `status`
        if (data['status']) { // data not null
          WasherStatus.validateJSON(data['status']);
        }
        if (data['logs']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['logs'])) {
                throw new Error("Expected the field `logs` to be an array in the JSON data but got " + data['logs']);
            }
            // validate the optional field `logs` (array)
            for (const item of data['logs']) {
                DeviceRawLog.validateJSON(item);
            };
        }

        return true;
    }


}

Device.RequiredProperties = ["id", "nr", "typ", "location", "priceLine", "module", "detergent", "softener", "status"];

/**
 * @member {Number} id
 */
Device.prototype['id'] = undefined;

/**
 * @member {Number} nr
 */
Device.prototype['nr'] = undefined;

/**
 * @member {module:model/DeviceType} typ
 */
Device.prototype['typ'] = undefined;

/**
 * @member {String} location
 */
Device.prototype['location'] = undefined;

/**
 * @member {String} priceLine
 */
Device.prototype['priceLine'] = undefined;

/**
 * @member {module:model/Module} module
 */
Device.prototype['module'] = undefined;

/**
 * @member {module:model/Pump} detergent
 */
Device.prototype['detergent'] = undefined;

/**
 * @member {module:model/Pump} softener
 */
Device.prototype['softener'] = undefined;

/**
 * @member {module:model/WasherStatus} status
 */
Device.prototype['status'] = undefined;

/**
 * @member {Array.<module:model/DeviceRawLog>} logs
 */
Device.prototype['logs'] = undefined;






export default Device;

