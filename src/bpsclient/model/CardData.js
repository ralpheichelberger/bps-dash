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
 * The CardData model module.
 * @module model/CardData
 * @version 0.1.0
 */
class CardData {
    /**
     * Constructs a new <code>CardData</code>.
     * @alias module:model/CardData
     * @param id {String} The unique 9 characters card ID
     * @param name {String} 
     * @param active {Boolean} 
     * @param credit {Number} credit amout in euro cent
     * @param discount {Number} percentage of eligible discount
     */
    constructor(id, name, active, credit, discount) { 
        
        CardData.initialize(this, id, name, active, credit, discount);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, name, active, credit, discount) { 
        obj['id'] = id;
        obj['name'] = name;
        obj['active'] = active;
        obj['credit'] = credit;
        obj['discount'] = discount;
    }

    /**
     * Constructs a <code>CardData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CardData} obj Optional instance to populate.
     * @return {module:model/CardData} The populated <code>CardData</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CardData();

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
            if (data.hasOwnProperty('discount')) {
                obj['discount'] = ApiClient.convertToType(data['discount'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>CardData</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>CardData</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of CardData.RequiredProperties) {
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

CardData.RequiredProperties = ["id", "name", "active", "credit", "discount"];

/**
 * The unique 9 characters card ID
 * @member {String} id
 */
CardData.prototype['id'] = undefined;

/**
 * @member {String} name
 */
CardData.prototype['name'] = undefined;

/**
 * @member {Boolean} active
 */
CardData.prototype['active'] = undefined;

/**
 * credit amout in euro cent
 * @member {Number} credit
 */
CardData.prototype['credit'] = undefined;

/**
 * percentage of eligible discount
 * @member {Number} discount
 */
CardData.prototype['discount'] = undefined;






export default CardData;

