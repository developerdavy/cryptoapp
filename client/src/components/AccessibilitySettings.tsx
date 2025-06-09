import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Moon, Eye, Palette } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AccessibilitySettings() {
  const { theme, setTheme, isHighContrast, toggleHighContrast } = useTheme();

  const getThemeIcon = () => {
    if (isHighContrast) {
      return <Eye className="h-4 w-4" />;
    }
    return theme.includes("dark") ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />;
  };

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      case "high-contrast-light":
        return "High Contrast Light";
      case "high-contrast-dark":
        return "High Contrast Dark";
      default:
        return "Theme";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
          {getThemeIcon()}
          <span className="hidden md:inline">{getThemeLabel()}</span>
          {isHighContrast && (
            <Badge variant="secondary" className="text-xs">
              HC
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center space-x-2">
          <Palette className="h-4 w-4" />
          <span>Accessibility & Themes</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="h-4 w-4 mr-2" />
          Light Theme
          {theme === "light" && <Badge className="ml-auto text-xs">Active</Badge>}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="h-4 w-4 mr-2" />
          Dark Theme
          {theme === "dark" && <Badge className="ml-auto text-xs">Active</Badge>}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => setTheme("high-contrast-light")}>
          <Eye className="h-4 w-4 mr-2" />
          High Contrast Light
          {theme === "high-contrast-light" && <Badge className="ml-auto text-xs">Active</Badge>}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => setTheme("high-contrast-dark")}>
          <Eye className="h-4 w-4 mr-2" />
          High Contrast Dark
          {theme === "high-contrast-dark" && <Badge className="ml-auto text-xs">Active</Badge>}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={toggleHighContrast}>
          <Eye className="h-4 w-4 mr-2" />
          {isHighContrast ? "Disable" : "Enable"} High Contrast
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}