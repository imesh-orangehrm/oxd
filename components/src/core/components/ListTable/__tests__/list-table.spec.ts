import {mount} from '@vue/test-utils';
import Skeleton from '@orangehrm/oxd/core/components/Skeleton/Skeleton.vue';
import ListTable from '@orangehrm/oxd/core/components/ListTable/ListTable.vue';

const DUMMY_DATA = {
  headers: [
    {name: 'col1', title: 'Column 1', style: {flex: 1}},
    {name: 'col2', title: 'Column 2', style: {flex: 5}},
  ],
  items: [
    {col1: 'Data 1', col2: 'Data 2'},
    {col1: 'Data 2', col2: 'Data 2'},
  ],
  checkedItems: [2, 0],
};

jest.mock('../../../../utils/emitter');

describe('ListTable > ListTable.vue', () => {
  it('renders OXD ListTable > ListTable', () => {
    const wrapper = mount(ListTable, {
      props: {
        selectable: true,
        items: DUMMY_DATA.items,
        headers: DUMMY_DATA.headers,
        selected: DUMMY_DATA.checkedItems,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render OXD ListTable without selectable', () => {
    const wrapper = mount(ListTable, {
      props: {
        selectable: true,
        items: DUMMY_DATA.items,
        headers: DUMMY_DATA.headers,
        selected: DUMMY_DATA.checkedItems,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render empty state when there is no data', () => {
    const wrapper = mount(ListTable, {
      props: {
        items: [],
        headers: DUMMY_DATA.headers,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should clear all listeners on unmount', () => {
    jest.clearAllMocks();
    const wrapper = mount(ListTable, {
      props: {
        items: DUMMY_DATA.items,
        headers: DUMMY_DATA.headers,
      },
    });
    wrapper.unmount();
  });

  it('should render skeleton if skeleton is true && loading', () => {
    const wrapper = mount(ListTable, {
      props: {
        items: [],
        loading: true,
        skeleton: true,
        headers: DUMMY_DATA.headers,
      },
    });
    expect(wrapper.findAllComponents(Skeleton).length).toEqual(48); // 15 skeletons per column and one for each header with select column
  });

  it('should render skeleton if partial render is true && not loading', () => {
    const wrapper = mount(ListTable, {
      props: {
        loading: false,
        skeleton: true,
        partialLoading: true,
        headers: DUMMY_DATA.headers,
        items: Array(10).fill({col1: 'Data 1', col2: 'Data 2'}),
      },
    });
    expect(wrapper.findAll('.oxd-table-body .oxd-table-row').length).toEqual(
      13,
    );
    expect(wrapper.findAllComponents(Skeleton).length).toEqual(6);
  });

  it('should render checkbox cell when selectable is true and not loading', () => {
    const wrapper = mount(ListTable, {
      props: {
        loading: false,
        skeleton: false,
        selectable: true,
        items: DUMMY_DATA.items,
        headers: DUMMY_DATA.headers,
      },
    });

    const checkboxCells = wrapper.findAll('.checkbox-cell');
    expect(checkboxCells.length).toBeGreaterThan(0);

    checkboxCells.forEach(cell => {
      expect(cell.exists()).toBe(true);
      expect(cell.findComponent({name: 'oxd-checkbox-input'}).exists()).toBe(
        true,
      );
    });
  });

  it('should not render checkbox cell when selectable is false', () => {
    const wrapper = mount(ListTable, {
      props: {
        selectable: false,
        items: DUMMY_DATA.items,
        headers: DUMMY_DATA.headers,
      },
    });

    const checkboxCells = wrapper.findAll('.checkbox-cell');
    expect(checkboxCells.length).toBe(0);
  });

  it('when the select is disabled for all the items, check box in the header should be disabled', () => {
    const DUMMY_DATA_SELECT_DISABLED = {
      headers: [
        {name: 'col1', title: 'Column 1', style: {flex: 1}},
        {name: 'col2', title: 'Column 2', style: {flex: 5}},
      ],
      items: [
        {col1: 'Data 1', col2: 'Data 2', isSelectDisabled: true},
        {col1: 'Data 2', col2: 'Data 2', isSelectDisabled: true},
      ],
      checkedItems: [],
    };
    const wrapper = mount(ListTable, {
      props: {
        selectable: true,
        items: DUMMY_DATA_SELECT_DISABLED.items,
        headers: DUMMY_DATA_SELECT_DISABLED.headers,
        selected: DUMMY_DATA_SELECT_DISABLED.checkedItems,
      },
    });
    const tableHeader = wrapper.find('.oxd-table-header');
    const checkbox = tableHeader.find('input[type="checkbox"]');

    expect(checkbox.attributes('disabled')).toEqual('');
  });
});
