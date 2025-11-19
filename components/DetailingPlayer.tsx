// app/components/DetailingPlayer.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import type { Product, Slide } from "../types/products";

type Props = {
  product: Product;
  productIndex?: number;
  totalProducts?: number;

  onSlideViewed?: (slidesViewed: number) => void;
  onComplete?: () => void;
  onNextProduct?: () => void;

  onBack?: () => void;
  onFinish?: () => void;

  inline?: boolean;
};

const FALLBACK_IMAGE = "file:///mnt/data/0a57ea65-36df-4d8f-97e8-bd3d10dd6b95.png"; // default fallback

export default function DetailingPlayer({
  product,
  productIndex = 0,
  totalProducts = 1,
  onBack,
  onFinish,
  onSlideViewed,
  onComplete,
  onNextProduct,
  inline = true,
}: Props) {
  const slides: Slide[] = product.slides ?? [];
  const [index, setIndex] = useState(0);
  const [slidesViewed, setSlidesViewed] = useState(0);

  // small fade animation for image change
  const fade = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // reset state when product changes (start fresh)
    setIndex(0);
    setSlidesViewed(0);
    if (onSlideViewed) onSlideViewed(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  useEffect(() => {
    if (!slides || slides.length === 0) return;
    const viewed = index + 1;
    setSlidesViewed((prev) => {
      const next = Math.max(prev, viewed);
      if (next > prev && onSlideViewed) onSlideViewed(next);
      return next;
    });

    // animate image fade-in on index change
    fade.setValue(0);
    Animated.timing(fade, { toValue: 1, duration: 240, useNativeDriver: true }).start();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    if (!slides || slides.length === 0) return;
    if (slidesViewed >= slides.length) {
      if (onComplete) onComplete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slidesViewed]);

  const isLastSlide = slides.length > 0 && index === slides.length - 1;
  const slideProgressPercent = Math.min(100, ((index + 1) / Math.max(1, slides.length)) * 100);

  function prev() {
    setIndex((i) => Math.max(0, i - 1));
  }
  function next() {
    if (index < slides.length - 1) {
      setIndex((i) => i + 1);
    } else {
      // last slide — parent handles next product
    }
  }

  function finishHandler() {
    if (onFinish) onFinish();
    else if (onBack) onBack();
  }

  const keyPoints = slides[index]?.keyPoints ?? [];

  const containerStyle: ViewStyle = inline ? styles.inlineContainer : styles.overlay;

  return (
    <View style={containerStyle}>
      {/* header */}
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backRow}>
          <Ionicons name="chevron-back" size={18} color="#0f172a" />
          <Text style={styles.backText}>Back to List</Text>
        </Pressable>

        <Pressable onPress={finishHandler} style={styles.closeBtn}>
          <Ionicons name="close" size={18} color="#6b7280" />
        </Pressable>
      </View>

      {/* product title/meta + thick top progress */}
      <View style={styles.topCard}>
        <Text style={styles.productTitle}>{product.name}</Text>

        <View style={styles.tagMetaRow}>
          <View style={styles.tagPill}>
            <Text style={styles.tagText}>{product.tagline}</Text>
          </View>
          <Text style={styles.indicationText}>{product.indication}</Text>
        </View>

        <View style={styles.progressInfoRow}>
          <Text style={styles.slideInfo}>Slide {Math.min(index + 1, Math.max(1, slides.length))} of {Math.max(1, slides.length)}</Text>
          <Text style={styles.productInfo}>Product {Math.max(1, productIndex + 1)} of {Math.max(1, totalProducts)}</Text>
        </View>

        {/* thick top bar (dark fill then light track) */}
        <View style={styles.topProgressTrack}>
          <View style={[styles.topProgressFill, { width: `${slideProgressPercent}%` }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageCard}>
          <Animated.View style={{ width: "100%", opacity: fade }}>
            <Image
              source={slides[index]?.image ?? require("../assets/images/tonact.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        {slides[index]?.title ? <Text style={styles.slideTitle}>{slides[index].title}</Text> : null}
        {slides[index]?.description ? <Text style={styles.slideDesc}>{slides[index].description}</Text> : null}

        {keyPoints.length > 0 ? (
          <View style={styles.keyPointsBox}>
            <View style={styles.keyPointsHeader}>
              <Ionicons name="document-text-outline" size={16} color="#0f172a" />
              <Text style={styles.keyPointsTitle}> Key Points</Text>
            </View>

            <View style={{ marginTop: 8 }}>
              {keyPoints.map((kp, i) => (
                <View key={i} style={styles.kpRow}>
                  <Ionicons name="checkmark-circle" size={16} color="#0f172a" />
                  <Text style={styles.kpText}>{kp}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        <View style={{ height: 18 }} />
      </ScrollView>

      {/* pager dots */}
      <View style={styles.dotsRow}>
        {slides.length > 0
          ? slides.map((_, i) => <View key={i} style={[styles.dot, index === i && styles.dotActive]} />)
          : <View style={[styles.dot, styles.dotActive]} />
        }
      </View>

      {/* footer */}
      <View style={styles.footer}>
        <Pressable onPress={prev} disabled={index === 0} style={({ pressed }) => [styles.prevBtn, index === 0 && styles.prevBtnDisabled, pressed && index !== 0 ? { opacity: 0.9 } : null]}>
          <Text style={[styles.prevText, index === 0 && styles.prevTextDisabled]}>‹ Previous</Text>
        </Pressable>

{isLastSlide ? (
  (productIndex + 1) < totalProducts ? (
    <Pressable
      onPress={onNextProduct}
      style={({ pressed }) => [styles.nextBtn, pressed && { opacity: 0.95 }]}
    >
      <Text style={styles.nextText}>Next Product ›</Text>
    </Pressable>
  ) : (
    // call both onComplete and onFinish (parent can decide)
    <Pressable
      onPress={() => {
        // notify parent that product is complete
        onComplete?.();
        // then notify parent that the whole session/finish button was pressed
        if (typeof onFinish === "function") onFinish();
      }}
      style={({ pressed }) => [styles.nextBtn, pressed && { opacity: 0.95 }]}
    >
      <Text style={styles.nextText}>Finish</Text>
    </Pressable>
  )
) : (
  <Pressable
    onPress={next}
    style={({ pressed }) => [styles.nextBtn, pressed && { opacity: 0.95 }]}
  >
    <Text style={styles.nextText}>Next Slide ›</Text>
  </Pressable>
)}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // inline container used in modal panel
  inlineContainer: { flex: 1, backgroundColor: "#fff" },
  // overlay (unused by default)
  overlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#fff" },

  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 12, paddingTop: 12, paddingBottom: 8, borderBottomWidth: 1, borderColor: "#eef2f7",
  },
  backRow: { flexDirection: "row", alignItems: "center" },
  backText: { marginLeft: 6, color: "#0f172a", fontWeight: "600" },
  closeBtn: { padding: 6 },

  topCard: { paddingHorizontal: 14, paddingTop: 12, paddingBottom: 12 },
  productTitle: { fontSize: 20, fontWeight: "800", color: "#0f172a" },
  tagMetaRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  tagPill: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#eef2f7", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  tagText: { fontWeight: "700", fontSize: 12, color: "#0f172a" },
  indicationText: { color: "#6b7280", marginLeft: 8, fontSize: 13 },

  progressInfoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12 },
  slideInfo: { color: "#6b7280", fontSize: 13 },
  productInfo: { color: "#6b7280", fontSize: 13 },

  // thick top progress bar to match screenshots
  topProgressTrack: { height: 8, backgroundColor: "#eef2f7", borderRadius: 999, overflow: "hidden", marginTop: 8 },
  topProgressFill: { height: "100%", backgroundColor: "#0f172a" },

  content: { paddingHorizontal: 14, paddingTop: 16, paddingBottom: 10 },

  imageCard: {
    backgroundColor: "#fff", borderRadius: 12, overflow: "hidden", borderWidth: 1, borderColor: "#eef2f7",
    padding: 10, alignItems: "center", marginBottom: 16,
    shadowColor: "#000", shadowOpacity: 0.04, shadowOffset: { width: 0, height: 6 }, shadowRadius: 12, elevation: 3,
  },
  image: { width: "100%", height: 220, borderRadius: 8 },

  slideTitle: { fontWeight: "800", fontSize: 16, marginBottom: 8, color: "#0f172a" },
  slideDesc: { color: "#374151", marginBottom: 12 },

  keyPointsBox: { backgroundColor: "#f0f9ff", borderRadius: 10, padding: 12, borderWidth: 1, borderColor: "#dbeafe" },
  keyPointsHeader: { flexDirection: "row", alignItems: "center" },
  keyPointsTitle: { fontWeight: "700", marginLeft: 8, color: "#0f172a" },
  kpRow: { flexDirection: "row", alignItems: "flex-start", marginTop: 8 },
  kpText: { marginLeft: 8, color: "#374151", flex: 1 },

  dotsRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 10 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#e6e9ef", marginHorizontal: 6 },
  dotActive: { backgroundColor: "#10b981", width: 20 }, // green active like your screenshots

  footer: { flexDirection: "row", padding: 12, borderTopWidth: 1, borderColor: "#eef2f7", backgroundColor: "#fff" },
  prevBtn: { flex: 1, borderWidth: 1, borderColor: "#e6e9ef", paddingVertical: 12, borderRadius: 8, alignItems: "center", marginRight: 8, backgroundColor: "#fff" },
  prevBtnDisabled: { backgroundColor: "#fff", opacity: 0.6 },
  prevText: { fontWeight: "700", color: "#0f172a" },
  prevTextDisabled: { color: "#9ca3af" },

  nextBtn: { flex: 1, backgroundColor: "#0f172a", paddingVertical: 12, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  nextText: { color: "#fff", fontWeight: "800" },
});
