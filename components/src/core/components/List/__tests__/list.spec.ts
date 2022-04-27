import {shallowMount} from '@vue/test-utils';
import List from '@orangehrm/oxd/core/components/List/List.vue';
import minimalListConfig from './list-minimal.json';

describe('List > List.vue', () => {
  it('correctly computes initial sort order', () => {
    const wrapper = shallowMount(List, {
      props: {
        configurations: minimalListConfig,
      },
    });
    expect(wrapper.vm.order).toStrictEqual({
      "candidate": {
        "iconAsc": "",
        "iconDesc": "",
        "order": "DEFAULT",
      },
      "contactNumber": {
        "iconAsc": "",
        "iconDesc": "",
        "order": "DEFAULT",
      },
      "dateOfApplication": {
        "iconAsc": "",
        "iconDesc": "",
        "order": "DESC",
      },
      "email": {
        "iconAsc": "",
        "iconDesc": "",
        "order": "DEFAULT",
      },
    });
  });

  it('changes sort order when sort changes', () => {
    const wrapper = shallowMount(List, {
      props: {
        configurations: minimalListConfig,
      },
    });
    wrapper.vm.tableSort({
      candidate: 'ASC',
      email: 'DEFAULT',
      contactNumber: 'DEFAULT',
      dateOfApplication: 'DEFAULT',
    });

    // assert event has been emitted
    expect(wrapper.emitted()['update:order']).toBeTruthy();
    expect(wrapper.emitted()['update:order'].length).toBe(1);
    expect(wrapper.emitted()['update:order'][0]).toStrictEqual([
      {
        candidate: 'ASC',
        email: 'DEFAULT',
        contactNumber: 'DEFAULT',
        dateOfApplication: 'DEFAULT',
      },
    ]);

    // assert sort order has been updated
    expect(wrapper.vm.order).toStrictEqual({
      "candidate": {
        "iconAsc": "",
        "iconDesc": "",
        "order": "ASC",
      },
      "contactNumber": {
        "iconAsc": "",
        "iconDesc": "",
        "order": "DEFAULT",
      },
      "dateOfApplication": {
        "iconAsc": "",
        "iconDesc": "",
        "order": "DEFAULT",
      },
      "email": {
        "iconAsc": "",
        "iconDesc": "",
        "order": "DEFAULT",
      },
    });
  });
});
