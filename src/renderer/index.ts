import { EventEmitter } from 'events';
import { ipcRenderer, IpcMessageEvent } from 'electron';

export declare interface ExtensionsRenderer {
  on(
    event: 'create-tab',
    listener: (
      details: chrome.tabs.CreateProperties,
      callback: (tabId: number) => void,
    ) => void,
  ): this;
  on(event: string, listener: Function): this;
}

export class ExtensionsRenderer extends EventEmitter {
  constructor() {
    super();

    ipcRenderer.on(
      'api-tabs-create',
      (
        e: IpcMessageEvent,
        responseId: string,
        details: chrome.tabs.CreateProperties,
      ) => {
        const callback = (id: number) => {
          ipcRenderer.send(`api-tabs-create-${responseId}`, id);
        };

        this.emit('create-tab', details, callback);
      },
    );
  }
}

export const extensionsRenderer = new ExtensionsRenderer();
