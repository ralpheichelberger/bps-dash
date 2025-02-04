import { ref } from "vue";
export function useLongPress() {
    const pressTimer = ref(null);
    const startPress = (event) => {
        pressTimer.value = setTimeout(() => {
            event.preventDefault();
            onLongPress();
        }, 3000); // Long press after 1 second
    };

    const cancelPress = () => {
        clearTimeout(pressTimer.value);
        pressTimer.value = null;
    };

    const onLongPress = () => {
        // ask with simple confirm dialog if logout is wanted and set the user in local storage to null
        if (confirm("Konto wirklich abmelden?")) {
            localStorage.removeItem("user");
            window.location.reload();
            window.location.href = "/";
        }
    };
    return { startPress, cancelPress, onLongPress };
}
