<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input id="email" type="text" v-model.trim="email" :class="{ invalid: v$.email.$error }" />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-for="(error, index) of v$.email.$errors"
          :key="index"
          >{{ printError(error.$validator, error.$params) }}</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          autocomplete="on"
          :class="{ invalid: v$.password.$error }"
          v-model.trim="password"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-for="(error, index) of v$.password.$errors"
          :key="index"
          >{{ printError(error.$validator, error.$params) }}</small
        >
      </div>
      <div class="input-field">
        <input id="name" type="text" :class="{ invalid: v$.name.$error }" v-model="name" />
        <label for="name">Имя</label>
        <small class="helper-text invalid" v-for="(error, index) of v$.name.$errors" :key="index">{{
          printError(error.$validator, error.$params)
        }}</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import useVuelidate from '@vuelidate/core';
  import { required, email, minLength, alpha } from '@vuelidate/validators';

  export default {
    name: 'register',
    setup: () => ({ v$: useVuelidate() }),
    data() {
      return { email: '', password: '', name: '', agree: false };
    },
    validations() {
      return {
        email: { required, email, $autoDirty: true },
        password: { required, minLength: minLength(6), $autoDirty: true },
        name: { required, alpha, $autoDirty: true },
        agree: { checked: (v) => v },
      };
    },
    methods: {
      async submitHandler() {
        if (this.v$.$invalid) {
          this.v$.$touch();
          return;
        }

        const registerFormData = {
          email: this.email,
          password: this.password,
          name: this.name,
        };

        try {
          await this.$store.dispatch('register', registerFormData);
          this.$router.push('/');
        } catch (error) {}
      },
      printError($name) {
        switch ($name) {
          case 'required':
            return 'Поле не должно быть пустым';
          case 'email':
            return `Введен некорректный e-mail`;
          case 'alpha':
            return `Введите корректное имя латиницей`;
          case 'minLength':
            return `Минимальная длина символов должна быть ${this.v$.password.minLength.$params.min} символов`;
          default:
            break;
        }
      },
    },
  };
</script>
