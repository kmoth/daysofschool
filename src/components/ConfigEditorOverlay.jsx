import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  buildSchoolConfig,
  getConfigJsonDocument,
  getEditableSchoolConfig,
  parseConfigJsonText,
  readStoredConfigs,
  setActiveConfigName,
  toConfigName,
  writeStoredConfigs,
} from "../configs.js";
import { classNames } from "../ui.js";

function CloseIcon() {
  return (
    <svg className="panel-icon" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg className="panel-icon" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg className="panel-icon" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
    </svg>
  );
}

function ConfigIcon() {
  return (
    <svg className="panel-icon" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M5 7h14M5 12h14M5 17h14M8 7v0M16 12v0M11 17v0" />
    </svg>
  );
}

function getInitialSelectedConfigName(activeConfigName, configs) {
  if (activeConfigName && configs[activeConfigName]) return activeConfigName;
  return Object.keys(configs).sort()[0] || "";
}

function getDraftConfig(configName, configs, baseConfig) {
  return getEditableSchoolConfig(configName && configs[configName] ? configs[configName] : baseConfig);
}

function ConfigListButton({ activeConfigName, configName, onSelect, selectedConfigName }) {
  const isActive = activeConfigName === configName;
  const isSelected = selectedConfigName === configName;

  return (
    <button
      type="button"
      className={classNames("config-list-select", isSelected && "config-list-selected")}
      aria-pressed={isSelected}
      onClick={() => onSelect(configName)}
    >
      <span>{configName}</span>
      {isActive && <span className="config-list-active">Active</span>}
    </button>
  );
}

export function ConfigEditorButton({ onClick }) {
  return (
    <button
      type="button"
      className="panel-icon-button config-editor-open-button"
      aria-label="Edit configs"
      title="Edit configs"
      onClick={onClick}
    >
      <ConfigIcon />
    </button>
  );
}

