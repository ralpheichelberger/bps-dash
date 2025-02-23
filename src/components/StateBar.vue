<template>
  <div class="state-bar">
    <div v-for="(segment, index) in stateSegments" :key="index" class="state-segment" :class="segment.stateClass"
      :style="{ width: segment.percentage + '%' }" :title="segment.stateClass + '\n' + segment.timeRange"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  stateData: {
    type: Array,
    required: true
  }
});

// Convert time string to seconds for duration calculation
const timeToSeconds = (time) => {
  const [h, m, s] = time.split(':').map(Number);
  return h * 3600 + m * 60 + s;
};

// Define state colors based on provided logic
const stateClasses = {
  '0000': 'idle', // Idle (gray)
  '1000': 'payed', // Payed (green)
  '1100': 'running', // Running (orange)
  '0100': 'running', // Running (orange)
  '0101': 'softener', // Warning (yellow)
  '0110': 'detergent', // Running (blue)
  '0010': 'error', // Error (red)
  '0001': 'error', // Error (red)
  '0011': 'error', // Error (red)
  '0111': 'error' // Error (red)
};

// Compute state segments with duration-based width
const stateSegments = computed(() => {
  if (!props.stateData || props.stateData.length < 2) return [];
  const segments = [];
  for (let i = 0; i < props.stateData.length - 1; i++) {
    const startTime = timeToSeconds(props.stateData[i + 1].time);
    const endTime = timeToSeconds(props.stateData[i].time);
    const duration = endTime - startTime;
    const totalDuration = timeToSeconds(props.stateData[0].time) - timeToSeconds(props.stateData[props.stateData.length - 1].time);
    const percentage = (duration / totalDuration) * 100;

    segments.push({
      stateClass: stateClasses[props.stateData[i].state] || 'unknown',
      percentage: percentage.toFixed(2),
      timeRange: `${props.stateData[i + 1].time} - ${props.stateData[i].time}`
    });
  }
  return segments;
});
</script>

<style scoped>
.state-bar {
  display: flex;
  width: 100%;
  height: 5px;
  border: 1px solid black;
  overflow: hidden;
}

.state-segment {
  height: 100%;
}

.idle {
  background-color: gray;
}

.running {
  background-color: rgb(255, 145, 222);
}

.detergent {
  background-color: rgb(0, 217, 255);
}

.error {
  background-color: red;
}

.softener {
  background-color: rgb(255, 243, 132);
}

.unknown {
  background-color: black;
}
</style>