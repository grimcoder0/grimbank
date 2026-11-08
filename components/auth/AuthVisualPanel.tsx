import { Info } from "@/components/auth/icons";

export function AuthVisualPanel() {
  return (
    <aside className="visual-panel" aria-label="About GrimBank">
      <div className="visual-orbit" />
      <div className="visual-orbit orbit-two" />
      <div className="visual-grid" />

      <div className="visual-content">
        <div className="status-pill">
          <span className="status-dot" /> Prototype · simulated data
        </div>

        <div className="visual-heading">
          <p className="visual-kicker">A clearer view of your money</p>
          <h2>
            Your money.
            <br />
            <em>Your direction.</em>
          </h2>
        </div>

        <div className="security-card">
          <div className="security-icon">
            <Info size={21} />
          </div>
          <div>
            <strong>Prototype environment</strong>
            <p>
              Balances and transactions are simulated. No real money or bank
              accounts are connected.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
