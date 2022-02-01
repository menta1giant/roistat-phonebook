<template>
<div class="user-table-row">
    <div class="table-row-instance"
    :class="labelClasses"
     @click="toggleChildren">
        <div
        class='children-elements-icon'
        :class="iconClasses"
        v-if="usersAccountable.length"
        :style="indentToggleIcon">{{ toggleChildrenText }}</div>
        <div :style="indentName" class="table-row-data" >{{ name }}</div>
        <div class="table-row-data">{{ phoneNumber }}</div>
    </div>
    <div v-if="showChildren">
      <UserTableRow
          v-for="user in usersAccountable"
          :users="users"
          :index="user.id"
          :name="user.name"
          :phone-number="user.phoneNumber"
          :depth="depth + 1"
          :key="user.id"
      />
    </div>
</div>
</template>

<script>
import UserTableRow from '@/components/UserTableRow';

export default {
  name: 'UserTableRow',
  props: ['users', 'index', 'name', 'phone-number', 'depth'],
  components: {
    UserTableRow,
  },
  data() {
    return {
      showChildren: false,
    };
  },
  computed: {
    usersAccountable() {
      const index = this.index;
      return this.users.filter(obj => obj.superior === index);
    },
    iconClasses() {
      return {
        'children-elements-open': !this.showChildren,
        'children-elements-closed': this.showChildren,
      };
    },
    labelClasses() {
      return { 'has-children': this.usersAccountable.length };
    },
    indent() {
      return 50 * (1 / ((this.depth + 1) ** 0.15));
    },
    indentName() {
      return { flexBasis: `${this.indent}%` };
    },
    indentToggleIcon() {
      return { left: `calc(10px + 50% - ${this.indent}%)` };
    },
    toggleChildrenText() {
      return this.showChildren ? '-' : this.usersAccountable.length;
    },
  },
  methods: {
    toggleChildren() {
      this.showChildren = !this.showChildren;
    },

  },
};
</script>

<style>
.table-row-instance {
    margin-top: 5px;
}

.table-row-instance {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.has-children {
      cursor: pointer;
    }

.children-elements-icon {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 15px;
    border: 1px solid rgb(0,0,0,0.15);
    font-size: 15px;
    line-height: 20px;
    text-align: center;
}

</style>
