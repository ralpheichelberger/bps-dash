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

import ApiClient from '../BpsApiClient';

/**
 * The Customer model module.
 * @module model/Customer
 * @version 0.1.0
 */
class Customer {
    /**
     * Constructs a new <code>Customer</code>.
     * @alias module:model/Customer
     * @param id {String} 
     * @param name {String} 
     * @param active {Boolean} 
     * @param credit {Number} credit amout in euro cent
     */
    constructor(id, name, active, credit) { 
        
        Customer.initialize(this, id, name, active, credit);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, name, active, credit) { 
        obj['id'] = id;
        obj['name'] = name;
        obj['active'] = active;
        obj['credit'] = credit;
    }

    /**
     * Constructs a <code>Customer</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Customer} obj Optional instance to populate.
     * @return {module:model/Customer} The populated <code>Customer</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Customer();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('active')) {
                obj['active'] = ApiClient.convertToType(data['active'], 'Boolean');
            }
            if (data.hasOwnProperty('credit')) {
                obj['credit'] = ApiClient.convertToType(data['credit'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Customer</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Customer</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of Customer.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
            throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }

        return true;
    }


}

Customer.RequiredProperties = ["id", "name", "active", "credit"];

/**
 * @member {String} id
 */
Customer.prototype['id'] = undefined;

/**
 * @member {String} name
 */
Customer.prototype['name'] = undefined;

/**
 * @member {Boolean} active
 */
Customer.prototype['active'] = undefined;

/**
 * credit amout in euro cent
 * @member {Number} credit
 */
Customer.prototype['credit'] = undefined;






export default Customer;

