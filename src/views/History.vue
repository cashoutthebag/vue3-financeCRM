<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <Loader v-if="loading" />
    <p class="center" v-else-if="!records.length">
      Записей пока нет. <router-link to="/record">Добавить новую?</router-link>
    </p>
    <section v-else>
      <HistoryTable :records="items" />

      <Paginate
        v-model="page"
        :pageCount="pageCount"
        :clickHandler="pageChangeHandler"
        :prevText="'Назад'"
        :nextText="'Вперед'"
        :containerClass="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
  import HistoryTable from '@/components/HistoryTable';
  import Loader from '@/components/app/Loader.vue';

  import paginationMixin from '@/mixins/pagination.mixin.js';
  import Paginate from 'vuejs-paginate-next';

  export default {
    name: 'history',
    mixins: [paginationMixin],
    data: () => ({
      loading: true,
      records: [],
      page: 1,
    }),
    async mounted() {
      this.records = await this.$store.dispatch('fetchRecords');
      const categories = await this.$store.dispatch('fetchCategories');

      this.setup(categories);

      this.loading = false;
    },
    methods: {
      setup(categories) {
        this.setupPagination(
          this.records.map((record) => {
            return {
              ...record,
              categoryName: categories.find((cat) => cat.id === record.categoryId).title,
              typeClass: record.type === 'income' ? 'green' : 'red',
              typeText: record.type === 'income' ? 'Доход' : 'Расход',
            };
          }),
        );
      },
    },
    components: { HistoryTable, Loader, Paginate },
  };
</script>
