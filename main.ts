import { App, Chart, ChartProps } from 'cdk8s';
import * as kplus from 'cdk8s-plus-29';
import { Construct } from 'constructs';
import * as fs from 'fs';
import * as path from 'path';

export class MyChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    const namespace_label = 'issue-app'
    new kplus.Namespace(this, 'issue-ns', {
      metadata: {
        name: namespace_label,
      }
    });

    const configJsonPath = path.join(__dirname, './dockerconfig.json');
    const configJsonContent = fs.readFileSync(configJsonPath, 'utf-8');

    const dockerSecret = new kplus.Secret(this, 'docker-secret', {
      metadata: { namespace: namespace_label },
      stringData: {
        ".dockerconfigjson": configJsonContent
      },
      type: 'kubernetes.io/dockerconfigjson'
    })

    const deployment = new kplus.Deployment(this, 'issue-deploy', {
      metadata: { namespace: namespace_label },
      replicas: 2,
      dockerRegistryAuth: dockerSecret,
      containers: [{
        name: 'issue-container',
        image: 'ddefie/issue-demo:2',
        securityContext: { ensureNonRoot: false },
        portNumber: 3000
      }]
    })

    deployment.exposeViaService({
      serviceType: kplus.ServiceType.CLUSTER_IP,
      ports: [{ port: 80, targetPort: 3000 }]
    })

  }
}

const app = new App();
new MyChart(app, 'issue-demo');
app.synth();
