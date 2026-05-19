import { useState } from "react";
import { Link } from "react-router-dom";

const pricingPlans = [
  {
    id: 1,
    title: "Basic Plan",
    price: "500 ETB",
    popular: false,
    features: ["Gym Access", "Locker Room", "Free Water"],
  },
  {
    id: 2,
    title: "Standard Plan",
    price: "1000 ETB",
    popular: true,
    features: ["Gym Access", "All Classes", "Personal Trainer","Free Water"],
  },
  {
    id: 3,
    title: "Premium Plan",
    price: "2000 ETB",
    popular: false,
    features: ["24/7 Access", "All Classes or Private Class", "Private Coaching","Free Water",],
  },
];


const styles = {
  section: {
    minHeight: "100vh",
    backgroundColor: "#0a0a0a",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 24px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    color: "#ffffff",
    fontSize: "40px",
    fontWeight: "800",
    textAlign: "center",
    margin: "0 0 12px",
    letterSpacing: "-1px",
  },
  subheading: {
    color: "#888",
    fontSize: "16px",
    textAlign: "center",
    margin: "0 0 56px",
  },
  grid: {
    display: "flex",
    gap: "24px",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  card: {
    backgroundColor: "#141414",
    border: "1px solid #222",
    borderRadius: "20px",
    padding: "36px 32px",
    width: "280px",
    position: "relative",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    cursor: "pointer",
  },
  cardPopular: {
    backgroundColor: "#ff6a00",
    border: "1px solid #ff6a00",
    transform: "scale(1.05)",
  },
  cardHovered: {
    transform: "translateY(-6px) scale(1.02)",
    boxShadow: "0 20px 40px rgba(255, 106, 0, 0.2)",
  },
  badge: {
    position: "absolute",
    top: "-14px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#fff",
    color: "#ff6a00",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    padding: "5px 16px",
    borderRadius: "99px",
    whiteSpace: "nowrap",
  },
  planTitle: {
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: "700",
    margin: "0 0 20px",
  },
  priceWrapper: {
    display: "flex",
    alignItems: "baseline",gap: "6px",
    marginBottom: "28px",
  },
  price: {
    color: "#ffffff",
    fontSize: "36px",
    fontWeight: "800",
    letterSpacing: "-1px",
  },
  period: {
    color: "rgba(255,255,255,0.6)",
    fontSize: "14px",
  },
  featureList: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 32px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  featureItem: {
    color: "rgba(255,255,255,0.85)",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  checkmark: {
    color: "#ff6a00",
    fontWeight: "800",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "2px solid #ff6a00",
    backgroundColor: "transparent",
    color: "#ff6a00",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s ease",
    letterSpacing: "0.5px",
  },
  buttonPopular: {
    backgroundColor: "#0a0a0a",
    color: "#ff6a00",
    border: "2px solid #0a0a0a",
  },
};
 function Pricing() {
  const [hovered, setHovered] = useState(null);

  return (
    <section style={styles.section}>
      <h1 style={styles.heading}>Membership Pricing</h1>
      <p style={styles.subheading}>Choose the plan that fits your lifestyle</p>

      <div style={styles.grid}>
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            style={{
              ...styles.card,
              ...(plan.popular ? styles.cardPopular : {}),
              ...(hovered === plan.id ? styles.cardHovered : {}),
            }}
            onMouseEnter={() => setHovered(plan.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {plan.popular && <div style={styles.badge}>Most Popular</div>}

            <h2 style={styles.planTitle}>{plan.title}</h2>

            <div style={styles.priceWrapper}>
              <span style={styles.price}>{plan.price}</span>
              <span style={styles.period}>/month</span>
            </div>

            <ul style={styles.featureList}>
              {plan.features.map((feature, index) => (
                <li key={index} style={styles.featureItem}>
                  <span style={styles.checkmark}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <Link to='/register'>
            <button
              style={{
                ...styles.button,
                ...(plan.popular ? styles.buttonPopular : {}),
              }}
            >
              Join Now
            </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Pricing;
