<template>
  <v-container>
    <v-card class="d-flex flex-column mt-5">
      <v-card-title class="d-flex justify-center text-decoration-underline">Book List</v-card-title>
      <v-card-text>
        <v-progress-linear
        v-if="progressBar"
        class="mb-5"
        indeterminate
        color="green"
        />
        <v-list v-else>
          <v-list-item v-for="(book, index) in books" :key="index" @click="viewBook(book._id)">
            <v-list-item-content>
              <v-list-item-title>Name : {{ book.title }}</v-list-item-title>
              <v-list-item-subtitle>Author : {{ book.author }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    <v-row class="d-flex justify-center mt-2">
        <v-col cols="12" md="6" lg="6" class="d-flex justify-center">
            <v-btn @click="addBookCallFn()">Add Book</v-btn>
        </v-col>
    </v-row>
    </v-card>
  </v-container>
</template>
  
  <script>
import axios from "axios";
export default {
  name: "BookList",
  data() {
    return {
      books: [
        { id: '1', title: "To Kill a Mockingbird", author: "Harper Lee" },
        { id: '2', title: "1984", author: "George Orwell" },
        { id: '3', title: "Moby Pick", author: "Herman Melville" },
        { id: '4', title: "The Great Gatsby", author: "F. Scott Fitzgerald" }
      ],
      progressBar: false
    };
  },
  methods: {
    addBookCallFn(){
        this.$router.push({ name: 'AddBook' });
    },
    viewBook(id) {
      this.$router.push({ name: 'BookDetails', params: { id } });
    },
    async fetchAllBooks(){
        try{
          this.progressBar = true
            const gotListRes = await axios.get(
          "http://localhost:5000/books/list");
        console.log("checkinggotListRes", gotListRes);
        this.books = gotListRes.data;
        this.progressBar = false
        }catch(err){
          this.progressBar = false
            console.log("checkingerrfetchAllBooks...", err);
            throw new Error(err);
        }
    }
  },
  async mounted(){
    await this.fetchAllBooks()
  }
};
</script>