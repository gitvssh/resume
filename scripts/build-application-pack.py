"""Two factual resume variants. Requires reportlab; no network or private data lookup."""
from pathlib import Path
from html import escape
import argparse
import json
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.lib.pagesizes import A4

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--portfolio', required=True, type=Path)
args = parser.parse_args()
registry = {p.stem: json.loads(p.read_text()) for p in (args.portfolio / 'src/content/projects').glob('*.json')}
assert registry['study-continuity']['period'] == '2026.09–현재'
OUT = ROOT / 'output/pdf'
OUT.mkdir(parents=True, exist_ok=True)
for name, filename in [('KR', 'NanumGothic.ttf'), ('KR-Bold', 'NanumGothicBold.ttf')]:
    pdfmetrics.registerFont(TTFont(name, '/usr/share/fonts/truetype/nanum/' + filename))
pdfmetrics.registerFontFamily('KR', normal='KR', bold='KR-Bold', italic='KR', boldItalic='KR-Bold')
W,H = A4
DATE, FILE_DATE = '2026.10.01', '20261001'
INK = HexColor('#19283a')
MUTED = HexColor('#566477')
BLUE = HexColor('#255da1')
LINE = HexColor('#d6dfe9')
LEFT,RIGHT = 43,43
WIDTH = W-LEFT-RIGHT
STYLES = {
 'body': ParagraphStyle('body',fontName='KR',fontSize=9.2,leading=14.7,textColor=INK,wordWrap='CJK'),
 'small': ParagraphStyle('small',fontName='KR',fontSize=7.8,leading=12,textColor=MUTED,wordWrap='CJK'),
 'lead': ParagraphStyle('lead',fontName='KR',fontSize=10.2,leading=16.5,textColor=INK,wordWrap='CJK'),
 'title': ParagraphStyle('title',fontName='KR-Bold',fontSize=12,leading=17,textColor=INK,wordWrap='CJK'),
}
CAREER = [
 ('핀테크 기업', '2025.04 - 현재', 'Tech Lead / Senior Backend & Platform Engineer', [
  '선불결제 백엔드의 승인·충전·결제·환불·정산 설계·개발을 PL로 이끄는 중. 원장 정합성, 멱등성, 트랜잭션·외부 연계 경계를 설계.',
  'React Native 모바일 POS를 PoC부터 운영 1.0 배포까지 주도. 관측성·구성 자동화·시크릿 관리 기반을 구축.'
 ]),
 ('Lowall', '2023.04 - 2025.03', 'Lead Developer / Co-founder', [
  '가족 기반 SNS를 기획부터 출시·운영까지 개발. Core·API·Batch 경계를 분리하고 AWS 사용량 분석과 자원 조정으로 운영 비용을 최적화.'
 ]),
 ('Wello', '2023.10 - 2024.01', 'Backend Developer', [
  'KB Pay 연동과 B2G 백오피스 개발. Spring Batch의 Chunk 처리와 QueryDSL 쿼리 최적화로 데이터 처리·정합성을 개선.'
 ]),
 ('IMB System', '2021.05 - 2023.09', 'Backend Developer', [
  '하나은행 글로벌 차세대 개발·데이터 이행 및 베트남 VAN사 결제 시스템 개발 참여. SVN→Git 전환, Jenkins CI/CD와 SonarQube 도입.'
 ]),
]
CASES = {
 'payment': ('선불결제 플랫폼', '업무 프로젝트 · 개발 중', 'payment-platform', [
  '승인·충전·결제·환불·정산의 상태 전이와 지갑·원장 불변식을 모델링. Hexagonal Architecture와 Modular Monolith로 경계를 분리했습니다.',
  '동기 트랜잭션과 Outbox/DLQ를 조합해 중복 요청, 외부 연계 실패, 재처리 경로를 설계했습니다. 운영 중인 모바일 POS와 별도 개발 범위입니다.',
  '개발환경 리허설: 수동 롤백 후 서비스 복귀 16초, Git 상태 재수렴까지 5분 40초, 특정 시각 복원 38초(목표 이후 기록 0건).'
 ]),
 'mcp': ('권한을 분리한 MCP 도구 플랫폼', '개인 프로젝트 · 사용 중', 'mcp-platform', [
  'AI가 원문·검색·DB를 조회하도록 Python MCP 서비스를 구현하고 자격·도구·배포 경계를 분리했습니다. Claude Code·Codex·ChatGPT 세 앱이 같은 원문과 데이터를 직접 조회하며 사용 중입니다.',
  'SQL 정책·읽기 전용 트랜잭션, 후보 색인 검사 후 원자적 교체를 적용했습니다. 공개 접속은 OAuth 전용으로 분리하고, 그룹에서 빼면 93초 만에 권한이 회수됨을 실측했습니다.'
 ]),
 'study': ('앱 간 학습 이어가기', '개인 프로젝트 · 사용 중', 'study-continuity', [
  'API와 MCP가 같은 PostgreSQL 상태를 사용해 앱 전환·서버 재시작 뒤 답변과 진행을 복원합니다. 동일 요청 재시도와 오래된 상태·동시 판정을 구분합니다.',
  '2026-09-06 격리 DB·실제 HTTP·시험용 OAuth로 클라이언트 역할 순서 6가지를 확인했습니다. 동시 판정 1건만 반영, 2문항 이력 2건을 확인했습니다.'
 ]),
 'homelab': ('Kubernetes 홈랩 플랫폼 구축·운영', '개인 프로젝트 · 운영 중', 'homelab-platform', [
  '서버 3대 K3s에 Ansible·Argo CD(애플리케이션 128개)·저장소별 CI·Vault·관측·백업을 갖춰 개인 서비스와 포트폴리오를 운영합니다.',
  '외부 백업 사본 객체 6,094개 전수 비교 차이 0건, 격리 환경에서 76GB DB 복원(49분 19초)으로 복구 절차를 확인했습니다. 개인 단일 사이트 운영 경험입니다.'
 ]),
}

