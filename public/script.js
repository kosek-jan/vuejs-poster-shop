new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [],
        cart: [],
        searchbar: 'anime',
        last_search: '',
        loading: false,
        price: 9.99,
    },
    mounted() {
      this.onSubmit();  
    },
    methods:{
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
            this.total += item.price;
        },
        inc(item){
            item.qty++;
            this.total += item.price;
        },
        dec(item){
            if(item.qty-1 == 0){
                var cart_index = this.cart.findIndex(x=>x.id == item.id);
                this.cart.splice(cart_index, 1);
            }else{
                item.qty--;
            }
            this.total -= item.price;
        },
        onSubmit(){
            this.items = [];
            this.loading = true;
            this.$http.get('/search/'.concat(this.searchbar)).then(
                (res)=>{
                    this.last_search = this.searchbar;
                    this.items = res.data;
                    this.loading = false;
                }
            );
        }
    },
    filters:{
        currency(price){
            return '$'+price.toFixed(2);
        }
    }
});