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
import Module from './Module';
import PumpRelayStatus from './PumpRelayStatus';

/**
 * The PumpRelay model module.
 * @module model/PumpRelay
 * @version 0.1.0
 */
class PumpRelay {
    /**
     * Constructs a new <code>PumpRelay</code>.
     * is a module with an array of pump relays
     * @alias module:model/PumpRelay
     * @param id {Number} 
     * @param location {String} 
     * @param module {module:model/Module} 
     * @param status {module:model/PumpRelayStatus} 
     */
    constructor(id, location, module, status) { 
        
        PumpRelay.initialize(this, id, location, module, status);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, location, module, status) { 
        obj['id'] = id;
        obj['location'] = location;
        obj['module'] = module;
        obj['status'] = status;
    }

    /**
     * Constructs a <code>PumpRelay</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PumpRelay} obj Optional instance to populate.
     * @return {module:model/PumpRelay} The populated <code>PumpRelay</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new PumpRelay();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('location')) {
                obj['location'] = ApiClient.convertToType(data['location'], 'String');
            }
            if (data.hasOwnProperty('module')) {
                obj['module'] = Module.constructFromObject(data['module']);
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = PumpRelayStatus.constructFromObject(data['status']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>PumpRelay</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>PumpRelay</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of PumpRelay.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['location'] && !(typeof data['location'] === 'string' || data['location'] instanceof String)) {
            throw new Error("Expected the field `location` to be a primitive type in the JSON string but got " + data['location']);
        }
        // validate the optional field `module`
        if (data['module']) { // data not null
          Module.validateJSON(data['module']);
        }
        // validate the optional field `status`
        if (data['status']) { // data not null
          PumpRelayStatus.validateJSON(data['status']);
        }

        return true;
    }


}

PumpRelay.RequiredProperties = ["id", "location", "module", "status"];

/**
 * @member {Number} id
 */
PumpRelay.prototype['id'] = undefined;

/**
 * @member {String} location
 */
PumpRelay.prototype['location'] = undefined;

/**
 * @member {module:model/Module} module
 */
PumpRelay.prototype['module'] = undefined;

/**
 * @member {module:model/PumpRelayStatus} status
 */
PumpRelay.prototype['status'] = undefined;






export default PumpRelay;

