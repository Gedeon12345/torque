import { useEffect, useRef, useState } from "react";
import { LayoutDashboard, LogOut, Package, User } from "lucide-react";
import { Link } from "react-router-dom";
import IconButton from "@/components/ui/IconButton";
import { useAuth } from "@/store/AuthProvider";

/** Menu déroulant desktop : avatar avec les initiales, compte et commandes. */
export default function AccountMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onClick = (event) => { if (!ref.current?.contains(event.target)) setOpen(false); };
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <IconButton label="Mon compte" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="!size-11">
        <span className="grid size-8 place-items-center rounded-full bg-ink text-xs font-bold text-bg">{initials}</span>
      </IconButton>
      {open && (
        <div role="menu" className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-line bg-surface py-1.5 shadow-[0_18px_40px_-20px_rgba(20,24,32,0.5)]">
          <p className="truncate px-4 py-2 text-sm text-ink-2">{user.email}</p>
          <Link to="/account" role="menuitem" onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-[15px] hover:bg-ink/6">
            <User size={17} aria-hidden="true" /> Mon compte
          </Link>
          <Link to="/orders" role="menuitem" onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-[15px] hover:bg-ink/6">
            <Package size={17} aria-hidden="true" /> Mes commandes
          </Link>
          {user.role === "admin" && (
            <>
              <div className="my-1 border-t border-line" />
              <Link to="/admin" role="menuitem" onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-[15px] font-semibold text-accent hover:bg-ink/6">
                <LayoutDashboard size={17} aria-hidden="true" /> Dashboard admin
              </Link>
            </>
          )}
          <button type="button" role="menuitem" onClick={() => { logout(); setOpen(false); }} className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[15px] text-danger hover:bg-ink/6">
            <LogOut size={17} aria-hidden="true" /> Se déconnecter
          </button>
        </div>
      )}
    </div>
  );
}
