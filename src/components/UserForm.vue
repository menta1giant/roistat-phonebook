<template>
<form class="user-form" @submit.prevent="onSubmit">
    <h3>Добавление пользователя</h3>
    <div class="input-wrapper"><label for="name">Имя</label>
    <input id="name" v-model="name"></div>

    <div class="input-wrapper"><label for="phone-number">Телефон</label>
    <input id="phone-number" v-model="phoneNumber"> </div>

    <div class="input-wrapper"><label for="superior">Начальник</label>
    <select id="superior" v-model.number="superior">
    <option disabled value="">Выберите начальника, если есть</option>
    <option v-for="user in users"
    :key="user.id" :value="user.id">{{ user.name }}</option>
    </select></div>

    <input class="button" type="submit" value="Сохранить">

</form>
</template>

<script>
export default {
  name: 'UserForm',
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      name: '',
      phoneNumber: '',
      superior: '',
    };
  },
  methods: {
    onSubmit() {
      if (this.name === '' || this.phoneNumber === '') {
        return;
      }
      const userContacts = {
        name: this.name,
        phoneNumber: this.phoneNumber,
        superior: this.superior,

      };
      this.$emit('form-submitted', userContacts);
      this.name = '';
      this.phoneNumber = '';
      this.superior = '';
    },
  },
};
</script>

<style scoped>

.user-form {
    display: flex;
    flex-basis: 400px;
    flex-direction: column;
}

.input-wrapper {
    display: flex;
    margin: 5px 0;
}

.input-wrapper label {
    flex: 2;
}

.input-wrapper :not(label){
    flex:3
}

.user-form .button {
    margin-top: 1em;
    display: block;
}
</style>
