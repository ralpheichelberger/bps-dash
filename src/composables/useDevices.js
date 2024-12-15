import { ref } from "vue";
import { useAuth } from "./useAuth.js";

const { authenticateClient, api, cardID } = useAuth();

export function useDevices() {
    const devices = ref(null);

    const getDevices = async (location) => {
        // Authenticate once
        await authenticateClient();

        if (!cardID.value) {
            console.error("No card ID set");
            return null;
        }
        api.getDevices({ location: location }, (error, data) => {
            if (error) {
                console.error("Error fetching devices", error);
                return null;
            }
            devices.value = data;
        });
    };

    return {
        devices,
        getDevices,
    };
}
