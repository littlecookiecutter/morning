# Morning App - Planning System

## Overview
This app extends the existing morning routine application with a full planning system including:
- **Screen 1 (Calm)**: Breathing exercises and daily quote
- **Screen 2 (Learn)**: Articles and videos
- **Screen 3 (Today)**: 7-day planning view with tasks, plans, and events
- **Screen 4 (System)**: Full task/plan management system

## Navigation
Use the vertical navigation bar on the left side to switch between screens:
- 🌅 **Calm** - Breathing & Quote
- 📚 **Learn** - Articles & Videos  
- 📅 **Today** - Weekly planning view
- 🗂️ **System** - Full management

## Data Model

### Task
```json
{
  "id": "t1",
  "title": "Task title",
  "deadline": "2025-01-15",
  "important": true,
  "tags": ["work", "urgent"],
  "status": "todo | partial | done",
  "estimatedTime": 60,
  "deltaTime": 0
}
```

### Plan
```json
{
  "id": "p1",
  "title": "Plan title",
  "deadline": "2025-01-20",
  "important": false,
  "tags": ["learning"],
  "steps": [
    {"title": "Step 1", "done": true, "completedAt": "2025-01-10"},
    {"title": "Step 2", "done": false}
  ],
  "createdAt": "2025-01-01"
}
```

### Event
```json
{
  "id": "e1",
  "title": "Event title",
  "date": "2025-01-15",
  "recurring": true
}
```

## CSV Import Format

To import data via CSV, use the following format:

```csv
type,id,title,deadline,date,important,tags,status,estimatedTime,deltaTime,recurring,steps
task,t1,Complete project proposal,2025-01-16,,true,"work,urgent",todo,90,0,false,
plan,p1,Learn TypeScript,2025-01-25,,true,"learning,development",,,,false,"Complete basics tutorial✓2025-01-05|Build a small project✓2025-01-08|Study advanced types|Read documentation"
event,e1,Team meeting,,2025-01-15,,,,,,true,
```

### CSV Column Descriptions:
- **type**: `task`, `plan`, or `event`
- **id**: Unique identifier (if exists, updates the item; if new, creates it)
- **title**: Title of the item
- **deadline**: For tasks/plans (YYYY-MM-DD format)
- **date**: For events (YYYY-MM-DD format)
- **important**: `true` or `false`
- **tags**: Comma-separated list in quotes
- **status**: `todo`, `partial`, or `done` (tasks only)
- **estimatedTime**: Minutes (tasks only)
- **deltaTime**: Time spent in minutes (tasks only)
- **recurring**: `true` or `false` (events only)
- **steps**: For plans only. Format: `Step1✓completedAt|Step2|Step3✓completedAt`
  - Steps are separated by `|`
  - Completed steps have `✓` followed by completion date

### Example CSV File:
```csv
type,id,title,deadline,date,important,tags,status,estimatedTime,deltaTime,recurring,steps
task,t1,Complete project proposal,2025-01-16,,true,"work,urgent",todo,90,0,false,
task,t2,Review quarterly reports,2025-01-18,,false,work,partial,60,20,false,
task,t3,Buy groceries,2025-01-15,,false,personal,todo,30,0,false,
plan,p1,Learn TypeScript,2025-01-25,,true,"learning,development",,,,false,"Complete basics tutorial✓2025-01-05|Build a small project✓2025-01-08|Study advanced types|Read documentation|Contribute to open source"
plan,p2,Home renovation,2025-01-20,,false,"personal,home",,,,false,"Choose paint colors✓2025-01-12|Buy materials|Paint living room|Install new fixtures"
event,e1,Team meeting,,2025-01-15,,,,,,true,
event,e2,Doctor appointment,,2025-01-16,,,,,,false,
event,e3,Dinner with friends,,2025-01-18,,,,,,false,
```

## AI Prompt for CSV Generation

Use this prompt to ask an AI to generate CSV data for import:

```
Create a CSV file for importing tasks, plans, and events into a planning system.

Format requirements:
- Headers: type,id,title,deadline,date,important,tags,status,estimatedTime,deltaTime,recurring,steps
- type: "task", "plan", or "event"
- deadline: YYYY-MM-DD format for tasks/plans
- date: YYYY-MM-DD format for events
- tags: comma-separated in quotes like "work,urgent"
- status: "todo", "partial", or "done" for tasks
- steps: for plans, format is "Step1✓completedAt|Step2|Step3✓completedAt"

Create realistic sample data for:
- 5-7 tasks with various deadlines, priorities, and statuses
- 2-3 plans with multiple steps (some completed, some not)
- 3-4 events (mix of recurring and one-time)

Include items that would appear on:
1. Main screen (deadline within 7 days OR important)
2. System screen only (not urgent, not important)
3. Archive (completed or expired)

Output ONLY the CSV content, no explanations.
```

## Features

### Main Screen (Today)
- Shows schedule grouped by day (today + next 6 days)
- Displays tasks with deadline within 7 days OR marked important
- Shows plans with progress bars (total + weekly progress)
- Clean, minimal design

### Full System Screen
- Active Tasks: All non-archived tasks not shown on main screen
- Active Plans: All non-archived plans not shown on main screen
- Archive: Collapsed section with completed/expired items
- Add button (+) to create new items
- CSV import functionality

### Editing
- Click any task/plan card to edit via modal
- Edit: title, deadline, tags, importance
- Tasks: also edit estimated time, delta time, status
- Plans: add/remove/complete steps

### Archive Rules
- Task archived when: status = "done" OR deadline passed
- Plan archived when: all steps done OR deadline passed
- Items on main screen don't appear in system active lists

## Design Principles
- Headspace-style: warm, soft palette
- Rounded cards with breathing space
- Minimal text, soft shadows
- Low cognitive load, calm interface

## Running the App

1. Start the server:
```bash
node server.js
```

2. Open browser to `http://localhost:3000`

3. Navigate using the left sidebar

## Data Persistence
Data is stored in localStorage. Mock data is initialized on first load.
