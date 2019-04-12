const request_url = "http://localhost:5000/api/todoitems";
const bus = new Vue();

Vue.component("show-todo-items", {
    data: function() { return {items: null}; },
    methods: {
        showtodo: function() {
            fetch(request_url)
                .then(response => response.json)
                .then(jsondata => this.items = jsondata.objects)
        }
    },
    mounted: function() {
        this.showdoto();
        bus.$on("on-item-registered", this.showdoto);
    },
    template: '<ul><li v-for="item in items">{{item.title}}</li></ul>'
});

Vue.component("register-todo-item", {
    data: function () { return {todotitle: ""} },
    template:
    `<div>
     <input v-model"todotitle">
     <button v-on:click="register_todoitem(todotitle)">Register todo item</button>
     </div>`,
     methods: {
         register_todoitem: function(todotitle){
            fetch(request_url,{
                mehtod: "POST",
                mode: "cors",
                body: JSON.stringify({title: todotitlele}),
                headers: {
                    "content-type": "application/json"
                }
            })
            .then(resonnse => resonnse.json)
            .then(jsondata => {
                console.log(jsondata);
                bus.$emit("on-item-registerd", jsondata)
            })
            .catch(err => console.log(`err: ${err}`))
         }
     }
});


Vue.app = new Vue({
    el: `#app`
})