def build(kind):
    filename = OUT / ('lee-seunghyun-' + kind + '-' + FILE_DATE + '.pdf')
    c = canvas.Canvas(str(filename),pagesize=A4,pageCompression=1)
    c.setTitle('이승현 | '+('Backend & Platform Engineer' if kind=='backend' else 'AI Platform & Backend Engineer'))
    c.setAuthor('이승현')
    y=H-42
    def para(text,style='body',gap=5,x=LEFT,width=WIDTH):
        nonlocal y
        p=Paragraph(text,STYLES[style]); _,height=p.wrap(width,H)
        if y-height<48: raise RuntimeError(f'Page overflow in {kind}: {text[:60]}')
        p.drawOn(c,x,y-height);y-=height+gap
    def line():
        nonlocal y
        c.setStrokeColor(LINE);c.setLineWidth(.6);c.line(LEFT,y,W-RIGHT,y);y-=16
    def section(title):
        nonlocal y
        y-=6;c.setFillColor(BLUE);c.setFont('KR-Bold',10.5);c.drawString(LEFT,y,title);y-=12
        line()
    def footer(page):
        c.setStrokeColor(LINE);c.line(LEFT,38,W-RIGHT,38)
        c.setFillColor(MUTED);c.setFont('KR',7.2)
        c.drawString(LEFT,25,'이승현 · '+DATE+' · '+('Backend' if kind=='backend' else 'AI Platform'))
        c.drawRightString(W-RIGHT,25,f'{page} / 2')
    c.setFillColor(INK);c.setFont('KR-Bold',27);c.drawString(LEFT,y-23,'이승현')
    c.setFillColor(BLUE);c.setFont('KR-Bold',10.4);c.drawRightString(W-RIGHT,y-20,'경력 만 5년+')
    y-=47
    para('Backend & Platform Engineer' if kind=='backend' else 'AI Platform & Backend Engineer','title',8)
    para('금융·결제의 정합성과 운영 신뢰성을 설계하고, AI 업무 도구를 구현합니다.' if kind=='backend' else 'AI가 자료를 읽고, 권한 안에서 도구를 쓰고, 작업 상태를 이어가도록 만듭니다.','lead',9)
    para('<link href="mailto:gmavsks@gmail.com" color="#255da1">gmavsks@gmail.com</link>  ·  <link href="https://portfolio.damecasol.com/" color="#255da1">portfolio.damecasol.com</link>','small',2)
    para('<link href="https://github.com/gitvssh" color="#255da1">github.com/gitvssh</link>  ·  <link href="https://blog.damecasol.com/" color="#255da1">blog.damecasol.com</link>','small',6)
    section('핵심 역량')
    if kind=='backend':
        para('<b>Java · Spring Boot · JPA · QueryDSL · Spring Batch</b><br/>결제 상태·멱등성·트랜잭션 경계 / PostgreSQL·Oracle / CI/CD·관측성')
        para('<b>Python · MCP · Kubernetes</b><br/>자체 AI 도구의 권한 분리, 저장 상태·재시도 처리, 배포·복구 자동화')
    else:
        para('<b>Python · MCP · PostgreSQL · Qdrant · Ollama</b><br/>도구 권한 분리 / 원문·검색 버전 관리 / 상태 저장·멱등성·동시 요청 처리')
        para('<b>Kubernetes · Argo CD · Java/Spring · 관측성</b><br/>금융·결제 백엔드 경험을 바탕으로 AI 서비스를 구현·운영')
    section('경력')
    for company,period,role,bullets in CAREER:
        para(f'<b>{escape(company)}</b>  <font color="#566477">{period}</font>','body',2)
        para(escape(role),'small',4)
        for text in bullets:para(text,'body',4)
        y-=5
    footer(1);c.showPage();y=H-43
    c.setFillColor(INK);c.setFont('KR-Bold',18);c.drawString(LEFT,y-16,'주요 프로젝트');y-=36
    para('자세한 설계와 판단은 각 포트폴리오 사례 페이지에 정리했습니다.','small',13)
    for key in (['payment','mcp','study','homelab'] if kind=='backend' else ['mcp','study','homelab','payment']):
        title,stage,slug,bullets=CASES[key]
        assert slug in registry
        para(title,'title',3);para(stage,'small',5)
        for text in bullets:para(text,'body',5)
        para(f'<link href="https://portfolio.damecasol.com/projects/{slug}/" color="#255da1">사례 페이지 → portfolio.damecasol.com/projects/{slug}/</link>','small',13)
    section('강의 · 기술 글 · 학력')
    assert 'ai-lecture' in registry
    para('<b>사내 AI 특강 기획·제작</b> · 2026.09 · 대표이사·신입직원 대상 60분. 영상 12편·발표 화면 53장면·시연 자료를 AI 에이전트와 함께 만들어 발표  <link href="https://portfolio.damecasol.com/projects/ai-lecture/" color="#255da1">사례 페이지 →</link>','body',6)
    para('<link href="https://blog.damecasol.com/posts/evaluation-overfit-heldout/" color="#255da1">평가셋 과적합: F1 0.997과 held-out 0.696</link>  ·  <link href="https://blog.damecasol.com/posts/restore-rehearsal-false-success/" color="#255da1">MySQL PITR 거짓 성공</link>','body',8)
    para('한국방송통신대학교 통계데이터과학 학사 · 2022.08<br/>국가평생교육진흥원 컴퓨터공학 학사 · 2020.02','small',4)
    footer(2);c.save();print(filename)
for variant in ('backend','ai-platform'):build(variant)
