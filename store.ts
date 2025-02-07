import { create } from "zustand";
import { Product } from "@/app/types/Product";
import { persist } from "zustand/middleware";

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    deleteCartProduct: (productId: string) => void;
    resetCart: () => void;
    getTotalPrice: () => number;
    getSubTotalPrice: () => number;
    getItemCount: (productId: string) => number;
    getGroupedItems: () => CartItem[];
    updateCartQuantity: (productId: string, quantity: number) => void;
}

const userCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) => set((state) => {
                const existingItem = state.items.find((item) => item.product._id === product._id);
                if (existingItem) {
                    // Reset quantity to 1 instead of incrementing
                    return {
                        items: state.items.map((item) =>
                            item.product._id === product._id ? { ...item, quantity: 1 } : item
                        ),
                    };
                } else {
                    return { items: [...state.items, { product, quantity: 1 }] };
                }
            }),

            removeItem: (productId) =>
                set((state) => ({
                    items: state.items.reduce((acc, item) => {
                        if (item.product._id === productId) {
                            if (item.quantity > 1) {
                                acc.push({ ...item, quantity: item.quantity - 1 });
                            }
                        } else {
                            acc.push(item);
                        }
                        return acc;
                    }, [] as CartItem[]),
                })),

            deleteCartProduct: (productId) =>
                set((state) => ({
                    items: state.items.filter(({ product }) => product._id !== productId),
                })),

            resetCart: () => set({ items: [] }),

            getTotalPrice: () => {
                return get().items.reduce(
                    (total, item) => total + (item.product.price ?? 0) * item.quantity,
                    0
                );
            },

            getSubTotalPrice: () => {
                return get().items.reduce((total, item) => {
                    const price = item.product.price ?? 0;
                    const discountPercentage = item.product.discountPercentage ?? 0;
                    const discount = (price * discountPercentage) / 100;
                    const discountedPrice = price - discount;
                    return total + discountedPrice * item.quantity;
                }, 0);
            },

            getItemCount: (productId) => {
                const item = get().items.find((item) => item.product._id === productId);
                return item ? item.quantity : 0;
            },

            getGroupedItems: () => get().items,

            // Update quantity of a product
            updateCartQuantity: (productId, quantity) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.product._id === productId ? { ...item, quantity } : item
                    ),
                })),
        }),
        { name: "cart-store" }
    )
);

export default userCartStore;
