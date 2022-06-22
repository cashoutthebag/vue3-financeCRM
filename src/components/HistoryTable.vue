<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, i) in records" :key="record.id">
        <td>{{ i + 1 }}</td>
        <td>{{ record.amount }} RUB</td>
        <td>{{ new Date(record.date).toLocaleDateString() }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.typeClass]">{{ record.typeText }}</span>
        </td>
        <td>
          <button class="btn-small btn" @click.prevent="$router.push('/detail/' + record.id)">
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    props: {
      records: {
        required: true,
        type: Array,
      },
    },
  };
</script>
