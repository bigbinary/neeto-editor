<!---

------ FOLLOW THESE WHILE ADDING AN ENTRY ------

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

## 0.7.3 - 2022-09-01

- Fixed: Removed Tiptap warnings in the console.

## 0.7.2 - 2022-09-01

- Added: type support to all the exported components.

## 0.7.1 - 2022-08-29

- Changed: CodeBlock theme to light.

## 0.7.0 - 2022-08-25

- Changed: **BREAKING** the CDN for editor content styles from https://cdn.jsdelivr.net/gh/bigbinary/neeto-editor-tiptap@master/dist/editor-content.min.css to https://cdn.jsdelivr.net/gh/bigbinary/neeto-editor@master/dist/editor-content.min.css.

## 0.6.8 - 2022-08-24

- Fixed issue where variables added get appended to starting of the existing content rather than at the end.

## 0.6.7 - 2022-08-23

- Changed the custom `HashtagFilled` icon in the *Variables* component with the `Braces` icon from neetoicons.

## 0.6.6 - 2022-08-23

- Added a predetermined set of default emojis.

## 0.6.5 - 2022-08-19

- Added the logic to upload all pasted images.

## 0.6.4 - 2022-08-16

- Added fallback error message for failed image uploads.

## 0.6.3 - 2022-08-10

- Fixed the dnd image upload size to take up the full available size.

## 0.6.2 - 2022-07-27

- Fixed word wrap issue in *EditorContent* component.
- Fixed build issue with `emoji-mart` package.
- Fixed the image upload modal to reset to state on closing.
- Added autofocus to input components.
- Fixed image resize bug with portrait images.
- Fixed the issue where `figcaption` was rendered as a separate node.
- Added backward compatibility to render images from existing editor content.

## 0.6.1 - 2022-07-27

- Added the ability to open images in *EditorContent* in a new tab using a single click.

## 0.6.0 - 2022-07-26

- Added the ability to resize images.
- Removed banner mode for images.

## 0.5.4 - 2022-07-25

- Added an option to delete the selected image.

## 0.5.3 - 2022-07-25

- Fixed UI for showing the image upload progress.

## 0.5.2 - 2022-07-22

- Added `paste-unformatted` addon in the slash commands. It removes all the HTML formatting while pasting.

## 0.5.1 - 2022-07-22

- Removed `margin-bottom` from the last p tag.

## 0.5.0 - 2022-07-21

- Fixed:  the overlap of placeholder with images.
