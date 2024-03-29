import React from 'react'
import { shallow } from 'enzyme'
import Cart from './Cart'
import CartItem from './CartItem'

const setup = (total, products = []) => {
  const actions = {
    onCheckoutClicked: jest.fn(),
    onRemoveFromCart: jest.fn()
  }

  const component = shallow(
    <Cart products={products} total={total} {...actions} />
  )

  return {
    component: component,
    actions: actions,
    button: component.find('button'),
    cartItems: component.find(CartItem),
    em: component.find('em'),
    p: component.find('p')
  }
}

describe('Cart component', () => {
  it('should display total', () => {
    const { p } = setup('76')
    expect(p.text()).toMatch(/^Total: \$76/)
  })

  it('should display add some products message', () => {
    const { em } = setup()
    expect(em.text()).toMatch(/^Please add some products to cart/)
  })

  it('should disable button', () => {
    const { button } = setup()
    expect(button.prop('disabled')).toEqual('disabled')
  })

  describe('when given product', () => {
    const product = [
      {
        id: 1,
        title: 'Product 1',
        price: 9.99,
        quantity: 1
      }
    ]

    it('should not disable button', () => {
      const { button } = setup('9.99', product)
      expect(button.prop('disabled')).toEqual('')
    })

    it('should call action on button click', () => {
      const { button, actions } = setup('9.99', product)
      button.simulate('click')
      expect(actions.onCheckoutClicked).toBeCalled()
    })
  })
})
