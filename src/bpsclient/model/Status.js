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
 * The Status model module.
 * @module model/Status
 * @version 0.1.0
 */
export default class Status {
  /**
   * Constructs a new <code>Status</code>.
   * @alias module:model/Status
   * @class
   * @param code {Number} Status code
   * @param message {String} Status message
   */
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  /**
   * Constructs a <code>Status</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Status} obj Optional instance to populate.
   * @return {module:model/Status} The populated <code>Status</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Status();
      if (data.hasOwnProperty('code'))
        obj.code = ApiClient.convertToType(data['code'], 'Number');
      if (data.hasOwnProperty('message'))
        obj.message = ApiClient.convertToType(data['message'], 'String');
    }
    return obj;
  }
}

/**
 * Status code
 * @member {Number} code
 */
Status.prototype.code = undefined;

/**
 * Status message
 * @member {String} message
 */
Status.prototype.message = undefined;