export function ConfigEditorOverlay({ activeConfigName, baseConfig, onClose, onConfigsChange }) {
  const [configs, setConfigs] = useState(() => readStoredConfigs());
  const initialSelectedConfigName = useMemo(
    () => getInitialSelectedConfigName(activeConfigName, configs),
    [activeConfigName, configs],
  );
  const [selectedConfigName, setSelectedConfigName] = useState(initialSelectedConfigName);
  const [draftName, setDraftName] = useState(initialSelectedConfigName);
  const [draft, setDraft] = useState(() => getDraftConfig(initialSelectedConfigName, configs, baseConfig));
  const [statusMessage, setStatusMessage] = useState("");
  const dialogRef = useRef(null);
  const fileInputRef = useRef(null);
  const configNames = useMemo(() => Object.keys(configs).sort(), [configs]);
  const normalizedDraftName = toConfigName(draftName);

  useEffect(() => {
    dialogRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const notifyConfigsChange = useCallback(() => {
    onConfigsChange();
    setStatusMessage("");
  }, [onConfigsChange]);

  const setStoredConfigs = useCallback((nextConfigs) => {
    const didWrite = writeStoredConfigs(nextConfigs);
    setConfigs(readStoredConfigs());
    return didWrite;
  }, []);

  const editConfig = useCallback(
    (configName) => {
      setSelectedConfigName(configName);
      setDraftName(configName);
      setDraft(getDraftConfig(configName, configs, baseConfig));
      setStatusMessage("");
    },
    [baseConfig, configs],
  );

  const startNewConfig = useCallback(() => {
    setSelectedConfigName("");
    setDraftName("");
    setDraft(getEditableSchoolConfig(baseConfig));
    setStatusMessage("");
  }, [baseConfig]);

  const useStaticConfig = useCallback(() => {
    setActiveConfigName("");
    setSelectedConfigName("");
    setDraftName("");
    setDraft(getEditableSchoolConfig(baseConfig));
    notifyConfigsChange();
  }, [baseConfig, notifyConfigsChange]);

  const useConfig = useCallback(
    (configName) => {
      setActiveConfigName(configName);
      onConfigsChange();
      setStatusMessage(`Using ${configName}`);
    },
    [onConfigsChange],
  );

  const deleteConfig = useCallback(
    (configName) => {
      const nextConfigs = { ...configs };
      delete nextConfigs[configName];
      if (!setStoredConfigs(nextConfigs)) {
        setStatusMessage("Could not delete config");
        return;
      }

      if (activeConfigName === configName) {
        setActiveConfigName("");
        onConfigsChange();
      }

      const nextSelectedConfigName = getInitialSelectedConfigName("", nextConfigs);
      setSelectedConfigName(nextSelectedConfigName);
      setDraftName(nextSelectedConfigName);
      setDraft(getDraftConfig(nextSelectedConfigName, nextConfigs, baseConfig));
      setStatusMessage(configName ? `Deleted ${configName}` : "");
    },
    [activeConfigName, baseConfig, configs, onConfigsChange, setStoredConfigs],
  );

  const saveConfig = useCallback(
    (event) => {
      event.preventDefault();
      if (!normalizedDraftName) {
        setStatusMessage("Name needed");
        return;
      }

      const nextConfig = buildSchoolConfig(draft);
      const nextConfigs = {
        ...configs,
        [normalizedDraftName]: nextConfig,
      };

      if (!setStoredConfigs(nextConfigs)) {
        setStatusMessage("Could not save config");
        return;
      }
      setSelectedConfigName(normalizedDraftName);
      setDraftName(normalizedDraftName);
      setActiveConfigName(normalizedDraftName);
      onConfigsChange();
      setStatusMessage(`Saved ${normalizedDraftName}`);
    },
    [configs, draft, normalizedDraftName, onConfigsChange, setStoredConfigs],
  );

  const updateSchoolYear = useCallback((field, value) => {
    setDraft((current) => ({
      ...current,
      schoolYear: {
        ...current.schoolYear,
        [field]: value,
      },
    }));
  }, []);

  const updateSchoolHours = useCallback((field, value) => {
    setDraft((current) => ({
      ...current,
      schoolHours: {
        ...current.schoolHours,
        [field]: value,
      },
    }));
  }, []);

  const addDayOff = useCallback(() => {
    setDraft((current) => ({
      ...current,
      daysOff: [...current.daysOff, { date: "", label: "Day off" }],
    }));
  }, []);

  const updateDayOff = useCallback((index, field, value) => {
    setDraft((current) => ({
      ...current,
      daysOff: current.daysOff.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    }));
  }, []);

  const deleteDayOff = useCallback((index) => {
    setDraft((current) => ({
      ...current,
      daysOff: current.daysOff.filter((_, itemIndex) => itemIndex !== index),
    }));
  }, []);

  const openImportPicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const importJsonFile = useCallback(
    async (event) => {
      const file = event.target.files?.[0];
      event.target.value = "";
      if (!file) return;

      try {
        const imported = parseConfigJsonText(await file.text());
        if (!imported) {
          setStatusMessage("JSON needs a school config");
          return;
        }

        const fileConfigName = toConfigName(file.name.replace(/\.json$/i, ""));
        setSelectedConfigName("");
        setDraftName(imported.name || fileConfigName || normalizedDraftName);
        setDraft(getEditableSchoolConfig(imported.config));
        setStatusMessage("Imported JSON");
      } catch {
        setStatusMessage("Could not read JSON");
      }
    },
    [normalizedDraftName],
  );

  const exportJsonFile = useCallback(() => {
    const jsonDocument = getConfigJsonDocument(normalizedDraftName || "school-config", draft);
    const blob = new Blob([`${JSON.stringify(jsonDocument, null, 2)}\n`], { type: "application/json" });
    const objectUrl = URL.createObjectURL(blob);
    const link = window.document.createElement("a");

    link.href = objectUrl;
    link.download = `${jsonDocument.name || "school-config"}.json`;
    link.click();
    URL.revokeObjectURL(objectUrl);
    setStatusMessage(`Exported ${link.download}`);
  }, [draft, normalizedDraftName]);

  return (
    <div className="config-editor-backdrop">
      <section
        ref={dialogRef}
        className="config-editor-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="config-editor-title"
        tabIndex={-1}
      >
        <header className="config-editor-header">
          <h2 id="config-editor-title">Configs</h2>
          <button type="button" className="panel-icon-button config-editor-close-button" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </button>
        </header>

        <div className="config-editor-layout">
          <aside className="config-editor-sidebar" aria-label="Saved configs">
            <button
              type="button"
              className={classNames("config-list-select", !activeConfigName && "config-list-selected")}
              aria-pressed={!activeConfigName}
              onClick={useStaticConfig}
            >
              <span>school-config.js</span>
              {!activeConfigName && <span className="config-list-active">Active</span>}
            </button>

            {configNames.map((configName) => (
              <div key={configName} className="config-list-row">
                <ConfigListButton
                  activeConfigName={activeConfigName}
                  configName={configName}
                  onSelect={editConfig}
                  selectedConfigName={selectedConfigName}
                />
                <button type="button" className="config-list-use" onClick={() => useConfig(configName)}>
                  Use
                </button>
                <button
                  type="button"
                  className="panel-icon-button config-list-delete"
                  aria-label={`Delete ${configName}`}
                  onClick={() => deleteConfig(configName)}
                >
                  <TrashIcon />
                </button>
              </div>
            ))}

            <button type="button" className="config-editor-new-button" onClick={startNewConfig}>
              <PlusIcon />
              <span>New</span>
            </button>
          </aside>

          <form className="config-editor-form" onSubmit={saveConfig}>
            <label className="config-editor-field config-editor-field-wide">
              <span>Config name</span>
              <input
                type="text"
                value={draftName}
                placeholder="my-school-year"
                autoComplete="off"
                required
                onChange={(event) => setDraftName(event.target.value)}
              />
            </label>

            <div className="config-editor-file-actions">
              <button type="button" className="config-editor-file-button" onClick={openImportPicker}>
                Import JSON
              </button>
              <button type="button" className="config-editor-file-button" onClick={exportJsonFile}>
                Export JSON
              </button>
              <input
                ref={fileInputRef}
                className="config-editor-file-input"
                type="file"
                accept="application/json,.json"
                aria-hidden="true"
                tabIndex={-1}
                onChange={importJsonFile}
              />
            </div>

            <div className="config-editor-grid">
              <label className="config-editor-field">
                <span>Start of day</span>
                <input
                  type="time"
                  value={draft.schoolHours.start}
                  required
                  onChange={(event) => updateSchoolHours("start", event.target.value)}
                />
              </label>
              <label className="config-editor-field">
                <span>End of day</span>
                <input
                  type="time"
                  value={draft.schoolHours.end}
                  required
                  onChange={(event) => updateSchoolHours("end", event.target.value)}
                />
              </label>
              <label className="config-editor-field">
                <span>First day</span>
                <input
                  type="date"
                  value={draft.schoolYear.firstDay}
                  required
                  onChange={(event) => updateSchoolYear("firstDay", event.target.value)}
                />
              </label>
              <label className="config-editor-field">
                <span>Last day</span>
                <input
                  type="date"
                  value={draft.schoolYear.lastDay}
                  required
                  onChange={(event) => updateSchoolYear("lastDay", event.target.value)}
                />
              </label>
            </div>

            <section className="config-editor-days-off" aria-labelledby="config-editor-days-title">
              <div className="config-editor-days-header">
                <h3 id="config-editor-days-title">Days off</h3>
                <button type="button" className="config-editor-add-day-button" onClick={addDayOff}>
                  <PlusIcon />
                  <span>Add</span>
                </button>
              </div>

              <div className="config-editor-day-list">
                {draft.daysOff.map((dayOff, index) => (
                  <div key={`${index}-${dayOff.date}`} className="config-editor-day-row">
                    <label className="config-editor-field">
                      <span>Date</span>
                      <input
                        type="date"
                        value={dayOff.date}
                        required
                        onChange={(event) => updateDayOff(index, "date", event.target.value)}
                      />
                    </label>
                    <label className="config-editor-field">
                      <span>Name</span>
                      <input
                        type="text"
                        value={dayOff.label}
                        required
                        onChange={(event) => updateDayOff(index, "label", event.target.value)}
                      />
                    </label>
                    <button
                      type="button"
                      className="panel-icon-button config-editor-delete-day-button"
                      aria-label={`Delete ${dayOff.label || "day off"}`}
                      onClick={() => deleteDayOff(index)}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <footer className="config-editor-footer">
              <span className="config-editor-status" role="status">
                {statusMessage || (normalizedDraftName ? `Stored as ${normalizedDraftName}` : "")}
              </span>
              <button type="submit" className="config-editor-save-button">
                Save and use
              </button>
            </footer>
          </form>
        </div>
      </section>
    </div>
  );
}
