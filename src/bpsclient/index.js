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


import ApiClient from './ApiClient';
import CreditJournal from './model/CreditJournal';
import Device from './model/Device';
import DeviceInfo from './model/DeviceInfo';
import DeviceType from './model/DeviceType';
import DeviceUpdateLastPingRequest from './model/DeviceUpdateLastPingRequest';
import DeviceUpdatePumpCountsRequest from './model/DeviceUpdatePumpCountsRequest';
import DeviceUpdateStatusRequest from './model/DeviceUpdateStatusRequest';
import GetUserByTokenRequest from './model/GetUserByTokenRequest';
import Location from './model/Location';
import LocationTypDevices from './model/LocationTypDevices';
import MailTo200Response from './model/MailTo200Response';
import MailToRequest from './model/MailToRequest';
import Marketing from './model/Marketing';
import ModulDurations from './model/ModulDurations';
import Module from './model/Module';
import ModuleProgramm from './model/ModuleProgramm';
import ModuleProgramm200Response from './model/ModuleProgramm200Response';
import Payment from './model/Payment';
import PriceLine from './model/PriceLine';
import Pump from './model/Pump';
import PumpRelay from './model/PumpRelay';
import PumpRelayStatus from './model/PumpRelayStatus';
import Status from './model/Status';
import TopupCreditRequest from './model/TopupCreditRequest';
import TypDeviceLocations from './model/TypDeviceLocations';
import TypDevices from './model/TypDevices';
import UpdateModuleBinary404Response from './model/UpdateModuleBinary404Response';
import User from './model/User';
import WasherStatus from './model/WasherStatus';
import DefaultApi from './api/DefaultApi';


/**
* Bubble Point System API.<br>
* The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
* <p>
* An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
* <pre>
* var Bps = require('index'); // See note below*.
* var xxxSvc = new Bps.XxxApi(); // Allocate the API class we're going to use.
* var yyyModel = new Bps.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
* and put the application logic within the callback function.</em>
* </p>
* <p>
* A non-AMD browser application (discouraged) might do something like this:
* <pre>
* var xxxSvc = new Bps.XxxApi(); // Allocate the API class we're going to use.
* var yyy = new Bps.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* </p>
* @module index
* @version 0.1.0
*/
export {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient,

    /**
     * The CreditJournal model constructor.
     * @property {module:model/CreditJournal}
     */
    CreditJournal,

    /**
     * The Device model constructor.
     * @property {module:model/Device}
     */
    Device,

    /**
     * The DeviceInfo model constructor.
     * @property {module:model/DeviceInfo}
     */
    DeviceInfo,

    /**
     * The DeviceType model constructor.
     * @property {module:model/DeviceType}
     */
    DeviceType,

    /**
     * The DeviceUpdateLastPingRequest model constructor.
     * @property {module:model/DeviceUpdateLastPingRequest}
     */
    DeviceUpdateLastPingRequest,

    /**
     * The DeviceUpdatePumpCountsRequest model constructor.
     * @property {module:model/DeviceUpdatePumpCountsRequest}
     */
    DeviceUpdatePumpCountsRequest,

    /**
     * The DeviceUpdateStatusRequest model constructor.
     * @property {module:model/DeviceUpdateStatusRequest}
     */
    DeviceUpdateStatusRequest,

    /**
     * The GetUserByTokenRequest model constructor.
     * @property {module:model/GetUserByTokenRequest}
     */
    GetUserByTokenRequest,

    /**
     * The Location model constructor.
     * @property {module:model/Location}
     */
    Location,

    /**
     * The LocationTypDevices model constructor.
     * @property {module:model/LocationTypDevices}
     */
    LocationTypDevices,

    /**
     * The MailTo200Response model constructor.
     * @property {module:model/MailTo200Response}
     */
    MailTo200Response,

    /**
     * The MailToRequest model constructor.
     * @property {module:model/MailToRequest}
     */
    MailToRequest,

    /**
     * The Marketing model constructor.
     * @property {module:model/Marketing}
     */
    Marketing,

    /**
     * The ModulDurations model constructor.
     * @property {module:model/ModulDurations}
     */
    ModulDurations,

    /**
     * The Module model constructor.
     * @property {module:model/Module}
     */
    Module,

    /**
     * The ModuleProgramm model constructor.
     * @property {module:model/ModuleProgramm}
     */
    ModuleProgramm,

    /**
     * The ModuleProgramm200Response model constructor.
     * @property {module:model/ModuleProgramm200Response}
     */
    ModuleProgramm200Response,

    /**
     * The Payment model constructor.
     * @property {module:model/Payment}
     */
    Payment,

    /**
     * The PriceLine model constructor.
     * @property {module:model/PriceLine}
     */
    PriceLine,

    /**
     * The Pump model constructor.
     * @property {module:model/Pump}
     */
    Pump,

    /**
     * The PumpRelay model constructor.
     * @property {module:model/PumpRelay}
     */
    PumpRelay,

    /**
     * The PumpRelayStatus model constructor.
     * @property {module:model/PumpRelayStatus}
     */
    PumpRelayStatus,

    /**
     * The Status model constructor.
     * @property {module:model/Status}
     */
    Status,

    /**
     * The TopupCreditRequest model constructor.
     * @property {module:model/TopupCreditRequest}
     */
    TopupCreditRequest,

    /**
     * The TypDeviceLocations model constructor.
     * @property {module:model/TypDeviceLocations}
     */
    TypDeviceLocations,

    /**
     * The TypDevices model constructor.
     * @property {module:model/TypDevices}
     */
    TypDevices,

    /**
     * The UpdateModuleBinary404Response model constructor.
     * @property {module:model/UpdateModuleBinary404Response}
     */
    UpdateModuleBinary404Response,

    /**
     * The User model constructor.
     * @property {module:model/User}
     */
    User,

    /**
     * The WasherStatus model constructor.
     * @property {module:model/WasherStatus}
     */
    WasherStatus,

    /**
    * The DefaultApi service constructor.
    * @property {module:api/DefaultApi}
    */
    DefaultApi
};
