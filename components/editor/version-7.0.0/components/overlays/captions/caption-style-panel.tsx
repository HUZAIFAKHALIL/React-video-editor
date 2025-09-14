import React, { useState } from "react";
import { CaptionOverlay } from "../../../types";
import { captionTemplates } from "../../../templates/caption-templates";
import {
  Type,
  Palette,
  Sparkles,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Layers,
  Move,
  Badge,
} from "lucide-react";

import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ColorPicker from "react-best-gradient-color-picker";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";

interface CaptionStylePanelProps {
  localOverlay: CaptionOverlay;
  setLocalOverlay: (overlay: CaptionOverlay) => void;
}

export const CaptionStylePanel: React.FC<CaptionStylePanelProps> = ({
  localOverlay,
  setLocalOverlay,
}) => {
  const [activeTab, setActiveTab] = useState("templates");

  // Safe style updater
  const handleStyleChange = (
    field: keyof NonNullable<CaptionOverlay["styles"]>,
    value: any
  ) => {
    setLocalOverlay({
      ...localOverlay,
      styles: {
        ...(localOverlay.styles || {}),
        [field]: value,
      },
    });
  };

const handleTextAlignChange = (value: "left" | "center" | "right") => {
  if (!value) return;
  console.log("Updating textAlign to:", value);
  console.log("Current styles before update:", localOverlay.styles.textAlign);
  setLocalOverlay({
    ...localOverlay,
    styles: {
      ...(localOverlay.styles ?? {}),
      textAlign: value,
    },
  });
};



  const handleHighlightChange = (
    field: keyof NonNullable<
      NonNullable<CaptionOverlay["styles"]>["highlightStyle"]
    >,
    value: any
  ) => {
    setLocalOverlay({
      ...localOverlay,
      styles: {
        ...(localOverlay.styles || {}),
        highlightStyle: {
          ...(localOverlay.styles?.highlightStyle || {}),
          [field]: value,
        },
      },
    });
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 gap-3 overflow-y-auto">
            {Object.entries(captionTemplates).map(([key, template]) => (
              <button
                key={key}
                onClick={() => {
                  setLocalOverlay({
                    ...localOverlay,
                    template: key,
                    styles: template.styles,
                  });
                }}
                className={`group relative overflow-hidden rounded-lg border transition-all duration-200
                  ${
                    localOverlay?.template === key
                      ? "border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/30 dark:ring-blue-400/30"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100/80 dark:hover:bg-gray-800/50"
                  }`}
              >
                {/* Preview */}
                <div className="relative aspect-[16/7] w-full overflow-hidden bg-gray-900/90">
                  <div className="absolute inset-0 flex items-center justify-center p-10">
                    <span
                      style={{
                        ...Object.fromEntries(
                          Object.entries(template.styles).filter(([key]) => key !== "animation")
                        ),
                        fontSize: "1.2rem",
                        lineHeight: "1.2",
                      }}
                    >
                      Let&apos;s{" "}
                      <span
                        style={{
                          ...template.styles.highlightStyle,
                          transform: `scale(${
                            template.styles.highlightStyle?.scale || 1
                          })`,
                        }}
                      >
                        start
                      </span>{" "}
                      with a demo of your caption.
                    </span>
                  </div>
                </div>

                {/* Info Row */}
                <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-900/40 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
                      {template.name}
                    </span>
                    {localOverlay?.template === key && (
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium bg-blue-100 dark:bg-blue-500/20 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {[
                      template.styles.color,
                      template.styles.highlightStyle?.backgroundColor,
                    ].map((color, i) => (
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

        {/* Typography Tab */}
        <TabsContent
          value="typography"
          className="space-y-6 max-h-full overflow-y-auto"
        >
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
                <Select
                  value={localOverlay.styles?.fontFamily || "Inter, sans-serif"}
                  onValueChange={(value) =>
                    handleStyleChange("fontFamily", value)
                  }
                >
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      { value: "Inter, sans-serif", label: "Inter (Sans-serif)" },
                      { value: "Montserrat, sans-serif", label: "Montserrat" },
                      { value: "Space Grotesk, sans-serif", label: "Space Grotesk" },
                      { value: "Playfair Display, serif", label: "Playfair Display" },
                      { value: "Caveat, cursive", label: "Caveat" },
                      { value: "Courier Prime, monospace", label: "Courier Prime" },
                      { value: "Orbitron, sans-serif", label: "Orbitron" },
                      { value: "Comic Neue, cursive", label: "Comic Neue" },
                    ].map((font) => (
                      <SelectItem
                        key={font.value}
                        value={font.value}
                        className={`${font.value} text-xs`}
                      >
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Font Size + Weight */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Font Size</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[
                        Number.parseFloat(
                          localOverlay.styles?.fontSize?.replace("rem", "") ||
                            "2"
                        ),
                      ]}
                      onValueChange={([value]) =>
                        handleStyleChange("fontSize", `${value}rem`)
                      }
                      min={0.5}
                      max={6}
                      step={0.1}
                      className="flex-1"
                    />
                    <span className="text-xs text-muted-foreground w-12">
                      {localOverlay.styles?.fontSize || "2rem"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium">Font Weight</Label>
                  <Select
                    value={String(localOverlay.styles?.fontWeight || 500)}
                    onValueChange={(value) =>
                      handleStyleChange("fontWeight", Number(value))
                    }
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

              {/* Highlight Weight */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Highlight Weight</Label>
                <Select
                  value={String(localOverlay.styles?.highlightStyle?.fontWeight || 600)}
                  onValueChange={(value) =>
                    handleHighlightChange("fontWeight", Number(value))
                  }
                >
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="400">Normal</SelectItem>
                    <SelectItem value="500">Medium</SelectItem>
                    <SelectItem value="600">Semi Bold</SelectItem>
                    <SelectItem value="700">Bold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Text Alignment */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Text Alignment</Label>
                <ToggleGroup
                  type="single"
                  className="justify-start gap-1"
                  value={localOverlay.styles?.textAlign }
                  onValueChange={(value) => {
                    if (value) handleTextAlignChange(value as "left" | "center" | "right");
                  }}
                >
                  <ToggleGroupItem value="left" className="h-10 w-10">
                    <AlignLeft className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="center" className="h-10 w-10">
                    <AlignCenter className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="right" className="h-10 w-10">
                    <AlignRight className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {/* Letter Spacing */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Letter Spacing</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    value={[
                      Number.parseFloat(
                        localOverlay.styles?.letterSpacing?.replace(/[a-z]/g, "") ||
                          "0"
                      ),
                    ]}
                    onValueChange={([value]) =>
                      handleStyleChange("letterSpacing", `${value}em`)
                    }
                    min={-0.1}
                    max={1}
                    step={0.01}
                    className="flex-1"
                  />
                  <span className="text-xs text-muted-foreground w-12">
                    {localOverlay.styles?.letterSpacing || "0em"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Color Settings */}
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
                      style={{ backgroundColor: localOverlay.styles?.color }}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-[330px] dark:bg-gray-900 border border-gray-700" side="right">
                    <ColorPicker
                      value={localOverlay.styles?.color || "#000000"}
                      onChange={(color) => handleStyleChange("color", color)}
                      hideControls
                      hideHue
                      hideColorGuide
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Highlight Background */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Highlight Background</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <div
                      className="h-8 w-8 rounded-md border cursor-pointer"
                      style={{
                        backgroundColor: localOverlay.styles?.highlightStyle?.backgroundColor,
                      }}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-[330px] dark:bg-gray-900 border border-gray-700" side="right">
                    <ColorPicker
                      value={localOverlay.styles?.highlightStyle?.backgroundColor || "#ff0"}
                      onChange={(color) =>
                        handleHighlightChange("backgroundColor", color)
                      }
                      hideControls
                      hideHue
                      hideColorGuide
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      <TabsContent value="effects" className="space-y-6 max-h-full overflow-y-auto">
        <Card>
          <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Move className="w-4 h-4" />
          Text Effects
        </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-xs font-medium">Text Shadow</Label>
          <Input
            value={localOverlay.styles?.textShadow || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStyleChange("textShadow", e.target.value)}
            className="h-8 text-xs"
            placeholder="2px 2px 4px rgba(0,0,0,0.5)"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-medium">Background Color</Label>
          <Input
            value={localOverlay.styles?.backgroundColor || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleStyleChange("backgroundColor", e.target.value)
            }
            className="h-8 text-xs"
            placeholder="rgba(0,0,0,0.8)"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-medium">Padding</Label>
          <Input
            value={localOverlay.styles?.padding || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStyleChange("padding", e.target.value)}
            className="h-8 text-xs"
            placeholder="24px"
          />
        </div>
          </CardContent>
        </Card>

        {/* <Card>
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
        <div className="space-y-2">
          <Label className="text-xs font-medium">Animation Type</Label>
          <Select
            value={localOverlay.styles?.animation?.type || "none"}
            onValueChange={(value) =>
          handleStyleChange("animation", {
            ...localOverlay.styles?.animation,
            type: value as any,
          })
            }
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

        {localOverlay.styles?.animation?.type !== "none" && (
          <>
            <div className="space-y-2">
          <Label className="text-xs font-medium">Duration (ms)</Label>
          <div className="flex items-center gap-2">
            <Slider
              value={[localOverlay.styles?.animation?.duration || 500]}
              onValueChange={([value]) =>
            handleStyleChange("animation", {
              ...localOverlay.styles?.animation,
              duration: value,
            })
              }
              min={100}
              max={2000}
              step={100}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-12">{localOverlay.styles?.animation?.duration || 500}ms</span>
          </div>
            </div>

            <div className="space-y-2">
          <Label className="text-xs font-medium">Delay (ms)</Label>
          <div className="flex items-center gap-2">
            <Slider
              value={[localOverlay.styles?.animation?.delay || 0]}
              onValueChange={([value]) =>
            handleStyleChange("animation", {
              ...localOverlay.styles?.animation,
              delay: value,
            })
              }
              min={0}
              max={1000}
              step={50}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-12">{localOverlay.styles?.animation?.delay || 0}ms</span>
          </div>
            </div>
          </>
        )}
          </CardContent>
        </Card> */}|
        
      </TabsContent> 
      </Tabs>
    </div>
  );
};
