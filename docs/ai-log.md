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
| 2026-07-09 15:20 | Flow Design | 根據 interview-summary、decisions 與 design checklist，整理 v1 的資訊流程與 Mermaid 圖 | 產生保守版本流程：保留原始資訊、加入人工確認與暫時不採用分支、明確留下判斷紀錄 | 採用（草稿） | 這版流程避免把未確認資訊當成已確認，並把「不能自動處理」與「需要人工確認」分開；後續仍需確認可行動門檻與誰有權標記為已驗證 | release-packs/02-flow-design-kit/docs/flow.md |
| 2026-07-09 16:40 | Frontend Implementation | 根據流程圖把 Phase 0 工作台改成保守流程工作台，顯示「候選任務卡（待查核）」與「需要人工確認」 | 建議把未查核資料維持在待查核狀態，不把它們標成可派遣或已驗證 | 採用 | 這版 UI 只呈現流程狀態，不做自動派遣或自動補全；避免使用者把未確認資訊誤解為可執行任務 | src/features/phase-0/FlowDecisionCard.tsx, src/features/phase-0/Phase0Workbench.tsx, tests/app-smoke.test.tsx |
| 2026-07-09 17:10 | Documentation | 把「行動者」persona 的 sub-agent 回饋整理成可直接查看的文件，放進 docs/ | 以 Actor persona 的固定格式整理出對目前工作台的安全性與可執行性回饋 | 採用（文件草稿） | 這份文件保留了使用者視角，重點是哪些資訊不能直接作為行動依據，避免把未確認內容誤當為已確認 | docs/actor-feedback.md |
| 2026-07-09 17:25 | Documentation | 根據再次訪問網頁的實際回饋，補充 Actor persona 回饋文件的「再次訪問回饋」區塊 | 加入具體瀏覽感受與對現有工作台提示需求的回饋 | 採用 | 這次回饋強調「候選任務 vs 已查核」的界線、來源與查核狀態提示、以及 Phase 0 原型提醒 | docs/actor-feedback.md |
| 2026-07-09 17:40 | Documentation | 第二次訪問網頁後，補充 Actor persona 回饋文件尾端的「第二次訪問回饋」 | 再次整理瀏覽後的使用者疑慮與安全性提醒需求 | 採用 | 這次補充再次強調現有工作台應加強「這不是最終任務」與「資料階段性提示」 | docs/actor-feedback.md |

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
