import { ref } from "vue";
import { useAuth } from "./useAuth.js";

const { api } = useAuth();

export function useDevices() {

    const devices = ref(null);
    const getDevices = async (location,from_time) => {
        return new Promise((resolve, reject) => {
            api.getDevices({ location: location, from: from_time }, (error, data) => {
                if (error) {
                    reject(new Error("Error fetching devices: " + error));
                } else {
                    devices.value = data;
                    resolve(data);
                }
            });
        })
    };

    const deleteDevice = async (deviceData) => {
        return new Promise((resolve, reject) => {
            api.deleteDevice(deviceData.location, deviceData.typ, deviceData.nr, (error, data) => {
                if (error) {
                    reject(new Error("Error deleting device: " + error));
                } else {
                    resolve(data);
                }
            });
        });
    }

    const deviceInfo = ref(null);
    const getDeviceInfo = async (deviceId) => {
        if (!deviceId) {
            throw new Error("No deviceId set");
        }
        if (deviceId.length < 1) {
            throw new Error("Invalid deviceId");
        }
        return new Promise((resolve, reject) => {
            api.getDeviceById(deviceId, (error, data) => {
                if (error) {
                    reject(new Error("Error fetching device info: " + error));
                } else {
                    const deviceData = data;
                    api.getDeviceInfo(deviceData.location, deviceData.typ, deviceData.nr, (error, data) => {
                        if (error) {
                            reject(new Error("Error fetching device info: " + error));
                        } else {
                            deviceInfo.value = data;
                            resolve(data);
                        }
                    });
                }
            })
        })
    }

    // static initialize(obj, id, nr, typ, location, priceLine, module, detergent, softener, status) { 
    //     obj['id'] = id;
    //     obj['nr'] = nr;
    //     obj['typ'] = typ;
    //     obj['location'] = location;
    //     obj['priceLine'] = priceLine;
    //     obj['module'] = module;
    //     obj['detergent'] = detergent;
    //     obj['softener'] = softener;
    //     obj['status'] = status;
    // }


    const getDeviceTypes = (devices) => {
        const types = ['WASHER', 'DRYER', 'PUMP'];
        devices.forEach((device) => {
            const typ = device.typ.toUpperCase();
            if (!types.includes(typ)) {
                types.push(typ);
            }
        });
        return types;
    }

    const getLocationTypAndNumber = (name) => {
        const sname = name.split("/");
        const location = sname[0]
        let t = sname[1].slice(0, 1);
        const idStr = sname[1].slice(1);
        const nr = parseInt(idStr, 10);
        if (isNaN(nr)) {
            console.error("Failed to convert id to a number");
            return null;
        }
        let typ = "unknown";
        switch (t) {
            case "D":
                typ = "dryer";
                break;
            case "W":
                typ = "washer";
                break;
            case "P":
                typ = "pump";
                break;
        }
        return { location, typ, nr };
    };

    const updateDevice = async (device) => {
        return new Promise((resolve, reject) => {
            api.updateDevice(device, (error, data, response) => {
                if (error) {
                    reject(new Error("Error updating device: " + error.response?.body?.message));
                } else {
                    resolve(data);
                }
            });
        });
    }

    const newDevice = async (device) => {
        return new Promise((resolve, reject) => {
            api.newDevice(device, (error, data, response) => {
                if (error) {
                    reject(new Error("Error creating device: " + error.response?.body?.message));
                } else {
                    resolve(data);
                }
            });
        })
    }

    const locationTypDevices = ref([]);
    const getLocationTypDevices = async () => {
        return new Promise((resolve, reject) => {
            api.getLocationTypDevices((error, data, result) => {
                if (error) {
                    reject(new Error("Error fetching devices: " + error));
                } else {
                    locationTypDevices.value = data;
                    resolve(data);
                }
            });
        });

        return locationTypDevices;
    }

    return {
        devices,
        deviceInfo,
        getDevices,
        deleteDevice,
        getDeviceTypes,
        getDeviceInfo,
        getLocationTypDevices,
        updateDevice,
        newDevice,
    };
}

