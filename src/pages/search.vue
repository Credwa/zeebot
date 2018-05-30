<template>
<div>
  <navbar title="Search"></navbar>
  <q-page class="items-center column justify-start search-page">
    <div class="pre-box">
      <div class="dimensions-box">
      </div>
    </div>
    <transition appear enter-active-class="animated fadeIn">
      <q-scroll-area ref="chatArea" :thumb-style="{right: '4px',borderRadius: '5px',background:'none',width: '0px',opacity: 1}" style="" class="messaging items-center column justify-start" :delay="1500">
        <div v-if="!searching && !result && !listening" class="zeebot flex column items-center">
          <div  class="zeebot-init">
            <img  alt="ZeeBot" src="~assets/zeebot-init.svg">
            <div class="assist first-load">Hello! How Can I help you?</div>
          </div>
        </div>
        <div v-if="listening && !result" class="zeebot flex column items-center">
          <div  class="zeebot-listen">
            <img  alt="ZeeBot" src="~assets/zeebot-listening.svg">
            <div class="assist flex column ">Listening
              <div class="loader"><span class="loader__dot pulse pulse__one"></span><span class="loader__dot pulse pulse__two"></span><span class="loader__dot pulse pulse__three"></span></div>
            </div>
          </div>
        </div>
        <div v-if="searching && !result && !listening" class="zeebot flex column items-center ">
          <div  class="zeebot-search">
            <img  alt="ZeeBot" src="~assets/zeebot-searching.svg">
            <div class="assist flex column " style="margin-left: 150px;">Searching
              <div class="loader"><span class="loader__dot pulse pulse__one"></span><span class="loader__dot pulse pulse__two"></span><span class="loader__dot pulse pulse__three"></span></div>
            </div>
          </div>
        </div>
        <div style="width: 100%; padding: 0px;" class="allMessages">
          <message v-show="result" v-for="(message, index) in messages" :key="message.stamp+message.text+index" :myMessage="message"></message>
        </div>

      </q-scroll-area>
    </transition>
  <div class="search-footer items-center column justify-start">
    <q-btn aria-label="Show all Skills" v-if="!result" flat style="color: #38A4DD; text-decoration: underline"><span>See all skills</span></q-btn>
    <q-input aria-label="Say or type your search..." ref="message" @click="scrollIntoView" @keyup.enter.native="sendMessage" v-model="userMessage" color="blue 4" class="send-message shadow-1" :after="userMessage.length > 0 ? [{icon: 'send', content: true, handler:() => { this.sendMessage() }}] :  [{icon: 'mic', content: false, handler:() => { this.createVoiceMessage() }}] " :placeholder="userMessagePlaceholder"/>
  </div>

  </q-page>
</div>
</template>

<script>
import moment from 'moment';
import _ from 'lodash';
import localforage from 'localforage';

import navbar from '../components/navbar.vue';
import message from '../components/message.vue';

export default {
  name: 'PageSearch',
  components: { navbar, message },
  data() {
    return {
      result: false,
      listening: false,
      userMessagePlaceholder: 'Say or type your search...',
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
    makeRequestForBotReply(dataToSend, vm) {
      vm.$axios
        .post(`${vm.$API_URL}/response`, dataToSend)
        .then((response) => {
          if (response.data.messagetype) {
            if (response.data.message.lines || response.data.message.links) {
              vm.finishSearchingMulti(response.data.message);
            } else {
              vm.finishSearching(response.data.message.text);
            }
          } else if (
            response.data.message.lines ||
            response.data.message.links
          ) {
            vm.finishSearchingMulti(response.data.message);
          } else {
            vm.finishSearching(response.data.message.text);
          }
        })
        .catch((e) => {
          console.log(e);
          if (navigator.onLine) {
            vm.finishSearching('Oops something went wrong.');
          } else {
            vm.finishSearching(`You are offline...
            will respond when you are back online :).`);
          }
        });
    },
    saveRequestDataLocally(dataToSave) {
      return localStorage.setItem('dataToSync', dataToSave);
    },
    finishSearching(reply) {
      const { chatArea } = this.$refs;
      this.searching = false;
      this.result = true;
      // receieved message bot info setup
      const newMessageReply = {
        text: [`${reply}`],
        stamp: moment(),
        sent: false,
      };
      this.messages.push(newMessageReply);
      this.userMessagePlaceholder = 'Say or type your search...';
      // Keep scrolling as messages come in
      chatArea.setScrollPosition(this.$refs.chatArea.$el.clientHeight, 1000);
      // chatArea.$el.setScrollPosition(this.$refs.chatArea.scrollHeight, 1);
    },

    finishSearchingMulti(reply) {
      const vm = this;
      const { chatArea } = this.$refs;
      this.searching = false;
      this.result = true;
      const newMessageReply = {
        text: reply.lines ? reply.lines : null,
        stamp: moment(),
        sent: false,
        type: 'multi',
        links: reply.links ? reply.links : null,
      };
      this.messages.push(newMessageReply);
      this.userMessagePlaceholder = 'Say or type your search...';
      // Keep scrolling as messages come in
      chatArea.setScrollPosition(this.$refs.chatArea.$el.clientHeight, 1000);
      // chatArea.$el.setScrollPosition(this.$refs.chatArea.scrollHeight, 1);
    },
    botReply: _.debounce((dataToSend, vm) => {
      /*
      * Service worker background sync reply
      * back online
      */
      // if ('serviceWorker' in navigator && 'SyncManager' in window) {
      //   navigator.serviceWorker.ready.then((registration) => {
      //     vm.saveRequestDataLocally(dataToSend);
      //     vm.makeRequestForBotReply(dataToSend, vm);
      //     registration.sync
      //       .register('sync-new-message')
      //       .then(() => {})
      //       .catch((e) => {
      //         console.log(e);
      //       });
      //   });
      // } else {
      //   console.log(1);
      //   vm.makeRequestForBotReply(dataToSend, vm);
      // }
      vm.saveRequestDataLocally(dataToSend);
      vm.makeRequestForBotReply(dataToSend, vm);
    }, 500),
    sendMessage() {
      if (this.userMessage.length > 0) {
        // sent message bot info setup
        const newMessage = {
          text: [this.userMessage],
          stamp: moment(),
          sent: true,
        };

        this.searching = true;
        this.userMessagePlaceholder = 'Searching...';
        const data = {
          message: this.userMessage,
          context: '',
        };
        this.userMessage = '';
        this.messages.push(newMessage);
        // get bot reply from backend
        this.botReply(data, this);
      }
    },
    createVoiceMessage() {
      let recognizing = false;
      const recognition = new webkitSpeechRecognition();
      const reset = () => {
        recognizing = false;
      };

      reset();
      this.listening = true;
      this.userMessagePlaceholder = 'Listening...';
      recognition.continuous = true;
      recognition.onend = reset();
      recognition.start();
      const vm = this;
      recognition.onresult = function (event) {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            vm.userMessage = event.results[i][0].transcript;
          }
        }
        vm.listening = false;
        vm.sendMessage();
        this.userMessagePlaceholder = 'Say or type your search...';
      };
    },
  },
  created() {
    console.log(navigator);
    navigator.serviceWorker.addEventListener('message', (event) => {
      console.log('Client has recieved the data yayy', event.data);
    });
  },
};
</script>

