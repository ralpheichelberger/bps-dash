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
 * The WasherStatus model module.
 * @module model/WasherStatus
 * @version 0.1.0
 */
class WasherStatus {
    /**
     * Constructs a new <code>WasherStatus</code>.
     * @alias module:model/WasherStatus
     * @param timestamp {Number} 
     * @param allowStart {Boolean} 
     * @param busy {Boolean} 
     * @param offline {Boolean} 
     * @param allowDetergent {Boolean} 
     * @param allowSoftener {Boolean} 
     */
    constructor(timestamp, allowStart, busy, offline, allowDetergent, allowSoftener) { 
        
        WasherStatus.initialize(this, timestamp, allowStart, busy, offline, allowDetergent, allowSoftener);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, timestamp, allowStart, busy, offline, allowDetergent, allowSoftener) { 
        obj['timestamp'] = timestamp;
        obj['allow_start'] = allowStart;
        obj['busy'] = busy;
        obj['offline'] = offline;
        obj['allow_detergent'] = allowDetergent;
        obj['allow_softener'] = allowSoftener;
    }

    /**
     * Constructs a <code>WasherStatus</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/WasherStatus} obj Optional instance to populate.
     * @return {module:model/WasherStatus} The populated <code>WasherStatus</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new WasherStatus();

            if (data.hasOwnProperty('timestamp')) {
                obj['timestamp'] = ApiClient.convertToType(data['timestamp'], 'Number');
            }
            if (data.hasOwnProperty('allow_start')) {
                obj['allow_start'] = ApiClient.convertToType(data['allow_start'], 'Boolean');
            }
            if (data.hasOwnProperty('busy')) {
                obj['busy'] = ApiClient.convertToType(data['busy'], 'Boolean');
            }
            if (data.hasOwnProperty('offline')) {
                obj['offline'] = ApiClient.convertToType(data['offline'], 'Boolean');
            }
            if (data.hasOwnProperty('allow_detergent')) {
                obj['allow_detergent'] = ApiClient.convertToType(data['allow_detergent'], 'Boolean');
            }
            if (data.hasOwnProperty('allow_softener')) {
                obj['allow_softener'] = ApiClient.convertToType(data['allow_softener'], 'Boolean');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>WasherStatus</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>WasherStatus</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of WasherStatus.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }

        return true;
    }


}

WasherStatus.RequiredProperties = ["timestamp", "allow_start", "busy", "offline", "allow_detergent", "allow_softener"];

/**
 * @member {Number} timestamp
 */
WasherStatus.prototype['timestamp'] = undefined;

/**
 * @member {Boolean} allow_start
 */
WasherStatus.prototype['allow_start'] = undefined;

/**
 * @member {Boolean} busy
 */
WasherStatus.prototype['busy'] = undefined;

/**
 * @member {Boolean} offline
 */
WasherStatus.prototype['offline'] = undefined;

/**
 * @member {Boolean} allow_detergent
 */
WasherStatus.prototype['allow_detergent'] = undefined;

/**
 * @member {Boolean} allow_softener
 */
WasherStatus.prototype['allow_softener'] = undefined;






export default WasherStatus;

