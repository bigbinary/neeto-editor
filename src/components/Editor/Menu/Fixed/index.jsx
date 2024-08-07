import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import classNames from "classnames";
import { EDITOR_OPTIONS } from "common/constants";
import { isNotEmpty } from "neetocist";
import DynamicVariables from "neetomolecules/DynamicVariables";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import EmbedOption from "components/Editor/CustomExtensions/Embeds";
import MediaUploader from "components/Editor/MediaUploader";

import LinkAddPopOver from "./components/LinkAddPopOver";
import MoreMenu from "./components/MoreMenu";
import { MENU_ELEMENTS } from "./constants";
import useEditorState from "./hooks/useEditorState";
import { reGroupMenuItems, buildMenuOptions } from "./utils";

const Fixed = ({
  editor,
  options,
  mentions,
  variables = [],
  setMediaUploader,
  mediaUploader,
  unsplashApiKey,
  addonCommands = [],
  isIndependant = true,
  className,
  tooltips = {},
  attachmentProps,
  isEmojiPickerActive,
  setIsEmojiPickerActive,
  children,
  openLinkInNewTab,
}) => {
  const [focusedButtonIndex, setFocusedButtonIndex] = useState(0);
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);
  const [isAddLinkActive, setIsAddLinkActive] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [moreMenuItems, setMoreMenuItems] = useState([]);

  useEditorState({ editor });

  const editorRef = useRef(editor);

  useEffect(() => {
    editorRef.current = editor;
  }, [editor]);

  const menuRef = useRef(null);
  const menuContainerRef = useRef(null);

  const { t } = useTranslation();

  const runEditorCommand = useCallback(
    command => () => command(editorRef.current),
    []
  );

  const handleArrowNavigation = event => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setFocusedButtonIndex(prevIndex => (prevIndex + 1) % menuButtons.length);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      setFocusedButtonIndex(
        prevIndex => (prevIndex - 1 + menuButtons.length) % menuButtons.length
      );
    }
  };

  const menuButtons = useMemo(
    () => menuRef.current?.querySelectorAll(".neeto-editor-fixed-menu__item"),
    [menuRef.current]
  );

  useEffect(() => {
    menuButtons?.[focusedButtonIndex].focus();
  }, [focusedButtonIndex]);

  useEffect(() => {
    menuButtons?.forEach(menuItem =>
      menuItem.addEventListener("keydown", handleArrowNavigation)
    );

    return () =>
      menuButtons?.forEach(menuItem =>
        menuItem.removeEventListener("keydown", handleArrowNavigation)
      );
  }, [menuButtons]);

  const menuGroups = useMemo(
    () =>
      buildMenuOptions({
        tooltips,
        runEditorCommand,
        options,
        setMediaUploader,
        attachmentProps,
        setIsEmbedModalOpen,
        setIsAddLinkActive,
        mentions,
        addonCommands,
        setIsEmojiPickerActive,
        isEmojiPickerActive,
      }),
    [isEmojiPickerActive, mentions]
  );

  const handleResize = useCallback(() => {
    if (!menuRef.current) return;
    const { visibleMenuGroups, invisibleMenuGroups } = reGroupMenuItems(
      menuRef,
      menuGroups
    );
    setMenuItems(visibleMenuGroups);
    setMoreMenuItems(invisibleMenuGroups);
  }, [setMenuItems, menuGroups, menuRef.current]);

  useEffect(() => {
    handleResize();

    const menuContainer = menuContainerRef.current;
    const resizeObserver = new ResizeObserver(handleResize);
    if (menuContainer) {
      resizeObserver.observe(menuContainer);
    }

    return () => {
      if (menuContainer) resizeObserver.unobserve(menuContainer);
    };
  }, [menuContainerRef.current, handleResize, menuGroups]);

  if (!editor) return null;

  const isEmbedOptionActive = options.includes(EDITOR_OPTIONS.VIDEO_EMBED);
  const isMediaUploaderActive =
    options.includes(EDITOR_OPTIONS.IMAGE_UPLOAD) ||
    options.includes(EDITOR_OPTIONS.VIDEO_UPLOAD);

  const handleVariableClick = item => {
    const { category, key } = item;
    const variableName = category ? `${category}.${key}` : key;
    editor.chain().focus().setVariable({ label: variableName }).run();
  };

  return (
    <div
      ref={menuContainerRef}
      className={classNames("neeto-editor-fixed-menu", {
        "neeto-editor-fixed-menu--independant": isIndependant,
        [className]: className,
      })}
    >
      <div
        className="neeto-editor-fixed-menu__wrapper"
        data-cy="neeto-editor-fixed-menu-wrapper"
        ref={menuRef}
      >
        {menuItems.map(group =>
          group.map(({ type, ...props }) => {
            const Component = MENU_ELEMENTS[type];

            if (!Component) return null;

            return (
              <Component key={props.optionName} {...{ ...props, editor }} />
            );
          })
        )}
        {isNotEmpty(moreMenuItems) && (
          <MoreMenu {...{ editor }} groups={moreMenuItems} />
        )}
        {children}
      </div>
      {!isEmpty(variables) && (
        <div
          className="neeto-editor-fixed-menu__variables"
          data-cy="neeto-editor-fixed-menu-variables"
        >
          <DynamicVariables
            {...{ variables }}
            dropdownProps={{
              buttonSize: "small",
              buttonProps: {
                tooltipProps: {
                  content: t("neetoEditor.menu.dynamicVariables"),
                  position: "bottom",
                },
              },
            }}
            onVariableClick={handleVariableClick}
          />
        </div>
      )}
      {isAddLinkActive && (
        <LinkAddPopOver
          {...{
            editor,
            isAddLinkActive,
            openLinkInNewTab,
            setIsAddLinkActive,
          }}
        />
      )}
      {isMediaUploaderActive && (
        <MediaUploader
          {...{ editor, mediaUploader, unsplashApiKey }}
          onClose={() => setMediaUploader({ image: false, video: false })}
        />
      )}
      {isEmbedOptionActive && (
        <EmbedOption {...{ editor, isEmbedModalOpen, setIsEmbedModalOpen }} />
      )}
    </div>
  );
};

export default Fixed;
