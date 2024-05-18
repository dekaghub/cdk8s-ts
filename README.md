Use tags to switch between cdk8s L1 or cdk8s L2 examples.

## cdk8s L2 example - TypeScript

In this example, I used cdk8s-plus-29 Layer 2 abstractions i.e. Deployment, Secret, etc. to define the kubernetes resources.

I used a deployment with 2 replica pods here to serve the issue app. Since the image is pulled from a private docker repo, I used a k8s secret of type dockerconfig to authenticate.

I couldn't find any way to add imagePullSecrets to a ServiceAccount using cdk8s-plus. So no ServiceAccount in this implementation. That's the only difference between the L2 & L1 examples. I added that property to the Pod props, see line 23.

> dockerRegistryAuth: dockerSecret,


---

[issue-app-github](https://github.com/dekaghub/issue-full-stack-app)

* Check [main.ts](./main.ts) for cdk8s code

* Check [dist](./dist/) folder for YAMLs.

---

### screenshots

![cdk8s-plus-synth](https://i.imgur.com/7SlWxi4.png)

![port-forward-3693](https://i.imgur.com/NHUnPr2.png)

![app-example](https://i.imgur.com/Tir44tN.png)

