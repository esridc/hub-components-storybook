// TODO: we may want to reconsider how we recognize the key -there is event.key, keyCode, code... it is a mess
// we use code for letters (like KeyH) and key for symbols (like ?)
// NOTE on chrome on windows i don't get keyboard events with fn, alt, or window key pressed,
// so that leaves ctrl and shift as available modifiers
export const config = [
  {
    // dave's component goes here
    categoryKey: 'categories.commands',
    labelKey: 'shortcuts.history.label',
    code: 'KeyH',
    modifiers: ['shiftKey'],
    action: 'renderComponent',
    options: {
      modalTitleKey: 'shortcuts.history.modalTitle',
    },
    //permission: '' // this is not implemented
  },
  {
    categoryKey: 'categories.commands',
    labelKey: 'shortcuts.help.label',
    key: '?',
    modifiers: ['shiftKey'],
    action: 'renderComponent',
    options: {
      modalTitleKey: 'shortcuts.help.modalTitle',
      component: 'arcgis-hub-keyboard-shortcuts-help',
      componentArgs: {
      // config and intl will go here
      }
    },
  },
  {
    categoryKey: 'categories.commands',
    labelKey: 'shortcuts.smile.label',
    code: 'KeyS',
    modifiers: ['ctrlKey', 'shiftKey'],
    action: 'renderContent',
    options: {
      modalTitleKey: 'shortcuts.smile.modalTitle',
      content: '<calcite-icon class="smile" icon="smile" scale="l"></calcite-icon>'
    }
  },
  {
    categoryKey: 'categories.navigation',
    labelKey: 'shortcuts.search.label',
    code: 'KeyS',
    modifiers: ['shiftKey'],
    action: 'broadcastEvent',
    options: {
      eventName: 'navigate',
      path: '/search'
    }
  }
];
