import { escape as escapeHtml } from "he";
import parse from "html-react-parser";
import React from "react";

/**
 * 윈도우 환경 및 JSON 이중 escape 처리 포함
 */
function decodeWindowsEscaped(val: string): string {
  return val
    .replace(/\\\\/g, "\\") // \\\\ → \ (이중 백슬래시 제거)
    .replace(/\\"/g, '"') // \" → "
    .replace(/\\r\\n|\\n|\\r/g, "\n") // 이중 escaped 개행 문자 → 실제 개행
    .replace(/\r?\n/g, "<br />"); // 최종 개행 문자 → <br /> 변환
}

function safeString(val: any): string {
  if (val === null || val === undefined) return "";
  if (typeof val === "object") return JSON.stringify(val);
  return decodeWindowsEscaped(String(val));
}

export const contextHandlers: Record<string, (val: any) => any> = {
  text: (val: string) => escapeHtml(safeString(val)),

  html: (val: string): React.ReactNode => {
    const content = decodeWindowsEscaped(String(val));
    return <>{parse(content)}</>;
  },

  attribute: (val: string) =>
    escapeHtml(safeString(val)).replace(/"/g, "&quot;").replace(/'/g, "&#39;"),

  attributeName: (val: string) =>
    /^[a-zA-Z_:][-a-zA-Z0-9_:.]*$/.test(val) ? val : "",

  elementName: (val: string) =>
    /^[a-z][a-z0-9-]*$/.test(val.toLowerCase()) ? val.toLowerCase() : "",

  number: (val: any) =>
    typeof val === "number" && isFinite(val) ? val.toString() : "",

  scriptComment: (val: string) =>
    safeString(val).replace(/\*\//g, "").replace(/-->/g, ""),

  scriptString: (val: string) =>
    JSON.stringify(safeString(val))
      .replace(/<\/script>/gi, "<\\/script>") // 스크립트 break-out 방지
      .replace(/`/g, "\\`"), // 백틱 회피

  scriptToken: (val: string) => (/^[A-Za-z_$][\w$]*$/.test(val) ? val : ""),

  styleComment: (val: string) =>
    safeString(val).replace(/\*\//g, "").replace(/-->/g, ""),

  styleString: (val: string) => safeString(val).replace(/[\"'\\\n\r;]/g, ""),

  styleToken: (val: string) =>
    /^#?[a-zA-Z0-9()%,\s.\-]+$/.test(val) ? val : "",

  uri: (val: string) => {
    const safe = encodeURI(safeString(val));
    return /^(javascript:|vbscript:|data:text\/html|data:application\/javascript)/i.test(
      safe
    )
      ? ""
      : safe;
  },

  unsafe: (val: string) => {
    try {
      return <div dangerouslySetInnerHTML={{ __html: safeString(val) }} />;
    } catch {
      return null;
    }
  },
};
