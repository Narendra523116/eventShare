import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext"; // Import the useAuth hook

function EventDetails() {
  const { id } = useParams();
  const { token, isLoggedIn, user } = useAuth(); // Retrieve token & user info
  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`https://eventshare-2.onrender.com/api/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvent(response.data);

        // Check if user is already registered
        if (Array.isArray(response.data.participants) && user?.id) {
          setIsRegistered(response.data.participants.includes(user.id));
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError("Failed to fetch event details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchEventDetails();
    } else {
      setLoading(false); // Reset loading state if user is not logged in
    }
  }, [token, isLoggedIn, user?.id, id]);

  const handleRegister = async () => {
    try {
      await axios.post(
        `https://eventshare-2.onrender.com/api/events/register/${id}`,
        { id: user.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsRegistered(true);
      setError(""); // Clear any previous errors
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
    }
  };

  const handleWithdraw = async () => {
    try {
      await axios.post(
        `https://eventshare-2.onrender.com/api/events/${id}/withdraw`,
        { userId: user.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsRegistered(false);
      setError(""); // Clear any previous errors
    } catch (error) {
      console.error("Withdrawal failed:", error);
      setError("Withdrawal failed. Please try again.");
    }
  };

  // If user is not logged in, show access restriction message
  if (!isLoggedIn) {
    return (
      <div className="container my-5 text-center">
        <h2 className="text-danger">🔒 Access Restricted</h2>
        <p className="lead">You need to log in to view events.</p>
        <Link to="/login" className="btn btn-primary btn-lg px-4">
          Log In
        </Link>
      </div>
    );
  }

  if (loading) return <p className="text-center text-muted">Loading...</p>;

  if (!event) {
    return (
      <div className="container my-5 text-center">
        <h2 className="text-danger">Error</h2>
        <p className="lead">{error || "Event not found."}</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card p-4 shadow-sm">
        <h1 className="text-center mb-3">{event.name}</h1>
        <p className="text-muted text-center">
          <strong>📅 {new Date(event.date).toDateString()}</strong> • {event.venue}
        </p>
        <p className="lead">{event.description}</p>

        <h3 className="mt-4">👥 Organizers</h3>
        <ul className="list-group">
          {event.organizers.map((org) => (
            <li key={org._id} className="list-group-item">
              {org.name} ({org.role})
            </li>
          ))}
        </ul>

        <h3 className="mt-4">✅ Approved By</h3>
        <ul className="list-group">
          {event.approvedBy.map((approver) => (
            <li key={approver._id} className="list-group-item">
              {approver.name} ({approver.role})
            </li>
          ))}
        </ul>

        <p
          className={`mt-4 badge bg-${event.isCompleted ? "success" : "warning"} text-white`}
        >
          {event.isCompleted ? "✔ Event Completed" : "⏳ Event Upcoming"}
        </p>

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger mt-4">
            {error}
          </div>
        )}

        {/* Register/Withdraw Button */}
        <div className="text-center mt-4">
          {isRegistered ? (
            <button className="btn btn-danger btn-lg px-4" onClick={handleWithdraw}>
              Withdraw from Event
            </button>
          ) : (
            <button className="btn btn-success btn-lg px-4" onClick={handleRegister}>
              Register for Event
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetails;