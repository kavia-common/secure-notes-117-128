#!/bin/bash
cd /tmp/kavia/workspace/code-generation/secure-notes-117-128/notes_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

