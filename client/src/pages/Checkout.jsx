import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Checkout() {
  const { id, plan } = useParams();
  const navigate = useNavigate();

  const [paymentEnabled, setPaymentEnabled] = useState(true);
  const [error, setError] = useState("");

  // ✅ Price mapping (temporary)
  const planPrices = {
    Indivisual: 549,
    Team: 1999,
  };

  const amount = plan ? planPrices[plan] : 500;

  // 🔹 STEP 1: CHECK PAYMENT STATUS (KYC)
  useEffect(() => {
    fetch("http://localhost:5000/payment/status")
      .then((res) => res.json())
      .then((data) => {
        setPaymentEnabled(data.enabled);
        if (!data.enabled) {
          setError(data.message);
        }
      })
      .catch(() => {
        setPaymentEnabled(false);
        setError("Unable to check payment status. Please try later.");
      });
  }, []);

  // 🔹 STEP 2: HANDLE PAYMENT
  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      if (!paymentEnabled) {
        return;
      }

      // 1️⃣ Create order
      const res = await fetch(
        "http://localhost:5000/payments/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount }),
        }
      );

      if (!res.ok) {
        throw new Error("Order creation failed");
      }

      const order = await res.json();

      // 2️⃣ Open Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Learning Hub",
        description: plan
          ? `${plan.toUpperCase()} Plan`
          : "Course Enrollment",
        order_id: order.id,
        handler: function () {
          alert("Payment successful!");
          if (id) navigate(`/learn/${id}`);
          else navigate("/profile");
        },
        theme: {
          color: "#facc15",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Payment failed. Please try again later.");
    }
  };

  return (
    <section className="min-h-screen bg-[#f7f6ef] px-6 py-20 text-[#111]">
      <div className="max-w-xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-gray-600">
            Secure payment powered by Razorpay
          </p>
        </div>

        {/* CHECKOUT CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-8">

          {/* ⚠️ PAYMENT NOTICE */}
          {!paymentEnabled && (
            <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-800">
              ⚠️ <strong>Payments Temporarily Disabled</strong>
              <br />
              {error}
            </div>
          )}

          {/* PURCHASE INFO */}
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              {plan ? "Selected Plan" : "Selected Course"}
            </p>

            <p className="text-lg font-semibold">
              {plan ? `${plan.toUpperCase()} Plan` : "Course Enrollment"}
            </p>
          </div>

          {/* PRICE */}
          <div className="flex items-center justify-between border-t border-b border-gray-200 py-6">
            <span className="text-gray-600">Total Amount</span>
            <span className="text-3xl font-bold">₹{amount}</span>
          </div>

          {/* ACTIONS */}
          <div className="space-y-4">
            <button
              onClick={handlePayment}
              disabled={!paymentEnabled}
              className={`w-full rounded-md py-3 text-sm font-semibold transition
                ${
                  paymentEnabled
                    ? "bg-[#facc15] text-black hover:bg-[#fbbf24]"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
            >
              {paymentEnabled
                ? "Pay Securely"
                : "Payments Temporarily Unavailable"}
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full rounded-md border border-gray-300 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
            >
              Go Back
            </button>
          </div>

          {/* TRUST TEXT */}
          <p className="text-xs text-gray-500 text-center pt-2">
            Your payment is encrypted and securely processed
          </p>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
