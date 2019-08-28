# git-commit-helper

##### 功能
利用git钩子验证提交信息是否复合规范；同时对于需要有默认提交信息的，支持自动填充

- -p: 表示提交信息前缀
- --ipd: 表示从分支名中获取id的前缀

##### 使用
第一种场景：如果不考虑要带id，则只按照规范提交信息即可，当前分支为feature_12345_addfeature，
希望提交信息为：feat:新增功能，则配置如下：
```
//项目package.json中配置 

"husky" : {
    "hooks": {
      "pre-commit": "git-commit-helper"
    }
}

提交时：git commit -i "feat:新增功能"
```

第二种场景：当前分支为feature_12345_addfeature，希望提交信息为：task_12345 feat:新增功能，则配置如下
```
//项目package.json中配置 

"husky" : {
    "hooks": {
      "pre-commit": "git-commit-helper -p task -i feature -i hotfix"
    }
}

提交时：git commit -i "feat:新增功能"
```


##### 默认规范
- 带id日常任务：
```
task_23333 feat|fix|polish|style|refactor|perf|test|chore|merge|misc|docs|misc|revert:XXXXX
```
- 日常任务：
```
feat|fix|polish|style|refactor|perf|test|chore|merge|misc|docs|misc|revert:XXXXX
```
- 合并任务：
```
Merge|merge|MERGE XXXXX
```
- 其他任务：
```
docs|chore:XXXXX
```