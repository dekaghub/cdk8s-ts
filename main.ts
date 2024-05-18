import { Construct } from 'constructs';
import { App, Chart, ChartProps } from 'cdk8s';
import { IntOrString, KubeDeployment, KubeService, KubeSecret, KubeServiceAccount } from './imports/k8s';
import * as path from 'path'
import * as fs from 'fs';

export class MyChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    const label = { app: 'issue-app' }

    const configJsonPath = path.join(__dirname, './dockerconfig.json');
    const configJsonContent = fs.readFileSync(configJsonPath, 'utf-8');

    // Base64 encode of docker config json
    const configBase64 = Buffer.from(configJsonContent).toString('base64');

    const dockerSecret = new KubeSecret(this, 'docker-secret', {
      metadata: {
        name: 'docker-secret',
      },
      type: "kubernetes.io/dockerconfigjson",
      data: {
        ".dockerconfigjson": configBase64
      }
    })

    const dockerServiceAccount = new KubeServiceAccount(this, 'docker-sa', {
      metadata: {
        name: 'docker-sa',
      },
      imagePullSecrets: [{ name: dockerSecret.name }]
    })

    new KubeService(this, 'issue-deploy-svc', {
      spec: {
        type: 'ClusterIP',
        ports: [{ port: 80, targetPort: IntOrString.fromNumber(3000) }],
        selector: label
      }
    });

    new KubeDeployment(this, 'issue-deploy', {
      spec: {
        replicas: 2,
        selector: { matchLabels: label },
        template: {
          metadata: { labels: label },
          spec: {
            serviceAccount: dockerServiceAccount.name,
            containers: [
              {
                name: 'issue-container',
                image: 'ddefie/issue-demo:1',
                ports: [{ containerPort: 3000 }]
              }
            ]
          }
        }
      }
    })
  }
}

const app = new App();
new MyChart(app, 'issue-demo');
app.synth();
