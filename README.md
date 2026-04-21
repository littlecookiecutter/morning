# Morning — Daily Inspiration & Planning App

A calm, aesthetic dashboard for breathing exercises, daily inspiration, articles, and task/planning management. Designed with Headspace-inspired soft UI to reduce anxiety and provide a pleasant user experience.

## Features

### 🌅 Calm Screen
- Animated breathing exercise with visual guide
- Daily rotating philosophical/psychological quotes
- Soothing animations and minimal design

### 📚 Learn Screen  
- Curated articles about mental health, productivity, and wellness
- Beautiful card-based layout with CSS gradients
- Email signup CTA section

### 📅 Today Screen (7-Day Planning)
- Horizontal 7-day schedule view
- Events, task deadlines, and plan deadlines grouped by day
- Tasks filtered by importance or 7-day deadline window
- Plans with progress bars and weekly progress overlay
- "Completed Activity" modal showing last 7/30 days

### 🗂️ System Screen (Full Management)
- All active tasks not shown on main screen
- All active plans not shown on main screen
- Collapsible archive section
- Add Task/Plan/Event buttons
- CSV import functionality

## Data Models

### Task
```javascript
{
  id: string,
  title: string,
  deadline?: string (YYYY-MM-DD),
  important: boolean,
  tags: string[],
  status: "todo" | "partial" | "done",
  estimatedTime: number (minutes),
  deltaTime: number (default 0),
  completedAt?: string (ISO timestamp)
}
```

### Plan
```javascript
{
  id: string,
  title: string,
  deadline?: string (YYYY-MM-DD),
  important: boolean,
  tags: string[],
  steps: [{ title: string, done: boolean, completedAt?: string }],
  createdAt: string (ISO timestamp)
}
```

### Event
```javascript
{
  id: string,
  title: string,
  date: string (YYYY-MM-DD),
  recurring: boolean
}
```

## Archiving Rules

**Tasks are archived when:**
- `status = "done"` OR
- `deadline < today`

**Plans are archived when:**
- All steps completed OR
- `deadline < today`

## No Duplication Rule
Items appearing on the Main (Today) screen do NOT appear on the System screen.

## CSV Import Format

To import tasks and plans via CSV, use the following format:

### CSV Structure
```csv
type,title,id,deadline,important,tags,status,estimatedTime
task,Task Title,task-123,2025-04-25,true,work;urgent,todo,90
plan,Plan Title,plan-456,2025-04-30,false,personal,,0
```

### Column Definitions
| Column | Description | Required | Example |
|--------|-------------|----------|---------|
| type | `task` or `plan` | Yes | `task` |
| title | Item title | Yes | `Prepare presentation` |
| id | Unique identifier | Optional (auto-generated if empty) | `task-123` |
| deadline | Due date (YYYY-MM-DD) | Optional | `2025-04-25` |
| important | `true` or `false` | Optional (default: false) | `true` |
| tags | Semicolon-separated | Optional | `work;urgent;personal` |
| status | `todo`, `partial`, or `done` | Optional (default: todo) | `todo` |
| estimatedTime | Minutes (tasks only) | Optional (default: 60) | `90` |

### Important Notes
- First row must be header
- If `id` matches existing item, it updates (preserving progress)
- If `id` is new, it creates a new item
- Progress is NOT reset when updating existing items
- Empty optional fields can be left blank

---

## Prompt for AI to Generate CSV Data

Use this prompt to ask an AI to prepare CSV data for import:

```
Generate a CSV file for importing tasks and plans into a planning application. 

Format requirements:
- Header row: type,title,id,deadline,important,tags,status,estimatedTime
- type must be "task" or "plan"
- deadline in YYYY-MM-DD format
- important is "true" or "false"
- tags separated by semicolons (e.g., "work;urgent")
- status is "todo", "partial", or "done"
- estimatedTime is in minutes (for tasks)

Create [NUMBER] realistic items for a [professional/student/personal] context including:
- Mix of important and regular items
- Various deadlines within the next 2 weeks
- Some tasks due soon, some later
- At least 2 plans with multiple steps implied
- Diverse tags like work, personal, health, learning, etc.

Output ONLY the CSV content, no explanation.
```

Example output:
```csv
type,title,id,deadline,important,tags,status,estimatedTime
task,Prepare quarterly report,task-001,2025-04-23,true,work;urgent,todo,120
task,Schedule dentist appointment,task-002,2025-04-25,false,health,todo,15
plan,Launch marketing campaign,plan-001,2025-04-30,true,work;marketing,,0
task,Buy groceries,task-003,2025-04-22,false,personal,todo,45
```

---

## Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   node server.js
   ```

3. Open in browser:
   ```
   http://localhost:3000
   ```

## Tech Stack
- **Backend:** Node.js + Express
- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **Design:** Headspace-inspired color palette, CSS gradients, no external images
- **Data:** In-memory state (resets on server restart)

## Design Principles
- Warm, soft color palette (not harsh contrasts)
- Rounded cards with soft shadows
- Generous padding and spacing
- Minimal text, clear hierarchy
- Smooth animations and transitions
- Reduced cognitive load
- Anxiety-reducing interface
