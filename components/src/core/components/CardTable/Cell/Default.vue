<!--
/*
 * This file is part of OrangeHRM Inc
 *
 * Copyright (C) 2020 onwards OrangeHRM Inc
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see  http://www.gnu.org/licenses
 */
-->

<template>
  <div v-if="showHeader" class="oxd-table-card-cell">
    <div class="header">
      {{ header.title }}
    </div>
    <div class="data">
      {{ item }}
    </div>
  </div>
  <template v-else>
    <div>{{ item }}</div>
  </template>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {DEVICE_LG, DEVICE_XL} from '../../../../composables/useResponsive';
import {cellMixin} from './cell-mixin';

export default defineComponent({
  name: 'oxd-table-cell-default',

  mixins: [cellMixin],

  props: {
    item: {
      required: true,
    },
  },

  computed: {
    showHeader(): boolean {
      return !(
        this.screenState.screenType === DEVICE_LG ||
        this.screenState.screenType === DEVICE_XL
      );
    },
  },
});
</script>

<style src="./default.scss" lang="scss" scoped></style>
