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
import DryerStatus from './DryerStatus';
import Module from './Module';

/**
 * The Dryer model module.
 * @module model/Dryer
 * @version 0.1.0
 */
export default class Dryer {
  /**
   * Constructs a new <code>Dryer</code>.
   * @alias module:model/Dryer
   * @class
   * @param id {String} 
   * @param priceLine {String} 
   * @param module {module:model/Module} 
   * @param status {module:model/DryerStatus} 
   */
  constructor(id, priceLine, module, status) {
    this.id = id;
    this.priceLine = priceLine;
    this.module = module;
    this.status = status;
  }

  /**
   * Constructs a <code>Dryer</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Dryer} obj Optional instance to populate.
   * @return {module:model/Dryer} The populated <code>Dryer</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Dryer();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'String');
      if (data.hasOwnProperty('price_line'))
        obj.priceLine = ApiClient.convertToType(data['price_line'], 'String');
      if (data.hasOwnProperty('module'))
        obj.module = Module.constructFromObject(data['module']);
      if (data.hasOwnProperty('status'))
        obj.status = DryerStatus.constructFromObject(data['status']);
    }
    return obj;
  }
}

/**
 * @member {String} id
 */
Dryer.prototype.id = undefined;

/**
 * @member {String} priceLine
 */
Dryer.prototype.priceLine = undefined;

/**
 * @member {module:model/Module} module
 */
Dryer.prototype.module = undefined;

/**
 * @member {module:model/DryerStatus} status
 */
Dryer.prototype.status = undefined;

