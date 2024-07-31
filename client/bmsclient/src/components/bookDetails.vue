<template>
  <v-container>
    <v-card class="mt-5" v-if="book">
      <v-card-title>{{ book.title }}</v-card-title>
      <v-card-text>
        <div>
          <strong>Author:</strong>
          <!-- {{ book.author }} -->
          <v-text-field v-model="book.author" outlined dense hide-details :disabled="disableEdit"></v-text-field>
        </div>
        <div>
          <strong>Genre:</strong>
          <!-- {{ book.genre }} -->
          <v-text-field v-model="book.genre" outlined dense hide-details :disabled="disableEdit"></v-text-field>
        </div>
        <div>
          <strong>Summary:</strong>
          <!-- {{ book.summary }} -->
          <v-text-field v-model="book.summary" outlined dense hide-details :disabled="disableEdit"></v-text-field>
          
        </div>
        <v-row class="d-flex justify-center">
          <v-col cols="12" sm="4" md="4" lg="6" class="d-flex">
            <v-btn @click="goBack">Back to List</v-btn>
          </v-col>
          <v-col cols="12" sm="3" md="4" lg="4" class="d-flex justify-end">
            <v-btn icon @click="()=> disableEdit = !disableEdit">
              <v-icon color="green">mdi-account-edit</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="2" md="2" lg="2" class="d-flex justify-end">
            <v-btn icon @click="deleteBook()">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="d-flex" v-if="disableEdit == false">
          <v-col cols="12">
            <v-btn color="primary" @click="editBook()">Submit Edit</v-btn>
          </v-col>
        </v-row> 
      </v-card-text>
    </v-card>

    <v-card class="mt-5">
      <v-card-title>Add a Review</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="reviewObj.reviewerName" label="Your Name" solo required :rules="reviewerRules"></v-text-field>
        <v-rating
          v-model="reviewObj.reviewRating"
          color="yellow darken-3"
          background-color="grey darken-1"
          empty-icon="$ratingFull"
          half-increments
          hover
          large
          :rules="ratingRules"
        ></v-rating>
        <v-textarea v-model="reviewObj.comment" label="Your Review" solo :rules="commentRules"></v-textarea>
        <v-btn color="primary" :disabled="!valid" @click="addReview">Submit Review</v-btn>
      </v-form>
      </v-card-text>
    </v-card>

    <v-card class="mt-5">
      <v-card-title>Reviews</v-card-title>
      <v-card-text>
        <v-list v-if="bookReview">
          <v-list-item v-for="(review, index) in bookReview" :key="index">
            <v-list-item-content>
              <v-list-item-title>Reviewer : {{ review.reviewer }}</v-list-item-title>
              <v-rating
                v-model="review.rating"
                color="teal darken-3"
                background-color="grey darken-1"
                empty-icon="$ratingFull"
                half-increments
                hover
                readonly
              ></v-rating>
              <v-list-item-title>Desc : {{ review.comment }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
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
  name: "BookDetail",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      book: null,
      reviewObj: {
        comment: null,
        reviewerName: null,
        reviewRating: null
      },
      snackbar: false,
      snackbarText: "",
      bookReview: null,
      disableEdit: true,
      reviewerRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 30) || 'Name must be less than 30 characters'
      ],
      commentRules: [
        v => !!v || 'Review is required',
        v => (v && v.length <= 500) || 'Review must be less than 500 characters'
      ],
      ratingRules: [
        v => !!v || 'Rating is required'
      ],
      valid: false,
    };
  },
  async created() {
    await this.fetchBook();
    await this.fetchedAllBookReviews();
  },
  mounted(){
    this.$nextTick(() => {
      this.$refs.form.validate();
      this.valid = false;
    });
  },
  methods: {
    async fetchBook() {
      console.log("checkingiddd", this.id);
      const gotSingleBook = await axios.get(
        `http://localhost:5000/books/list/${this.id}`
      );
      console.log("checkinggotListRes", gotSingleBook);
      this.book = gotSingleBook.data;
    },
    async addReview() {
      try {
        console.log("checkingaddreview...");
        if(!this.valid) return;
        const gotReviewAddedRes = await axios.post(
          `http://localhost:5000/books/${this.id}/reviews`,
          this.reviewObj
        );
        console.log("checkinggotListRes", gotReviewAddedRes);
        if (gotReviewAddedRes) {
          this.snackbarText = gotReviewAddedRes.data;
          this.snackbar = true;
          this.reviewObj = {
            comment: null,
            reviewerName: null,
            reviewRating: 3.5
          };
        }
        await this.fetchedAllBookReviews();
      } catch (err) {
        console.log("checkinerr..", err);
        this.snackbarText = err;
        this.snackbar = true;
        throw new Error(err);
      }
    },
    goBack() {
      this.$router.push({ name: "BookList" });
    },
    async fetchedAllBookReviews() {
      try {
        console.log("checkingparam");
        const gotReviewAddedRes = await axios.get(
          `http://localhost:5000/books/${this.id}/reviews`
        );
        console.log("gotReviewAddedRes", gotReviewAddedRes);
        this.bookReview = gotReviewAddedRes.data;
        this.disableEdit = true
      } catch (err) {
        console.log("checkinerr...", err);
        throw new Error(err);
      }
    },
    async editBook() {
      try {
        console.log("checkingedit", this.book);
        const {author, genre, summary} = this.book;
        const sendingEdit = {
          author,
          genre,
          summary,
        }
        const gotUpdateRes = await axios.put(
          `http://localhost:5000/books/${this.id}`, sendingEdit
        );
        console.log("checkinggotUpdateRes", gotUpdateRes);
        this.snackbarText = gotUpdateRes.data;
        this.snackbar = true;
        await this.fetchedAllBookReviews();
      } catch (err) {
        console.log("checkinerrputttt...", err);
        this.snackbarText = err;
        this.snackbar = true;
        throw new Error(err);
      }
    },
    async deleteBook() {
      try {
        console.log("checkingdelete", this.id);
        const gotDeleteRes = await axios.delete(
          `http://localhost:5000/books/${this.id}`
        );
        console.log("checkinggotDeleteRes", gotDeleteRes);
        this.snackbarText = gotDeleteRes.data;
        this.snackbar = true;
        this.goBack()
      } catch (err) {
        console.log("checkinerrdeleteee...", err);
        this.snackbarText = err;
        this.snackbar = true;
        throw new Error(err);
      }
    }
  }
};
</script>
  
  <style scoped>
.mt-5 {
  margin-top: 20px;
}
</style>
  