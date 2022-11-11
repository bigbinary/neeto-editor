import React from "react";

import Menu from "./Menu";
import { addImageUpdateLogicToCommandItems } from "./utils";

import ImageUploader from "../Image/Uploader";

class CommandsList extends React.Component {
  state = { activeMenuIndex: 0, isImageUploadOpen: false };

  onKeyDown = ({ event }) =>
    ["Enter", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
      event.key
    );

  setActiveMenuIndex = index => this.setState({ activeMenuIndex: index });

  render() {
    const items = addImageUpdateLogicToCommandItems(this.props.items, () =>
      this.setState({ isImageUploadOpen: true })
    );

    return (
      <>
        <Menu
          {...this.props}
          activeMenuIndex={this.state.activeMenuIndex}
          items={items}
          menuIndex={0}
          setActiveMenuIndex={this.setActiveMenuIndex}
        />
        <ImageUploader
          editor={this.props.editor}
          imageUploadUrl={this.props.uploadEndpoint}
          isOpen={this.state.isImageUploadOpen}
          unsplashApiKey={this.props.editorSecrets.unsplash}
          uploadConfig={this.props.uploadConfig}
          onClose={() => this.setState({ isImageUploadOpen: false })}
        />
      </>
    );
  }
}

export default CommandsList;
