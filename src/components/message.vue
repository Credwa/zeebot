<template>
  <transition appear enter-active-class="animated slideInUp">
    <q-chat-message
          :text="myMessage.text"
          :stamp="moment(myMessage.stamp).format('MM/DD hh:mm A')"
          :sent="myMessage.sent"
          :class="myMessage.sent ? 'self-end ' + 'sent message' : 'self-start ' + 'received message'"
          :bg-color="myMessage.sent ? 'blue-5' : 'grey-4'"
          size=10
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
.message {
  margin-left: 15px;
  margin-right: 5px;
  .sent {
  }

  .received {
  }
}
</style>
