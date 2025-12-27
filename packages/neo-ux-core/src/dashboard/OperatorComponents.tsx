import { neo } from "../theme";

interface SystemHealthCardProps {
  title: string;
  status: "ok" | "warn" | "error";
  subtitle?: string;
  icon?: React.ReactNode;
}

export function SystemHealthCard({ title, status, subtitle, icon }: SystemHealthCardProps) {
  const glowClass = status === "ok" 
    ? neo.glow.success 
    : status === "warn" 
    ? neo.glow.warning 
    : neo.glow.error;
    
  const statusColor = status === "ok"
    ? neo.colors.text.success
    : status === "warn"
    ? neo.colors.text.warning
    : neo.colors.text.error;
    
  const statusText = status === "ok" ? "OK" : status === "warn" ? "WARN" : "ERROR";

  return (
    <div 
      className={`${neo.colors.bg.secondary} border ${neo.colors.border.glow} rounded-lg ${neo.spacing.card} ${glowClass} transition-all duration-300`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {icon && <span className="text-neutral-400">{icon}</span>}
            <h3 className={`text-sm font-semibold ${neo.colors.text.primary}`}>
              {title}
            </h3>
          </div>
          {subtitle && (
            <p className={`text-xs mt-1 ${neo.colors.text.tertiary}`}>
              {subtitle}
            </p>
          )}
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded ${statusColor} border ${neo.colors.border.glow}`}>
          {statusText}
        </span>
      </div>
    </div>
  );
}

interface OperatorNotesProps {
  notes: string[];
}

export function OperatorNotes({ notes }: OperatorNotesProps) {
  return (
    <div 
      className={`${neo.colors.bg.secondary} border ${neo.colors.border.default} rounded-lg ${neo.spacing.card}`}
    >
      <h3 className={`text-sm font-semibold ${neo.colors.text.accent} mb-3`}>
        📝 Operator Notes
      </h3>
      <ul className="space-y-2">
        {notes.map((note, i) => (
          <li key={i} className={`text-xs ${neo.colors.text.secondary} flex gap-2`}>
            <span className={neo.colors.text.tertiary}>•</span>
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface QuickLinksProps {
  links: Array<{ label: string; href: string; icon?: string }>;
}

export function QuickLinks({ links }: QuickLinksProps) {
  return (
    <div 
      className={`${neo.colors.bg.secondary} border ${neo.colors.border.default} rounded-lg ${neo.spacing.card}`}
    >
      <h3 className={`text-sm font-semibold ${neo.colors.text.accent} mb-3`}>
        🔗 Quick Links
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`${neo.colors.bg.tertiary} hover:${neo.colors.bg.secondary} border ${neo.colors.border.default} hover:${neo.colors.border.glow} rounded px-3 py-2 text-xs ${neo.colors.text.secondary} hover:${neo.colors.text.primary} transition-all ${neo.glow.idle} hover:${neo.glow.active}`}
          >
            {link.icon && <span className="mr-1">{link.icon}</span>}
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
