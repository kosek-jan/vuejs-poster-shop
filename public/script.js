new Vue({
  el: '#app',
  data: {
    total: 0,
    items: [
      {id:1, title: 'Item 1', price:5.99},
      {id:2, title: 'Item 2', price:5.99},
      {id:3, title: 'Item 3', price:5.99},
    ],
    cart: [],
  },
  methods:{
    addItem(index){
      var item = this.items[index];
      var cart_index = this.cart.findIndex(x=>x.id == item.id);
      if(cart_index === -1){
        this.cart.push({
          id: item.id,
          title: item.title,
          price: 5.99,
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
    }
  },
  filters:{
    currency(price){
      return '$'+price.toFixed(2);
    }
  }
});