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

## Releasing beta versions

- Push the changes to a target branch for releasing beta version.
- Update the package version to `{latest-version}-beta` (if `1.2.34` is the
  current latest version, it will be `1.2.34-beta`) in the target branch for
  beta release.
- [Draft a new release](https://github.com/bigbinary/neeto-filters-nano/releases/new)
  from the repo with the target branch.
- Add a new tag and title in the format: version prefixed with `v`, eg:
  `v1.2.34-beta`.
- Generate release notes.
- Set the release as a pre-release and publish the release.
  <img width="640" alt="image" src="https://private-user-images.githubusercontent.com/22348659/292095447-8bcb83f3-dc52-46f8-98f9-a388df33abf2.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDc0NTU4MDcsIm5iZiI6MTcwNzQ1NTUwNywicGF0aCI6Ii8yMjM0ODY1OS8yOTIwOTU0NDctOGJjYjgzZjMtZGM1Mi00NmY4LTk4ZjktYTM4OGRmMzNhYmYyLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAyMDklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMjA5VDA1MTE0N1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTljYjQwOGMwYTY3ZjhmZGM4N2VjNmMwMjhlYTIxY2MzYTNmZjZhMDRmZDU1OWZjMzkzNmVmZmFhNDVlZTNmMDkmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.GdDk-fZIuLoZhqSdWJkvvU8l1_N-lwQEgWm5ttc7Ebs">

If we are releasing a beta version to a product, we have to inform the
compliance team as well to avoid overwriting the version with latest version on
the next compliance release.