<style scoped lang="scss">
.zeebot-init {
  text-align: center;
  margin-left: 15px;
  margin-top: 3vh;
  @media screen and (min-width: 575px) {
    margin-left: -25px;
  }
  @media screen and (min-width: 767px) {
    margin-left: -150px;
  }
  @media screen and (min-width: 991px) {
    margin-left: -10px;
  }
  @media screen and (min-width: 1199px) {
    margin-left: -10px;
  }
}

.zeebot-listen {
  text-align: center;
  margin-left: 75px;
  margin-top: 3vh;
  @media screen and (min-width: 575px) {
    margin-left: 40px;
  }
  @media screen and (min-width: 767px) {
    margin-left: -80px;
  }
  @media screen and (min-width: 991px) {
    margin-left: 60px;
  }
  @media screen and (min-width: 1199px) {
    margin-left: 60px;
  }
}

.zeebot-search {
  text-align: center;
  margin-top: 3vh;
  margin-left: -55px;
  @media screen and (min-width: 575px) {
    margin-left: -90px;
  }
  @media screen and (min-width: 767px) {
    margin-left: -220px;
  }
  @media screen and (min-width: 991px) {
    margin-left: -70px;
  }
  @media screen and (min-width: 1199px) {
    margin-left: -70px;
  }
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
    background: url("/statics/dimension-box.png");
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
  overflow-y: scroll;
  -ms-overflow-style: none; // IE 10+
  overflow: -moz-scrollbars-none; // Firefox
  padding-right: 15px;
  width: 100vw;
  height: 60vh;
  margin-top: 0vh;
  @media screen and (min-width: 575px) {
    width: 90vw;
    left: 20px;
  }
  @media screen and (min-width: 767px) {
    width: 80vw !important;
    left: 80px;
  }
  @media screen and (min-width: 991px) {
    width: 60vw !important;
    left: 10px;
  }
  @media screen and (min-width: 1199px) {
    width: 800px !important;
  }
  &::-webkit-scrollbar {
    width: 0px; /* remove scrollbar space */
    background: transparent; /* optional: just make scrollbar invisible */
  }
  /* optional: show position indicator in red */
  &::-webkit-scrollbar-thumb {
    background: none;
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
  height: 35px;
  margin-top: 5vh;
  border-radius: 2px;
  padding: 0vw 2vw 0vw 2vw;
  background-color: rgba(38, 50, 56, 0.03);
  @media screen and (min-width: 586px) {
    width: 500px;
  }
}

.q-if-inner {
  color: red;
  margin-top: 40px;
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

.first-load {
  animation: types 4s steps(60, end);
  width: 30em;
  overflow-wrap: wrap;
  overflow: hidden;
  white-space: nowrap;
}

@keyframes types {
  from {
    width: 0;
  }
}

@keyframes types2 {
  0% {
    width: 0;
  }
  50% {
    width: 0;
  }
  100% {
    width: 100;
  }
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
