// import React from "react";
// import { CaptionOverlay } from "../../../types";
// import { captionTemplates } from "../../../templates/caption-templates";

// /**
//  * Props for the CaptionStylePanel component
//  * @interface CaptionStylePanelProps
//  * @property {CaptionOverlay} localOverlay - Current caption overlay being styled
//  * @property {Function} setLocalOverlay - Function to update the caption overlay
//  */
// interface CaptionStylePanelProps {
//   localOverlay: CaptionOverlay;
//   setLocalOverlay: (overlay: CaptionOverlay) => void;
// }

// /**
//  * CaptionStylePanel Component
//  *
//  * @component
//  * @description
//  * Provides a visual interface for selecting and customizing caption styles.
//  * Features include:
//  * - Pre-defined style templates
//  * - Live preview of styles
//  * - Color palette visualization
//  * - Active state indication
//  *
//  * Each template includes:
//  * - Preview text with highlight example
//  * - Template name and status
//  * - Color scheme visualization
//  *
//  * @example
//  * ```tsx
//  * <CaptionStylePanel
//  *   localOverlay={captionOverlay}
//  *   setLocalOverlay={handleStyleUpdate}
//  * />
//  * ```
//  */
// export const CaptionStylePanel: React.FC<CaptionStylePanelProps> = ({
//   localOverlay,
//   setLocalOverlay,
// }) => {
//   return (
//     <div className="space-y-4">
//       {/* Templates Grid */}
//       <div className="grid grid-cols-1 gap-3">
//         {Object.entries(captionTemplates).map(([key, template]) => (
//           <button
//             key={key}
//             onClick={() => {
//               const updatedOverlay = {
//                 ...localOverlay,
//                 template: key,
//                 styles: template.styles,
//               };
//               setLocalOverlay(updatedOverlay);
//             }}
//             className={`group relative overflow-hidden rounded-lg border transition-all duration-200
//               ${
//                 localOverlay?.template === key
//                   ? "border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/30 dark:ring-blue-400/30"
//                   : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100/80 dark:hover:bg-gray-800/50"
//               }`}
//           >
//             {/* Preview Area with demo text */}
//             <div className="relative aspect-[16/7] w-full overflow-hidden bg-gray-900/90 dark:from-black/40 dark:to-gray-900/40">
//               <div className="absolute inset-0 flex items-center justify-center p-10">
//                 <span
//                   style={{
//                     ...template.styles,
//                     fontSize: "1.2rem",
//                     lineHeight: "1.2",
//                   }}
//                 >
//                   Let&apos;s{" "}
//                   <span
//                     style={{
//                       ...template.styles.highlightStyle,
//                       transform: `scale(${
//                         template.styles.highlightStyle?.scale || 1
//                       })`,
//                     }}
//                   >
//                     start
//                   </span>{" "}
//                   with a demo of your caption.
//                 </span>
//               </div>
//             </div>

//             {/* Template Info and Color Palette */}
//             <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-900/40 backdrop-blur-sm">
//               {/* Template Name and Status */}
//               <div className="flex items-center gap-2">
//                 <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
//                   {template.name}
//                 </span>
//                 {localOverlay?.template === key && (
//                   <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium bg-blue-100 dark:bg-blue-500/20 px-2 py-0.5 rounded-full">
//                     Active
//                   </span>
//                 )}
//               </div>

//               {/* Color Palette Preview */}
//               <div className="flex items-center gap-1.5">
//                 {[
//                   template.styles.color,
//                   template.styles.highlightStyle?.backgroundColor,
//                 ].map((color, i) => (
//                   <div
//                     key={i}
//                     className="w-3 h-3 rounded-full ring-1 ring-black/5 dark:ring-white/10"
//                     style={{ backgroundColor: color }}
//                   />
//                 ))}
//               </div>
//             </div>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };


"use client"

import type React from "react"
import { useState } from "react"

import { Type, Palette, Move, Sparkles, AlignLeft, AlignCenter, AlignRight, Layers, Badge } from "lucide-react"
import { CaptionOverlay, CaptionStyles } from "../../../types"
import { Slider } from "@radix-ui/react-slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import ColorPicker from "react-best-gradient-color-picker"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { captionTemplates } from "../../../templates/caption-templates"
import { Input } from "@/components/ui/input"

interface CaptionStylePanelProps {
  localOverlay: CaptionOverlay
  setLocalOverlay: (overlay: CaptionOverlay) => void
}

const fonts = [
  { value: "Inter, sans-serif", label: "Inter (Sans-serif)" },
  { value: "Montserrat, sans-serif", label: "Montserrat" },
  { value: "Space Grotesk, sans-serif", label: "Space Grotesk" },
  { value: "Playfair Display, serif", label: "Playfair Display (Serif)" },
  { value: "Caveat, cursive", label: "Caveat (Handwriting)" },
  { value: "Courier Prime, monospace", label: "Courier Prime (Mono)" },
  { value: "Orbitron, sans-serif", label: "Orbitron (Futuristic)" },
  { value: "Comic Neue, cursive", label: "Comic Neue" },
]

