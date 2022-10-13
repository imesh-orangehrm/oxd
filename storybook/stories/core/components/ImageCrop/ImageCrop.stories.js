import ImageCrop from '@orangehrm/oxd/core/components/ImageCrop/ImageCrop';

export default {
  title: 'Information/ImageCrop',
  component: ImageCrop,
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-image-crop': ImageCrop},
  template: '<oxd-image-crop v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  image:
    'https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=991&q=80',
};

export const CustomStencil = Template.bind({});
CustomStencil.args = {
  stencilHeight: '500',
  stencilWidth: '500',
  image:
    'https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=991&q=80',
};

export const DefaultPositionedStencil = Template.bind({});
DefaultPositionedStencil.args = {
  defaultPositionLeft: '0',
  defaultPositionRight: '400',
  image:
    'https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=991&q=80',
};
