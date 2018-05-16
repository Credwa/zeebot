<template>
  <q-layout-header>
    <q-toolbar
        class="navbar"
        color=""
    >
        <q-toolbar-title class="absolute-center nav-title">
          {{title}}
        </q-toolbar-title>
        <q-toolbar-title></q-toolbar-title>
        <q-btn flat round dense icon="close" />
    </q-toolbar>
  </q-layout-header>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ['title'],
  data() {
    return {};
  },
};
</script>

<style style="scss">
.nav-title {
  /* Search */

  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  line-height: 48px;
  font-size: 16px;

  color: #ffffff;
}
.navbar {
  background: #1c92d2; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #90caf9,
    #1976d2
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #90caf9,
    #1976d2
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
