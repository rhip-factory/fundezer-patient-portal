import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export type NotificationKind =
  | "application"
  | "campaign"
  | "donation"
  | "treatment";

export type PortalNotification = {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  time: string;
  read: boolean;
  target: string;
};

export type PortalDocument = {
  id: string;
  name: string;
  category: "Medical" | "Identity" | "Treatment" | "Supporting";
  type: string;
  date: string;
  status: "Verified" | "Under review" | "Action needed";
};

export type PatientProfile = {
  fullName: string;
  email: string;
  phone: string;
  nin: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;
  kinName: string;
  kinPhone: string;
  kinRelation: string;
};

export type UploadStatus = "empty" | "uploading" | "uploaded" | "error";

export type UploadSlot = {
  status: UploadStatus;
  fileName?: string;
  progress: number;
};

export type DocSpec = {
  id: string;
  title: string;
  description: string;
  required: boolean;
  fileName: string;
};

/* ------------------------------------------------------------------ */
/* Portal seed data                                                   */
/* ------------------------------------------------------------------ */

export const hospitals = [
  {
    id: "alliance",
    name: "Alliance Hospital",
    city: "Abuja",
    specialty: "Multispecialty & fertility care",
  },
  {
    id: "nnpc",
    name: "NNPC Multispecialty Hospital",
    city: "Abuja",
    specialty: "General & specialist medicine",
  },
  {
    id: "cedarcrest",
    name: "Cedarcrest Hospital",
    city: "Abuja",
    specialty: "Cardiology, orthopaedics & surgery",
  },
  {
    id: "nisa",
    name: "Nisa Premier Hospital",
    city: "Abuja",
    specialty: "Maternal health & surgery",
  },
];

export const storyQuestions = [
  {
    id: "illness",
    question: "What illness do you have?",
    helper: "Use the name your doctor gave you, in your own words.",
    placeholder: "For example: a heart valve problem called mitral valve defect",
  },
  {
    id: "diagnosed",
    question: "When were you diagnosed?",
    helper: "An approximate month and year is fine.",
    placeholder: "For example: April 2026",
  },
  {
    id: "who",
    question: "Who diagnosed you?",
    helper: "The hospital, clinic or doctor who confirmed your condition.",
    placeholder: "For example: the cardiology team at Cedarcrest Hospital",
  },
  {
    id: "before",
    question: "Have you received treatment before?",
    helper: "Tell us about any medication, tests or procedures so far.",
    placeholder: "For example: I have been on medication since May 2026",
  },
  {
    id: "affects",
    question: "How does the illness affect your life?",
    helper: "Share how it affects your work, family or daily routine.",
    placeholder: "For example: I get breathless and can no longer teach full days",
  },
  {
    id: "why",
    question: "Why do you need financial support?",
    helper: "Help donors understand your situation. No judgement here.",
    placeholder: "For example: the surgery costs far more than my family can raise",
  },
  {
    id: "delayed",
    question: "What happens if treatment is delayed?",
    helper: "Share what your doctors have told you about waiting.",
    placeholder: "For example: my doctors say my heart function will keep weakening",
  },
] as const;

export const documentSpecs: DocSpec[] = [
  {
    id: "diagnosis",
    title: "Diagnosis",
    description: "A signed diagnosis report from your doctor or hospital.",
    required: true,
    fileName: "Diagnosis_Report.pdf",
  },
  {
    id: "labs",
    title: "Lab reports",
    description: "Blood work or laboratory results related to your condition.",
    required: true,
    fileName: "Lab_Results_Aug2026.pdf",
  },
  {
    id: "prescriptions",
    title: "Prescriptions",
    description: "Current medication prescribed by your care team.",
    required: true,
    fileName: "Prescription_List.pdf",
  },
  {
    id: "scans",
    title: "Scans",
    description: "Echo, X-ray, MRI or other imaging reports.",
    required: true,
    fileName: "Echocardiogram_Report.pdf",
  },
  {
    id: "pictures",
    title: "Pictures",
    description: "A clear photo of yourself for your campaign page.",
    required: true,
    fileName: "Patient_Photo.jpg",
  },
  {
    id: "govid",
    title: "Government ID",
    description: "National ID, voter's card, passport or driver's licence.",
    required: true,
    fileName: "National_ID_Card.jpg",
  },
  {
    id: "videos",
    title: "Videos",
    description: "An optional short video message for donors.",
    required: false,
    fileName: "Patient_Message.mp4",
  },
  {
    id: "referral",
    title: "Referral letters",
    description: "Letters referring you to your selected hospital.",
    required: false,
    fileName: "Referral_Letter.pdf",
  },
  {
    id: "supporting",
    title: "Supporting documents",
    description: "Anything else that supports your application.",
    required: false,
    fileName: "Guardian_Consent.pdf",
  },
];

