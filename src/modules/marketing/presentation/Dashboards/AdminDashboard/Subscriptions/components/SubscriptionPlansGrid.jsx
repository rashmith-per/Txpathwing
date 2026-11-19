import React from "react";
import { Check } from "lucide-react";

export function SubscriptionPlansGrid({ subscriptions = [] }) {
  return (
    <div className="plans-grid">
      {subscriptions.map((plan) => (
        <div className="card plan-card" key={plan.id}>
          <div className="plan-header">
            <span className="plan-name">{plan.planName}</span>
            <strong className="plan-price">
              {plan.monthlyPrice} <small>/ mo</small>
            </strong>
            <span className="plan-seats">{plan.maxSeats}</span>
          </div>
          <ul className="plan-features">
            {plan.features.map((f, i) => (
              <li key={i}>
                <Check size={14} className="text-success" /> {f}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
