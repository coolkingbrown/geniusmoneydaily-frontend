// Shared parser for turning raw string key/value pairs — either URL search
// params on a /tools/[slug] page, or data-* attributes on an embedded
// <div data-gmd-tool="..."> in article HTML — into the `initialValues`
// object each calculator component expects. Same parsing logic, two sources.

const STRING_KEYS = new Set(["tab", "mode"]);

export function parseToolParams(config, rawParams) {
  if (!config || !rawParams) return {};

  const initialValues = {};
  for (const key of config.paramKeys) {
    const raw = rawParams[key];
    if (raw === undefined || raw === null || raw === "") continue;

    if (STRING_KEYS.has(key)) {
      initialValues[key] = String(raw);
      continue;
    }

    const num = Number(raw);
    if (Number.isFinite(num)) {
      initialValues[key] = num;
    }
  }
  return initialValues;
}
