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
 * The TopupCreditRequest model module.
 * @module model/TopupCreditRequest
 * @version 0.1.0
 */
class TopupCreditRequest {
    /**
     * Constructs a new <code>TopupCreditRequest</code>.
     * @alias module:model/TopupCreditRequest
     * @param cardId {String} The unique 9 characters card ID
     * @param amount {Number} The amount to be added to the credit in euro cents
     * @param billNr {String} The bill number associated with the top-up
     * @param typ {module:model/TopupCreditRequest.TypEnum} 
     * @param clerk {String} The card id of the clerk
     */
    constructor(cardId, amount, billNr, typ, clerk) { 
        
        TopupCreditRequest.initialize(this, cardId, amount, billNr, typ, clerk);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, cardId, amount, billNr, typ, clerk) { 
        obj['card_id'] = cardId;
        obj['amount'] = amount;
        obj['bill_nr'] = billNr;
        obj['typ'] = typ;
        obj['clerk'] = clerk;
    }

    /**
     * Constructs a <code>TopupCreditRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TopupCreditRequest} obj Optional instance to populate.
     * @return {module:model/TopupCreditRequest} The populated <code>TopupCreditRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new TopupCreditRequest();

            if (data.hasOwnProperty('card_id')) {
                obj['card_id'] = ApiClient.convertToType(data['card_id'], 'String');
            }
            if (data.hasOwnProperty('amount')) {
                obj['amount'] = ApiClient.convertToType(data['amount'], 'Number');
            }
            if (data.hasOwnProperty('bill_nr')) {
                obj['bill_nr'] = ApiClient.convertToType(data['bill_nr'], 'String');
            }
            if (data.hasOwnProperty('typ')) {
                obj['typ'] = ApiClient.convertToType(data['typ'], 'String');
            }
            if (data.hasOwnProperty('details')) {
                obj['details'] = ApiClient.convertToType(data['details'], Object);
            }
            if (data.hasOwnProperty('clerk')) {
                obj['clerk'] = ApiClient.convertToType(data['clerk'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>TopupCreditRequest</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>TopupCreditRequest</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of TopupCreditRequest.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['card_id'] && !(typeof data['card_id'] === 'string' || data['card_id'] instanceof String)) {
            throw new Error("Expected the field `card_id` to be a primitive type in the JSON string but got " + data['card_id']);
        }
        // ensure the json data is a string
        if (data['bill_nr'] && !(typeof data['bill_nr'] === 'string' || data['bill_nr'] instanceof String)) {
            throw new Error("Expected the field `bill_nr` to be a primitive type in the JSON string but got " + data['bill_nr']);
        }
        // ensure the json data is a string
        if (data['typ'] && !(typeof data['typ'] === 'string' || data['typ'] instanceof String)) {
            throw new Error("Expected the field `typ` to be a primitive type in the JSON string but got " + data['typ']);
        }
        // ensure the json data is a string
        if (data['clerk'] && !(typeof data['clerk'] === 'string' || data['clerk'] instanceof String)) {
            throw new Error("Expected the field `clerk` to be a primitive type in the JSON string but got " + data['clerk']);
        }

        return true;
    }


}

TopupCreditRequest.RequiredProperties = ["card_id", "amount", "bill_nr", "typ", "clerk"];

/**
 * The unique 9 characters card ID
 * @member {String} card_id
 */
TopupCreditRequest.prototype['card_id'] = undefined;

/**
 * The amount to be added to the credit in euro cents
 * @member {Number} amount
 */
TopupCreditRequest.prototype['amount'] = undefined;

/**
 * The bill number associated with the top-up
 * @member {String} bill_nr
 */
TopupCreditRequest.prototype['bill_nr'] = undefined;

/**
 * @member {module:model/TopupCreditRequest.TypEnum} typ
 */
TopupCreditRequest.prototype['typ'] = undefined;

/**
 * details of transaction
 * @member {Object} details
 */
TopupCreditRequest.prototype['details'] = undefined;

/**
 * The card id of the clerk
 * @member {String} clerk
 */
TopupCreditRequest.prototype['clerk'] = undefined;





/**
 * Allowed values for the <code>typ</code> property.
 * @enum {String}
 * @readonly
 */
TopupCreditRequest['TypEnum'] = {

    /**
     * value: "cash"
     * @const
     */
    "cash": "cash",

    /**
     * value: "paypal"
     * @const
     */
    "paypal": "paypal",

    /**
     * value: "admin"
     * @const
     */
    "admin": "admin"
};



export default TopupCreditRequest;

