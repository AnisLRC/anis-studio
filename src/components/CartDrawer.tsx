import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../lib/cart.store'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  language: 'hr' | 'en'
}

export default function CartDrawer({
  isOpen,
  onClose,
  language
}: CartDrawerProps) {
  const { items, totalPrice, removeItem, setQty } = useCart()
  const translations = {
    title: {
      hr: 'Košarica',
      en: 'Shopping Cart'
    },
    empty: {
      hr: 'Vaša košarica je prazna',
      en: 'Your cart is empty'
    },
    continueShopping: {
      hr: 'Nastavi kupovinu',
      en: 'Continue Shopping'
    },
    subtotal: {
      hr: 'Međuzbroj',
      en: 'Subtotal'
    },
    payWithStripe: {
      hr: 'Kupi putem Stripe-a',
      en: 'Pay with Stripe'
    },
    paymentNote: {
      hr: 'Plaćanja obrađena sigurno preko Stripe-a (test način).',
      en: 'Payments processed securely via Stripe (test mode).'
    },
    remove: {
      hr: 'Ukloni',
      en: 'Remove'
    }
  }

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(itemId)
    } else {
      setQty(itemId, newQuantity)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)'
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '400px',
              background: 'var(--clr-glass)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            {/* Header */}
            <div style={{
              padding: 'var(--space-xl)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h2 style={{
                fontSize: 'var(--text-xl)',
                fontWeight: '600',
                margin: 0,
                color: 'var(--clr-text)'
              }}>
                {translations.title[language]}
              </h2>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 'var(--space-sm)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--clr-text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18M6 6l12 12"></path>
                </svg>
              </motion.button>
            </div>

            {/* Content */}
            <div style={{
              flex: 1,
              overflow: 'auto',
              padding: 'var(--space-lg)'
            }}>
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                  style={{
                    padding: 'var(--space-4xl) var(--space-lg)',
                    color: 'var(--clr-text-light)'
                  }}
                >
                  <div style={{
                    fontSize: 'var(--text-4xl)',
                    marginBottom: 'var(--space-lg)'
                  }}>
                    🛒
                  </div>
                  <p style={{
                    fontSize: 'var(--text-lg)',
                    marginBottom: 'var(--space-xl)'
                  }}>
                    {translations.empty[language]}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    style={{
                      background: 'var(--gradient-primary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: 'var(--radius-lg)',
                      padding: 'var(--space-md) var(--space-xl)',
                      fontSize: 'var(--text-base)',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    {translations.continueShopping[language]}
                  </motion.button>
                </motion.div>
              ) : (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-lg)'
                }}>
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-panel"
                      style={{
                        padding: 'var(--space-lg)',
                        display: 'flex',
                        gap: 'var(--space-md)',
                        alignItems: 'center'
                      }}
                    >
                      {/* Product Image */}
                      <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'var(--gradient-epoxy)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 'var(--text-2xl)',
                        flexShrink: 0
                      }}>
                        {item.imageUrl || '🎨'}
                      </div>

                      {/* Product Info */}
                      <div style={{
                        flex: 1,
                        minWidth: 0
                      }}>
                        <h4 style={{
                          fontSize: 'var(--text-base)',
                          fontWeight: '600',
                          marginBottom: 'var(--space-xs)',
                          color: 'var(--clr-text)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {item.title}
                        </h4>
                        
                        <p style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--clr-text-light)',
                          margin: 0
                        }}>
                          €{item.price.toFixed(2)} × {item.qty}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-sm)',
                        marginRight: 'var(--space-sm)'
                      }}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleQuantityChange(item.id, item.qty - 1)}
                          style={{
                            width: '28px',
                            height: '28px',
                            background: 'rgba(110, 68, 255, 0.1)',
                            border: '1px solid rgba(110, 68, 255, 0.2)',
                            borderRadius: 'var(--radius-sm)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'var(--clr-primary)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: '600'
                          }}
                        >
                          −
                        </motion.button>
                        
                        <span style={{
                          fontSize: 'var(--text-sm)',
                          fontWeight: '600',
                          color: 'var(--clr-text)',
                          minWidth: '20px',
                          textAlign: 'center'
                        }}>
                          {item.qty}
                        </span>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleQuantityChange(item.id, item.qty + 1)}
                          style={{
                            width: '28px',
                            height: '28px',
                            background: 'rgba(110, 68, 255, 0.1)',
                            border: '1px solid rgba(110, 68, 255, 0.2)',
                            borderRadius: 'var(--radius-sm)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'var(--clr-primary)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: '600'
                          }}
                        >
                          +
                        </motion.button>
                      </div>

                      {/* Remove Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(item.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 'var(--space-xs)',
                          borderRadius: 'var(--radius-sm)',
                          color: 'var(--clr-text-light)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title={translations.remove[language]}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: 'var(--space-xl)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(255, 255, 255, 0.05)'
                }}
              >
                {/* Subtotal */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 'var(--space-lg)'
                }}>
                  <span style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: '600',
                    color: 'var(--clr-text)'
                  }}>
                    {translations.subtotal[language]}:
                  </span>
                  <span style={{
                    fontSize: 'var(--text-xl)',
                    fontWeight: '700',
                    color: 'var(--clr-primary)'
                  }}>
                    €{totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Payment Note */}
                <p style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--clr-text-light)',
                  textAlign: 'center',
                  marginBottom: 'var(--space-lg)',
                  lineHeight: 'var(--leading-relaxed)'
                }}>
                  {translations.paymentNote[language]}
                </p>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => alert('Checkout functionality coming soon!')}
                  style={{
                    width: '100%',
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-lg)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-lg)'
                  }}
                >
                  {translations.payWithStripe[language]}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}