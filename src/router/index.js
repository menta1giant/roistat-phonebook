import Vue from 'vue';
import Router from 'vue-router';
import PhoneBook from '@/components/PhoneBook';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PhoneBook',
      component: PhoneBook,
    },
  ],
});
