<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('humburgerClick')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date.toLocaleString() }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a ref="dropdown" class="dropdown-trigger black-text" href="#" data-target="dropdown">
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content mt-10">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a to="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    mounted() {
      this.inteval = setInterval(() => {
        this.date = new Date();
      }, 1000);
      this.dropdown = M.Dropdown.init(this.$refs.dropdown, {});
    },

    data: () => ({
      date: new Date(),
      inteval: null,
      dropdown: null,
    }),

    computed: {
      name() {
        return this.$store.getters.info.name;
      },
    },
    methods: {
      async logout() {
        await this.$store.dispatch('logout');
        this.$router.push('/login?message=logout');
      },
    },

    unmounted() {
      clearInterval(this.inteval);
      if (this.dropdown && this.dropdown.destroy) {
        this.dropdown.destroy();
      }
    },
  };
</script>
