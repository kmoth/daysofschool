import { addDays, parseISO, toISO } from "./schedule.js";

export const CONFIG_STORAGE_KEY = "days-of-school-configs";
export const ACTIVE_CONFIG_STORAGE_KEY = "days-of-school-active-config";

const CONFIG_NAME_MAX_LENGTH = 40;
const DEFAULT_SCHOOL_WEEKDAYS = [1, 2, 3, 4, 5];

function getBrowserStorage() {
  try {
    return globalThis.window?.localStorage || null;
  } catch {
    return null;
  }
}

function isObject(value) {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function cleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function toConfigName(value) {
  return cleanString(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, CONFIG_NAME_MAX_LENGTH)
    .replace(/-+$/g, "");
}

function copyDateRange(range) {
  return {
    firstDay: cleanString(range?.firstDay),
    lastDay: cleanString(range?.lastDay),
  };
}

function getValidWeekdays(weekdays) {
  if (!Array.isArray(weekdays)) return DEFAULT_SCHOOL_WEEKDAYS;

  const seen = new Set();
  const validWeekdays = [];
  for (const weekday of weekdays) {
    const day = Number(weekday);
    if (!Number.isInteger(day) || day < 0 || day > 6 || seen.has(day)) continue;

    seen.add(day);
    validWeekdays.push(day);
  }

  return validWeekdays.length ? validWeekdays : DEFAULT_SCHOOL_WEEKDAYS;
}

function getEditableDaysOff(daysOff) {
  if (!Array.isArray(daysOff)) return [];

  return daysOff.map((item) => {
    const dayOff = {
      date: cleanString(item?.date),
      label: cleanString(item?.label) || "Day off",
    };

    const type = cleanString(item?.type).toLowerCase();
    if (type) dayOff.type = type;

    return dayOff;
  });
}

function deriveSummerBreak(schoolYear) {
  const firstDay = parseISO(schoolYear?.firstDay);
  const lastDay = parseISO(schoolYear?.lastDay);
  if (!firstDay || !lastDay) return null;

  const nextFirstDay = new Date(lastDay.getFullYear(), firstDay.getMonth(), firstDay.getDate());
  if (nextFirstDay <= lastDay) {
    nextFirstDay.setFullYear(nextFirstDay.getFullYear() + 1);
  }

  return {
    firstDay: toISO(addDays(lastDay, 1)),
    lastDay: toISO(addDays(nextFirstDay, -1)),
  };
}

export function getEditableSchoolConfig(config) {
  const schoolYear = copyDateRange(config?.schoolYear);
  const summerBreak = deriveSummerBreak(schoolYear) || copyDateRange(config?.summerBreak);

  return {
    schoolYear,
    summerBreak,
    schoolHours: {
      start: cleanString(config?.schoolHours?.start),
      end: cleanString(config?.schoolHours?.end),
    },
    schoolWeekdays: getValidWeekdays(config?.schoolWeekdays),
    daysOff: getEditableDaysOff(config?.daysOff),
  };
}

export function buildSchoolConfig(editableConfig) {
  const schoolYear = copyDateRange(editableConfig?.schoolYear);

  return {
    schoolYear,
    summerBreak: deriveSummerBreak(schoolYear) || copyDateRange(editableConfig?.summerBreak),
    schoolHours: {
      start: cleanString(editableConfig?.schoolHours?.start),
      end: cleanString(editableConfig?.schoolHours?.end),
    },
    schoolWeekdays: getValidWeekdays(editableConfig?.schoolWeekdays),
    daysOff: getEditableDaysOff(editableConfig?.daysOff),
  };
}

export function readActiveConfigName(storage = getBrowserStorage()) {
  if (!storage) return "";

  try {
    return toConfigName(storage.getItem(ACTIVE_CONFIG_STORAGE_KEY));
  } catch {
    return "";
  }
}

export function writeActiveConfigName(configName, storage = getBrowserStorage()) {
  if (!storage) return false;

  const activeConfigName = toConfigName(configName);

  try {
    if (activeConfigName) {
      storage.setItem(ACTIVE_CONFIG_STORAGE_KEY, activeConfigName);
    } else {
      storage.removeItem(ACTIVE_CONFIG_STORAGE_KEY);
    }
    return true;
  } catch {
    return false;
  }
}

export function readStoredConfigs(storage = getBrowserStorage()) {
  if (!storage) return {};

  try {
    const parsed = JSON.parse(storage.getItem(CONFIG_STORAGE_KEY) || "{}");
    const source = isObject(parsed?.configs) ? parsed.configs : parsed;
    if (!isObject(source)) return {};

    const configs = {};
    for (const [name, config] of Object.entries(source)) {
      const configName = toConfigName(name);
      if (!configName || !isObject(config)) continue;

      configs[configName] = buildSchoolConfig(config);
    }

    return configs;
  } catch {
    return {};
  }
}

export function writeStoredConfigs(configs, storage = getBrowserStorage()) {
  if (!storage) return false;

  const cleanConfigs = {};
  for (const [name, config] of Object.entries(isObject(configs) ? configs : {})) {
    const configName = toConfigName(name);
    if (!configName || !isObject(config)) continue;

    cleanConfigs[configName] = buildSchoolConfig(config);
  }

  try {
    storage.setItem(
      CONFIG_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        configs: cleanConfigs,
      }),
    );
    return true;
  } catch {
    return false;
  }
}

export function resolveActiveSchoolConfig(baseConfig, storage = getBrowserStorage()) {
  const storedConfigs = readStoredConfigs(storage);
  const activeConfigName = readActiveConfigName(storage);

  if (activeConfigName && storedConfigs[activeConfigName]) {
    return {
      activeConfigName,
      config: storedConfigs[activeConfigName],
      isCustomConfig: true,
    };
  }

  if (activeConfigName) writeActiveConfigName("", storage);

  return {
    activeConfigName: "",
    config: buildSchoolConfig(baseConfig),
    isCustomConfig: false,
  };
}

function getImportedConfigSource(parsed) {
  if (!isObject(parsed)) return null;
  if (isObject(parsed.config)) return parsed.config;
  if (isObject(parsed.schoolConfig)) return parsed.schoolConfig;
  if (isObject(parsed.schoolYear) || isObject(parsed.schoolHours)) return parsed;
  if (!isObject(parsed.configs)) return null;

  const firstConfig = Object.values(parsed.configs).find(isObject);
  return firstConfig || null;
}

export function getConfigJsonDocument(configName, config) {
  return {
    version: 1,
    name: toConfigName(configName),
    config: buildSchoolConfig(config),
  };
}

export function parseConfigJsonText(text) {
  const parsed = JSON.parse(text);
  const config = getImportedConfigSource(parsed);
  if (!config) return null;

  return {
    name: toConfigName(parsed.name || parsed.configName),
    config: buildSchoolConfig(config),
  };
}

export function setActiveConfigName(configName, storage = getBrowserStorage()) {
  writeActiveConfigName(configName, storage);
}
