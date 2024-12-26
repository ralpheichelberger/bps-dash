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
 * The ModuleProgramm model module.
 * @module model/ModuleProgramm
 * @version 0.1.0
 */
class ModuleProgramm {
    /**
     * Constructs a new <code>ModuleProgramm</code>.
     * @alias module:model/ModuleProgramm
     * @param typ {String} type of the binary
     * @param version {String} version of the binary
     */
    constructor(typ, version) { 
        
        ModuleProgramm.initialize(this, typ, version);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, typ, version) { 
        obj['typ'] = typ;
        obj['version'] = version;
    }

    /**
     * Constructs a <code>ModuleProgramm</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ModuleProgramm} obj Optional instance to populate.
     * @return {module:model/ModuleProgramm} The populated <code>ModuleProgramm</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ModuleProgramm();

            if (data.hasOwnProperty('typ')) {
                obj['typ'] = ApiClient.convertToType(data['typ'], 'String');
            }
            if (data.hasOwnProperty('binary')) {
                obj['binary'] = ApiClient.convertToType(data['binary'], 'String');
            }
            if (data.hasOwnProperty('version')) {
                obj['version'] = ApiClient.convertToType(data['version'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ModuleProgramm</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ModuleProgramm</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of ModuleProgramm.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['typ'] && !(typeof data['typ'] === 'string' || data['typ'] instanceof String)) {
            throw new Error("Expected the field `typ` to be a primitive type in the JSON string but got " + data['typ']);
        }
        // ensure the json data is a string
        if (data['binary'] && !(typeof data['binary'] === 'string' || data['binary'] instanceof String)) {
            throw new Error("Expected the field `binary` to be a primitive type in the JSON string but got " + data['binary']);
        }
        // ensure the json data is a string
        if (data['version'] && !(typeof data['version'] === 'string' || data['version'] instanceof String)) {
            throw new Error("Expected the field `version` to be a primitive type in the JSON string but got " + data['version']);
        }

        return true;
    }


}

ModuleProgramm.RequiredProperties = ["typ", "version"];

/**
 * type of the binary
 * @member {String} typ
 */
ModuleProgramm.prototype['typ'] = undefined;

/**
 * module programm binary
 * @member {String} binary
 */
ModuleProgramm.prototype['binary'] = undefined;

/**
 * version of the binary
 * @member {String} version
 */
ModuleProgramm.prototype['version'] = undefined;






export default ModuleProgramm;

