<!---

------- FOLLOW THESE WHILE ADDING AN ENTRY -------

** Add BREAKING keyword in bold for changes which could potentially break the component, eg: **BREAKING**.
** Enclose a prop name in double backticks, eg: `menuType`.
** Represent a version as second level heading and write the version number inside a square bracket, eg: ##  [3.3.2].

--->
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

Prefix the change with one of these keywords:

- *Added*: for new features.
- *Changed*: for changes in existing functionality.
- *Deprecated*: for soon-to-be removed features.
- *Removed*: for now removed features.
- *Fixed*: for any bug fixes.
- *Security*: in case of vulnerabilities.

## [Unreleased](https://github.com/bigbinary/neeto-editor/compare/265a30e94c1d5d9fe7cd539d68298ba62e0726a7...HEAD)

## [0.12.14](https://github.com/bigbinary/neeto-editor/compare/67d30c48e1852c4e67ff9a8ebd1d47233ea0b535...265a30e94c1d5d9fe7cd539d68298ba62e0726a7) - 2022-10-20

- Fixed: Removed custom styles for scrollbars.

## [0.12.13](https://github.com/bigbinary/neeto-editor/compare/7d17d1dac013e8fb284c7890c7c03451a3a6b873...67d30c48e1852c4e67ff9a8ebd1d47233ea0b535) - 2022-10-17

- Fixed: Replaced *replaceAll* method with *replace* with a global flag to support all browsers.

## [0.12.12](https://github.com/bigbinary/neeto-editor/compare/6d3f031cb80818453fdd662a912c92a6a752346e...7d17d1dac013e8fb284c7890c7c03451a3a6b873) - 2022-10-13

- Fixed: Replaced *replaceAll* method with *replace* with a global flag to support all browsers.

## [0.12.11](https://github.com/bigbinary/neeto-editor/compare/32d2a68a6acdd6e26a53dbe8dcad687d6148dc36...6d3f031cb80818453fdd662a912c92a6a752346e) - 2022-10-13

- Removed: the Typography extension.

## [0.12.10](https://github.com/bigbinary/neeto-editor/compare/bcade1343ce2fb34fee061c90591fa4c594fc235...32d2a68a6acdd6e26a53dbe8dcad687d6148dc36) - 2022-10-13

- Fixed: Removed second scrollbar from emoji picker.

## [0.12.9](https://github.com/bigbinary/neeto-editor/compare/5cc0a55cb3e74f488b187fc3a05076167f126a0b...bcade1343ce2fb34fee061c90591fa4c594fc235) - 2022-10-06

- Fixed: Prevented strings with HTML tag structure from getting converted to actual tags.

## [0.12.8](https://github.com/bigbinary/neeto-editor/compare/1176e9f9b0f6142a3d89cfc44dda546d7745ce5d...5cc0a55cb3e74f488b187fc3a05076167f126a0b) - 2022-10-06

- Added: ability to embed Loom videos.

## [0.12.7](https://github.com/bigbinary/neeto-editor/compare/f13d8f521f20afaf1bcbaaa19c9fd3f282e0b4db...1176e9f9b0f6142a3d89cfc44dda546d7745ce5d) - 2022-10-05

- Fixed: pressing "Esc" key when a dropdown is open will properly close the dropdown.
- Fixed: auto focussed the input when the link dropdown is opened.

## [0.12.6](https://github.com/bigbinary/neeto-editor/compare/5c060b21e8fd036a5bf4799b092fd4394e8a33d1...f13d8f521f20afaf1bcbaaa19c9fd3f282e0b4db) - 2022-10-05

- Changed: updated editor styles.

## [0.12.5](https://github.com/bigbinary/neeto-editor/compare/f95d3f2d661fb280ef85e6d63e212ffd994dbab4...5c060b21e8fd036a5bf4799b092fd4394e8a33d1) - 2022-10-04

- Fixed: issue where the mentions menu item in fixed menu was always active.
- Fixed: issue where the variables menu item in fixed menu was always active.

## [0.12.4](https://github.com/bigbinary/neeto-editor/compare/102920df647f3b560193b2e49d8912c18d15f067...f95d3f2d661fb280ef85e6d63e212ffd994dbab4) - 2022-10-04

- Fixed: the performance issues with the `onChange` method.

## [0.12.3](https://github.com/bigbinary/neeto-editor/compare/3f3ebbb84b5c5f129c8585d4a1be1baef8abee87...102920df647f3b560193b2e49d8912c18d15f067) - 2022-09-30

- Fixed: issue where images were not uploaded when pasted.

## [0.12.2](https://github.com/bigbinary/neeto-editor/compare/393df11f42eef499f2b8b72bb76e1e3116d849f2...3f3ebbb84b5c5f129c8585d4a1be1baef8abee87) - 2022-09-29

- Fixed: build failure when transpiled through Webpack.

## [0.12.1](https://github.com/bigbinary/neeto-editor/compare/b400535a6cf8fabc5400b09e9f992ce1b9f016ea...393df11f42eef499f2b8b72bb76e1e3116d849f2) - 2022-09-29

- Fixed: overflow in bubble menu.

