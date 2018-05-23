<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
*,
body,
html {
  font-style: medium;
  letter-spacing: -5%;
}
/* .q-message-received .q-message-text:last-child:before {
  left: -0px;
  border-left: 20px solid red;
  border-bottom-right-radius: 16px 14px;
}
.q-message-received .q-message-text:last-child:before,
.q-message-received .q-message-text:last-child:after {
  content: "";
  position: absolute;
  bottom: -2px;
  height: 20px;
  transform: translate(0, -2px);
}

.q-message-received .q-message-text:last-child:after {
  left: 23px;
  border-bottom-right-radius: 10px;
  background: green;
  width: 7px;
  transform: translate(-30px, -2px);
}

.q-message-received .q-message-text:last-child:before,
.q-message-received .q-message-text:last-child:after {
  content: "";
  position: absolute;
  bottom: -2px;
  height: 20px;
  transform: translate(0, -2px);
} */

.q-message-received .q-message-text:last-child:before {
  border: 12.5px solid transparent;
  border-top: 12.5px solid currentColor;
  border-bottom: 0;
  height: 0;
  width: 0;
  border-top-width: 25px;
  content: "";
  display: block;
  position: absolute;
  left: -0.5rem;
  top: -20px;
  -webkit-transform: rotate(270deg) skew(-25deg) translateY(16.6666666667px) !important;
  transform: rotate(270deg) skew(-25deg) translateY(16.6666666667px) !important;
}

@media screen and (min-width: 1235px) {
  .q-message-sent .q-message-text:last-child:before {
    border: 12.5px solid transparent;
    border-top: 12.5px solid currentColor;
    border-bottom: 0;
    height: 0;
    width: 0;
    border-top-width: 25px;
    content: "";
    display: block;
    position: absolute;
    bottom: -15px;
    left: 17.5rem;
    -webkit-transform: rotate(90deg) skew(-25deg) translateY(16.6666666667px);
    transform: rotate(90deg) skew(-25deg) translateY(16.6666666667px);
  }
}

.q-message-sent .q-message-text:last-child:before {
  border: 12.5px solid transparent;
  border-top: 12.5px solid currentColor;
  border-bottom: 0;
  height: 0;
  width: 0;
  border-top-width: 25px;
  content: "";
  display: block;
  position: absolute;
  bottom: -15px;
  -webkit-transform: rotate(90deg) skew(-25deg) translateY(16.6666666667px);
  transform: rotate(90deg) skew(-25deg) translateY(16.6666666667px);
}

.q-message-text:last-child:after {
  background: transparent;
}
</style>
