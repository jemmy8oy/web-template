#!/bin/bash
set -e 

# --- Configuration ---
REGION="LHR"
NAMESPACE="lr7uc6l49odc"
FRONTEND_REPO="my-app"
BACKEND_REPO="my-app-backend"
COMPARTMENT_ID="ocid1.tenancy.oc1..aaaaaaaazzb6zpefjmtxcgbr2ws5xtd265wa7o47o6j2bjkgznynazqhwmxa"

KUBERNETES_NAMESPACE="my-app"
KUBERNETES_DEPLOYMENT="my-app-my-apphelm-main"

# 1. Checking deployment status
echo "⚡️ Checking deployment status..."
# kubectl rollout status deploy $KUBERNETES_DEPLOYMENT -n $KUBERNETES_NAMESPACE

# 2. Prepare Versioning
TAG=$(git rev-parse --short HEAD)
echo "🚀 Starting Deployment for version: $TAG"

# 3. Build, Push and Clean
echo "🏗️  Building ARM64 Docker images..."

purge_repo() {
    local REPO=$1
    echo "🧹 Purging artifacts in $REPO created BEFORE version $TAG..."
    
    # Verify the newest image exists to get its timestamp (safety check)
    local TARGET_TIME=$(oci artifacts container image list \
        --compartment-id $COMPARTMENT_ID \
        --repository-name $REPO \
        --image-version $TAG \
        --query "data.items[0].\"time-created\"" --raw-output)

    if [ -n "$TARGET_TIME" ] && [ "$TARGET_TIME" != "None" ]; then
        # Just grab the first 16 characters (2026-02-02T17:50) for the safety zone
        local BUFFER_TIME=$(echo "$TARGET_TIME" | cut -c 1-16)
        
        echo "🛡️  Safety buffer for $REPO (Minute-level): $BUFFER_TIME"

        local OLD_IMAGE_IDS=$(oci artifacts container image list \
            --compartment-id "$COMPARTMENT_ID" \
            --repository-name "$REPO" \
            --query "data.items[? !starts_with(\"time-created\", '$BUFFER_TIME') && \"time-created\" < '$TARGET_TIME'].id" \
            --raw-output | tr -d '[]," ' | sort -u)

        if [ -n "$OLD_IMAGE_IDS" ] && [ "$OLD_IMAGE_IDS" != "None" ]; then
            for ID in $OLD_IMAGE_IDS; do
                echo "🗑️ Deleting legacy artifact in $REPO: $ID"
                oci artifacts container image delete --image-id $ID --force || true
            done
        else
            echo "✅ $REPO registry is already clean."
        fi
    else
        echo "⚠️  Could not find version $TAG in $REPO, skipping purge."
    fi
}

# Frontend
echo "🎨 Building Frontend..."
docker buildx build \
    --platform linux/arm64 \
    -t $REGION.ocir.io/$NAMESPACE/$FRONTEND_REPO:$TAG \
    -t $REGION.ocir.io/$NAMESPACE/$FRONTEND_REPO:latest \
    --push frontend/

purge_repo $FRONTEND_REPO

# Backend
echo "⚙️  Building Backend..."
docker buildx build \
    --platform linux/arm64 \
    -t $REGION.ocir.io/$NAMESPACE/$BACKEND_REPO:$TAG \
    -t $REGION.ocir.io/$NAMESPACE/$BACKEND_REPO:latest \
    --push backend/

purge_repo $BACKEND_REPO

# 5. Done
echo "✅ Success! Version $TAG is live. Restarting the deployments..."
kubectl rollout restart deploy $KUBERNETES_DEPLOYMENT -n $KUBERNETES_NAMESPACE
kubectl rollout restart deploy my-app-my-apphelm-backend -n $KUBERNETES_NAMESPACE