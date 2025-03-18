import * as k8s from "@pulumi/kubernetes";
import * as k8sClient from "@kubernetes/client-node";

const appLabels = { app: "nginx" };
const deployment = new k8s.apps.v1.Deployment("nginx", {
  spec: {
    selector: { matchLabels: appLabels },
    replicas: 1,
    template: {
      metadata: { labels: appLabels },
      spec: { containers: [{ name: "nginx", image: "nginx" }] },
    },
  },
});

const kc = new k8sClient.KubeConfig();
kc.loadFromDefault();

export const name = deployment.metadata.name;
