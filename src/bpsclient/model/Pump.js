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
 * The Pump model module.
 * @module model/Pump
 * @version 0.1.0
 */
export default class Pump {
  /**
   * Constructs a new <code>Pump</code>.
   * @alias module:model/Pump
   * @class
   * @param location {String} 
   * @param name {String} 
   * @param pumpRelayId {String} 
   * @param relayNumber {Number} 
   * @param pumpDuration {Number} 
   * @param lastStart {Number} 
   * @param count {Number} 
   */
  constructor(location, name, pumpRelayId, relayNumber, pumpDuration, lastStart, count) {
    this.location = location;
    this.name = name;
    this.pumpRelayId = pumpRelayId;
    this.relayNumber = relayNumber;
    this.pumpDuration = pumpDuration;
    this.lastStart = lastStart;
    this.count = count;
  }

  /**
   * Constructs a <code>Pump</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Pump} obj Optional instance to populate.
   * @return {module:model/Pump} The populated <code>Pump</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Pump();
      if (data.hasOwnProperty('location'))
        obj.location = ApiClient.convertToType(data['location'], 'String');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('pump_relay_id'))
        obj.pumpRelayId = ApiClient.convertToType(data['pump_relay_id'], 'String');
      if (data.hasOwnProperty('relay_number'))
        obj.relayNumber = ApiClient.convertToType(data['relay_number'], 'Number');
      if (data.hasOwnProperty('pump_duration'))
        obj.pumpDuration = ApiClient.convertToType(data['pump_duration'], 'Number');
      if (data.hasOwnProperty('last_start'))
        obj.lastStart = ApiClient.convertToType(data['last_start'], 'Number');
      if (data.hasOwnProperty('count'))
        obj.count = ApiClient.convertToType(data['count'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {String} location
 */
Pump.prototype.location = undefined;

/**
 * @member {String} name
 */
Pump.prototype.name = undefined;

/**
 * @member {String} pumpRelayId
 */
Pump.prototype.pumpRelayId = undefined;

/**
 * @member {Number} relayNumber
 */
Pump.prototype.relayNumber = undefined;

/**
 * @member {Number} pumpDuration
 */
Pump.prototype.pumpDuration = undefined;

/**
 * @member {Number} lastStart
 */
Pump.prototype.lastStart = undefined;

/**
 * @member {Number} count
 */
Pump.prototype.count = undefined;

