import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

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
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  emergencyName: string;
  emergencyRelation: string;
  emergencyPhone: string;
  kinName: string;
  kinRelation: string;
  kinPhone: string;
};

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
    name: "Hospital treatment estimate",
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
  dateOfBirth: "14 March 1992",
  gender: "Female",
  bloodGroup: "O+",
  phone: "+234 803 114 2288",
  email: "amina.yusuf@email.com",
  address: "18 Ademola Street, Ikoyi",
  city: "Lagos, Nigeria",
  emergencyName: "Fatima Yusuf",
  emergencyRelation: "Sister",
  emergencyPhone: "+234 806 552 0091",
  kinName: "Ibrahim Yusuf",
  kinRelation: "Father",
  kinPhone: "+234 802 771 3345",
};

export const campaign = {
  title: "Help Amina complete her heart surgery",
  hospital: "Cedarcrest Hospital, Lagos",
  raised: 4850000,
  goal: 12000000,
  donors: 127,
  story:
    "In April 2026, Amina was diagnosed with a severe mitral valve defect after months of breathlessness and fatigue. Her cardiology team at Cedarcrest Hospital confirmed that valve repair surgery is the only path to a full recovery. Amina is a secondary school teacher and the primary carer for her younger brother, and the cost of surgery is far beyond what her family can raise alone.",
  treatmentInfo:
    "Mitral valve repair surgery with a 5-day inpatient stay, followed by eight weeks of cardiac rehabilitation and two follow-up reviews.",
};

export const application = {
  id: "FEZ-2026-00482",
  submitted: "04 August 2026",
  hospital: "Cedarcrest Hospital",
  status: "Under hospital review",
};

type PortalContextValue = {
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
  const [notifications, setNotifications] = useState(initialNotifications);
  const [documents] = useState(initialDocuments);
  const [profile, setProfile] = useState(initialProfile);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const value = useMemo<PortalContextValue>(
    () => ({
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
    }),
    [notifications, documents, profile, sidebarCollapsed],
  );

  return (
    <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
  );
}

export function usePortal() {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error("usePortal must be used inside PortalProvider");
  return ctx;
}

export const naira = (value: number) =>
  `₦${value.toLocaleString("en-NG")}`;
