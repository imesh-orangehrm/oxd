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
  <div role="listbox" class="oxd-autocomplete-dropdown">
    <oxd-autocomplete-option v-if="loading">
      Searching...
    </oxd-autocomplete-option>
    <oxd-autocomplete-option v-else-if="empty">
      No results found
    </oxd-autocomplete-option>
    <slot v-else></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AutocompleteOption from '@ohrm/oxd/core/components/Input/Autocomplete/AutocompleteOption.vue';

export default defineComponent({
  name: 'oxd-autocomplete-dropdown',

  components: {
    'oxd-autocomplete-option': AutocompleteOption,
  },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    empty: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style src="./autocomplete-input.scss" lang="scss" scoped></style>
