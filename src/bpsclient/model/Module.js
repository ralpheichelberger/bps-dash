/*
 * BPS
 * Bubble Point System API
 *
 * OpenAPI spec version: 0.1.0
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.64
 *
 * Do not edit the class manually.
 *
 */
import ApiClient from '../ApiClient';

/**
 * The Module model module.
 * @module model/Module
 * @version 0.1.0
 */
export default class Module {
  /**
   * Constructs a new <code>Module</code>.
   * @alias module:model/Module
   * @class
   * @param mac {String} 
   * @param alias {String} 
   * @param lastSeen {Number} 
   * @param lastPing {Number} 
   * @param relayDuration {Number} 
   */
  constructor(mac, alias, lastSeen, lastPing, relayDuration) {
    this.mac = mac;
    this.alias = alias;
    this.lastSeen = lastSeen;
    this.lastPing = lastPing;
    this.relayDuration = relayDuration;
  }

  /**
   * Constructs a <code>Module</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Module} obj Optional instance to populate.
   * @return {module:model/Module} The populated <code>Module</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Module();
      if (data.hasOwnProperty('mac'))
        obj.mac = ApiClient.convertToType(data['mac'], 'String');
      if (data.hasOwnProperty('alias'))
        obj.alias = ApiClient.convertToType(data['alias'], 'String');
      if (data.hasOwnProperty('last_seen'))
        obj.lastSeen = ApiClient.convertToType(data['last_seen'], 'Number');
      if (data.hasOwnProperty('last_ping'))
        obj.lastPing = ApiClient.convertToType(data['last_ping'], 'Number');
      if (data.hasOwnProperty('relay_duration'))
        obj.relayDuration = ApiClient.convertToType(data['relay_duration'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {String} mac
 */
Module.prototype.mac = undefined;

/**
 * @member {String} alias
 */
Module.prototype.alias = undefined;

/**
 * @member {Number} lastSeen
 */
Module.prototype.lastSeen = undefined;

/**
 * @member {Number} lastPing
 */
Module.prototype.lastPing = undefined;

/**
 * @member {Number} relayDuration
 */
Module.prototype.relayDuration = undefined;

