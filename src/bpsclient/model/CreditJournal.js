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
 * The CreditJournal model module.
 * @module model/CreditJournal
 * @version 0.1.0
 */
class CreditJournal {
    /**
     * Constructs a new <code>CreditJournal</code>.
     * @alias module:model/CreditJournal
     * @param timestamp {Number} 
     * @param typ {module:model/CreditJournal.TypEnum} 
     * @param cardId {String} 
     * @param amount {Number} amount in cent; negative deducts from credit; positive adds to credit
     * @param billNr {String} bill nr is generated by the API using current date and time
     * @param clerk {String} the card id of the clerk
     */
    constructor(timestamp, typ, cardId, amount, billNr, clerk) { 
        
        CreditJournal.initialize(this, timestamp, typ, cardId, amount, billNr, clerk);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, timestamp, typ, cardId, amount, billNr, clerk) { 
        obj['timestamp'] = timestamp;
        obj['typ'] = typ;
        obj['card_id'] = cardId;
        obj['amount'] = amount;
        obj['bill_nr'] = billNr;
        obj['clerk'] = clerk;
    }

    /**
     * Constructs a <code>CreditJournal</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CreditJournal} obj Optional instance to populate.
     * @return {module:model/CreditJournal} The populated <code>CreditJournal</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CreditJournal();

            if (data.hasOwnProperty('timestamp')) {
                obj['timestamp'] = ApiClient.convertToType(data['timestamp'], 'Number');
            }
            if (data.hasOwnProperty('typ')) {
                obj['typ'] = ApiClient.convertToType(data['typ'], 'String');
            }
            if (data.hasOwnProperty('card_id')) {
                obj['card_id'] = ApiClient.convertToType(data['card_id'], 'String');
            }
            if (data.hasOwnProperty('amount')) {
                obj['amount'] = ApiClient.convertToType(data['amount'], 'Number');
            }
            if (data.hasOwnProperty('bill_nr')) {
                obj['bill_nr'] = ApiClient.convertToType(data['bill_nr'], 'String');
            }
            if (data.hasOwnProperty('clerk')) {
                obj['clerk'] = ApiClient.convertToType(data['clerk'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>CreditJournal</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>CreditJournal</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of CreditJournal.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['typ'] && !(typeof data['typ'] === 'string' || data['typ'] instanceof String)) {
            throw new Error("Expected the field `typ` to be a primitive type in the JSON string but got " + data['typ']);
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
        if (data['clerk'] && !(typeof data['clerk'] === 'string' || data['clerk'] instanceof String)) {
            throw new Error("Expected the field `clerk` to be a primitive type in the JSON string but got " + data['clerk']);
        }

        return true;
    }


}

CreditJournal.RequiredProperties = ["timestamp", "typ", "card_id", "amount", "bill_nr", "clerk"];

/**
 * @member {Number} timestamp
 */
CreditJournal.prototype['timestamp'] = undefined;

/**
 * @member {module:model/CreditJournal.TypEnum} typ
 */
CreditJournal.prototype['typ'] = undefined;

/**
 * @member {String} card_id
 */
CreditJournal.prototype['card_id'] = undefined;

/**
 * amount in cent; negative deducts from credit; positive adds to credit
 * @member {Number} amount
 */
CreditJournal.prototype['amount'] = undefined;

/**
 * bill nr is generated by the API using current date and time
 * @member {String} bill_nr
 */
CreditJournal.prototype['bill_nr'] = undefined;

/**
 * the card id of the clerk
 * @member {String} clerk
 */
CreditJournal.prototype['clerk'] = undefined;





/**
 * Allowed values for the <code>typ</code> property.
 * @enum {String}
 * @readonly
 */
CreditJournal['TypEnum'] = {

    /**
     * value: "topup"
     * @const
     */
    "topup": "topup",

    /**
     * value: "payment"
     * @const
     */
    "payment": "payment"
};



export default CreditJournal;

