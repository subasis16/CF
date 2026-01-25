import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [locked, setLocked] = useState(false);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:5000/courses/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

    
      // 🔒 Paid but not enrolled
if (res.status === 401) {
  navigate("/login", { state: { from: `/courses/${id}` } });
  return;
}

const data = await res.json();

if (res.status === 403) {
  setLocked(true);
  setPrice(data.price);
  setLoading(false);
  return;
}

setCourse(data.course);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, navigate]);

  /* ================= PAYMENT HANDLER ================= */
  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/payments/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            courseId: id,
            amount: price,
          }),
        }
      );

      const order = await res.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Learning Hub",
        description: "Course Enrollment",
        order_id: order.id,
        handler: async function () {
          alert("Payment successful!");
          navigate(`/learn/${id}`);
        },
        theme: {
          color: "#facc15",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Payment failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading course...
      </div>
    );
  }

  if (!course && !locked) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Course not found
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0b0f1a] via-[#050608] to-black px-6 py-20 text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          {course?.title || "Premium Course"}
        </h1>

        <div className="h-64 bg-neutral-900 rounded-xl flex items-center justify-center mb-8">
          <span className="text-white text-3xl">▶</span>
        </div>

        <p className="text-gray-300 mb-8 max-w-3xl">
          {course?.description || "Unlock full course access after enrollment."}
        </p>

        {/* ACTION */}
        {locked ? (
          <button
            onClick={() => navigate(`/checkout/course/${id}`)}
            className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-3 rounded-lg font-semibold"
          >
            Enroll for ₹{price}
          </button>
        ) : (
          <button
            onClick={() => navigate(`/learn/${id}`)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Start Learning
          </button>
        )}
      </div>
    </section>
  );
}

export default CourseDetails;