export const campaign = {
  title: "Help Amina complete her heart surgery",
  hospital: "Cedarcrest Hospital, Abuja",
  raised: 4850000,
  goal: 12000000,
  donors: 127,
  diagnosis:
    "Severe mitral valve defect confirmed by the cardiology team at Cedarcrest Hospital, Abuja.",
  treatmentPlan:
    "Mitral valve repair surgery with a 5-day inpatient stay, followed by eight weeks of cardiac rehabilitation and two follow-up reviews.",
  story:
    "In April 2026, Amina was diagnosed with a severe mitral valve defect after months of breathlessness and fatigue. Her cardiology team at Cedarcrest Hospital confirmed that valve repair surgery is the only path to a full recovery. Amina is a secondary school teacher and the primary carer for her younger brother, and the cost of surgery is far beyond what her family can raise alone.",
};

export const application = {
  id: "FEZ-2026-00482",
  submitted: "04 August 2026",
  hospital: "Cedarcrest Hospital",
  status: "Under hospital review",
};

export const treatmentUpdates = [
  {
    id: "t1",
    title: "Treatment started",
    date: "22 August 2026",
    hospital: "Cedarcrest Hospital",
    body: "Your hospital has confirmed that treatment has started. Your care team has admitted you for mitral valve repair surgery and will share progress notes after each review.",
  },
  {
    id: "t2",
    title: "Surgery date scheduled",
    date: "18 August 2026",
    hospital: "Cedarcrest Hospital",
    body: "Cedarcrest Hospital scheduled your valve repair surgery for 22 August 2026. Please arrive by 7:00am with your admission letter.",
  },
  {
    id: "t3",
    title: "Pre-surgery assessment complete",
    date: "12 August 2026",
    hospital: "Cedarcrest Hospital",
    body: "Your pre-surgery assessment was completed and your cardiology team confirmed you are fit for the planned procedure.",
  },
];

const initialNotifications: PortalNotification[] = [
  {
    id: "n1",
    kind: "treatment",
    title: "New treatment update",
    body: "Cedarcrest Hospital added a note to your treatment record.",
    time: "2 hours ago",
    read: false,
    target: "/portal/treatment",
  },
  {
    id: "n2",
    kind: "donation",
    title: "Donation received",
    body: "₦50,000 was donated to your campaign by Anonymous.",
    time: "5 hours ago",
    read: false,
    target: "/portal/campaign",
  },
  {
    id: "n3",
    kind: "campaign",
    title: "Your campaign is now live",
    body: "Your campaign is published and accepting donations.",
    time: "Yesterday",
    read: false,
    target: "/portal/campaign",
  },
  {
    id: "n4",
    kind: "application",
    title: "Your application has been approved",
    body: "Cedarcrest Hospital verified your application details.",
    time: "2 days ago",
    read: true,
    target: "/portal/application",
  },
  {
    id: "n5",
    kind: "application",
    title: "Your application has been received",
    body: "Application FEZ-2026-00482 was submitted successfully.",
    time: "4 August 2026",
    read: true,
    target: "/portal/application",
  },
];

