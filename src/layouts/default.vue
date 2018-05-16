<template>
  <q-layout view="lHh Lpr lFf">
    <navbar title="Search"></navbar>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar';
import navbar from '../components/navbar.vue';

export default {
  name: 'LayoutDefault',
  components: { navbar },
  data() {
    return {};
  },
  methods: {
    openURL,
  },
};
</script>

<style>
</style>
