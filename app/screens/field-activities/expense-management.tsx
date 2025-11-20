// ExpenseManagement.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { JSX, useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
  useWindowDimensions
} from "react-native";

/* ---------- Types & Data ---------- */
type ExpenseStatus = "Pending" | "Approved";

type Expense = {
  id: string;
  title: string;
  amount: number;
  type: string;
  date: string;
  location: string;
  status: ExpenseStatus;
};

const EXPENSES: Expense[] = [
  {
    id: "1",
    title: "Hospital Visit",
    amount: 1050,
    type: "TA/DA",
    date: "Nov 3, 2025",
    location: "Breach Candy Hospital",
    status: "Pending",
  },
  {
    id: "2",
    title: "Outstation Call",
    amount: 2500,
    type: "Other",
    date: "Nov 2, 2025",
    location: "Pune",
    status: "Pending",
  },
  {
    id: "3",
    title: "Clinic Visit",
    amount: 850,
    type: "TA/DA",
    date: "Oct 30, 2025",
    location: "Malabar Hill Clinic",
    status: "Approved",
  },
  {
    id: "4",
    title: "Local Travel",
    amount: 600,
    type: "TA/DA",
    date: "Oct 28, 2025",
    location: "Mumbai",
    status: "Approved",
  },
];

/* ---------- Responsive helper ---------- */
function useResponsive() {
  const { width } = useWindowDimensions();

  const isPhone = width < 768;
  const isTablet = width >= 768 && width < 1200;
  const isLaptop = width >= 1200;

  let containerWidth = Math.min(width - 32, 1000);
  if (isTablet) containerWidth = Math.min(width - 64, 1400);
  if (isLaptop) containerWidth = Math.min(width - 160, 1800);

  return { containerWidth, isPhone };
}

/* ---------- Small shared components ---------- */

type SelectOption = { label: string; value: string };

type SelectFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  options: SelectOption[];
  onChange: (v: string) => void;
};

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  placeholder,
  options,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
        {label}
      </Text>
      <Pressable
        onPress={() => setOpen((o) => !o)}
        style={{
          backgroundColor: "#f9fafb",
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#e5e7eb",
          paddingHorizontal: 12,
          paddingVertical: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: value ? "#111827" : "#9ca3af",
          }}
        >
          {value || placeholder || "Select"}
        </Text>
        <Text style={{ fontSize: 16, color: "#9ca3af" }}>⌵</Text>
      </Pressable>

      {open && (
        <View
          style={{
            marginTop: 4,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#e5e7eb",
            backgroundColor: "#ffffff",
            overflow: "hidden",
          }}
        >
          {options.map((opt) => (
            <Pressable
              key={opt.value}
              onPress={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 10,
                backgroundColor:
                  opt.value === value ? "#f3f4ff" : "#ffffff",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#111827",
                }}
              >
                {opt.label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

const TextField: React.FC<{
  label: string;
  placeholder?: string;
  multiline?: boolean;
}> = ({ label, placeholder, multiline }) => (
  <View style={{ marginBottom: 12 }}>
    <Text style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
      {label}
    </Text>
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#9ca3af"
      multiline={multiline}
      style={{
        backgroundColor: "#f9fafb",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        paddingHorizontal: 12,
        paddingVertical: multiline ? 10 : 8,
        height: multiline ? 90 : undefined,
        textAlignVertical: multiline ? "top" : "center",
        fontSize: 14,
        color: "#111827",
      }}
    />
  </View>
);

/* ---------- Add Expense Modal ---------- */

type AddExpenseModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [category, setCategory] = useState<
    "TA/DA (Travel & Daily Allowance)" | "Other Expenses"
  >("TA/DA (Travel & Daily Allowance)");

  const isOther = category === "Other Expenses";
  const [otherExpenseType, setOtherExpenseType] = useState("");

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(15,23,42,0.35)",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 12,
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 420,
            maxHeight: "90%",
            backgroundColor: "#ffffff",
            borderRadius: 12,
            paddingHorizontal: 18,
            paddingTop: 16,
            paddingBottom: 10,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: "#111827",
                }}
              >
                Add New Expense
              </Text>
              <Text
                style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}
              >
                Select expense category and fill details
              </Text>
            </View>

            <Pressable onPress={onClose} hitSlop={10}>
              <Ionicons name="close" size={20} color="#9ca3af" />
            </Pressable>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 8 }}
          >
            {/* Category select */}
            <SelectField
              label="Expense Category *"
              value={category}
              options={[
                {
                  value: "TA/DA (Travel & Daily Allowance)",
                  label: "TA/DA (Travel & Daily Allowance)",
                },
                { value: "Other Expenses", label: "Other Expenses" },
              ]}
              onChange={(v) =>
                setCategory(
                  v as
                    | "TA/DA (Travel & Daily Allowance)"
                    | "Other Expenses"
                )
              }
            />

            {/* TA/DA Layout (existing one, shortened a bit for brevity) */}
            {!isOther && (
              <>
                <TextField label="Date *" placeholder="dd-mm-yyyy" />
                <TextField
                  label="Location *"
                  placeholder="Visit location/City"
                />
                <SelectField
                  label="Visit Type *"
                  value="Hospital Visit - ₹150 conveyance"
                  onChange={() => {}}
                  options={[
                    {
                      value: "Hospital Visit - ₹150 conveyance",
                      label: "Hospital Visit - ₹150 conveyance",
                    },
                    {
                      value: "Clinic Visit - ₹100 conveyance",
                      label: "Clinic Visit - ₹100 conveyance",
                    },
                  ]}
                />
                <SelectField
                  label="Station Type *"
                  value="Local Station - ₹450 DA"
                  onChange={() => {}}
                  options={[
                    {
                      value: "Local Station - ₹450 DA",
                      label: "Local Station - ₹450 DA",
                    },
                    {
                      value: "Next Station - ₹600 DA",
                      label: "Next Station - ₹600 DA",
                    },
                    {
                      value: "Outstation - ₹750 DA",
                      label: "Outstation - ₹750 DA",
                    },
                  ]}
                />
                <SelectField
                  label="Geographical Zone *"
                  value="Zone A - Metropolitan - ₹500 TA"
                  onChange={() => {}}
                  options={[
                    {
                      value: "Zone A - Metropolitan - ₹500 TA",
                      label: "Zone A - Metropolitan - ₹500 TA",
                    },
                    {
                      value: "Zone B - Tier-1/2 Cities",
                      label: "Zone B - Tier-1/2 Cities",
                    },
                  ]}
                />
                <TextField
                  label="Doctor Name *"
                  placeholder="Name of doctor covered"
                />

                {/* Auto-calculated box */}
                <View
                  style={{
                    marginTop: 4,
                    marginBottom: 12,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#e5e7eb",
                    backgroundColor: "#f9fafb",
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <Ionicons
                      name="calculator-outline"
                      size={16}
                      color="#4b5563"
                      style={{ marginRight: 6 }}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "600",
                        color: "#111827",
                      }}
                    >
                      Auto-Calculated Allowances
                    </Text>
                  </View>

                  {[
                    ["Travel Allowance (TA)", "₹500"],
                    ["Conveyance", "₹150"],
                    ["Daily Allowance (DA)", "₹450"],
                  ].map(([label, value]) => (
                    <View
                      key={label}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 4,
                      }}
                    >
                      <Text style={{ fontSize: 12, color: "#6b7280" }}>
                        {label}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "600",
                          color: "#111827",
                        }}
                      >
                        {value}
                      </Text>
                    </View>
                  ))}

                  <View
                    style={{
                      marginTop: 8,
                      paddingTop: 8,
                      borderTopWidth: 1,
                      borderTopColor: "#e5e7eb",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: "#111827",
                      }}
                    >
                      Total Amount:
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "700",
                        color: "#16a34a",
                      }}
                    >
                      ₹1100
                    </Text>
                  </View>
                </View>

                {/* Upload box */}
                <Text
                  style={{
                    fontSize: 12,
                    color: "#6b7280",
                    marginBottom: 4,
                  }}
                >
                  Upload Receipt
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#e5e7eb",
                    borderRadius: 10,
                    borderStyle: "dashed",
                    paddingVertical: 24,
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <Ionicons
                    name="cloud-upload-outline"
                    size={24}
                    color="#9ca3af"
                  />
                  <Text
                    style={{
                      marginTop: 8,
                      fontSize: 12,
                      color: "#6b7280",
                    }}
                  >
                    Click to upload receipt
                  </Text>
                </View>
              </>
            )}

            {/* OTHER EXPENSES Layout (new) */}
            {isOther && (
              <>
                <TextField label="Date *" placeholder="dd-mm-yyyy" />
                <TextField
                  label="Location *"
                  placeholder="Visit location/City"
                />
               <SelectField
  label="Other Expense Type *"
  value={otherExpenseType}
  placeholder="Select expense type"
  options={[
    { value: "Outstation", label: "Outstation Call" },
    { value: "NextStation", label: "Next Station Call" },
    { value: "Conference", label: "Conference/Event" },
    { value: "Training", label: "Training Program" },
    { value: "ClientEntertainment", label: "Client Entertainment" },
    { value: "Misc", label: "Miscellaneous" },
  ]}
  onChange={(val) => setOtherExpenseType(val)}
/>
                <TextField
                  label="Amount (₹) *"
                  placeholder="Enter amount"
                />
                <TextField
                  label="Description *"
                  placeholder="Describe the expense..."
                  multiline
                />

                {/* Orange info strip */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 8,
                    backgroundColor: "#fff7ed",
                    borderWidth: 1,
                    borderColor: "#fed7aa",
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    marginBottom: 16,
                  }}
                >
                  <View
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 999,
                      backgroundColor: "#fb923c",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 11,
                        fontWeight: "700",
                      }}
                    >
                      !
                    </Text>
                  </View>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 11,
                      color: "#9a3412",
                    }}
                  >
                    Other expenses require manager approval and supporting
                    documentation
                  </Text>
                </View>

                {/* Upload receipt box */}
                <Text
                  style={{
                    fontSize: 12,
                    color: "#6b7280",
                    marginBottom: 4,
                  }}
                >
                  Upload Receipt
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#e5e7eb",
                    borderRadius: 10,
                    borderStyle: "dashed",
                    paddingVertical: 24,
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <Ionicons
                    name="cloud-upload-outline"
                    size={24}
                    color="#9ca3af"
                  />
                  <Text
                    style={{
                      marginTop: 8,
                      fontSize: 12,
                      color: "#6b7280",
                    }}
                  >
                    Click to upload receipt
                  </Text>
                </View>
              </>
            )}
          </ScrollView>

          {/* Footer submit */}
          <Pressable
            onPress={onSubmit}
            style={{
              marginTop: 4,
              marginBottom: 4,
              backgroundColor: "#020617",
              borderRadius: 8,
              paddingVertical: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontWeight: "700",
                fontSize: 14,
              }}
            >
              Submit Expense
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

