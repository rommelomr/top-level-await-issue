<template>
  <div class="timeline-wrapper">
    <div class="timeline-header"></div>
    <div class="timeline-wrapper-inner">
      <div class="timeline-container">
        <!--Timeline item-->
        <div class="timeline-item is-unread">
          <div class="date">
            <span>Sep 23, 2020</span>
          </div>
          <div class="dot is-info"></div>
          <div class="content-wrap">
            <div class="content-box">
              <div class="status"></div>
              <V-Avatar picture="/demo/avatars/13.jpg" />

              <div class="box-text">
                <div class="meta-text">
                  <p>
                    <span>Tara S.</span> added you to the
                    <a>Barber Website Redesign Project</a>.
                  </p>
                  <span>11:42 am</span>
                </div>
              </div>
              <div class="box-end">
                <V-Avatar size="small" picture="/demo/avatars/8.jpg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="load-more-wrap has-text-centered">
        <V-Button dark-outlined>Load More</V-Button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { watch, inject, onMounted, ref, reactive } from 'vue'
import {
  NotificationsService,
  NotificationsPaginatedService,
} from '../services/Notifications.services'
const tableState = reactive({
  total: 0,
  currentPage: 0,
  totalPage: 0,
  items: [],
  elementsForPage: 10,
  isActive: true,
  where: '',
})
const pagination = async () => {
  try {
    const response = await NotificationsPaginatedService.getPaginated(
      tableState.elementsForPage,
      tableState.currentPage,
      tableState.where,
      tableState.isActive
    )
    tableState.items = response.data.items
    tableState.total = response.data.total
    tableState.currentPage = response.data.currentPage
    tableState.totalPage = response.data.totalPage
  } catch (error) {}
}
const nextPage = () => {
  tableState.currentPage++
  pagination()
}
const prevPage = () => {
  tableState.currentPage--
  pagination()
}

///table//

onMounted(() => {
  pagination()
})
</script>
<style lang="scss" scoped>
@import '../../../scss/abstracts/_variables.scss';
@import '../../../scss/abstracts/_mixins.scss';

/*
  1. Timeline
  2. Timeline Dark mode
  3. Media Queries
*/

/* ==========================================================================
1. Timeline
========================================================================== */

.timeline-wrapper {
  max-width: 940px;
  margin: 0 auto;

  .timeline-wrapper-inner {
    padding-top: 30px;

    .timeline-container {
      .timeline-item {
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        &::before {
          content: '';
          position: absolute;
          top: 46px;
          left: 111px;
          height: 100%;
          width: 2px;
          background: $placeholder;
          z-index: 0;
        }

        &:last-child {
          &::before {
            display: none;
          }
        }

        &.is-unread {
          .content-wrap {
            .content-box {
              .status {
                background: $h-red !important;
              }
            }
          }
        }

        .date {
          width: 80px;
          font-family: $font;
          text-align: right;

          span {
            font-size: 0.9rem;
            color: $light-text;
          }
        }

        .dot {
          position: relative;
          height: 14px;
          width: 14px;
          border-radius: $radius-rounded;
          border: 2.6px solid $primary;
          margin: 0 25px;
          z-index: 1;

          &.is-info {
            border-color: $info;
          }

          &.is-success {
            border-color: $success;
          }

          &.is-warning {
            border-color: $warning;
          }

          &.is-danger {
            border-color: $danger;
          }

          &.is-purple {
            border-color: $h-purple;
          }
        }

        .content-wrap {
          @include vuero-s-card();

          flex-grow: 2;

          .content-box {
            display: flex;
            align-items: center;

            .status {
              height: 8px;
              width: 8px;
              min-width: 8px;
              border-radius: $radius-rounded;
              background: lighten($light-text, 15%);
              margin: 0 16px 0 0;
            }

            .box-text {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-left: 12px;
              flex-grow: 2;

              .meta-text {
                line-height: 1.2;

                p {
                  color: darken($light-text, 10%);

                  span {
                    font-family: $font-alt;
                    color: $dark-text;
                    font-weight: 600;
                  }

                  a {
                    color: $primary;
                  }

                  .tag {
                    position: relative;
                    top: -1px;
                    font-weight: 500;
                    line-height: 1.8;
                    height: 1.8em;
                    margin: 0 2px;
                  }
                }

                > span {
                  color: $light-text;
                  font-size: 0.9rem;
                }
              }
            }

            .box-end {
              margin-left: auto;

              .v-avatar {
                margin: 0 2px;
              }
            }
          }

          .meta-content {
            padding-left: 78px;
          }
        }
      }
    }

    .load-more-wrap {
      padding: 40px 0;

      .button {
        min-width: 240px;
        min-height: 50px;
        text-transform: uppercase;
        font-size: 0.85rem;
        font-weight: 500;
        color: $light-text;
      }
    }
  }
}

/* ==========================================================================
2. Timeline Dark mode
========================================================================== */

.is-dark {
  .timeline-wrapper {
    .timeline-wrapper-inner {
      .timeline-container {
        .timeline-item {
          &::before {
            background: lighten($dark-sidebar, 20%);
          }

          .content-wrap {
            @include vuero-card--dark();

            .content-box {
              .status {
                background: lighten($dark-sidebar, 20%);
              }

              .box-text {
                .meta-text {
                  p {
                    span {
                      color: $dark-dark-text;
                    }

                    a {
                      color: $accent;
                    }
                  }
                }
              }
            }
          }
        }
      }

      .load-more-wrap {
        .button {
          background: lighten($dark-sidebar, 2%) !important;
        }
      }
    }
  }
}

/* ==========================================================================
3. Media Queries
========================================================================== */

@media only screen and (max-width: 767px) {
  .timeline-wrapper {
    .timeline-wrapper-inner {
      padding-top: 0;

      .timeline-container {
        .timeline-item {
          flex-direction: column;

          &::before {
            display: none;
          }

          .dot {
            display: none;
          }

          .date {
            align-self: end;
            margin-bottom: 4px;
          }

          .content-wrap {
            .content-box {
              .box-end {
                display: none;
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .timeline-wrapper {
    .timeline-wrapper-inner {
      padding-top: 0;

      .timeline-container {
        .timeline-item {
          flex-direction: column;

          &::before {
            display: none;
          }

          .dot {
            display: none;
          }

          .date {
            align-self: end;
            margin-bottom: 4px;
          }

          .content-wrap {
            .content-box {
              .box-end {
                display: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>
