import { t } from "i18next";
import { Info, Warning, Danger, Megaphone, Success } from "neetoicons/misc";

export const CALLOUT_TYPES = [
  {
    type: "default",
    label: t("neetoEditor.menu.calloutDefault"),
    emoji: Megaphone,
    bgColor: "--neeto-editor-gray-100",
  },
  {
    type: "info",
    label: t("neetoEditor.menu.calloutInfo"),
    emoji: Info,
    bgColor: "--neeto-editor-info-100",
  },
  {
    type: "warning",
    label: t("neetoEditor.menu.calloutWarning"),
    emoji: Warning,
    bgColor: "--neeto-editor-warning-100",
  },
  {
    type: "error",
    label: t("neetoEditor.menu.calloutError"),
    emoji: Danger,
    bgColor: "--neeto-editor-error-100",
  },
  {
    type: "success",
    label: t("neetoEditor.menu.calloutSuccess"),
    emoji: Success,
    bgColor: "--neeto-editor-success-100",
  },
];
