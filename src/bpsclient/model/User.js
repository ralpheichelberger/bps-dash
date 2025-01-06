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
 * The User model module.
 * @module model/User
 * @version 0.1.0
 */
class User {
    /**
     * Constructs a new <code>User</code>.
     * @alias module:model/User
     * @param typ {module:model/User.TypEnum} 
     * @param id {String} 
     * @param name {String} 
     * @param active {Boolean} 
     * @param credit {Number} credit amout in euro cent
     * @param prefs {Object} preferences of the user
     */
    constructor(typ, id, name, active, credit, prefs) { 
        
        User.initialize(this, typ, id, name, active, credit, prefs);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, typ, id, name, active, credit, prefs) { 
        obj['typ'] = typ;
        obj['id'] = id;
        obj['name'] = name;
        obj['active'] = active;
        obj['credit'] = credit;
        obj['prefs'] = prefs;
    }

    /**
     * Constructs a <code>User</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/User} obj Optional instance to populate.
     * @return {module:model/User} The populated <code>User</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new User();

            if (data.hasOwnProperty('typ')) {
                obj['typ'] = ApiClient.convertToType(data['typ'], 'String');
            }
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
            if (data.hasOwnProperty('token')) {
                obj['token'] = ApiClient.convertToType(data['token'], 'String');
            }
            if (data.hasOwnProperty('prefs')) {
                obj['prefs'] = ApiClient.convertToType(data['prefs'], Object);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>User</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>User</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of User.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['typ'] && !(typeof data['typ'] === 'string' || data['typ'] instanceof String)) {
            throw new Error("Expected the field `typ` to be a primitive type in the JSON string but got " + data['typ']);
        }
        // ensure the json data is a string
        if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
            throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['token'] && !(typeof data['token'] === 'string' || data['token'] instanceof String)) {
            throw new Error("Expected the field `token` to be a primitive type in the JSON string but got " + data['token']);
        }

        return true;
    }


}

User.RequiredProperties = ["typ", "id", "name", "active", "credit", "prefs"];

/**
 * @member {module:model/User.TypEnum} typ
 */
User.prototype['typ'] = undefined;

/**
 * @member {String} id
 */
User.prototype['id'] = undefined;

/**
 * @member {String} name
 */
User.prototype['name'] = undefined;

/**
 * @member {Boolean} active
 */
User.prototype['active'] = undefined;

/**
 * credit amout in euro cent
 * @member {Number} credit
 */
User.prototype['credit'] = undefined;

/**
 * token for the password
 * @member {String} token
 */
User.prototype['token'] = undefined;

/**
 * preferences of the user
 * @member {Object} prefs
 */
User.prototype['prefs'] = undefined;





/**
 * Allowed values for the <code>typ</code> property.
 * @enum {String}
 * @readonly
 */
User['TypEnum'] = {

    /**
     * value: "admin"
     * @const
     */
    "admin": "admin",

    /**
     * value: "user"
     * @const
     */
    "user": "user",

    /**
     * value: "staff"
     * @const
     */
    "staff": "staff",

    /**
     * value: "internal"
     * @const
     */
    "internal": "internal"
};



export default User;
