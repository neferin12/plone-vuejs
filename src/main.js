import Vue from 'vue';
import App from '@/components/App';
import Router from 'vue-router';
import Traverser from '@/index';
import Folder from '@/components/Folder';
import PloneSite from '@/components/PloneSite';
import Document from '@/components/Document';
import NewsItem from '@/components/NewsItem';
import EventItem from '@/components/EventItem';
import Sharing from '@/components/Sharing';

Vue.config.productionTip = false;

Vue.use(Router);
Vue.use(Traverser);

const { API_ROOT, PLONE_ROOT } = process.env;

const router = new Router();

const traverser = {
  views: [
    {
      type: 'Folder',
      view: 'view',
      component: Folder,
    },
    {
      type: 'Plone Site',
      view: 'view',
      component: PloneSite,
    },
    {
      type: 'Document',
      view: 'view',
      component: Document,
    },
    {
      type: 'Document',
      view: 'sharing',
      component: Sharing,
    },
    {
      type: 'News Item',
      view: 'view',
      component: NewsItem,
    },
    {
      type: 'Event',
      view: 'view',
      component: EventItem,
    },
  ],
  options: {
    apiRoot: API_ROOT,
    ploneRoot: PLONE_ROOT,
  },
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  traverser,
  template: '<App/>',
  components: { App },
});
