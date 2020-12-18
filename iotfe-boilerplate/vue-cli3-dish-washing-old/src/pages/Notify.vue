<template>
  <div>
    <NotifyHeader />
    <NewError />
  </div>
</template>

<script>
import NotifyHeader from './NotifyHeader';
import NewError from './NewError';

export default {
  name: 'Notify',
  components: {
    NotifyHeader,
    NewError,
  },
};
</script>
