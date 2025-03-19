import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext"; // Import the useAuth hook

function Events() {
  const { token, isLoggedIn} = useAuth(); // Retrieve the token from context
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/events", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [token]); // Re-fetch events if the token changes

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

  const today = new Date();
  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const diffDays = (eventDate - today) / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 2; // Within the next 2 days
  });

  const futureEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const diffDays = (eventDate - today) / (1000 * 60 * 60 * 24);
    return diffDays > 2; // More than 2 days ahead
  });

  const completedEvents = events.filter((event) => new Date(event.date) < today);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">🎉 Events Dashboard</h1>

      {/* Upcoming Events */}
      <section>
        <h2 className="mb-3 text-primary">⏳ Upcoming Events (Next 2 Days)</h2>
        <div className="row">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => <EventCard key={event._id} event={event} />)
          ) : (
            <p className="text-muted">No upcoming events.</p>
          )}
        </div>
      </section>

      {/* Future Events */}
      <section className="mt-4">
        <h2 className="mb-3 text-success">🚀 Future Events</h2>
        <div className="row">
          {futureEvents.length > 0 ? (
            futureEvents.map((event) => <EventCard key={event._id} event={event} />)
          ) : (
            <p className="text-muted">No future events.</p>
          )}
        </div>
      </section>

      {/* Completed Events */}
      <section className="mt-4">
        <h2 className="mb-3 text-danger">✅ Completed Events</h2>
        <div className="row">
          {completedEvents.length > 0 ? (
            completedEvents.map((event) => <EventCard key={event._id} event={event} />)
          ) : (
            <p className="text-muted">No completed events.</p>
          )}
        </div>
      </section>
    </div>
  );
}

function EventCard({ event }) {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{event.name}</h5>
          <p className="card-text"><strong>📅 Date:</strong> {new Date(event.date).toDateString()}</p>
          <p className="card-text"><strong>📍 Venue:</strong> {event.venue}</p>
          <p className="card-text"><strong>🎭 Type:</strong> {event.eventType}</p>
          <Link to={`/event/${event._id}`} className="btn btn-primary">View Details</Link>
        </div>
      </div>
    </div>
  );
}

export default Events;