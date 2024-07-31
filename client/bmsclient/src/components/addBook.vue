<template>
  <v-container>
    <v-card>
      <v-card-title>Add A New Book</v-card-title>
      <v-card-text>
        <v-text-field v-model="newBook.title" label="Title" solo></v-text-field>
        <v-text-field v-model="newBook.author" label="Author" solo></v-text-field>
        <v-text-field v-model="newBook.genre" label="Genre" solo></v-text-field>
        <v-textarea v-model="newBook.summary" label="Summary" solo></v-textarea>
        <v-progress-linear
        v-if="progressBar"
        class="mb-5"
        indeterminate
        color="green"
        />
        <v-btn color="primary" @click="addBook()">Add Book</v-btn>
        <v-btn @click="goBack">Back to List</v-btn>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "AddBook",
  data() {
    return {
      newBook: {
        title: "",
        author: "",
        genre: "",
        summary: ""
      },
      snackbar: false,
      snackbarText: "",
      progressBar: false,
    };
  },
  methods: {
    async addBook() {
      try {
        this.progressBar = true;
        const gotAddRes = await axios.post(
          "http://localhost:5000/books/add",
          this.newBook
        );
        console.log("checkinggotAddRes", gotAddRes);
        if (gotAddRes) {
          this.snackbarText = gotAddRes.data;
          this.snackbar = true;
        }
        this.progressBar = false
      } catch (err) {
        console.log("checkingerrr..", err);
        this.snackbarText = err;
        this.snackbar = true;
        this.progressBar = false
        throw new Error(err);
      }
    },
    goBack() {
      this.$router.push({ name: "BookList" });
    },
  }
};
</script>
