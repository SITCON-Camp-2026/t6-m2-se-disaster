import { StatusBadge } from "../../components/StatusBadge";
import type { Phase0MessyRecord } from "./phase0-types";

type FlowDecision = {
  statusLabel: string;
  detail: string;
  nextStep: string;
  canActDirectly: boolean;
  evidence: Array<{ label: string; hasInfo: boolean }>;
  blockers: string[];
};

function buildFlowDecision(record: Phase0MessyRecord): FlowDecision {
  const hasLocationSignal = /(地址|位置|出口|集合點|老街|車站|學校|路口|活動中心|溪畔|光復|大進路口)/i.test(
    record.rawText,
  );
  const hasNeedSignal = /(需要|需求|缺|支援|協助|收|剩|不缺|水電|雨鞋|泥水|家具|清泥)/i.test(
    record.rawText,
  );
  const hasContactSignal = /(聯絡|電話|來電|志工|報到|值守)/i.test(record.rawText);

  if (record.verificationStatus === "unverified") {
    return {
      statusLabel: "候選任務卡（待查核）",
      detail: "待查核，不代表可派遣",
      nextStep: "由人類確認是否進入候選池",
      canActDirectly: false,
      evidence: [
        { label: "保留原始資訊與來源", hasInfo: true },
        { label: "位置線索", hasInfo: hasLocationSignal },
        { label: "需求線索", hasInfo: hasNeedSignal },
      ],
      blockers: [
        "來源未查核，例如社群轉錄、口頭轉述或未確認公告",
        "關鍵缺漏：位置不明、需求不清、聯絡方式缺失",
      ],
    };
  }

  if (record.verificationStatus === "needs_review") {
    return {
      statusLabel: "需要人工確認",
      detail: "關鍵欄位仍需人工判斷，不能直接當成可執行任務",
      nextStep: "先保留原始資訊，再由人類補查",
      canActDirectly: false,
      evidence: [
        { label: "保留原始資訊與時間戳", hasInfo: true },
        { label: "位置線索", hasInfo: hasLocationSignal },
        { label: "需求內容", hasInfo: hasNeedSignal },
        { label: "聯絡或報到線索", hasInfo: hasContactSignal },
      ],
      blockers: [
        "關鍵缺漏：地址不完整、受災人數不明、聯絡方式缺失",
        "不應自動轉為派工任務，需先由人確認後再決定",
      ],
    };
  }

  return {
    statusLabel: "已驗證可執行",
    detail: "已通過人類確認，並保留審核紀錄",
    nextStep: "可進入後續任務流程",
    canActDirectly: true,
    evidence: [
      { label: "已保留原始資訊", hasInfo: true },
      { label: "已完成人工確認", hasInfo: true },
      { label: "已附上審核紀錄", hasInfo: true },
    ],
    blockers: [],
  };
}

export function FlowDecisionCard({ record }: { record: Phase0MessyRecord }) {
  const decision = buildFlowDecision(record);

  return (
    <article className="judgement-card flow-card">
      <div className="judgement-card__header">
        <div>
          <p className="eyebrow">流程工作台</p>
          <h3>{decision.statusLabel}</h3>
        </div>
        <StatusBadge status={record.verificationStatus} />
      </div>

      <p>{decision.detail}</p>

      <dl className="judgement-summary">
        <div>
          <dt>原始資訊</dt>
          <dd>已保留</dd>
        </div>
        <div>
          <dt>可否直接行動</dt>
          <dd>{decision.canActDirectly ? "可進一步確認" : "不可直接行動"}</dd>
        </div>
        <div>
          <dt>下一步</dt>
          <dd>{decision.nextStep}</dd>
        </div>
      </dl>

      <section>
        <h4>流程依據</h4>
        <ul>
          {decision.evidence.map((item) => (
            <li key={item.label}>
              <span
                className={item.hasInfo ? "flow-marker flow-marker--ok" : "flow-marker flow-marker--warn"}
              >
                {item.hasInfo ? "✓" : "✗"}
              </span>{" "}
              {item.label}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4>流程限制</h4>
        <ul>
          {decision.blockers.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}
