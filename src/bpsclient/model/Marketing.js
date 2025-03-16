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
 * The Marketing model module.
 * @module model/Marketing
 * @version 0.1.0
 */
class Marketing {
    /**
     * Constructs a new <code>Marketing</code>.
     * @alias module:model/Marketing
     * @param code {String} code of the marketing action
     * @param uuid {String} uuid of the user
     * @param cnt {Number} count of calling the same code
     * @param eligible {Number} count of eligible usage of the code
     */
    constructor(code, uuid, cnt, eligible) { 
        
        Marketing.initialize(this, code, uuid, cnt, eligible);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, code, uuid, cnt, eligible) { 
        obj['code'] = code;
        obj['uuid'] = uuid;
        obj['cnt'] = cnt;
        obj['eligible'] = eligible;
    }

    /**
     * Constructs a <code>Marketing</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Marketing} obj Optional instance to populate.
     * @return {module:model/Marketing} The populated <code>Marketing</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Marketing();

            if (data.hasOwnProperty('code')) {
                obj['code'] = ApiClient.convertToType(data['code'], 'String');
            }
            if (data.hasOwnProperty('uuid')) {
                obj['uuid'] = ApiClient.convertToType(data['uuid'], 'String');
            }
            if (data.hasOwnProperty('cnt')) {
                obj['cnt'] = ApiClient.convertToType(data['cnt'], 'Number');
            }
            if (data.hasOwnProperty('eligible')) {
                obj['eligible'] = ApiClient.convertToType(data['eligible'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Marketing</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Marketing</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of Marketing.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['code'] && !(typeof data['code'] === 'string' || data['code'] instanceof String)) {
            throw new Error("Expected the field `code` to be a primitive type in the JSON string but got " + data['code']);
        }
        // ensure the json data is a string
        if (data['uuid'] && !(typeof data['uuid'] === 'string' || data['uuid'] instanceof String)) {
            throw new Error("Expected the field `uuid` to be a primitive type in the JSON string but got " + data['uuid']);
        }

        return true;
    }


}

Marketing.RequiredProperties = ["code", "uuid", "cnt", "eligible"];

/**
 * code of the marketing action
 * @member {String} code
 */
Marketing.prototype['code'] = undefined;

/**
 * uuid of the user
 * @member {String} uuid
 */
Marketing.prototype['uuid'] = undefined;

/**
 * count of calling the same code
 * @member {Number} cnt
 */
Marketing.prototype['cnt'] = undefined;

/**
 * count of eligible usage of the code
 * @member {Number} eligible
 */
Marketing.prototype['eligible'] = undefined;






export default Marketing;

