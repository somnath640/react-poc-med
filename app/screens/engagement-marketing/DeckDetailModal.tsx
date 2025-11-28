import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface Deck {
  title: string;
  subtitle: string;
  slides: number;
  time: string;
  views: number;
  lastUsed: string;
  highlights: string[];
  thumbnail: any;
}

interface Props {
  visible: boolean;
  deck: Deck | null;
  onClose: () => void;
  onPresent: (deck: Deck) => void
}

const DeckDetailModal: React.FC<Props>  = ({ visible, deck, onClose, onPresent }) => {
  if (!deck) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBg}>
        <View style={styles.modalCard}>
          
          {/* Close */}
          <TouchableOpacity style={styles.modalClose} onPress={onClose}>
            <Ionicons name="close" size={22} color="#111" />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.modalTitle}>{deck.title}</Text>
          <Text style={styles.modalSub}>Presentation Details</Text>

          {/* Thumbnail */}
          <View style={styles.modalThumbBox}>
            <Image source={deck.thumbnail} style={{ width: 60, height: 60 }} />
          </View>

          {/* Details section */}
          <View style={styles.modalSection}>
            <Text style={styles.sectionTitle}>Details</Text>

            <View style={styles.detailRow}>
              <Text>Product:</Text>
              <Text style={styles.detailValue}>{deck.subtitle}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text>Slides:</Text>
              <Text style={styles.detailValue}>{deck.slides}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text>Duration:</Text>
              <Text style={styles.detailValue}>{deck.time}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text>Total Views:</Text>
              <Text style={styles.detailValue}>{deck.views}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text>Last Used:</Text>
              <Text style={styles.detailValue}>{deck.lastUsed}</Text>
            </View>
          </View>

          {/* Highlights Section */}
          <View style={[styles.modalSection, { backgroundColor: "#eef6ff" }]}>
            <Text style={styles.sectionTitle}>Key Highlights</Text>

            {deck.highlights?.map((point, index) => (
              <View key={index} style={styles.bulletRow}>
                <Ionicons name="checkmark-circle" size={14} color="#2563eb" style={{ marginRight: 6 }} />
                <Text style={styles.bulletText}>{point}</Text>
              </View>
            ))}
          </View>

          {/* Buttons */}
          <View style={styles.bottomButtons}>
            <TouchableOpacity style={styles.modalPresentBtn} onPress={() => onPresent(deck)}>
              <Ionicons name="play" size={16} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.modalPresentText}>Present</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalDownloadBtn}>
              <Ionicons name="download-outline" size={18} color="#111" />
              <Text style={styles.modalDownloadText}>Download</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
};

export default DeckDetailModal;

const styles = StyleSheet.create({
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
    alignItems: "center",
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "75%",
    maxWidth: 500,
  },
  modalClose: {
    alignSelf: "flex-end",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  modalSub: {
    color: "#6b7280",
    marginBottom: 16,
  },
  modalThumbBox: {
    backgroundColor: "#e0edff",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 18,
  },
  modalSection: {
    backgroundColor: "#fafafa",
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e6e9ee",
  },
  sectionTitle: {
    fontWeight: "700",
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  detailValue: {
    fontWeight: "600",
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  bulletText: {
    flex: 1,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalPresentBtn: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#0f172a",
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  modalPresentText: {
    color: "#fff",
    fontWeight: "700",
  },
  modalDownloadBtn: {
    flexDirection: "row",
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modalDownloadText: {
    marginLeft: 6,
    fontWeight: "600",
  },
});
