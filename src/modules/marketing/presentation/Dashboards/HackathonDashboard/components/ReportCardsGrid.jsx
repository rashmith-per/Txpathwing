import React from "react";
import { Trophy, Medal } from "lucide-react";

export function ReportCardsGrid({ winner, runnerUp, stats }) {
  return (
    <div className="fr-cards-grid">
      <div className="fr-card winner-card">
        <div className="fr-badge winner-badge">
          <Trophy size={14} /> WINNER
        </div>
        <h3 className="fr-card-name">{winner.lead}</h3>
        <p className="fr-card-project">{winner.project}</p>
        <div className="fr-card-score">
          <span className="score-big">{winner.score}</span>
          <span className="score-den">/ 30 points</span>
        </div>
      </div>

      <div className="fr-card runner-up-card">
        <div className="fr-badge runner-up-badge">
          <Medal size={14} /> RUNNER-UP
        </div>
        <h3 className="fr-card-name">{runnerUp.lead}</h3>
        <p className="fr-card-project">{runnerUp.project}</p>
        <div className="fr-card-score">
          <span className="score-big">{runnerUp.score}</span>
          <span className="score-den">/ 30 points</span>
        </div>
      </div>

      <div className="fr-card stats-card">
        <h4 className="stats-card-title">Final Stats</h4>
        <div className="stats-rows">
          <div className="stats-row">
            <span className="stats-label">Total Participants</span>
            <strong className="stats-val">{stats.total}</strong>
          </div>
          <div className="stats-row">
            <span className="stats-label">Average Score</span>
            <strong className="stats-val">{stats.avgScore}/30</strong>
          </div>
          <div className="stats-row">
            <span className="stats-label">Eliminated</span>
            <strong className="stats-val">{stats.eliminated}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
