<template>
  <transition appear enter-active-class="slideInUp">
    <q-chat-message
          :text="myMessage.text"
          :stamp="moment(myMessage.stamp).format('MM/DD hh:mm A')"
          :sent="myMessage.sent"
          :class="myMessage.sent ? 'self-end ' + 'sent message' : 'self-start ' + 'received message'"
          :bg-color="myMessage.sent ? 'primary' : 'grey-2'"
          size=12
          :text-color="myMessage.sent ? 'white' : 'black'"
    />
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
.received {
  background: #fafafa;
  // margin-left: 10px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.12),
    0px 0px 2px rgba(0, 0, 0, 0.14);
  width: 60vw !important;
  margin-left: 30px !important;
  @media screen and (min-width: 586px) {
    width: 25vw !important;
  }
  @media screen and (min-width: 999px) {
    width: 20vw !important;
  }
  @media screen and (min-width: 1500px) {
    width: 15vw !important;
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
  @media screen and (min-width: 586px) {
    width: 25vw !important;
  }
  @media screen and (min-width: 999px) {
    width: 20vw !important;
  }
  @media screen and (min-width: 1500px) {
    width: 15vw !important;
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
