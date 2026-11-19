import logoPath from "@/assets/saasgama-logo.png";

interface SaaSGamaLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-6",
  md: "h-10",
  lg: "h-12",
};

export function SaaSGamaLogo({ size = "md", className = "" }: SaaSGamaLogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <img src={logoPath} alt="SaaSGama" className={`${sizeClasses[size]} w-auto object-contain`} />
    </div>
  );
}
