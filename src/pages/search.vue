<template>
<div>
  <navbar title="Search"></navbar>
  <q-page class="items-center column justify-start search-page">
    <div class="pre-box">
      <div class="dimensions-box">
      </div>
    </div>
    <transition appear enter-active-class="animated slideInUp">
      <q-scroll-area style="" class="messaging items-center column justify-start">
        <div v-if="!searching && !result && !listening" class="zeebot flex column items-center">
          <img  alt="ZeeBot" src="~assets/zeebot-init.svg">
          <div class="assist">Hello! How Can I help you?</div>
        </div>
        <div v-if="listening" class="zeebot flex column items-center">
          <img  alt="ZeeBot" src="~assets/zeebot-listening.svg" style="margin-left:65px">
          <div class="assist flex column " style="margin-left:55px">Listening
            <div class="loader"><span class="loader__dot pulse pulse__one"></span><span class="loader__dot pulse pulse__two"></span><span class="loader__dot pulse pulse__three"></span></div>
          </div>
        </div>
        <div v-if="searching && !result && !listening" class="zeebot flex column items-center ">
          <img  alt="ZeeBot" src="~assets/zeebot-searching.svg" style="margin-left:-55px">
          <div class="assist flex column " style="margin-left:55px">Searching
            <div class="loader"><span class="loader__dot pulse pulse__one"></span><span class="loader__dot pulse pulse__two"></span><span class="loader__dot pulse pulse__three"></span></div>
          </div>
        </div>
        <div>
          <message v-for="message in messages" :key="message.stamp+message.text" :myMessage="message"></message>
        </div>

      </q-scroll-area>
    </transition>
  <div class="search-footer items-center column justify-start">
    <q-btn flat style="color: #38A4DD">See all skills</q-btn>
    <q-input ref="message" @click="scrollIntoView" @keyup.enter.native="sendMessage" v-model="userMessage" color="blue 4" class="send-message" :after="userMessage.length > 0 ? [{icon: 'send', content: true, handler:() => { this.sendMessage() }}] :  [{icon: 'mic', content: false, handler:() => { this.createVoiceMessage() }}] " :placeholder="!searching ? 'Say or type your search...' : 'Searching...'"/>
  </div>

  </q-page>
</div>
</template>

<script>
import moment from 'moment';

import navbar from '../components/navbar.vue';
import message from '../components/message.vue';

export default {
  name: 'PageSearch',
  components: { navbar, message },
  data() {
    return {
      result: false,
      listening: false,
      userMessage: '',
      searching: false,
      messages: [],
      moment,
    };
  },
  methods: {
    scrollIntoView() {
      this.$refs.message.$el.scrollIntoView({ behavior: 'smooth' });
    },
    sendMessage() {
      if (this.userMessage.length > 0) {
        const newMessage = {
          text: [this.userMessage],
          stamp: moment(),
          sent: true,
        };

        this.userMessage = '';
        this.searching = true;
        setTimeout(() => {
          this.searching = false;
          this.result = true;
          this.messages.push(newMessage);
          const newMessageReply = {
            text: [
              `Here are search results for '${
                this.messages[this.messages.length - 1].text
              }': `,
            ],
            stamp: moment(),
            sent: false,
          };
          this.messages.push(newMessageReply);
        }, 4000);
      }
    },
    createVoiceMessage() {
      console.log(navigator);
      this.listening = true;
    },
  },
};
</script>

<style scoped lang="scss">
.search-page {
}

.pre-box {
  background-color: #fafafa;
  width: 100vw;
  height: 66px;
  top: 15vh;
  border-bottom: solid #e0e0e0 1px;

  .dimensions-box {
    position: absolute;
    width: 320px;
    top: 1vh;
    height: 50px;
    left: calc(50% - 320px / 2);
    background: url("/assets/dimension-box.png");
  }
}

.assist {
  /* Hello! How can I help you? */
  width: 291px;
  height: 32px;
  left: calc(50% - 291px / 2 - 0.5px);
  margin-top: 5vh;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  font-size: 24px;
  text-align: center;
  letter-spacing: -0.05em;

  color: #263238;
}

.messaging {
  padding-right: 10px;
  width: 100vw;
  height: 60vh;
  margin-top: 5vh;
  @media screen and (min-width: 586px) {
    width: 433px;
  }
}

.search-footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  text-align: center;
}

.send-message {
  width: 95vw;
  height: 5vh;
  margin-top: 5vh;
  padding: 0vw 2vw 0vw 2vw;
  background-color: rgba(38, 50, 56, 0.03);
  @media screen and (min-width: 586px) {
    width: 500px;
  }
}
.loader {
  position: relative;
  margin-top: 15px;
  margin-left: -40px;
}
.loader__dot {
  display: block;
  width: 6px;
  height: 6px;
  margin: 3px;
  border-radius: 50px;
  background-color: #1a1a1a;
  float: left;
}
.pulse {
  will-change: transform, opacity;
  -webkit-animation: pulse 1.25s infinite ease;
  animation: pulse 1.25s infinite ease;
}
.pulse__one {
  -webkit-animation-delay: 250ms;
  animation-delay: 250ms;
}
.pulse__two {
  -webkit-animation-delay: 500ms;
  animation-delay: 500ms;
}
.pulse__three {
  -webkit-animation-delay: 750ms;
  animation-delay: 750ms;
}

body {
  margin: 0;
  display: flex;
  justify-content: center;
  flex-direction: row;
  height: 100vh;
  align-items: center;
  background-color: #fff;
}
@-webkit-keyframes pulse {
  0% {
    opacity: 0.5;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(1.25);
    transform: scale(1.25);
  }
  100% {
    opacity: 0.5;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes pulse {
  0% {
    opacity: 0.5;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(1.25);
    transform: scale(1.25);
  }
  100% {
    opacity: 0.5;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  to {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
}
@keyframes spin {
  from {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  to {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
}
@-webkit-keyframes slide {
  from {
    -webkit-transform: translateX(0px);
    transform: translateX(0px);
  }
  to {
    -webkit-transform: translateX(18px);
    transform: translateX(18px);
  }
}
@keyframes slide {
  from {
    -webkit-transform: translateX(0px);
    transform: translateX(0px);
  }
  to {
    -webkit-transform: translateX(18px);
    transform: translateX(18px);
  }
}
@-webkit-keyframes fadeIn {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes fadeIn {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}
@-webkit-keyframes fadeOut {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 0;
  }
}
@keyframes fadeOut {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 0;
  }
}
@-webkit-keyframes pulseWave {
  25% {
    box-shadow: 0 0 0 0 rgba(26, 26, 26, 0.5);
  }
  100% {
    box-shadow: 0 0 0 10px rgba(26, 26, 26, 0);
  }
}
@keyframes pulseWave {
  25% {
    box-shadow: 0 0 0 0 rgba(26, 26, 26, 0.5);
  }
  100% {
    box-shadow: 0 0 0 10px rgba(26, 26, 26, 0);
  }
}
</style>
