import * as API from './api/'
import * as types from '../constants'

import audio_wrong_src from '../assets/audio/wrong-answer.mp3'
import audio_correct_src from '../assets/audio/correct-answer.mp3'

export function compile (code, lang, token) {
  return async (dispatch) => {
    dispatch({
      type: types.COMPILE,
    })
    try {
      const res = await API.compile(code, lang, token)
      const json = await res.json()

      // Play error sound on failure
      if(!!json.stderr) {
        setTimeout(()=> {new Audio(audio_wrong_src).play()}, 3000)
      }
      // Play success sound on success
      else {
        setTimeout(()=> {new Audio(audio_correct_src).play()}, 3000)
      }

      dispatch({
        type: types.COMPILE_SUCCESS,
        payload: json,
      })
    } catch (err) {
      dispatch({
        type: types.COMPILE_FAIL,
        payload: err,
      })
    }
  }
}

export function saveCode (code, lang) {
  return (dispatch) => {
    dispatch({
      type: types.SAVE_CODE_SUCCESS,
      payload: { code, lang }
    })
  }
}

export function changeLang (lang) {
  return (dispatch) => {
    dispatch({
      type: types.CHANGE_LANG,
      payload: lang,
    })
  }
}

export function fontSize (size) {
  return (dispatch) => {
    dispatch({
      type: types.UPDATE_FONT_SIZE,
      payload: size,
    })
  }
}

export function toggleAutocomplete (checked) {
  return (dispatch) => {
    dispatch({
      type: types.TOGGLE_AUTOCOMPLETE,
      payload: checked,
    })
  }
}

export function toggleLiveAutocomplete (checked) {
  return (dispatch) => {
    dispatch({
      type: types.TOGGLE_LIVE_AUTOCOMPLETE,
      payload: checked,
    })
  }
}

export function toggleVim (checked) {
  return (dispatch) => {
    dispatch({
      type: types.TOGGLE_VIM,
      payload: checked,
    })
  }
}

export function showInfo (info) {
  return (dispatch) => {
    dispatch({
      type: types.SHOW_INFO,
      payload: info,
    })
  }
}
