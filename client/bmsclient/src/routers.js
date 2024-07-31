import Vue from 'vue';
import VueRouter from 'vue-router'
import BookList from "./components/bookList.vue";
import AddBook from "./components/addBook.vue";
import BookDetails from './components/bookDetails.vue';

Vue.use(VueRouter);

const routes = [
    {
        name: "BookList",
        component: BookList,
        path: "/"
    },
    {
        name: "AddBook",
        component: AddBook,
        path: "/addBook"
    },
    {
        name: "BookDetails",
        component: BookDetails,
        path: "/bookDetails/:id",
        props: true,
    },

];

const router = new VueRouter({
    routes,
    mode: "history",
});

export default router;