/* ---------- Expense Details Modal ---------- */

type DetailsModalProps = {
  expense: Expense | null;
  visible: boolean;
  onClose: () => void;
};

const ExpenseDetailsModal: React.FC<DetailsModalProps> = ({
  expense,
  visible,
  onClose,
}) => {
  if (!expense) return null;

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(15,23,42,0.35)",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 12,
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 420,
            maxHeight: "90%",
            backgroundColor: "#ffffff",
            borderRadius: 12,
            paddingHorizontal: 18,
            paddingTop: 16,
            paddingBottom: 12,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 8,
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: "#111827",
                }}
              >
                Expense Details
              </Text>
              <Text
                style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}
              >
                Expense ID: EXP000{expense.id}
              </Text>
            </View>
            <Pressable onPress={onClose} hitSlop={10}>
              <Ionicons name="close" size={20} color="#9ca3af" />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Basic information box */}
            <View
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#e5e7eb",
                backgroundColor: "#f9fafb",
                padding: 12,
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 13,
                  marginBottom: 8,
                  color: "#111827",
                }}
              >
                Basic Information
              </Text>
              {[
                ["Date", expense.date],
                ["Category", expense.type === "TA/DA" ? "TA/DA" : "Other"],
                ["Type", expense.title],
                ["Location", expense.location],
              ].map(([label, value]) => (
                <View
                  key={label}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "#6b7280" }}>
                    {label}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#111827",
                      fontWeight: "500",
                    }}
                  >
                    {value}
                  </Text>
                </View>
              ))}

              {/* Status row */}
              <View
                style={{
                  marginTop: 6,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 12, color: "#6b7280" }}>
                  Status
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor:
                      expense.status === "Approved"
                        ? "#22c55e"
                        : "#e5e7eb",
                    borderRadius: 999,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Ionicons
                    name="checkmark-circle"
                    size={14}
                    color={
                      expense.status === "Approved"
                        ? "#ffffff"
                        : "#6b7280"
                    }
                    style={{ marginRight: 4 }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "700",
                      color:
                        expense.status === "Approved"
                          ? "#ffffff"
                          : "#374151",
                    }}
                  >
                    {expense.status}
                  </Text>
                </View>
              </View>
            </View>

            {/* Expense breakdown mini box */}
            <View
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#e0edff",
                backgroundColor: "#f3f7ff",
                padding: 12,
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 13,
                  marginBottom: 8,
                  color: "#111827",
                }}
              >
                Expense Breakdown
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <Text style={{ fontSize: 12, color: "#6b7280" }}>
                  Total Amount:
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "700",
                    color: "#16a34a",
                  }}
                >
                  ₹{expense.amount.toLocaleString()}
                </Text>
              </View>
            </View>

            {/* Receipt section (dummy) */}
            <View
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#e5e7eb",
                padding: 12,
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 13,
                  marginBottom: 8,
                  color: "#111827",
                }}
              >
                Receipt
              </Text>
              <View
                style={{
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                  paddingVertical: 16,
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color="#6b7280"
                />
                <Text
                  style={{
                    marginTop: 6,
                    fontSize: 12,
                    color: "#6b7280",
                  }}
                >
                  Receipt uploaded ✓
                </Text>
                <Pressable
                  style={{
                    marginTop: 10,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "#d1d5db",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "600",
                      color: "#111827",
                    }}
                  >
                    View Receipt
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Footer buttons */}
            <View
              style={{
                flexDirection: "row",
                marginTop: 4,
                marginBottom: 4,
              }}
            >
              <Pressable
                style={{
                  flex: 1,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#d1d5db",
                  paddingVertical: 10,
                  alignItems: "center",
                  marginRight: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "600",
                    color: "#111827",
                  }}
                >
                  Edit
                </Text>
              </Pressable>
              <Pressable
                style={{
                  flex: 1,
                  borderRadius: 8,
                  backgroundColor: "#dc2626",
                  paddingVertical: 10,
                  alignItems: "center",
                  marginLeft: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "700",
                    color: "#ffffff",
                  }}
                >
                  Delete
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

/* ---------- Main Screen ---------- */

export default function ExpenseManagement(): JSX.Element {
  const { containerWidth, isPhone } = useResponsive();

  const [activeTab, setActiveTab] = useState<"Pending" | "Approved" | "All">(
    "Pending"
  );
  const [addVisible, setAddVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(
    null
  );

  const monthlyEligibility = 25000;
  const claimed = 18450;
  const pending = 3250;
  const remaining = monthlyEligibility - claimed - pending;
  const progress = Math.min(1, (claimed + pending) / monthlyEligibility);

  const filteredExpenses = useMemo(() => {
    if (activeTab === "All") return EXPENSES;
    return EXPENSES.filter((e) => e.status === activeTab);
  }, [activeTab]);

  const summaryHorizontal = !isPhone;
  const statsTwoCol = !isPhone;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        <View
          style={{
            width: containerWidth,
            alignSelf: "center",
            paddingHorizontal: 8,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "800",
                color: "#0f172a",
              }}
            >
              Expense Management
            </Text>
            <Pressable
              style={{
                backgroundColor: "#020617",
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 999,
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
              }}
              onPress={() => setAddVisible(true)}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 18,
                  marginBottom: 1,
                }}
              >
                +
              </Text>
              <Text
                style={{
                  color: "#ffffff",
                  fontWeight: "700",
                  fontSize: 13,
                }}
              >
                Add Expense
              </Text>
            </Pressable>
          </View>

          {/* Eligibility Card */}
          <View
            style={{
              backgroundColor: "#faf5ff",
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: "#efe9fb",
            }}
          >
            <Text style={{ color: "#6b7280", fontSize: 12 }}>
              Monthly Eligibility - November 2025
            </Text>
            <Text
              style={{
                fontSize: 26,
                fontWeight: "800",
                marginTop: 4,
                color: "#0f172a",
              }}
            >
              ₹{monthlyEligibility.toLocaleString()}
            </Text>

            <View
              style={{
                height: 8,
                backgroundColor: "#e5e7eb",
                borderRadius: 999,
                marginTop: 10,
                flexDirection: "row",
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  flex: progress,
                  backgroundColor: "#0f172a",
                }}
              />
              <View style={{ flex: 1 - progress }} />
            </View>

            <View
              style={{
                flexDirection: summaryHorizontal ? "row" : "column",
                marginTop: 12,
              }}
            >
              {/* Claimed */}
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#ffffff",
                  borderRadius: 8,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#f3e8ff",
                  marginRight: summaryHorizontal ? 8 : 0,
                  marginBottom: summaryHorizontal ? 0 : 8,
                }}
              >
                <Text
                  style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}
                >
                  Claimed
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: "#16a34a",
                  }}
                >
                  ₹{claimed.toLocaleString()}
                </Text>
              </View>

              {/* Pending */}
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#ffffff",
                  borderRadius: 8,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#fee2e2",
                  marginRight: summaryHorizontal ? 8 : 0,
                  marginBottom: summaryHorizontal ? 0 : 8,
                }}
              >
                <Text
                  style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}
                >
                  Pending
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: "#f97316",
                  }}
                >
                  ₹{pending.toLocaleString()}
                </Text>
              </View>

              {/* Remaining */}
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#ffffff",
                  borderRadius: 8,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#e0f2fe",
                }}
              >
                <Text
                  style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}
                >
                  Remaining
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: "#0ea5e9",
                  }}
                >
                  ₹{remaining.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>

          {/* This Month Card */}
          <View
            style={{
              backgroundColor: "#ecfdf5",
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: "#d1fae5",
              position: "relative",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                color: "#0f172a",
                fontSize: 13,
              }}
            >
              This Month&apos;s Expenses
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "800",
                marginTop: 6,
                color: "#0f172a",
              }}
            >
              ₹18,450
            </Text>

            <View
              style={{
                flexDirection: summaryHorizontal ? "row" : "column",
                marginTop: 12,
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#ffffff",
                  borderRadius: 8,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                  marginRight: summaryHorizontal ? 8 : 0,
                  marginBottom: summaryHorizontal ? 0 : 8,
                }}
              >
                <Text
                  style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}
                >
                  TA/DA
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: "#0f172a",
                  }}
                >
                  ₹12,200
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#ffffff",
                  borderRadius: 8,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                }}
              >
                <Text
                  style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}
                >
                  Other
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: "#0f172a",
                  }}
                >
                  ₹6,250
                </Text>
              </View>
            </View>

            <Text
              style={{
                position: "absolute",
                right: 16,
                top: 12,
                fontSize: 26,
                fontWeight: "800",
                color: "#16a34a",
              }}
            >
              ₹
            </Text>
          </View>

          {/* Policy box */}
          <View
            style={{
              backgroundColor: "#ecfeff",
              borderRadius: 12,
              padding: 14,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: "#e0f2fe",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                marginBottom: 6,
                color: "#0f172a",
              }}
            >
              Expense Policy Guidelines
            </Text>
            <Text
              style={{
                color: "#374151",
                fontSize: 12,
                lineHeight: 18,
              }}
            >
              • TA auto-calculated based on geographical zone{"\n"}
              • DA varies by station type: Local (₹450), Next Station (₹600),
              Outstation (₹750){"\n"}
              • Other expenses require prior approval for
              outstation/next-station calls
            </Text>
          </View>

          {/* Tabs */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#f3f4f6",
              borderRadius: 999,
              padding: 3,
              marginBottom: 16,
            }}
          >
            {(["Pending", "Approved", "All"] as const).map((tab) => {
              const active = activeTab === tab;
              return (
                <Pressable
                  key={tab}
                  style={{
                    flex: 1,
                    paddingVertical: 8,
                    alignItems: "center",
                    borderRadius: 999,
                    backgroundColor: active ? "#ffffff" : "transparent",
                  }}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: active ? "700" : "500",
                      color: active ? "#111827" : "#6b7280",
                    }}
                  >
                    {tab === "Pending"
                      ? "Pending (2)"
                      : tab === "Approved"
                      ? "Approved (2)"
                      : "All (4)"}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Expense list */}
       <View style={{ gap: 12, marginBottom: 16 }}>
  {filteredExpenses.map((e) => (
    <View
      key={e.id}
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: "#e5e7eb",
      }}
    >
      {/* Top row: amount / type on left, status on right */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 6,
        }}
      >
        {/* Amount + type pill */}
        <View>
          <Text
            style={{
              fontWeight: "800",
              fontSize: 16,
              color: "#111827",
            }}
          >
            ₹{e.amount}
          </Text>
          <View
            style={{
              marginTop: 4,
              alignSelf: "flex-start",
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: "#e5e7eb",
              backgroundColor: "#f9fafb",
            }}
          >
            <Text style={{ fontSize: 10, color: "#374151" }}>{e.type}</Text>
          </View>
        </View>

        {/* Status pill (green for Approved, grey for Pending) */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 999,
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor:
              e.status === "Approved" ? "#22c55e" : "#e5e7eb",
          }}
        >
          <Ionicons
            name="checkmark-circle"
            size={12}
            color={e.status === "Approved" ? "#ffffff" : "#6b7280"}
            style={{ marginRight: 4 }}
          />
          <Text
            style={{
              fontSize: 11,
              fontWeight: "700",
              color: e.status === "Approved" ? "#ffffff" : "#374151",
            }}
          >
            {e.status}
          </Text>
        </View>
      </View>

      {/* Title */}
      <Text
        style={{
          fontSize: 14,
          fontWeight: "700",
          color: "#111827",
        }}
      >
        {e.title}
      </Text>

      {/* Date + location row with icons */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Ionicons
          name="calendar-outline"
          size={11}
          color="#6b7280"
          style={{ marginRight: 4 }}
        />
        <Text style={{ fontSize: 11, color: "#6b7280" }}>{e.date}</Text>

        <Text style={{ fontSize: 11, color: "#6b7280", marginHorizontal: 6 }}>
          •
        </Text>

        <Ionicons
          name="location-outline"
          size={11}
          color="#6b7280"
          style={{ marginRight: 4 }}
        />
        <Text style={{ fontSize: 11, color: "#6b7280" }}>{e.location}</Text>
      </View>

      {/* Full-width View Details strip */}
      <Pressable
        onPress={() => {
          setSelectedExpense(e);
          setDetailsVisible(true);
        }}
        style={{
          marginTop: 10,
          height: 30,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: "#e5e7eb",
          backgroundColor: "#f9fafb",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "stretch",
        }}
      >
        <Ionicons
          name="eye-outline"
          size={12}
          color="#111827"
          style={{ marginRight: 6 }}
        />
        <Text
          style={{
            fontSize: 11,
            fontWeight: "600",
            color: "#111827",
          }}
        >
          View Details
        </Text>
      </Pressable>
    </View>
  ))}
