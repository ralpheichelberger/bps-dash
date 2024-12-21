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
 * The Payment model module.
 * @module model/Payment
 * @version 0.1.0
 */
class Payment {
    /**
     * Constructs a new <code>Payment</code>.
     * @alias module:model/Payment
     * @param typ {String} 
     * @param billNr {String} 
     * @param machineName {String} 
     * @param cardId {String} 
     * @param amount {Number} amount in cent; negative deducts from credit; positive adds to credit
     */
    constructor(typ, billNr, machineName, cardId, amount) { 
        
        Payment.initialize(this, typ, billNr, machineName, cardId, amount);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, typ, billNr, machineName, cardId, amount) { 
        obj['typ'] = typ;
        obj['bill_nr'] = billNr;
        obj['machine_name'] = machineName;
        obj['card_id'] = cardId;
        obj['amount'] = amount;
    }

    /**
     * Constructs a <code>Payment</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Payment} obj Optional instance to populate.
     * @return {module:model/Payment} The populated <code>Payment</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Payment();

            if (data.hasOwnProperty('typ')) {
                obj['typ'] = ApiClient.convertToType(data['typ'], 'String');
            }
            if (data.hasOwnProperty('bill_nr')) {
                obj['bill_nr'] = ApiClient.convertToType(data['bill_nr'], 'String');
            }
            if (data.hasOwnProperty('machine_name')) {
                obj['machine_name'] = ApiClient.convertToType(data['machine_name'], 'String');
            }
            if (data.hasOwnProperty('card_id')) {
                obj['card_id'] = ApiClient.convertToType(data['card_id'], 'String');
            }
            if (data.hasOwnProperty('amount')) {
                obj['amount'] = ApiClient.convertToType(data['amount'], 'Number');
            }
            if (data.hasOwnProperty('details')) {
                obj['details'] = ApiClient.convertToType(data['details'], Object);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Payment</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Payment</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of Payment.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['typ'] && !(typeof data['typ'] === 'string' || data['typ'] instanceof String)) {
            throw new Error("Expected the field `typ` to be a primitive type in the JSON string but got " + data['typ']);
        }
        // ensure the json data is a string
        if (data['bill_nr'] && !(typeof data['bill_nr'] === 'string' || data['bill_nr'] instanceof String)) {
            throw new Error("Expected the field `bill_nr` to be a primitive type in the JSON string but got " + data['bill_nr']);
        }
        // ensure the json data is a string
        if (data['machine_name'] && !(typeof data['machine_name'] === 'string' || data['machine_name'] instanceof String)) {
            throw new Error("Expected the field `machine_name` to be a primitive type in the JSON string but got " + data['machine_name']);
        }
        // ensure the json data is a string
        if (data['card_id'] && !(typeof data['card_id'] === 'string' || data['card_id'] instanceof String)) {
            throw new Error("Expected the field `card_id` to be a primitive type in the JSON string but got " + data['card_id']);
        }

        return true;
    }


}

Payment.RequiredProperties = ["typ", "bill_nr", "machine_name", "card_id", "amount"];

/**
 * @member {String} typ
 */
Payment.prototype['typ'] = undefined;

/**
 * @member {String} bill_nr
 */
Payment.prototype['bill_nr'] = undefined;

/**
 * @member {String} machine_name
 */
Payment.prototype['machine_name'] = undefined;

/**
 * @member {String} card_id
 */
Payment.prototype['card_id'] = undefined;

/**
 * amount in cent; negative deducts from credit; positive adds to credit
 * @member {Number} amount
 */
Payment.prototype['amount'] = undefined;

/**
 * details from the paypal transaction
 * @member {Object} details
 */
Payment.prototype['details'] = undefined;






export default Payment;

