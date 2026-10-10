export type Scenario = "available" | "conflict" | "after-hours";
export type SimulationStep = { title: string; detail: string; state: "success" | "review" | "skipped" };

/** Deterministic, local-only demonstration. No API calls or real bookings. */
export function simulateAppointment(scenario: Scenario, service: string): SimulationStep[] {
  const available = scenario === "available";
  const time = scenario === "after-hours" ? "19:00" : "10:00";
  return [
    { title: "Customer request", detail: `${service} requested for tomorrow at ${time}.`, state: "success" },
    { title: "AI processing", detail: "Extract service, requested time and appointment intent from the sample request.", state: "success" },
    { title: "Database lookup", detail: "Consult sample customer information and existing appointments.", state: "success" },
    { title: "Availability check", detail: scenario === "conflict" ? "An existing sample appointment occupies 10:00." : scenario === "after-hours" ? "19:00 falls outside the sample working hours of 09:00–17:00." : "10:00 is within working hours and has no sample appointment conflict.", state: available ? "success" : "review" },
    { title: "Decision", detail: available ? "The requested time passes the booking rules." : "Do not book this time. Suggest tomorrow at 14:00 instead.", state: available ? "success" : "review" },
    { title: "Appointment & calendar", detail: available ? "Prepare a simulated appointment record and calendar synchronization." : "Skip booking and calendar updates until another time is accepted.", state: available ? "success" : "skipped" },
    { title: "Confirmation prepared", detail: available ? `Draft: Your ${service.toLowerCase()} is confirmed for tomorrow at 10:00.` : "Draft: That time is unavailable. Would tomorrow at 14:00 work?", state: "success" },
    { title: "Follow-up", detail: available ? "Prepare a simulated appointment reminder. Nothing is sent." : "Wait for the customer's choice before progressing. Nothing is sent.", state: "success" },
  ];
}
