import { IconButton, Badge } from '@material-ui/core'
import {
  ShoppingCart as ShoppingCartIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Menu as MenuIcon,
} from '@material-ui/icons'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProductsInCart, getUserId } from '../../reducks/users/selectors'
import { db } from '../../firebase'
import { fetchProductsInCart } from '../../reducks/users/operations'

const HeaderMenus = (props) => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const uid = getUserId(selector)
  let productsInCart = getProductsInCart(selector)

  useEffect(() => {
    const unsubscribe = db
      .collection('users')
      .doc(uid)
      .collection('cart')
      .onSnapshot((snapshots) => {
        snapshots.docChanges().forEach((change) => {
          const product = change.doc.data()
          const changeType = change.type

          switch (changeType) {
            case 'added':
              productsInCart.push(product)
              break
            case 'modified':
              const index = productsInCart.findIndex((product) => product.cartId === change.doc.id)
              productsInCart[index] = product
              break
            case 'removed':
              productsInCart = productsInCart.filter((product) => productsInCart.cartId !== change.doc.id)
              break
            default:
              break
          }
        })
        dispatch(fetchProductsInCart(productsInCart))
      })
    return () => unsubscribe
  }, [])

  return (
    <>
      <IconButton>
        <Badge badgeContent={productsInCart.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton onClick={(event) => props.handleDrawerToggle(event)}>
        <MenuIcon />
      </IconButton>
    </>
  )
}

export default HeaderMenus
