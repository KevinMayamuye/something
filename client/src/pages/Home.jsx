import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

/** Central copy + branding — edit here only */
const STORE = {
  name: "Scholar",
  nameAccent: "Capital",
  tagline: "PREMIUM STORE",
  currency: "R",
  promoCode: "SCHOLAR10",
  freeShippingThreshold: "500",
  hero: {
    pill: "NEW SEASON COLLECTION",
    line1: "Equip Your",
    line2Italic: "Academic",
    line3: "Journey",
    sub: "Premium stationery, bags, and accessories crafted for scholars who value quality and sophistication in every detail.",
    ctaPrimary: "Shop Collection",
    ctaSecondary: "View Lookbook",
  },
  featured: {
    kicker: "FEATURED PRODUCTS",
    title: "Curated for Scholars",
  },
  promo: {
    kicker: "LIMITED OFFER",
    titleLine1: "Start of Year",
    titleLine2: "Sale — Up to 30% Off",
    sub: "Stock up for the new academic year. Selected bags, stationery sets, and accessories at their lowest prices.",
    cta: "Shop the Sale",
  },
  newsletter: {
    kicker: "STAY IN THE LOOP",
    title: "Scholar Drops & Offers",
    sub: "Get notified about new arrivals, exclusive discounts, and back-to-school bundles. No spam — ever.",
  },
  footerTagline:
    "Premium academic supplies for students who refuse to compromise on quality.",
};

const products = [
  { id: 1, name: "Structured Briefcase", category: "Bags", price: 284, comparePrice: 340, badge: "BESTSELLER", rating: 4.8, reviews: 124, color: "#B0BEC5" },
  { id: 2, name: "Executive Pen Set", category: "Stationery", price: 96, comparePrice: null, badge: "NEW", rating: 4.9, reviews: 48, color: "#455A64" },
  { id: 3, name: "Leather Planner", category: "Stationery", price: 148, comparePrice: 180, badge: "SALE", rating: 4.7, reviews: 87, color: "#263238" },
  { id: 4, name: "Canvas Tote", category: "Bags", price: 72, comparePrice: null, badge: null, rating: 4.6, reviews: 63, color: "#78909C" },
  { id: 5, name: "Desk Organiser", category: "Accessories", price: 118, comparePrice: 140, badge: "SALE", rating: 4.8, reviews: 95, color: "#546E7A" },
  { id: 6, name: "Hardcover Journal", category: "Stationery", price: 54, comparePrice: null, badge: "NEW", rating: 5.0, reviews: 29, color: "#37474F" },
];

const categories = ["All", "Bags", "Stationery", "Accessories"];

const navLinks = ["Collections", "New Arrivals", "Sale", "About", "Contact"];

/** Deterministic placeholder photos (stable per product id) */
function productPlaceholderImageUrl(productId) {
  return `https://picsum.photos/seed/scholarcapital-${productId}/800/550`;
}

function StrokeIcon({ size = 22, color = "#455A64", children }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {children}
    </svg>
  );
}

function IconPackage({ size = 18, color = "#546E7A" }) {
  return (
    <StrokeIcon size={size} color={color}>
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </StrokeIcon>
  );
}

function IconReturn({ size = 18, color = "#546E7A" }) {
  return (
    <StrokeIcon size={size} color={color}>
      <path d="M3 7v6h6" />
      <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" />
    </StrokeIcon>
  );
}

function IconLockShield({ size = 18, color = "#546E7A" }) {
  return (
    <StrokeIcon size={size} color={color}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </StrokeIcon>
  );
}

function IconBriefcaseBag({ size = 22, color = "#455A64" }) {
  return (
    <StrokeIcon size={size} color={color}>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 7V5a4 4 0 00-8 0v2" />
    </StrokeIcon>
  );
}

function IconPencilLine({ size = 22, color = "#455A64" }) {
  return (
    <StrokeIcon size={size} color={color}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
    </StrokeIcon>
  );
}

function IconLayoutGrid({ size = 22, color = "#455A64" }) {
  return (
    <StrokeIcon size={size} color={color}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </StrokeIcon>
  );
}

function IconLaptop({ size = 22, color = "#455A64" }) {
  return (
    <StrokeIcon size={size} color={color}>
      <rect x="2" y="4" width="20" height="12" rx="1" />
      <path d="M2 18h20" />
    </StrokeIcon>
  );
}