## [0.12.0](https://github.com/bigbinary/neeto-editor/compare/a819ef022941327bdf027e94d6f42806bc5d8a74...b400535a6cf8fabc5400b09e9f992ce1b9f016ea) - 2022-09-28

- Changed: image upload no longer depends on the `@rails/activestorage` package.
- Removed: `@rails/activestorage` package from peer dependencies.
- Removed: `react-group-transition` package from peer dependencies.

## [0.11.0](https://github.com/bigbinary/neeto-editor/compare/53a2a8faba0200492ea177acc7e9204da4358fc9...a819ef022941327bdf027e94d6f42806bc5d8a74) - 2022-09-28

- Added: exposed code block highlight logic to CDN.

## [0.10.0](https://github.com/bigbinary/neeto-editor/compare/4defcb02234742b1a5fc9fbefa87e44421b7b82c...53a2a8faba0200492ea177acc7e9204da4358fc9) - 2022-09-27

- Changed: updated UI to the new design system.

## [0.9.6](https://github.com/bigbinary/neeto-editor/compare/57c679b576f326e1e1c0110f9ae7665668448cdb...4defcb02234742b1a5fc9fbefa87e44421b7b82c) - 2022-09-26

- Updated the `publish` workflow to use `bigbinary/changelog-updater-action@v2`.
- Moved all the changelog entries at the bottom of the file to the top.

## [0.9.5](https://github.com/bigbinary/neeto-editor/compare/ea5536b2cdd26997549f538af5b399bd268b3187...57c679b576f326e1e1c0110f9ae7665668448cdb) - 2022-09-21

- Fixed: prevent clicking of *BubbleMenu* buttons from submitting the form.

## [0.9.4](https://github.com/bigbinary/neeto-editor/compare/b6d908b8c2cd13d0cd16c3714283ffc1ccf329c4...ea5536b2cdd26997549f538af5b399bd268b3187) - 2022-09-21

- Fixed: issue with autoFocus prop in conditionally rendered editor

## [0.9.3](https://github.com/bigbinary/neeto-editor/compare/dae456385fb32ecd2af4cd8844bec10d1c65e4c3...b6d908b8c2cd13d0cd16c3714283ffc1ccf329c4) - 2022-09-21

- Added: level 3 heading (h3) to the list of default headings.
- Added: font style dropdown to the bubble menu.

## [0.9.0](https://github.com/bigbinary/neeto-editor/compare/97e0add1b8ecb5de62ebf9984a37b25dbc01bfd0...fb41580bda01e5a63dbd92570bc27a699304653a) - 2022-09-19

- Removed: **BREAKING** official *Color* extension.

## [0.8.6](https://github.com/bigbinary/neeto-editor/compare/ab692dd346562704d70f0a31603fdf418602489b...c1ac1703a63b2220770bc1be6cbc40dd3b1c6032) - 2022-09-16

- Fixed: selecting mentions from the fixed menu will properly map to the right user.

## [0.8.5](https://github.com/bigbinary/neeto-editor/compare/3217f47b5f5dd6e47ecee8e37784658b545d0617..a727d13aa8730afe0a5162633b155cf9d4c7b745) - 2022-09-15

- Added: highlight to nodes when applying styles.

## [0.8.3](https://github.com/bigbinary/neeto-editor/compare/e405169ee1d693e4357b1b37651611a7fc80b240...e717879e13c8d74b1098587efc476b7cc85b3166) - 2022-09-07

- Fixed: wrongly rendered HTML character entities by replacing it with the associated character.

## [0.8.2](https://github.com/bigbinary/neeto-editor/compare/d8ec35f7656ded054ce3cd8250fefa630c311e41...6879a8857972c240cf5e1a4467d89f212c8be102) - 2022-09-07

- Fixed: the behaviour of inline code blocks.

## [0.8.1](https://github.com/bigbinary/neeto-editor/compare/6fe4c8c8d5340143f813003895a112f638471f2c...2a82c45768fc14e36625dc7db4b1f9f40e02153f) - 2022-09-07

- Removed: highlight.js package from peer dependencies.

## [0.8.0](https://github.com/bigbinary/neeto-editor/compare/829d47d2c1f0306bd9d995a88bba6bf0c1f8c3f9...73e6f77873abad5964c557fd2d6e158efaf147c5) - 2022-09-01

- Added: **BREAKING** support for pre-signed URLs for uploading images.

## [0.7.3](https://github.com/bigbinary/neeto-editor/compare/606d9f03cbff4a8cf81a25de398c9695656e13c3...98ff8b759cbfb5e1bdc7a262017de8ce66d63c53) - 2022-09-01

- Fixed: removed Tiptap warnings in the console.

## [0.7.2](https://github.com/bigbinary/neeto-editor/compare/aaa10e1709bf7d3a497c5a49451f24fd8ee4aed1...064c8ab26f8d736c1a4d0d92d4d7a09d1292b197) - 2022-09-01

- Added: type support to all the exported components.

## [0.7.1](https://github.com/bigbinary/neeto-editor/compare/760e07d955acecf3999bb42fbefe2ea09b56958b...83b3cf788a8dc9e79f08f69ff250e06d4bacffc9) - 2022-08-29

