const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t hairline py-8">
      <div className="container-page flex flex-col items-center justify-between gap-4 text-sm text-muted md:flex-row">
        <p className="flex items-center gap-2">
          <img src="/myLogoGold.svg" alt="" width={18} height={18} />© {year}{' '}
          Al-Baraa Mansour
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="link-sweep transition-colors hover:text-foreground"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
};

export default Footer;