function IconImageArt({ size = 22, color = "#455A64" }) {
  return (
    <StrokeIcon size={size} color={color}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </StrokeIcon>
  );
}

function IconClipboardLines({ size = 22, color = "#455A64" }) {
  return (
    <StrokeIcon size={size} color={color}>
      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
      <path d="M15 4V3a3 3 0 10-6 0v1" />
      <path d="M9 12h6" />
      <path d="M9 16h6" />
    </StrokeIcon>
  );
}

function IconGift({ size = 22, color = "#455A64" }) {
  return (
    <StrokeIcon size={size} color={color}>
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" rx="1" />
      <path d="M12 22v-15" />
      <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7s1-5 4.5-5a2.5 2.5 0 010 5H12" />
    </StrokeIcon>
  );
}

const categoryStripItems = [
  { label: "Bags & Cases", Icon: IconBriefcaseBag },
  { label: "Stationery", Icon: IconPencilLine },
  { label: "Accessories", Icon: IconLayoutGrid },
  { label: "Tech Gear", Icon: IconLaptop },
  { label: "Art Supplies", Icon: IconImageArt },
  { label: "Organizers", Icon: IconClipboardLines },
  { label: "Gifts", Icon: IconGift },
];

function ProductCard({ product, index, onAddToCart }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const badgeColors = {
    SALE: { bg: "#FF6F00", text: "#fff" },
    NEW: { bg: "#1DE9B6", text: "#263238" },
    BESTSELLER: { bg: "#263238", text: "#fff" },
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: hovered
          ? "0 20px 48px rgba(38,50,56,.14), 0 4px 16px rgba(38,50,56,.08)"
          : "0 1px 4px rgba(38,50,56,.08)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all .35s cubic-bezier(.22,1,.36,1)",
        animationDelay: `${index * 80}ms`,
        animationFillMode: "both",
        animation: "homeFadeUp .5s ease both",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "relative",
          background: `linear-gradient(135deg, ${product.color}18, #ECEFF1)`,
          height: 220,
          overflow: "hidden",
        }}
      >
        <img
          src={productPlaceholderImageUrl(product.id)}
          alt={product.name}
          width={800}
          height={550}
          loading="lazy"
          decoding="async"
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform .4s ease",
          }}
        />

        {product.badge && (
          <div
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              background: badgeColors[product.badge].bg,
              color: badgeColors[product.badge].text,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              padding: "4px 10px",
              borderRadius: 9999,
              fontFamily: "'Source Sans 3', system-ui, sans-serif",
            }}
          >
            {product.badge}
          </div>
        )}

        <button
          type="button"
          aria-label="Add to wishlist"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "rgba(255,255,255,.9)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: hovered ? 1 : 0,
            transition: "opacity .2s",
            boxShadow: "0 2px 8px rgba(38,50,56,.12)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#455A64" strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
      </div>

      <div style={{ padding: "18px 20px 20px" }}>
        <div
          style={{
            fontSize: 11,
            color: "#B0BEC5",
            fontWeight: 600,
            letterSpacing: "0.1em",
            marginBottom: 5,
            fontFamily: "'Source Sans 3', system-ui, sans-serif",
          }}
        >
          {product.category.toUpperCase()}
        </div>
        <div style={{ fontSize: 17, fontWeight: 600, color: "#263238", marginBottom: 8, fontFamily: "'Source Serif 4', Georgia, serif", lineHeight: 1.3 }}>{product.name}</div>

        <div style={{ display: "flex", gap: 2, alignItems: "center", marginBottom: 14 }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <svg key={i} width="11" height="11" viewBox="0 0 12 12" fill={i <= Math.round(product.rating) ? "#FF6F00" : "#E0E0E0"}>
              <path d="M6 1l1.3 2.6 2.9.4-2.1 2 .5 2.9L6 7.5 3.4 9l.5-2.9L2 4l2.9-.4z" />
            </svg>
          ))}
          <span style={{ fontSize: 11, color: "#90A4AE", marginLeft: 4, fontFamily: "'Source Sans 3', system-ui, sans-serif" }}>
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontSize: 20, fontWeight: 700, color: "#263238", fontFamily: "'Source Sans 3', system-ui, sans-serif" }}>
              {STORE.currency}
              {product.price}
            </span>
            {product.comparePrice != null && (
              <span
                style={{
                  fontSize: 13,
                  color: "#B0BEC5",
                  textDecoration: "line-through",
                  marginLeft: 8,
                  fontFamily: "'Source Sans 3', system-ui, sans-serif",
                }}
              >
                {STORE.currency}
                {product.comparePrice}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleAdd();
            }}
            style={{
              background: added ? "#1DE9B6" : "#263238",
              color: added ? "#263238" : "#fff",
              border: "none",
              cursor: "pointer",
              padding: "9px 16px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              fontFamily: "'Source Sans 3', system-ui, sans-serif",
              letterSpacing: "0.03em",
              transition: "all .25s ease",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {added ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Added
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.96-1.61L23 6H6" />
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { user, loading } = useContext(AuthContext);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);

  const accountPath = loading || !user ? "/login" : "/dashboard";

  const marqueeSegment = (
    <>
      {"\u00A0\u00A0\u00A0\u00A0FREE SHIPPING ON ORDERS OVER "}
      {STORE.currency}
      {STORE.freeShippingThreshold}
      {" \u00A0·\u00A0 USE CODE "}
      <span style={{ color: "#1DE9B6", fontWeight: 700 }}>{STORE.promoCode}</span>
      {" FOR 10% OFF \u00A0·\u00A0 NEW ARRIVALS EVERY WEEK \u00A0·\u00A0"}
    </>
  );

  return (
    <div style={{ fontFamily: "'Source Sans 3', system-ui, sans-serif", background: "#F7F7F7", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; }

        @keyframes homeFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes homeFadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes homeSlideRight {
          from { transform: translateX(-32px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes homeMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .home-nav-link {
          color: #455A64; font-size: 14px; font-weight: 500;
          text-decoration: none; letter-spacing: 0.03em;
          transition: color .2s; cursor: pointer;
          background: none; border: none; font-family: inherit;
        }
        .home-nav-link:hover { color: #263238; }

        .home-cat-btn {
          padding: 8px 20px; border-radius: 9999px; font-size: 13px;
          font-weight: 600; letter-spacing: 0.04em; cursor: pointer;
          transition: all .22s ease; border: 1.5px solid transparent;
          font-family: 'Source Sans 3', system-ui, sans-serif;
        }
        .home-cat-btn.active {
          background: #263238; color: #fff; border-color: #263238;
        }
        .home-cat-btn.inactive {
          background: #fff; color: #455A64; border-color: #E0E0E0;
        }
        .home-cat-btn.inactive:hover {
          border-color: #455A64; color: #263238;
        }

        .home-page ::-webkit-scrollbar { width: 6px; }
        .home-page ::-webkit-scrollbar-track { background: #F7F7F7; }
        .home-page ::-webkit-scrollbar-thumb { background: #B0BEC5; border-radius: 3px; }
      `}</style>

      <div className="home-page">
        <div
          style={{
            background: "#263238",
            color: "#fff",
            textAlign: "center",
            fontSize: 12,
            fontWeight: 500,
            padding: "9px 20px",
            letterSpacing: "0.06em",
            overflow: "hidden",
          }}
        >
          <div style={{ animation: "homeMarquee 22s linear infinite", whiteSpace: "nowrap", display: "inline-block", color: "#fff" }}>
            {marqueeSegment}
            {marqueeSegment}
          </div>
        </div>

        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: scrolled ? "rgba(255,255,255,.96)" : "#fff",
            backdropFilter: scrolled ? "blur(12px)" : "none",
            boxShadow: scrolled ? "0 2px 16px rgba(38,50,56,.08)" : "none",
            borderBottom: "1px solid #F0F0F0",
            transition: "all .3s ease",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit" }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  background: "linear-gradient(135deg, #263238, #455A64)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1DE9B6" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#263238", letterSpacing: "-0.02em", lineHeight: 1.1, fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  {STORE.name}
                  <span style={{ color: "#455A64" }}>{STORE.nameAccent}</span>
                </div>
                <div style={{ fontSize: 9, color: "#B0BEC5", letterSpacing: "0.14em", fontWeight: 600 }}>{STORE.tagline}</div>
              </div>
            </Link>

            <nav style={{ display: "flex", gap: 32, alignItems: "center" }}>
              {navLinks.map((l) => (
                <button key={l} type="button" className="home-nav-link">
                  {l}
                </button>
              ))}
            </nav>

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#F7F7F7", borderRadius: 9999, padding: "8px 16px", marginRight: 8 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#90A4AE" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <span style={{ fontSize: 13, color: "#B0BEC5" }}>Search…</span>
              </div>
              <button
                type="button"
                style={{ width: 40, height: 40, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .2s" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#F7F7F7";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
                aria-label="Wishlist"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#455A64" strokeWidth="1.8">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
              <button
                type="button"
                style={{ position: "relative", width: 40, height: 40, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .2s" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#F7F7F7";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
                aria-label={`Cart, ${cartCount} items`}
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#455A64" strokeWidth="1.8">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.96-1.61L23 6H6" />
                </svg>
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      minWidth: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "#FF6F00",
                      color: "#fff",
                      fontSize: 9,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0 4px",
                    }}
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>
              <Link
                to={accountPath}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#263238",
                  color: "#fff",
                  border: "none",
                  borderRadius: 9999,
                  padding: "8px 16px",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "'Source Sans 3', system-ui, sans-serif",
                  marginLeft: 4,
                  textDecoration: "none",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Account
              </Link>
            </div>
          </div>
        </header>

        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 32px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#fff",
                border: "1.5px solid #E0E0E0",
                borderRadius: 9999,
                padding: "6px 14px",
                marginBottom: 28,
                animation: heroVisible ? "homeFadeIn .5s ease both" : "none",
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#1DE9B6", boxShadow: "0 0 8px #1DE9B6" }} />
              <span style={{ fontSize: 12, color: "#455A64", fontWeight: 600, letterSpacing: "0.08em" }}>{STORE.hero.pill}</span>
            </div>

            <h1
              style={{
                fontSize: 62,
                fontWeight: 700,
                lineHeight: 1.08,
                color: "#263238",
                marginBottom: 24,
                fontFamily: "'Source Serif 4', Georgia, serif",
                animation: heroVisible ? "homeSlideRight .6s .1s ease both" : "none",
              }}
            >
              {STORE.hero.line1}
              <br />
              <em style={{ color: "#455A64", fontStyle: "italic" }}>{STORE.hero.line2Italic}</em>
              <br />
              {STORE.hero.line3}
            </h1>

            <p
              style={{
                fontSize: 17,
                color: "#546E7A",
                lineHeight: 1.75,
                maxWidth: 440,
                marginBottom: 40,
                fontWeight: 400,
                animation: heroVisible ? "homeFadeUp .6s .2s ease both" : "none",
              }}
            >
              {STORE.hero.sub}
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", animation: heroVisible ? "homeFadeUp .6s .3s ease both" : "none" }}>
              <button
                type="button"
                style={{
                  background: "#263238",
                  color: "#fff",
                  border: "none",
                  borderRadius: 9999,
                  padding: "15px 36px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  letterSpacing: "0.04em",
                  fontFamily: "'Source Sans 3', system-ui, sans-serif",
                  boxShadow: "0 8px 24px rgba(38,50,56,.25)",
                  transition: "transform .2s, box-shadow .2s",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(38,50,56,.32)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(38,50,56,.25)";
                }}
              >
                {STORE.hero.ctaPrimary}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button
                type="button"
                style={{
                  background: "transparent",
                  color: "#455A64",
                  border: "1.5px solid #B0BEC5",
                  borderRadius: 9999,
                  padding: "15px 32px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  letterSpacing: "0.04em",
                  fontFamily: "'Source Sans 3', system-ui, sans-serif",
                  transition: "all .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#455A64";
                  e.currentTarget.style.color = "#263238";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#B0BEC5";
                  e.currentTarget.style.color = "#455A64";
                }}
              >
                {STORE.hero.ctaSecondary}
              </button>
            </div>

            <div style={{ display: "flex", gap: 28, marginTop: 48, flexWrap: "wrap", animation: heroVisible ? "homeFadeIn .8s .4s ease both" : "none" }}>
              {[
                { key: "ship", label: `Free shipping ${STORE.currency}${STORE.freeShippingThreshold}+`, Icon: IconPackage },
                { key: "returns", label: "30-day returns", Icon: IconReturn },
                { key: "secure", label: "Secure checkout", Icon: IconLockShield },
              ].map((b) => (
                <div key={b.key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <b.Icon size={18} color="#546E7A" />
                  <span style={{ fontSize: 12, color: "#78909C", fontWeight: 500 }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: "relative", height: 520, animation: heroVisible ? "homeFadeIn .8s .15s ease both" : "none" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(145deg, #263238 0%, #37474F 50%, #455A64 100%)",
                borderRadius: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", width: 380, height: 380, borderRadius: "50%", border: "1px solid rgba(176,190,197,.15)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
              <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", border: "1px solid rgba(176,190,197,.08)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

              <svg width="240" height="240" viewBox="0 0 240 240" style={{ position: "relative", zIndex: 2 }}>
                <rect x="30" y="80" width="180" height="130" rx="12" fill="#F7F7F7" opacity=".12" />
                <rect x="30" y="80" width="180" height="130" rx="12" fill="none" stroke="#B0BEC5" strokeWidth="2" opacity=".5" />
                <rect x="80" y="58" width="80" height="28" rx="8" fill="none" stroke="#B0BEC5" strokeWidth="2" opacity=".5" />
                <line x1="30" y1="130" x2="210" y2="130" stroke="#B0BEC5" strokeWidth="1.5" opacity=".3" />
                <rect x="100" y="118" width="40" height="24" rx="4" fill="#1DE9B6" opacity=".7" />
                <rect x="55" y="155" width="50" height="36" rx="3" fill="#455A64" opacity=".9" />
                <rect x="59" y="155" width="4" height="36" rx="1" fill="#1DE9B6" opacity=".8" />
                <rect x="110" y="148" width="50" height="43" rx="3" fill="#546E7A" opacity=".9" />
                <rect x="114" y="148" width="4" height="43" rx="1" fill="#FF6F00" opacity=".8" />
                <rect x="165" y="158" width="40" height="33" rx="3" fill="#37474F" opacity=".9" />
                <rect x="169" y="158" width="4" height="33" rx="1" fill="#B0BEC5" opacity=".8" />
              </svg>

              <div
                style={{
                  position: "absolute",
                  top: 32,
                  right: 28,
                  background: "rgba(255,255,255,.1)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 12,
                  padding: "12px 16px",
                  border: "1px solid rgba(255,255,255,.15)",
                }}
              >
                <div style={{ fontSize: 11, color: "#B0BEC5", marginBottom: 2 }}>This season</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", fontFamily: "'Source Serif 4', Georgia, serif" }}>48+</div>
                <div style={{ fontSize: 11, color: "#1DE9B6" }}>New Arrivals</div>
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: 32,
                  left: 28,
                  background: "rgba(255,255,255,.1)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 12,
                  padding: "12px 16px",
                  border: "1px solid rgba(255,255,255,.15)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} width="10" height="10" viewBox="0 0 12 12" fill="#FF6F00">
                      <path d="M6 1l1.3 2.6 2.9.4-2.1 2 .5 2.9L6 7.5 3.4 9l.5-2.9L2 4l2.9-.4z" />
                    </svg>
                  ))}
                </div>
                <div style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>4.9 / 5.0</div>
                <div style={{ fontSize: 11, color: "#B0BEC5" }}>2,400+ reviews</div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: "#fff", borderTop: "1px solid #F0F0F0", borderBottom: "1px solid #F0F0F0", padding: "28px 0" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", gap: 16, alignItems: "center", overflowX: "auto" }}>
            {categoryStripItems.map(({ label, Icon }) => (
              <button
                key={label}
                type="button"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 24px",
                  borderRadius: 12,
                  background: "#F7F7F7",
                  border: "1.5px solid transparent",
                  cursor: "pointer",
                  transition: "all .2s",
                  minWidth: "fit-content",
                  fontFamily: "'Source Sans 3', system-ui, sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#455A64";
                  e.currentTarget.style.background = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.background = "#F7F7F7";
                }}
              >
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 24 }}>
                  <Icon size={22} color="#455A64" />
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#455A64", whiteSpace: "nowrap" }}>{label}</span>
              </button>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontSize: 12, color: "#1DE9B6", fontWeight: 700, letterSpacing: "0.12em", marginBottom: 8 }}>{STORE.featured.kicker}</div>
              <h2 style={{ fontSize: 38, fontWeight: 700, color: "#263238", fontFamily: "'Source Serif 4', Georgia, serif", lineHeight: 1.1 }}>{STORE.featured.title}</h2>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`home-cat-btn ${activeCategory === cat ? "active" : "inactive"}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onAddToCart={() => setCartCount((c) => c + 1)} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button
              type="button"
              style={{
                background: "transparent",
                color: "#263238",
                border: "1.5px solid #263238",
                borderRadius: 9999,
                padding: "14px 48px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.04em",
                fontFamily: "'Source Sans 3', system-ui, sans-serif",
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#263238";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#263238";
              }}
            >
              View All Products
            </button>
          </div>
        </section>

        <section style={{ background: "#263238", padding: "80px 32px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(29,233,182,.06)" }} />
          <div style={{ position: "absolute", bottom: -40, left: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,111,0,.06)" }} />
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, position: "relative", zIndex: 1, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 12, color: "#1DE9B6", fontWeight: 700, letterSpacing: "0.12em", marginBottom: 12 }}>{STORE.promo.kicker}</div>
              <h2 style={{ fontSize: 46, fontWeight: 700, color: "#fff", fontFamily: "'Source Serif 4', Georgia, serif", lineHeight: 1.1, marginBottom: 16 }}>
                {STORE.promo.titleLine1}
                <br />
                {STORE.promo.titleLine2}
              </h2>
              <p style={{ color: "#90A4AE", fontSize: 16, maxWidth: 420, lineHeight: 1.7 }}>{STORE.promo.sub}</p>
            </div>
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <div style={{ display: "flex", gap: 16, marginBottom: 28, justifyContent: "center" }}>
                {[
                  ["12", "HOURS"],
                  ["34", "MINS"],
                  ["56", "SECS"],
                ].map(([n, l]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 44, fontWeight: 700, color: "#fff", fontFamily: "'Source Serif 4', Georgia, serif", lineHeight: 1, background: "rgba(255,255,255,.08)", borderRadius: 12, padding: "12px 20px", minWidth: 80 }}>{n}</div>
                    <div style={{ fontSize: 10, color: "#546E7A", fontWeight: 600, letterSpacing: "0.1em", marginTop: 6 }}>{l}</div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                style={{
                  background: "#FF6F00",
                  color: "#fff",
                  border: "none",
                  borderRadius: 9999,
                  padding: "16px 44px",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  letterSpacing: "0.05em",
                  fontFamily: "'Source Sans 3', system-ui, sans-serif",
                  boxShadow: "0 8px 28px rgba(255,111,0,.35)",
                  transition: "transform .2s, box-shadow .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 12px 36px rgba(255,111,0,.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 28px rgba(255,111,0,.35)";
                }}
              >
                {STORE.promo.cta}
              </button>
            </div>
          </div>
        </section>

        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 12, color: "#1DE9B6", fontWeight: 700, letterSpacing: "0.12em", marginBottom: 10 }}>TESTIMONIALS</div>
            <h2 style={{ fontSize: 38, fontWeight: 700, color: "#263238", fontFamily: "'Source Serif 4', Georgia, serif" }}>Loved by Scholars</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { name: "Amara N.", role: "University of Cape Town", text: "The leather planner has completely transformed how I organise my semester. Exceptional quality — feels like it'll last a decade.", avatar: "#455A64" },
              { name: "Sipho M.", role: "WITS University", text: "Ordered the briefcase for my first day of lectures. Got three compliments before 10am. ScholarCapital nailed it.", avatar: "#263238" },
              { name: "Lerato K.", role: "Stellenbosch University", text: "Fast delivery, beautiful packaging, and the pen set writes like a dream. Will definitely be back every semester.", avatar: "#546E7A" },
            ].map(({ name, role, text, avatar }) => (
              <div
                key={name}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: "28px",
                  boxShadow: "0 1px 4px rgba(38,50,56,.07)",
                  border: "1px solid #F0F0F0",
                  transition: "box-shadow .2s, transform .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 28px rgba(38,50,56,.10)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 1px 4px rgba(38,50,56,.07)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 12 12" fill="#FF6F00">
                      <path d="M6 1l1.3 2.6 2.9.4-2.1 2 .5 2.9L6 7.5 3.4 9l.5-2.9L2 4l2.9-.4z" />
                    </svg>
                  ))}
                </div>
                <p style={{ fontSize: 15, color: "#455A64", lineHeight: 1.7, marginBottom: 22, fontStyle: "italic", fontFamily: "'Source Serif 4', Georgia, serif" }}>&ldquo;{text}&rdquo;</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: avatar, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>{name[0]}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#263238" }}>{name}</div>
                    <div style={{ fontSize: 12, color: "#90A4AE" }}>{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: "#F7F7F7", borderTop: "1px solid #EAEAEA", padding: "72px 32px" }}>
          <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "#1DE9B6", fontWeight: 700, letterSpacing: "0.12em", marginBottom: 10 }}>{STORE.newsletter.kicker}</div>
            <h2 style={{ fontSize: 36, fontWeight: 700, color: "#263238", fontFamily: "'Source Serif 4', Georgia, serif", marginBottom: 14 }}>{STORE.newsletter.title}</h2>
            <p style={{ color: "#78909C", fontSize: 15, lineHeight: 1.7, marginBottom: 36 }}>{STORE.newsletter.sub}</p>
            <div style={{ display: "flex", gap: 0, background: "#fff", borderRadius: 9999, border: "1.5px solid #E0E0E0", overflow: "hidden", boxShadow: "0 4px 16px rgba(38,50,56,.08)" }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  padding: "14px 24px",
                  fontSize: 14,
                  color: "#263238",
                  fontFamily: "'Source Sans 3', system-ui, sans-serif",
                  background: "transparent",
                }}
              />
              <button
                type="button"
                style={{
                  background: "#263238",
                  color: "#fff",
                  border: "none",
                  padding: "14px 28px",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "'Source Sans 3', system-ui, sans-serif",
                  borderRadius: 9999,
                  margin: 4,
                  letterSpacing: "0.04em",
                  transition: "background .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#455A64";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#263238";
                }}
              >
                Subscribe
              </button>
            </div>
            <p style={{ fontSize: 11, color: "#B0BEC5", marginTop: 12 }}>By subscribing you agree to our Privacy Policy. Unsubscribe anytime.</p>
          </div>
        </section>

        <footer style={{ background: "#263238", color: "#fff", padding: "56px 32px 32px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1DE9B6" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Source Serif 4', Georgia, serif" }}>
                    {STORE.name}
                    {STORE.nameAccent}
                  </span>
                </div>
                <p style={{ fontSize: 14, color: "#78909C", lineHeight: 1.8, maxWidth: 260 }}>{STORE.footerTagline}</p>
                <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                  {["Instagram", "Twitter", "Facebook"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,.08)",
                        border: "none",
                        cursor: "pointer",
                        color: "#90A4AE",
                        fontSize: 11,
                        fontWeight: 600,
                        transition: "background .2s",
                        fontFamily: "'Source Sans 3', system-ui, sans-serif",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,.16)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,.08)";
                      }}
                    >
                      {s[0]}
                    </button>
                  ))}
                </div>
              </div>
              {[
                { title: "Shop", links: ["New Arrivals", "Bags & Cases", "Stationery", "Accessories", "Tech Gear", "Sale"] },
                { title: "Account", links: ["My Account", "Orders", "Wishlist", "Addresses", "Returns"] },
                { title: "Help", links: ["FAQ", "Shipping Info", "Size Guide", "Contact Us", "Privacy Policy"] },
              ].map((col) => (
                <div key={col.title}>
                  <h4 style={{ fontSize: 12, fontWeight: 700, color: "#90A4AE", letterSpacing: "0.12em", marginBottom: 20 }}>{col.title.toUpperCase()}</h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {col.links.map((link) => (
                      <li key={link} style={{ marginBottom: 10 }}>
                        <button
                          type="button"
                          style={{
                            background: "none",
                            border: "none",
                            color: "#78909C",
                            fontSize: 14,
                            cursor: "pointer",
                            fontFamily: "'Source Sans 3', system-ui, sans-serif",
                            transition: "color .2s",
                            padding: 0,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#fff";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "#78909C";
                          }}
                        >
                          {link}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <span style={{ fontSize: 13, color: "#546E7A" }}>
                © {new Date().getFullYear()} {STORE.name}
                {STORE.nameAccent}. All rights reserved.
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                {["VISA", "MC", "PayPal", "EFT"].map((p) => (
                  <span key={p} style={{ background: "rgba(255,255,255,.08)", borderRadius: 4, padding: "4px 10px", fontSize: 10, color: "#78909C", fontWeight: 700, letterSpacing: "0.06em" }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
