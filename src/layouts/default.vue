<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
        <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar';

export default {
  name: 'LayoutDefault',
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
