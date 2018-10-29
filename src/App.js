import React, { Component } from 'react';
import './App.css';
import CartHeader from './components/CartHeader.js';
import CartFooter from './components/CartFooter.js';
import CartItems from './components/CartItems.js';
import AddItem from './components/AddItem.js';



class App extends Component {

    state={
      products:[],
      cartItemsList:[
          { id: 1, product: { id: 40, name: 'Mediocre Iron Watch', priceInCents: 399 }, quantity: 1 },
          { id: 2, product: { id: 41, name: 'Heavy Duty Concrete Plate', priceInCents: 499 }, quantity: 2 },
          { id: 3, product: { id: 42, name: 'Intelligent Paper Knife', priceInCents: 1999 }, quantity: 1 },
        ],
    }

    componentDidMount() {
      fetch('https://shopping-cart-backend.herokuapp.com/')
      .then (response => response.json())
      .then(data =>{
        this.setState({
          products: data.items
        })
      })
    }


  calculateTotal = (cartItems) => {
    const totalCost = cartItems.reduce((total, item) =>{
      return total + (item.product.priceInCents * item.quantity)
    },0)
    return totalCost
  }

  addNewItem =(item) =>{
    item.id = this.state.cartItemsList.length +1
    const newCart = this.state.cartItemsList.concat(item)
    this.setState({
      cartItemsList: newCart
    })
  }


  render() {

  const totalCost = this.calculateTotal(this.state.cartItemsList)
   return (
     <div>
      <CartHeader />
      <CartItems cartItemsList={this.state.cartItemsList} totalCost={totalCost/100} />
      <AddItem products={this.state.products} addNewItem={this.addNewItem} />
      <CartFooter date='2016' />
     </div>
   )
  }
}

export default App;
