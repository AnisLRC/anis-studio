import { loadStripe } from '@stripe/stripe-js'

// Test mode keys - replace with your actual Stripe keys
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51234567890abcdef' // Replace with your test key
// Note: STRIPE_SECRET_KEY should only be used on the backend for security reasons

export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

export interface StripeCheckoutItem {
  price_data: {
    currency: string
    product_data: {
      name: string
      description?: string
      images?: string[]
    }
    unit_amount: number // Amount in cents
  }
  quantity: number
}

export interface CreateCheckoutSessionParams {
  items: StripeCheckoutItem[]
  success_url: string
  cancel_url: string
  customer_email?: string
  metadata?: Record<string, string>
}

// This function would typically call your backend API
export async function createCheckoutSession(params: CreateCheckoutSessionParams) {
  try {
    // In a real implementation, this would call your backend
    // For now, we'll simulate the API call
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      throw new Error('Failed to create checkout session')
    }

    const { sessionId } = await response.json()
    return sessionId
  } catch (error) {
    console.error('Error creating checkout session:', error)
    // For demo purposes, return a mock session ID
    return 'cs_test_mock_session_id'
  }
}

// Convert cart items to Stripe checkout items
export function cartItemsToStripeItems(cartItems: Array<{
  id: string
  name: string
  price: number
  quantity: number
  image: string
}>): StripeCheckoutItem[] {
  return cartItems.map(item => ({
    price_data: {
      currency: 'eur',
      product_data: {
        name: item.name,
        description: `Handcrafted item by Ani's Studio`,
        images: [item.image],
      },
      unit_amount: Math.round(item.price * 100), // Convert to cents
    },
    quantity: item.quantity,
  }))
}

// Redirect to Stripe Checkout using the Checkout Session URL
export async function redirectToCheckout(checkoutUrl: string) {
  // Modern approach: redirect directly to the checkout URL provided by the backend
  if (typeof window !== 'undefined') {
    window.location.href = checkoutUrl
  }
}

// Handle checkout success (this would typically be called from a success page)
export async function handleCheckoutSuccess() {
  try {
    // In a real implementation, this would verify the session with your backend
    // For now, we'll simulate a successful checkout
    return {
      success: true,
      message: 'Payment successful! Your order has been confirmed.'
    }
  } catch (error) {
    console.error('Error handling checkout success:', error)
    return {
      success: false,
      message: 'There was an issue processing your payment. Please contact support.'
    }
  }
}