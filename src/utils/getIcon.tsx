import {
  Box,
  Code2,
  Cpu,
  Database,
  Gauge,
  Layout,
  Monitor,
  Server,
} from "lucide-react";

export const getIcon = (icon: string, color: string, className: string = "w-6 h-6") => {
  switch (icon) {
    case "Gauge":
      return <Gauge className={className} style={{ color: color }} />;
    case "Code2":
      return <Code2 className={className} style={{ color: color }} />;
    case "Layout":
      return <Layout className={className} style={{ color: color }} />;
    case "Server":
      return <Server className={className} style={{ color: color }} />;
    case "Monitor":
      return <Monitor className={className} style={{ color: color }} />;
    case "Database":
      return <Database className={className} style={{ color: color }} />;
    case "Cpu":
      return <Cpu className={className} style={{ color: color }} />;
    case "Box":
      return <Box className={className} style={{ color: color }} />;
    default:
      return null;
  }
};
