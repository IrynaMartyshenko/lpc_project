<template>
  <div id="app">
    <div class="registration-page">
      <div class="registration-form-container">
        <h3 class="sign-up-title">Sign up</h3>

        <form @submit.prevent="validateForm">
          <div class="registration-form">
            <label class="registration-label">Name</label>
            <input type="text" v-model="name" class="input-info" placeholder="Enter Your Name" />
            <div class="error-message">{{ errors.name }}</div>

            <label class="registration-label">Surname</label>
            <input type="text" v-model="surname" class="input-info" placeholder="Enter Your Surname" />
            <div class="error-message">{{ errors.surname }}</div>

            <label class="registration-label">Birthday Date</label>
            <input type="date" v-model="birthday" class="input-info" />
            <div class="error-message">{{ errors.birthday }}</div>

            <label class="registration-label">Phone Number</label>
            <input
              type="tel"
              v-model="phone"
              v-mask="'(+380) ## ###-##-##'"
              class="input-info"
              placeholder="+380 ___ ___-__-__"
            />
            <div class="error-message">{{ errors.phone }}</div>

            <label class="registration-label">Email</label>
            <input type="email" v-model="email" class="input-info" placeholder="Enter Your Email" />
            <div class="error-message">{{ errors.email }}</div>

            <label class="registration-label">Password</label>
            <input type="password" v-model="password" class="input-info" placeholder="Create Your Password" />
            <div class="error-message">{{ errors.password }}</div>

            <label class="registration-label">Sex</label>
            <label>
              <input type="radio" v-model="gender" value="male" />
              Male
            </label>
            <label>
              <input type="radio" v-model="gender" value="female" />
              Female
            </label>
            <div class="error-message">{{ errors.gender }}</div>

            <label class="registration-label">Group</label>
            <select v-model="group" class="input-info">
              <option value="">Choose a group</option>
              <option value="IA-31">IA-31</option>
              <option value="IA-32">IA-32</option>
              <option value="IA-33">IA-33</option>
              <option value="IA-34">IA-34</option>
              <option value="IA-35">IA-35</option>
            </select>
            <div class="error-message">{{ errors.group }}</div>

            <button type="submit" class="submit-button">Sign Up</button>
          </div>
        </form>
      </div>

      <div class="table-container">
        <table id="userTable">
          <thead>
            <tr>
              <th>Select</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Birthday Date</th>
              <th>Email</th>
              <th>Password</th>
              <th>Phone</th>
              <th>Sex</th>
              <th>Group</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="index">
              <td><input type="checkbox" v-model="user.selected" /></td>
              <td>{{ user.name }}</td>
              <td>{{ user.surname }}</td>
              <td>{{ user.birthday }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.password }}</td>
              <td>{{ user.phone }}</td>
              <td>{{ user.gender }}</td>
              <td>{{ user.group }}</td>
            </tr>
          </tbody>
        </table>
        <button @click="deleteSelectedRows">Delete Selected</button>
        <button @click="duplicateSelectedRows">Duplicate Selected</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask';

export default {
  directives: {
    mask,
  },
  data() {
    return {
      name: '',
      surname: '',
      birthday: '',
      phone: '',
      email: '',
      password: '',
      gender: '',
      group: '',
      users: [],
      errors: {
        name: '',
        surname: '',
        birthday: '',
        phone: '',
        email: '',
        password: '',
        gender: '',
        group: '',
      },
    };
  },
  methods: {
    validateForm() {
      let isValid = true;
      this.errors = {
        name: '',
        surname: '',
        birthday: '',
        phone: '',
        email: '',
        password: '',
        gender: '',
        group: '',
      };

      if (!this.name) {
        this.errors.name = 'Name is required';
        isValid = false;
      }

      if (!this.surname) {
        this.errors.surname = 'Surname is required';
        isValid = false;
      }

      if (!this.birthday) {
        this.errors.birthday = 'Birthday Date is required';
        isValid = false;
      }

      const phonePattern = /^\+380 \(\d{2}\) \d{3}-\d{2}-\d{2}$/;

      if (!this.phone.match(phonePattern)) {
        this.errors.phone = 'Phone number is invalid. Format: +380 (XX) XXX-XX-XX';
        isValid = false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email.match(emailPattern)) {
        this.errors.email = 'Email is invalid';
        isValid = false;
      }

      if (!this.password) {
        this.errors.password = 'Password is required';
        isValid = false;
      }

      if (!this.gender) {
        this.errors.gender = 'Gender is required';
        isValid = false;
      }

      if (!this.group) {
        this.errors.group = 'Group selection is required';
        isValid = false;
      }

      if (isValid) {
        this.users.push({
          name: this.name,
          surname: this.surname,
          birthday: this.birthday,
          phone: this.phone,
          email: this.email,
          password: this.password,
          gender: this.gender,
          group: this.group,
          selected: false,
        });

        this.resetForm();
      }
    },
    resetForm() {
      this.name = '';
      this.surname = '';
      this.birthday = '';
      this.phone = '';
      this.email = '';
      this.password = '';
      this.gender = '';
      this.group = '';
    },
    deleteSelectedRows() {
      this.users = this.users.filter(user => !user.selected);
    },
    duplicateSelectedRows() {
      const selectedUsers = this.users.filter(user => user.selected);
      this.users.push(...selectedUsers.map(user => ({ ...user, selected: false })));
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-image: url('background-pic.webp');
  background-size: cover;
  font-family: 'Arial', sans-serif;
}

.home-button-container {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 999;
}

.back-to-mainp {
  background: transparent;
  border: none;
  cursor: pointer;
}

.size-6 {
  width: 24px;
  height: 24px;
  color: white;
}

.registration-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
}

.registration-form-container {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.sign-up-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.registration-form {
  display: flex;
  flex-direction: column;
}

.registration-label {
  margin-bottom: 5px;
}

.input-info {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 15px;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
}

.submit-button {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}

.login-link {
  margin-top: 20px;
  text-align: center;
}

.lpage-link {
  color: #007bff;
  text-decoration: none;
}

.lpage-link:hover {
  text-decoration: underline;
}

.table-container {
  margin-top: 30px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

button {
  background-color: #28a745;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #218838;
}
</style>
