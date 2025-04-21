import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  getSubtotal(): number {
    throw new Error('Method not implemented.');
  }
 
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  private totalAmountSubject = new BehaviorSubject<number>(0);  // Add total amount subject
  cartItems$ = this.cartItemsSubject.asObservable();
  totalAmount$ = this.totalAmountSubject.asObservable(); // Expose total amount

  constructor() { }

  // Add to cart
  addToCart(product: any, quantity: number = 1) {
    const existingCartItem = this.cartItemsSubject.value.find(item => item.product.productName === product.productName);
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      this.cartItemsSubject.next([...this.cartItemsSubject.value, { product, quantity }]);
    }
    this.updateTotalAmount(); // Update the total amount whenever cart is modified
  }

  // Increment quantity
  incrementQuantity(product: any) {
    product.quantity++;
    this.cartItemsSubject.next([...this.cartItemsSubject.value]); // Trigger change detection
    this.updateTotalAmount(); // Update total after incrementing quantity
  }

  // Decrement quantity
  decrementQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
      this.cartItemsSubject.next([...this.cartItemsSubject.value]); // Trigger change detection
      this.updateTotalAmount(); // Update total after decrementing quantity
    }
  }

  // Remove item from cart
  removeItem(product: any) {
    const updatedCartItems = this.cartItemsSubject.value.filter(item => item.product.productName !== product.product.productName);
    this.cartItemsSubject.next(updatedCartItems);
    this.updateTotalAmount(); // Update total after removal
  }

  // Clear the cart
  clearCart() {
    this.cartItemsSubject.next([]);
    this.updateTotalAmount(); // Reset total when cart is cleared
  }

  // Update quantity
  updateQuantity(product: any, quantity: number) {
    const updatedCartItems = this.cartItemsSubject.value.map(item => {
      if (item.product.productName === product.productName) {
        item.quantity = quantity;
      }
      return item;
    });

    this.cartItemsSubject.next(updatedCartItems);
    this.updateTotalAmount(); // Update total when quantity is updated
  }

  // Get the total item count
  getCartItemCount(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + item.quantity, 0);
  }

  // Get cart items
  getCartItems(): any[] {
    return this.cartItemsSubject.value;
  }

  // Set cart items from outside
  setCartItems(cartItems: any[]) {
    this.cartItemsSubject.next(cartItems);
    this.updateTotalAmount(); // Update total when cart items are set
  }

  // Update total amount
  private updateTotalAmount() {
    const total = this.cartItemsSubject.value.reduce((sum, item) => sum + (item.product.productPrice * item.quantity), 0);
    this.totalAmountSubject.next(total);
  }

  // Get total amount
  getTotalAmount(): number {
    return this.totalAmountSubject.value;
  }

  // Set total amount directly (e.g., when checking out)
  setTotalAmount(total: number) {
    this.totalAmountSubject.next(total);
  }
}