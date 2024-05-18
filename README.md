## cdk8s TypeScript - cdk8s

In this example, I used cdk8s Layer 1 APIs i.e. KubeDeployment, KubeService, etc. to define the k8 resources.

I used a deployment here with 2 replica pods to serve the issue app. Since the image is pulled from a private docker repo, the pods use a service account to authenticate. I used a k8 secret of type dockerconfig; this isn't safe but also not complicated. No hassle of unsealing a vault.

---

[issue-app-github](https://github.com/dekaghub/issue-full-stack-app)

* Check [main.ts](./main.ts) for cdk8s code

* Check [dist](./dist/) folder for YAMLs.

---

### screenshots

![cdk8s-synth](https://i.imgur.com/qRonmwI.png)

![k8-commands](https://i.imgur.com/e4kmW6y.png)

![app-example](https://i.imgur.com/GZd3Y7N.png)

