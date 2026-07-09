# AI Log

這份紀錄用來留下小組如何使用 AI / Coding Agent 的操作脈絡。重點不是逐字保存所有對話，而是記錄重要協作、取捨與人類判斷。

## 什麼時候要記錄

請在以下情況更新本檔案：

- AI 協助分析原始資訊。
- AI 協助找出不能判斷處。
- AI 協助判斷哪些資訊不能直接相信。
- AI 協助判斷哪些資訊不能直接變成任務。
- AI 協助修改畫面標示或前端工作台。
- AI 可能補了原文沒有的資訊。
- AI 建議被小組拒絕，且拒絕原因和安全 / 正確性 / scope 有關
- AI 輸出可能造成誤導，例如把未確認資料寫成已確認事實

## 不需要記錄

- 不需要逐字貼完整對話
- 不需要記錄每一次小型 autocomplete
- 不需要記錄單純修 typo 或格式化

## 紀錄格式

| 時間 | 階段 | 任務 | AI / Agent 建議 | 採用 / 拒絕 | 人類判斷理由 | 相關檔案 / commit |
| ---- | ---- | ---- | --------------- | ----------- | ------------ | ----------------- |
| 2026-07-09 11:19 | Phase 0 | 使用 release-packs/01-interview-kit 的 prompts 與 personas 啟動 sub-agent，模擬訪談並產出逐字稿與要點草稿 | 子代理產出逐字稿、訪談要點、摘要與建議草稿（role-play 與需驗證標註） | 採用（草稿） | 需由真實 Organizer 或產品/工程確認：UI 是否已具備查核狀態、是否存在自動補全、審核責任人與流程 | release-packs/01-interview-kit/docs/interview-notes.md, release-packs/01-interview-kit/docs/interview-summary.md |
| 2026-07-09 15:05 | Phase 0 | 以 Explore 子代理模擬三個 persona（Organizer, Reporter, Actor）訪談，整合並寫回 `interview-notes.md` 與 `interview-summary.md` | 子代理產出三位 persona 的逐字摘錄、要點、設計建議，並合併為草稿；已加入 `docs/ai-log.md` 條目 | 採用（草稿） | 需團隊驗證：1) UI 是否已顯示查核狀態與審核元資料；2) 是否存在任何自動補全邏輯；3) 決定誰有權標記「已驗證」與可行動門檻 | release-packs/01-interview-kit/docs/interview-notes.md, release-packs/01-interview-kit/docs/interview-summary.md |

## 範例

| 時間  | 階段    | 任務         | AI / Agent 建議                        | 採用 / 拒絕 | 人類判斷理由                              | 相關檔案 / commit             |
| ----- | ------- | ------------ | -------------------------------------- | ----------- | ----------------------------------------- | ----------------------------- |
| 09:45 | Phase 0 | 分析原始資訊 | 建議把社群貼文直接轉成 verified report | 拒絕        | 社群貼文來源未確認，應保持 `needs_review` | `docs/phase0-observations.md` |

## 課後反思

### AI 幫助最大的地方

- 快速產出逐字訪談摘錄與 persona 要點，節省初步整理時間並提供明確的跟進建議清單。
- 生成可直接放進 `interview-notes.md` 與 `interview-summary.md` 的草稿，讓小組可以立刻用於討論與驗證流程。

### AI 最容易誤導的地方

- 子代理為 role-play，可能填補 persona 未明確提供的細節（例如回報習慣、聯絡方式格式），這些假設需人類核實。
- 若未標註清楚來源或審核狀態，AI 產出的匯整可能看起來像已驗證結論，造成誤導。

-

### 下次使用 AI 開發前，我們會先準備

- 提供最新 UI 截圖或 component 列表，讓 AI 的建議能直接參照現況並避免過度假設。
- 明確列出哪些欄位為關鍵欄位（地址、數量、聯絡方式）以避免 AI 建議自動補全這些欄位。
- 指定一名產品或運營負責人確認並核可 AI 產出的草稿，然後再把草稿標為「採用」。
