import "materialize-css";
import "./Settings.css";

import React, { useState } from "react";
import { Select, Switch } from "react-materialize";
import {
  setActiveLanguage,
  setIsAdditionalButtonsShows,
  setIsAdditionalTranslationsShows,
} from "../../redux/settings-reducer";
import { useDispatch, useSelector } from "react-redux";
import { LANGUAGE_CONFIG, WORDS_CONFIG } from "../../shared/words-config";

export const Settings = () => {
  const dispatch = useDispatch();

  const isAdditionalButtonsShown = useSelector(
    (store) => store.settingsStore.isAdditionalButtonsShown
  );
  const isTranslationShown = useSelector(
    (store) => store.settingsStore.isTranslationShown
  );
  const activeLanguage = useSelector(
    (store) => store.settingsStore.activeLanguage
  );

  //TODO if settings saves at backend
  const [inputValue, setInputText] = useState(activeLanguage);

  const handleLanguageChange = (event) => {
    setInputText(event.currentTarget.value);
    dispatch(setActiveLanguage(event.currentTarget.value));
  };

  return (
    <div className="settings-page">
      <h2>
        {activeLanguage === LANGUAGE_CONFIG.native
          ? WORDS_CONFIG.SETTINGS.native
          : WORDS_CONFIG.SETTINGS.foreign}
      </h2>
      <div className="switch-container">
        <div className="switch-label">
          {activeLanguage === LANGUAGE_CONFIG.native
            ? WORDS_CONFIG.SHOW_ADDITIONAL_BUTTONS.native
            : WORDS_CONFIG.SHOW_ADDITIONAL_BUTTONS.foreign}
        </div>
        <Switch
          id="Switch-buttons"
          offLabel={
            activeLanguage === LANGUAGE_CONFIG.native
              ? WORDS_CONFIG.HIDE.native
              : WORDS_CONFIG.HIDE.foreign
          }
          onChange={() =>
            dispatch(setIsAdditionalButtonsShows(!isAdditionalButtonsShown))
          }
          checked={isAdditionalButtonsShown}
          onLabel={
            activeLanguage === LANGUAGE_CONFIG.native
              ? WORDS_CONFIG.SHOW.native
              : WORDS_CONFIG.SHOW.foreign
          }
        />
      </div>
      <div className="switch-container">
        <div className="switch-label">
          {activeLanguage === LANGUAGE_CONFIG.native
            ? WORDS_CONFIG.SHOW_ADDITIONAL_TRANSLATION.native
            : WORDS_CONFIG.SHOW_ADDITIONAL_TRANSLATION.foreign}
        </div>
        <Switch
          id="Switch-translations"
          offLabel={
            activeLanguage === LANGUAGE_CONFIG.native
              ? WORDS_CONFIG.HIDE.native
              : WORDS_CONFIG.HIDE.foreign
          }
          onChange={() =>
            dispatch(setIsAdditionalTranslationsShows(!isTranslationShown))
          }
          checked={isTranslationShown}
          onLabel={
            activeLanguage === LANGUAGE_CONFIG.native
              ? WORDS_CONFIG.SHOW.native
              : WORDS_CONFIG.SHOW.foreign
          }
        />
      </div>
      <div className="switch-container">
        <div className="switch-label">
          {activeLanguage === LANGUAGE_CONFIG.native
            ? WORDS_CONFIG.SELECT_LANGUAGE.native
            : WORDS_CONFIG.SELECT_LANGUAGE.foreign}
        </div>
        <Select
          id="select-language"
          multiple={false}
          onChange={handleLanguageChange}
          options={{
            classes: "",
            dropdownOptions: {
              alignment: "left",
              autoTrigger: true,
              closeOnClick: true,
              constrainWidth: true,
              coverTrigger: true,
              hover: false,
              inDuration: 150,
              onCloseEnd: null,
              onCloseStart: null,
              onOpenEnd: null,
              onOpenStart: null,
              outDuration: 250,
            },
          }}
          value={inputValue}
        >
          <option disabled value="">
            {activeLanguage === LANGUAGE_CONFIG.native
              ? WORDS_CONFIG.SELECT_LANGUAGE.native
              : WORDS_CONFIG.SELECT_LANGUAGE.foreign}
          </option>
          <option value={LANGUAGE_CONFIG.foreign}>
            {activeLanguage === LANGUAGE_CONFIG.native
              ? WORDS_CONFIG.FOREIGN_LANGUAGE.native
              : WORDS_CONFIG.FOREIGN_LANGUAGE.foreign}
          </option>
          <option value={LANGUAGE_CONFIG.native}>
            {activeLanguage === LANGUAGE_CONFIG.native
              ? WORDS_CONFIG.NATIVE_LANGUAGE.native
              : WORDS_CONFIG.NATIVE_LANGUAGE.foreign}
          </option>
        </Select>
      </div>
    </div>
  );
};
