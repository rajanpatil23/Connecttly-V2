import statBrands from "@/assets/_zip/stats/brands.png";
import statSatisfaction from "@/assets/_zip/stats/satisfaction.png";
import statProjects from "@/assets/_zip/stats/projects.png";
import statSupport from "@/assets/_zip/stats/support.png";

export const sharedStats = [
  { icon: <img src={statBrands} alt="" className="w-14 h-14 object-contain" />, value: "70+", label: "SaaS brands served", bareIcon: true },
  { icon: <img src={statSatisfaction} alt="" className="w-14 h-14 object-contain" />, value: "98%", label: "Client satisfaction", bareIcon: true },
  { icon: <img src={statProjects} alt="" className="w-14 h-14 object-contain" />, value: "500+", label: "Projects delivered", bareIcon: true },
  { icon: <img src={statSupport} alt="" className="w-14 h-14 object-contain" />, value: "24/7", label: "Support available", bareIcon: true },
];