export const CaptionStylePanel: React.FC<CaptionStylePanelProps> = ({ localOverlay, setLocalOverlay }) => {
  const [activeTab, setActiveTab] = useState("templates")

  const defaultStyles: CaptionStyles = {
    fontFamily: "Inter, sans-serif",
    fontSize: "2rem",
    lineHeight: 1.2,
    textAlign: "center",
    color: "#ffffff",
    textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
    padding: "24px",
    highlightStyle: {
      backgroundColor: "#3b82f6",
      scale: 1,
      fontWeight: 700,
      textShadow: "none",
    },
    animation: {
      type: "none",
      duration: 500,
      delay: 0,
    },
  }

  const currentStyles = localOverlay.styles ? { ...defaultStyles, ...localOverlay.styles } : defaultStyles

  const updateStyles = (updates: Partial<CaptionStyles>) => {
    setLocalOverlay({
      ...localOverlay,
      styles: {
        ...currentStyles,
        ...updates,
      },
    })
  }

  const updateHighlightStyle = (updates: Partial<NonNullable<CaptionStyles["highlightStyle"]>>) => {
    setLocalOverlay({
      ...localOverlay,
      styles: {
        ...currentStyles,
        highlightStyle: {
          ...currentStyles.highlightStyle,
          ...updates,
        },
      },
    })
  }

  const updateAnimation = (updates: Partial<NonNullable<CaptionStyles["animation"]>>) => {
    setLocalOverlay({
      ...localOverlay,
      styles: {
        ...currentStyles,
        // animation: {
        //   ...currentStyles.animation,
        //   ...updates,
        // },
      },
    })
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full bg-dark">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Layers className="w-3 h-3" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-2">
            <Type className="w-3 h-3" />
            Typography
          </TabsTrigger>
          <TabsTrigger value="effects" className="flex items-center gap-2">
            <Sparkles className="w-3 h-3" />
            Effects
          </TabsTrigger>
        </TabsList>

        {/* Templates Tab - Original template selection functionality */}
        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 gap-3 overflow-y-auto">
            {Object.entries(captionTemplates).map(([key, template]) => (
              <button
                key={key}
                onClick={() => {
                  const updatedOverlay = {
                    ...localOverlay,
                    template: key,
                    styles: template.styles,
                  }
                  setLocalOverlay(updatedOverlay)
                }}
                className={`group relative overflow-hidden rounded-lg border transition-all duration-200
                  ${
                    localOverlay?.template === key
                      ? "border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/30 dark:ring-blue-400/30"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100/80 dark:hover:bg-gray-800/50"
                  }`}
              >
                {/* Preview Area with demo text */}
                <div className="relative aspect-[16/7] w-full overflow-hidden bg-gray-900/90 dark:from-black/40 dark:to-gray-900/40">
                  <div className="absolute inset-0 flex items-center justify-center p-10">
                    <span
                      // style={{
                        // ...template.styles,
                        // fontSize: "1.2rem",
                        // lineHeight: "1.2",
                      // }}
                    >
                      Let&apos;s{" "}
                      <span
                        style={{
                          ...template.styles.highlightStyle,
                          transform: `scale(${template.styles.highlightStyle?.scale || 1})`,
                        }}
                      >
                        start
                      </span>{" "}
                      with a demo of your caption.
                    </span>
                  </div>
                </div>

                {/* Template Info and Color Palette */}
                <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-900/40 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{template.name}</span>
                    {localOverlay?.template === key && (
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium bg-blue-100 dark:bg-blue-500/20 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {[template.styles.color, template.styles.highlightStyle?.backgroundColor].map((color, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full ring-1 ring-black/5 dark:ring-white/10"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="typography" className="space-y-6 max-h-[500px] overflow-y-auto">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Type className="w-4 h-4" />
                Typography Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Font Family */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Font Family</Label>
                <Select value={currentStyles.fontFamily} onValueChange={(value) => updateStyles({ fontFamily: value })}>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fonts.map((font) => (
                      <SelectItem key={font.value} value={font.value} className={`${font.value} text-xs`}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

             
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Font Size</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[Number.parseFloat(currentStyles.fontSize)]}
                      onValueChange={([value]) => updateStyles({ fontSize: `${value}rem` })}
                      min={0.5}
                      max={6}
                      step={0.1}
                      className="flex-1"
                    />
                    <span className="text-xs text-muted-foreground w-12">{currentStyles.fontSize}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium">Font Weight</Label>
                  <Select
                    value={String(currentStyles.highlightStyle?.fontWeight || 500)}
                    onValueChange={(value) => updateHighlightStyle({ fontWeight: Number.parseInt(value) })}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="300">Light</SelectItem>
                      <SelectItem value="400">Normal</SelectItem>
                      <SelectItem value="500">Medium</SelectItem>
                      <SelectItem value="600">Semi Bold</SelectItem>
                      <SelectItem value="700">Bold</SelectItem>
                      <SelectItem value="800">Extra Bold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Text Alignment */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Text Alignment</Label>
                <ToggleGroup
                  type="single"
                  className="justify-start gap-1"
                  value={currentStyles.textAlign}
                  onValueChange={(value) => {
                    if (value && ["left", "center", "right", "justify"].includes(value)) {
                      updateStyles({ textAlign: value as CaptionStyles["textAlign"] })
                    }
                  }}
                >
                  <ToggleGroupItem value="left" aria-label="Align left" className="h-10 w-10">
                    <AlignLeft className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="center" aria-label="Align center" className="h-10 w-10">
                    <AlignCenter className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="right" aria-label="Align right" className="h-10 w-10">
                    <AlignRight className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {/* Letter Spacing */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Letter Spacing</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    value={[Number.parseFloat(currentStyles.letterSpacing || "0")]}
                    onValueChange={([value]) => updateStyles({ letterSpacing: `${value}px` })}
                    min={-2}
                    max={10}
                    step={0.5}
                    className="flex-1"
                  />
                  <span className="text-xs text-muted-foreground w-12">{currentStyles.letterSpacing || "0px"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Colors Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Colors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Text Color */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Text Color</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <div
                      className="h-8 w-8 rounded-md border cursor-pointer"
                      style={{ backgroundColor: currentStyles.color }}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-[330px] dark:bg-gray-900 border border-gray-700" side="right">
                    <ColorPicker
                      value={currentStyles.color}
                      onChange={(color) => updateStyles({ color })}
                      hideHue
                      hideControls
                      hideColorTypeBtns
                      hideAdvancedSliders
                      hideColorGuide
                      hideInputType
                      height={200}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium">Highlight Background</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <div
                      className="h-8 w-8 rounded-md border cursor-pointer"
                      style={{
                        backgroundColor: currentStyles.highlightStyle?.backgroundColor,
                      }}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-[330px] dark:bg-gray-900 border border-gray-700" side="right">
                    <ColorPicker
                      value={currentStyles.highlightStyle?.backgroundColor}
                      onChange={(color) => {
                        updateHighlightStyle({ backgroundColor: color })
                      }}
                      hideInputs
                      hideHue
                      hideControls
                      hideColorTypeBtns
                      hideAdvancedSliders
                      hideColorGuide
                      hideInputType
                      height={200}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="effects" className="space-y-6 max-h-[500px] overflow-y-auto">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Move className="w-4 h-4" />
                Text Effects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Text Shadow */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Text Shadow</Label>
                <Input
                  value={currentStyles.textShadow || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateStyles({ textShadow: e.target.value })}
                  className="h-8 text-xs"
                  placeholder="2px 2px 4px rgba(0,0,0,0.5)"
                />
              </div>

              {/* Background Color */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Background Color</Label>
                <Input
                  value={currentStyles.backgroundColor || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateStyles({ backgroundColor: e.target.value })
                  }
                  className="h-8 text-xs"
                  placeholder="rgba(0,0,0,0.8)"
                />
              </div>

              {/* Padding */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Padding</Label>
                <Input
                  value={currentStyles.padding || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateStyles({ padding: e.target.value })}
                  className="h-8 text-xs"
                  placeholder="24px"
                />
              </div>
            </CardContent>
          </Card>

          {/* Animation Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Animation
                <Badge fontVariant="secondary" className="text-xs">
                  New
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Animation Type */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Animation Type</Label>
                <Select
                  value={currentStyles.animation?.type || "none"}
                  onValueChange={(value) => updateAnimation({ type: value as any })}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="fade">Fade In</SelectItem>
                    <SelectItem value="slide">Slide Up</SelectItem>
                    <SelectItem value="typewriter">Typewriter</SelectItem>
                    <SelectItem value="bounce">Bounce</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {currentStyles.animation?.type !== "none" && (
                <>
                  {/* Animation Duration */}
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Duration (ms)</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[currentStyles.animation?.duration || 500]}
                        onValueChange={([value]) => updateAnimation({ duration: value })}
                        min={100}
                        max={2000}
                        step={100}
                        className="flex-1"
                      />
                      <span className="text-xs text-muted-foreground w-12">
                        {currentStyles.animation?.duration || 500}ms
                      </span>
                    </div>
                  </div>

                  {/* Animation Delay */}
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Delay (ms)</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[currentStyles.animation?.delay || 0]}
                        onValueChange={([value]) => updateAnimation({ delay: value })}
                        min={0}
                        max={1000}
                        step={50}
                        className="flex-1"
                      />
                      <span className="text-xs text-muted-foreground w-12">
                        {currentStyles.animation?.delay || 0}ms
                      </span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
