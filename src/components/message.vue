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
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.12),
    0px 0px 2px rgba(0, 0, 0, 0.14);
  max-width: 70vw;
  @media screen and (min-width: 586px) {
    width: 25vw;
  }
}

.sent {
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.12),
    0px 0px 2px rgba(0, 0, 0, 0.14);
  background: #fafafa;
  position: relative;
  max-width: 70vw;
  left: 100px;
  // margin-left: 500px;
  @media screen and (min-width: 586px) {
    width: 25vw;
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
