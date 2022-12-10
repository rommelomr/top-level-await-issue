<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  light: {
    type: Boolean,
    default: false,
  },
})

const router = useRouter()
const isLoading = ref(false)

router.beforeEach(() => {
  isLoading.value = true
})
router.afterEach(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 200)
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="42.402"
    height="37.064"
    viewBox="0 0 42.402 37.064"
  >
    <g
      id="Group_1004"
      data-name="Group 1004"
      transform="translate(-2151.878 -23.722)"
    >
      <rect
        id="Rectangle_612"
        data-name="Rectangle 612"
        width="3.928"
        height="3.928"
        transform="translate(2157.086 31.337) rotate(-16.659)"
        fill="#5f5f5f"
      />
      <path
        id="Path_3124"
        data-name="Path 3124"
        d="M494.471,59.622a15.137,15.137,0,1,1-15.137-15.137,15.137,15.137,0,0,1,15.137,15.137"
        transform="translate(1699.81 -16.423)"
        fill="#641859"
      />
      <path
        id="Path_3125"
        data-name="Path 3125"
        d="M507.829,75.287,503.2,59.8l7.522-2.25q9.537-2.853,11.727,4.468,2.443,8.167-7.094,11.019ZM514.47,68.5q4.516-1.351,3.439-4.955-.917-3.067-5.434-1.717l-2.995.9,2,6.67Z"
        transform="translate(1668.962 -26.124)"
        fill="#5f5f5f"
      />
      <rect
        id="Rectangle_613"
        data-name="Rectangle 613"
        width="4.861"
        height="11.385"
        transform="translate(2175.756 44.466) rotate(-16.654)"
        fill="#5f5f5f"
      />
      <rect
        id="Rectangle_614"
        data-name="Rectangle 614"
        width="4.872"
        height="4.553"
        transform="translate(2179.333 56.424) rotate(-16.66)"
        fill="#5f5f5f"
      />
      <rect
        id="Rectangle_615"
        data-name="Rectangle 615"
        width="11.117"
        height="4.642"
        transform="translate(2170.051 46.143) rotate(-16.649)"
        fill="#5f5f5f"
      />
      <path
        id="Path_3126"
        data-name="Path 3126"
        d="M437.353,132.18l1.347,4.5-13.033,3.954-1.347-4.5Z"
        transform="translate(1731.351 -85.787)"
        fill="#5f5f5f"
      />
      <rect
        id="Rectangle_616"
        data-name="Rectangle 616"
        width="4.861"
        height="11.385"
        transform="translate(2175.971 43.703) rotate(-16.655)"
        fill="#fff"
      />
      <rect
        id="Rectangle_617"
        data-name="Rectangle 617"
        width="4.872"
        height="4.553"
        transform="matrix(0.958, -0.287, 0.287, 0.958, 2179.548, 55.661)"
        fill="#fff"
      />
      <rect
        id="Rectangle_618"
        data-name="Rectangle 618"
        width="11.116"
        height="4.642"
        transform="matrix(0.958, -0.287, 0.287, 0.958, 2170.266, 45.381)"
        fill="#fff"
      />
      <path
        id="Path_3127"
        data-name="Path 3127"
        d="M438.867,128.869l1.347,4.5-13,3.954-1.347-4.5Z"
        transform="translate(1730.129 -83.169)"
        fill="#fff"
      />
      <path
        id="Path_3128"
        data-name="Path 3128"
        d="M472.289,80.15l1.276,4.8-5.248,1.573-1.435-4.8Z"
        transform="translate(1697.684 -44.633)"
        fill="#5f5f5f"
      />
      <rect
        id="Rectangle_619"
        data-name="Rectangle 619"
        width="6.969"
        height="6.97"
        transform="matrix(0.958, -0.287, 0.287, 0.958, 2152.338, 38.94)"
        fill="#5f5f5f"
      />
      <rect
        id="Rectangle_620"
        data-name="Rectangle 620"
        width="6.969"
        height="6.97"
        transform="matrix(0.958, -0.287, 0.287, 0.958, 2152.741, 38.321)"
        fill="#641859"
      />
      <rect
        id="Rectangle_621"
        data-name="Rectangle 621"
        width="3.928"
        height="3.928"
        transform="matrix(0.958, -0.287, 0.287, 0.958, 2157.319, 30.712)"
        fill="#006fb9"
      />
      <rect
        id="Rectangle_622"
        data-name="Rectangle 622"
        width="6.553"
        height="6.553"
        transform="translate(2161.678 26.238) rotate(-16.653)"
        fill="#5f5f5f"
      />
      <rect
        id="Rectangle_623"
        data-name="Rectangle 623"
        width="6.553"
        height="6.553"
        transform="translate(2161.975 25.6) rotate(-16.657)"
        fill="#641859"
      />
      <rect
        id="Rectangle_624"
        data-name="Rectangle 624"
        width="3.662"
        height="3.662"
        transform="matrix(0.958, -0.286, 0.286, 0.958, 2151.878, 30.462)"
        fill="#5f5f5f"
      />
      <rect
        id="Rectangle_625"
        data-name="Rectangle 625"
        width="3.663"
        height="3.663"
        transform="translate(2152.092 29.89) rotate(-16.654)"
        fill="#006fb9"
      />
      <path
        id="Path_3129"
        data-name="Path 3129"
        d="M473.8,76.42l1.435,4.8-5.377,1.558-1.435-4.8Z"
        transform="translate(1696.465 -41.683)"
        fill="#fff"
      />
      <path
        id="Path_3130"
        data-name="Path 3130"
        d="M510.235,70.317,505.6,54.828l7.521-2.25q9.537-2.853,11.727,4.468,2.443,8.167-7.094,11.019Zm6.641-6.792q4.517-1.351,3.438-4.955-.917-3.067-5.434-1.716l-2.993.9,2,6.671Z"
        transform="translate(1667.059 -22.192)"
        fill="#fff"
      />
    </g>
  </svg>
