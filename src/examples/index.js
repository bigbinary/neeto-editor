import React, { useRef } from "react";

import CodeBlock from "../Common/CodeBlock";
import Description from "../Common/Description";
import Heading from "../Common/Heading";
import HighlightText from "../Common/HighlightText";
import ListItems from "../Common/ListItems";
import Editor from "../Editor";
import {
  EDITOR_FEATURES,
  SAMPLE_MENTIONS,
  SAMPLE_VARIABLES,
  STRINGS,
} from "./constants";

const Example = () => {
  const ref = useRef();

  const getHTML = () => {
    return ref.current.editor.getHTML();
  };

  return (
    <div style={{ margin: "48px 60px" }}>
      <Heading>Neeto Editor</Heading>
      <div className="flex justify-end">
        <button
          className="px-3 py-1 text-sm font-medium border border-gray-200 rounded shadow-sm"
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log({
              html: getHTML(),
            });
          }}
        >
          Print output to console
        </button>
      </div>
      <hr className="my-2 border-gray-100" />
      <Editor ref={ref} />
      <Heading type="sub">Features</Heading>
      <ListItems items={EDITOR_FEATURES} ordered />

      <Heading>Installation</Heading>
      <CodeBlock>yarn add https://github.com/bigbinary/neeto-editor</CodeBlock>

      <Heading>Usage</Heading>
      <CodeBlock>import Editor from 'bigbinary/neeto-editor'</CodeBlock>
      <Heading type="sub">Fixed Menu</Heading>
      <Description>
        The default Neeto Editor layout comes with a set of always-on-top fixed
        menu controls to interact with the editor
      </Description>
      <div className="flex">
        <CodeBlock>{STRINGS.fixedMenuSampleCode}</CodeBlock>
        <SampleEditor />
      </div>

      <Heading type="sub">Bubble Menu</Heading>
      <Description>
        If you would like to use an on-demand menu to interact with the editor
        rather than an always-on-top fixed menu, Neeto Editor support Bubble
        Menu option that appears when user selects part of text.
      </Description>
      <div className="flex">
        <CodeBlock>{STRINGS.bubbleMenuSampleCode}</CodeBlock>
        <SampleEditor menuType="bubble" />
      </div>

      <Heading type="sub">Slash Commands</Heading>
      <Description>
        Slash commands are actions that can be applied to block of text. This
        menu is enabled by default and appears when user types{" "}
        <HighlightText>/</HighlightText> at start of new line. Slash commands
        can be disabled using <HighlightText>hideSlashCommands</HighlightText>{" "}
        prop.
      </Description>
      <div className="flex">
        <CodeBlock>{STRINGS.hideSlashCommandSampleCode}</CodeBlock>
        <SampleEditor hideSlashCommands />
      </div>

      <Heading type="sub">Variable Support</Heading>
      <Description>
        Neeto Editor supports variable placement. Pass array of variables as{" "}
        <HighlightText>variables</HighlightText> prop. Users can choose
        variables from the <HighlightText>{"{}"}</HighlightText> menu with
        single click and place inside the editor.
      </Description>
      <div className="flex">
        <CodeBlock>{STRINGS.variableSampleCode}</CodeBlock>
        <SampleEditor variables={SAMPLE_VARIABLES} />
      </div>
      <Description>
        Variables that belong to a spefic category can be categorised by passing
        a <HighlightText>category_key</HighlightText> and{" "}
        <HighlightText>category_label</HighlightText> attributes. All other
        variables are shown under 'Others'
      </Description>

      <Heading type="sub">Support for Mentions</Heading>
      <Description>
        Neeto Editor comes with inbuilt support for mentions marking. Editor
        accepts a list of mention-able values as{" "}
        <HighlightText>mentions</HighlightText> prop. The list could either be
        items of shape{" "}
        <HighlightText>{"{label: 'Mention 1', key: 'mention1'}"}</HighlightText>{" "}
        or items can be just plain text like{" "}
        <HighlightText>'Mention1'</HighlightText>.
      </Description>
      <div className="flex">
        <CodeBlock>{STRINGS.mentionsSampleCode}</CodeBlock>
        <SampleEditor mentions={SAMPLE_MENTIONS} />
      </div>
    </div>
  );
};

export default Example;

const SampleEditor = (props) => {
  const ref = useRef();

  return (
    <div className="flex-1 mx-3 my-2 h-60">
      <Editor ref={ref} {...props} initialValue="Sample Text" />
    </div>
  );
};
