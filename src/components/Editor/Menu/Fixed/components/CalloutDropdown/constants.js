import { t } from "i18next";
import { Info, Warning, Danger, Megaphone, Success } from "neetoicons/misc";

export const CALLOUT_TYPES = [
  {
    type: "default",
    label: t("neetoEditor.menu.calloutDefault"),
    icon: Megaphone,
    bgColor: "--neeto-editor-gray-100",
  },
  {
    type: "info",
    label: t("neetoEditor.menu.calloutInfo"),
    icon: Info,
    bgColor: "--neeto-editor-info-100",
  },
  {
    type: "warning",
    label: t("neetoEditor.menu.calloutWarning"),
    icon: Warning,
    bgColor: "--neeto-editor-warning-100",
  },
  {
    type: "error",
    label: t("neetoEditor.menu.calloutError"),
    icon: Danger,
    bgColor: "--neeto-editor-error-100",
  },
  {
    type: "success",
    label: t("neetoEditor.menu.calloutSuccess"),
    icon: Success,
    bgColor: "--neeto-editor-success-100",
  },
];
