#!/bin/bash

# Define paths relative to the workspace directory
WORKSPACE_DIR=~/workspace
API_YAML="bp_immanuel/api/bps.yaml"
TEMP_DIR="tmp/bpsclient_temp"
OUTPUT_DIR="bps-dash/src/bpsclient"

# Create temporary directory
mkdir -p "${TEMP_DIR}"

# Docker command to generate the client in the temporary directory
docker run --rm -v "${WORKSPACE_DIR}:/local" openapitools/openapi-generator-cli generate \
    -i "/local/${API_YAML}" \
    -g javascript \
    -o "/local/${TEMP_DIR}"


chown -R $(whoami) "${TEMP_DIR}"
cd ${WORKSPACE_DIR}
# Copy only the required parts (src folder) to the final output directory
cp "${TEMP_DIR}/src/index.js" "${OUTPUT_DIR}"
cp -r "${TEMP_DIR}/src/model" "${OUTPUT_DIR}"
cp -r "${TEMP_DIR}/src/api" "${OUTPUT_DIR}"

# Clean up the temporary directory
rm -r "${TEMP_DIR}"

# Print success message
echo "Client generated successfully in: ${WORKSPACE_DIR}/${OUTPUT_DIR}"
