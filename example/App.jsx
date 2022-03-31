import React, { useRef, useState } from "react";

import { Down } from "neetoicons";

import Dropdown from "components/Common/Dropdown";

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
  EDITOR_METHODS_TABLE_COLUMNS,
  EDITOR_METHODS_TABLE_ROWS,
  EDITOR_COMMANDS_TABLE_COLUMNS,
  EDITOR_COMMANDS_TABLE_ROWS,
} from "./constants";
import Table from "./components/Table";

const App = () => {
  const ref = useRef();
  const [isMarkdownModeActive, setIsMarkdownModeActive] = useState(false);

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
      <Editor ref={ref} autoFocus />
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
        <h3 className="mb-2 font-bold">Use EditorContent component</h3>
        <CodeBlock>
          {`import { EditorContent } from '@bigbinary/neeto-editor'`}
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
            "{name: 'Mention 1', key: 'mention1', imageUrl: 'optional_image_url.jpg'}"
          }
        </HighlightText>{" "}
        . Here the key prop is optional. The available mention suggestions are
        shown in editor when user types a <HighlightText>@</HighlightText>{" "}
        character within editor content. The avatar image in the mention
        suggestion list is enabled by providing a truthy value to the{" "}
        <HighlightText>showImageInMention</HighlightText> prop.
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
          value="Title Text"
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
      <h3 className="mt-4 mb-2 font-bold">Unsplash image picker</h3>
      <Description>
        Neeto editor provides an option to add images from{" "}
        <HighlightText>unsplash.com</HighlightText> using an Unsplash image
        picker. Pass the Unsplash access key to the editor via the
        <HighlightText>editorSecrets</HighlightText> prop and pass the addon{" "}
        <HighlightText>image-picker-unsplash</HighlightText> to enable it.
      </Description>
      <div className="flex mt-4">
        <CodeBlock>{STRINGS.unsplashSampleCode}</CodeBlock>
        <SampleEditor
          addons={["image-upload-unsplash"]}
          editorSecrets={{ unsplash: "******" }}
        />
      </div>
      {/* Custom Slash commands */}
      <Heading type="sub">Custom Slash Commands</Heading>
      <Description>
        Neeto Editor allows users to customize their Slash Commands menu by
        including their own custom commands. Make use of{" "}
        <HighlightText>addonCommands</HighlightText> prop to pass an array of
        custom slash command menu items. The expected array should contain items
        with following properties:
        <p className="my-1 space-y-1">
          <p>
            <HighlightText>title</HighlightText>: The name of the command that
            needs to be displayed. Accepts <HighlightText>String</HighlightText>{" "}
            values
          </p>
          <p>
            <HighlightText>description</HighlightText>: The description for the
            command. Accepts <HighlightText>String</HighlightText> values.
          </p>
          <p>
            <HighlightText>optionName</HighlightText>: Unique key value for each
            command item. Accepts <HighlightText>String</HighlightText> values.
          </p>
          <p>
            <HighlightText>Icon</HighlightText>: The Icon that should be shown
            for command. Accepts a valid React component.
          </p>
          <p>
            <HighlightText>command</HighlightText>: A function which takes an
            object&nbsp;
            <HighlightText>{`{editor, range}`}</HighlightText> as it&apos;s
            argument. The function may execute any commands on the editor
            instance which it receives through argument.
          </p>
        </p>
        One thing we have to keep in mind is that in order to execute any
        commands other than what Neeto Editor is preconfigured to support, you
        need to pass those extensions via the&nbsp;
        <HighlightText>extensions</HighlightText> prop of Neeto Editor so that
        editor can recognise the command as you execute them.
      </Description>
      {/* Markdown mode */}
      <Heading type="sub">Support for markdown mode</Heading>
      <Description>
        Neeto Editor comes with a markdown mode where users can type the content
        in markdown, which gets converted to the default rich text and vice
        versa. The markdown mode can be enabled by passing a truthy value to the{" "}
        <HighlightText>markdownMode</HighlightText> prop.
      </Description>
      <div className="flex">
        <CodeBlock>{STRINGS.markdownModeSampleCode}</CodeBlock>
        <div className="flex flex-col flex-1 ml-auto">
          <Dropdown
            className="ml-auto"
            customTarget={() => (
              <div className="flex items-center px-2 py-1 space-x-2 transition-colors duration-100 bg-gray-200 rounded-sm cursor-pointer hover:bg-gray-300">
                <p> {isMarkdownModeActive ? "Markdown" : "Rich Text"}</p>
                <Down size={18} />
              </div>
            )}
          >
            <li onClick={() => setIsMarkdownModeActive(false)}>Rich Text</li>
            <li onClick={() => setIsMarkdownModeActive(true)}>Markdown</li>
          </Dropdown>
          <SampleEditor markdownMode={isMarkdownModeActive} menuType="bubble" />
        </div>
      </div>
      <Heading type="sub">Support for character count</Heading>
      <h3 className="mt-4 mb-2 font-bold">Character count and word count</h3>
      <Description>
        Neeto Editor can be configured to show the character count as and word
        count. This can be achieved by providing the{" "}
        <HighlightText>characterCountStrategy</HighlightText> prop with the
        string value <HighlightText>count</HighlightText>.
      </Description>
      <div className="flex">
        <CodeBlock>{STRINGS.characterCountSampleCode}</CodeBlock>
        <SampleEditor characterCountStrategy="count" />
      </div>
      <h3 className="mt-4 mb-2 font-bold">Character limit</h3>
      Neeto Editor can be configured to enforce a character limit. This can be
      done by providing an integer value to the{" "}
      <HighlightText>characterLimit</HighlightText> prop. Additionally, provide
      the <HighlightText>characterCountStrategy</HighlightText> prop with the
      string value <HighlightText>limit</HighlightText> to display the number of
      characters remaining.
      <div className="flex">
        <CodeBlock>{STRINGS.characterLimitSampleCode}</CodeBlock>
        <SampleEditor characterCountStrategy="limit" characterLimit={100} />
      </div>
      <Heading type="sub">Control editor height</Heading>
      <Description>
        Neeto Editor can be configured to provided a custom initial height using
        the <HighlightText>rows</HighlightText> prop. It accepts an integer
        value which represents the number of rows. It uses the{" "}
        <HighlightText>strategy</HighlightText> prop to control whether the
        height is <HighlightText>fixed</HighlightText> or{" "}
        <HighlightText>flexible</HighlightText>.
      </Description>
      <div className="flex mt-4">
        <CodeBlock>{STRINGS.editorHeightSampleCode}</CodeBlock>
        <SampleEditor rows={3} heightStrategy="flexible" />
      </div>
      <Heading type="sub">
        Control editor content using keyboard shortcuts
      </Heading>
      <Description>
        By default, Neeto Editor submits the content on pressing the{" "}
        <HighlightText>⌘ + Enter</HighlightText> in Mac or{" "}
        <HighlightText>Ctrl + Enter</HighlightText> in Windows. An{" "}
        <HighlightText>onSubmit</HighlightText> prop can be provided to call a
        function when the content is submitted. It accepts the resulting HTML
        content as argument. Additional keyboard shortcuts can be created by
        using the <HighlightText>keyboardShortcuts</HighlightText> prop. It
        accepts object. The key is the key combination to trigger the action,
        and value is the function to be called when the key combination is
        pressed. You can use <HighlightText>Mod</HighlightText> as a shorthand
        for <HighlightText>Cmd</HighlightText> on Mac and{" "}
        <HighlightText>Control</HighlightText> on other platforms. For instance,{" "}
        <HighlightText>Mod-Enter</HighlightText> corresponds to Cmd+Enter on Mac
        and Control+Enter on other platforms. Remember to return{" "}
        <HighlightText>true</HighlightText> to prevent the default behavior of
        the key combination. Keyboard shortcuts are now only supported in the
        rich-text mode.
      </Description>
      <div className="flex mt-4">
        <CodeBlock>{STRINGS.editorKeyboardShortcutsSampleCode}</CodeBlock>
        <SampleEditor
          rows={19}
          onSubmit={(content) => console.log(content)}
          keyboardShortcuts={{
            "Shift-Enter": ({ editor }) => {
              alert(editor.getHTML());
              return true;
            },
          }}
        />
      </div>
      <Heading>Editor API</Heading>
      <Description>
        The editor API contains a number of methods and commands which can be
        used to interact with the editor instance. This section will cover the
        most important ones.
      </Description>
      <Heading type="sub">Methods</Heading>
      <Description>
        The editor instance will provide a bunch of useful methods. Here is a
        list of methods that can be access the editor content.
      </Description>
      <Table
        columns={EDITOR_METHODS_TABLE_COLUMNS}
        rows={EDITOR_METHODS_TABLE_ROWS}
        className="prop-detail-table"
      />
      <h3 className="mt-4 mb-2 font-bold">Usage</h3>
      <CodeBlock>editorRef.current.editor.methodName</CodeBlock>
      <Description>
        Refer{" "}
        <a
          className="text-blue-500 font-medium"
          href="https://tiptap.dev/api/editor"
          target="_blank"
          rel="noreferrer"
        >
          https://tiptap.dev/api/editor
        </a>{" "}
        for the full list of available editor methods.{" "}
      </Description>
      <Heading type="sub">Commands</Heading>
      <Description>
        The editor instance will provide a bunch of useful commands. Here is a
        list of commands to control the editor content.
      </Description>
      <Table
        columns={EDITOR_COMMANDS_TABLE_COLUMNS}
        rows={EDITOR_COMMANDS_TABLE_ROWS}
        className="prop-detail-table"
      />
      <h3 className="mt-4 mb-2 font-bold">Usage</h3>
      <CodeBlock>editorRef.current.editor.commands.commandName()</CodeBlock>
      <Description>
        You can also combine multiple commands in a single call.
      </Description>
      <CodeBlock>
        editorRef.current.editor.chain().command1().command2().run()
      </CodeBlock>
      <Description>
        Refer{" "}
        <a
          className="text-blue-500 font-medium"
          href="https://tiptap.dev/api/commands"
          target="_blank"
          rel="noreferrer"
        >
          https://tiptap.dev/api/commands
        </a>{" "}
        for the full list of available editor commands.{" "}
      </Description>
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