</template>

<style lang="scss" scoped>
@import '../scss/abstracts/_variables.scss';
@import '../scss/layout/_sidebar.scss';

.right {
  fill: darken($primary, 7%);
}
.bottom {
  fill: $primary;
}
.left {
  fill: lighten($primary, 15%);
}

.is-roll {
  .right {
    animation: is-roll-right 8s ease infinite;
    animation-fill-mode: forwards;
    animation-delay: 4s;
  }
  .left {
    animation: is-roll-left 8s ease infinite;
    animation-fill-mode: forwards;
    animation-delay: 4s;
  }
  .bottom {
    animation: is-roll-bottom 8s ease infinite;
    animation-fill-mode: forwards;
    animation-delay: 4s;
  }
}

.is-light {
  .right {
    fill: #fff;
    animation: none;
  }
  .bottom {
    fill: #fffc;
    animation: none;
  }
  .left {
    fill: #fffa;
    animation: none;
  }
}

@keyframes is-roll-right {
  0% {
    fill: darken($primary, 7%);
  }
  33% {
    fill: #1ee8c0;
  }
  66% {
    fill: lighten($h-green, 15%);
  }
  100% {
    fill: darken($primary, 7%);
  }
}

@keyframes is-roll-bottom {
  0% {
    fill: $primary;
  }
  33% {
    fill: darken(#1ee8c0, 7%);
  }
  66% {
    fill: $h-green;
  }
  100% {
    fill: $primary;
  }
}

@keyframes is-roll-left {
  0% {
    fill: lighten($primary, 15%);
  }
  33% {
    fill: lighten(#1ee8c0, 15%);
  }
  66% {
    fill: darken($h-green, 7%);
  }
  100% {
    fill: lighten($primary, 15%);
  }
}
</style>