const initialDocuments: PortalDocument[] = [
  {
    id: "d1",
    name: "Cardiology diagnosis report",
    category: "Medical",
    type: "PDF · 1.2 MB",
    date: "04 Aug 2026",
    status: "Verified",
  },
  {
    id: "d2",
    name: "Laboratory results",
    category: "Medical",
    type: "PDF · 640 KB",
    date: "04 Aug 2026",
    status: "Verified",
  },
  {
    id: "d3",
    name: "National ID card",
    category: "Identity",
    type: "JPG · 820 KB",
    date: "03 Aug 2026",
    status: "Verified",
  },
  {
    id: "d4",
    name: "Proof of address",
    category: "Identity",
    type: "PDF · 310 KB",
    date: "03 Aug 2026",
    status: "Under review",
  },
  {
    id: "d5",
    name: "Surgery admission letter",
    category: "Treatment",
    type: "PDF · 220 KB",
    date: "22 Aug 2026",
    status: "Verified",
  },
  {
    id: "d6",
    name: "Guardian consent form",
    category: "Supporting",
    type: "PDF · 180 KB",
    date: "03 Aug 2026",
    status: "Action needed",
  },
];

const initialProfile: PatientProfile = {
  fullName: "Amina Yusuf",
  email: "amina.yusuf@email.com",
  phone: "+234 803 114 2288",
  nin: "2381 5540 9917",
  dateOfBirth: "1992-03-14",
  gender: "Female",
  address: "18 Ademola Crescent, Wuse II, Abuja",
  emergencyName: "Fatima Yusuf",
  emergencyPhone: "+234 806 552 0091",
  emergencyRelation: "Sister",
  kinName: "Ibrahim Yusuf",
  kinPhone: "+234 802 771 3345",
  kinRelation: "Father",
};

const savedAnswers = [
  "A heart valve problem my doctors call a severe mitral valve defect.",
  "April 2026, after months of breathlessness.",
  "The cardiology team at Cedarcrest Hospital, Abuja.",
  "Yes, I have been on medication since May 2026 and had two reviews.",
  "I get breathless climbing stairs and can no longer teach full school days.",
  "The surgery costs far more than my family can raise on a teacher's salary.",
  "My doctors say my heart function will keep weakening and the risk grows.",
];

/* ------------------------------------------------------------------ */
/* Story generation                                                   */
/* ------------------------------------------------------------------ */

export function buildStory(answers: string[], name: string) {
  const first = (name || "The patient").trim().split(" ")[0];
  const [illness, when, who, before, affects, why, delayed] = answers.map((a) =>
    (a || "").trim().replace(/\.$/, ""),
  );
  const parts = [
    `${first} is living with ${illness || "a serious medical condition"}, diagnosed in ${when || "recent months"} by ${who || "a partner hospital care team"}.`,
    before
      ? `So far, ${first} has managed the condition as best as possible: ${before.toLowerCase()}.`
      : `${first} has not been able to begin the treatment that is now needed.`,
    affects ? `Day to day, ${affects.toLowerCase()}.` : "",
    why
      ? `${first} is asking for help because ${why.toLowerCase()}.`
      : `${first} is asking for help to cover the cost of treatment.`,
    delayed
      ? `If treatment is delayed, ${delayed.toLowerCase()}.`
      : "",
    `Every donation goes directly to the verified partner hospital handling ${first}'s care, so support reaches treatment and nothing else.`,
  ].filter(Boolean);
  const words = parts.join(" ").split(/\s+/);
  return words.slice(0, 200).join(" ");
}

export const wordCount = (text: string) =>
  text.trim() ? text.trim().split(/\s+/).length : 0;

/* ------------------------------------------------------------------ */
/* Context                                                            */
/* ------------------------------------------------------------------ */

type FlowState = {
  country: string;
  state: string;
  hospitalId: string | null;
  answers: string[];
  story: string;
  uploads: Record<string, UploadSlot>;
  submitted: boolean;
};

const emptyUploads = (): Record<string, UploadSlot> =>
  Object.fromEntries(
    documentSpecs.map((d) => [d.id, { status: "empty", progress: 0 }]),
  ) as Record<string, UploadSlot>;

const initialFlow: FlowState = {
  country: "",
  state: "",
  hospitalId: null,
  answers: storyQuestions.map(() => ""),
  story: "",
  uploads: emptyUploads(),
  submitted: false,
};

