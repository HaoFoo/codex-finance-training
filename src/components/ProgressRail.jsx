import { navigation } from "../data/course";

export function ProgressRail({ activeSection }) {
  return (
    <aside className="progress-rail" aria-label="课程进度">
      {navigation.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={activeSection === item.id ? "is-active" : ""}
          aria-label={item.label}
        >
          <span />
        </a>
      ))}
    </aside>
  );
}

