#!/usr/bin/env bash
# 웹 이력서를 GitHub Pages(gh-pages 브랜치)에 올린다.
#
#   scripts/publish-pages.sh          # 검사·정적 출력·gh-pages 커밋까지 만들고 바뀐 파일만 보여 준다
#   scripts/publish-pages.sh --push   # 같은 과정 뒤 gh-pages에 올리고 실제 주소에 반영됐는지 확인한다
#
# - --push는 origin/main에 이미 올라간 커밋만 게시한다. 커밋하지 않은 변경이 있으면 멈춘다.
# - `npm run export`는 작성 문서가 있는 docs/를 지우므로 쓰지 않고 out-site/에 출력한다.
# - CNAME(커스텀 도메인)과 .nojekyll은 기존 gh-pages에서 그대로 가져온다.
# - gh-pages 체크아웃 없이 임시 인덱스로 out-site/ 내용을 그대로 커밋한다.
set -euo pipefail

push=0
case "${1:-}" in
  --push) push=1 ;;
  "") ;;
  *) echo "사용법: $0 [--push]" >&2; exit 2 ;;
esac

cd "$(git rev-parse --show-toplevel)"

if [[ -n "$(git status --porcelain --untracked-files=no)" ]]; then
  echo "커밋하지 않은 변경이 있습니다. 커밋해 main에 올린 뒤 다시 실행하세요." >&2
  exit 1
fi
git fetch --quiet origin main gh-pages
source_commit="$(git rev-parse HEAD)"
if ! git merge-base --is-ancestor "$source_commit" origin/main; then
  if (( push )); then
    echo "HEAD(${source_commit:0:7})가 origin/main에 없습니다. main에 올린 커밋만 게시합니다." >&2
    exit 1
  fi
  echo "참고: HEAD(${source_commit:0:7})가 아직 origin/main에 없습니다. 확인만 하고 올리지는 않습니다." >&2
fi

echo "== 검사"
npx eslint "component/**/*" "pages/**/*" "payload/**/*" "*.ts"
npx tsc --noEmit

echo "== 정적 출력 (out-site/)"
rm -rf out-site
NODE_OPTIONS=--openssl-legacy-provider npx next build
NODE_OPTIONS=--openssl-legacy-provider npx next export --outdir out-site
git show origin/gh-pages:CNAME > out-site/CNAME
touch out-site/.nojekyll
domain="$(tr -d '[:space:]' < out-site/CNAME)"
build_id="$(grep -o '"buildId":"[^"]*"' out-site/index.html | head -1 | cut -d'"' -f4)"
test -n "$domain" && test -n "$build_id"

echo "== gh-pages 커밋"
index_dir="$(mktemp -d)"
trap 'rm -rf "$index_dir"' EXIT
git_dir="$(git rev-parse --absolute-git-dir)"
tree="$(cd out-site && GIT_INDEX_FILE="$index_dir/index" git --git-dir="$git_dir" --work-tree=. add -A -f . \
  && GIT_INDEX_FILE="$index_dir/index" git --git-dir="$git_dir" --work-tree=. write-tree)"
parent="$(git rev-parse origin/gh-pages)"
if [[ "$tree" == "$(git rev-parse "origin/gh-pages^{tree}")" ]]; then
  echo "게시본과 같습니다. 올릴 것이 없습니다."
  exit 0
fi
deploy_commit="$(git commit-tree "$tree" -p "$parent" \
  -m "deploy: $(git log -1 --format=%s "$source_commit") from ${source_commit:0:7}")"
git diff --stat "$parent" "$deploy_commit" | tail -n 4

if (( ! push )); then
  echo "확인만 했습니다(${deploy_commit:0:7}). 올리려면 --push로 다시 실행하세요."
  exit 0
fi

echo "== 올리기"
git push origin "$deploy_commit:refs/heads/gh-pages"

echo "== https://$domain/ 반영 확인 (빌드 $build_id, 최대 10분)"
for _ in $(seq 1 60); do
  if curl --silent --fail --max-time 15 -H 'Cache-Control: no-cache' \
      "https://$domain/?v=${deploy_commit:0:7}" | grep -q "\"buildId\":\"$build_id\""; then
    echo "반영됐습니다: https://$domain/ (gh-pages ${deploy_commit:0:7})"
    exit 0
  fi
  sleep 10
done
echo "10분 안에 새 빌드가 보이지 않았습니다. GitHub Pages 배포 상태를 확인하세요." >&2
exit 1