type PortalContextValue = {
  /* application flow */
  flow: FlowState;
  setLocation: (country: string, state: string) => void;
  setHospital: (id: string) => void;
  setAnswer: (index: number, value: string) => void;
  setStory: (value: string) => void;
  startUpload: (id: string) => void;
  removeUpload: (id: string) => void;
  markSubmitted: () => void;
  resetFlow: () => void;
  prefillSavedApplication: () => void;
  requiredUploaded: number;
  requiredTotal: number;
  missingRequired: DocSpec[];
  hospitalName: string;
  /* portal */
  notifications: PortalNotification[];
  unreadCount: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
  documents: PortalDocument[];
  profile: PatientProfile;
  updateProfile: (next: PatientProfile) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
};

const PortalContext = createContext<PortalContextValue | null>(null);

export function PortalProvider({ children }: { children: ReactNode }) {
  const [flow, setFlow] = useState<FlowState>(initialFlow);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [documents] = useState(initialDocuments);
  const [profile, setProfile] = useState(initialProfile);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const startUpload = useCallback((id: string) => {
    const spec = documentSpecs.find((d) => d.id === id);
    setFlow((prev) => ({
      ...prev,
      uploads: { ...prev.uploads, [id]: { status: "uploading", progress: 0 } },
    }));
    let progress = 0;
    const tick = setInterval(() => {
      progress += 20;
      if (progress >= 100) {
        clearInterval(tick);
        setFlow((prev) => ({
          ...prev,
          uploads: {
            ...prev.uploads,
            [id]: {
              status: "uploaded",
              progress: 100,
              fileName: spec?.fileName ?? "document.pdf",
            },
          },
        }));
      } else {
        setFlow((prev) => ({
          ...prev,
          uploads: { ...prev.uploads, [id]: { status: "uploading", progress } },
        }));
      }
    }, 220);
  }, []);

  const value = useMemo<PortalContextValue>(() => {
    const requiredSpecs = documentSpecs.filter((d) => d.required);
    const missingRequired = requiredSpecs.filter(
      (d) => flow.uploads[d.id]?.status !== "uploaded",
    );
    return {
      flow,
      setLocation: (country, state) =>
        setFlow((prev) => ({ ...prev, country, state })),
      setHospital: (id) => setFlow((prev) => ({ ...prev, hospitalId: id })),
      setAnswer: (index, value) =>
        setFlow((prev) => {
          const answers = [...prev.answers];
          answers[index] = value;
          return { ...prev, answers };
        }),
      setStory: (story) => setFlow((prev) => ({ ...prev, story })),
      startUpload,
      removeUpload: (id) =>
        setFlow((prev) => ({
          ...prev,
          uploads: { ...prev.uploads, [id]: { status: "empty", progress: 0 } },
        })),
      markSubmitted: () => setFlow((prev) => ({ ...prev, submitted: true })),
      resetFlow: () => setFlow({ ...initialFlow, uploads: emptyUploads() }),
      prefillSavedApplication: () =>
        setFlow({
          country: "Nigeria",
          state: "Abuja",
          hospitalId: "cedarcrest",
          answers: [...savedAnswers],
          story: buildStory(savedAnswers, initialProfile.fullName),
          uploads: emptyUploads(),
          submitted: false,
        }),
      requiredUploaded: requiredSpecs.length - missingRequired.length,
      requiredTotal: requiredSpecs.length,
      missingRequired,
      hospitalName:
        hospitals.find((h) => h.id === flow.hospitalId)?.name ??
        application.hospital,
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
      markRead: (id) =>
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
        ),
      markAllRead: () =>
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true }))),
      documents,
      profile,
      updateProfile: setProfile,
      sidebarCollapsed,
      toggleSidebar: () => setSidebarCollapsed((v) => !v),
    };
  }, [flow, notifications, documents, profile, sidebarCollapsed, startUpload]);

  return (
    <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
  );
}

export function usePortal() {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error("usePortal must be used inside PortalProvider");
  return ctx;
}

export const naira = (value: number) => `₦${value.toLocaleString("en-NG")}`;
