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
import ApiClient from '../BpsApiClient';

/**
 * The CustomerBody model module.
 * @module model/CustomerBody
 * @version 0.1.0
 */
export default class CustomerBody {
  /**
   * Constructs a new <code>CustomerBody</code>.
   * @alias module:model/CustomerBody
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CustomerBody</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CustomerBody} obj Optional instance to populate.
   * @return {module:model/CustomerBody} The populated <code>CustomerBody</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CustomerBody();
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('active'))
        obj.active = ApiClient.convertToType(data['active'], 'Boolean');
    }
    return obj;
  }
}

/**
 * The new name of the customer
 * @member {String} name
 */
CustomerBody.prototype.name = undefined;

/**
 * Indicates if the customer is active
 * @member {Boolean} active
 */
CustomerBody.prototype.active = undefined;

