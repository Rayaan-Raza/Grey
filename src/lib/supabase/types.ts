export type UserRole = "student" | "instructor" | "admin";

export type Profile = {
  id: string;
  full_name: string | null;
  role: UserRole;
  institution: string | null;
  specialty: string | null;
  license_number: string | null;
  avatar_url: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
};

export type CourseStatus = "draft" | "published" | "archived";

export type Course = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  subtitle: string | null;
  instructor_name: string | null;
  image_url: string | null;
  module_count: number;
  price_cents: number;
  status: CourseStatus;
  created_at: string;
  updated_at: string;
};

export type EnrollmentStatus = "active" | "completed" | "cancelled";

export type Enrollment = {
  id: string;
  user_id: string;
  course_id: string;
  progress: number;
  status: EnrollmentStatus;
  enrolled_at: string;
};

export type Workshop = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  image_url: string | null;
  location: string | null;
  starts_at: string | null;
  ends_at: string | null;
  capacity: number | null;
  status: CourseStatus;
  created_at: string;
  updated_at: string;
};

export type WorkshopWithMeta = Workshop & {
  registered_count: number;
  registered_by_me: boolean;
};

export type Resource = {
  id: string;
  title: string;
  description: string | null;
  file_url: string | null;
  resource_type: "document" | "video" | "link" | "other";
  course_id: string | null;
  category: string | null;
  file_size: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

export type EnrollmentWithCourse = Enrollment & {
  course: Course | null;
};

export type CourseWithStats = Course & {
  enrollment_count: number;
  avg_completion: number;
};

export type LearnerRow = {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string;
  avatar_url: string | null;
  courses: number;
  progress: number;
  status: "Active" | "Inactive";
  lastActive: string;
};

export type AssessmentListItem = {
  id: string;
  title: string;
  assessment_type: string;
  due_at: string | null;
  status: string;
  course_title: string | null;
  course_slug: string | null;
  my_submission: {
    score: number | null;
    status: string;
    cheated: boolean;
  } | null;
};

export type PublicQuestion = {
  id: string;
  prompt: string;
  options: string[];
  sort_order: number;
};
