import { ref } from "vue";
import { useAuth } from "./useAuth.js";

const { authenticateClient, api, cardID } = useAuth();

export function useDevices() {

    const devices = ref(null);
    const getDevices = async (location) => {
        await authenticateClient();
        return new Promise((resolve, reject) => {
            api.getDevices({ location: location }, (error, data) => {
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
        await authenticateClient();
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
        await authenticateClient();
        if (!cardID.value) {
            throw new Error("No card ID set");
        }
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
    


    const getLocationTypAndNumber = (name) => {
    const sname=name.split("/");
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
        await authenticateClient();
        return new Promise((resolve, reject) => {
            api.updateDevice(device, (error, data, response) => {
                if (error) {
                    reject(new Error("Error updating device: " + error));
                } else {
                    resolve(data);
                }
            });
        });
    }

    const newDevice = async (device) => {
        await authenticateClient();
        return new Promise((resolve, reject) => {
            api.newDevice(device, (error, data, response) => {
                if (error) {
                    reject(new Error("Error creating device: " + error));
                } else {
                    resolve(data);
                }
            });
        })
    }

    return {
        devices,
        deviceInfo,
        getDevices,
        deleteDevice,
        getDeviceInfo,
        updateDevice,
        newDevice,
    };
}

