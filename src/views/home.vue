<script setup lang="ts">
import { VListItem, VListSubheader, VList } from 'vuetify/components/VList'
import { VNavigationDrawer } from 'vuetify/components/VNavigationDrawer'
import { VMain } from 'vuetify/components/VMain'
import { VContainer } from 'vuetify/components/VGrid'
import { useRoute } from 'vue-router'

import Map from '@/components/map.vue'
import { DirectionFilled, HomeFilled, SettingsFilled, DirectionCurveFilled } from '@/components/icons/filled'

const route = useRoute();

</script>

<template>
  <VNavigationDrawer expand-on-hover rail location="left">
    <VList>
      <VListItem to="/" exact title="Home">
        <template #prepend>
          <HomeFilled></HomeFilled>
        </template>
      </VListItem>
      <VListSubheader>
        Route
      </VListSubheader>
      <VListItem to="/turn_by_turn" title="Turn-by-Turn">
        <template #prepend>
          <DirectionFilled></DirectionFilled>
        </template>
      </VListItem>
      <VListSubheader>
        Map Matching
      </VListSubheader>
      <VListItem to="/trace_route" title="Trace Route">
        <template #prepend>
          <DirectionCurveFilled></DirectionCurveFilled>
        </template>
      </VListItem>
      <VListSubheader>
        Configurations
      </VListSubheader>
      <VListItem to="/settings" title="Settings">
        <template #prepend>
          <SettingsFilled></SettingsFilled>
        </template>
      </VListItem>
    </VList>
  </VNavigationDrawer>
  <VMain>
    <VContainer fluid height="100%">
      <Map></Map>
    </VContainer>
  </VMain>
  <VNavigationDrawer location="right" :model-value="route.path !== '/'" width="350">
    <router-view></router-view>
  </VNavigationDrawer>
</template>
