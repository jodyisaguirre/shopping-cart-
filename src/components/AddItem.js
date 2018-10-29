import React, { Component } from 'react';

class AddItem extends Component {

state ={
  product:{
    id:'',
    name: '',
    priceInCents:''
  },
  quantity: ''
}

handleQuantityChange = (event) => {
  const key = event.target.name
  const value = event.target.value
  this.setState({
    [key]: value
  })
}

handleProductChange = (event) =>{
  const key = event.target.name
  const newProduct = this.props.products.filter(product => product.name === event.target.value)
  this.setState({
    [key]: newProduct[0]
  })
}

handleSubmit = (event) =>{
  event.preventDefault()
  this.props.addNewItem(this.state)
  this.setState({
    quantity:''
  })
}

render(){
  const productOptions = this.props.products.map(product => <option value={product.name} key={product.id}>{product.name} ${product.priceInCents/100}</option>)



  return (
        <form className="container" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Quantity</label>
                <input type="number"
                  required
                  className="form-control"
                  id="example"
                  placeholder="Enter a quantity"
                  name="quantity"
                  value={this.state.quantity}
                  onChange={this.handleQuantityChange} />
            </div>
            <div className="form-group">
              <label>Product</label>
              <select className="form-control"
                  name="product"
                  onChange={this.handleProductChange}
                  >
                <option selected disabled>Select a product</option>
                  {productOptions}
              </select>
            </div>
              <button className="btn btn-primary mb-2" type="submit">Add Item</button>
        </form>
  )
}
}
export default AddItem
