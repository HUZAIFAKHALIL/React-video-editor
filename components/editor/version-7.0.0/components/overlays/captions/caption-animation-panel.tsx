import React from "react";
import { CaptionOverlay } from "../../../types";
import { animationTemplates } from "../../../templates/animation-templates";
import { AnimationSettings } from "../../shared/animation-preview";

interface CaptionAnimationPanelProps {
  localOverlay: CaptionOverlay;
  handleStyleChange: (field: keyof CaptionOverlay["styles"], value: any) => void;
}

export const CaptionAnimationPanel: React.FC<CaptionAnimationPanelProps> = ({
  localOverlay,
  handleStyleChange,
}) => {
  const handleEnterAnimationSelect = (animationKey: string) => {
    handleStyleChange("animation", {
      ...localOverlay.styles.animation,
      enter: animationKey,
    });
  };

  const handleExitAnimationSelect = (animationKey: string) => {
    handleStyleChange("animation", {
      ...localOverlay.styles.animation,
      exit: animationKey,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">
        Caption Animations
      </h3>

      <AnimationSettings
        animations={animationTemplates}
        selectedEnterAnimation={localOverlay.styles?.animation?.enter}
        selectedExitAnimation={localOverlay.styles?.animation?.exit}
        onEnterAnimationSelect={handleEnterAnimationSelect}
        onExitAnimationSelect={handleExitAnimationSelect}
      />
    </div>
  );
};
