<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{
            invalid: v$.name.$error,
          }"
        />
        <label for="description">Имя</label>
        <span class="helper-text invalid" v-if="v$.name.$error">Введите имя</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  import useVuelidate from '@vuelidate/core';
  import { required } from '@vuelidate/validators';

  export default {
    data: () => ({
      name: '',
    }),
    setup: () => ({ v$: useVuelidate() }),
    validations() {
      return {
        name: {
          required,
          $autoDirty: true,
        },
      };
    },
    mounted() {
      this.name = this.info.name;
      setTimeout(() => {
        M.updateTextFields();
      }, 0);
    },
    computed: {
      ...mapGetters(['info']),
    },
    methods: {
      ...mapActions(['updateInfo']),
      async submitHandler() {
        this.v$.$touch();
        if (this.v$.$error) return;

        try {
          await this.updateInfo({
            name: this.name,
          });
        } catch (error) {}
      },
    },
  };
</script>
