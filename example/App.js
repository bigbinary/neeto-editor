import React, { useRef } from "react";

import CodeBlock from "./components/CodeBlock";
import Description from "./components/Description";
import Heading from "./components/Heading";
import HighlightText from "./components/HighlightText";
import ListItems from "./components/ListItems";

import { Editor } from "../lib";

import {
  EDITOR_FEATURES,
  EDITOR_PROP_TABLE_COLUMNS,
  EDITOR_PROP_TABLE_ROWS,
  SAMPLE_MENTIONS,
  SAMPLE_VARIABLES,
  STRINGS,
  EDITOR_CONTENT_PROP_TABLE_ROWS,
  SAMPLE_ADDONS,
  EDITOR_ADDONS_TABLE_ROWS,
  EDITOR_ADDONS_TABLE_COLUMNS,
} from "./constants";
import Table from "./components/Table";

const App = () => {
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
      <CodeBlock>yarn add @bigbinary/neeto-editor</CodeBlock>
      <Heading>Usage</Heading>
      <CodeBlock>{`import { Editor } from '@bigbinary/neeto-editor'`}</CodeBlock>
      <Heading type="sub">All Props</Heading>
      <Table
        columns={EDITOR_PROP_TABLE_COLUMNS}
        rows={EDITOR_PROP_TABLE_ROWS}
        className="prop-detail-table"
      />
      <Heading type="sub">Output</Heading>
      <div className="mt-4">
        <h3 className="mb-2 font-bold">Use EditorOutput component</h3>
        <CodeBlock>
          {`import { EditorOutput } from '@bigbinary/neeto-editor'`}
        </CodeBlock>
        <Table
          columns={EDITOR_PROP_TABLE_COLUMNS}
          rows={EDITOR_CONTENT_PROP_TABLE_ROWS}
          className="prop-detail-table"
        />
      </div>
      <div className="mt-4">
        <h3 className="mb-2 font-bold text-gray-700 ">
          Include CSS in your project
        </h3>
        <CodeBlock>
          {`https://cdn.jsdelivr.net/gh/bigbinary/neeto-editor-tiptap@master/dist/editor-content.min.css`}
        </CodeBlock>
        <Description>
          Use the above CDN link to include the styles in your project. Add the
          class <pre className="inline font-semibold">neeto-editor-content</pre>{" "}
          to the wrapper of the output content.
        </Description>
      </div>
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
        <HighlightText>forceTitle</HighlightText> prop. To replace the default
        title placeholder the <HighlightText>placeholder</HighlightText> prop
        should also be provided.
      </Description>
      <div className="flex">
        <CodeBlock>{STRINGS.forceTitleSampleCode}</CodeBlock>
        <SampleEditor
          initialValue="Title Text"
          placeholder={{
            title: "Input title here",
            paragraph: "Enter your content here",
          }}
          forceTitle
        />
      </div>
      <Heading type="sub">Support for addons</Heading>
      <Description>
        Neeto editor enables the options{" "}
        <HighlightText>font size</HighlightText>,{" "}
        <HighlightText>font color</HighlightText>,{" "}
        <HighlightText>bold</HighlightText>,{" "}
        <HighlightText>italics</HighlightText>,{" "}
        <HighlightText>underline</HighlightText>,{" "}
        <HighlightText>strike through</HighlightText>,{" "}
        <HighlightText>link</HighlightText>,{" "}
        <HighlightText>bulleted list</HighlightText> and{" "}
        <HighlightText>numbered list</HighlightText> by default. Additional
        options can be enabled by passing an array of strings to the{" "}
        <HighlightText>addons</HighlightText> prop.
      </Description>
      <h3 className="mt-4 mb-2 font-bold">Available addons</h3>
      <Table
        columns={EDITOR_ADDONS_TABLE_COLUMNS}
        rows={EDITOR_ADDONS_TABLE_ROWS}
        className="prop-detail-table"
      />
      <div className="flex mt-4">
        <CodeBlock>{STRINGS.addonsSampleCode}</CodeBlock>
        <SampleEditor addons={SAMPLE_ADDONS} />
      </div>
      <Heading type="sub">Support for an optional markdown mode</Heading>
      <Description></Description>
      <div className="flex">
        <CodeBlock></CodeBlock>
        <SampleEditor markdownMode />
      </div>
    </div>
  );
};

export default App;

const SampleEditor = (props) => {
  const ref = useRef();

  return (
    <div className="flex-1 mx-3 my-2 h-60">
      <Editor ref={ref} initialValue="Edit Text Content" {...props} />
    </div>
  );
};
