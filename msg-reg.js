// 日常任务：feat:新增XXX功能
const TASK_REG = /^(feat|fix|polish|style|refactor|perf|test|chore|merge|misc|docs|misc|revert)(\(.+\))?:\s*.{0,80}/
const TASK_REG_MSG = 'feat|fix|polish|style|refactor|perf|test|chore|merge|misc|docs|misc|revert: add some description for your commit'
// 合并任务：Merge
const MERGE_REG = /^(Merge|merge|MERGE).+/;
const MERGE_REG_MSG = `Merge branch 'master' into 'develop`
// 其他任务: docs:修改文档
const EXTRA_REG = /^(docs|chore)(\(.+\))?:\s*.{0,80}/;
const EXTRA_REG_MSG = 'docs: update dev handbook'

function getMsgReg(prefix = ''){
    // 带ID的日常任务：task_12345_feat:新增XXX功能
    const l = prefix.toLowerCase();
    const u = prefix.toUpperCase();
    const TASK_REG_ID = new RegExp(`^(${u}|${l}|fix|FIX)(_|-)\\d{1,10}\\s{1,}(feat|fix|polish|style|refactor|perf|test|chore|merge|misc|docs|misc|revert)(\(.+\))?:\\s*.{0,80}`);
    const TASK_REG_ID_MSG = 'task|fix-233333 misc: add some description for your commit (set -p --idp for short commit, eg: misc:XXXX)'
    if(prefix){
        return {
            MSG_REG: Array.of(TASK_REG_ID, MERGE_REG, EXTRA_REG),
            MSG_DES: Array.of(TASK_REG_ID_MSG, MERGE_REG_MSG, EXTRA_REG_MSG)
        }
    } else {
        return {
            MSG_REG: Array.of(TASK_REG, MERGE_REG, EXTRA_REG),
            MSG_DES: Array.of(TASK_REG_MSG, MERGE_REG_MSG, EXTRA_REG_MSG)
        }
    }
}
exports.getMsgReg = getMsgReg;