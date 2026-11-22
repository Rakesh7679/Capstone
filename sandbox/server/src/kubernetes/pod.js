import { k8sCoreV1Api } from './config.js';
export async function createPod(sandboxId){

    const podManifest = {
        metadata: {
            name: `sandbox-${sandboxId}`,
            labels: {
                app: "sandbox",
                sandboxId
            }
        },
        spec: {
            containers: [
                {
                    image: "template:v5",
                    imagePullPolicy: "IfNotPresent",
                    name: `sandbox-${sandboxId}`,
                    ports: [{ containerPort: 5173, name:"http" }],
                    resources: {
                        limits: {
                            cpu: "250m",
                            memory: "256Mi"
                        },
                        requests: {
                            cpu: "100m",
                            memory: "128Mi"
                        }
                    }
                }
            ]
        }
    };
    const response = await k8sCoreV1Api.createNamespacedPod({
        namespace: 'default',
        body: podManifest
    });
    return response;
}