<template>
    <div class="phone-book">
        <TableDisplay :users="users" @form-requested="displayForm"/>
    <UserForm v-if="formVisible" :users="users" @form-submitted="addUser"/>
    </div>
</template>

<script>
import UserForm from '@/components/UserForm'
import TableDisplay from '@/components/TableDisplay'

 export default{
  name:'PhoneBook',
  data (){
   return {
        users: JSON.parse(localStorage.getItem("users")) || [],
        formVisible: false,
    }
  },
  components:{
      UserForm,TableDisplay
  },
  methods: {
    addUser(user) {
        user.id = this.lowestAvailableId;
        this.users.push(user)
        localStorage.setItem('users', JSON.stringify(this.users));
        this.formVisible = false
    },

    displayForm() {
        this.formVisible = true
    },

  },
  computed: {
      lowestAvailableId(){
          return this.users.length ? this.users.concat().sort(function(a,b){return b.id-a.id})[0].id+1 : 0
      },
  }
 }
</script>

<style>
.phone-book {
    position: relative;
    top: 72px;
    display: flex;
    align-items: flex-start;
    justify-content:left;
    gap: 60px;
}

.table-display, .user-form{
    position:relative;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    padding: 25px;
    font-size: 20px;
    margin: 20px;
    display: flex;
    background: #FFFFFF;
    box-shadow: 0px 0px 3px rgb(160 160 160 / 25%), 0px 12px 24px rgb(136 134 154 / 15%);
    border-radius: 16px;
}

.button {
    color:white;
    display: inline-block;
    text-align: center;
    font-size: 18px;
    line-height: 20px;
    font-weight: 400;
    border-radius: 6px;
    padding: 16px 24px;
    cursor: pointer;
    border: 0;
    background:#2589FF;
    white-space: nowrap;
}

.button:hover {
    background: #64abff;
}

</style>