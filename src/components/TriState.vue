<template>
    <div class="custom-switch" @click="toggleState">
        <div class="switch-thumb" :class="currentState"></div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: [Boolean, String],
        default: null
    },
    onlyOff: {
        type: Boolean,
        default: false
    }
});
const emit = defineEmits(["update:modelValue"]);

const toggleState = () => {
    if (props.onlyOff) {
        emit("update:modelValue", false);
    } else {
        emit("update:modelValue", props.modelValue === null ? true : !props.modelValue);
    }
};

const currentState = computed(() => {
    return props.modelValue === null ? 'neutral' : props.modelValue ? 'on' : 'off';
});
</script>

<style scoped>
.custom-switch {
    width: 30px;
    height: 60px;
    background-color: lightgray;
    border-radius: 15px;
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

    padding: 5px 0;
}

.switch-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    transition: transform 0.3s ease, background-color 0.3s ease;
    position: absolute;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

}

@keyframes blink {
    0% { background-color: rgb(124, 181, 255); }
    100% { background-color: rgb(0, 60, 0); }
}

.neutral {
    background-color: rgb(242, 255, 0);
    animation: blink 1.5s infinite;
    top: 50%;
    transform: translateY(-50%);
}

.on {
    background-color: rgb(104, 255, 104);
    top: 5px;
}

.off {
    background-color: rgb(0,60,0);
    bottom: 5px;
}
</style>
