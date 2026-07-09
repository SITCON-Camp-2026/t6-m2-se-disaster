import { RecordCard } from "../../components/RecordCard";
import { StatusBadge } from "../../components/StatusBadge";
import { FlowDecisionCard } from "./FlowDecisionCard";
import type { Phase0MessyRecord } from "./phase0-types";

export function Phase0Workbench({
  records,
  selectedRecordId,
  onSelect,
}: {
  records: Phase0MessyRecord[];
  selectedRecordId: string;
  onSelect: (recordId: string) => void;
}) {
  const selectedRecord =
    records.find((record) => record.id === selectedRecordId) ?? records[0];

  return (
    <div className="workbench">
      <div className="workbench__intro">
        <p className="eyebrow">整理工作台</p>
        <h2>第一階段的成功不是分類正確，而是把為什麼現在還不能判斷說清楚。</h2>
        <p>
          這版流程工作台只把資訊分成待查核、需要人工確認與已驗證可執行三種狀態，不把未查核資訊當成可派遣任務。
        </p>
      </div>

      <div className="workbench__layout">
        <aside className="workbench__queue" aria-label="選擇原始資訊">
          {records.map((record) => (
            <button
              className={record.id === selectedRecord.id ? "active" : ""}
              key={record.id}
              type="button"
              onClick={() => onSelect(record.id)}
            >
              <span>{record.id}</span>
              <StatusBadge status={record.verificationStatus} />
            </button>
          ))}
        </aside>

        <div className="workbench__main">
          <RecordCard record={selectedRecord} />

          <FlowDecisionCard record={selectedRecord} />
        </div>

        <aside className="workbench__checklist">
          <h3>流程規則</h3>
          <ul>
            <li>保留原始資訊與來源，不把它當成已確認事實</li>
            <li>關鍵欄位缺漏時，標記為需要人工確認</li>
            <li>候選任務卡（待查核）不代表可派遣</li>
            <li>每次判斷都留下原因與紀錄</li>
            <li>未查核資料不會被標成可執行任務</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