</View>



          {/* Stats card */}
          <View
            style={{
              backgroundColor: "#eaf6ff",
              borderRadius: 12,
              padding: 14,
              marginBottom: 40,
              borderWidth: 1,
              borderColor: "#dbeffd",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                marginBottom: 10,
                color: "#0f172a",
              }}
            >
              November 2025 Statistics
            </Text>

            <View
              style={{
                flexDirection: statsTwoCol ? "row" : "column",
                gap: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#ffffff",
                  borderRadius: 8,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                  marginRight: statsTwoCol ? 8 : 0,
                }}
              >
                <Text
                  style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}
                >
                  Total Expenses
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "800",
                    color: "#111827",
                  }}
                >
                  ₹18,450
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#ffffff",
                  borderRadius: 8,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                }}
              >
                <Text
                  style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}
                >
                  Avg per Day
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "800",
                    color: "#111827",
                  }}
                >
                  ₹842
                </Text>
              </View>
            </View>

            <View style={{ height: 10 }} />

            <View
              style={{
                flexDirection: statsTwoCol ? "row" : "column",
                gap: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#ffffff",
                  borderRadius: 8,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                  marginRight: statsTwoCol ? 8 : 0,
                }}
              >
                <Text
                  style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}
                >
                  TA/DA Claims
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "800",
                    color: "#111827",
                  }}
                >
                  8
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#ffffff",
                  borderRadius: 8,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                }}
              >
                <Text
                  style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}
                >
                  Other Expenses
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "800",
                    color: "#111827",
                  }}
                >
                  4
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modals */}
      <AddExpenseModal
        visible={addVisible}
        onClose={() => setAddVisible(false)}
        onSubmit={() => setAddVisible(false)}
      />
      <ExpenseDetailsModal
        expense={selectedExpense}
        visible={detailsVisible}
        onClose={() => setDetailsVisible(false)}
      />
    </SafeAreaView>
  );
}
