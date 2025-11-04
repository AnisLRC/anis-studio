@echo off
cd /d "C:\PAU_ALAC\Ani's Studio\anis-studio"
git checkout main
git merge work/merge-stash
git push origin main

