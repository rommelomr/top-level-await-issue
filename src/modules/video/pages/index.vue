<template>
  <video-player
    class="video-player vjs-theme-forest"
    poster="/images/example/4.jpg"
    crossorigin="anonymous"
    playsinline
    controls
    liveui
    :sources="[videoSource]"
    :volume="0.2"
    :height="1000"
    :control-bar="{
      progressControl: false,
      currentTimeDisplay: false,
      remainingTimeDisplay: false,
    }"
    :html5="{
      vhs: {
        // https://github.com/videojs/http-streaming#options
        overrideNative: !isSafari,
        maxPlaylistRetries: Infinity,
      },
      nativeAudioTracks: false,
      nativeVideoTracks: false,
    }"
    @mounted="handleMounted"
    @ready="handleReady"
  />
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue'
import videojs, { VideoJsPlayer } from 'video.js'
import { VideoPlayer } from '@videojs-player/vue'

export default defineComponent({
  name: 'VueHlsPlayerExample',
  title: 'HLS Live player (Vue)',
  url: import.meta.url,
  components: {
    VideoPlayer,
  },
  setup() {
    const videoSource = {
      //src: 'https://live-par-1-abr-cdn.livepush.io/live_abr_cdn/emaIqCGoZw-6/index.m3u8',
      src: 'https://content.jwplatform.com/manifests/yp34SRmf.m3u8',
      type: 'application/x-mpegURL',
    }

    const player = shallowRef<VideoJsPlayer>()
    const handleMounted = (payload: any) => {
      player.value = payload.player
      console.log('HLS Live player mounted', payload)
    }

    const handleReady = () => {
      // https://github.com/videojs/http-streaming#vhsxhr
      const { vhs } = player.value?.tech() as any
      vhs.xhr.beforeRequest = (options: any) => {
        // console.log('vhs.xhr.beforeRequest', options)
        // do something...
        return options
      }
    }

    return {
      isSafari: videojs.browser.IS_SAFARI,
      videoSource,
      handleMounted,
      handleReady,
    }
  },
})
</script>

<style lang="scss" scoped>
.video-player {
  background-color: red;
  width: 100%;
}
</style>
