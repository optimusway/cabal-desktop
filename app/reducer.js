import { createReducer } from '@reduxjs/toolkit'
import { setAutoFreeze } from 'immer'

// set auto freeze to false to prevent freezing the object.
// currently data is shared between cabal-client lib and redux.
// so if frozen, it will cause issues since lib is mutating some code.-
setAutoFreeze(false)

const defaultState = {
  screen: 'main',
  cabalSettingsVisible: false,
  currentCabal: null,
  currentChannel: 'default',
  channelMembers: [],
  cabals: {},
  cabalSettings: {},
  emojiPickerVisible: false
}

const reducer = createReducer(defaultState, {
  CHANGE_SCREEN: (state, { screen, addr }) => {
    state.screen = screen
    state.addr = addr
  },
  VIEW_CABAL: (state, { channel, addr }) => {
    state.currentCabal = addr
    state.currentChannel = channel || state.currentChannel
  },
  ADD_CABAL: (state, action) => {
    state.cabals[action.addr] = {
      ...state.cabals[action.addr],
      messages: [],
      ...action
    }
  },
  UPDATE_CABAL: (state, action = {}) => {
    state.cabals[action.addr] = {
      ...state.cabals[action.addr],
      ...action
    }
  },
  UPDATE_CABAL_SETTINGS: (state, { addr, settings }) => {
    state.cabalSettings[addr] = {
      ...state.cabalSettings[addr],
      ...settings
    }
  },
  UPDATE_TOPIC: (state, { addr, topic }) => {
    state.cabals[addr].topic = topic
  },
  DELETE_CABAL: (state, { addr }) => {
    delete state.cabals[addr]
  },
  SHOW_CHANNEL_BROWSER: (state) => {
    state.channelBrowserVisible = true
  },
  UPDATE_CHANNEL_BROWSER: (state, { channelsData }) => {
    state.channelBrowserChannelsData = channelsData
  },
  SHOW_CABAL_SETTINGS: (state) => {
    state.cabalSettingsVisible = true
    state.emojiPickerVisible = false
  },
  HIDE_CABAL_SETTINGS: state => { state.cabalSettingsVisible = false },
  HIDE_ALL_MODALS: state => {
    state.cabalSettingsVisible = false
    state.emojiPickerVisible = false
    state.channelBrowserVisible = false
  },
  UPDATE_WINDOW_BADGE: (state, { badgeCount }) => { state.badgeCount = badgeCount },
  SHOW_EMOJI_PICKER: (state) => { state.emojiPickerVisible = true },
  HIDE_EMOJI_PICKER: state => { state.emojiPickerVisible = false }

})

export default reducer
