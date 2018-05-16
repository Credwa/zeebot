<template>
<div>
  <navbar title="Search"></navbar>
  <q-page class="items-center column justify-start">
    <div class="pre-box">
      <div class="dimensions-box">
      </div>
    </div>

    <q-scroll-area style="" class="messaging items-center column justify-start">
      <div v-if="!searching && !result" class="zeebot flex column items-center">
        <img  alt="ZeeBot" src="~assets/zeebot-init.svg">
        <div class="assist">Hello! How Can I help you?</div>
      </div>
      <div v-if="searching && !result" class="zeebot flex column items-center">
        <img  alt="ZeeBot" src="~assets/zeebot-searching.svg">
        <div class="assist">Searching...</div>
      </div>
      <div>
        <message v-for="message in messages" :key="message.stamp+message.text" :myMessage="message"></message>
      </div>

    </q-scroll-area>
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
      userMessage: '',
      searching: false,
      messages: [
      ],
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
            text: [`Here are search results for '${this.messages[this.messages.length - 1].text}': `],
            stamp: moment(),
            sent: false,
          };
          this.messages.push(newMessageReply);
        }, 4000);
      }
    },
    createVoiceMessage() {
      console.log(navigator);
    },
  },
};
</script>

<style scoped lang="scss">
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
</style>
