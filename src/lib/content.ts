export const profile = {
  name: "Muhammad Faiq Khan",
  email: "Faiqkhan2525@gmail.com",
  phone: "+923199463735",
  location: "Islamabad, Pakistan",
};

export const workflow = [
  { title: "Customer", status: "LISTENING", detail: "A customer reaches out. The system captures the request, whatever the channel." },
  { title: "AI agent", status: "PROCESSING", detail: "An intelligent agent understands the request and identifies what the customer needs." },
  { title: "Qualification", status: "QUALIFIED", detail: "Service type, location and urgency are checked against your business rules." },
  { title: "Availability", status: "SLOT AVAILABLE", detail: "The system checks working hours and existing appointments to avoid double bookings." },
  { title: "Appointment", status: "BOOKING", detail: "A valid time is reserved and the appointment is linked to the customer." },
  { title: "CRM / database", status: "SYNCING", detail: "Customer details and appointment records stay connected in one place." },
  { title: "Calendar", status: "SYNCED", detail: "The confirmed appointment appears in the team's calendar." },
  { title: "Confirmation", status: "CONFIRMED", detail: "The customer receives their appointment details through the appropriate channel." },
  { title: "Follow-up", status: "SCHEDULED", detail: "Reminders and follow-ups keep the conversation moving without repetitive admin." },
];

export const modules = [
  { title: "AI voice agents", outcome: "Turn missed calls into conversations.", description: "Give customers a first point of contact that can understand requests, qualify needs and move toward booking — even outside office hours.", input: "Incoming customer call", action: "Understand intent + qualify", output: "A clear next step", icon: "voice" },
  { title: "Appointment automation", outcome: "Fill the calendar. Skip the back-and-forth.", description: "Connect availability checks, conflict detection, booking, calendar updates and reminders into one coordinated flow.", input: "Requested appointment", action: "Check availability + book", output: "Confirmed appointment", icon: "calendar" },
  { title: "Lead qualification", outcome: "Find the opportunities worth your time.", description: "Capture the right details and evaluate each request against your service area, business rules and customer needs.", input: "New inbound enquiry", action: "Evaluate your business rules", output: "Qualified opportunity", icon: "lead" },
  { title: "CRM automation", outcome: "One conversation. One connected record.", description: "Keep lead details, conversation history and appointment updates in sync across your CRM and connected tools.", input: "Customer activity", action: "Match + update records", output: "Synchronized CRM", icon: "database" },
  { title: "Customer follow-up", outcome: "Keep good opportunities from going quiet.", description: "Build timely, relevant follow-ups around customer activity, with sensible stop conditions and a clear handoff to your team.", input: "Unanswered enquiry", action: "Wait + check + follow up", output: "Conversation continued", icon: "message" },
  { title: "Reactivation systems", outcome: "Reconnect with customers who know you.", description: "Identify eligible past customers and build permission-aware outreach around relevant services and maintenance needs.", input: "Eligible past customer", action: "Personalize relevant outreach", output: "A new opportunity", icon: "refresh" },
  { title: "Business workflows", outcome: "Make the repetitive parts run themselves.", description: "Connect forms, email, databases and APIs so routine information moves where it belongs, with exceptions surfaced for review.", input: "Business event", action: "Route + transform + execute", output: "Work completed", icon: "workflow" },
  { title: "Custom AI agents", outcome: "Intelligence built around your operation.", description: "Give an agent the context, tools and boundaries it needs to handle a specific business process and escalate when a human is needed.", input: "Task + business context", action: "Reason + use connected tools", output: "An actionable result", icon: "agent" },
] as const;
