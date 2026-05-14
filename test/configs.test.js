import assert from "node:assert/strict";
import test from "node:test";
import {
  ACTIVE_CONFIG_STORAGE_KEY,
  CONFIG_STORAGE_KEY,
  buildSchoolConfig,
  getConfigJsonDocument,
  parseConfigJsonText,
  readActiveConfigName,
  readStoredConfigs,
  resolveActiveSchoolConfig,
  toConfigName,
  writeActiveConfigName,
  writeStoredConfigs,
} from "../src/configs.js";

function storageFixture() {
  const values = new Map();

  return {
    getItem(key) {
      return values.get(key) || null;
    },
    removeItem(key) {
      values.delete(key);
    },
    setItem(key, value) {
      values.set(key, value);
    },
  };
}

function schoolConfig(overrides = {}) {
  return {
    schoolHours: {
      start: "09:00",
      end: "15:00",
      ...overrides.schoolHours,
    },
    schoolWeekdays: [1, 2, 3, 4, 5],
    schoolYear: {
      firstDay: "2026-09-03",
      lastDay: "2027-06-25",
      ...overrides.schoolYear,
    },
    daysOff: [{ date: "2026-10-12", label: "Thanksgiving", type: "stat" }],
    ...overrides,
  };
}

test("config names are storage-safe slugs", () => {
  assert.equal(toConfigName("  Grade 2 / 2026! "), "grade-2-2026");
  assert.equal(toConfigName("***"), "");
});

test("stored active config selects a stored config", () => {
  const storage = storageFixture();
  const customConfig = schoolConfig({ schoolHours: { start: "08:45", end: "14:30" } });

  assert.equal(writeStoredConfigs({ grade2: customConfig }, storage), true);
  assert.equal(writeActiveConfigName("grade2", storage), true);

  const resolved = resolveActiveSchoolConfig(schoolConfig(), storage);

  assert.equal(resolved.activeConfigName, "grade2");
  assert.equal(resolved.isCustomConfig, true);
  assert.equal(resolved.config.schoolHours.start, "08:45");
  assert.equal(readActiveConfigName(storage), "grade2");
});

test("default config is used when no active config is stored", () => {
  const storage = storageFixture();
  writeStoredConfigs({ grade2: schoolConfig({ schoolHours: { start: "08:45" } }) }, storage);

  const resolved = resolveActiveSchoolConfig(schoolConfig(), storage);

  assert.equal(resolved.activeConfigName, "");
  assert.equal(resolved.isCustomConfig, false);
  assert.equal(resolved.config.schoolHours.start, "09:00");
});

test("active config can be changed in storage", () => {
  const storage = storageFixture();
  writeStoredConfigs(
    {
      grade2: schoolConfig({ schoolHours: { start: "08:45" } }),
      grade3: schoolConfig({ schoolHours: { start: "08:30" } }),
    },
    storage,
  );
  writeActiveConfigName("grade2", storage);
  writeActiveConfigName("grade3", storage);

  const resolved = resolveActiveSchoolConfig(schoolConfig(), storage);

  assert.equal(resolved.activeConfigName, "grade3");
  assert.equal(resolved.config.schoolHours.start, "08:30");
  assert.equal(storage.getItem(ACTIVE_CONFIG_STORAGE_KEY), "grade3");
});

test("missing active config falls back to the static config and clears the active config", () => {
  const storage = storageFixture();
  writeStoredConfigs({ grade2: schoolConfig({ schoolHours: { start: "08:45" } }) }, storage);
  writeActiveConfigName("missing", storage);

  const resolved = resolveActiveSchoolConfig(schoolConfig(), storage);

  assert.equal(resolved.activeConfigName, "");
  assert.equal(resolved.isCustomConfig, false);
  assert.equal(resolved.config.schoolHours.start, "09:00");
  assert.equal(storage.getItem(ACTIVE_CONFIG_STORAGE_KEY), null);
});

test("saved configs keep school-year fields and derive summer break", () => {
  const storage = storageFixture();
  const config = buildSchoolConfig(schoolConfig());

  writeStoredConfigs({ GradeTwo: config }, storage);

  const storedEnvelope = JSON.parse(storage.getItem(CONFIG_STORAGE_KEY));
  const storedConfigs = readStoredConfigs(storage);

  assert.deepEqual(Object.keys(storedEnvelope.configs), ["gradetwo"]);
  assert.equal(storedConfigs.gradetwo.schoolYear.firstDay, "2026-09-03");
  assert.equal(storedConfigs.gradetwo.summerBreak.firstDay, "2027-06-26");
  assert.equal(storedConfigs.gradetwo.summerBreak.lastDay, "2027-09-02");
});

test("exported config JSON can be imported back into a draft", () => {
  const exported = getConfigJsonDocument("Grade Two", schoolConfig());
  const imported = parseConfigJsonText(JSON.stringify(exported));

  assert.equal(exported.name, "grade-two");
  assert.equal(imported.name, "grade-two");
  assert.equal(imported.config.schoolYear.lastDay, "2027-06-25");
  assert.equal(imported.config.daysOff[0].label, "Thanksgiving");
});

test("raw config JSON can be imported", () => {
  const imported = parseConfigJsonText(JSON.stringify(schoolConfig({ schoolHours: { start: "08:30" } })));

  assert.equal(imported.name, "");
  assert.equal(imported.config.schoolHours.start, "08:30");
});
