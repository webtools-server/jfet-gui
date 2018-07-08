<template>
  <div class="terminal-container" ref="term"></div>
</template>
<script>
import { Terminal } from 'xterm';
import * as fit from 'xterm/lib/addons/fit/fit';
import * as fullscreen from 'xterm/lib/addons/fullscreen/fullscreen';
import * as search from 'xterm/lib/addons/search/search';
import * as webLinks from 'xterm/lib/addons/webLinks/webLinks';
import * as winptyCompat from 'xterm/lib/addons/winptyCompat/winptyCompat';

Terminal.applyAddon(fit);
Terminal.applyAddon(fullscreen);
Terminal.applyAddon(search);
Terminal.applyAddon(webLinks);
Terminal.applyAddon(winptyCompat);

import { ipcRenderer } from 'electron';

export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    project: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      xterm: null
    };
  },
  watch: {
    project(newVal) {
      this.startTerminal(newVal);
    }
  },
  methods: {
    startTerminal(project) {
      const xterm = new Terminal();

      xterm.open(this.$refs.term);
      xterm.winptyCompatInit();
      xterm.webLinksInit();
      xterm.fit();
      xterm.focus();

      if (this.text) {
        xterm.write(this.text);
      }
      xterm.on('data', (data) => {
        this.$emit('data', data);
      });

      this.xterm = xterm;
      // invoke init
      this.$emit('inited', xterm);
    }
  },
  destroyed() {
    this.xterm.dispose();
    this.xterm = null;
  }
}
</script>
<style lang="scss">
.terminal-container {
  height: 100%;
}
.xterm {
  font-family: courier-new, courier, monospace;
  font-feature-settings: "liga" 0;
  position: relative;
  user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
}

.xterm.focus,
.xterm:focus {
  outline: none;
}

.xterm .xterm-helpers {
  position: absolute;
  top: 0;
  z-index: 10;
}

.xterm .xterm-helper-textarea {
  position: absolute;
  opacity: 0;
  left: -9999em;
  top: 0;
  width: 0;
  height: 0;
  z-index: -10;
  white-space: nowrap;
  overflow: hidden;
  resize: none;
}

.xterm .composition-view {
  background: #000;
  color: #FFF;
  display: none;
  position: absolute;
  white-space: nowrap;
  z-index: 1;
}

.xterm .composition-view.active {
  display: block;
}

.xterm .xterm-viewport {
  background-color: #000;
  overflow-y: scroll;
  cursor: default;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
}

.xterm .xterm-screen {
  position: relative;
}

.xterm .xterm-screen canvas {
  position: absolute;
  left: 0;
  top: 0;
}

.xterm .xterm-scroll-area {
  visibility: hidden;
}

.xterm-char-measure-element {
  display: inline-block;
  visibility: hidden;
  position: absolute;
  top: 0;
  left: -9999em;
  line-height: normal;
}

.xterm {
  cursor: text;
}

.xterm.enable-mouse-events {
  cursor: default;
}

.xterm.xterm-cursor-pointer {
  cursor: pointer;
}

.xterm.xterm-cursor-crosshair {
  cursor: crosshair;
}

.xterm .xterm-accessibility,
.xterm .xterm-message {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  color: transparent;
}

.xterm .live-region {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
</style>


