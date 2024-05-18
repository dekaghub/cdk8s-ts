Use tags to switch between cdk8s L1 or cdk8s L2 examples.

## cdk8s L1 example - TypeScript

In this example, I used cdk8s Layer 1 APIs i.e. KubeDeployment, KubeService, etc. to define the kubernetes resources.

I used a deployment with 2 replica pods here to serve the issue app. Since the image is pulled from a private docker repo, the pods use a service account to authenticate. I used a k8s secret of type dockerconfig to do so; this isn't safe but also not complicated. No need to seal/unseal a vault.

---

[issue-app-github](https://github.com/dekaghub/issue-full-stack-app)

* Check [main.ts](./main.ts) for cdk8s code

* Check [dist](./dist/) folder for YAMLs.

---

### screenshots

![cdk8s-synth](https://i.imgur.com/qRonmwI.png)

![k8-commands](https://i.imgur.com/e4kmW6y.png)

![app-example](https://i.imgur.com/GZd3Y7N.png)

