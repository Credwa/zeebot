<template>
  <transition appear>
    <q-chat-message
    v-if="!myMessage.type"
          :text="myMessage.text"
          :stamp="moment(myMessage.stamp).format('MM/DD hh:mm A')"
          :sent="myMessage.sent"
          :class="myMessage.sent ? 'self-end ' + 'sent message' : 'self-start ' + 'received message'"
          :bg-color="myMessage.sent ? 'primary' : 'grey-1'"
          size=12
          :text-color="myMessage.sent ? 'white' : 'black'"
    />
    <div v-if="myMessage.type" class="customMessage">
      <div class="lines-group">
      <div v-for="(line, index) in myMessage.text" :key="index">
      <span>{{line}}<br></span>
      </div>
      </div>

      <p :style="myMessage.links ? 'margin-bottom:0vh' : ''" class="stamp">{{moment(myMessage.stamp).format('MM/DD hh:mm A')}}</p>

      <q-list separator highlight  no-border>
        <q-item v-for="(link, index) in myMessage.links" :key="index" tag="a"  style="text-decoration:none" :href="link.link" target="_blank">
          <q-item-side style="margin-left: -15px" :image="link.linkthumbnail"></q-item-side>
          <q-item-main class="links-label" :label="link.linkdesc" />
        </q-item>
      </q-list>
    </div>
  </transition>
</template>

<script>
import moment from 'moment';

export default {
  // name: 'ComponentName',
  props: ['myMessage'],
  data() {
    return { moment };
  },
};
</script>

<style scoped lang="scss">
.customMessage:last-child {
  .text-grey-2 {
    color: #fafafa !important;
  }
}

.customMessage {
  display: inline-block;
  font-family: Montserrat;
  margin-top: 3vh;
  max-width: 70vw;
  margin-bottom: 1vh;
  margin-left: 4vh;
  font-style: normal;
  background: #fafafa;
  font-weight: 500;
  transform: translateX(-1em) scale(0);
  transform-origin: top left;
  animation: load-bubble 1s;
  animation-fill-mode: forwards;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.12),
    0px 0px 2px rgba(0, 0, 0, 0.14);
  @media screen and (min-width: 575px) {
    width: 50vw !important;
  }
  @media screen and (min-width: 767px) {
    width: 30vw !important;
  }
  @media screen and (min-width: 991px) {
    width: 25vw !important;
  }
  @media screen and (min-width: 1199px) {
    width: 300px !important;
  }

  .links-label {
    margin-top: -3vh;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    font-size: 16px;
    letter-spacing: -0.05em;
    text-transform: capitalize;
    color: #263238;
    padding-bottom: 30px;
  }

  .stamp {
    font-family: Montserrat;
    font-style: normal;
    padding-left: 10px;
    font-weight: 500;
    margin-bottom: -2vh;
    font-size: 12px;
    color: rgba(38, 50, 56, 0.3);
  }
  pre {
    span {
      word-wrap: break-word;
      font-family: Montserrat;
      font-style: normal;
    }
  }
  &:before {
    border: 12.5px solid transparent;
    border-top: 12.5px solid #fafafa;
    border-bottom: 0;
    height: 0;
    width: 0;
    border-top-width: 25px;
    content: "";
    display: block;
    position: absolute;
    transform-origin: -10% 0%;
    -webkit-transform: rotate(270deg) skew(-25deg) translateY(16.6666666667px) !important;
    transform: rotate(270deg) skew(-25deg) translateY(16.6666666667px) !important;
  }

  .lines-group {
    padding: 10px;
    max-height: 0;
    opacity: 0;
    animation: load-text 1s;
    animation-delay: 0;
    animation-fill-mode: forwards;
    max-height: 0;
    max-width: 0;
    overflow: hidden;
    display: block;
  }
}

.received {
  background: #fafafa;
  // margin-left: 10px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.12),
    0px 0px 2px rgba(0, 0, 0, 0.14);
  width: 60vw !important;
  margin-left: 30px !important;
  @media screen and (min-width: 575px) {
    width: 50vw !important;
  }
  @media screen and (min-width: 767px) {
    width: 30vw !important;
  }
  @media screen and (min-width: 991px) {
    width: 25vw !important;
  }
  @media screen and (min-width: 1199px) {
    width: 300px !important;
  }
}

.sent {
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.12),
    0px 0px 2px rgba(0, 0, 0, 0.14);
  background: #fafafa;
  position: relative;
  max-width: 60vw;
  left: 100px;
  // margin-left: 500px;
  @media screen and (min-width: 575px) {
    width: 50vw !important;
    left: 30vw;
  }
  @media screen and (min-width: 767px) {
    width: 30vw !important;
  }
  @media screen and (min-width: 991px) {
    width: 25vw !important;
  }
  @media screen and (min-width: 1199px) {
    width: 300px !important;
    left: 45%;
  }
}

.message {
  // margin-left: 15px;
  // margin-right: 5px;
  margin-top: 30px;
  .sent {
  }

  .received {
  }
}
</style>
