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
 * The DeviceOutOfOrderRequest model module.
 * @module model/DeviceOutOfOrderRequest
 * @version 0.1.0
 */
class DeviceOutOfOrderRequest {
    /**
     * Constructs a new <code>DeviceOutOfOrderRequest</code>.
     * @alias module:model/DeviceOutOfOrderRequest
     * @param id {Number} The ID of the device
     * @param outOfOrder {Boolean} 
     */
    constructor(id, outOfOrder) { 
        
        DeviceOutOfOrderRequest.initialize(this, id, outOfOrder);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, outOfOrder) { 
        obj['id'] = id;
        obj['out_of_order'] = outOfOrder;
    }

    /**
     * Constructs a <code>DeviceOutOfOrderRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DeviceOutOfOrderRequest} obj Optional instance to populate.
     * @return {module:model/DeviceOutOfOrderRequest} The populated <code>DeviceOutOfOrderRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new DeviceOutOfOrderRequest();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('out_of_order')) {
                obj['out_of_order'] = ApiClient.convertToType(data['out_of_order'], 'Boolean');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>DeviceOutOfOrderRequest</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>DeviceOutOfOrderRequest</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of DeviceOutOfOrderRequest.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }

        return true;
    }


}

DeviceOutOfOrderRequest.RequiredProperties = ["id", "out_of_order"];

/**
 * The ID of the device
 * @member {Number} id
 */
DeviceOutOfOrderRequest.prototype['id'] = undefined;

/**
 * @member {Boolean} out_of_order
 */
DeviceOutOfOrderRequest.prototype['out_of_order'] = undefined;






export default DeviceOutOfOrderRequest;

