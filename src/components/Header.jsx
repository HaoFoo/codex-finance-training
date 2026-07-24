import { List, X } from "@phosphor-icons/react";
import { useState } from "react";
import { navigation } from "../data/course";

export function Header({ activeSection }) {
  const [open, setOpen] = useState(false);

  const navigate = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className="site-header" data-nav>
      <button className="brand-button" type="button" onClick={() => navigate("overview")}>
        <span className="brand-mark" aria-hidden="true">C</span>
        <span>
          <strong>Codex 财运智能工作流</strong>
          <small>财运学院 · AI 实践课</small>
        </span>
      </button>

      <button
        className="menu-button"
        type="button"
        aria-label={open ? "关闭导航" : "打开导航"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={22} /> : <List size={22} />}
      </button>

      <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="课程章节">
        {navigation.map((item) => (
          <button
            className={activeSection === item.id ? "nav-link is-active" : "nav-link"}
            type="button"
            key={item.id}
            onClick={() => navigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

