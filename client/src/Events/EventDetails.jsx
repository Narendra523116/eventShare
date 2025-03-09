import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext"; // Import the useAuth hook

function EventDetails() {
  const { id } = useParams();
  const { token, isLoggedIn } = useAuth(); // Retrieve the token from context
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request
          },
        });
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [id, token]); // Re-fetch event details if the ID or token changes

  // If the user is not logged in, display a message
  if (!isLoggedIn) {
    return (
      <div className="container my-5 text-center">
        <h2 className="text-danger">🔒 Access Restricted</h2>
        <p className="lead">You need to log in to view events.</p>
        <Link to="/login" className="btn btn-primary">
          Log In
        </Link>
      </div>
    );
  }

  if (!event) return <p className="text-center text-muted">Loading...</p>;

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
      </div>
    </div>
  );
}

export default EventDetails;