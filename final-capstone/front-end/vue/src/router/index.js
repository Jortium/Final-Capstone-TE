import Vue from 'vue'
import Router from 'vue-router'
import Personal from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Register from '../views/Register.vue'
import store from '../store/index'
import GroceryList from '../views/GroceryList.vue'
import RecipeDetail from '../views/RecipeDetail.vue'
import Tutorial from '../views/Tutorial.vue'
import Error from '../views/Error.vue'
import RecipeList from '../views/RecipeList'

Vue.use(Router)

/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,   // Get the base server URL from the .env file
  routes: [
    {
      path: '/',
      name: 'home',
      component: RecipeList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/grocery-list",
      name:"grocery",
      component: GroceryList,
      meta:{
        requiresAuth: true
      }
    },
    {
      path:"/recipe/:id",
      name:"recipe",
      component: RecipeDetail,
      meta:{
        requiresAuth: true
      }
    },
    {
      path:"/tutorial",
      name: "tutorial",
      component: Tutorial,
      meta:{
        requiresAuth: false
      }
    },
    {
      path:"/error",
      name: "error",
      component: Error,
      meta:{
        requiresAuth: false
      }
    },
    {
      path: "/my-recipes",
      name: "myRecipes",
      component: Personal,
      meta:{
        requiresAuth: true
      }
    }
  

  ]
})

router.beforeEach((to, from, next) => {
  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && store.state.token === '') {
    next("/login");
  } else {
    // Else let them go to their next destination
    next();
  }
});

export default router;
