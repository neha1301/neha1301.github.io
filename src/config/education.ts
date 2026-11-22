export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  period: string;
  startYear: string;
  endYear: string;
}

/**
 * Kept deliberately minimal — education is context, not the headline.
 * GPA and coursework live on the resume; this page is about production work.
 */
export const education: Education = {
  id: "btech-cse",
  degree: "Bachelor of Technology (B.Tech)",
  field: "Computer Science and Engineering",
  institution: "Mody University of Science and Technology",
  period: "2020 – 2024",
  startYear: "2020",
  endYear: "2024",
};

