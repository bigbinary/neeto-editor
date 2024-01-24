The **neetoEditor** library drives the rich text experience in the
[neeto products](https://neeto.com) built at
[BigBinary](https://www.bigbinary.com).

## Installation

```
yarn add @bigbinary/neeto-editor
```

For setting up image upload refer
https://neeto-editor.neeto.com/?path=/docs/examples-customize-options-addons--addons.

## Development

Install all the dependencies by executing following command.

```
yarn
```

Running the `yarn start` command starts a storybook application. Use this
application to test out changes.

# Building and releasing.

The `@bigbinary/neeto-editor` package gets published to NPM when we
merge a PR with `patch`, `minor` or `major` label to the `main` branch. The
`patch` label is used for bug fixes, `minor` label is used for new features and
`major` label is used for breaking changes. You can checkout the
`Create and publish releases` workflow in GitHub Actions to get a live update.

In case if you missed to add the label, you can manually publish the package.
For that first you need to create a PR to update the version number in the
`package.json` file and merge it to the `main` branch. After merging the PR, you
need to create a
[new github release](https://github.com/bigbinary/neeto-editor/releases/new)
from main branch. Whenever a new release is created with a new version number,
the github actions will automatically publish the built package to npm. You can
checkout the `Publish to npm` workflow in GitHub Actions to get a live update.

Please note that before publishing the package, you need to verify the
functionality in some of the neeto web-apps locally using `yalc` package
manager. The usage of yalc is explained in this video:
https://youtu.be/F4zZFnrNTq8

## Documentation

Read the docs here: https://neeto-editor.neeto.com.
