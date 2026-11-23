import { useState, useEffect } from "react";
import { X, CheckCircle2, AlertCircle, UserCheck } from "lucide-react";
import { learnerApi } from "../../Learners/services/learnerApi.js";
import { learningApi } from "../services/learningApi.js";
import { BATCHES } from "../../Learners/backend/models/LearnerModel.js";

export default function EnrollLearnerModal({ isOpen, onClose, onSuccess, showMessage }) {
  const [learners, setLearners] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedLearnerId, setSelectedLearnerId] = useState("");
  const [selectedProgramId, setSelectedProgramId] = useState("");
  const [batch, setBatch] = useState("2026–27");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      Promise.all([
        learnerApi.getLearners({ limit: 100 }),
        learningApi.getPrograms()
      ])
        .then(([learnersRes, programsRes]) => {
          const lList = learnersRes.learners || [];
          setLearners(lList);
          if (lList.length > 0) setSelectedLearnerId(lList[0].learnerId);

          setPrograms(programsRes || []);
          if (programsRes.length > 0) setSelectedProgramId(programsRes[0].id);
        })
        .catch((err) => {
          setError(err.message || "Failed to load enrollment dependencies");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedLearnerId || !selectedProgramId) return;

    const learner = learners.find((l) => l.learnerId === selectedLearnerId);
    const prog = programs.find((p) => p.id === selectedProgramId);

    if (!learner || !prog) return;

    try {
      setIsSubmitting(true);
      setError("");
      await learningApi.createEnrollment({
        learnerId: learner.learnerId,
        learnerName: learner.fullName || learner.name,
        learnerEmail: learner.email,
        department: learner.department,
        programId: prog.id,
        programTitle: prog.name || prog.title,
        batch
      });
      showMessage(`Learner ${learner.fullName || learner.name} enrolled into ${prog.name}.`);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || "Failed to enroll learner");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="staff-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="staff-modal-card" style={{ maxWidth: "540px" }} onClick={(e) => e.stopPropagation()}>
        <div className="staff-modal-header">
          <div className="modal-title-wrap">
            <span className="modal-header-icon"><UserCheck size={18} /></span>
            <div>
              <h2>Enroll Learner into Program</h2>
              <p>Assign a learner to a learning pathway and cohort batch.</p>
            </div>
          </div>
          <button className="icon-button modal-close-btn" type="button" onClick={onClose} aria-label="Close modal">
            <X size={17} />
          </button>
        </div>

        {error && (
          <div className="staff-error-banner" style={{ margin: "16px 20px 0" }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {isLoading ? (
          <div style={{ padding: "40px", textAlign: "center" }}>
            <span className="spinner-inline" style={{ width: "24px", height: "24px", borderColor: "var(--blue)", borderTopColor: "transparent" }} />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="staff-modal-body">
              <div className="form-field">
                <label>Select Learner <span className="req-star">*</span></label>
                <select
                  value={selectedLearnerId}
                  onChange={(e) => setSelectedLearnerId(e.target.value)}
                  required
                >
                  {learners.map((l) => (
                    <option key={l.learnerId} value={l.learnerId}>
                      {l.fullName || l.name} ({l.learnerId}) — {l.department}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>Select Learning Program <span className="req-star">*</span></label>
                <select
                  value={selectedProgramId}
                  onChange={(e) => setSelectedProgramId(e.target.value)}
                  required
                >
                  {programs.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name || p.title} ({p.code}) — {p.category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>Assign Batch Cohort <span className="req-star">*</span></label>
                <select value={batch} onChange={(e) => setBatch(e.target.value)}>
                  {BATCHES.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="staff-modal-footer">
              <button type="button" className="secondary-action" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </button>
              <button type="submit" className="primary-action btn-submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="spinner-inline" />
                ) : (
                  <>
                    <CheckCircle2 size={16} /> Confirm Enrollment
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