- Changed: Updated CodeBlock theme from dark to light.

## [0.7.0](https://github.com/bigbinary/neeto-editor/compare/9c14f50dc6c292a7352d394d1d5cd89abc6d2e79...8fefa88511ad3bfc06fe9fa59eb2457feb60b9c0) - 2022-08-25

- Changed: **BREAKING** the CDN for editor content styles from https://cdn.jsdelivr.net/gh/bigbinary/neeto-editor-tiptap@master/dist/editor-content.min.css to https://cdn.jsdelivr.net/gh/bigbinary/neeto-editor@master/dist/editor-content.min.css.

## [0.6.8](https://github.com/bigbinary/neeto-editor/compare/46e63b7aa2c42b9f9cf6db79b96945877b6dc822...0667203f6c28cfff80996a9827fa0e9fb8f0227e) - 2022-08-24

- Fixed: issue where variables added get appended to starting of the existing content rather than at the end.

## [0.6.7](https://github.com/bigbinary/neeto-editor/compare/4f26edf80be60b5567c77231f26e363de1573519...240b6b97a12804ae5903cb1fc73aa1c7888499cd) - 2022-08-23

- Changed: the custom *HashtagFilled* icon in the *Variables* component with the *Braces* icon from neetoIcons.

## [0.6.6](https://github.com/bigbinary/neeto-editor/compare/bbef6c98dded36ee9e1d278a621e8821cc41c728...8eeb8012b5c5397c072bbb65f6e67b1d597f0dba) - 2022-08-23

- Added: a predetermined set of default emojis.

## [0.6.5](https://github.com/bigbinary/neeto-editor/compare/263bd32144673a6bf3fe1e2e24838d9d73b6b69c...07688b94b185826289826930840e39de1ef836ce) - 2022-08-19

- Added: the logic to upload all pasted images.

## [0.6.4](https://github.com/bigbinary/neeto-editor/compare/5ae0901da83015324c0537ba0c37540922cacb2b...ece0b54b990d974f1a2e2bd22a3235c3830b310e) - 2022-08-16

- Added: fallback error message for failed image uploads.

## [0.6.3](https://github.com/bigbinary/neeto-editor/compare/37693be7a6987174fd5125a0cdb2acfe30d9ea3f...9939a9d08322e07eb9d7c335b9fe1fc659c2cda4) - 2022-08-10

- Fixed: stretched the image upload drag and drop modal to span full available size.

## [0.6.2](https://github.com/bigbinary/neeto-editor/compare/ba937bdcc155f78705b5b3b0877f979d02486ced...b78534aad36b384872f2139f6619f733c10b775a) - 2022-07-27

- Added: autofocus to all the input components.
- Added: backward compatibility to render images from existing editor content.
- Fixed: word wrap issue in the *EditorContent* component.
- Fixed: build issue with `emoji-mart` package.
- Fixed: the image upload modal to reset to state on closing.
- Fixed: issues with sizes of portait images.
- Fixed: the issue where the *figcaption* component was rendered as a separate node.

## [0.6.1](https://github.com/bigbinary/neeto-editor/compare/f0dd55363409861a702eaa401a321b4818f9f209...ba74c146df4e82aa365acc072888a02d645dd385) - 2022-07-27

- Added: the ability to open images in *EditorContent* in a new tab using a single click.

## [0.6.0](https://github.com/bigbinary/neeto-editor/compare/71d9b6dddd6850faf38b493141bc7204ebf3ce77...c896427e773ffb42b391859407a38bd2a6491480) - 2022-07-26

- Added: the ability to resize images.
- Removed: banner mode option from image menu.

## [0.5.4](https://github.com/bigbinary/neeto-editor/compare/40628dd04743f94d68d2f0515cd486e091687c20...e6bd77a5ecf176f7c455367eb5826a7b9e89a546) - 2022-07-25

- Added: an option to delete the selected image from the menu.

## [0.5.3](https://github.com/bigbinary/neeto-editor/compare/4e3744a1b1675ec6a34a101c3015b2a4c7b7fb07...ecea784650e06cabac1bcf5d3534c368038b987e) - 2022-07-25

- Fixed: the UI for showing the image upload progress.

## [0.5.2](https://github.com/bigbinary/neeto-editor/compare/de7af460273d0daf56c9e63a4be1f35ff1072940...15da82a90976308dc44cc461611d76dc9fc3fadc) - 2022-07-22

- Added: `paste-unformatted` addon in the slash commands. It pastes the content after removing all the HTML styles.

## [0.5.1](https://github.com/bigbinary/neeto-editor/compare/0372caad4596b3bb578964b08df44a6ff82cb12c...dea96cde565d1d31e4138439f2e508f75f46bf77) - 2022-07-22

- Removed: the `margin-bottom` attribute from the last `p` tag.

## [0.5.0](https://github.com/bigbinary/neeto-editor/compare/11895239fd8888accbdc2d45473d6d251c55765c...3fec138f2c29a807efcadbbd61df06edd9aeee4b) - 2022-07-21

- Fixed: the overlap of placeholder with images.
