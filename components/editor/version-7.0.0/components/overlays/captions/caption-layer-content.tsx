import React from "react";
import { useCurrentFrame } from "remotion";
import { Caption, CaptionOverlay } from "../../../types";
import { defaultCaptionStyles } from "./caption-settings";
import { animationTemplates } from "../../../templates/animation-templates";

interface CaptionLayerContentProps {
  overlay: CaptionOverlay;
}

export const CaptionLayerContent: React.FC<CaptionLayerContentProps> = ({
  overlay,
}) => {
  const frame = useCurrentFrame();
  const frameMs = (frame / 30) * 1000; // Convert frame to milliseconds
  const styles = overlay.styles || defaultCaptionStyles;

  const currentCaption = overlay.captions.find(
    (caption) => frameMs >= caption.startMs && frameMs <= caption.endMs
  );

  if (!currentCaption) return null;

  const alignmentMap: Record<string, string> = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  };


  const isExitPhase = frame >= overlay.durationInFrames - 30;


  const enterAnimation =
    !isExitPhase && styles.animation?.enter
      ? animationTemplates[styles.animation.enter]?.enter(frame, overlay.durationInFrames)
      : {};
  const exitAnimation =
    isExitPhase && styles.animation?.exit
      ? animationTemplates[styles.animation.exit]?.exit(frame, overlay.durationInFrames)
      : {};

  const renderWords = (caption: Caption) => {
    return caption.words.map((word, index) => {
      const isHighlighted = frameMs >= word.startMs && frameMs <= word.endMs;
      const progress = isHighlighted
        ? Math.min((frameMs - word.startMs) / 300, 1)
        : 0;

      const highlightStyle =
        styles.highlightStyle || defaultCaptionStyles.highlightStyle;

      return (
        <span
          key={`${word.word}-${index}`}
          className="inline-block transition-all duration-200"
          style={{
            fontFamily: styles.fontFamily,
            fontSize: styles.fontSize,
            fontWeight: isHighlighted
              ? highlightStyle?.fontWeight || 600
              : styles.fontWeight || 400,
            color: isHighlighted
              ? highlightStyle?.color || styles.color
              : styles.color,
            backgroundColor: isHighlighted
              ? highlightStyle?.backgroundColor
              : "transparent",
            letterSpacing: styles.letterSpacing || "0em",
            wordSpacing: styles.wordSpacing || "0em",
            textShadow: isHighlighted
              ? highlightStyle?.textShadow
              : styles.textShadow,
            padding: highlightStyle?.padding || "4px 8px",
            borderRadius: highlightStyle?.borderRadius || "4px",
            opacity: isHighlighted ? 1 : 0.85,
            transform: isHighlighted
              ? `scale(${
                  1 +
                  (highlightStyle?.scale
                    ? (highlightStyle.scale - 1) * progress
                    : 0.08)
                })`
              : "scale(1)",
            margin: "0 2px",
            ...(isExitPhase ? exitAnimation : enterAnimation), 
          }}
        >
          {word.word}
        </span>
      );
    });
  };

  return (
    <div
      className="absolute inset-0 flex items-center p-4"
      style={{
        width: "100%",
        height: "100%",
        fontFamily: styles.fontFamily,
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        color: styles.color,
        letterSpacing: styles.letterSpacing || "0em",
        wordSpacing: styles.wordSpacing || "0em",
        textShadow: styles.textShadow,
        ...(isExitPhase ? exitAnimation : enterAnimation), // Apply animations to container
      }}
    >
      <div
        className="leading-relaxed tracking-wide"
        style={{
          whiteSpace: "pre-wrap",
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: alignmentMap[styles.textAlign || "center"],
          alignItems: "center",
          gap: "2px",
        }}
      >
        {renderWords(currentCaption)}
      </div>
    </div>
  );
};
