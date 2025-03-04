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

<script lang="ts">
import {
  isEqual,
  getDaysInMonth,
  getYear,
  getMonth,
  getDayOffset,
  freshDate,
  rearrangeWeek,
} from '../../../utils/date';
import {enGB} from 'date-fns/locale';
import {CalendarDayAttributes, CalendarEvent} from './types';
import {
  computed,
  defineComponent,
  h,
  PropType,
  reactive,
  toRefs,
  watch,
} from 'vue';
import Day from '@ohrm/oxd/core/components/Calendar/Day.vue';
import DateVue from '@ohrm/oxd/core/components/Calendar/Date.vue';
import CalendarController from '@ohrm/oxd/core/components/Calendar/CalendarController.vue';

export default defineComponent({
  name: 'oxd-calendar',
  props: {
    modelValue: {
      type: Object as PropType<Date>,
      default: () => {
        return freshDate();
      },
    },
    firstDayOfWeek: {
      type: Number,
      default: 0, // 0 | 1 | 2 | 3 | 4 | 5 | 6 => 0 represents Sunday
    },
    years: {
      type: Array,
      default: () => {
        return Array.from(
          {length: getYear(new Date()) - 1969},
          (_, i) => 1970 + i,
        );
      },
    },
    locale: {
      type: Object as PropType<Locale>,
      default: enGB,
    },
    monthFormat: {
      type: String,
      default: 'wide',
    },
    months: {
      type: Array,
      default: () => [],
    },
    dayFormat: {
      type: String,
      default: 'narrow',
    },
    days: {
      type: Array,
      default: () => [],
    },
    dayAttributes: {
      type: Array as PropType<CalendarDayAttributes[]>,
      default: () => [],
    },
    events: {
      type: Array as PropType<CalendarEvent[]>,
      default: () => [],
    },
  },
  setup(props, context) {
    const selectedDate = computed(() => {
      return props.modelValue
        ? new Date(props.modelValue.setHours(0, 0, 0, 0))
        : props.modelValue;
    });

    const state = reactive({
      year: getYear(selectedDate.value || new Date()),
      month: getMonth(selectedDate.value || new Date()),
    });

    const daysOfWeek = computed(() => {
      let days = JSON.parse(JSON.stringify(props.days));
      const week = rearrangeWeek(props.firstDayOfWeek);

      if (days.length === 0) {
        days = new Array(7).fill('').map((...[, index]) => {
          return (props.locale as Locale).localize.day(index, {
            width: props.dayFormat,
          });
        });
      }

      return week.map(index => {
        return days[index];
      });
    });

    const monthsOfYear = computed(() => {
      if (props.months.length > 0) {
        return props.months;
      } else {
        return new Array(12).fill('').map((...[, index]) => {
          return (props.locale as Locale).localize.month(index, {
            width: props.monthFormat,
          });
        });
      }
    });

    const datesOfMonth = computed(() => {
      return new Array(getDaysInMonth(new Date(state.year, state.month)))
        .fill('')
        .map((...[, index]) => {
          return new Date(state.year, state.month, ++index);
        });
    });

    const attributes = computed(() => {
      return datesOfMonth.value.map(date => {
        const attrs = props.dayAttributes.find(
          attr => date.getDay() === attr.index,
        );
        return attrs;
      });
    });

    const parsedEvents = computed(() => {
      return datesOfMonth.value.map(date => {
        const event = props.events.find(e => isEqual(date, e.date));
        return event;
      });
    });

    watch(
      () => state.year,
      () => {
        context.emit('selectYear', {month: state.month, year: state.year});
      },
    );

    watch(
      () => state.month,
      () => {
        context.emit('selectMonth', {month: state.month, year: state.year});
      },
    );

    return {
      ...toRefs(state),
      daysOfWeek,
      datesOfMonth,
      monthsOfYear,
      selectedDate,
      attributes,
      parsedEvents,
    };
  },

  emits: ['update:modelValue', 'selectMonth', 'selectYear'],

  render() {
    /**
     * Vue scoped styles not working for render function
     * https://github.com/vuejs/vue-next/issues/1539
     *
     */
    return h(
      'div',
      {class: 'oxd-calendar-wrapper'},
      [
        h(CalendarController, {
          modelValue: {year: this.year, month: this.month},
          years: this.years,
          months: this.monthsOfYear,
          'onUpdate:modelValue': ({month, year}) => {
            (this.month = month), (this.year = year);
          },
        }),
        h(
          'div',
          {class: 'oxd-calendar-week-grid'},
          this.daysOfWeek.map((day: string) => {
            return h(Day, {name: day, key: day});
          }),
        ),
        h(
          'div',
          {class: 'oxd-calendar-dates-grid'},
          this.datesOfMonth.map((date: Date, i: number) => {
            return h(DateVue, {
              key: date.valueOf(),
              date,
              selected: isEqual(date, this.selectedDate),
              today: isEqual(freshDate(), date),
              offset: i === 0 ? getDayOffset(date, this.firstDayOfWeek) : 0,
              attributes: this.attributes[i],
              event: this.parsedEvents[i],
              onClick: ($event: Event) => {
                $event.stopPropagation();
                this.$emit('update:modelValue', date);
              },
            });
          }),
        ),
      ].concat(
        this.$slots.default != undefined
          ? [h('div', this.$slots.default())]
          : [],
      ),
    );
  },
});
</script>

<style src="./calendar.scss" lang="scss"></style>
