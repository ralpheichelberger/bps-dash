<template>
  <div class="state-bar">
    <div v-for="(segment, index) in stateSegments" :key="index" class="state-segment" :class="segment.stateClass"
      :style="{ width: segment.percentage + '%' }" :title="segment.stateClass + '\n' + segment.timeRange"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  stateData: {
    type: Array,
    required: true
  },
  startTime: {
    type: Number,
    required: true
  }
});

const stateSegments = ref([]);
const loading = ref(true);

// Define state colors based on provided logic
const stateClasses = {
  '0000': 'idle',
  '1000': 'payed',
  '1100': 'running',
  '0100': 'running',
  '0101': 'softener',
  '0110': 'detergent',
  '0010': 'error',
  '0001': 'error',
  '0011': 'error',
  '0111': 'error',
  'Offl': 'offline',
  'Conn': 'connected'
};

const loadStateSegments = async () => {
  loading.value = true;
  try {
    if (!props.stateData || props.stateData.length < 1) {
      stateSegments.value = [];
      return;
    }
    const dl = props.stateData.length - 1

    const now = Math.floor(Date.now() / 1000);
    const totalDuration = now - props.startTime;
    const segments = [];
    const startTime = props.stateData[0].timestamp
    const duration = startTime - props.startTime
    const percentage = (duration / totalDuration) * 100;
    let state = props.stateData[dl]?.message?.substring(0, 4) || "";
    let startTimeString = new Date(props.startTime * 1000).toISOString().substr(11, 5);

    let endTimeString = new Date(props.stateData[dl].timestamp * 1000).toISOString().substr(11, 5);
    segments.push({
      stateClass: stateClasses[state] || 'unknown',
      percentage: percentage.toFixed(2),
      timeRange: `${startTimeString} - ${endTimeString}`
    });
    for (let i = dl; i > 0; i--) {
      const endTime = i === 0 ? now : props.stateData[i - 1].timestamp;
      const startTime = props.stateData[i].timestamp;
      const duration = endTime - startTime;
      const percentage = (duration / totalDuration) * 100;
      const state = props.stateData[i]?.message?.substring(0, 4) || "";
      const startTimeString = new Date(startTime * 1000).toISOString().substr(11, 5);
      const endTimeString = new Date(endTime * 1000).toISOString().substr(11, 5);

      segments.push({
        stateClass: stateClasses[state] || 'unknown',
        percentage: percentage.toFixed(2),
        timeRange: `${startTimeString} - ${endTimeString}`
      });
    }
    stateSegments.value = segments;
  } catch (error) {
    console.error("Error loading state segments:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(loadStateSegments);
</script>

<style scoped>
.state-bar {
  display: flex;
  width: 100%;
  height: 8px;
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
  background-color: rgb(60, 255, 0);
}

.detergent {
  background-color: rgb(60, 200, 100);
}

.error {
  background-color: red;
}

.softener {
  background-color: rgb(90, 200, 0);
}

.unknown {
  background-color: black;
}

.connected {
  background-color: white;
}

.offline {
  background-color: rgb(255, 0, 0);
}
</style>
