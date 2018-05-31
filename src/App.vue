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

.self-start {
  transform: translateX(-1em) scale(0);
  transform-origin: top left;
  animation: load-bubble 1s;
  animation-fill-mode: forwards;
}

.self-start .q-message-text-content {
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

.q-message-text-content {
  padding: 8px !important;
}

@keyframes load-text {
  10% {
    max-height: 0;
    max-width: 0;
  }
  50% {
    opacity: 0;
    max-height: 0;
    max-width: 600px;
  }
  90% {
    max-height: 500px;
    max-width: 600px;
  }
  100% {
    opacity: 1;
    max-height: 500px;
    max-width: 600px;
  }
}

@keyframes load-bubble {
  100% {
    transform: translateX(0) scale(1);
    max-height: 500px;
  }
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
    -webkit-transform: rotate(90deg) skew(-25deg) translateY(16.6666666667px);
    transform: rotate(90deg) skew(-25deg) translateY(16.6666666667px);
  }
}

.q-item-label {
  text-decoration: none !important;
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

input.col.q-input-target.q-no-input-spinner {
  margin-top: -10px;
}

i.q-icon.q-if-control.material-icons {
  line-height: 32px;
}

.q-message-stamp {
  margin-top: 0px !important;
  margin-bottom: 0px !important;
  padding-top: 5px !important;
}

.q-message-text-content {
  padding: 0px !important;
}

.q-message-text {
  padding: 16px;
}
</style>
