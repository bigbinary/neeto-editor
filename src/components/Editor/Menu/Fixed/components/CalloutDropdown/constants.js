import { t } from "i18next";

export const CALLOUT_TYPES = [
  {
    type: "default",
    label: t("neetoEditor.menu.calloutDefault"),
    emoji: "💬",
    bgColor: "--neeto-editor-gray-100",
  },
  {
    type: "info",
    label: t("neetoEditor.menu.calloutInfo"),
    emoji: "ℹ️",
    bgColor: "--neeto-editor-info-100",
  },
  {
    type: "warning",
    label: t("neetoEditor.menu.calloutWarning"),
    emoji: "⚠️",
    bgColor: "--neeto-editor-warning-100",
  },
  {
    type: "error",
    label: t("neetoEditor.menu.calloutError"),
    emoji: "❌",
    bgColor: "--neeto-editor-error-100",
  },
  {
    type: "success",
    label: t("neetoEditor.menu.calloutSuccess"),
    emoji: "✅",
    bgColor: "--neeto-editor-success-100",
  },
];
