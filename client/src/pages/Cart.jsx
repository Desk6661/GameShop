import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
    const {
        cart,
        removeFromCart,
        updateQuantity,
        clearCart
    } = useCart();

    const getFinalPrice = (item) => {
        return item.price - (item.price * item.discount) / 100;
    };

    const subtotal = cart.reduce((total, item) => {
        return total + getFinalPrice(item) * item.quantity;
    }, 0);

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
                <div className="mx-auto max-w-3xl text-center">

                    <h1 className="text-4xl font-bold">
                        Your Cart
                    </h1>

                    <p className="mt-4 text-zinc-400">
                        Your cart is empty.
                    </p>

                    <Link
                        to="/"
                        className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200"
                    >
                        Browse Games
                    </Link>

                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 px-6 py-10 text-white">

            <div className="mx-auto max-w-6xl">

                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-bold">
                        Your Cart
                    </h1>

                    <button
                        onClick={clearCart}
                        className="text-sm text-red-400 transition hover:text-red-300"
                    >
                        Clear Cart
                    </button>
                </div>

                <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_350px]">

                    {/* Cart items */}
                    <div className="space-y-4">

                        {cart.map((item) => {

                            const finalPrice =
                                getFinalPrice(item);

                            return (
                                <div
                                    key={item._id}
                                    className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4"
                                >

                                    <img
                                        src={item.coverImage}
                                        alt={item.title}
                                        className="h-28 w-44 rounded-lg object-cover"
                                    />

                                    <div className="flex flex-1 flex-col justify-between">

                                        <div>
                                            <h2 className="font-semibold">
                                                {item.title}
                                            </h2>

                                            <p className="mt-1 text-sm text-zinc-400">
                                                ₹{Math.round(finalPrice)}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between">

                                            {/* Quantity */}
                                            <div className="flex items-center gap-3">

                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item._id,
                                                            Math.max(
                                                                1,
                                                                item.quantity - 1
                                                            )
                                                        )
                                                    }
                                                    className="h-8 w-8 rounded bg-zinc-800 hover:bg-zinc-700"
                                                >
                                                    -
                                                </button>

                                                <span>
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item._id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    className="h-8 w-8 rounded bg-zinc-800 hover:bg-zinc-700"
                                                >
                                                    +
                                                </button>

                                            </div>

                                            <button
                                                onClick={() =>
                                                    removeFromCart(
                                                        item._id
                                                    )
                                                }
                                                className="text-sm text-red-400 hover:text-red-300"
                                            >
                                                Remove
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                    {/* Summary */}
                    <div className="h-fit rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

                        <h2 className="text-xl font-bold">
                            Order Summary
                        </h2>

                        <div className="mt-6 flex justify-between text-zinc-400">
                            <span>Items</span>

                            <span>
                                {cart.reduce(
                                    (total, item) =>
                                        total + item.quantity,
                                    0
                                )}
                            </span>
                        </div>

                        <div className="mt-3 flex justify-between text-zinc-400">
                            <span>Subtotal</span>

                            <span>
                                ₹{Math.round(subtotal)}
                            </span>
                        </div>

                        <div className="my-6 border-t border-zinc-800" />

                        <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>

                            <span>
                                ₹{Math.round(subtotal)}
                            </span>
                        </div>

                        <Link
                            to="/checkout"
                            className="mt-6 block w-full rounded-lg bg-white px-5 py-3 text-center font-semibold text-black transition hover:bg-zinc-200"
                        >
                            Proceed to Checkout
                        </Link>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default Cart;