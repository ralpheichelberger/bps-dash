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
import WasherStatus from './WasherStatus';

/**
 * The DeviceUpdateStatusRequest model module.
 * @module model/DeviceUpdateStatusRequest
 * @version 0.1.0
 */
class DeviceUpdateStatusRequest {
    /**
     * Constructs a new <code>DeviceUpdateStatusRequest</code>.
     * @alias module:model/DeviceUpdateStatusRequest
     * @param id {Number} The name of the device
     * @param status {module:model/WasherStatus} 
     */
    constructor(id, status) { 
        
        DeviceUpdateStatusRequest.initialize(this, id, status);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, status) { 
        obj['id'] = id;
        obj['status'] = status;
    }

    /**
     * Constructs a <code>DeviceUpdateStatusRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DeviceUpdateStatusRequest} obj Optional instance to populate.
     * @return {module:model/DeviceUpdateStatusRequest} The populated <code>DeviceUpdateStatusRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new DeviceUpdateStatusRequest();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = WasherStatus.constructFromObject(data['status']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>DeviceUpdateStatusRequest</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>DeviceUpdateStatusRequest</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of DeviceUpdateStatusRequest.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // validate the optional field `status`
        if (data['status']) { // data not null
          WasherStatus.validateJSON(data['status']);
        }

        return true;
    }


}

DeviceUpdateStatusRequest.RequiredProperties = ["id", "status"];

/**
 * The name of the device
 * @member {Number} id
 */
DeviceUpdateStatusRequest.prototype['id'] = undefined;

/**
 * @member {module:model/WasherStatus} status
 */
DeviceUpdateStatusRequest.prototype['status'] = undefined;






export default DeviceUpdateStatusRequest;

