const API_URL = "http://localhost:5000";

/**
 * Enroll user into a course
 */
export const enrollCourse = async (courseId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(`${API_URL}/enrollment/enroll`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ courseId }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Enrollment failed");
  }

  return res.json();
};

/**
 * Check if user is enrolled
 */
export const isEnrolled = async (courseId) => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  const res = await fetch(
    `${API_URL}/enrollment/check/${courseId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) return false;

  const data = await res.json();
  return data.enrolled;
};

export const getMyEnrollments = async () => {
  const token = localStorage.getItem("token");
  if (!token) return [];

  const res = await fetch("http://localhost:5000/enrollment/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return [];
  return res.json();
};
