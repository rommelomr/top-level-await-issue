import { useStorage } from '@vueuse/core'
import { computed } from 'vue';
import useNotyf from '/@src/composable/useNotyf'

export const ShoppingCartState = useStorage('shopping-cart', {

    visibility: 'hidden',
    products: []
})

const itemExist = (item) => {
    let index = -1;
    ShoppingCartState.value.products.map((product,i)=>{
        if(product.id == item.id){
            index = i;
            return
        }
    })
    
    return index
}

export const addToCart = (item) => {
    
    
    if(itemExist(item) == -1){

        ShoppingCartState.value.products.push(item)
        let notif = useNotyf()
        notif.success('Producto agregado al carrito')
    }else{
        let notif = useNotyf()
        notif.error('Este curso ya está en el carrito')
    }
    
}
export const removeFromCart = (item) => {
    
    let index = itemExist(item)
    
    ShoppingCartState.value.products.splice(index,1)
    let notif = useNotyf()
    notif.success('Producto eliminado del carrito')

    
}

export const calculateTotalPrice = computed(() => {
    let price = 0
    ShoppingCartState.value.products.map((product) => {
      price += product.price
    })
    return price
  })