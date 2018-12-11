var LOAD_NUM = 10;
new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [],
        cart: [],
        results: [],
        searchbar: 'anime',
        last_search: '',
        loading: false,
        price: 9.99,
    },
    mounted() {
        this.onSubmit(); 
      
        var vueInstance = this;
        var elem = document.getElementById('product-list-bottom');
        var watcher = scrollMonitor.create(elem);
        watcher.enterViewport(function(){
            vueInstance.appendItems();
        });
    },
    methods:{
        appendItems(){
            if(this.items.length < this.results.length){
                var append = this.results.slice(this.items.length, this.items.length + LOAD_NUM);
                this.items = this.items.concat(append);
            }
        },
        addItem(index){
            var item = this.items[index];
            var cart_index = this.cart.findIndex(x=>x.id == item.id);
            if(cart_index === -1){
                this.cart.push({
                id: item.id,
                title: item.title,
                qty: 1,
                });
            }else{
                this.cart[cart_index].qty++ 
            }
            this.total += this.price;
        },
        inc(item){
            item.qty++;
            this.total += this.price;
        },
        dec(item){
            if(item.qty-1 == 0){
                var cart_index = this.cart.findIndex(x=>x.id == item.id);
                this.cart.splice(cart_index, 1);
            }else{
                item.qty--;
            }
            this.total -= this.price;
        },
        onSubmit(){
            this.items = [];
            this.loading = true;
            this.$http.get('/search/'.concat(this.searchbar)).then(
                (res)=>{
                    this.last_search = this.searchbar;
                    this.results = res.data;
                    this.appendItems();
                    this.loading = false;
                }
            );
        }
    },
    filters:{
        currency(price){
            return '$'+price;
        }
    }
});