<template>
  <div class="table-display">
      <button 
          class="button" 
          v-on:click="requestForm">
          Добавить
      </button>
      <div class="table-head">
          <div @click="sortUsers('name')">Имя</div>
          <div @click="sortUsers('phoneNumber')">Телефон</div>
      </div>
      <div class="table-body">
          <UserTableRow 
          v-for="user in topUsers"
          :users="users"
          :index="user.id"
          :name="user.name"
          :phone-number="user.phoneNumber"
          :depth="0"  
          :key="user.id"/>
      </div>
  </div>
</template>

<script>
import UserTableRow from '@/components/UserTableRow'

export default {
  name: 'TableDisplay',
  props: [ 'users' ],
  components: {
      UserTableRow
      },
  data() {
     return {
       showChildren: false
     }
  },
  computed: {
    topUsers(){
      return this.users.filter(function(obj) {
          return obj.superior===""
        });
    }
  },
  methods: {
    requestForm(){
      this.$emit('form-requested')
    },
    sortUsers(sortingCriteria){
    this.users = this.users.sort(function(a, b){
        if(a[sortingCriteria] < b[sortingCriteria]) { return -1; }
        if(a[sortingCriteria] > b[sortingCriteria]) { return 1; }
        return 0;
      })
    }
  }
};
</script>

<style>
.table-display, .table-row-data:not(:first-child) {
    flex-basis: 50%;
}

.table-display>.button{
    position: absolute;
    top: -72px;
    right: -0px;
}

.table-head {
    display: flex;
    flex-direction: row;
    justify-content: center;
    cursor: pointer;
}

.table-head div {
    flex: 1;
    font-weight: bold;
}

.table-row-data, .table-head div {
    border-bottom: 2px solid rgba(0, 0, 0, 0.17);
    box-sizing: border-box;
    padding: 3px 0px 3px 15px;
}

</style>