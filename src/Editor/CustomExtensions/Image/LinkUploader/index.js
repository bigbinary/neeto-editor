import React, { Component } from "react";

import Url from "@uppy/url";

import { getHTMLProps, nonHtmlPropsHaveChanged } from "./constants";

class LinkUploader extends Component {
  componentDidMount() {
    this.installPlugin();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.uppy !== this.props.uppy) {
      this.uninstallPlugin(prevProps);
      this.installPlugin();
    } else if (nonHtmlPropsHaveChanged(this, prevProps)) {
      const options = {
        ...this.props,
        onRequestCloseModal: this.props.onRequestClose,
      };
      delete options.uppy;
      this.plugin.setOptions(options);
    }
  }

  componentWillUnmount() {
    this.uninstallPlugin();
  }

  installPlugin() {
    const { uppy } = this.props;
    const options = {
      id: "react:LinkUploader",
      ...this.props,
    };

    if (!options.target) {
      options.target = this.container;
    }

    delete options.uppy;
    uppy.use(Url, options);
  }

  uninstallPlugin(props = this.props) {
    const { uppy } = props;

    uppy.removePlugin(this.plugin);
  }

  render() {
    this.validProps = getHTMLProps(this.props);
    return React.createElement("div", {
      ref: (container) => {
        this.container = container;
      },
      ...this.validProps,
    });
  }
}

export default LinkUploader;
