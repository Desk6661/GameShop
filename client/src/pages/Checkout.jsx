import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";

function Checkout() {
    const {
        cart,
        clearCart
    } = useCart();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getFinalPrice = (item) => {
        return item.price - (item.price * item.discount) / 100;
    };

    const total = cart.reduce((sum, item) => {
        return sum + getFinalPrice(item) * item.quantity;
    }, 0);

    const handlePlaceOrder = async () => {
        try {
            setLoading(true);
            setError("");

            const items = cart.map((item) => ({
                gameId: item._id,
                quantity: item.quantity
            }));

            await createOrder(items);

            clearCart();

            navigate("/order-success");
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to place order"
            );
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
                <div className="mx-auto max-w-2xl text-center">

                    <h1 className="text-3xl font-bold">
                        Your cart is empty
                    </h1>

                    <p className="mt-3 text-zinc-400">
                        Add some games before checking out.
                    </p>

                    <Link
                        to="/"
                        className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-black"
                    >
                        Browse Games
                    </Link>

                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 px-6 py-10 text-white">

            <div className="mx-auto max-w-5xl">

                <h1 className="text-4xl font-bold">
                    Checkout
                </h1>

                <p className="mt-2 text-zinc-400">
                    Review your order before placing it.
                </p>

                {error && (
                    <div className="mt-6 rounded-lg border border-red-900 bg-red-950/40 p-4 text-red-400">
                        {error}
                    </div>
                )}

                <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_350px]">

                    {/* Items */}
                    <div className="space-y-4">

                        <h2 className="text-xl font-semibold">
                            Your Games
                        </h2>

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
                                        className="h-24 w-36 rounded-lg object-cover"
                                    />

                                    <div className="flex-1">

                                        <h3 className="font-semibold">
                                            {item.title}
                                        </h3>

                                        <p className="mt-1 text-sm text-zinc-500">
                                            Quantity: {item.quantity}
                                        </p>

                                        <p className="mt-3 font-semibold">
                                            ₹{Math.round(finalPrice)}
                                        </p>

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
                                    (sum, item) =>
                                        sum + item.quantity,
                                    0
                                )}
                            </span>
                        </div>

                        <div className="mt-3 flex justify-between text-zinc-400">
                            <span>Subtotal</span>

                            <span>
                                ₹{Math.round(total)}
                            </span>
                        </div>

                        <div className="my-6 border-t border-zinc-800" />

                        <div className="flex justify-between text-xl font-bold">
                            <span>Total</span>

                            <span>
                                ₹{Math.round(total)}
                            </span>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            disabled={loading}
                            className={`mt-6 w-full rounded-lg px-5 py-3 font-semibold text-black transition ${
                                loading
                                    ? "cursor-not-allowed bg-zinc-500"
                                    : "bg-white hover:bg-zinc-200"
                            }`}
                        >
                            {loading
                                ? "Placing Order..."
                                : "Place Order"}
                        </button>

                        <p className="mt-3 text-center text-xs text-zinc-500">
                            This is currently a demo checkout.
                        </p>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default Checkout;