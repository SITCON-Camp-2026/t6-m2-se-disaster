import { RecordCard } from "../../components/RecordCard";
import { SourceLabel } from "../../components/SourceLabel";
import { formatDateTime } from "../../lib/date";
import type { Phase0MessyRecord } from "./phase0-types";

export function Phase0TaskIntake({
  records,
  selectedRecordId,
  onSelect,
}: {
  records: Phase0MessyRecord[];
  selectedRecordId: string;
  onSelect: (recordId: string) => void;
}) {
  const available = records.filter(
    (record) =>
      record.verificationStatus === "verified" ||
      record.verificationStatus === "confirmed" ||
      record.verificationStatus === "open"
  );
  const unverified = records.filter((record) => record.verificationStatus === "unverified");
  const needsReview = records.filter((record) => record.verificationStatus === "needs_review");

  return (
    <div className="phase0-intake">
      <div className="panel__header">
        <div>
          <h2>接取任務</h2>
          <p>
            這是 Phase 0 原始資訊快速原型，未確認資訊仍需人工查核。待查核與待人工確認項目
            不應直接當成可執行任務。
          </p>
        </div>
        <p>{records.length} 筆資料</p>
      </div>

      <div className="phase0-intake__notice">
        <strong>提醒：</strong>此頁面主要呈現資料品質與查核狀態，不能直接當成可執行任務。
      </div>

      <div className="intake-sections">
        <section className="intake-section">
          <h3>可接取</h3>
          <p>這些資訊目前可參考，但仍不可直接當成可執行任務。</p>
          <p className="intake-section__stage">階段：目前可參考，但不可直接行動</p>
          <div className="grid">
            {available.length === 0 ? (
              <div className="empty-state">目前沒有可接取資料</div>
            ) : (
              available.map((record) => (
                <article
                  className={`record-card ${record.id === selectedRecordId ? "record-card--selected" : ""}`}
                  key={record.id}
                >
                  <div className="record-card__header">
                    <h3>{record.id}</h3>
                    <span className="status-badge status-open">可接取</span>
                  </div>
                  <p>{record.rawText}</p>
                  <div className="record-card__meta">
                    <SourceLabel sourceType={record.sourceType} />
                    <span>更新：{formatDateTime(record.updatedAt)}</span>
                  </div>
                  <button type="button" onClick={() => onSelect(record.id)}>
                    檢視整理工作台
                  </button>
                </article>
              ))
            )}
          </div>
        </section>

        <section className="intake-section">
          <h3>待人工確認</h3>
          <p>這些資訊尚處於人工確認階段，不能直接當成可執行任務。</p>
          <p className="intake-section__stage">階段：待人工確認，仍需人再次判斷</p>
          <div className="grid">
            {needsReview.length === 0 ? (
              <div className="empty-state">目前沒有待人工確認資料</div>
            ) : (
              needsReview.map((record) => (
                <article
                  className={`record-card ${record.id === selectedRecordId ? "record-card--selected" : ""}`}
                  key={record.id}
                >
                  <div className="record-card__header">
                    <h3>{record.id}</h3>
                    <span className="status-badge status-needs_review">待人工確認</span>
                  </div>
                  <p>{record.rawText}</p>
                  <div className="record-card__meta">
                    <SourceLabel sourceType={record.sourceType} />
                    <span>更新：{formatDateTime(record.updatedAt)}</span>
                  </div>
                  <button type="button" onClick={() => onSelect(record.id)}>
                    檢視整理工作台
                  </button>
                </article>
              ))
            )}
          </div>
        </section>

        <section className="intake-section">
          <h3>待查核</h3>
          <p>這些候選任務卡還在待查核狀態，尚未確認為可派遣。</p>
          <p className="intake-section__stage">階段：待查核，先確認資料來源與內容</p>
          <div className="grid">
            {unverified.length === 0 ? (
              <div className="empty-state">目前沒有待查核資料</div>
            ) : (
              unverified.map((record) => (
                <article
                  className={`record-card ${record.id === selectedRecordId ? "record-card--selected" : ""}`}
                  key={record.id}
                >
                  <div className="record-card__header">
                    <h3>{record.id}</h3>
                    <span className="status-badge status-unverified">未查核</span>
                  </div>
                  <p>{record.rawText}</p>
                  <div className="record-card__meta">
                    <SourceLabel sourceType={record.sourceType} />
                    <span>更新：{formatDateTime(record.updatedAt)}</span>
                  </div>
                  <button type="button" onClick={() => onSelect(record.id)}>
                    檢視整理工作台
                  </button>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
