import React from 'react';

export default function SectionHeader({
  pretitle,
  title,
  subtitle,
  centered = true,
  theme = 'dark-text' // 'dark-text' or 'light-text'
}) {
  return (
    <div className={`section-header-block ${centered ? '' : 'section-header-left'}`}>
      {pretitle && (
        <span className="section-pretitle">
          <span style={{ width: 18, height: 1.5, background: 'var(--color-tan)', display: 'inline-block' }}></span>
          {pretitle}
        </span>
      )}
      <h2 className={`section-title ${theme === 'light-text' ? 'light' : ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`section-subtitle ${theme === 'light-text' ? 'light' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
