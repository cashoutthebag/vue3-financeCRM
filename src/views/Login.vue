<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid: v$.email.$error,
          }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-for="(error, index) of v$.email.$errors"
          :key="index"
          >{{ printError(error.$validator) }}</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          autocomplete="on"
          v-model="password"
          :class="{
            invalid: v$.password.$error,
          }"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-for="(error, index) of v$.password.$errors"
          :key="index"
          >{{ printError(error.$validator) }}</small
        >
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import useVuelidate from '@vuelidate/core';
  import { required, email, minLength } from '@vuelidate/validators';

  import messages from '@/utils/messages';

  export default {
    name: 'login',
    setup: () => ({ v$: useVuelidate() }),
    data() {
      return { email: '', password: '' };
    },
    validations() {
      return {
        email: { required, email, $autoDirty: true },
        password: { required, minLength: minLength(6), $autoDirty: true },
      };
    },
    mounted() {
      if (messages[this.$route.query.message]) {
        this.$message(messages[this.$route.query.message]);
      }
    },
    methods: {
      async submitHandler() {
        this.v$.$touch();
        if (this.v$.$error) return;

        const loginFormData = {
          email: this.email,
          password: this.password,
        };

        try {
          await this.$store.dispatch('login', loginFormData);
          this.$router.push('/');
        } catch (error) {}
      },

      printError($name) {
        switch ($name) {
          case 'required':
            return 'Поле не должно быть пустым';
          case 'email':
            return `Введен некорректный e-mail`;
          case 'minLength':
            return `Минимальная длина символов должна быть ${this.v$.password.minLength.$params.min} символов`;
          default:
            break;
        }
      },
    },
  };
</script>
