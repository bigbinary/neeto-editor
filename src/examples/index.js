import React, { useRef } from "react";

import CodeBlock from "common/CodeBlock";
import Description from "common/Description";
import Heading from "common/Heading";
import HighlightText from "common/HighlightText";
import ListItems from "common/ListItems";
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
      <Editor ref={ref} variables={SAMPLE_VARIABLES} />
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
        <HighlightText>variables</HighlightText> prop. Users can choose from
        available variables from the <HighlightText>{"{}"}</HighlightText> menu.
        Alternatively, the available variable options can be displayed by typing{" "}
        <HighlightText>{"{{"}</HighlightText> within the editor.
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
        <HighlightText>
          {
            "{label: 'Mention 1', key: 'mention1', imageUrl: 'optional_image_url.jpg'}"
          }
        </HighlightText>{" "}
        or items can be just plain text like{" "}
        <HighlightText>'Mention1'</HighlightText>. The available mention
        suggestions are shown in editor when user types a{" "}
        <HighlightText>@</HighlightText> character within editor content. The
        avatar image in the mention suggestion list is enabled by providing
        truthy value to the <HighlightText>showImageInMention</HighlightText>{" "}
        prop.
      </Description>
      <div className="flex">
        <CodeBlock>{STRINGS.mentionsSampleCode}</CodeBlock>
        <SampleEditor mentions={SAMPLE_MENTIONS} showImageInMention />
      </div>

      <Heading type="sub">Support for placeholder</Heading>
      <Description>
        The editor can have placeholder texts for different nodes. These value
        is accepted as <HighlightText>placeholder</HighlightText> prop.
      </Description>
      <ul className="list-disc list-inside">
        <li>
          Value as object: Each type of node can have corresponding placeholder,
          in which case the value should be of type{" "}
          <HighlightText>{"{node_name: placeholder_text}"}</HighlightText>.
        </li>
        <li>
          Value as string: When plain string is provided as value for
          placeholder, all the nodes will be using the same placeholder text
          irrespective of their type in which case the value should be of type{" "}
        </li>
        <li>
          Value as function: the <HighlightText>placeholder</HighlightText> prop
          can also accepts a function. For each node in the document, the
          function receives node as argument and return the corresponding
          placeholder string. eg:{" "}
          <HighlightText>{"({node}) => placeholder_text"}</HighlightText>
        </li>
      </ul>

      <div className="flex">
        <CodeBlock>{STRINGS.placeholderSampleCode}</CodeBlock>
        <SampleEditor placeholder="Input text here" />
      </div>

      <Heading type="sub">Force a title</Heading>
      <Description>
        Neeto editor can be configured to force user to include a document title
        . This can be achieved by providing a truthy value to the{" "}
        <HighlightText>forceTitle</HighlightText> prop. Along with that, inorder
        to show the placeholder text on the title, the{" "}
        <HighlightText>placeholder</HighlightText> prop should also be provided.
      </Description>
      <div className="flex">
        <CodeBlock>{STRINGS.forceTitleSampleCode}</CodeBlock>
        <SampleEditor
          initialValue="Title Text"
          placeholder={{ heading: "Input title here" }}
          forceTitle
        />
      </div>
    </div>
  );
};

export default Example;

const SampleEditor = (props) => {
  const ref = useRef();

  return (
    <div className="flex-1 mx-3 my-2 h-60">
      <Editor ref={ref} initialValue="Edit Text Content" {...props} />
    </div>
  );
};
