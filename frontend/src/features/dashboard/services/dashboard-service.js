function delay(data, ms = 600) {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export function fetchDashboardStats() {
  return delay({
    atsScore: 82,
    resumeMatch: 76,
    interviewScore: 88,
    hiringProbability: 71,
    communicationScore: 84,
  });
}

export function fetchRecentInterviews() {
  return delay([
    {
      id: "int_1",
      role: "Senior Frontend Engineer",
      company: "Nimbus Labs",
      date: "2026-07-28",
      score: 91,
      status: "completed",
      durationMinutes: 32,
    },
    {
      id: "int_2",
      role: "Product Designer",
      company: "Fractal",
      date: "2026-07-24",
      score: 78,
      status: "completed",
      durationMinutes: 28,
    },
    {
      id: "int_3",
      role: "Backend Engineer",
      company: "Orbital",
      date: "2026-07-20",
      score: 65,
      status: "completed",
      durationMinutes: 35,
    },
    {
      id: "int_4",
      role: "Data Analyst",
      company: "Ledgerly",
      date: "2026-08-02",
      score: 0,
      status: "scheduled",
      durationMinutes: 30,
    },
  ]);
}

export function fetchSkillRadar() {
  return delay([
    { skill: "Communication", score: 84 },
    { skill: "Technical Depth", score: 76 },
    { skill: "Problem Solving", score: 88 },
    { skill: "Structure", score: 91 },
    { skill: "Confidence", score: 69 },
    { skill: "Relevance", score: 80 },
  ]);
}

export function fetchWeeklyProgress() {
  return delay([
    { week: "Wk 1", atsScore: 58, interviewScore: 52 },
    { week: "Wk 2", atsScore: 63, interviewScore: 60 },
    { week: "Wk 3", atsScore: 68, interviewScore: 65 },
    { week: "Wk 4", atsScore: 74, interviewScore: 73 },
    { week: "Wk 5", atsScore: 78, interviewScore: 80 },
    { week: "Wk 6", atsScore: 82, interviewScore: 88 },
  ]);
}
