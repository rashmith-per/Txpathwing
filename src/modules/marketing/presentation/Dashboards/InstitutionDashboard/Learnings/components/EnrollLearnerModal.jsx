import { useState } from "react";
import { X, CheckCircle2, UserCheck } from "lucide-react";
import { BATCHES, SAMPLE_LEARNERS, INITIAL_PROGRAMS } from "../learningsData.js";

export default function EnrollLearnerModal({ isOpen, programs = INITIAL_PROGRAMS, onClose, onSuccess, showMessage }) {
  const [selectedLearnerId, setSelectedLearnerId] = useState(SAMPLE_LEARNERS[0]?.learnerId || "");
  const [selectedProgramId, setSelectedProgramId] = useState(programs[0]?.id || "");
  const [batch, setBatch] = useState("2026–27");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const learner = SAMPLE_LEARNERS.find((l) => l.learnerId === selectedLearnerId) || SAMPLE_LEARNERS[0];
    const prog = programs.find((p) => p.id === selectedProgramId) || programs[0];

    if (!learner || !prog) return;

    const newEnrollment = {
      id: `enr_${Date.now()}`,
      learnerId: learner.learnerId,
      learnerName: learner.fullName || learner.name,
      learnerEmail: learner.email,
      department: learner.department,
      programId: prog.id,
      programTitle: prog.name || prog.title,
      batch,
      completedModules: 0,
      remainingModules: prog.modules?.length || 3,
      progressPercentage: 0,
      status: "In Progress",
      completedTopicIds: []
    };

    if (showMessage) showMessage(`Learner ${learner.fullName || learner.name} enrolled into ${prog.name || prog.title}.`);
    if (onSuccess) onSuccess(newEnrollment);
    onClose();
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

        <form onSubmit={handleSubmit}>
          <div className="staff-modal-body">
            <div className="form-field">
              <label>Select Learner <span className="req-star">*</span></label>
              <select
                value={selectedLearnerId}
                onChange={(e) => setSelectedLearnerId(e.target.value)}
              >
                {SAMPLE_LEARNERS.map((lrn) => (
                  <option key={lrn.learnerId} value={lrn.learnerId}>
                    {lrn.fullName || lrn.name} ({lrn.learnerId}) — {lrn.department}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label>Target Program <span className="req-star">*</span></label>
              <select
                value={selectedProgramId}
                onChange={(e) => setSelectedProgramId(e.target.value)}
              >
                {programs.map((prog) => (
                  <option key={prog.id} value={prog.id}>
                    {prog.name || prog.title} ({prog.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label>Cohort Batch <span className="req-star">*</span></label>
              <select
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
              >
                {BATCHES.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="staff-modal-footer">
            <button type="button" className="secondary-action" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-action btn-submit">
              <CheckCircle2 size={16} /> Confirm Enrollment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
