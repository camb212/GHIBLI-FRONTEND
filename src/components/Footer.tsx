// src/components/Piedepagina.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface FooterData {
  links: { label: string; path?: string; url?: string }[];
  socials: { twitter?: string; youtube?: string; facebook?: string };
  copyright: string;
}

export const Piedepagina: React.FC = () => {
  const [data, setData] = useState<FooterData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://baner.png");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error cargando pie de página:", err);
      }
    };
    fetchData();
  }, []);

  if (!data) return null;

  return (
    <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        {data.links.map((link, i) =>
          link.path ? (
            <Link key={i} to={link.path} className="link link-hover">
              {link.label}
            </Link>
          ) : (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover"
            >
              {link.label}
            </a>
          )
        )}
      </nav>

      <nav>
        <div className="grid grid-flow-col gap-4">
          {data.socials.twitter && (
            <a href={data.socials.twitter} target="_blank" rel="noreferrer">
              <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24">
                <path d="M24 4.557c-..." />
              </svg>
            </a>
          )}
          {data.socials.youtube && (
            <a href={data.socials.youtube} target="_blank" rel="noreferrer">
              <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-..." />
              </svg>
            </a>
          )}
          {data.socials.facebook && (
            <a href={data.socials.facebook} target="_blank" rel="noreferrer">
              <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-..." />
              </svg>
            </a>
          )}
        </div>
      </nav>

      <aside>
        <p>© {new Date().getFullYear()} - All rights reserved by {data.copyright}</p>
      </aside>
    </footer>
  );
};
