import {
  BookOpen,
  Box,
  Code2,
  Cpu,
  Database,
  Gauge,
  Layout,
  Monitor,
  Server,
} from "lucide-react";

export const getIcon = (icon: string, color: string) => {
  switch (icon) {
    case "Gauge":
      return <Gauge className="w-6 h-6" style={{ color: color }} />;
    case "Code2":
      return <Code2 className="w-6 h-6" style={{ color: color }} />;
    case "Layout":
      return <Layout className="w-6 h-6" style={{ color: color }} />;
    case "Server":
      return <Server className="w-6 h-6" style={{ color: color }} />;
    case "Monitor":
      return <Monitor className="w-6 h-6" style={{ color: color }} />;
    case "Database":
      return <Database className="w-6 h-6" style={{ color: color }} />;
    case "Cpu":
      return <Cpu className="w-6 h-6" style={{ color: color }} />;
    case "Box":
      return <Box className="w-6 h-6" style={{ color: color }} />;
    case "BookOpen":
      return <BookOpen className="w-6 h-6" style={{color: 'white'}} />;
    default:
      return null;
  }
};
